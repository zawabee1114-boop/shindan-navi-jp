/**
 * TimeCapsuleForm.tsx - タイムカプセル作成フォーム（React Island）
 *
 * PRO会員限定機能。LocalStorage に手紙を保存する。
 * Phase 3.4: Supabase DB に移行。
 *
 * Props:
 *   isPro     - PRO会員かどうか（LocalStorage のplan判定結果）
 *   onSaved   - 保存完了コールバック
 */

import { useState, useCallback } from 'react';

interface TimeCapsuleFormProps {
  isPro?: boolean;
  onSaved?: (capsuleId: string) => void;
}

type TargetMonths = 3 | 6 | 12;

const MONTH_LABELS: Record<TargetMonths, string> = {
  3: '3ヶ月後',
  6: '6ヶ月後',
  12: '12ヶ月後',
};

function formatOpenDate(months: TargetMonths): string {
  const d = new Date();
  d.setMonth(d.getMonth() + months);
  return d.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function TimeCapsuleForm({ isPro = false, onSaved }: TimeCapsuleFormProps) {
  const [letterText, setLetterText] = useState('');
  const [targetMonths, setTargetMonths] = useState<TargetMonths>(3);
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [savedId, setSavedId] = useState<string | null>(null);

  const handleSave = useCallback(async () => {
    if (!letterText.trim()) return;
    if (letterText.trim().length < 10) {
      setStatus('error');
      return;
    }

    setStatus('saving');

    try {
      // LocalStorage に保存（Phase 3.1）
      const { createCapsule } = await import('../lib/time-capsule/storage');
      const capsule = createCapsule(letterText.trim(), targetMonths, {});
      setSavedId(capsule.id);
      setStatus('saved');
      onSaved?.(capsule.id);
    } catch {
      setStatus('error');
    }
  }, [letterText, targetMonths, onSaved]);

  // PRO 未加入の場合
  if (!isPro) {
    return (
      <div className="tcf-upgrade">
        <div className="tcf-upgrade-icon" aria-hidden="true">⏳</div>
        <h2 className="tcf-upgrade-title">タイムカプセルはPRO機能です</h2>
        <p className="tcf-upgrade-desc">
          PRO会員（¥590/月）になると、今日の診断スコア＋手紙を保存して
          3・6・12ヶ月後に自動通知が届きます。
        </p>
        <a
          href="/pro/"
          className="tcf-upgrade-btn"
          aria-label="PRO会員の詳細を見る"
        >
          PRO会員の詳細を見る →
        </a>
        <p className="tcf-upgrade-note">¥590/月・いつでも解約可</p>
        <style>{upgradeStyles}</style>
      </div>
    );
  }

  // 保存完了状態
  if (status === 'saved' && savedId) {
    const openDateStr = formatOpenDate(targetMonths);
    return (
      <div className="tcf-success">
        <div className="tcf-success-icon" aria-hidden="true">📬</div>
        <h2 className="tcf-success-title">タイムカプセルを封印しました</h2>
        <p className="tcf-success-desc">
          <strong>{openDateStr}</strong> に通知が届きます。
          <br />
          それまで大切に保管されます。
        </p>
        <p className="tcf-success-id">カプセルID: <code>{savedId}</code></p>
        <button
          className="tcf-new-btn"
          onClick={() => {
            setStatus('idle');
            setLetterText('');
            setTargetMonths(3);
            setSavedId(null);
          }}
          type="button"
        >
          もう一つ書く
        </button>
        <style>{successStyles}</style>
      </div>
    );
  }

  return (
    <div className="tcf-wrapper" role="form" aria-label="タイムカプセル作成フォーム">
      <div className="tcf-header">
        <span className="tcf-header-icon" aria-hidden="true">✉️</span>
        <div>
          <h2 className="tcf-title">未来の自分への手紙</h2>
          <p className="tcf-subtitle">今の気持ち・目標・悩みを書いて封印してください</p>
        </div>
      </div>

      {/* 手紙テキストエリア */}
      <div className="tcf-field">
        <label className="tcf-label" htmlFor="tcf-letter">
          手紙の内容
          <span className="tcf-char-count" aria-live="polite">
            {letterText.length} / 2000
          </span>
        </label>
        <textarea
          id="tcf-letter"
          className="tcf-textarea"
          value={letterText}
          onChange={(e) => setLetterText(e.target.value)}
          maxLength={2000}
          rows={8}
          placeholder="例：今日、転職の決断をしました。めちゃくちゃ怖いけど、3ヶ月後の自分に聞いてみたい。ちゃんとやれてる？..."
          aria-required="true"
          aria-describedby="tcf-letter-hint"
        />
        <p id="tcf-letter-hint" className="tcf-hint">
          自由に書いてください。文法・文体は気にしなくて大丈夫です。
        </p>
      </div>

      {/* 送信時期選択 */}
      <fieldset className="tcf-fieldset">
        <legend className="tcf-legend">開封する時期</legend>
        <div className="tcf-months-group" role="radiogroup" aria-label="開封時期の選択">
          {([3, 6, 12] as TargetMonths[]).map((m) => (
            <label key={m} className={`tcf-month-option ${targetMonths === m ? 'tcf-month-option--selected' : ''}`}>
              <input
                type="radio"
                name="target-months"
                value={m}
                checked={targetMonths === m}
                onChange={() => setTargetMonths(m)}
                className="tcf-radio"
              />
              <span className="tcf-month-label">{MONTH_LABELS[m]}</span>
              <span className="tcf-month-date">{formatOpenDate(m)}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* プレビュー */}
      <div className="tcf-preview" aria-live="polite">
        <span className="tcf-preview-icon" aria-hidden="true">📅</span>
        <p className="tcf-preview-text">
          <strong>{formatOpenDate(targetMonths)}</strong> に届きます
        </p>
      </div>

      {/* エラー表示 */}
      {status === 'error' && (
        <p className="tcf-error" role="alert">
          手紙の内容を10文字以上入力してください。
        </p>
      )}

      {/* 保存ボタン */}
      <button
        className="tcf-save-btn"
        onClick={handleSave}
        disabled={!letterText.trim() || status === 'saving'}
        type="button"
        aria-busy={status === 'saving'}
      >
        {status === 'saving' ? '封印中...' : `${formatOpenDate(targetMonths)}に封印する`}
      </button>

      <p className="tcf-privacy-note">
        手紙はあなた自身にしか見えません。他のユーザー・スタッフには公開されません。
      </p>

      <style>{formStyles}</style>
    </div>
  );
}

const formStyles = `
  .tcf-wrapper {
    background: #fff;
    border-radius: 1rem;
    border: 1px solid #e0e7ff;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    box-shadow: 0 2px 12px rgba(79 70 229 / 0.08);
  }
  .tcf-header {
    display: flex;
    align-items: flex-start;
    gap: 0.875rem;
  }
  .tcf-header-icon {
    font-size: 2rem;
    flex-shrink: 0;
    margin-top: 0.1rem;
  }
  .tcf-title {
    font-size: 1.15rem;
    font-weight: 700;
    color: #1e1b4b;
    margin: 0 0 0.2rem;
    font-family: var(--sn-font-rounded, sans-serif);
  }
  .tcf-subtitle {
    font-size: 0.85rem;
    color: #6b7280;
    margin: 0;
    line-height: 1.5;
  }
  .tcf-field {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }
  .tcf-label {
    font-size: 0.875rem;
    font-weight: 700;
    color: #374151;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .tcf-char-count {
    font-size: 0.75rem;
    font-weight: 400;
    color: #9ca3af;
  }
  .tcf-textarea {
    width: 100%;
    border: 1.5px solid #d1d5db;
    border-radius: 0.625rem;
    padding: 0.875rem 1rem;
    font-size: 0.925rem;
    line-height: 1.75;
    color: #1f2937;
    resize: vertical;
    font-family: inherit;
    transition: border-color 0.15s, box-shadow 0.15s;
    box-sizing: border-box;
  }
  .tcf-textarea:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99 102 241 / 0.15);
  }
  .tcf-hint {
    font-size: 0.78rem;
    color: #9ca3af;
    margin: 0;
  }
  .tcf-fieldset {
    border: none;
    padding: 0;
    margin: 0;
  }
  .tcf-legend {
    font-size: 0.875rem;
    font-weight: 700;
    color: #374151;
    margin-bottom: 0.75rem;
  }
  .tcf-months-group {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;
  }
  .tcf-month-option {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.2rem;
    padding: 0.75rem 0.5rem;
    border: 1.5px solid #e5e7eb;
    border-radius: 0.625rem;
    cursor: pointer;
    text-align: center;
    transition: border-color 0.15s, background 0.15s;
  }
  .tcf-month-option--selected {
    border-color: #6366f1;
    background: #eef2ff;
  }
  .tcf-month-option:hover {
    border-color: #a5b4fc;
  }
  .tcf-radio {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
  }
  .tcf-month-label {
    font-size: 0.925rem;
    font-weight: 700;
    color: #1e1b4b;
  }
  .tcf-month-date {
    font-size: 0.7rem;
    color: #6b7280;
  }
  .tcf-preview {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
    background: #eef2ff;
    border-radius: 0.5rem;
  }
  .tcf-preview-icon { font-size: 1.25rem; }
  .tcf-preview-text {
    font-size: 0.9rem;
    color: #3730a3;
    margin: 0;
  }
  .tcf-error {
    font-size: 0.85rem;
    color: #dc2626;
    margin: 0;
    padding: 0.75rem 1rem;
    background: #fef2f2;
    border-radius: 0.5rem;
    border: 1px solid #fecaca;
  }
  .tcf-save-btn {
    width: 100%;
    padding: 1rem;
    background: linear-gradient(135deg, #4f46e5, #7c3aed);
    color: #fff;
    border: none;
    border-radius: 999px;
    font-weight: 700;
    font-size: 1rem;
    cursor: pointer;
    min-height: 52px;
    font-family: inherit;
    transition: opacity 0.15s, transform 0.15s;
    box-shadow: 0 4px 12px rgba(79 70 229 / 0.3);
  }
  .tcf-save-btn:hover:not(:disabled) {
    opacity: 0.9;
    transform: translateY(-1px);
  }
  .tcf-save-btn:focus-visible {
    outline: 3px solid #4f46e5;
    outline-offset: 3px;
  }
  .tcf-save-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
  .tcf-privacy-note {
    font-size: 0.78rem;
    color: #9ca3af;
    text-align: center;
    margin: 0;
  }
  @media (max-width: 480px) {
    .tcf-months-group {
      grid-template-columns: 1fr;
    }
  }
`;

const successStyles = `
  .tcf-success {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 2rem 1.5rem;
    text-align: center;
    background: #fff;
    border-radius: 1rem;
    border: 1px solid #bbf7d0;
    box-shadow: 0 2px 12px rgba(5 150 105 / 0.08);
  }
  .tcf-success-icon { font-size: 3rem; }
  .tcf-success-title {
    font-size: 1.15rem;
    font-weight: 700;
    color: #065f46;
    margin: 0;
    font-family: var(--sn-font-rounded, sans-serif);
  }
  .tcf-success-desc {
    font-size: 0.9rem;
    color: #374151;
    line-height: 1.7;
    margin: 0;
  }
  .tcf-success-id {
    font-size: 0.75rem;
    color: #9ca3af;
    margin: 0;
  }
  .tcf-success-id code {
    font-family: monospace;
    background: #f3f4f6;
    padding: 2px 6px;
    border-radius: 4px;
  }
  .tcf-new-btn {
    padding: 0.75rem 1.75rem;
    background: #f0fdf4;
    border: 1.5px solid #86efac;
    border-radius: 999px;
    color: #065f46;
    font-weight: 700;
    font-size: 0.9rem;
    cursor: pointer;
    font-family: inherit;
    min-height: 44px;
    transition: opacity 0.15s;
  }
  .tcf-new-btn:hover { opacity: 0.8; }
`;

const upgradeStyles = `
  .tcf-upgrade {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 2.5rem 1.5rem;
    text-align: center;
    background: linear-gradient(135deg, #f0f4ff 0%, #faf5ff 100%);
    border-radius: 1rem;
    border: 1px solid #ddd6fe;
  }
  .tcf-upgrade-icon { font-size: 3rem; }
  .tcf-upgrade-title {
    font-size: 1.15rem;
    font-weight: 700;
    color: #1e1b4b;
    margin: 0;
    font-family: var(--sn-font-rounded, sans-serif);
  }
  .tcf-upgrade-desc {
    font-size: 0.9rem;
    color: #4b5563;
    line-height: 1.7;
    margin: 0;
    max-width: 320px;
  }
  .tcf-upgrade-btn {
    display: inline-flex;
    align-items: center;
    padding: 0.875rem 2rem;
    background: linear-gradient(135deg, #4f46e5, #7c3aed);
    color: #fff;
    border-radius: 999px;
    font-weight: 700;
    font-size: 1rem;
    text-decoration: none;
    min-height: 48px;
    box-shadow: 0 4px 12px rgba(79 70 229 / 0.3);
    transition: opacity 0.15s, transform 0.15s;
  }
  .tcf-upgrade-btn:hover {
    opacity: 0.9;
    transform: translateY(-1px);
    text-decoration: none;
    color: #fff;
  }
  .tcf-upgrade-note {
    font-size: 0.78rem;
    color: #6b7280;
    margin: 0;
  }
`;
