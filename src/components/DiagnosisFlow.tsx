/**
 * DiagnosisFlow.tsx - 診断フロー全体制御 React島
 *
 * 8診断すべてで共通利用する最重要コンポーネント。
 * - 質問データを受け取り1問ずつ表示
 * - 進捗バー連動
 * - 次へ / 戻るナビゲーション
 * - 回答を localStorage に一時保存（リロード復帰対応）
 * - 全問完了で結果ページへ遷移
 * - スコア計算は受け渡された calculateResult 関数で実行
 *
 * CWV 対応:
 * - LCP: 初期レンダリングは最小DOM。質問テキスト・ボタンのみ
 * - CLS: 質問切り替えはフェードアニメーション（高さ固定なし・CLS=0）
 * - INP: タップ→state更新→再レンダリングを200ms以内に完了
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { trackDiagnosisStart, trackDiagnosisComplete } from '../lib/analytics';
import type { Answer, Question, LikertValue, DiagnosisProgress } from '../types/diagnosis';
import { LIKERT_LABELS } from '../types/diagnosis';

interface DiagnosisFlowProps {
  diagnosisId: string;
  questions: Question[];
  resultPath: (typeId: string) => string;
  calculateResult: (answers: Answer[]) => string;
}

/** localStorage キー生成 */
const getStorageKey = (diagnosisId: string) => `sn_progress_${diagnosisId}`;

/** 保存済み進捗を読み込む */
const loadProgress = (diagnosisId: string): DiagnosisProgress | null => {
  try {
    const raw = localStorage.getItem(getStorageKey(diagnosisId));
    if (!raw) return null;
    const data = JSON.parse(raw) as DiagnosisProgress;
    // 24時間以上経過したセッションは破棄
    const startedAt = new Date(data.startedAt).getTime();
    if (Date.now() - startedAt > 24 * 60 * 60 * 1000) {
      localStorage.removeItem(getStorageKey(diagnosisId));
      return null;
    }
    return data;
  } catch {
    return null;
  }
};

/** 進捗を保存する */
const saveProgress = (progress: DiagnosisProgress) => {
  try {
    localStorage.setItem(getStorageKey(progress.diagnosisId), JSON.stringify(progress));
  } catch {
    // localStorage が使えない環境（プライベートブラウズ等）は無視
  }
};

/** 進捗を削除する（完了後） */
const clearProgress = (diagnosisId: string) => {
  try {
    localStorage.removeItem(getStorageKey(diagnosisId));
  } catch {
    // ignore
  }
};

export default function DiagnosisFlow({
  diagnosisId,
  questions,
  resultPath,
  calculateResult,
}: DiagnosisFlowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [selectedValue, setSelectedValue] = useState<LikertValue | undefined>(undefined);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animDir, setAnimDir] = useState<'forward' | 'back'>('forward');
  const [isCompleted, setIsCompleted] = useState(false);
  const [resumeDialogVisible, setResumeDialogVisible] = useState(false);
  const [savedProgress, setSavedProgress] = useState<DiagnosisProgress | null>(null);
  const questionRef = useRef<HTMLDivElement>(null);

  const totalQuestions = questions.length;
  const progress = Math.round(((currentIndex) / totalQuestions) * 100);

  // 初回マウント: localStorage から進捗確認
  useEffect(() => {
    const saved = loadProgress(diagnosisId);
    if (saved && saved.answers.length > 0 && saved.answers.length < totalQuestions) {
      setSavedProgress(saved);
      setResumeDialogVisible(true);
    } else {
      trackDiagnosisStart(diagnosisId);
    }
  }, [diagnosisId, totalQuestions]);

  // currentIndex 変更時: 既存回答を復元
  useEffect(() => {
    const existingAnswer = answers.find(
      (a) => a.questionId === questions[currentIndex]?.id
    );
    setSelectedValue(existingAnswer?.value);
  }, [currentIndex, answers, questions]);

  // 進捗保存
  useEffect(() => {
    if (answers.length > 0 && !isCompleted) {
      saveProgress({
        diagnosisId,
        answers,
        currentIndex,
        startedAt: new Date().toISOString(),
      });
    }
  }, [answers, currentIndex, diagnosisId, isCompleted]);

  /** 続きから再開する */
  const handleResume = useCallback(() => {
    if (!savedProgress) return;
    setAnswers(savedProgress.answers);
    setCurrentIndex(savedProgress.currentIndex);
    setResumeDialogVisible(false);
  }, [savedProgress]);

  /** 最初からやり直す */
  const handleRestart = useCallback(() => {
    clearProgress(diagnosisId);
    setAnswers([]);
    setCurrentIndex(0);
    setResumeDialogVisible(false);
  }, [diagnosisId]);

  /** 回答選択 */
  const handleSelect = useCallback((value: LikertValue) => {
    setSelectedValue(value);
    // 選択と同時に回答を更新（次へを押さなくても回答確定）
    setAnswers((prev) => {
      const questionId = questions[currentIndex].id;
      const filtered = prev.filter((a) => a.questionId !== questionId);
      return [...filtered, { questionId, value }];
    });
  }, [currentIndex, questions]);

  /** アニメーション付きページ遷移 */
  const animateTransition = useCallback((direction: 'forward' | 'back', callback: () => void) => {
    setAnimDir(direction);
    setIsAnimating(true);
    // フェードアウト完了後にコールバック実行
    const timer = setTimeout(() => {
      callback();
      setIsAnimating(false);
      // フォーカスを質問エリアに移す（a11y）
      questionRef.current?.focus();
    }, 180);
    return () => clearTimeout(timer);
  }, []);

  /** 次へ */
  const handleNext = useCallback(() => {
    if (selectedValue === undefined) return;

    if (currentIndex >= totalQuestions - 1) {
      // 全問完了
      setIsCompleted(true);
      clearProgress(diagnosisId);
      const typeId = calculateResult(answers);
      // 遷移（クライアントサイドナビゲーション）
      trackDiagnosisComplete(diagnosisId, typeId);
      window.location.href = resultPath(typeId);
      return;
    }

    animateTransition('forward', () => {
      setCurrentIndex((i) => i + 1);
    });
  }, [selectedValue, currentIndex, totalQuestions, diagnosisId, calculateResult, answers, resultPath, animateTransition]);

  /** 戻る */
  const handleBack = useCallback(() => {
    if (currentIndex === 0) return;
    animateTransition('back', () => {
      setCurrentIndex((i) => i - 1);
    });
  }, [currentIndex, animateTransition]);

  /** キーボード対応（Enter / Space で次へ、Backspace で戻る）*/
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if ((e.key === 'Enter' || e.key === ' ') && selectedValue !== undefined) {
      e.preventDefault();
      handleNext();
    }
    if (e.key === 'Backspace' || e.key === 'ArrowLeft') {
      e.preventDefault();
      handleBack();
    }
  }, [selectedValue, handleNext, handleBack]);

  // 完了後はローディング表示
  if (isCompleted) {
    return (
      <div className="df-completing" aria-live="polite" aria-busy="true">
        <div className="df-spinner" aria-hidden="true" />
        <p className="df-completing-text">結果を計算中...</p>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div className="df-wrapper" onKeyDown={handleKeyDown}>
      {/* 続きから再開ダイアログ */}
      {resumeDialogVisible && savedProgress && (
        <div
          className="df-resume-dialog"
          role="dialog"
          aria-modal="true"
          aria-labelledby="resume-dialog-title"
        >
          <div className="df-resume-card">
            <p className="df-resume-icon" aria-hidden="true">📋</p>
            <h2 id="resume-dialog-title" className="df-resume-title">
              途中まで回答済みです
            </h2>
            <p className="df-resume-desc">
              {savedProgress.answers.length} / {totalQuestions} 問まで回答しています。
              続きから再開しますか？
            </p>
            <div className="df-resume-actions">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleResume}
                autoFocus
              >
                続きから再開
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleRestart}
              >
                最初からやり直す
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 進捗バー */}
      <div className="df-progress-wrapper">
        <div className="df-progress-header">
          <span className="df-progress-label">
            Q{currentIndex + 1} / {totalQuestions}
          </span>
          <span className="df-progress-pct">{progress}%</span>
        </div>
        <div
          className="df-progress-track"
          role="progressbar"
          aria-valuenow={currentIndex + 1}
          aria-valuemin={1}
          aria-valuemax={totalQuestions}
          aria-label={`質問 ${currentIndex + 1} / ${totalQuestions}`}
        >
          <div
            className="df-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* 質問エリア */}
      <div
        ref={questionRef}
        className={`df-question-area ${isAnimating ? (animDir === 'forward' ? 'df-fade-out-left' : 'df-fade-out-right') : 'df-fade-in'}`}
        tabIndex={-1}
        aria-live="polite"
        aria-atomic="true"
      >
        <p className="df-q-number" aria-hidden="true">
          Q{currentIndex + 1}
        </p>
        <h2 className="df-question-text">{currentQuestion.text}</h2>

        {/* リッカートスケール5段階 */}
        <div
          className="df-likert-wrapper"
          role="group"
          aria-label="当てはまる度を選んでください"
        >
          {/* ラベル行（デスクトップ） */}
          <div className="df-likert-labels" aria-hidden="true">
            <span>全く当て<br />はまらない</span>
            <span className="df-likert-label-right">とても<br />当てはまる</span>
          </div>

          {/* 5段階ボタン行 */}
          <div className="df-likert-buttons">
            {([1, 2, 3, 4, 5] as LikertValue[]).map((val) => (
              <button
                key={val}
                type="button"
                className={`df-likert-btn ${selectedValue === val ? 'df-likert-btn--selected' : ''}`}
                onClick={() => handleSelect(val)}
                aria-pressed={selectedValue === val}
                aria-label={`${val}: ${LIKERT_LABELS[val]}`}
                title={LIKERT_LABELS[val]}
              >
                <span className="df-likert-num" aria-hidden="true">{val}</span>
                <span className="df-likert-dot" aria-hidden="true" />
              </button>
            ))}
          </div>

          {/* 選択中のラベル表示 */}
          <div className="df-likert-selected-label" aria-live="polite" aria-atomic="true">
            {selectedValue !== undefined ? (
              <span className="df-selected-badge">
                {LIKERT_LABELS[selectedValue]}
              </span>
            ) : (
              <span className="df-select-hint">1〜5 を選んでください</span>
            )}
          </div>
        </div>
      </div>

      {/* ナビゲーションボタン */}
      <div className="df-nav">
        <button
          type="button"
          className="btn btn-secondary df-btn-back"
          onClick={handleBack}
          disabled={currentIndex === 0}
          aria-label="前の質問に戻る"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" fill="currentColor">
            <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          戻る
        </button>

        <button
          type="button"
          className={`btn btn-primary df-btn-next ${selectedValue === undefined ? 'df-btn-next--disabled' : ''}`}
          onClick={handleNext}
          disabled={selectedValue === undefined}
          aria-label={
            currentIndex >= totalQuestions - 1
              ? '診断を完了して結果を見る'
              : '次の質問へ進む'
          }
        >
          {currentIndex >= totalQuestions - 1 ? '結果を見る' : '次へ'}
          {currentIndex < totalQuestions - 1 && (
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" fill="currentColor">
              <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </button>
      </div>

      {/* 残り問題数ヒント */}
      {totalQuestions - currentIndex - 1 > 0 && (
        <p className="df-remaining">
          残り {totalQuestions - currentIndex - 1} 問
        </p>
      )}

      <style>{`
        .df-wrapper {
          max-width: 640px;
          margin-inline: auto;
          padding: 0 var(--sn-space-4);
          display: flex;
          flex-direction: column;
          gap: var(--sn-space-6);
          outline: none;
        }

        /* 完了ローディング */
        .df-completing {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: var(--sn-space-4);
          min-height: 300px;
        }
        .df-spinner {
          width: 48px;
          height: 48px;
          border: 4px solid var(--sn-border);
          border-top-color: var(--sn-primary);
          border-radius: 50%;
          animation: df-spin 0.8s linear infinite;
        }
        @keyframes df-spin { to { transform: rotate(360deg); } }
        .df-completing-text {
          font-family: var(--sn-font-rounded);
          font-size: var(--sn-text-lg);
          font-weight: 700;
          color: var(--sn-primary);
        }

        /* 再開ダイアログ */
        .df-resume-dialog {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100;
          padding: var(--sn-space-4);
        }
        .df-resume-card {
          background: var(--sn-bg-white);
          border-radius: var(--sn-radius-lg);
          padding: var(--sn-space-8);
          max-width: 400px;
          width: 100%;
          text-align: center;
          box-shadow: var(--sn-shadow-xl);
          display: flex;
          flex-direction: column;
          gap: var(--sn-space-4);
        }
        .df-resume-icon {
          font-size: 3rem;
          margin: 0;
        }
        .df-resume-title {
          font-family: var(--sn-font-rounded);
          font-size: var(--sn-text-xl);
          font-weight: 900;
          color: var(--sn-text);
          margin: 0;
        }
        .df-resume-desc {
          font-size: var(--sn-text-sm);
          color: var(--sn-muted);
          line-height: var(--sn-leading-base);
          margin: 0;
        }
        .df-resume-actions {
          display: flex;
          flex-direction: column;
          gap: var(--sn-space-3);
        }

        /* 進捗バー */
        .df-progress-wrapper {
          display: flex;
          flex-direction: column;
          gap: var(--sn-space-2);
        }
        .df-progress-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .df-progress-label {
          font-family: var(--sn-font-rounded);
          font-size: var(--sn-text-sm);
          font-weight: 700;
          color: var(--sn-primary);
        }
        .df-progress-pct {
          font-size: var(--sn-text-xs);
          color: var(--sn-muted);
        }
        .df-progress-track {
          width: 100%;
          height: 8px;
          background: var(--sn-bg-soft);
          border-radius: var(--sn-radius-pill);
          overflow: hidden;
        }
        .df-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--sn-primary) 0%, var(--sn-secondary) 100%);
          border-radius: var(--sn-radius-pill);
          transition: width 300ms var(--sn-ease-out);
        }

        /* 質問エリア */
        .df-question-area {
          background: var(--sn-bg-white);
          border-radius: var(--sn-radius-lg);
          box-shadow: var(--sn-shadow-md);
          padding: var(--sn-space-8) var(--sn-space-6);
          display: flex;
          flex-direction: column;
          gap: var(--sn-space-6);
          outline: none;
        }
        .df-fade-in {
          animation: df-fadeIn 200ms var(--sn-ease-out) both;
        }
        .df-fade-out-left {
          animation: df-fadeOutLeft 180ms var(--sn-ease-in) both;
        }
        .df-fade-out-right {
          animation: df-fadeOutRight 180ms var(--sn-ease-in) both;
        }
        @keyframes df-fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes df-fadeOutLeft {
          from { opacity: 1; transform: translateX(0); }
          to   { opacity: 0; transform: translateX(-16px); }
        }
        @keyframes df-fadeOutRight {
          from { opacity: 1; transform: translateX(0); }
          to   { opacity: 0; transform: translateX(16px); }
        }

        .df-q-number {
          font-size: var(--sn-text-xs);
          font-weight: 900;
          color: var(--sn-primary);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin: 0;
        }
        .df-question-text {
          font-family: var(--sn-font-rounded);
          font-size: var(--sn-text-xl);
          font-weight: 700;
          color: var(--sn-text);
          line-height: var(--sn-leading-base);
          margin: 0;
        }
        @media (min-width: 640px) {
          .df-question-text { font-size: var(--sn-text-2xl); }
        }

        /* リッカートスケール */
        .df-likert-wrapper {
          display: flex;
          flex-direction: column;
          gap: var(--sn-space-3);
        }
        .df-likert-labels {
          display: flex;
          justify-content: space-between;
          font-size: var(--sn-text-xs);
          color: var(--sn-muted);
          line-height: 1.4;
        }
        .df-likert-label-right {
          text-align: right;
        }
        .df-likert-buttons {
          display: flex;
          gap: var(--sn-space-2);
          justify-content: center;
        }
        .df-likert-btn {
          flex: 1;
          min-width: 44px;
          min-height: 60px;
          max-width: 80px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: var(--sn-space-1);
          padding: var(--sn-space-2);
          background: var(--sn-bg-soft);
          border: 2px solid var(--sn-border);
          border-radius: var(--sn-radius-md);
          cursor: pointer;
          transition:
            background-color 120ms var(--sn-ease),
            border-color 120ms var(--sn-ease),
            transform 120ms var(--sn-ease-bounce);
          touch-action: manipulation;
        }
        .df-likert-btn:hover {
          background: var(--sn-primary-bg);
          border-color: var(--sn-primary-light);
          transform: scale(1.06);
        }
        .df-likert-btn--selected {
          background: var(--sn-primary-bg);
          border-color: var(--sn-primary);
          transform: scale(1.08);
        }
        .df-likert-num {
          font-family: var(--sn-font-rounded);
          font-size: var(--sn-text-base);
          font-weight: 900;
          color: var(--sn-text-soft);
          line-height: 1;
        }
        .df-likert-btn--selected .df-likert-num {
          color: var(--sn-primary);
        }
        .df-likert-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--sn-border);
          transition: background 120ms var(--sn-ease);
        }
        .df-likert-btn--selected .df-likert-dot {
          background: var(--sn-primary);
        }

        .df-likert-selected-label {
          text-align: center;
          min-height: 28px;
        }
        .df-selected-badge {
          display: inline-block;
          padding: var(--sn-space-1) var(--sn-space-4);
          background: var(--sn-primary-bg);
          color: var(--sn-primary-dark);
          border-radius: var(--sn-radius-pill);
          font-size: var(--sn-text-sm);
          font-weight: 700;
          animation: df-fadeIn 150ms var(--sn-ease-out) both;
        }
        .df-select-hint {
          font-size: var(--sn-text-sm);
          color: var(--sn-muted-light);
        }

        /* ナビゲーション */
        .df-nav {
          display: flex;
          gap: var(--sn-space-3);
        }
        .df-btn-back {
          flex: 0 0 auto;
          min-width: 96px;
        }
        .df-btn-back:disabled {
          opacity: 0.35;
          cursor: not-allowed;
        }
        .df-btn-next {
          flex: 1;
        }
        .df-btn-next--disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        /* 残り問題数 */
        .df-remaining {
          text-align: center;
          font-size: var(--sn-text-xs);
          color: var(--sn-muted-light);
          margin: 0;
        }
      `}</style>
    </div>
  );
}
