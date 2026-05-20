/**
 * InvitePairFlow.tsx - 招待相性診断フロー（React島・バイラル装置の核）
 *
 * client:visible で lazy hydration。
 *
 * フロー:
 *   1. ユーザーAが診断結果を持つ（resultId prop）
 *   2. 「友達と相性診断する」→ 招待リンク発行
 *   3. 招待リンクを LINE / X / コピー で送信
 *   4. 友達B視点: リンク到着 → 自分も診断 → ペア相性結果ページ
 *   5. 詳細レポートは ¥390 PASS CTA
 *
 * Phase 0: pair-id は localStorage + URL パラメータで管理。
 * Phase 1: Supabase に pair セッションを保存して永続化。
 *
 * Props:
 *   resultId    - 自分の診断結果ID
 *   diagName    - 診断名
 *   myTypeName  - 自分のタイプ名
 *   diagPath    - 診断の基底パス（例: /diagnosis/mbti/）
 */

import { useState, useCallback, useEffect } from 'react';

interface InvitePairFlowProps {
  resultId: string;
  diagName?: string;
  myTypeName?: string;
  diagPath?: string;
}

type FlowStep = 'init' | 'link-generated' | 'waiting' | 'paired';

// シンプルなpair-id生成（Phase 0: ランダム文字列）
function generatePairId(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from({ length: 12 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

export default function InvitePairFlow({
  resultId,
  diagName = '性格診断',
  myTypeName = 'あなたのタイプ',
  diagPath = '/diagnosis/mbti/',
}: InvitePairFlowProps) {
  const [step, setStep] = useState<FlowStep>('init');
  const [pairId, setPairId] = useState<string>('');
  const [copied, setCopied] = useState(false);

  // 既存のpair-idを復元（ブラウザリロード後も保持）
  useEffect(() => {
    const stored = localStorage.getItem(`pair-id-${resultId}`);
    if (stored) {
      setPairId(stored);
      setStep('link-generated');
    }
  }, [resultId]);

  // 招待リンク生成
  const handleGenerateLink = useCallback(() => {
    const id = generatePairId();
    localStorage.setItem(`pair-id-${resultId}`, id);
    setPairId(id);
    setStep('link-generated');
  }, [resultId]);

  // 招待URL
  const inviteUrl = pairId
    ? `https://shindan-navi.jp${diagPath}?pair=${pairId}&from=${resultId}`
    : '';

  const shareText = `【${diagName}】${myTypeName}のあなたへ。私との相性を診断してみて！一緒に確認しよう #診断ナビ #相性診断`;
  const tweetUrl = inviteUrl
    ? `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(inviteUrl)}`
    : '';
  const lineUrl = inviteUrl
    ? `https://line.me/R/msg/text/?${encodeURIComponent(`${shareText}\n${inviteUrl}`)}`
    : '';

  const handleCopy = useCallback(async () => {
    if (!inviteUrl) return;
    try {
      await navigator.clipboard.writeText(inviteUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      prompt('URLをコピーしてください:', inviteUrl);
    }
  }, [inviteUrl]);

  return (
    <div className="ipf-wrapper" role="region" aria-label="招待相性診断">

      {/* ステップ: 初期 */}
      {step === 'init' && (
        <div className="ipf-step ipf-step--init">
          <div className="ipf-hero">
            <span className="ipf-hero-icon" aria-hidden="true">👥</span>
            <h3 className="ipf-hero-title">友達と相性診断する</h3>
            <p className="ipf-hero-desc">
              招待リンクを友達に送るだけ。友達も診断したらリアルな相性スコアが出ます。
              <strong>完全無料・無制限。</strong>
            </p>
            <ul className="ipf-steps-list" role="list" aria-label="招待の流れ">
              <li className="ipf-steps-item">
                <span className="ipf-steps-num" aria-hidden="true">1</span>
                招待リンクを発行する
              </li>
              <li className="ipf-steps-item">
                <span className="ipf-steps-num" aria-hidden="true">2</span>
                LINE / X / コピーで友達に送る
              </li>
              <li className="ipf-steps-item">
                <span className="ipf-steps-num" aria-hidden="true">3</span>
                友達が診断したらペア相性スコアが出る
              </li>
            </ul>
          </div>
          <button
            className="ipf-btn ipf-btn--primary"
            onClick={handleGenerateLink}
            type="button"
          >
            <span aria-hidden="true">🔗</span>
            招待リンクを発行する（無料）
          </button>
        </div>
      )}

      {/* ステップ: リンク生成済み */}
      {step === 'link-generated' && pairId && (
        <div className="ipf-step ipf-step--generated">
          <div className="ipf-link-header">
            <span className="ipf-success-icon" aria-hidden="true">✅</span>
            <h3 className="ipf-link-title">招待リンクが発行されました</h3>
            <p className="ipf-link-desc">
              このリンクを友達に送ってください。友達が診断を完了すると相性スコアが確認できます。
            </p>
          </div>

          {/* URLボックス */}
          <div className="ipf-url-box" role="group" aria-label="招待URL">
            <span className="ipf-url-text" aria-label="招待URL">{inviteUrl}</span>
          </div>

          {/* シェアボタン */}
          <div className="ipf-share-btns">
            <a
              href={lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ipf-btn ipf-btn--line"
              aria-label="LINEで招待リンクを送る"
            >
              <svg width="18" height="18" viewBox="0 0 48 48" fill="currentColor" aria-hidden="true">
                <path d="M24 4C13 4 4 11.5 4 21c0 5.7 3.2 10.8 8.2 14-.4 2.3-1.4 5.7-1.6 6.5-.3 1.1.4 1.1.9.8l7.3-4.8c1.7.3 3.4.5 5.2.5 11 0 20-7.5 20-17S35 4 24 4z"/>
              </svg>
              LINEで送る
            </a>

            <a
              href={tweetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ipf-btn ipf-btn--x"
              aria-label="Xで招待リンクを送る"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              Xで送る
            </a>

            <button
              className={`ipf-btn ${copied ? 'ipf-btn--copied' : 'ipf-btn--copy'}`}
              onClick={handleCopy}
              type="button"
              aria-label={copied ? 'コピーしました' : 'URLをコピー'}
            >
              <span aria-hidden="true">{copied ? '✓' : '🔗'}</span>
              {copied ? 'コピーしました' : 'URLコピー'}
            </button>
          </div>

          {/* ペアID表示 */}
          <p className="ipf-pair-id">
            ペアID: <code className="ipf-pair-id-code">{pairId}</code>
          </p>

          {/* 詳細レポートCTA */}
          <div className="ipf-pass-cta">
            <div className="ipf-pass-cta-inner">
              <div>
                <p className="ipf-pass-cta-title">
                  <span className="ipf-badge-pass">PASS</span>
                  もっと詳しい相性レポート
                </p>
                <p className="ipf-pass-cta-desc">
                  5軸（仕事・恋愛・友人・家族・学校）の詳細相性分析＋AI行動提案
                </p>
              </div>
              <a
                href="/pro/"
                className="ipf-btn ipf-btn--pass"
                aria-label="¥390 PASSで詳細相性レポートを見る"
              >
                ¥390 PASS
              </a>
            </div>
          </div>

          {/* 新しく発行ボタン */}
          <button
            className="ipf-link-reset"
            onClick={handleGenerateLink}
            type="button"
          >
            新しい招待リンクを発行する
          </button>
        </div>
      )}

      <style>{`
        .ipf-wrapper {
          background: var(--sn-bg-white);
          border-radius: 20px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          border: 1px solid var(--sn-border);
          overflow: hidden;
        }

        .ipf-step {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          padding: 1.5rem;
        }

        /* 初期ステップ */
        .ipf-hero {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          text-align: center;
        }

        .ipf-hero-icon {
          font-size: 3rem;
          line-height: 1;
        }

        .ipf-hero-title {
          font-family: var(--sn-font-rounded);
          font-size: 1.25rem;
          font-weight: 900;
          color: var(--sn-text);
          margin: 0;
        }

        .ipf-hero-desc {
          font-size: 0.875rem;
          color: var(--sn-muted);
          line-height: 1.7;
          margin: 0;
          max-width: 360px;
        }

        .ipf-steps-list {
          list-style: none;
          padding: 0.75rem 1rem;
          margin: 0;
          background: var(--sn-bg-soft);
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          width: 100%;
          text-align: left;
        }

        .ipf-steps-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.875rem;
          color: var(--sn-text-soft);
        }

        .ipf-steps-num {
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--sn-primary);
          color: #fff;
          border-radius: 50%;
          font-size: 0.75rem;
          font-weight: 700;
          flex-shrink: 0;
        }

        /* リンク生成済みステップ */
        .ipf-link-header {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .ipf-success-icon {
          font-size: 1.5rem;
        }

        .ipf-link-title {
          font-family: var(--sn-font-rounded);
          font-size: 1.125rem;
          font-weight: 700;
          color: var(--sn-text);
          margin: 0;
        }

        .ipf-link-desc {
          font-size: 0.8125rem;
          color: var(--sn-muted);
          line-height: 1.6;
          margin: 0;
        }

        .ipf-url-box {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          background: var(--sn-bg-soft);
          border-radius: 8px;
          border: 1px solid var(--sn-border);
          overflow: hidden;
        }

        .ipf-url-text {
          font-family: var(--sn-font-mono);
          font-size: 0.75rem;
          color: var(--sn-text-soft);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          flex: 1;
        }

        .ipf-share-btns {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        /* 共通ボタンスタイル */
        .ipf-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          border-radius: 999px;
          font-size: 0.875rem;
          font-weight: 700;
          text-decoration: none;
          cursor: pointer;
          border: none;
          min-height: 44px;
          font-family: inherit;
          transition:
            opacity 150ms ease,
            transform 150ms ease;
        }

        .ipf-btn:hover {
          opacity: 0.85;
          transform: translateY(-1px);
        }

        .ipf-btn:focus-visible {
          outline: 2px solid var(--sn-primary);
          outline-offset: 2px;
        }

        .ipf-btn--primary {
          background: var(--sn-primary);
          color: #fff;
          width: 100%;
          font-size: 1rem;
          padding: 1rem;
        }

        .ipf-btn--line {
          background: #00b900;
          color: #fff;
          flex: 1;
          min-width: 100px;
        }

        .ipf-btn--x {
          background: #000;
          color: #fff;
          flex: 1;
          min-width: 80px;
        }

        .ipf-btn--copy {
          background: var(--sn-bg-soft);
          color: var(--sn-text-soft);
          flex: 1;
          min-width: 80px;
        }

        .ipf-btn--copied {
          background: var(--sn-success);
          color: #fff;
          flex: 1;
          min-width: 80px;
        }

        .ipf-btn--pass {
          background: var(--sn-pass-color);
          color: #fff;
          white-space: nowrap;
          flex-shrink: 0;
        }

        /* PASSのCTA */
        .ipf-pass-cta {
          background: var(--sn-pass-bg);
          border-radius: 12px;
          border: 1px solid color-mix(in srgb, var(--sn-pass-color) 20%, transparent);
          padding: 1rem;
        }

        .ipf-pass-cta-inner {
          display: flex;
          align-items: center;
          gap: 1rem;
          justify-content: space-between;
        }

        .ipf-pass-cta-title {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          font-weight: 700;
          color: var(--sn-text);
          margin: 0 0 0.25rem;
        }

        .ipf-badge-pass {
          font-size: 0.625rem;
          font-weight: 700;
          background: var(--sn-pass-color);
          color: #fff;
          padding: 2px 6px;
          border-radius: 999px;
        }

        .ipf-pass-cta-desc {
          font-size: 0.75rem;
          color: var(--sn-muted);
          margin: 0;
          line-height: 1.5;
        }

        /* ペアID */
        .ipf-pair-id {
          font-size: 0.75rem;
          color: var(--sn-muted);
          margin: 0;
          text-align: center;
        }

        .ipf-pair-id-code {
          font-family: var(--sn-font-mono);
          background: var(--sn-bg-soft);
          padding: 1px 6px;
          border-radius: 4px;
        }

        .ipf-link-reset {
          background: none;
          border: none;
          color: var(--sn-muted);
          font-size: 0.75rem;
          cursor: pointer;
          text-decoration: underline;
          text-align: center;
          padding: 0.5rem;
          font-family: inherit;
        }

        .ipf-link-reset:hover {
          color: var(--sn-text-soft);
        }

        @media (max-width: 480px) {
          .ipf-step {
            padding: 1rem;
          }

          .ipf-share-btns {
            flex-direction: column;
          }

          .ipf-btn--line,
          .ipf-btn--x,
          .ipf-btn--copy,
          .ipf-btn--copied {
            flex: none;
            width: 100%;
          }

          .ipf-pass-cta-inner {
            flex-direction: column;
            align-items: flex-start;
          }

          .ipf-btn--pass {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
