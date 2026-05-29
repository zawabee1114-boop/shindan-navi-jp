/**
 * Big5RadarChart.tsx - Big5（OCEAN）レーダーチャート（React島）
 *
 * 純SVG実装。Recharts / D3 依存なし。ライブラリ0追加。
 * client:visible で lazy hydration。
 *
 * 5因子:
 *   O - 開放性（Openness to Experience）
 *   C - 誠実性（Conscientiousness）
 *   E - 外向性（Extraversion）
 *   A - 協調性（Agreeableness）
 *   N - 神経症傾向（Neuroticism）
 *
 * Props:
 *   scores     - OCEAN スコア（各 0〜100）
 *   animated   - アニメーション有無
 *   showValues - スコア数値を表示するか
 *   size       - SVG サイズ（px）
 */

import { useEffect, useState } from 'react';

export interface OceanScores {
  O: number; // 開放性
  C: number; // 誠実性
  E: number; // 外向性
  A: number; // 協調性
  N: number; // 神経症傾向
}

interface Big5RadarChartProps {
  scores: OceanScores;
  animated?: boolean;
  showValues?: boolean;
  size?: number;
}

// 因子の定義
const FACTORS = [
  { key: 'O' as keyof OceanScores, label: '開放性', sublabel: 'Openness',       color: '#8b5cf6' },
  { key: 'C' as keyof OceanScores, label: '誠実性', sublabel: 'Conscientiousness', color: '#3b82f6' },
  { key: 'E' as keyof OceanScores, label: '外向性', sublabel: 'Extraversion',    color: '#10b981' },
  { key: 'A' as keyof OceanScores, label: '協調性', sublabel: 'Agreeableness',   color: '#ec4899' },
  { key: 'N' as keyof OceanScores, label: '気分', sublabel: '気分の波',     color: '#f59e0b' },
];

// 正五角形の頂点座標を計算（上頂点から時計回り）
function getPolygonPoints(
  cx: number,
  cy: number,
  r: number,
  count: number,
  startAngle = -Math.PI / 2,
): Array<[number, number]> {
  return Array.from({ length: count }, (_, i) => {
    const angle = startAngle + (2 * Math.PI * i) / count;
    return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)] as [number, number];
  });
}

// 各スコアをチャートの頂点座標に変換
function getDataPoints(
  cx: number,
  cy: number,
  maxR: number,
  scores: OceanScores,
): Array<[number, number]> {
  return FACTORS.map((f, i) => {
    const r = (scores[f.key] / 100) * maxR;
    const angle = -Math.PI / 2 + (2 * Math.PI * i) / FACTORS.length;
    return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)] as [number, number];
  });
}

// 座標配列を SVG points 文字列に変換
function toPoints(pts: Array<[number, number]>): string {
  return pts.map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(' ');
}

export default function Big5RadarChart({
  scores,
  animated = true,
  showValues = true,
  size = 280,
}: Big5RadarChartProps) {
  const [mounted, setMounted] = useState(false);
  const [animProgress, setAnimProgress] = useState(animated ? 0 : 1);

  // SSR 対策
  useEffect(() => {
    setMounted(true);
  }, []);

  // アニメーション（0→1 で スコアを伸ばす）
  useEffect(() => {
    if (!animated || !mounted) return;
    let frame: number;
    let start: number | null = null;
    const duration = 800; // ms

    const tick = (ts: number) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out
      setAnimProgress(1 - Math.pow(1 - progress, 3));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [animated, mounted]);

  const cx = size / 2;
  const cy = size / 2;
  const padding = 48; // ラベル分のパディング
  const maxR = cx - padding;

  // グリッド（20/40/60/80/100）
  const gridLevels = [0.2, 0.4, 0.6, 0.8, 1.0];

  // アニメーション中のスコア
  const animatedScores: OceanScores = {
    O: scores.O * animProgress,
    C: scores.C * animProgress,
    E: scores.E * animProgress,
    A: scores.A * animProgress,
    N: scores.N * animProgress,
  };

  const dataPoints = getDataPoints(cx, cy, maxR, animatedScores);
  const outerPoints = getPolygonPoints(cx, cy, maxR, FACTORS.length);

  // 因子ラベルの座標（頂点の外側）
  const labelPoints = getPolygonPoints(cx, cy, maxR + 22, FACTORS.length); // M4: オフセット縮小（超小画面はみ出し防止）

  return (
    <div className="b5rc-wrapper" role="figure" aria-label="性格レーダーチャート">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        aria-hidden="true"
        style={{ overflow: 'visible', maxWidth: '100%', height: 'auto' }}
      >
        <defs>
          <linearGradient id="radar-fill-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.20" />
          </linearGradient>
          <filter id="radar-shadow">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#6366f1" floodOpacity="0.2" />
          </filter>
        </defs>

        {/* グリッド（同心多角形） */}
        {gridLevels.map((level) => {
          const pts = getPolygonPoints(cx, cy, maxR * level, FACTORS.length);
          return (
            <polygon
              key={level}
              points={toPoints(pts)}
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="1"
            />
          );
        })}

        {/* グリッド数値ラベル（外枠に沿って右軸） */}
        {gridLevels.map((level) => (
          <text
            key={`gl-${level}`}
            x={cx + 4}
            y={cy - maxR * level - 3}
            fontSize="9"
            fill="#9ca3af"
            textAnchor="start"
          >
            {Math.round(level * 100)}
          </text>
        ))}

        {/* 軸線（中心→各頂点） */}
        {outerPoints.map(([x, y], i) => (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={x}
            y2={y}
            stroke="#e5e7eb"
            strokeWidth="1"
          />
        ))}

        {/* データポリゴン */}
        <polygon
          points={toPoints(dataPoints)}
          fill="url(#radar-fill-gradient)"
          stroke="#6366f1"
          strokeWidth="2.5"
          strokeLinejoin="round"
          filter="url(#radar-shadow)"
          style={{ transition: animated ? 'none' : undefined }}
        />

        {/* データポイント（頂点の丸） */}
        {dataPoints.map(([x, y], i) => (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={4}
            fill={FACTORS[i].color}
            stroke="#fff"
            strokeWidth="1.5"
          />
        ))}

        {/* 因子ラベル */}
        {labelPoints.map(([x, y], i) => {
          const f = FACTORS[i];
          const anchor =
            x < cx - 5 ? 'end' : x > cx + 5 ? 'start' : 'middle';
          const score = Math.round(scores[f.key]);
          return (
            <g key={i}>
              <text
                x={x}
                y={y - 4}
                fontSize="11"
                fontWeight="700"
                fill={f.color}
                textAnchor={anchor}
              >
                {f.label}
              </text>
              <text
                x={x}
                y={y + 9}
                fontSize="9"
                fill="#6b7280"
                textAnchor={anchor}
              >
                {f.sublabel}
              </text>
              {showValues && (
                <text
                  x={x}
                  y={y + 22}
                  fontSize="10"
                  fontWeight="700"
                  fill={f.color}
                  textAnchor={anchor}
                >
                  {score}点
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {/* スコアテーブル（スクリーンリーダー向け） */}
      <table className="b5rc-sr-table" aria-label="5つの性格軸スコア一覧">
        <caption className="b5rc-sr-caption">5つの性格軸スコア</caption>
        <thead>
          <tr>
            <th scope="col">因子</th>
            <th scope="col">スコア（0〜100）</th>
          </tr>
        </thead>
        <tbody>
          {FACTORS.map((f) => (
            <tr key={f.key}>
              <th scope="row">{f.label}（{f.sublabel}）</th>
              <td>{scores[f.key]}点</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* スコアバー（視覚補助） */}
      {showValues && (
        <div className="b5rc-bars" role="list" aria-label="因子スコアバー">
          {FACTORS.map((f) => {
            const score = scores[f.key];
            const label = score >= 70 ? '高め' : score >= 40 ? '中程度' : '低め';
            return (
              <div key={f.key} className="b5rc-bar-row" role="listitem">
                <span className="b5rc-bar-label" style={{ color: f.color }}>
                  {f.label}
                </span>
                <div
                  className="b5rc-bar-track"
                  role="meter"
                  aria-valuenow={score}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${f.label}: ${score}点（${label}）`}
                >
                  <div
                    className="b5rc-bar-fill"
                    style={{
                      width: `${score}%`,
                      background: f.color,
                      transition: animated ? `width 0.8s cubic-bezier(0, 0, 0.2, 1) ${FACTORS.indexOf(f) * 60}ms` : 'none',
                    }}
                  />
                </div>
                <span className="b5rc-bar-score">{score}</span>
              </div>
            );
          })}
        </div>
      )}

      <style>{`
        .b5rc-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.25rem;
          padding-inline: 28px; /* M4: ラベルはみ出し防止 */
          box-sizing: border-box;
          width: 100%;
        }

        /* スクリーンリーダー専用テーブル */
        .b5rc-sr-table {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }

        .b5rc-sr-caption {
          position: absolute;
          width: 1px;
          height: 1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
        }

        /* スコアバー */
        .b5rc-bars {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          padding: 0 0.5rem;
        }

        .b5rc-bar-row {
          display: grid;
          grid-template-columns: 56px 1fr 32px;
          align-items: center;
          gap: 0.625rem;
        }

        .b5rc-bar-label {
          font-size: 0.75rem;
          font-weight: 700;
          white-space: nowrap;
        }

        .b5rc-bar-track {
          height: 8px;
          background: #f3f4f6;
          border-radius: 999px;
          overflow: hidden;
        }

        .b5rc-bar-fill {
          height: 100%;
          border-radius: 999px;
          width: 0;
        }

        .b5rc-bar-score {
          font-size: 0.75rem;
          font-weight: 700;
          color: #6b7280;
          text-align: right;
        }

        @media (max-width: 360px) {
          .b5rc-bar-row {
            grid-template-columns: 48px 1fr 28px;
          }
        }
      `}</style>
    </div>
  );
}
