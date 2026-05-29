/**
 * AIPromptCardGenerator.tsx - AIプロンプトカード生成 React島
 *
 * ChatGPT / Claude / Gemini への入力フォーマットを生成・コピーするUI。
 * 自社AIチャット機能は持たない（外部サービスへの誘導のみ）。
 *
 * 重要ルール:
 * - 自社AIチャット絶対禁止（外部リンク誘導のみ）
 * - Big5/OCEAN表記禁止
 * - WCAG 2.1 AA
 * - client:visible で lazy hydration
 */

import { useState, useEffect } from 'react';
import { trackAiPromptGenerate } from '../lib/analytics';
import type { PromptCard } from '../lib/integrated-profile/ai-prompt-generator';
import type { IntegratedProfile } from '../lib/integrated-profile/types';

interface AIPromptCardGeneratorProps {
  /** PRO会員かどうか（非PRO: 最初の2カードのみ） */
  isPro?: boolean;
}

const AI_SERVICES = {
  chatgpt: {
    label: 'ChatGPT',
    url: 'https://chat.openai.com/',
    color: '#10a37f',
    icon: '🟢',
  },
  claude: {
    label: 'Claude',
    url: 'https://claude.ai/',
    color: '#d97706',
    icon: '🟠',
  },
  gemini: {
    label: 'Gemini',
    url: 'https://gemini.google.com/',
    color: '#4285f4',
    icon: '🔵',
  },
} as const;

/** コピーボタン */
function CopyButton({ text, label }: { text: string; label: string }) {
  const [state, setState] = useState<'idle' | 'copied' | 'error'>('idle');

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setState('copied');
      setTimeout(() => setState('idle'), 2000);
    } catch {
      setState('error');
      setTimeout(() => setState('idle'), 2000);
    }
  }

  return (
    <button
      onClick={handleCopy}
      className={`aipg-copy-btn ${state === 'copied' ? 'aipg-copy-btn--copied' : ''} ${state === 'error' ? 'aipg-copy-btn--error' : ''}`}
      aria-label={`${label}をクリップボードにコピー`}
    >
      <span aria-hidden="true">
        {state === 'copied' ? '✅' : state === 'error' ? '❌' : '📋'}
      </span>
      {state === 'copied' ? 'コピー済み！' : state === 'error' ? 'コピー失敗' : 'コピーする'}
    </button>
  );
}

/** プロンプトカード単体 */
function PromptCardItem({
  card,
  isLocked,
}: {
  card: PromptCard;
  isLocked: boolean;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`aipg-card ${isLocked ? 'aipg-card--locked' : ''}`}>
      <div className="aipg-card-header">
        <span className="aipg-card-icon" aria-hidden="true">{card.icon}</span>
        <div className="aipg-card-title-group">
          <h3 className="aipg-card-title">{card.title}</h3>
          <p className="aipg-card-desc">{card.description}</p>
        </div>
        {isLocked ? (
          <span className="aipg-lock-badge" aria-label="PRO限定">PRO</span>
        ) : (
          <button
            onClick={() => setExpanded((v) => !v)}
            className="aipg-expand-btn"
            aria-expanded={expanded}
            aria-controls={`prompt-body-${card.title}`}
          >
            {expanded ? '閉じる' : '生成する'}
          </button>
        )}
      </div>

      {isLocked && (
        <p className="aipg-locked-note">
          PROアップグレードでこのプロンプトカードが使えます
        </p>
      )}

      {!isLocked && expanded && (
        <div id={`prompt-body-${card.title}`} className="aipg-card-body">
          {/* 推奨サービスバッジ */}
          <div className="aipg-service-badges" aria-label="おすすめAIサービス">
            {card.recommendedFor.map((svc) => {
              const s = AI_SERVICES[svc];
              return (
                <a
                  key={svc}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="aipg-service-badge"
                  style={{ '--svc-color': s.color } as React.CSSProperties}
                  aria-label={`${s.label}で開く（新しいタブ）`}
                >
                  <span aria-hidden="true">{s.icon}</span>
                  {s.label}で開く
                </a>
              );
            })}
          </div>

          {/* プロンプトテキスト */}
          <div className="aipg-prompt-area">
            <pre className="aipg-prompt-text" aria-label="生成されたプロンプト">
              {card.prompt}
            </pre>
            <CopyButton text={card.prompt} label={card.title} />
          </div>

          {/* 使い方ヒント */}
          <div className="aipg-hint" role="note">
            <span aria-hidden="true">💡</span>
            <p>上のテキストをコピーして、お使いのAIサービスに貼り付けてください。固有情報（[名前]等）は自分で書き換えてから使ってください。</p>
          </div>
        </div>
      )}
    </div>
  );
}

// メインコンポーネント
export default function AIPromptCardGenerator({ isPro = false }: AIPromptCardGeneratorProps) {
  const [cards, setCards] = useState<PromptCard[]>([]);
  const [profile, setProfile] = useState<IntegratedProfile | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    Promise.all([
      import('../lib/integrated-profile/aggregator'),
      import('../lib/integrated-profile/ai-prompt-generator'),
    ]).then(([aggregator, promptGen]) => {
      try {
        const p = aggregator.generateIntegratedProfile();
        setProfile(p);
        if (p.completedCount > 0) {
          const generated = promptGen.generateAllPromptCards(p);
          setCards(generated);
          trackAiPromptGenerate('all', undefined);
        }
      } catch (e) {
        console.error('AIPromptCardGenerator failed:', e);
      }
    });
  }, []);

  if (!mounted) {
    return (
      <div className="aipg-loading" aria-busy="true">
        <div className="aipg-loading-spinner" aria-hidden="true" />
      </div>
    );
  }

  // 診断0件の場合
  if (!profile || profile.completedCount === 0) {
    return (
      <div className="aipg-empty">
        <span aria-hidden="true" style={{ fontSize: '2rem' }}>🤖</span>
        <p className="aipg-empty-title">AIプロンプトカードを生成する</p>
        <p className="aipg-empty-desc">
          1つ以上の診断を受けると、あなたの特性に合わせたAIプロンプトが自動生成されます。
        </p>
        <a href="/diagnosis/" className="aipg-cta-btn">最初の診断を受ける →</a>
      </div>
    );
  }

  return (
    <div className="aipg-root">
      <div className="aipg-intro">
        <p className="aipg-intro-text">
          あなたの特性プロファイル（{profile.completedCount}診断の統合結果）を元に、
          ChatGPT / Claude / Gemini に渡す専用プロンプトを生成します。
        </p>
      </div>

      <div className="aipg-card-list">
        {cards.map((card, i) => (
          <PromptCardItem
            key={card.title}
            card={card}
            isLocked={!isPro && i >= 2}
          />
        ))}
      </div>

      {!isPro && (
        <div className="aipg-pro-cta">
          <span className="aipg-pro-badge">PRO</span>
          <div className="aipg-pro-cta-body">
            <p className="aipg-pro-cta-title">PROアップグレードで全プロンプト解放</p>
            <p className="aipg-pro-cta-desc">
              志望動機・カバーレター、マッチングアプリプロフィール生成も使えます。月次新プロンプト追加予定。
            </p>
          </div>
          <a href="/pro/" className="aipg-pro-btn">PRO ¥590/月 →</a>
        </div>
      )}

      <style>{AIPG_STYLES}</style>
    </div>
  );
}

const AIPG_STYLES = `
  .aipg-root {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .aipg-intro-text {
    font-size: 0.875rem;
    color: var(--sn-text-soft, #6b7280);
    line-height: 1.6;
    margin: 0;
  }

  .aipg-card-list {
    display: flex;
    flex-direction: column;
    gap: 0.875rem;
  }

  /* カード */
  .aipg-card {
    border-radius: var(--sn-radius-lg, 16px);
    border: 1px solid var(--sn-border, #e5e7eb);
    background: var(--sn-bg-white, #fff);
    overflow: hidden;
  }
  .aipg-card--locked {
    opacity: 0.75;
    background: var(--sn-bg-soft, #f9fafb);
  }

  .aipg-card-header {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    padding: 1rem 1.125rem;
  }
  .aipg-card-icon {
    font-size: 1.5rem;
    line-height: 1;
    flex-shrink: 0;
  }
  .aipg-card-title-group {
    flex: 1;
  }
  .aipg-card-title {
    font-family: var(--sn-font-rounded, sans-serif);
    font-size: 0.9375rem;
    font-weight: 700;
    color: var(--sn-text, #111827);
    margin: 0 0 0.25rem;
  }
  .aipg-card-desc {
    font-size: 0.8125rem;
    color: var(--sn-muted, #9ca3af);
    margin: 0;
  }

  .aipg-expand-btn {
    flex-shrink: 0;
    padding: 0.375rem 0.875rem;
    background: var(--sn-primary, #6366f1);
    color: #fff;
    border: none;
    border-radius: 999px;
    font-size: 0.8125rem;
    font-weight: 700;
    cursor: pointer;
    min-height: 44px; /* M7: WCAG AA タップターゲット */
    transition: background 0.15s ease;
  }
  .aipg-expand-btn:hover {
    background: color-mix(in srgb, var(--sn-primary, #6366f1) 85%, #000);
  }
  .aipg-expand-btn:focus-visible {
    outline: 2px solid var(--sn-primary, #6366f1);
    outline-offset: 2px;
  }

  .aipg-lock-badge {
    flex-shrink: 0;
    padding: 0.25rem 0.75rem;
    background: linear-gradient(135deg, #f59e0b, #d97706);
    color: #fff;
    border-radius: 999px;
    font-size: 0.75rem;
    font-weight: 900;
    letter-spacing: 0.05em;
  }
  .aipg-locked-note {
    font-size: 0.75rem;
    color: var(--sn-muted, #9ca3af);
    padding: 0 1.125rem 0.875rem;
    margin: 0;
  }

  /* カードボディ */
  .aipg-card-body {
    border-top: 1px solid var(--sn-border, #e5e7eb);
    padding: 1rem 1.125rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  /* サービスバッジ */
  .aipg-service-badges {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  .aipg-service-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.25rem 0.75rem;
    border-radius: 999px;
    border: 1.5px solid var(--svc-color, #6366f1);
    color: var(--svc-color, #6366f1);
    font-size: 0.8125rem;
    font-weight: 700;
    text-decoration: none;
    transition: background 0.15s ease;
    min-height: 44px; /* M7: WCAG AA タップターゲット */
  }
  .aipg-service-badge:hover {
    background: color-mix(in srgb, var(--svc-color, #6366f1) 10%, transparent);
    text-decoration: none;
  }

  /* プロンプトエリア */
  .aipg-prompt-area {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  .aipg-prompt-text {
    background: #f8fafc;
    border: 1px solid var(--sn-border, #e5e7eb);
    border-radius: var(--sn-radius-md, 12px);
    padding: 1rem;
    font-family: system-ui, sans-serif;
    font-size: 0.8125rem;
    color: var(--sn-text, #111827);
    line-height: 1.7;
    white-space: pre-wrap;
    word-break: break-word;
    margin: 0;
    max-height: 240px;
    overflow-y: auto;
  }

  /* コピーボタン */
  .aipg-copy-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.5rem 1.25rem;
    border: 1.5px solid var(--sn-border, #e5e7eb);
    background: var(--sn-bg-white, #fff);
    border-radius: 999px;
    font-size: 0.875rem;
    font-weight: 700;
    cursor: pointer;
    color: var(--sn-text, #111827);
    align-self: flex-start;
    min-height: 40px;
    transition: border-color 0.15s ease, background 0.15s ease;
  }
  .aipg-copy-btn:hover {
    border-color: var(--sn-primary, #6366f1);
    color: var(--sn-primary, #6366f1);
  }
  .aipg-copy-btn--copied {
    border-color: var(--sn-success, #10b981);
    color: var(--sn-success, #10b981);
    background: color-mix(in srgb, var(--sn-success, #10b981) 8%, #fff);
  }
  .aipg-copy-btn--error {
    border-color: #ef4444;
    color: #ef4444;
  }
  .aipg-copy-btn:focus-visible {
    outline: 2px solid var(--sn-primary, #6366f1);
    outline-offset: 2px;
  }

  /* ヒント */
  .aipg-hint {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    padding: 0.75rem;
    background: #fffbeb;
    border-radius: var(--sn-radius-md, 12px);
    border: 1px solid #fde68a;
  }
  .aipg-hint p {
    font-size: 0.75rem;
    color: #92400e;
    margin: 0;
    line-height: 1.6;
  }

  /* PRO CTA */
  .aipg-pro-cta {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem 1.25rem;
    background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);
    border-radius: var(--sn-radius-lg, 16px);
    border: 1px solid #fde68a;
    flex-wrap: wrap;
  }
  .aipg-pro-badge {
    flex-shrink: 0;
    padding: 0.25rem 0.75rem;
    background: linear-gradient(135deg, #f59e0b, #d97706);
    color: #fff;
    border-radius: 999px;
    font-size: 0.75rem;
    font-weight: 900;
    letter-spacing: 0.05em;
  }
  .aipg-pro-cta-body { flex: 1; min-width: 200px; }
  .aipg-pro-cta-title {
    font-family: var(--sn-font-rounded, sans-serif);
    font-size: 0.9375rem;
    font-weight: 700;
    color: #92400e;
    margin: 0 0 0.25rem;
  }
  .aipg-pro-cta-desc {
    font-size: 0.8125rem;
    color: #a16207;
    margin: 0;
    line-height: 1.5;
  }
  .aipg-pro-btn {
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    padding: 0.5rem 1.25rem;
    background: linear-gradient(135deg, #f59e0b, #d97706);
    color: #fff;
    border-radius: 999px;
    font-family: var(--sn-font-rounded, sans-serif);
    font-size: 0.875rem;
    font-weight: 900;
    text-decoration: none;
    min-height: 40px;
    transition: transform 0.15s ease;
  }
  .aipg-pro-btn:hover {
    transform: translateY(-1px);
    text-decoration: none;
  }
  .aipg-pro-btn:focus-visible {
    outline: 2px solid #f59e0b;
    outline-offset: 2px;
  }

  /* エンプティ */
  .aipg-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.875rem;
    padding: 2.5rem 1.5rem;
    text-align: center;
    background: var(--sn-bg-soft, #f9fafb);
    border-radius: var(--sn-radius-lg, 16px);
    border: 1px dashed var(--sn-border, #e5e7eb);
  }
  .aipg-empty-title {
    font-family: var(--sn-font-rounded, sans-serif);
    font-size: 1rem;
    font-weight: 700;
    color: var(--sn-text, #111827);
    margin: 0;
  }
  .aipg-empty-desc {
    font-size: 0.875rem;
    color: var(--sn-muted, #9ca3af);
    margin: 0;
    line-height: 1.6;
  }
  .aipg-cta-btn {
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
    transition: transform 0.15s ease;
  }
  .aipg-cta-btn:hover {
    transform: translateY(-1px);
    text-decoration: none;
  }

  /* ローディング */
  .aipg-loading {
    display: flex;
    justify-content: center;
    padding: 2rem;
  }
  .aipg-loading-spinner {
    width: 32px;
    height: 32px;
    border: 3px solid #e5e7eb;
    border-top-color: var(--sn-primary, #6366f1);
    border-radius: 50%;
    animation: aipg-spin 0.8s linear infinite;
  }
  @keyframes aipg-spin {
    to { transform: rotate(360deg); }
  }
`;
