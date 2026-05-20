/**
 * MbtiCompatTool.tsx - MBTI相性診断ツール React島
 *
 * 機能:
 * - タイプ1 / タイプ2 選択（グループ分けドロップダウン）
 * - 「相性を見る」ボタン → getCompatibility で即時結果表示
 * - URL ?t1=INTJ&t2=ENFP 形式に同期（共有可能URL）
 * - スコア・カテゴリ・仕事相性・恋愛相性・成長ポイント・注意点を表示
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
 * 確認日: 2026-05-20
 */

import { useState, useEffect, useCallback } from 'react';
import {
  getCompatibility,
  getCategoryLabel,
  getCategoryColor,
} from '../data/diagnoses/mbti-compat/results';
import { MBTI_TYPES } from '../data/diagnoses/mbti-compat/meta';
import type { MBTIType } from '../data/diagnoses/mbti-compat/meta';
import type { CompatibilityData } from '../data/diagnoses/mbti-compat/compatibility';

// グループ分け（ドロップダウン optgroup 用）
const TYPE_GROUPS: { label: string; types: MBTIType[] }[] = [
  { label: 'NT 合理主義者', types: ['INTJ', 'INTP', 'ENTJ', 'ENTP'] },
  { label: 'NF 理想主義者', types: ['INFJ', 'INFP', 'ENFJ', 'ENFP'] },
  { label: 'SJ 保護者', types: ['ISTJ', 'ISFJ', 'ESTJ', 'ESFJ'] },
  { label: 'SP 職人', types: ['ISTP', 'ISFP', 'ESTP', 'ESFP'] },
];

// カテゴリ別 スコア背景色（薄め）
function getCategoryBg(category: string): string {
  const map: Record<string, string> = {
    soulmate: '#f3e8ff',
    good: '#d1fae5',
    neutral: '#dbeafe',
    tough: '#fef3c7',
    opposite: '#fee2e2',
  };
  return map[category] ?? '#f9fafb';
}

// カテゴリ別 アイコン
function getCategoryIcon(category: string): string {
  const map: Record<string, string> = {
    soulmate: '✨',
    good: '🌿',
    neutral: '💙',
    tough: '🌱',
    opposite: '🔄',
  };
  return map[category] ?? '🔍';
}

interface MbtiCompatToolProps {
  /** 初期タイプ1（URLパラメータから渡す） */
  initialType1?: string;
  /** 初期タイプ2（URLパラメータから渡す） */
  initialType2?: string;
}

export default function MbtiCompatTool({ initialType1, initialType2 }: MbtiCompatToolProps) {
  const [type1, setType1] = useState<MBTIType | ''>(
    (initialType1 as MBTIType) ?? ''
  );
  const [type2, setType2] = useState<MBTIType | ''>(
    (initialType2 as MBTIType) ?? ''
  );
  const [result, setResult] = useState<CompatibilityData | null>(null);
  const [error, setError] = useState<string>('');
  const [copied, setCopied] = useState(false);

  // URL パラメータの読み取り（クライアントサイドのみ）
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const t1 = params.get('t1');
    const t2 = params.get('t2');
    if (t1 && (MBTI_TYPES as readonly string[]).includes(t1)) {
      setType1(t1 as MBTIType);
    }
    if (t2 && (MBTI_TYPES as readonly string[]).includes(t2)) {
      setType2(t2 as MBTIType);
    }
  }, []);

  // URL パラメータへの同期
  const syncUrl = useCallback((t1: MBTIType | '', t2: MBTIType | '') => {
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
    const val = e.target.value as MBTIType | '';
    setType1(val);
    setResult(null);
    setError('');
    syncUrl(val, type2);
  };

  const handleType2Change = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value as MBTIType | '';
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
    if (type1 === type2) {
      // 同タイプは自分自身との相性（データあり）
    }
    try {
      const data = getCompatibility(type1 as MBTIType, type2 as MBTIType);
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
      ? `${window.location.origin}/diagnosis/mbti-compat/tool/?t1=${type1}&t2=${type2}`
      : '';

  const shareText = result
    ? `${type1}×${type2} の相性スコアは ${result.score}点（${getCategoryLabel(result.category)}）！ #MBTI相性 #診断ナビ`
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
    <div className="mct-root" role="main" aria-label="MBTI相性診断ツール">
      {/* ---- 選択UI ---- */}
      <div className="mct-selector" role="group" aria-label="タイプ選択">
        <div className="mct-select-row">
          <div className="mct-select-block">
            <label className="mct-label" htmlFor="mct-type1">
              あなたのタイプ（タイプ1）
            </label>
            <select
              id="mct-type1"
              className="mct-select"
              value={type1}
              onChange={handleType1Change}
              onKeyDown={handleKeyDown}
              aria-required="true"
            >
              <option value="">-- タイプを選択 --</option>
              {TYPE_GROUPS.map((group) => (
                <optgroup key={group.label} label={group.label}>
                  {group.types.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>

          <div className="mct-vs-badge" aria-hidden="true">×</div>

          <div className="mct-select-block">
            <label className="mct-label" htmlFor="mct-type2">
              相手のタイプ（タイプ2）
            </label>
            <select
              id="mct-type2"
              className="mct-select"
              value={type2}
              onChange={handleType2Change}
              onKeyDown={handleKeyDown}
              aria-required="true"
            >
              <option value="">-- タイプを選択 --</option>
              {TYPE_GROUPS.map((group) => (
                <optgroup key={group.label} label={group.label}>
                  {group.types.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>
        </div>

        {error && (
          <p className="mct-error" role="alert" aria-live="polite">
            {error}
          </p>
        )}

        <button
          className="mct-btn"
          onClick={handleCheck}
          aria-label={`${type1 || 'タイプ1'} と ${type2 || 'タイプ2'} の相性を調べる`}
          disabled={!type1 || !type2}
        >
          相性を見る
        </button>
      </div>

      {/* ---- 結果エリア ---- */}
      <div className="mct-result-area" aria-live="polite" aria-atomic="true">
        {result ? (
          <div
            className="mct-result-card"
            style={{ background: bg, borderColor: color }}
            role="region"
            aria-label="相性診断結果"
          >
            {/* スコア + カテゴリ */}
            <div className="mct-result-header">
              <div className="mct-result-pair" aria-label={`${result.type1} と ${result.type2} の相性`}>
                <span className="mct-result-type">{result.type1}</span>
                <span className="mct-result-sep" aria-hidden="true">×</span>
                <span className="mct-result-type">{result.type2}</span>
              </div>
              <div className="mct-score-wrap">
                <span
                  className="mct-score-num"
                  style={{ color }}
                  aria-label={`相性スコア ${result.score} 点`}
                >
                  {result.score}
                  <span className="mct-score-unit">点</span>
                </span>
                <span
                  className="mct-category-badge"
                  style={{ background: color, color: '#fff' }}
                >
                  {icon} {getCategoryLabel(result.category)}
                </span>
              </div>
            </div>

            {/* ワンライナー */}
            <p className="mct-one-liner">{result.oneLineSummary}</p>

            {/* 詳細説明 */}
            <div className="mct-detail-section">
              <h3 className="mct-detail-h3">相性の特徴</h3>
              <p className="mct-detail-body" style={{ whiteSpace: 'pre-line' }}>
                {result.detailDescription}
              </p>
            </div>

            {/* 仕事 / 恋愛 */}
            <div className="mct-compat-grid">
              <div className="mct-compat-card">
                <div className="mct-compat-icon" aria-hidden="true">💼</div>
                <h3 className="mct-compat-title">仕事での相性</h3>
                <p className="mct-compat-body">{result.workCompat}</p>
              </div>
              <div className="mct-compat-card">
                <div className="mct-compat-icon" aria-hidden="true">💕</div>
                <h3 className="mct-compat-title">恋愛での相性</h3>
                <p className="mct-compat-body">{result.loveCompat}</p>
              </div>
            </div>

            {/* 成長ポイント */}
            <div
              className="mct-growth-block"
              style={{ borderColor: color, background: `${bg}` }}
            >
              <div className="mct-growth-icon" aria-hidden="true">🌱</div>
              <div>
                <h3 className="mct-growth-title" style={{ color }}>
                  成長ポイント（Beebe 2017理論）
                </h3>
                <p className="mct-growth-body">{result.growthPoint}</p>
              </div>
            </div>

            {/* 注意点 */}
            <div className="mct-caution-block">
              <div className="mct-caution-icon" aria-hidden="true">💡</div>
              <div>
                <h3 className="mct-caution-title">コミュニケーションのヒント</h3>
                <p className="mct-caution-body">{result.cautionPoint}</p>
              </div>
            </div>

            {/* シェアボタン */}
            <div className="mct-share-row" role="group" aria-label="結果をシェアする">
              <a
                href={xShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mct-share-btn mct-share-btn--x"
                aria-label="X（旧Twitter）でシェアする"
              >
                𝕏 シェア
              </a>
              <a
                href={lineShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mct-share-btn mct-share-btn--line"
                aria-label="LINEでシェアする"
              >
                LINE シェア
              </a>
              <button
                className="mct-share-btn mct-share-btn--copy"
                onClick={handleCopy}
                aria-label="URLをコピーする"
              >
                {copied ? '✓ コピー済み' : '🔗 URLをコピー'}
              </button>
            </div>

            <p className="mct-disclaimer">
              ※ スコアは傾向値です。個人差・環境・関係の深さによって大きく異なります。
              医学的・臨床的な診断ではありません。
            </p>
          </div>
        ) : (
          <div className="mct-result-placeholder" aria-hidden="true">
            <p className="mct-placeholder-text">
              上でタイプを選択して「相性を見る」を押すと結果が表示されます
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
