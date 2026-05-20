/**
 * PrivacyModeToggle.tsx - 4プライバシーモード切替（React島）
 *
 * 相性診断用。モード変更でUI状態が連動する。
 * client:visible で lazy hydration。
 *
 * Props:
 *   defaultMode  - デフォルトモード（'secret' | 'invite' | 'one-way' | 'open'）
 *   onChange     - モード変更コールバック
 *   compact      - コンパクト表示（ラベル省略）
 */

import { useState, useCallback } from 'react';

export type PrivacyMode = 'secret' | 'invite' | 'one-way' | 'open';

interface ModeConfig {
  id: PrivacyMode;
  icon: string;
  label: string;
  shortLabel: string;
  description: string;
  badge?: string;
}

const MODES: ModeConfig[] = [
  {
    id: 'secret',
    icon: '🔒',
    label: 'こっそりモード',
    shortLabel: 'こっそり',
    description: '相手にバレない。自分の結果と相手のタイプを入力して相性確認。',
    badge: 'デフォルト',
  },
  {
    id: 'invite',
    icon: '👥',
    label: '招待モード',
    shortLabel: '招待',
    description: '相手に診断依頼を送る。2人の結果でリアル相性チェック。',
  },
  {
    id: 'one-way',
    icon: '🎭',
    label: '片方向開示',
    shortLabel: '片方向',
    description: '招待はするが自分の情報は隠す。ドキドキ非対称モード。',
  },
  {
    id: 'open',
    icon: '🔓',
    label: '完全共有',
    shortLabel: '完全共有',
    description: '2人の全情報を相互開示。オープンな関係向け。',
  },
];

interface PrivacyModeToggleProps {
  defaultMode?: PrivacyMode;
  onChange?: (mode: PrivacyMode) => void;
  compact?: boolean;
}

export default function PrivacyModeToggle({
  defaultMode = 'secret',
  onChange,
  compact = false,
}: PrivacyModeToggleProps) {
  const [activeMode, setActiveMode] = useState<PrivacyMode>(defaultMode);

  const handleSelect = useCallback((mode: PrivacyMode) => {
    setActiveMode(mode);
    onChange?.(mode);
  }, [onChange]);

  const currentConfig = MODES.find((m) => m.id === activeMode)!;

  return (
    <div className="pmt-wrapper" role="group" aria-labelledby="pmt-heading">
      <p id="pmt-heading" className="pmt-heading">
        プライバシーモードを選択
      </p>

      {/* モード選択ボタン群 */}
      <div className="pmt-tabs" role="tablist" aria-label="プライバシーモード">
        {MODES.map((mode) => {
          const isActive = activeMode === mode.id;
          return (
            <button
              key={mode.id}
              role="tab"
              aria-selected={isActive}
              aria-controls={`pmt-panel-${mode.id}`}
              id={`pmt-tab-${mode.id}`}
              className={`pmt-tab ${isActive ? 'pmt-tab--active' : ''}`}
              onClick={() => handleSelect(mode.id)}
              title={mode.label}
              type="button"
            >
              <span className="pmt-tab-icon" aria-hidden="true">{mode.icon}</span>
              <span className="pmt-tab-label">
                {compact ? mode.shortLabel : mode.label}
              </span>
              {mode.badge && !compact && (
                <span className="pmt-tab-badge" aria-label={mode.badge}>{mode.badge}</span>
              )}
            </button>
          );
        })}
      </div>

      {/* 選択中モードの説明パネル */}
      {!compact && (
        <div
          id={`pmt-panel-${activeMode}`}
          role="tabpanel"
          aria-labelledby={`pmt-tab-${activeMode}`}
          className="pmt-panel"
          key={activeMode}
        >
          <span className="pmt-panel-icon" aria-hidden="true">{currentConfig.icon}</span>
          <div className="pmt-panel-body">
            <p className="pmt-panel-name">{currentConfig.label}</p>
            <p className="pmt-panel-desc">{currentConfig.description}</p>
          </div>
        </div>
      )}

      {/* モード別注記 */}
      {activeMode === 'invite' && !compact && (
        <div className="pmt-note pmt-note--invite" role="note">
          <span aria-hidden="true">👥</span>
          招待リンクを送ると相手も診断ページへ誘導されます。相手の同意が必要です。
        </div>
      )}
      {activeMode === 'one-way' && !compact && (
        <div className="pmt-note pmt-note--one-way" role="note">
          <span aria-hidden="true">🎭</span>
          あなたの結果は相手には見えません。相性スコアのみ相互確認できます。
        </div>
      )}
      {activeMode === 'open' && !compact && (
        <div className="pmt-note pmt-note--open" role="note">
          <span aria-hidden="true">🔓</span>
          お互いの診断結果をすべて共有します。親しい相手向けのモードです。
        </div>
      )}

      <style>{`
        .pmt-wrapper {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .pmt-heading {
          font-size: 0.875rem;
          font-weight: 700;
          color: var(--sn-text-soft);
          margin: 0;
        }

        .pmt-tabs {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0.5rem;
          background: var(--sn-bg-soft);
          padding: 0.375rem;
          border-radius: 16px;
        }

        .pmt-tab {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
          padding: 0.75rem 0.5rem;
          border: none;
          border-radius: 12px;
          background: transparent;
          cursor: pointer;
          transition:
            background 150ms cubic-bezier(0.4, 0, 0.2, 1),
            color 150ms cubic-bezier(0.4, 0, 0.2, 1),
            transform 150ms cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          min-height: 44px;
          color: var(--sn-muted);
        }

        .pmt-tab:hover {
          background: color-mix(in srgb, var(--sn-primary) 8%, transparent);
          color: var(--sn-primary);
        }

        .pmt-tab--active {
          background: var(--sn-bg-white);
          color: var(--sn-primary);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          transform: none;
        }

        .pmt-tab:focus-visible {
          outline: 2px solid var(--sn-primary);
          outline-offset: 2px;
        }

        .pmt-tab-icon {
          font-size: 1.5rem;
          line-height: 1;
        }

        .pmt-tab-label {
          font-size: 0.625rem;
          font-weight: 700;
          text-align: center;
          line-height: 1.2;
          word-break: keep-all;
        }

        .pmt-tab-badge {
          position: absolute;
          top: 2px;
          right: 2px;
          font-size: 0.5rem;
          font-weight: 700;
          background: var(--sn-accent);
          color: #fff;
          padding: 1px 4px;
          border-radius: 999px;
          white-space: nowrap;
        }

        .pmt-panel {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          padding: 1rem 1.25rem;
          background: var(--sn-bg-white);
          border-radius: 12px;
          border: 1px solid var(--sn-border);
          animation: pmt-fade-in 0.15s ease;
        }

        @keyframes pmt-fade-in {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .pmt-panel-icon {
          font-size: 1.75rem;
          line-height: 1;
          flex-shrink: 0;
          margin-top: 0.125rem;
        }

        .pmt-panel-body {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .pmt-panel-name {
          font-size: 0.875rem;
          font-weight: 700;
          color: var(--sn-text);
          margin: 0;
        }

        .pmt-panel-desc {
          font-size: 0.8125rem;
          color: var(--sn-muted);
          line-height: 1.6;
          margin: 0;
        }

        .pmt-note {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          border-radius: 8px;
          font-size: 0.75rem;
          line-height: 1.6;
          animation: pmt-fade-in 0.15s ease;
        }

        .pmt-note--invite {
          background: color-mix(in srgb, var(--sn-scene-friend) 8%, var(--sn-bg-white));
          color: var(--sn-scene-friend);
          border: 1px solid color-mix(in srgb, var(--sn-scene-friend) 20%, transparent);
        }

        .pmt-note--one-way {
          background: color-mix(in srgb, var(--sn-accent) 8%, var(--sn-bg-white));
          color: var(--sn-accent-dark);
          border: 1px solid color-mix(in srgb, var(--sn-accent) 20%, transparent);
        }

        .pmt-note--open {
          background: color-mix(in srgb, var(--sn-primary) 8%, var(--sn-bg-white));
          color: var(--sn-primary-dark);
          border: 1px solid color-mix(in srgb, var(--sn-primary) 20%, transparent);
        }

        @media (max-width: 480px) {
          .pmt-tabs {
            grid-template-columns: repeat(4, 1fr);
            gap: 0.25rem;
          }

          .pmt-tab {
            padding: 0.625rem 0.25rem;
          }

          .pmt-tab-icon {
            font-size: 1.25rem;
          }
        }
      `}</style>
    </div>
  );
}
