/**
 * QuestionScreen.tsx - 単一質問画面 React島
 *
 * DiagnosisFlow 内部から使われる単一質問表示コンポーネント。
 * 単独でも <QuestionScreen client:visible /> として使用可能。
 *
 * - 質問テキストを大きく中央表示
 * - 5段階リッカートスケール（タップしやすい円形ボタン）
 * - 次へ / 戻るボタン
 * - 残り問題数表示
 * - 質問切り替えアニメーション（フェード）
 *
 * CWV:
 * - INP: タップ→ハンドラ起動 → 最小DOM更新のみ。200ms以内
 * - CLS: min-height 固定でジャンプなし
 */

import { useState, useEffect, useCallback } from 'react';
import type { Question, LikertValue } from '../types/diagnosis';
import { LIKERT_LABELS } from '../types/diagnosis';

interface QuestionScreenProps {
  question: Question;
  questionIndex: number;
  totalQuestions: number;
  selectedValue?: LikertValue;
  onSelect: (value: LikertValue) => void;
  onNext: () => void;
  onBack: () => void;
  canGoBack: boolean;
  canGoNext: boolean;
}

export default function QuestionScreen({
  question,
  questionIndex,
  totalQuestions,
  selectedValue,
  onSelect,
  onNext,
  onBack,
  canGoBack,
  canGoNext,
}: QuestionScreenProps) {
  const [visible, setVisible] = useState(false);
  const [key, setKey] = useState(question.id);

  // 質問切り替え時にアニメーションをリセット
  useEffect(() => {
    setVisible(false);
    const t = setTimeout(() => {
      setKey(question.id);
      setVisible(true);
    }, 50);
    return () => clearTimeout(t);
  }, [question.id]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if ((e.key === 'Enter' || e.key === ' ') && canGoNext) {
      e.preventDefault();
      onNext();
    }
    if (e.key === 'ArrowLeft' && canGoBack) {
      e.preventDefault();
      onBack();
    }
  }, [canGoNext, canGoBack, onNext, onBack]);

  const progress = Math.round((questionIndex / totalQuestions) * 100);

  return (
    <div className="qs-wrapper" onKeyDown={handleKeyDown} tabIndex={0}>
      {/* 進捗インジケーター */}
      <div className="qs-progress" aria-hidden="true">
        <div className="qs-progress-dots">
          {Array.from({ length: Math.min(totalQuestions, 20) }).map((_, i) => (
            <span
              key={i}
              className={`qs-dot ${i < questionIndex ? 'qs-dot--done' : i === questionIndex ? 'qs-dot--current' : ''}`}
            />
          ))}
          {totalQuestions > 20 && (
            <span className="qs-dots-more">+{totalQuestions - 20}</span>
          )}
        </div>
        <span className="qs-progress-text">
          {questionIndex + 1} / {totalQuestions}
        </span>
      </div>

      {/* 質問カード */}
      <div
        key={key}
        className={`qs-card ${visible ? 'qs-card--visible' : 'qs-card--hidden'}`}
      >
        <p className="qs-q-label">Q{questionIndex + 1}</p>
        <h2 className="qs-question">{question.text}</h2>

        {/* 5段階円形ボタン */}
        <fieldset className="qs-fieldset">
          <legend className="sr-only">当てはまる度を選んでください</legend>

          <div className="qs-scale-labels" aria-hidden="true">
            <span>全く当て<br />はまらない</span>
            <span>とても<br />当てはまる</span>
          </div>

          <div className="qs-buttons" role="group">
            {([1, 2, 3, 4, 5] as LikertValue[]).map((val) => {
              const isSelected = selectedValue === val;
              const size = 44 + (val - 1) * 8; // 1:44px → 5:76px（視覚的なスケール感）
              return (
                <button
                  key={val}
                  type="button"
                  className={`qs-circle-btn ${isSelected ? 'qs-circle-btn--selected' : ''}`}
                  onClick={() => onSelect(val)}
                  aria-pressed={isSelected}
                  aria-label={`${val}番: ${LIKERT_LABELS[val]}`}
                  title={LIKERT_LABELS[val]}
                  style={{
                    width: `${size}px`,
                    height: `${size}px`,
                  }}
                >
                  <span className="qs-circle-num">{val}</span>
                </button>
              );
            })}
          </div>

          {/* 選択中ラベル */}
          <div
            className="qs-selected-label"
            aria-live="polite"
            aria-atomic="true"
            style={{ minHeight: '32px' }}
          >
            {selectedValue !== undefined ? (
              <span className="qs-selected-text">
                {selectedValue}: {LIKERT_LABELS[selectedValue]}
              </span>
            ) : (
              <span className="qs-hint-text">数字をタップして選んでください</span>
            )}
          </div>
        </fieldset>
      </div>

      {/* ナビゲーション */}
      <nav className="qs-nav" aria-label="診断ナビゲーション">
        <button
          type="button"
          className="btn btn-secondary qs-btn-back"
          onClick={onBack}
          disabled={!canGoBack}
          aria-label="前の質問に戻る"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M9 2L4 7l5 5" />
          </svg>
          戻る
        </button>

        <div className="qs-nav-center">
          <span className="qs-nav-remaining">
            残り {totalQuestions - questionIndex - 1} 問
          </span>
        </div>

        <button
          type="button"
          className="btn btn-primary qs-btn-next"
          onClick={onNext}
          disabled={!canGoNext || selectedValue === undefined}
          aria-label={
            questionIndex >= totalQuestions - 1
              ? '結果を見る'
              : '次の質問へ'
          }
        >
          {questionIndex >= totalQuestions - 1 ? '結果を見る' : '次へ'}
          {questionIndex < totalQuestions - 1 && (
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M5 2l5 5-5 5" />
            </svg>
          )}
        </button>
      </nav>

      {/* プログレスバー（シンプル版） */}
      <div className="qs-progress-bar-wrapper" aria-hidden="true">
        <div className="qs-progress-bar">
          <div className="qs-progress-bar-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <style>{`
        .qs-wrapper {
          max-width: 560px;
          margin-inline: auto;
          padding: 0 var(--sn-space-4);
          display: flex;
          flex-direction: column;
          gap: var(--sn-space-5);
          outline: none;
        }

        /* 進捗ドット */
        .qs-progress {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--sn-space-3);
        }
        .qs-progress-dots {
          display: flex;
          gap: 4px;
          align-items: center;
          flex-wrap: wrap;
        }
        .qs-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--sn-border);
          transition: background 200ms var(--sn-ease);
          flex-shrink: 0;
        }
        .qs-dot--done { background: var(--sn-primary-light); }
        .qs-dot--current {
          background: var(--sn-primary);
          width: 8px;
          height: 8px;
        }
        .qs-dots-more {
          font-size: var(--sn-text-xs);
          color: var(--sn-muted);
        }
        .qs-progress-text {
          font-size: var(--sn-text-sm);
          font-weight: 700;
          color: var(--sn-primary);
          white-space: nowrap;
          flex-shrink: 0;
        }

        /* 質問カード */
        .qs-card {
          background: var(--sn-bg-white);
          border-radius: var(--sn-radius-lg);
          box-shadow: var(--sn-shadow-md);
          padding: var(--sn-space-8) var(--sn-space-6);
          display: flex;
          flex-direction: column;
          gap: var(--sn-space-6);
          transition: opacity 150ms var(--sn-ease-out), transform 150ms var(--sn-ease-out);
        }
        .qs-card--hidden {
          opacity: 0;
          transform: translateY(6px);
        }
        .qs-card--visible {
          opacity: 1;
          transform: translateY(0);
        }

        .qs-q-label {
          font-size: var(--sn-text-xs);
          font-weight: 900;
          letter-spacing: 0.1em;
          color: var(--sn-primary);
          margin: 0;
        }
        .qs-question {
          font-family: var(--sn-font-rounded);
          font-size: var(--sn-text-xl);
          font-weight: 700;
          color: var(--sn-text);
          line-height: var(--sn-leading-base);
          margin: 0;
        }
        @media (min-width: 480px) {
          .qs-question { font-size: var(--sn-text-2xl); }
        }

        /* フィールドセット */
        .qs-fieldset {
          border: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: var(--sn-space-3);
        }

        .qs-scale-labels {
          display: flex;
          justify-content: space-between;
          font-size: var(--sn-text-xs);
          color: var(--sn-muted);
          line-height: 1.4;
        }
        .qs-scale-labels span:last-child {
          text-align: right;
        }

        /* 円形ボタン群 */
        .qs-buttons {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--sn-space-2);
          padding-block: var(--sn-space-2);
        }
        .qs-circle-btn {
          min-width: 44px;
          min-height: 44px;
          border-radius: 50%;
          border: 2px solid var(--sn-border);
          background: var(--sn-bg-soft);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition:
            background-color 100ms var(--sn-ease),
            border-color 100ms var(--sn-ease),
            transform 100ms var(--sn-ease-bounce),
            box-shadow 100ms var(--sn-ease);
          touch-action: manipulation;
          flex-shrink: 0;
        }
        .qs-circle-btn:hover {
          background: var(--sn-primary-bg);
          border-color: var(--sn-primary);
          transform: scale(1.1);
        }
        .qs-circle-btn--selected {
          background: var(--sn-primary);
          border-color: var(--sn-primary);
          transform: scale(1.12);
          box-shadow: 0 0 0 4px rgba(99,102,241,0.2);
        }
        .qs-circle-num {
          font-family: var(--sn-font-rounded);
          font-size: var(--sn-text-base);
          font-weight: 900;
          color: var(--sn-text-soft);
          line-height: 1;
          pointer-events: none;
        }
        .qs-circle-btn--selected .qs-circle-num {
          color: #ffffff;
        }

        /* 選択済みラベル */
        .qs-selected-label {
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .qs-selected-text {
          display: inline-flex;
          align-items: center;
          padding: var(--sn-space-1) var(--sn-space-4);
          background: var(--sn-primary-bg);
          color: var(--sn-primary-dark);
          border-radius: var(--sn-radius-pill);
          font-size: var(--sn-text-sm);
          font-weight: 700;
          animation: qs-pop 150ms var(--sn-ease-bounce) both;
        }
        @keyframes qs-pop {
          from { opacity: 0; transform: scale(0.9); }
          to   { opacity: 1; transform: scale(1); }
        }
        .qs-hint-text {
          font-size: var(--sn-text-sm);
          color: var(--sn-muted-light);
        }

        /* ナビゲーション */
        .qs-nav {
          display: flex;
          align-items: center;
          gap: var(--sn-space-3);
        }
        .qs-btn-back {
          flex-shrink: 0;
          min-width: 88px;
        }
        .qs-btn-back:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }
        .qs-btn-next:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
        .qs-nav-center {
          flex: 1;
          text-align: center;
        }
        .qs-nav-remaining {
          font-size: var(--sn-text-xs);
          color: var(--sn-muted);
        }
        .qs-btn-next {
          flex-shrink: 0;
          min-width: 104px;
        }

        /* プログレスバー */
        .qs-progress-bar-wrapper { padding-bottom: var(--sn-space-2); }
        .qs-progress-bar {
          height: 4px;
          background: var(--sn-bg-soft);
          border-radius: var(--sn-radius-pill);
          overflow: hidden;
        }
        .qs-progress-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--sn-primary) 0%, var(--sn-secondary) 100%);
          border-radius: var(--sn-radius-pill);
          transition: width 300ms var(--sn-ease-out);
        }
      `}</style>
    </div>
  );
}
