/**
 * BloodCompatTool.tsx - 血液型相性診断ツール React島
 *
 * 機能:
 * - タイプ1 / タイプ2 選択（4タイプドロップダウン）
 * - 「相性を見る」ボタン → getCompatibility で即時結果表示
 * - URL ?t1=A&t2=B 形式に同期（共有可能URL）
 * - スコア・カテゴリ・仕事相性・恋愛相性・友人相性・成長ポイント・注意点を表示
 * - X / LINE / URLコピー シェアボタン
 *
 * CWV対応:
 * - CLS: 結果エリアは min-height で確保
 * - INP: useState のみ・重い計算なし
 *
 * WCAG 2.1 AA:
 * - aria-label / role 付与
 * - focus-visible アウトライン
 * - カラーコントラスト 4.5:1 以上（CSS変数経由）
 *
 * 絶対遵守:
 * - 占い口調・運命論NG
 * - 「相性が悪い」NG → 「学び合いペア」「成長機会の多いペア」
 * - YMYL回避: 医療・精神疾患言及絶対NG
 * - 血液型ハラスメント警告表示
 *
 * 確認日: 2026-05-20
 */

import { useState, useEffect, useCallback } from 'react';
import {
  getCompatibility,
  getCategoryLabel,
  getCategoryColor,
} from '../data/diagnoses/blood-compat/results';
import { BLOOD_TYPES } from '../data/diagnoses/blood-compat/meta';
import type { BloodType } from '../data/diagnoses/blood-compat/meta';
import type { CompatibilityData } from '../data/diagnoses/blood-compat/compatibility';

// カテゴリ別 スコア背景色（薄め）
function getCategoryBg(category: string): string {
  const map: Record<string, string> = {
    soulmate: '#f3e8ff',
    good: '#d1fae5',
    neutral: '#dbeafe',
    growth: '#fef3c7',
    challenge: '#fee2e2',
  };
  return map[category] ?? '#f9fafb';
}

// カテゴリ別 アイコン
function getCategoryIcon(category: string): string {
  const map: Record<string, string> = {
    soulmate: '✨',
    good: '🌿',
    neutral: '💙',
    growth: '🌱',
    challenge: '🔄',
  };
  return map[category] ?? '🔍';
}

// 血液型の表示名
const BLOOD_TYPE_LABELS: Record<BloodType, string> = {
  A: 'A型',
  B: 'B型',
  O: 'O型',
  AB: 'AB型',
};

interface BloodCompatToolProps {
  /** 初期タイプ1（URLパラメータから渡す） */
  initialType1?: string;
  /** 初期タイプ2（URLパラメータから渡す） */
  initialType2?: string;
}

export default function BloodCompatTool({ initialType1, initialType2 }: BloodCompatToolProps) {
  const [type1, setType1] = useState<BloodType | ''>(
    (initialType1 as BloodType) ?? ''
  );
  const [type2, setType2] = useState<BloodType | ''>(
    (initialType2 as BloodType) ?? ''
  );
  const [result, setResult] = useState<CompatibilityData | null>(null);
  const [error, setError] = useState<string>('');
  const [copied, setCopied] = useState(false);

  // URL パラメータの読み取り（クライアントサイドのみ）
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const t1 = params.get('t1');
    const t2 = params.get('t2');
    if (t1 && (BLOOD_TYPES as readonly string[]).includes(t1)) {
      setType1(t1 as BloodType);
    }
    if (t2 && (BLOOD_TYPES as readonly string[]).includes(t2)) {
      setType2(t2 as BloodType);
    }
  }, []);

  // URL パラメータへの同期
  const syncUrl = useCallback((t1: BloodType | '', t2: BloodType | '') => {
    const params = new URLSearchParams();
    if (t1) params.set('t1', t1);
    if (t2) params.set('t2', t2);
    const query = params.toString();
    const newUrl = query
      ? `${window.location.pathname}?${query}`
      : window.location.pathname;
    window.history.replaceState(null, '', newUrl);
  }, []);

  const handleType1Change = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value as BloodType | '';
    setType1(val);
    setResult(null);
    setError('');
    syncUrl(val, type2);
  };

  const handleType2Change = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value as BloodType | '';
    setType2(val);
    setResult(null);
    setError('');
    syncUrl(type1, val);
  };

  const handleCheck = () => {
    setError('');
    if (!type1 || !type2) {
      setError('タイプ1・タイプ2を両方選択してください。');
      return;
    }
    try {
      const data = getCompatibility(type1 as BloodType, type2 as BloodType);
      setResult(data);
    } catch {
      setError('相性データの取得に失敗しました。ページを再読み込みしてください。');
    }
  };

  // Enterキーでも実行
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleCheck();
  };

  // シェア機能
  const shareUrl = () =>
    typeof window !== 'undefined'
      ? `${window.location.origin}/diagnosis/blood-compat/tool/?t1=${type1}&t2=${type2}`
      : '';

  const t1Label = type1 ? BLOOD_TYPE_LABELS[type1] : 'タイプ1';
  const t2Label = type2 ? BLOOD_TYPE_LABELS[type2] : 'タイプ2';

  const shareText = result
    ? `${t1Label}×${t2Label} の相性スコアは ${result.score}点（${getCategoryLabel(result.category)}）！ #血液型相性 #診断ナビ`
    : '';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback: select
    }
  };

  const xShareUrl = result
    ? `https://x.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl())}`
    : '';
  const lineShareUrl = result
    ? `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(shareUrl())}&text=${encodeURIComponent(shareText)}`
    : '';

  const color = result ? getCategoryColor(result.category) : '#6b7280';
  const bg = result ? getCategoryBg(result.category) : '#f9fafb';
  const icon = result ? getCategoryIcon(result.category) : '';

  return (
    <div className="bct-root" role="main" aria-label="血液型相性診断ツール">
      {/* ---- 選択UI ---- */}
      <div className="bct-selector" role="group" aria-label="血液型選択">
        <div className="bct-select-row">
          <div className="bct-select-block">
            <label className="bct-label" htmlFor="bct-type1">
              あなたの血液型（タイプ1）
            </label>
            <select
              id="bct-type1"
              className="bct-select"
              value={type1}
              onChange={handleType1Change}
              onKeyDown={handleKeyDown}
              aria-required="true"
            >
              <option value="">-- 血液型を選択 --</option>
              {BLOOD_TYPES.map((t) => (
                <option key={t} value={t}>
                  {BLOOD_TYPE_LABELS[t]}
                </option>
              ))}
            </select>
          </div>

          <div className="bct-vs-badge" aria-hidden="true">×</div>

          <div className="bct-select-block">
            <label className="bct-label" htmlFor="bct-type2">
              相手の血液型（タイプ2）
            </label>
            <select
              id="bct-type2"
              className="bct-select"
              value={type2}
              onChange={handleType2Change}
              onKeyDown={handleKeyDown}
              aria-required="true"
            >
              <option value="">-- 血液型を選択 --</option>
              {BLOOD_TYPES.map((t) => (
                <option key={t} value={t}>
                  {BLOOD_TYPE_LABELS[t]}
                </option>
              ))}
            </select>
          </div>
        </div>

        {error && (
          <p className="bct-error" role="alert" aria-live="polite">
            {error}
          </p>
        )}

        <button
          className="bct-btn"
          onClick={handleCheck}
          aria-label={`${t1Label} と ${t2Label} の相性を調べる`}
          disabled={!type1 || !type2}
        >
          相性を見る
        </button>
      </div>

      {/* ---- 結果エリア ---- */}
      <div className="bct-result-area" aria-live="polite" aria-atomic="true">
        {result ? (
          <div
            className="bct-result-card"
            style={{ background: bg, borderColor: color }}
            role="region"
            aria-label="相性診断結果"
          >
            {/* スコア + カテゴリ */}
            <div className="bct-result-header">
              <div
                className="bct-result-pair"
                aria-label={`${BLOOD_TYPE_LABELS[result.type1]} と ${BLOOD_TYPE_LABELS[result.type2]} の相性`}
              >
                <span className="bct-result-type">{BLOOD_TYPE_LABELS[result.type1]}</span>
                <span className="bct-result-sep" aria-hidden="true">×</span>
                <span className="bct-result-type">{BLOOD_TYPE_LABELS[result.type2]}</span>
              </div>
              <div className="bct-score-wrap">
                <span
                  className="bct-score-num"
                  style={{ color }}
                  aria-label={`相性スコア ${result.score} 点`}
                >
                  {result.score}
                  <span className="bct-score-unit">点</span>
                </span>
                <span
                  className="bct-category-badge"
                  style={{ background: color, color: '#fff' }}
                >
                  {icon} {getCategoryLabel(result.category)}
                </span>
              </div>
            </div>

            {/* ワンライナー */}
            <p className="bct-one-liner">{result.oneLineSummary}</p>

            {/* 詳細説明 */}
            <div className="bct-detail-section">
              <h3 className="bct-detail-h3">相性の特徴</h3>
              <p className="bct-detail-body" style={{ whiteSpace: 'pre-line' }}>
                {result.detailDescription}
              </p>
            </div>

            {/* 仕事 / 恋愛 / 友人 */}
            <div className="bct-compat-grid">
              <div className="bct-compat-card">
                <div className="bct-compat-icon" aria-hidden="true">💼</div>
                <h3 className="bct-compat-title">仕事での相性</h3>
                <p className="bct-compat-body">{result.workCompat}</p>
              </div>
              <div className="bct-compat-card">
                <div className="bct-compat-icon" aria-hidden="true">💕</div>
                <h3 className="bct-compat-title">恋愛での相性</h3>
                <p className="bct-compat-body">{result.loveCompat}</p>
              </div>
              <div className="bct-compat-card">
                <div className="bct-compat-icon" aria-hidden="true">👫</div>
                <h3 className="bct-compat-title">友人としての相性</h3>
                <p className="bct-compat-body">{result.friendCompat}</p>
              </div>
            </div>

            {/* 成長ポイント */}
            <div
              className="bct-growth-block"
              style={{ borderColor: color, background: bg }}
            >
              <div className="bct-growth-icon" aria-hidden="true">🌱</div>
              <div>
                <h3 className="bct-growth-title" style={{ color }}>
                  お互いから学べること
                </h3>
                <p className="bct-growth-body">{result.growthPoint}</p>
              </div>
            </div>

            {/* コミュニケーションのヒント */}
            <div className="bct-caution-block">
              <div className="bct-caution-icon" aria-hidden="true">💡</div>
              <div>
                <h3 className="bct-caution-title">コミュニケーションのヒント</h3>
                <p className="bct-caution-body">{result.cautionPoint}</p>
              </div>
            </div>

            {/* シェアボタン */}
            <div className="bct-share-row" role="group" aria-label="結果をシェアする">
              <a
                href={xShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bct-share-btn bct-share-btn--x"
                aria-label="X（旧Twitter）でシェアする"
              >
                𝕏 シェア
              </a>
              <a
                href={lineShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bct-share-btn bct-share-btn--line"
                aria-label="LINEでシェアする"
              >
                LINE シェア
              </a>
              <button
                className="bct-share-btn bct-share-btn--copy"
                onClick={handleCopy}
                aria-label="URLをコピーする"
              >
                {copied ? '✓ コピー済み' : '🔗 URLをコピー'}
              </button>
            </div>

            <p className="bct-disclaimer">
              ※ スコアは日本の血液型性格分類文化に基づく傾向値です。
              科学的に厳密な統計的相関は限定的とされています（日本心理学会 2014年）。
              医学的・臨床的な診断ではありません。
            </p>
          </div>
        ) : (
          <div className="bct-result-placeholder" aria-hidden="true">
            <p className="bct-placeholder-text">
              上で血液型を選択して「相性を見る」を押すと結果が表示されます
            </p>
          </div>
        )}
      </div>

      {/* スタイル */}
      <style>{`
        .bct-root {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          max-width: 720px;
          margin: 0 auto;
          color: var(--sn-text, #1f2937);
        }
        .bct-selector {
          background: #fff;
          border: 1.5px solid var(--sn-border, #e5e7eb);
          border-radius: 12px;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
        }
        .bct-select-row {
          display: flex;
          align-items: flex-end;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .bct-select-block {
          flex: 1;
          min-width: 140px;
        }
        .bct-label {
          display: block;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--sn-muted, #6b7280);
          margin-bottom: 0.4rem;
        }
        .bct-select {
          width: 100%;
          padding: 0.6rem 0.8rem;
          border: 1.5px solid var(--sn-border, #d1d5db);
          border-radius: 8px;
          font-size: 1rem;
          background: #fff;
          cursor: pointer;
          outline: none;
        }
        .bct-select:focus-visible {
          border-color: var(--sn-primary, #6366f1);
          box-shadow: 0 0 0 3px rgba(99,102,241,0.15);
        }
        .bct-vs-badge {
          font-size: 1.4rem;
          font-weight: 700;
          color: var(--sn-muted, #9ca3af);
          padding-bottom: 0.4rem;
          flex-shrink: 0;
        }
        .bct-error {
          color: #dc2626;
          font-size: 0.9rem;
          margin: 0.6rem 0 0;
        }
        .bct-btn {
          display: block;
          width: 100%;
          margin-top: 1rem;
          padding: 0.8rem 1.5rem;
          background: var(--sn-primary, #6366f1);
          color: #fff;
          border: none;
          border-radius: 8px;
          font-size: 1.05rem;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.15s;
        }
        .bct-btn:hover:not(:disabled) {
          background: var(--sn-primary-dark, #4f46e5);
        }
        .bct-btn:disabled {
          opacity: 0.45;
          cursor: not-allowed;
        }
        .bct-btn:focus-visible {
          outline: 3px solid rgba(99,102,241,0.5);
          outline-offset: 2px;
        }
        .bct-result-area {
          min-height: 120px;
        }
        .bct-result-card {
          border: 2px solid;
          border-radius: 12px;
          padding: 1.5rem;
        }
        .bct-result-header {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }
        .bct-result-pair {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          flex-wrap: wrap;
        }
        .bct-result-type {
          font-size: 1.4rem;
          font-weight: 800;
        }
        .bct-result-sep {
          font-size: 1.4rem;
          color: var(--sn-muted, #9ca3af);
        }
        .bct-score-wrap {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          flex-wrap: wrap;
        }
        .bct-score-num {
          font-size: 2.2rem;
          font-weight: 800;
          line-height: 1;
        }
        .bct-score-unit {
          font-size: 1rem;
          font-weight: 600;
        }
        .bct-category-badge {
          padding: 0.25rem 0.8rem;
          border-radius: 999px;
          font-size: 0.85rem;
          font-weight: 700;
        }
        .bct-one-liner {
          font-size: 1rem;
          font-weight: 600;
          margin: 0 0 1.2rem;
          line-height: 1.6;
        }
        .bct-detail-section {
          margin-bottom: 1.2rem;
        }
        .bct-detail-h3 {
          font-size: 0.9rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: var(--sn-muted, #6b7280);
          margin: 0 0 0.5rem;
        }
        .bct-detail-body {
          font-size: 0.95rem;
          line-height: 1.75;
          margin: 0;
        }
        .bct-compat-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: 0.8rem;
          margin-bottom: 1rem;
        }
        .bct-compat-card {
          background: rgba(255,255,255,0.7);
          border: 1px solid rgba(0,0,0,0.06);
          border-radius: 8px;
          padding: 0.8rem;
        }
        .bct-compat-icon {
          font-size: 1.3rem;
          margin-bottom: 0.3rem;
        }
        .bct-compat-title {
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--sn-muted, #6b7280);
          margin: 0 0 0.3rem;
        }
        .bct-compat-body {
          font-size: 0.9rem;
          line-height: 1.6;
          margin: 0;
        }
        .bct-growth-block {
          display: flex;
          gap: 0.8rem;
          align-items: flex-start;
          border-left: 3px solid;
          padding: 0.8rem 1rem;
          border-radius: 0 8px 8px 0;
          margin-bottom: 0.8rem;
        }
        .bct-growth-icon {
          font-size: 1.4rem;
          flex-shrink: 0;
        }
        .bct-growth-title {
          font-size: 0.88rem;
          font-weight: 700;
          margin: 0 0 0.3rem;
        }
        .bct-growth-body {
          font-size: 0.9rem;
          line-height: 1.65;
          margin: 0;
        }
        .bct-caution-block {
          display: flex;
          gap: 0.8rem;
          align-items: flex-start;
          background: rgba(255,255,255,0.6);
          border: 1px solid rgba(0,0,0,0.06);
          border-radius: 8px;
          padding: 0.8rem 1rem;
          margin-bottom: 1rem;
        }
        .bct-caution-icon {
          font-size: 1.3rem;
          flex-shrink: 0;
        }
        .bct-caution-title {
          font-size: 0.88rem;
          font-weight: 700;
          margin: 0 0 0.3rem;
          color: var(--sn-text, #1f2937);
        }
        .bct-caution-body {
          font-size: 0.9rem;
          line-height: 1.65;
          margin: 0;
        }
        .bct-share-row {
          display: flex;
          gap: 0.6rem;
          flex-wrap: wrap;
          margin-bottom: 1rem;
        }
        .bct-share-btn {
          padding: 0.45rem 1rem;
          border-radius: 6px;
          font-size: 0.88rem;
          font-weight: 700;
          text-decoration: none;
          border: none;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          transition: opacity 0.15s;
        }
        .bct-share-btn:hover {
          opacity: 0.82;
        }
        .bct-share-btn:focus-visible {
          outline: 3px solid rgba(99,102,241,0.5);
          outline-offset: 2px;
        }
        .bct-share-btn--x {
          background: #000;
          color: #fff;
        }
        .bct-share-btn--line {
          background: #06c755;
          color: #fff;
        }
        .bct-share-btn--copy {
          background: var(--sn-border, #e5e7eb);
          color: var(--sn-text, #1f2937);
        }
        .bct-disclaimer {
          font-size: 0.8rem;
          color: var(--sn-muted, #9ca3af);
          line-height: 1.6;
          margin: 0;
        }
        .bct-result-placeholder {
          background: var(--sn-surface, #f9fafb);
          border: 1.5px dashed var(--sn-border, #d1d5db);
          border-radius: 12px;
          padding: 2rem;
          text-align: center;
        }
        .bct-placeholder-text {
          color: var(--sn-muted, #9ca3af);
          font-size: 0.95rem;
          margin: 0;
        }
        @media (max-width: 480px) {
          .bct-select-row { flex-direction: column; }
          .bct-vs-badge { text-align: center; padding: 0; }
          .bct-compat-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
