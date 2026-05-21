/**
 * ShareCardGenerator.tsx
 * Canvas API で診断結果シェアカード PNG を生成
 *
 * Phase 2: 新デザインシステム v2 対応
 *   - デザイントークン brand-500 (#7c5cff) をデフォルトプライマリに
 *   - ヒーローグラデーション と整合したカード背景
 *   - shindan-navi.jp ウォーターマーク（ロゴピル）を強化
 *   - Noto Sans JP + Inter フォント体系統一
 *
 * 使用場面:
 *   - 診断結果ページ末尾の「友達に送る」ボタン隣
 *   - 招待コード生成後のシェア画像として
 */

import { useRef, useCallback, useState } from 'react';

interface ShareCardGeneratorProps {
  typeName: string;
  typeIcon?: string;
  diagName: string;
  /** 相性スコア（0-100）がある場合 */
  compatibilityScore?: number;
  compatibilityLabel?: string;
  /** ブランドカラー（デフォルト: brand-500 #7c5cff） */
  primaryColor?: string;
  /** 追加シェアテキスト */
  shareText?: string;
}

const CARD_W = 1200;
const CARD_H = 630;
const LOGO_TEXT = 'shindan-navi.jp';

function drawRoundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
): void {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.arcTo(x + w, y, x + w, y + r, r);
  ctx.lineTo(x + w, y + h - r);
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
  ctx.lineTo(x + r, y + h);
  ctx.arcTo(x, y + h, x, y + h - r, r);
  ctx.lineTo(x, y + r);
  ctx.arcTo(x, y, x + r, y, r);
  ctx.closePath();
}

/** primaryColor をもとに薄いグラデーション開始色を生成（ヒーロー背景と整合） */
function buildBgGradient(
  ctx: CanvasRenderingContext2D,
  primaryColor: string
): CanvasGradient {
  // デフォルト（brand-500系）と診断色系でグラデーションを切り替え
  const colorMap: Record<string, [string, string]> = {
    '#7c5cff': ['#f3efff', '#e8e0ff'], // brand/mbti – purple
    '#6366f1': ['#f3efff', '#e8e0ff'], // 旧primary – purple
    '#e06090': ['#fff0f7', '#ffe4f2'], // love – pink
    '#ff6f9c': ['#fff0f7', '#ffe4f2'], // love – pink
    '#f97316': ['#fff6ee', '#ffe9d5'], // multi – orange
    '#3b82f6': ['#eef6ff', '#ddeeff'], // star – blue
    '#4f7fff': ['#eef3ff', '#d4e3ff'], // work – blue
    '#eab308': ['#fffbea', '#fef3c7'], // perfect – yellow
    '#14b8a6': ['#edfaf7', '#d0f5ec'], // disc – teal
    '#7ec79b': ['#f0fbf4', '#c8f0d8'], // friend – green
    '#c8a46e': ['#fdf8f0', '#f5e8d0'], // money – beige
  };
  const found = colorMap[primaryColor.toLowerCase()];
  const [from, to] = found ?? ['#f3efff', '#e8e0ff'];

  const grad = ctx.createLinearGradient(0, 0, CARD_W, CARD_H);
  grad.addColorStop(0, from);
  grad.addColorStop(0.6, to);
  grad.addColorStop(1, from);
  return grad;
}

function generateCard(
  canvas: HTMLCanvasElement,
  props: ShareCardGeneratorProps
): void {
  const {
    typeName,
    typeIcon = '🧠',
    diagName,
    compatibilityScore,
    compatibilityLabel,
    primaryColor = '#7c5cff',
    shareText,
  } = props;

  canvas.width = CARD_W;
  canvas.height = CARD_H;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // ---- 背景グラデーション（ヒーロー背景と整合） ----
  ctx.fillStyle = buildBgGradient(ctx, primaryColor);
  ctx.fillRect(0, 0, CARD_W, CARD_H);

  // ---- 光彩オーバーレイ（右上・左下） ----
  const glow1 = ctx.createRadialGradient(CARD_W * 0.8, CARD_H * 0.2, 0, CARD_W * 0.8, CARD_H * 0.2, 340);
  glow1.addColorStop(0, 'rgba(255,255,255,0.28)');
  glow1.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = glow1;
  ctx.fillRect(0, 0, CARD_W, CARD_H);

  const glow2 = ctx.createRadialGradient(CARD_W * 0.1, CARD_H * 0.9, 0, CARD_W * 0.1, CARD_H * 0.9, 260);
  glow2.addColorStop(0, 'rgba(255,255,255,0.18)');
  glow2.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = glow2;
  ctx.fillRect(0, 0, CARD_W, CARD_H);

  // ---- メインカード（グラスモーフィズム調 白カード） ----
  ctx.save();
  drawRoundRect(ctx, 80, 60, CARD_W - 160, CARD_H - 120, 48);
  ctx.fillStyle = 'rgba(255,255,255,0.82)';
  ctx.shadowColor = 'rgba(124,92,255,0.12)';
  ctx.shadowBlur = 64;
  ctx.fill();
  ctx.restore();

  // ---- カード内側上部の白→透明ハイライト ----
  ctx.save();
  const highlight = ctx.createLinearGradient(0, 60, 0, 200);
  highlight.addColorStop(0, 'rgba(255,255,255,0.55)');
  highlight.addColorStop(1, 'rgba(255,255,255,0)');
  drawRoundRect(ctx, 80, 60, CARD_W - 160, 140, 48);
  ctx.fillStyle = highlight;
  ctx.fill();
  ctx.restore();

  // ---- プライマリカラーアクセントバー ----
  ctx.save();
  drawRoundRect(ctx, 80, 60, 16, CARD_H - 120, 8);
  ctx.fillStyle = primaryColor;
  ctx.fill();
  ctx.restore();

  // ---- 診断名ラベル（pill型） ----
  ctx.save();
  const diagLabelText = diagName;
  ctx.font = 'bold 30px "Noto Sans JP", sans-serif';
  const diagLabelW = ctx.measureText(diagLabelText).width + 48;
  drawRoundRect(ctx, 148, 110, diagLabelW, 52, 26);
  ctx.fillStyle = primaryColor;
  ctx.globalAlpha = 0.12;
  ctx.fill();
  ctx.globalAlpha = 1;
  ctx.fillStyle = primaryColor;
  ctx.fillText(diagLabelText, 172, 146);
  ctx.restore();

  // ---- タイプアイコン（大） ----
  ctx.font = '160px serif';
  ctx.fillText(typeIcon, 140, 400);

  // ---- タイプ名 ----
  ctx.save();
  ctx.font = 'bold 96px "Noto Sans JP", sans-serif';
  ctx.fillStyle = '#1f2937';
  const maxW = CARD_W - 500;
  let fontSize = 96;
  while (ctx.measureText(typeName).width > maxW && fontSize > 48) {
    fontSize -= 4;
    ctx.font = `bold ${fontSize}px "Noto Sans JP", sans-serif`;
  }
  ctx.fillText(typeName, 360, 330);
  ctx.restore();

  // ---- サブコピー「タイプ」テキスト ----
  ctx.save();
  ctx.font = '34px "Noto Sans JP", sans-serif';
  ctx.fillStyle = '#6b7280';
  ctx.fillText('タイプ', 360 + ctx.measureText(typeName).width + 16, 328);
  ctx.restore();

  // ---- 相性スコア（ある場合） ----
  if (compatibilityScore !== undefined) {
    const scoreX = 360;
    const scoreY = 440;

    ctx.save();
    const scoreLabelW = 340;
    drawRoundRect(ctx, scoreX, scoreY - 52, scoreLabelW, 72, 36);
    ctx.fillStyle = primaryColor;
    ctx.fill();
    ctx.restore();

    ctx.save();
    ctx.font = 'bold 40px "Noto Sans JP", sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(
      `相性 ${compatibilityScore}点${compatibilityLabel ? ` (${compatibilityLabel})` : ''}`,
      scoreX + 24,
      scoreY
    );
    ctx.restore();
  }

  // ---- シェアテキスト ----
  if (shareText) {
    ctx.save();
    ctx.font = '30px "Noto Sans JP", sans-serif';
    ctx.fillStyle = '#4b5563';
    const lineLen = 30;
    for (let i = 0; i < Math.min(2, Math.ceil(shareText.length / lineLen)); i++) {
      ctx.fillText(shareText.slice(i * lineLen, (i + 1) * lineLen), 360, 510 + i * 48);
    }
    ctx.restore();
  }

  // ---- ウォーターマーク ロゴピル（v2 強化版） ----
  ctx.save();
  const logoW = 360;
  const logoH = 76;
  const logoX = CARD_W - logoW - 88;
  const logoY = CARD_H - logoH - 68;

  // ピル背景（primaryColor + グラデーション）
  const logoPillGrad = ctx.createLinearGradient(logoX, logoY, logoX + logoW, logoY + logoH);
  logoPillGrad.addColorStop(0, primaryColor);
  logoPillGrad.addColorStop(1, `${primaryColor}cc`);
  drawRoundRect(ctx, logoX, logoY, logoW, logoH, logoH / 2);
  ctx.fillStyle = logoPillGrad;
  ctx.shadowColor = `${primaryColor}40`;
  ctx.shadowBlur = 16;
  ctx.fill();
  ctx.shadowBlur = 0;

  // ロゴテキスト（中央揃え）
  ctx.font = 'bold 34px "Noto Sans JP", "Inter", sans-serif';
  ctx.fillStyle = '#ffffff';
  const logoTextW = ctx.measureText(LOGO_TEXT).width;
  ctx.fillText(LOGO_TEXT, logoX + (logoW - logoTextW) / 2, logoY + logoH * 0.65);
  ctx.restore();

  // ---- 「完全無料・登録不要」メッセージ ----
  ctx.save();
  ctx.font = '26px "Noto Sans JP", sans-serif';
  ctx.fillStyle = '#9ca3af';
  const freeText = '完全無料・登録不要で診断できます';
  const freeTextW = ctx.measureText(freeText).width;
  ctx.fillText(freeText, logoX + (logoW - freeTextW) / 2, logoY - 16);
  ctx.restore();
}

export default function ShareCardGenerator({
  typeName,
  typeIcon = '🧠',
  diagName,
  compatibilityScore,
  compatibilityLabel,
  primaryColor = '#7c5cff',
  shareText,
}: ShareCardGeneratorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [generated, setGenerated] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const handleGenerate = useCallback(() => {
    if (!canvasRef.current) return;
    generateCard(canvasRef.current, {
      typeName,
      typeIcon,
      diagName,
      compatibilityScore,
      compatibilityLabel,
      primaryColor,
      shareText,
    });
    setGenerated(true);
  }, [typeName, typeIcon, diagName, compatibilityScore, compatibilityLabel, primaryColor, shareText]);

  const handleDownload = useCallback(async () => {
    if (!canvasRef.current) return;
    setDownloading(true);
    try {
      const dataUrl = canvasRef.current.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `shindan-${typeName.replace(/\s+/g, '-')}-card.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } finally {
      setDownloading(false);
    }
  }, [typeName]);

  // シェアテキスト生成
  const tweetText = shareText ?? `【${diagName}】私は「${typeName}」でした！あなたも診断してみて #診断ナビ`;
  const shareUrl = `https://shindan-navi.jp/`;
  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(shareUrl)}`;
  const lineShareUrl = `https://line.me/R/msg/text/?${encodeURIComponent(`${tweetText}\n${shareUrl}`)}`;
  const threadsUrl = `https://www.threads.net/intent/post?text=${encodeURIComponent(`${tweetText}\n${shareUrl}`)}`;

  return (
    <div className="scg-wrapper" role="region" aria-label="シェアカード生成">
      <canvas
        ref={canvasRef}
        className={`scg-canvas ${generated ? 'scg-canvas--visible' : ''}`}
        aria-label={generated ? `${typeName}の診断結果シェアカード` : ''}
        width={CARD_W}
        height={CARD_H}
      />

      {!generated && (
        <div className="scg-placeholder">
          <span className="scg-placeholder-icon" aria-hidden="true">{typeIcon}</span>
          <p className="scg-placeholder-text">シェアカードを生成する</p>
        </div>
      )}

      <div className="scg-actions">
        {!generated ? (
          <button
            className="scg-btn scg-btn--generate"
            onClick={handleGenerate}
            type="button"
            aria-label="シェア用画像カードを生成する"
          >
            <span aria-hidden="true">🖼️</span>
            シェアカードを作成
          </button>
        ) : (
          <button
            className="scg-btn scg-btn--download"
            onClick={handleDownload}
            disabled={downloading}
            type="button"
            aria-label="シェアカードをPNG画像として保存する"
          >
            <span aria-hidden="true">{downloading ? '⏳' : '⬇️'}</span>
            {downloading ? '保存中...' : 'PNG保存'}
          </button>
        )}

        {/* SNSシェアボタン */}
        <a
          href={lineShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="scg-btn scg-btn--line"
          aria-label="LINEでシェアする"
        >
          <svg width="16" height="16" viewBox="0 0 48 48" fill="currentColor" aria-hidden="true">
            <path d="M24 4C13 4 4 11.5 4 21c0 5.7 3.2 10.8 8.2 14-.4 2.3-1.4 5.7-1.6 6.5-.3 1.1.4 1.1.9.8l7.3-4.8c1.7.3 3.4.5 5.2.5 11 0 20-7.5 20-17S35 4 24 4z"/>
          </svg>
          LINE
        </a>
        <a
          href={tweetUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="scg-btn scg-btn--x"
          aria-label="Xでシェアする"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
          X
        </a>
        <a
          href={threadsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="scg-btn scg-btn--threads"
          aria-label="Threadsでシェアする"
        >
          <svg width="14" height="14" viewBox="0 0 192 192" fill="currentColor" aria-hidden="true">
            <path d="M141.537 88.988c-.87-.444-1.754-.87-2.65-1.28C136.53 68.69 124.644 58.6 105.43 58.484h-.192c-11.46 0-21.006 4.884-26.894 13.758l9.976 6.846c4.36-6.608 11.21-8.024 16.92-8.024h.13c6.54.042 11.48 1.942 14.68 5.65 2.328 2.69 3.886 6.41 4.642 11.115a68.65 68.65 0 0 0-18.74-1.578c-11.68.664-19.193 5.996-22.356 15.845-2.014 6.27-1.526 12.708 1.37 18.11 3.128 5.784 8.744 9.804 15.7 11.318C108.31 134.2 120.45 130.96 127.25 123c3.89-4.53 6.36-10.296 7.506-17.57.9.545 1.745 1.13 2.522 1.754 5.818 4.642 9.02 10.998 9.02 18.342 0 13.27-10.634 26.884-30.018 30.476-6.636 1.228-13.43 1.844-20.28 1.844-27.456 0-49.148-13.076-49.148-37.016 0-10.322 3.568-18.872 10.322-25.232-1.47-4.012-2.148-8.26-2.148-12.596 0-18.068 10.852-30.184 27.96-30.184 8.276 0 15.606 2.596 21.8 7.722C115.12 46.8 126.344 37.334 140 37.334c10.128 0 19.036 3.596 25.8 10.408C172.52 54.546 176 63.244 176 73.53c0 21.48-9.976 37.634-34.463 46.244v-.002l-.002-.004c.003-10.08-.81-19.696-7.236-23.748l7.238-6.032zM96.192 117.78c-3.218-6.07-.38-13.518 6.436-15.63 3.16-.97 6.458-1.128 9.746-.97 1.254.054 2.49.164 3.7.31-1.088 11.57-7.02 18.62-15.63 18.62-1.52 0-2.982-.132-4.252-.33z"/>
          </svg>
          Threads
        </a>
      </div>

      {generated && (
        <p className="scg-hint">
          画像を保存してInstagramのストーリーでもシェアできます
        </p>
      )}

      <style>{`
        .scg-wrapper {
          display: flex;
          flex-direction: column;
          gap: 0.875rem;
        }

        .scg-canvas {
          width: 100%;
          height: auto;
          border-radius: 16px;
          border: 1.5px solid rgba(124,92,255,0.15);
          display: none;
          max-height: 320px;
          object-fit: contain;
          box-shadow: 0 8px 24px rgba(124,92,255,0.08);
        }
        .scg-canvas--visible {
          display: block;
        }

        .scg-placeholder {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          padding: 2rem;
          background: var(--sn-bg-soft, #f8f7ff);
          border-radius: 16px;
          border: 2px dashed rgba(124,92,255,0.25);
          text-align: center;
        }
        .scg-placeholder-icon {
          font-size: 2.5rem;
        }
        .scg-placeholder-text {
          font-size: 0.875rem;
          color: var(--sn-muted, #9ca3af);
          margin: 0;
        }

        .scg-actions {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .scg-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.375rem;
          padding: 0.625rem 1rem;
          border-radius: 999px;
          font-size: 0.85rem;
          font-weight: 700;
          text-decoration: none;
          cursor: pointer;
          border: none;
          min-height: 44px;
          font-family: inherit;
          transition: opacity 0.15s ease, transform 0.15s ease;
        }
        .scg-btn:hover {
          opacity: 0.85;
          transform: translateY(-1px);
        }
        .scg-btn:focus-visible {
          outline: 2px solid var(--brand-500, #7c5cff);
          outline-offset: 2px;
        }
        .scg-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .scg-btn--generate {
          background: var(--brand-500, #7c5cff);
          color: #fff;
          flex: 1;
        }
        .scg-btn--download {
          background: var(--sn-bg-soft, #f8f7ff);
          color: var(--sn-text-soft, #6b7280);
          border: 1px solid rgba(124,92,255,0.2);
        }
        .scg-btn--line {
          background: #00b900;
          color: #fff;
          flex: 1;
          min-width: 80px;
        }
        .scg-btn--x {
          background: #000;
          color: #fff;
          flex: 1;
          min-width: 60px;
        }
        .scg-btn--threads {
          background: #101010;
          color: #fff;
          flex: 1;
          min-width: 80px;
        }

        .scg-hint {
          font-size: 0.78rem;
          color: var(--sn-muted, #9ca3af);
          text-align: center;
          margin: 0;
        }

        @media (max-width: 480px) {
          .scg-actions {
            flex-direction: column;
          }
          .scg-btn--generate,
          .scg-btn--download,
          .scg-btn--line,
          .scg-btn--x,
          .scg-btn--threads {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
