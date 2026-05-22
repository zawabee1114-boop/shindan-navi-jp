/**
 * IntegratedProfileViewer.tsx - 統合プロファイル表示 React島
 *
 * 8診断の結果を統合し、特性レーダーと5シーン軸スコアを表示する。
 * client:load で即時 hydration（プロファイルページのメイン機能）
 *
 * 重要ルール:
 * - Big5/OCEAN/ビッグファイブ ユーザー向け表記絶対NG → 「特性」「傾向」のみ
 * - 医療・精神疾患言及NG
 * - 占い口調・運命論NG
 * - LGBTQ+ 配慮（中性的表現）
 * - WCAG 2.1 AA 準拠
 * - LocalStorage のみ（サーバー送信なし）
 */

import { useEffect, useState } from 'react';
import { trackIntegratedProfileView, trackDiagnosisCountMilestone } from '../lib/analytics';
import type { IntegratedProfile, SceneScore } from '../lib/integrated-profile/types';
import { DIAGNOSIS_LIST } from '../lib/integrated-profile/types';

interface IntegratedProfileViewerProps {
  /** 表示する軸（undefined で全軸表示）*/
  axis?: 'work' | 'love' | 'friend' | 'family' | 'school';
  /** 軸単体表示モードか */
  singleAxisMode?: boolean;
}

// シーン軸の表示設定
const SCENE_META = {
  work: {
    label: '仕事',
    icon: '💼',
    color: 'var(--sn-scene-work)',
    bg: 'var(--sn-scene-work-bg, #eff6ff)',
    description: 'キャリアやチームでの立ち位置',
  },
  love: {
    label: '恋愛',
    icon: '💕',
    color: 'var(--sn-scene-love)',
    bg: 'var(--sn-scene-love-bg, #fdf2f8)',
    description: 'パートナーとの関係や愛情表現のスタイル',
  },
  friend: {
    label: '友人',
    icon: '👥',
    color: 'var(--sn-scene-friend)',
    bg: 'var(--sn-scene-friend-bg, #f0fdf4)',
    description: '友人関係や社交性のパターン',
  },
  family: {
    label: '家族',
    icon: '🏠',
    color: 'var(--sn-scene-family, #f59e0b)',
    bg: 'var(--sn-scene-family-bg, #fffbeb)',
    description: '家族との調和・コミュニケーションの傾向',
  },
  school: {
    label: '学校・学習',
    icon: '📚',
    color: 'var(--sn-scene-school)',
    bg: 'var(--sn-scene-school-bg, #f5f3ff)',
    description: '学習スタイルや知的好奇心の傾向',
  },
} as const;

/** 特性ドーナツチャート（SVG）*/
function DonutChart({ score, color }: { score: number; color: string }) {
  const r = 36;
  const circ = 2 * Math.PI * r;
  const filled = (score / 100) * circ;
  const displayScore = Math.round(score);

  return (
    <div className="ipv-donut" role="img" aria-label={`特性スコア ${displayScore}点`}>
      <svg width={96} height={96} viewBox="0 0 96 96" aria-hidden="true">
        <circle cx={48} cy={48} r={r} fill="none" stroke="#f3f4f6" strokeWidth={10} />
        <circle
          cx={48}
          cy={48}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={10}
          strokeDasharray={`${filled} ${circ}`}
          strokeLinecap="round"
          transform="rotate(-90 48 48)"
          style={{ transition: 'stroke-dasharray 0.8s cubic-bezier(0, 0, 0.2, 1)' }}
        />
        <text
          x={48}
          y={44}
          textAnchor="middle"
          fontSize={18}
          fontWeight={900}
          fill={color}
          fontFamily="system-ui, sans-serif"
        >
          {displayScore}
        </text>
        <text
          x={48}
          y={58}
          textAnchor="middle"
          fontSize={10}
          fill="#9ca3af"
          fontFamily="system-ui, sans-serif"
        >
          点
        </text>
      </svg>
    </div>
  );
}

/** シーン軸カード */
function SceneScoreCard({
  sceneKey,
  scoreData,
}: {
  sceneKey: keyof typeof SCENE_META;
  scoreData: SceneScore;
}) {
  const meta = SCENE_META[sceneKey];
  return (
    <div
      className="ipv-scene-card"
      style={{ '--scene-color': meta.color, '--scene-bg': meta.bg } as React.CSSProperties}
    >
      <div className="ipv-scene-header">
        <span className="ipv-scene-icon" aria-hidden="true">{meta.icon}</span>
        <div className="ipv-scene-title-group">
          <h3 className="ipv-scene-title">{meta.label}</h3>
          <p className="ipv-scene-desc">{meta.description}</p>
        </div>
        <DonutChart score={scoreData.score} color={meta.color} />
      </div>

      <div className="ipv-scene-label-badge" aria-label={`あなたのタイプ: ${scoreData.label}`}>
        {scoreData.label}
      </div>

      <div className="ipv-scene-body">
        <div className="ipv-scene-section">
          <h4 className="ipv-scene-section-title">
            <span aria-hidden="true">✅</span> 強み
          </h4>
          <ul className="ipv-tag-list" aria-label={`${meta.label}での強み`}>
            {scoreData.topStrengths.map((s) => (
              <li key={s} className="ipv-tag ipv-tag--strength">{s}</li>
            ))}
          </ul>
        </div>

        {scoreData.cautions.length > 0 && (
          <div className="ipv-scene-section">
            <h4 className="ipv-scene-section-title">
              <span aria-hidden="true">💡</span> 意識するポイント
            </h4>
            <ul className="ipv-tag-list" aria-label={`${meta.label}での注意点`}>
              {scoreData.cautions.map((c) => (
                <li key={c} className="ipv-tag ipv-tag--caution">{c}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

/** 特性レーダー（Big5ベース・「特性」表記で表示） */
function TraitRadar({ b5 }: { b5: { O: number; C: number; E: number; A: number; N: number } }) {
  // Big5をユーザー向け特性ラベルにマッピング（OCEAN表記を完全に隠す）
  const traits = [
    { label: '創造・好奇心',  value: b5.O, color: '#8b5cf6' },
    { label: '計画・誠実さ',  value: b5.C, color: '#3b82f6' },
    { label: '社交・行動力',  value: b5.E, color: '#10b981' },
    { label: '協調・思いやり', value: b5.A, color: '#ec4899' },
    { label: '感受性',        value: b5.N, color: '#f59e0b' },
  ];

  const cx = 120;
  const cy = 120;
  const maxR = 80;
  const count = traits.length;

  function getPts(r: number, offset = -Math.PI / 2) {
    return traits.map((_, i) => {
      const angle = offset + (2 * Math.PI * i) / count;
      return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)] as [number, number];
    });
  }

  const dataPts = traits.map((t, i) => {
    const r = (t.value / 100) * maxR;
    const angle = -Math.PI / 2 + (2 * Math.PI * i) / count;
    return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)] as [number, number];
  });

  const labelPts = getPts(maxR + 30);
  const outerPts = getPts(maxR);
  const toStr = (pts: [number, number][]) => pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ');

  return (
    <div className="ipv-radar" role="figure" aria-label="特性レーダーチャート">
      <svg width={240} height={240} viewBox="0 0 240 240" aria-hidden="true" style={{ overflow: 'visible', maxWidth: '100%', height: 'auto' }}>
        {/* グリッド */}
        {[0.2, 0.4, 0.6, 0.8, 1.0].map((level) => (
          <polygon key={level} points={toStr(getPts(maxR * level))} fill="none" stroke="#e5e7eb" strokeWidth={1} />
        ))}
        {/* 軸線 */}
        {outerPts.map(([x, y], i) => (
          <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="#e5e7eb" strokeWidth={1} />
        ))}
        {/* データポリゴン */}
        <polygon
          points={toStr(dataPts)}
          fill="url(#ipv-grad)"
          stroke="#6366f1"
          strokeWidth={2.5}
          strokeLinejoin="round"
        />
        <defs>
          <linearGradient id="ipv-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        {/* 頂点 */}
        {dataPts.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={4} fill={traits[i].color} stroke="#fff" strokeWidth={1.5} />
        ))}
        {/* ラベル */}
        {labelPts.map(([x, y], i) => {
          const anchor = x < cx - 5 ? 'end' : x > cx + 5 ? 'start' : 'middle';
          return (
            <g key={i}>
              <text x={x} y={y - 2} fontSize={10} fontWeight={700} fill={traits[i].color} textAnchor={anchor}>
                {traits[i].label}
              </text>
              <text x={x} y={y + 12} fontSize={9} fill="#6b7280" textAnchor={anchor}>
                {traits[i].value}点
              </text>
            </g>
          );
        })}
      </svg>

      {/* スクリーンリーダー向けテーブル */}
      <table aria-label="特性スコア一覧" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }}>
        <thead><tr><th>特性</th><th>スコア</th></tr></thead>
        <tbody>
          {traits.map((t) => <tr key={t.label}><th scope="row">{t.label}</th><td>{t.value}点</td></tr>)}
        </tbody>
      </table>
    </div>
  );
}

/** 診断完了チェックリスト */
function DiagnosisChecklist({ profile }: { profile: IntegratedProfile }) {
  return (
    <div className="ipv-checklist" aria-label="8診断の受診状況">
      {DIAGNOSIS_LIST.map((d) => {
        const entry = profile.diagnosisResults[d.id];
        const done = entry !== null && entry !== undefined;
        return (
          <div
            key={d.id}
            className={`ipv-check-item ${done ? 'ipv-check-item--done' : ''}`}
            style={{ '--diag-color': d.color } as React.CSSProperties}
          >
            <span className="ipv-check-icon" aria-hidden="true">{done ? '✅' : d.icon}</span>
            <div className="ipv-check-body">
              <span className="ipv-check-label">{d.label}</span>
              {done && entry && (
                <span className="ipv-check-type">
                  タイプ: {entry.typeId}
                </span>
              )}
            </div>
            {done ? (
              <a href={d.resultPath} className="ipv-check-action" aria-label={`${d.label}の結果を見る`}>
                結果へ
              </a>
            ) : (
              <a href={d.diagnosisPath} className="ipv-check-action ipv-check-action--todo" aria-label={`${d.label}を受ける`}>
                受ける →
              </a>
            )}
          </div>
        );
      })}
    </div>
  );
}

/** プログレスバー */
function ProfileProgress({ profile }: { profile: IntegratedProfile }) {
  const pct = profile.completionRate;
  return (
    <div className="ipv-progress-wrap">
      <div className="ipv-progress-row">
        <span className="ipv-progress-label">統合プロファイル完成度</span>
        <span className="ipv-progress-pct" aria-live="polite">{profile.completedCount} / 8 診断完了</span>
      </div>
      <div
        className="ipv-progress-bar-track"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`統合プロファイル完成度 ${pct}%`}
      >
        <div
          className="ipv-progress-bar-fill"
          style={{ width: `${pct}%`, transition: 'width 0.8s cubic-bezier(0, 0, 0.2, 1)' }}
        />
      </div>
      {profile.completedCount === 0 && (
        <p className="ipv-progress-hint">
          最初の診断を受けると、あなたの特性プロファイルが作られます。
        </p>
      )}
      {profile.completedCount > 0 && profile.completedCount < 8 && (
        <p className="ipv-progress-hint">
          あと <strong>{8 - profile.completedCount}</strong> つの診断で完成します。
        </p>
      )}
      {profile.completedCount === 8 && (
        <p className="ipv-progress-hint ipv-progress-hint--done">
          8診断すべて完了！総合プロファイルが揃いました。
        </p>
      )}
    </div>
  );
}

// ローディングプレースホルダー
function LoadingPlaceholder() {
  return (
    <div className="ipv-loading" aria-busy="true" aria-label="プロファイル読み込み中">
      <div className="ipv-loading-spinner" aria-hidden="true" />
      <p className="ipv-loading-text">プロファイルを読み込んでいます...</p>
    </div>
  );
}

// メインコンポーネント
export default function IntegratedProfileViewer({
  axis,
  singleAxisMode = false,
}: IntegratedProfileViewerProps) {
  const [profile, setProfile] = useState<IntegratedProfile | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // 動的インポートでSSRエラー回避
    import('../lib/integrated-profile/aggregator').then(({ generateIntegratedProfile }) => {
      try {
        const p = generateIntegratedProfile();
        setProfile(p);
        trackIntegratedProfileView(p.completedCount);
        if (p.completedCount === 3 || p.completedCount === 8) {
          trackDiagnosisCountMilestone(p.completedCount as 3 | 8);
        }
      } catch (e) {
        console.error('IntegratedProfile generation failed:', e);
      }
    });
  }, []);

  if (!mounted) return <LoadingPlaceholder />;
  if (!profile) return <LoadingPlaceholder />;

  // 単軸モード（/aisei/* ページ用）
  if (singleAxisMode && axis) {
    const scoreData = profile.sceneScores[axis];
    return (
      <div className="ipv-single-axis">
        <ProfileProgress profile={profile} />
        {profile.completedCount > 0 ? (
          <SceneScoreCard sceneKey={axis} scoreData={scoreData} />
        ) : (
          <div className="ipv-empty">
            <p className="ipv-empty-text">
              診断を受けると、{SCENE_META[axis].label}での特性が表示されます。
            </p>
            <a href="/diagnosis/" className="ipv-cta-btn">診断を受ける →</a>
          </div>
        )}
        <div className="ipv-back-link">
          <a href="/profile/">← 総合プロファイルを見る</a>
        </div>

        <style>{IPV_STYLES}</style>
      </div>
    );
  }

  // 全軸表示モード（/profile/ ページ用）
  const scenes = axis ? [axis] : (['work', 'love', 'friend', 'family', 'school'] as const);

  return (
    <div className="ipv-root">
      {/* 完成度プログレス */}
      <ProfileProgress profile={profile} />

      {/* 診断チェックリスト */}
      <section className="ipv-section">
        <h2 className="ipv-section-title">
          <span aria-hidden="true">📋</span> 8診断の受診状況
        </h2>
        <DiagnosisChecklist profile={profile} />
      </section>

      {profile.completedCount > 0 ? (
        <>
          {/* 特性レーダー */}
          <section className="ipv-section">
            <h2 className="ipv-section-title">
              <span aria-hidden="true">🎯</span> 特性レーダー
            </h2>
            <p className="ipv-section-desc">
              {profile.completedCount}診断の結果を統合した、あなたの特性パターンです。
              最も強い特性: <strong>{profile.dominantTrait}</strong>
            </p>
            <div className="ipv-radar-wrap">
              <TraitRadar b5={profile.aggregatedBig5} />
            </div>
          </section>

          {/* 5シーン軸スコア */}
          <section className="ipv-section">
            <h2 className="ipv-section-title">
              <span aria-hidden="true">🌐</span> 5シーン別 特性スコア
            </h2>
            <p className="ipv-section-desc">
              仕事・恋愛・友人・家族・学習の5場面で、あなたの傾向がどう現れるかを示します。
            </p>
            <div className="ipv-scene-grid">
              {scenes.map((s) => (
                <SceneScoreCard key={s} sceneKey={s} scoreData={profile.sceneScores[s]} />
              ))}
            </div>
          </section>
        </>
      ) : (
        <div className="ipv-empty">
          <span className="ipv-empty-icon" aria-hidden="true">🔒</span>
          <p className="ipv-empty-title">まず最初の診断を受けましょう</p>
          <p className="ipv-empty-text">
            1つ診断を受けると、特性レーダーと5シーン軸スコアが表示されます。
          </p>
          <a href="/diagnosis/" className="ipv-cta-btn">診断を受ける →</a>
        </div>
      )}

      <style>{IPV_STYLES}</style>
    </div>
  );
}

const IPV_STYLES = `
  .ipv-root {
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
  }

  .ipv-single-axis {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  /* プログレス */
  .ipv-progress-wrap {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem 1.25rem;
    background: var(--sn-bg-white, #fff);
    border-radius: var(--sn-radius-md, 12px);
    border: 1px solid var(--sn-border, #e5e7eb);
  }
  .ipv-progress-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .ipv-progress-label {
    font-size: 0.8125rem;
    font-weight: 700;
    color: var(--sn-text-soft, #6b7280);
  }
  .ipv-progress-pct {
    font-family: var(--sn-font-rounded, sans-serif);
    font-size: 0.9375rem;
    font-weight: 900;
    color: var(--sn-primary, #6366f1);
  }
  .ipv-progress-bar-track {
    height: 10px;
    background: #f3f4f6;
    border-radius: 999px;
    overflow: hidden;
  }
  .ipv-progress-bar-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--sn-primary, #6366f1), #8b5cf6);
    border-radius: 999px;
  }
  .ipv-progress-hint {
    font-size: 0.75rem;
    color: var(--sn-muted, #9ca3af);
    margin: 0;
  }
  .ipv-progress-hint--done {
    color: var(--sn-success, #10b981);
    font-weight: 700;
  }

  /* セクション */
  .ipv-section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .ipv-section-title {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-family: var(--sn-font-rounded, sans-serif);
    font-size: 1.125rem;
    font-weight: 900;
    color: var(--sn-text, #111827);
    margin: 0;
  }
  .ipv-section-desc {
    font-size: 0.875rem;
    color: var(--sn-text-soft, #6b7280);
    line-height: 1.6;
    margin: 0;
  }

  /* チェックリスト */
  .ipv-checklist {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .ipv-check-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    background: var(--sn-bg-white, #fff);
    border-radius: var(--sn-radius-md, 12px);
    border: 1px solid var(--sn-border, #e5e7eb);
    border-left: 3px solid var(--diag-color, #e5e7eb);
  }
  .ipv-check-item--done {
    border-left-color: var(--sn-success, #10b981);
    background: color-mix(in srgb, var(--sn-success, #10b981) 3%, #fff);
  }
  .ipv-check-icon {
    font-size: 1.375rem;
    flex-shrink: 0;
    line-height: 1;
  }
  .ipv-check-body {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
  }
  .ipv-check-label {
    font-size: 0.875rem;
    font-weight: 700;
    color: var(--sn-text, #111827);
  }
  .ipv-check-type {
    font-size: 0.75rem;
    color: var(--sn-muted, #9ca3af);
  }
  .ipv-check-action {
    font-size: 0.8125rem;
    font-weight: 700;
    color: var(--sn-primary, #6366f1);
    text-decoration: none;
    white-space: nowrap;
    padding: 0.375rem 0.75rem;
    min-height: 44px;
    display: flex;
    align-items: center;
  }
  .ipv-check-action:hover { text-decoration: underline; }
  .ipv-check-action--todo {
    color: var(--sn-text-soft, #6b7280);
  }

  /* レーダー */
  .ipv-radar-wrap {
    display: flex;
    justify-content: center;
    padding: 1rem 0;
  }
  .ipv-radar {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  /* シーングリッド */
  .ipv-scene-grid {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  /* シーンカード */
  .ipv-scene-card {
    background: var(--scene-bg, #f9fafb);
    border-radius: var(--sn-radius-lg, 16px);
    border: 1px solid color-mix(in srgb, var(--scene-color, #6366f1) 20%, transparent);
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .ipv-scene-header {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
  }
  .ipv-scene-icon {
    font-size: 1.75rem;
    line-height: 1;
    flex-shrink: 0;
  }
  .ipv-scene-title-group {
    flex: 1;
  }
  .ipv-scene-title {
    font-family: var(--sn-font-rounded, sans-serif);
    font-size: 1rem;
    font-weight: 900;
    color: var(--sn-text, #111827);
    margin: 0 0 0.25rem;
  }
  .ipv-scene-desc {
    font-size: 0.75rem;
    color: var(--sn-muted, #9ca3af);
    margin: 0;
    line-height: 1.5;
  }
  .ipv-donut {
    flex-shrink: 0;
  }
  .ipv-scene-label-badge {
    display: inline-flex;
    align-items: center;
    padding: 0.25rem 0.875rem;
    background: var(--scene-color, #6366f1);
    color: #fff;
    border-radius: 999px;
    font-size: 0.8125rem;
    font-weight: 700;
    width: fit-content;
  }
  .ipv-scene-body {
    display: flex;
    flex-direction: column;
    gap: 0.875rem;
  }
  .ipv-scene-section {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .ipv-scene-section-title {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    font-size: 0.8125rem;
    font-weight: 700;
    color: var(--sn-text-soft, #6b7280);
    margin: 0;
  }
  .ipv-tag-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.375rem;
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .ipv-tag {
    padding: 0.25rem 0.75rem;
    border-radius: 999px;
    font-size: 0.8125rem;
    font-weight: 600;
  }
  .ipv-tag--strength {
    background: color-mix(in srgb, var(--scene-color, #6366f1) 12%, #fff);
    color: var(--scene-color, #6366f1);
    border: 1px solid color-mix(in srgb, var(--scene-color, #6366f1) 25%, transparent);
  }
  .ipv-tag--caution {
    background: #fef3c7;
    color: #92400e;
    border: 1px solid #fde68a;
  }

  /* エンプティ */
  .ipv-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 3rem 1.5rem;
    text-align: center;
    background: var(--sn-bg-soft, #f9fafb);
    border-radius: var(--sn-radius-lg, 16px);
    border: 1px dashed var(--sn-border, #e5e7eb);
  }
  .ipv-empty-icon { font-size: 2.5rem; }
  .ipv-empty-title {
    font-family: var(--sn-font-rounded, sans-serif);
    font-size: 1.125rem;
    font-weight: 700;
    color: var(--sn-text, #111827);
    margin: 0;
  }
  .ipv-empty-text {
    font-size: 0.875rem;
    color: var(--sn-muted, #9ca3af);
    margin: 0;
    line-height: 1.6;
  }

  /* CTA ボタン */
  .ipv-cta-btn {
    display: inline-flex;
    align-items: center;
    padding: 0.75rem 1.75rem;
    background: var(--sn-primary, #6366f1);
    color: #fff;
    border-radius: 999px;
    font-family: var(--sn-font-rounded, sans-serif);
    font-size: 0.9375rem;
    font-weight: 900;
    text-decoration: none;
    min-height: 44px;
    transition: transform 0.15s ease, box-shadow 0.15s ease;
  }
  .ipv-cta-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(99,102,241,0.3);
    text-decoration: none;
  }
  .ipv-cta-btn:focus-visible {
    outline: 2px solid var(--sn-primary, #6366f1);
    outline-offset: 2px;
  }

  /* 戻りリンク */
  .ipv-back-link {
    text-align: center;
    padding-top: 0.5rem;
  }
  .ipv-back-link a {
    font-size: 0.875rem;
    color: var(--sn-primary, #6366f1);
    text-decoration: none;
  }
  .ipv-back-link a:hover { text-decoration: underline; }

  /* ローディング */
  .ipv-loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 3rem;
    text-align: center;
  }
  .ipv-loading-spinner {
    width: 40px;
    height: 40px;
    border: 3px solid #e5e7eb;
    border-top-color: var(--sn-primary, #6366f1);
    border-radius: 50%;
    animation: ipv-spin 0.8s linear infinite;
  }
  .ipv-loading-text {
    font-size: 0.875rem;
    color: var(--sn-muted, #9ca3af);
    margin: 0;
  }

  @keyframes ipv-spin {
    to { transform: rotate(360deg); }
  }

  @media (min-width: 640px) {
    .ipv-scene-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
    }
    .ipv-scene-grid .ipv-scene-card:last-child:nth-child(odd) {
      grid-column: 1 / -1;
    }
  }

  @media (max-width: 480px) {
    .ipv-scene-header {
      flex-wrap: wrap;
    }
    .ipv-scene-header .ipv-donut {
      margin-left: auto;
    }
  }
`;
