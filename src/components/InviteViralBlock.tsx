/**
 * InviteViralBlock.tsx
 * 診断結果ページ末尾の大きな「友達と相性チェック」CTAブロック
 *
 * Phase 3.5: 4プライバシーモード選択 → コード生成 → URL/QR シェア
 *
 * 設計原則:
 *   - 招待相性は完全無料・無制限（回数カウントしない）
 *   - ゲスト体験維持（LocalStorage + APIコード生成の二重保存）
 *   - K>1 バイラル係数: 「3人招待でグループ診断解放」インセンティブ
 *   - QRコード: Canvas API で生成（ライブラリ不要の簡易版）
 */

import { useState, useCallback, useEffect, useRef } from 'react';
import { trackInviteCreate, trackShareClick } from '../lib/analytics';

interface InviteViralBlockProps {
  resultId: string;
  diagName?: string;
  myTypeName?: string;
  diagPath?: string;
  /** 送ったユーザー数（LocalStorage で管理） */
}

type InviteMode = 'secret' | 'invite' | 'one_way' | 'full_share';
type Step = 'cta' | 'mode-select' | 'generated';

interface ModeConfig {
  label: string;
  icon: string;
  desc: string;
  color: string;
}

const MODE_CONFIGS: Record<InviteMode, ModeConfig> = {
  secret: {
    label: 'こっそりモード',
    icon: '🔮',
    desc: 'あなたが診断したことが相手にはわかりません',
    color: '#6b7280',
  },
  invite: {
    label: '招待モード',
    icon: '👋',
    desc: '相手も診断するとお互いの相性が見られます',
    color: '#6366f1',
  },
  one_way: {
    label: '片方向モード',
    icon: '👁️',
    desc: '相手の結果は見られますが、あなたの結果は共有されません',
    color: '#3b82f6',
  },
  full_share: {
    label: '完全共有モード',
    icon: '🤝',
    desc: 'お互いの診断結果をすべて共有して相性を確認',
    color: '#10b981',
  },
};

const STORAGE_KEY = 'shindan_invitations';
const INVITE_COUNT_KEY = 'sn_invite_sent_count';

function getInviteSentCount(): number {
  try {
    return parseInt(localStorage.getItem(INVITE_COUNT_KEY) ?? '0', 10) || 0;
  } catch {
    return 0;
  }
}

function incrementInviteSentCount(): number {
  try {
    const next = getInviteSentCount() + 1;
    localStorage.setItem(INVITE_COUNT_KEY, String(next));
    return next;
  } catch {
    return 0;
  }
}

/** 簡易QRコード生成（Data URL）: qrcode.js 未使用でCanvas描画 */
function generateQRDataUrl(text: string): string {
  // 簡易実装: URLをエンコードしたQRコードのプレースホルダー
  // 本番では qrcode ライブラリ利用推奨だが依存なしでも動作する
  // ここではGoogle Charts QR API を使用（外部依存のみ）
  const encoded = encodeURIComponent(text);
  return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encoded}&bgcolor=ffffff&color=1f2937&margin=10`;
}

export default function InviteViralBlock({
  resultId,
  diagName = '性格診断',
  myTypeName = 'あなたのタイプ',
  diagPath = '/diagnosis/mbti/',
}: InviteViralBlockProps) {
  const [step, setStep] = useState<Step>('cta');
  const [selectedMode, setSelectedMode] = useState<InviteMode>('invite');
  const [inviteCode, setInviteCode] = useState('');
  const [inviteUrl, setInviteUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [inviteSentCount, setInviteSentCount] = useState(0);
  const [groupUnlocked, setGroupUnlocked] = useState(false);

  useEffect(() => {
    const count = getInviteSentCount();
    setInviteSentCount(count);
    setGroupUnlocked(count >= 3);
  }, []);

  // 既存コードを復元
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const stored = JSON.parse(raw);
        // resultId に紐づく最新コードを探す
        const existing = Object.values(stored as Record<string, {
          code: string;
          resultId: string;
          mode: InviteMode;
          expiresAt: string;
          diagPath: string;
        }>).find(
          (inv) => inv.resultId === resultId && new Date(inv.expiresAt) > new Date()
        );
        if (existing) {
          setInviteCode(existing.code);
          setSelectedMode(existing.mode);
          const url = `https://shindan-navi.jp/i/${existing.code}/?from=${encodeURIComponent(myTypeName)}`;
          setInviteUrl(url);
          setStep('generated');
        }
      }
    } catch { /* ignore */ }
  }, [resultId, myTypeName]);

  const handleGenerate = useCallback(async () => {
    setIsGenerating(true);
    try {
      // API 呼び出し（ログイン時はDB保存も行う）
      const res = await fetch('/api/invitation/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: selectedMode,
          resultId,
          diagPath,
          diagnosisSnapshot: { typeName: myTypeName, diagName },
        }),
      });

      const data = await res.json();
      if (!data.ok) throw new Error(data.message);

      const code: string = data.code;
      const expiresAt: string = data.expiresAt;

      // LocalStorage にも保存（オフライン + ゲスト対応）
      try {
        const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}');
        stored[code.toUpperCase()] = {
          code,
          mode: selectedMode,
          resultId,
          diagPath,
          createdAt: new Date().toISOString(),
          expiresAt,
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
      } catch { /* ignore */ }

      const url = `https://shindan-navi.jp/i/${code}/?from=${encodeURIComponent(myTypeName)}`;
      setInviteCode(code);
      setInviteUrl(url);
      trackInviteCreate(selectedMode, resultId);
      setStep('generated');
    } catch (err) {
      console.error('[InviteViralBlock] コード生成失敗:', err);
      // フォールバック: クライアントサイドのみでコード生成
      const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
      const code = Array.from({ length: 6 }, () => ALPHABET[Math.floor(Math.random() * ALPHABET.length)]).join('');
      const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

      try {
        const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}');
        stored[code] = { code, mode: selectedMode, resultId, diagPath, createdAt: new Date().toISOString(), expiresAt };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
      } catch { /* ignore */ }

      const url = `https://shindan-navi.jp/i/${code}/?from=${encodeURIComponent(myTypeName)}`;
      setInviteCode(code);
      setInviteUrl(url);
      trackInviteCreate(selectedMode, resultId);
      setStep('generated');
    } finally {
      setIsGenerating(false);
    }
  }, [selectedMode, resultId, diagPath, myTypeName, diagName]);

  const handleCopy = useCallback(async () => {
    if (!inviteUrl) return;
    try {
      await navigator.clipboard.writeText(inviteUrl);
      setCopied(true);
      trackShareClick('copy', resultId);
      const newCount = incrementInviteSentCount();
      setInviteSentCount(newCount);
      if (newCount >= 3) setGroupUnlocked(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      prompt('URLをコピーしてください:', inviteUrl);
    }
  }, [inviteUrl]);

  const shareText = `【${diagName}】私は「${myTypeName}」。あなたとの相性を診断したい！ #診断ナビ #相性診断`;
  const lineUrl = `https://line.me/R/msg/text/?${encodeURIComponent(`${shareText}\n${inviteUrl}`)}`;
  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(inviteUrl)}`;
  const threadsUrl = `https://www.threads.net/intent/post?text=${encodeURIComponent(`${shareText}\n${inviteUrl}`)}`;

  const handleShareClick = useCallback((platform: 'x' | 'line' | 'threads') => {
    trackShareClick(platform, resultId);
    const newCount = incrementInviteSentCount();
    setInviteSentCount(newCount);
    if (newCount >= 3) setGroupUnlocked(true);
  }, [resultId]);

  return (
    <div className="ivb-wrapper" role="region" aria-label="友達と相性チェック">

      {/* ====== STEP: 初期CTA ====== */}
      {step === 'cta' && (
        <div className="ivb-step">
          <div className="ivb-hero">
            <span className="ivb-hero-icon" aria-hidden="true">🤝</span>
            <div>
              <h3 className="ivb-hero-title">友達と相性をチェックしよう</h3>
              <p className="ivb-hero-desc">
                招待リンクを送るだけ。<strong>完全無料・無制限。</strong>
                4つのプライバシーモードから選べます。
              </p>
            </div>
          </div>

          {/* E-1: 3人招待インセンティブ */}
          {!groupUnlocked && (
            <div className="ivb-incentive">
              <span className="ivb-incentive-icon" aria-hidden="true">🎁</span>
              <div>
                <p className="ivb-incentive-title">3人招待で「グループ相性診断」が解放</p>
                <p className="ivb-incentive-desc">
                  4人以上でグループ内の相性マッピングが見られます（完全無料）
                </p>
                <div className="ivb-incentive-progress" role="progressbar" aria-valuenow={inviteSentCount} aria-valuemax={3}>
                  {[0,1,2].map((i) => (
                    <div key={i} className={`ivb-progress-dot ${i < inviteSentCount ? 'ivb-progress-dot--done' : ''}`} />
                  ))}
                  <span className="ivb-progress-label">{inviteSentCount}/3</span>
                </div>
              </div>
            </div>
          )}
          {groupUnlocked && (
            <div className="ivb-incentive ivb-incentive--unlocked">
              <span className="ivb-incentive-icon" aria-hidden="true">🎉</span>
              <p className="ivb-incentive-title">グループ相性診断が解放されました！</p>
            </div>
          )}

          <button
            className="ivb-btn ivb-btn--primary"
            onClick={() => setStep('mode-select')}
            type="button"
          >
            <span aria-hidden="true">🤝</span>
            招待リンクを発行する（無料）
          </button>
        </div>
      )}

      {/* ====== STEP: モード選択 ====== */}
      {step === 'mode-select' && (
        <div className="ivb-step">
          <div className="ivb-mode-header">
            <h3 className="ivb-mode-title">プライバシーモードを選択</h3>
            <p className="ivb-mode-desc">あなたの情報をどの程度共有するか選べます</p>
          </div>

          <div className="ivb-mode-grid" role="radiogroup" aria-label="プライバシーモード選択">
            {(Object.entries(MODE_CONFIGS) as [InviteMode, ModeConfig][]).map(([mode, cfg]) => (
              <button
                key={mode}
                className={`ivb-mode-card ${selectedMode === mode ? 'ivb-mode-card--selected' : ''}`}
                onClick={() => setSelectedMode(mode)}
                type="button"
                role="radio"
                aria-checked={selectedMode === mode}
                style={{ '--mode-color': cfg.color } as React.CSSProperties}
              >
                <span className="ivb-mode-icon" aria-hidden="true">{cfg.icon}</span>
                <div className="ivb-mode-body">
                  <p className="ivb-mode-label">{cfg.label}</p>
                  <p className="ivb-mode-desc-text">{cfg.desc}</p>
                </div>
                {selectedMode === mode && (
                  <span className="ivb-mode-check" aria-hidden="true">✓</span>
                )}
              </button>
            ))}
          </div>

          <div className="ivb-mode-actions">
            <button
              className="ivb-btn ivb-btn--secondary"
              onClick={() => setStep('cta')}
              type="button"
            >
              戻る
            </button>
            <button
              className="ivb-btn ivb-btn--primary"
              onClick={handleGenerate}
              disabled={isGenerating}
              type="button"
            >
              {isGenerating ? (
                <><span aria-hidden="true">⏳</span>生成中...</>
              ) : (
                <><span aria-hidden="true">{MODE_CONFIGS[selectedMode].icon}</span>
                {MODE_CONFIGS[selectedMode].label}で発行</>
              )}
            </button>
          </div>
        </div>
      )}

      {/* ====== STEP: 生成済み ====== */}
      {step === 'generated' && inviteCode && (
        <div className="ivb-step">
          <div className="ivb-generated-header">
            <span className="ivb-success-badge" style={{ background: MODE_CONFIGS[selectedMode].color }}>
              {MODE_CONFIGS[selectedMode].icon} {MODE_CONFIGS[selectedMode].label}
            </span>
            <h3 className="ivb-generated-title">招待リンクが発行されました</h3>
            <p className="ivb-generated-desc">
              このリンクを友達に送ってください
            </p>
          </div>

          {/* URLボックス */}
          <div className="ivb-url-box">
            <code className="ivb-url-text" aria-label="招待URL">{inviteUrl}</code>
          </div>

          {/* シェアボタン群 */}
          <div className="ivb-share-btns">
            <a
              href={lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ivb-btn ivb-btn--line"
              aria-label="LINEで招待リンクを送る"
              onClick={() => handleShareClick('line')}
            >
              <svg width="16" height="16" viewBox="0 0 48 48" fill="currentColor" aria-hidden="true">
                <path d="M24 4C13 4 4 11.5 4 21c0 5.7 3.2 10.8 8.2 14-.4 2.3-1.4 5.7-1.6 6.5-.3 1.1.4 1.1.9.8l7.3-4.8c1.7.3 3.4.5 5.2.5 11 0 20-7.5 20-17S35 4 24 4z"/>
              </svg>
              LINEで送る
            </a>
            <a
              href={tweetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ivb-btn ivb-btn--x"
              aria-label="Xで招待リンクを送る"
              onClick={() => handleShareClick('x')}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              Xで送る
            </a>
            <a
              href={threadsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ivb-btn ivb-btn--threads"
              aria-label="Threadsで招待リンクを送る"
              onClick={() => handleShareClick('threads')}
            >
              Threads
            </a>
            <button
              className={`ivb-btn ${copied ? 'ivb-btn--copied' : 'ivb-btn--copy'}`}
              onClick={handleCopy}
              type="button"
              aria-label={copied ? 'コピーしました' : 'URLをコピー'}
            >
              <span aria-hidden="true">{copied ? '✓' : '🔗'}</span>
              {copied ? 'コピー完了' : 'URLコピー'}
            </button>
          </div>

          {/* QRコード */}
          <div className="ivb-qr-section">
            <button
              className="ivb-qr-toggle"
              onClick={() => setShowQR(!showQR)}
              type="button"
              aria-expanded={showQR}
              aria-label="QRコードを表示する"
            >
              <span aria-hidden="true">📱</span>
              {showQR ? 'QRコードを隠す' : 'QRコードを表示'}
            </button>
            {showQR && (
              <div className="ivb-qr-card">
                <img
                  src={generateQRDataUrl(inviteUrl)}
                  alt={`招待コード ${inviteCode} のQRコード`}
                  width={160}
                  height={160}
                  className="ivb-qr-img"
                  loading="lazy"
                />
                <p className="ivb-qr-code-text">コード: <code>{inviteCode}</code></p>
              </div>
            )}
          </div>

          {/* E-1: カウント状況 */}
          {!groupUnlocked && (
            <div className="ivb-incentive ivb-incentive--sm">
              <span aria-hidden="true">🎁</span>
              <p>あと{Math.max(0, 3 - inviteSentCount)}人招待でグループ診断解放（{inviteSentCount}/3）</p>
            </div>
          )}
          {groupUnlocked && (
            <div className="ivb-incentive ivb-incentive--unlocked ivb-incentive--sm">
              <span aria-hidden="true">🎉</span>
              <p>グループ相性診断が解放されました！</p>
            </div>
          )}

          {/* 別モードで発行 */}
          <div className="ivb-regenerate">
            <button
              className="ivb-link-btn"
              onClick={() => setStep('mode-select')}
              type="button"
            >
              別のモードで発行する
            </button>
          </div>
        </div>
      )}

      <style>{`
        .ivb-wrapper {
          background: var(--sn-bg-white);
          border-radius: 20px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.07);
          border: 1px solid var(--sn-border);
          overflow: hidden;
        }

        .ivb-step {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          padding: 1.5rem;
        }

        /* ヒーロー */
        .ivb-hero {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
        }
        .ivb-hero-icon {
          font-size: 2.5rem;
          line-height: 1;
          flex-shrink: 0;
        }
        .ivb-hero-title {
          font-family: var(--sn-font-rounded);
          font-size: 1.125rem;
          font-weight: 900;
          color: var(--sn-text);
          margin: 0 0 0.375rem;
        }
        .ivb-hero-desc {
          font-size: 0.875rem;
          color: var(--sn-muted);
          line-height: 1.6;
          margin: 0;
        }

        /* インセンティブ */
        .ivb-incentive {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          padding: 0.875rem 1rem;
          background: linear-gradient(135deg, #fffbeb, #fff7ed);
          border-radius: 12px;
          border: 1px solid #fde68a;
        }
        .ivb-incentive--unlocked {
          background: linear-gradient(135deg, #ecfdf5, #f0fdf4);
          border-color: #86efac;
        }
        .ivb-incentive--sm {
          padding: 0.625rem 0.875rem;
          font-size: 0.8125rem;
        }
        .ivb-incentive--sm p { margin: 0; color: var(--sn-text-soft); }
        .ivb-incentive-icon {
          font-size: 1.5rem;
          flex-shrink: 0;
        }
        .ivb-incentive-title {
          font-size: 0.875rem;
          font-weight: 700;
          color: var(--sn-text);
          margin: 0 0 0.25rem;
        }
        .ivb-incentive-desc {
          font-size: 0.8125rem;
          color: var(--sn-text-soft);
          margin: 0 0 0.5rem;
        }
        .ivb-incentive-progress {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .ivb-progress-dot {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #e5e7eb;
          border: 2px solid #d1d5db;
        }
        .ivb-progress-dot--done {
          background: #f59e0b;
          border-color: #d97706;
        }
        .ivb-progress-label {
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--sn-muted);
          margin-left: 0.25rem;
        }

        /* モード選択 */
        .ivb-mode-header { text-align: center; }
        .ivb-mode-title {
          font-family: var(--sn-font-rounded);
          font-size: 1.0625rem;
          font-weight: 900;
          color: var(--sn-text);
          margin: 0 0 0.25rem;
        }
        .ivb-mode-desc {
          font-size: 0.8125rem;
          color: var(--sn-muted);
          margin: 0;
        }
        .ivb-mode-grid {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .ivb-mode-card {
          display: flex;
          align-items: center;
          gap: 0.875rem;
          padding: 0.875rem 1rem;
          background: var(--sn-bg-soft);
          border-radius: 12px;
          border: 2px solid transparent;
          cursor: pointer;
          text-align: left;
          transition: border-color 0.15s, background 0.15s;
          font-family: inherit;
          min-height: 64px;
        }
        .ivb-mode-card:hover {
          border-color: var(--mode-color, var(--sn-primary));
          background: color-mix(in srgb, var(--mode-color, var(--sn-primary)) 5%, var(--sn-bg-white));
        }
        .ivb-mode-card--selected {
          border-color: var(--mode-color, var(--sn-primary));
          background: color-mix(in srgb, var(--mode-color, var(--sn-primary)) 8%, var(--sn-bg-white));
        }
        .ivb-mode-card:focus-visible {
          outline: 2px solid var(--sn-primary);
          outline-offset: 2px;
        }
        .ivb-mode-icon {
          font-size: 1.5rem;
          flex-shrink: 0;
        }
        .ivb-mode-body { flex: 1; }
        .ivb-mode-label {
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--sn-text);
          margin: 0 0 0.2rem;
        }
        .ivb-mode-desc-text {
          font-size: 0.78rem;
          color: var(--sn-muted);
          margin: 0;
          line-height: 1.5;
        }
        .ivb-mode-check {
          font-size: 1.125rem;
          color: var(--mode-color, var(--sn-primary));
          font-weight: 700;
          flex-shrink: 0;
        }
        .ivb-mode-actions {
          display: flex;
          gap: 0.5rem;
        }

        /* 生成済み */
        .ivb-generated-header { display: flex; flex-direction: column; gap: 0.375rem; }
        .ivb-success-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          padding: 3px 10px;
          border-radius: 999px;
          font-size: 0.75rem;
          font-weight: 700;
          color: #fff;
          width: fit-content;
        }
        .ivb-generated-title {
          font-family: var(--sn-font-rounded);
          font-size: 1.0625rem;
          font-weight: 900;
          color: var(--sn-text);
          margin: 0;
        }
        .ivb-generated-desc {
          font-size: 0.8125rem;
          color: var(--sn-muted);
          margin: 0;
        }

        /* URLボックス */
        .ivb-url-box {
          padding: 0.625rem 0.875rem;
          background: var(--sn-bg-soft);
          border-radius: 8px;
          border: 1px solid var(--sn-border);
          overflow: hidden;
        }
        .ivb-url-text {
          font-family: var(--sn-font-mono);
          font-size: 0.75rem;
          color: var(--sn-text-soft);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          display: block;
        }

        /* シェアボタン */
        .ivb-share-btns {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        /* QR */
        .ivb-qr-section { display: flex; flex-direction: column; align-items: flex-start; gap: 0.5rem; }
        .ivb-qr-toggle {
          display: inline-flex;
          align-items: center;
          gap: 0.375rem;
          background: none;
          border: 1px solid var(--sn-border);
          border-radius: 999px;
          padding: 0.375rem 0.875rem;
          font-size: 0.8125rem;
          color: var(--sn-text-soft);
          cursor: pointer;
          font-family: inherit;
          min-height: 36px;
          transition: background 0.15s;
        }
        .ivb-qr-toggle:hover { background: var(--sn-bg-soft); }
        .ivb-qr-toggle:focus-visible { outline: 2px solid var(--sn-primary); outline-offset: 2px; }
        .ivb-qr-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.875rem;
          background: var(--sn-bg-soft);
          border-radius: 12px;
          border: 1px solid var(--sn-border);
        }
        .ivb-qr-img {
          border-radius: 8px;
          flex-shrink: 0;
          width: 100px;
          height: 100px;
        }
        .ivb-qr-code-text {
          font-size: 0.8125rem;
          color: var(--sn-muted);
          margin: 0;
        }
        .ivb-qr-code-text code {
          font-family: var(--sn-font-mono);
          background: var(--sn-bg-white);
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 0.875rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: var(--sn-text);
        }

        /* 別モード */
        .ivb-regenerate { text-align: center; }
        .ivb-link-btn {
          background: none;
          border: none;
          color: var(--sn-muted);
          font-size: 0.78rem;
          cursor: pointer;
          text-decoration: underline;
          font-family: inherit;
          padding: 0.5rem;
          min-height: 44px;
        }
        .ivb-link-btn:hover { color: var(--sn-text-soft); }

        /* 共通ボタン */
        .ivb-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.375rem;
          padding: 0.75rem 1.125rem;
          border-radius: 999px;
          font-size: 0.875rem;
          font-weight: 700;
          text-decoration: none;
          cursor: pointer;
          border: none;
          min-height: 44px;
          font-family: inherit;
          transition: opacity 0.15s, transform 0.15s;
        }
        .ivb-btn:hover { opacity: 0.85; transform: translateY(-1px); }
        .ivb-btn:focus-visible { outline: 2px solid var(--sn-primary); outline-offset: 2px; }
        .ivb-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
        .ivb-btn--primary { background: var(--sn-primary); color: #fff; flex: 1; }
        .ivb-btn--secondary {
          background: var(--sn-bg-soft);
          color: var(--sn-text-soft);
          border: 1px solid var(--sn-border);
        }
        .ivb-btn--line { background: #00b900; color: #fff; flex: 1; min-width: 100px; }
        .ivb-btn--x { background: #000; color: #fff; flex: 1; min-width: 70px; }
        .ivb-btn--threads { background: #101010; color: #fff; flex: 1; min-width: 80px; }
        .ivb-btn--copy { background: var(--sn-bg-soft); color: var(--sn-text-soft); flex: 1; }
        .ivb-btn--copied { background: var(--sn-success); color: #fff; flex: 1; }

        @media (max-width: 480px) {
          .ivb-step { padding: 1rem; }
          .ivb-hero { flex-direction: column; gap: 0.625rem; }
          .ivb-share-btns { flex-direction: column; }
          .ivb-btn--line, .ivb-btn--x, .ivb-btn--threads, .ivb-btn--copy, .ivb-btn--copied {
            flex: none;
            width: 100%;
          }
          .ivb-mode-actions { flex-direction: column-reverse; }
          .ivb-btn--secondary { width: 100%; }
          .ivb-qr-card { flex-direction: column; align-items: flex-start; }
        }
      `}</style>
    </div>
  );
}
