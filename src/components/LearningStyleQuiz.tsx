/**
 * LearningStyleQuiz.tsx - 学習スタイル簡易診断 React Island
 *
 * VARK モデル（Fleming 1995）+ 多重知能（Gardner 1983）の融合設計
 * 10問・即時結果表示・登録不要
 *
 * 理論的根拠:
 * - Fleming, N.D. (1995). I'm different; not dumb. Annual Conference of the
 *   Higher Education and Research Development Society of Australasia (HERDSA)
 *   URL: https://vark-learn.com/
 * - Gardner, H. (1983). Frames of Mind. Basic Books.
 *   URL: https://www.pz.harvard.edu/projects/multiple-intelligences
 *
 * YMYL注意: 学習障害・発達障害の判定は行わない
 *
 * 確認日: 2026-05-21
 */

import { useState } from 'react';

/** 学習スタイル8タイプ */
type LearningStyle =
  | 'visual'
  | 'auditory'
  | 'reading'
  | 'kinesthetic'
  | 'multimodal'
  | 'conceptual'
  | 'narrative'
  | 'collaborative';

interface StyleResult {
  type: LearningStyle;
  label: string;
  icon: string;
  description: string;
  studyTips: string[];
  relatedIntelligence: string;
  color: string;
}

/** 各スタイルの詳細 */
const STYLE_RESULTS: Record<LearningStyle, StyleResult> = {
  visual: {
    type: 'visual',
    label: '視覚学習型（Visual）',
    icon: '👁️',
    description:
      '図・絵・色・レイアウトで情報を整理するときに最も理解が深まります。マインドマップ・フローチャート・カラーマーカーを使った学習が特に効果的です。',
    studyTips: [
      'ノートはカラーペンで色分けし、図解を多用する',
      'マインドマップで知識をつなげる',
      '教科書の図表・グラフを先に読んでから本文へ進む',
      '動画・図解が豊富な教材を優先して選ぶ',
      '暗記は単語カードにイラストを加えて覚える',
    ],
    relatedIntelligence: '視空間的知能（Spatial Intelligence）',
    color: '#7c3aed',
  },
  auditory: {
    type: 'auditory',
    label: '聴覚学習型（Auditory）',
    icon: '👂',
    description:
      '声に出す・聞く・話し合うことで記憶が定着します。音読・グループ討論・ポッドキャスト学習が得意です。静かな部屋よりも適度な音がある環境の方が集中できる傾向があります。',
    studyTips: [
      '教科書を声に出して読む（音読学習）',
      '学習内容を誰かに話して説明する（教師役学習）',
      '録音して自分の声を聞きながら復習する',
      'グループ討論・勉強会に積極的に参加する',
      '移動中は音声教材・ポッドキャストで学ぶ',
    ],
    relatedIntelligence: '言語的知能（Linguistic Intelligence）',
    color: '#db2777',
  },
  reading: {
    type: 'reading',
    label: '読み書き学習型（Reading-Writing）',
    icon: '📝',
    description:
      '読む・書くことで理解が深まります。詳細なノートを取り、参考書を読み込み、要約を書くことで記憶が定着するタイプです。文章での情報整理が得意です。',
    studyTips: [
      'ノートを丁寧に取り、後で清書して整理する',
      '要約文・ポイントリストを自分で作成する',
      '複数の参考書を比較しながら読む',
      '記述式の問題を多く解いて言語化を練習する',
      '学習日記・ジャーナリングで理解を深める',
    ],
    relatedIntelligence: '言語的知能（Linguistic Intelligence）',
    color: '#0284c7',
  },
  kinesthetic: {
    type: 'kinesthetic',
    label: '運動感覚学習型（Kinesthetic）',
    icon: '🤲',
    description:
      '実際に手を動かす・体験することで最も深く理解できます。実験・実習・ロールプレイ・実物を触る体験型の学習が最も効果的です。座学だけでは集中が続きにくい傾向があります。',
    studyTips: [
      '実験・実習・フィールドワークを積極的に活用する',
      '手を動かしながら（書き・作り・触れながら）学ぶ',
      '立ちながら・歩きながら音声学習を取り入れる',
      '学習内容をジェスチャー・動作で再現する',
      '運動後のすっきりした状態で学習する',
    ],
    relatedIntelligence: '身体運動的知能（Bodily-Kinesthetic Intelligence）',
    color: '#16a34a',
  },
  multimodal: {
    type: 'multimodal',
    label: 'マルチモーダル型（VARK混合）',
    icon: '🌈',
    description:
      '複数の感覚チャンネルをバランスよく使って学ぶタイプです。状況に応じて最適な学習方法を選べる柔軟性があります。どの方法も一定の効果があるため、飽き防止のために方法を組み合わせると効果的です。',
    studyTips: [
      '1つの単元を「読む→図解する→声に出す→演習する」で多角的に学ぶ',
      '気分や体調に合わせて学習スタイルを変える',
      '視覚・聴覚・運動の3つを組み合わせたノート術を開発する',
      '複数の教材形式（動画・書籍・問題集）を並行して使う',
      '「今日はどの方法が一番合っているか」を毎回確認する',
    ],
    relatedIntelligence: '複数の知能が高くバランス型',
    color: '#ea580c',
  },
  conceptual: {
    type: 'conceptual',
    label: '概念派（論理・概念型）',
    icon: '🔗',
    description:
      '「なぜそうなるのか」の論理・概念の体系で理解するタイプです。暗記よりも原理・法則の理解を優先し、概念がつながって初めて記憶が定着します。問題の解法の理由を理解してから暗記する順序が大切です。',
    studyTips: [
      '「なぜ？」を繰り返して概念の根拠を追求する',
      'フローチャートや論理図で概念のつながりを図解する',
      '例外・特殊ケースから一般法則を逆算して理解する',
      '教師役学習で自分の論理的理解の穴を発見する',
      '問題集より先に概念の体系書（教科書・解説書）を読む',
    ],
    relatedIntelligence: '論理数学的知能（Logical-Mathematical Intelligence）',
    color: '#0891b2',
  },
  narrative: {
    type: 'narrative',
    label: '物語派（ストーリー型）',
    icon: '📖',
    description:
      '情報をストーリー・エピソード・文脈と結びつけて記憶するタイプです。歴史的経緯・人物の背景・具体的なエピソードと一緒に覚えると定着率が高まります。論理より感情・文脈で記憶が強化されます。',
    studyTips: [
      '学習内容を「物語」として語れるように整理する',
      '人物・エピソード・背景と一緒にキーワードを覚える',
      '歴史・事例・実例から始めて概念に進む',
      '読書感想文・学習日記で感情と知識をセットにする',
      'ドキュメンタリー・伝記・実話教材を積極活用する',
    ],
    relatedIntelligence: '言語的知能 × 対人的知能',
    color: '#b45309',
  },
  collaborative: {
    type: 'collaborative',
    label: '協働派（対話・協働型）',
    icon: '👥',
    description:
      '他者との対話・協力を通じて学ぶタイプです。一人で学ぶより、グループで教え合う・意見を交換する・ディスカッションする中で理解が深まります。教えることで自分の理解も確認できます。',
    studyTips: [
      'グループ学習・勉強会を積極的に活用する',
      '「友達に説明する」形でアウトプット学習をする',
      '先生・チューターへの質問を積極的に行う',
      'ペア学習でお互いに採点・フィードバックをする',
      'オンラインコミュニティで学習仲間を見つける',
    ],
    relatedIntelligence: '対人的知能（Interpersonal Intelligence）',
    color: '#0f766e',
  },
};

/** 診断質問（10問） */
interface Question {
  id: number;
  text: string;
  options: { label: string; scores: Partial<Record<LearningStyle, number>> }[];
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: '新しいスマートフォンの使い方を覚えるとき、どの方法が一番速く覚えられますか？',
    options: [
      { label: '画面の図解・説明書を読む', scores: { visual: 2, reading: 1 } },
      { label: '誰かに口頭で教えてもらう', scores: { auditory: 2, collaborative: 1 } },
      { label: '実際に触りながら試してみる', scores: { kinesthetic: 2 } },
      { label: 'YouTubeの解説動画を見る', scores: { visual: 1, auditory: 1, multimodal: 1 } },
    ],
  },
  {
    id: 2,
    text: '試験勉強をするとき、最も得意な方法はどれですか？',
    options: [
      { label: 'ノートを色分けして図解する', scores: { visual: 2 } },
      { label: '声に出して読む・自分に説明する', scores: { auditory: 2 } },
      { label: '問題をひたすら解いて手を動かす', scores: { kinesthetic: 2 } },
      { label: 'テキストを読み込んで要約を書く', scores: { reading: 2 } },
    ],
  },
  {
    id: 3,
    text: '覚えにくいことを暗記するとき、どれが効果的ですか？',
    options: [
      { label: 'カラフルな単語カードやフラッシュカードを作る', scores: { visual: 2 } },
      { label: 'リズムに乗せたり声に出して繰り返す', scores: { auditory: 2 } },
      { label: 'ジェスチャーや体の動きと結びつける', scores: { kinesthetic: 2 } },
      { label: '文章にまとめて繰り返し書く', scores: { reading: 2 } },
    ],
  },
  {
    id: 4,
    text: '複雑な概念や仕組みを理解するとき、どの方法で一番よく分かりますか？',
    options: [
      { label: '図や図解で視覚化されると分かりやすい', scores: { visual: 2 } },
      { label: '論理的な説明と「なぜそうなるか」の理由', scores: { conceptual: 2 } },
      { label: '具体的なエピソードや事例で説明される', scores: { narrative: 2 } },
      { label: '実際にやってみて失敗しながら学ぶ', scores: { kinesthetic: 2 } },
    ],
  },
  {
    id: 5,
    text: '授業や講義の中で最も集中できるのはどんな状況ですか？',
    options: [
      { label: '黒板・スライドに図や色があるとき', scores: { visual: 2 } },
      { label: '先生の話が面白くて声のトーンが良いとき', scores: { auditory: 2 } },
      { label: 'グループワークや実験があるとき', scores: { collaborative: 1, kinesthetic: 1 } },
      { label: 'テキストや資料がしっかり整備されているとき', scores: { reading: 2 } },
    ],
  },
  {
    id: 6,
    text: '友達に何かを教えるとき、あなたはどんな説明が得意ですか？',
    options: [
      { label: '紙に図を書きながら説明する', scores: { visual: 2 } },
      { label: '口頭でわかりやすく語りかける', scores: { auditory: 2 } },
      { label: 'ストーリーや具体例を使って説明する', scores: { narrative: 2 } },
      { label: '一緒に実際にやってみて体験してもらう', scores: { kinesthetic: 1, collaborative: 1 } },
    ],
  },
  {
    id: 7,
    text: '自由な学習時間があるとき、自然と取る行動に最も近いのはどれですか？',
    options: [
      { label: '本や記事を読み込んでメモを取る', scores: { reading: 2 } },
      { label: '動画や音声コンテンツを視聴する', scores: { auditory: 1, visual: 1 } },
      { label: '友達と話し合ったり議論する', scores: { collaborative: 2 } },
      { label: '実際に手を動かして何か作る・試す', scores: { kinesthetic: 2 } },
    ],
  },
  {
    id: 8,
    text: '学習中に記憶が定着しやすいのはどんな瞬間ですか？',
    options: [
      { label: '全体像が図で可視化されたとき', scores: { visual: 2 } },
      { label: '「あ、そういう仕組みか！」と論理でつながったとき', scores: { conceptual: 2 } },
      { label: '「昔こういうことがあった」と実体験とつながったとき', scores: { narrative: 2 } },
      { label: '実際に手を動かして体で覚えたとき', scores: { kinesthetic: 2 } },
    ],
  },
  {
    id: 9,
    text: '学習環境について、最も集中しやすいのはどれですか？',
    options: [
      { label: '静かで整理された視覚的に美しい空間', scores: { visual: 2 } },
      { label: '適度な雑音や音楽がある環境', scores: { auditory: 2 } },
      { label: '図書館や自習室など集中しやすい場所', scores: { reading: 1, conceptual: 1 } },
      { label: '仲間と一緒に学べる空間', scores: { collaborative: 2 } },
    ],
  },
  {
    id: 10,
    text: '学校の授業で一番好きだったタイプを選んでください。',
    options: [
      { label: '図・地図・実験を使う理科・社会・美術', scores: { visual: 1, kinesthetic: 1 } },
      { label: '討論・発表・グループ活動がある授業', scores: { collaborative: 1, auditory: 1 } },
      { label: '小説・歴史・物語を読んで語り合う授業', scores: { narrative: 2 } },
      { label: '数学・論理パズル・プログラミング的な授業', scores: { conceptual: 2 } },
    ],
  },
];

/** スコア集計して最高タイプを返す */
function calculateStyle(answers: number[]): LearningStyle {
  const scores: Record<LearningStyle, number> = {
    visual: 0,
    auditory: 0,
    reading: 0,
    kinesthetic: 0,
    multimodal: 0,
    conceptual: 0,
    narrative: 0,
    collaborative: 0,
  };

  answers.forEach((optionIndex, questionIndex) => {
    const q = QUESTIONS[questionIndex];
    if (!q) return;
    const option = q.options[optionIndex];
    if (!option) return;
    Object.entries(option.scores).forEach(([style, score]) => {
      scores[style as LearningStyle] += score ?? 0;
    });
  });

  // 最大スコアを持つタイプを取得
  let maxScore = -1;
  let topStyle: LearningStyle = 'multimodal';
  let topCount = 0;

  (Object.entries(scores) as [LearningStyle, number][]).forEach(([style, score]) => {
    if (score > maxScore) {
      maxScore = score;
      topStyle = style;
      topCount = 1;
    } else if (score === maxScore) {
      topCount++;
    }
  });

  // 複数タイプが同点最高の場合はマルチモーダル
  if (topCount >= 3) return 'multimodal';
  return topStyle;
}

export default function LearningStyleQuiz() {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [result, setResult] = useState<LearningStyle | null>(null);

  const totalQ = QUESTIONS.length;
  const progress = Math.round((currentQ / totalQ) * 100);
  const isLast = currentQ === totalQ - 1;

  function handleSelect(optionIndex: number) {
    setSelectedOption(optionIndex);
  }

  function handleNext() {
    if (selectedOption === null) return;
    const newAnswers = [...answers, selectedOption];

    if (isLast) {
      const style = calculateStyle(newAnswers);
      setResult(style);
    } else {
      setAnswers(newAnswers);
      setCurrentQ((prev) => prev + 1);
      setSelectedOption(null);
    }
  }

  function handleBack() {
    if (currentQ === 0) return;
    setAnswers((prev) => prev.slice(0, -1));
    setCurrentQ((prev) => prev - 1);
    setSelectedOption(null);
  }

  function handleReset() {
    setCurrentQ(0);
    setAnswers([]);
    setSelectedOption(null);
    setResult(null);
  }

  // 結果表示
  if (result !== null) {
    const r = STYLE_RESULTS[result];
    return (
      <div className="lsq-result" style={{ '--lsq-color': r.color } as React.CSSProperties}>
        <div className="lsq-result-header">
          <div className="lsq-result-icon">{r.icon}</div>
          <div>
            <p className="lsq-result-badge">あなたの学習スタイル</p>
            <h2 className="lsq-result-type">{r.label}</h2>
          </div>
        </div>
        <p className="lsq-result-desc">{r.description}</p>

        <div className="lsq-tips">
          <h3 className="lsq-tips-title">効果的な勉強法（5つ）</h3>
          <ul className="lsq-tips-list">
            {r.studyTips.map((tip, i) => (
              <li key={i} className="lsq-tips-item">
                <span className="lsq-tips-num">{i + 1}</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="lsq-intel">
          <span className="lsq-intel-label">関連する多重知能:</span>
          <a
            href="/diagnosis/multi-int/"
            className="lsq-intel-link"
          >
            {r.relatedIntelligence}
          </a>
        </div>

        <p className="lsq-disclaimer">
          ※ 本診断は学習傾向の参考把握ツールです。学習障害・発達障害等の医学的評価ではありません。
          （理論出典: VARK-Learn.com / ハーバード大学 Project Zero）
        </p>

        <div className="lsq-actions">
          <button onClick={handleReset} className="lsq-retry-btn">
            もう一度診断する
          </button>
          <a href="/aisei/gakkou/" className="lsq-hub-link">
            学校軸トップへ
          </a>
        </div>
      </div>
    );
  }

  // 質問表示
  const q = QUESTIONS[currentQ];
  return (
    <div className="lsq-quiz">
      {/* 進捗バー */}
      <div className="lsq-progress" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-label={`${currentQ + 1}問目/${totalQ}問`}>
        <div className="lsq-progress-bar" style={{ width: `${progress}%` }} />
      </div>
      <p className="lsq-progress-label">
        質問 {currentQ + 1} / {totalQ}
      </p>

      {/* 質問文 */}
      <div className="lsq-question" role="group" aria-labelledby={`lsq-q-${currentQ}`}>
        <h2 id={`lsq-q-${currentQ}`} className="lsq-question-text">
          {q.text}
        </h2>

        {/* 選択肢 */}
        <div className="lsq-options">
          {q.options.map((opt, i) => (
            <button
              key={i}
              className={`lsq-option ${selectedOption === i ? 'lsq-option--selected' : ''}`}
              onClick={() => handleSelect(i)}
              aria-pressed={selectedOption === i}
            >
              <span className="lsq-option-letter">{['A', 'B', 'C', 'D'][i]}</span>
              <span className="lsq-option-text">{opt.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ナビゲーション */}
      <div className="lsq-nav">
        <button
          onClick={handleBack}
          disabled={currentQ === 0}
          className="lsq-nav-back"
          aria-label="前の質問に戻る"
        >
          ← 戻る
        </button>
        <button
          onClick={handleNext}
          disabled={selectedOption === null}
          className="lsq-nav-next"
        >
          {isLast ? '結果を見る' : '次へ →'}
        </button>
      </div>

      <style>{`
        .lsq-quiz {
          max-width: 640px;
          margin: 0 auto;
          padding: 1.5rem 1rem;
          font-family: var(--sn-font-rounded, sans-serif);
        }
        .lsq-progress {
          height: 8px;
          background: #e5e7eb;
          border-radius: 999px;
          overflow: hidden;
          margin-bottom: 0.5rem;
        }
        .lsq-progress-bar {
          height: 100%;
          background: var(--sn-primary, #6366f1);
          border-radius: 999px;
          transition: width 0.3s ease;
        }
        .lsq-progress-label {
          font-size: 0.8rem;
          color: var(--sn-muted, #6b7280);
          text-align: right;
          margin: 0 0 1.5rem;
        }
        .lsq-question-text {
          font-size: 1.05rem;
          font-weight: 700;
          line-height: 1.6;
          color: #1f2937;
          margin: 0 0 1.25rem;
        }
        .lsq-options {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .lsq-option {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          padding: 0.875rem 1rem;
          border: 2px solid #e5e7eb;
          border-radius: 0.75rem;
          background: #fff;
          text-align: left;
          cursor: pointer;
          transition: border-color 0.15s, background 0.15s, transform 0.1s;
          font-size: 0.95rem;
          line-height: 1.5;
          color: #374151;
          width: 100%;
          min-height: 44px;
        }
        .lsq-option:hover {
          border-color: var(--sn-primary, #6366f1);
          background: #f5f3ff;
          transform: translateX(2px);
        }
        .lsq-option--selected {
          border-color: var(--sn-primary, #6366f1);
          background: #ede9fe;
          font-weight: 600;
        }
        .lsq-option-letter {
          flex-shrink: 0;
          width: 1.75rem;
          height: 1.75rem;
          border-radius: 50%;
          background: var(--sn-primary, #6366f1);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
          font-weight: 700;
          margin-top: 0.1rem;
        }
        .lsq-option-text { flex: 1; }
        .lsq-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 1.5rem;
          gap: 1rem;
        }
        .lsq-nav-back {
          padding: 0.6rem 1.25rem;
          border: 1px solid #d1d5db;
          border-radius: 0.5rem;
          background: #fff;
          color: #6b7280;
          font-size: 0.9rem;
          cursor: pointer;
          min-height: 44px;
        }
        .lsq-nav-back:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
        .lsq-nav-next {
          padding: 0.6rem 1.75rem;
          background: var(--sn-primary, #6366f1);
          color: #fff;
          border: none;
          border-radius: 0.5rem;
          font-size: 0.95rem;
          font-weight: 700;
          cursor: pointer;
          min-height: 44px;
          transition: opacity 0.15s, transform 0.1s;
        }
        .lsq-nav-next:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
        .lsq-nav-next:not(:disabled):hover {
          transform: translateY(-1px);
        }
        /* ---- 結果 ---- */
        .lsq-result {
          max-width: 640px;
          margin: 0 auto;
          padding: 1.5rem 1rem;
        }
        .lsq-result-header {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          margin-bottom: 1.25rem;
        }
        .lsq-result-icon {
          font-size: 3rem;
          line-height: 1;
          flex-shrink: 0;
        }
        .lsq-result-badge {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--lsq-color, #6366f1);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin: 0 0 0.25rem;
        }
        .lsq-result-type {
          font-size: 1.3rem;
          font-weight: 700;
          color: #1f2937;
          margin: 0;
          line-height: 1.3;
        }
        .lsq-result-desc {
          font-size: 0.95rem;
          line-height: 1.7;
          color: #374151;
          background: #f9fafb;
          border-left: 4px solid var(--lsq-color, #6366f1);
          border-radius: 0 0.5rem 0.5rem 0;
          padding: 1rem 1.25rem;
          margin: 0 0 1.5rem;
        }
        .lsq-tips-title {
          font-size: 1rem;
          font-weight: 700;
          color: #1f2937;
          margin: 0 0 0.75rem;
        }
        .lsq-tips-list {
          list-style: none;
          padding: 0;
          margin: 0 0 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }
        .lsq-tips-item {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          font-size: 0.9rem;
          line-height: 1.5;
          color: #374151;
        }
        .lsq-tips-num {
          flex-shrink: 0;
          width: 1.5rem;
          height: 1.5rem;
          background: var(--lsq-color, #6366f1);
          color: #fff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: 700;
        }
        .lsq-intel {
          background: #f0f4ff;
          border-radius: 0.5rem;
          padding: 0.75rem 1rem;
          font-size: 0.85rem;
          color: #374151;
          margin-bottom: 0.75rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
        }
        .lsq-intel-label { font-weight: 600; }
        .lsq-intel-link {
          color: var(--sn-primary, #6366f1);
          text-decoration: underline;
        }
        .lsq-disclaimer {
          font-size: 0.75rem;
          color: var(--sn-muted, #6b7280);
          line-height: 1.6;
          margin: 0 0 1.25rem;
        }
        .lsq-actions {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }
        .lsq-retry-btn {
          padding: 0.6rem 1.5rem;
          border: 2px solid var(--sn-primary, #6366f1);
          border-radius: 0.5rem;
          background: #fff;
          color: var(--sn-primary, #6366f1);
          font-weight: 700;
          font-size: 0.9rem;
          cursor: pointer;
          min-height: 44px;
        }
        .lsq-hub-link {
          display: inline-flex;
          align-items: center;
          padding: 0.6rem 1.5rem;
          background: var(--sn-primary, #6366f1);
          color: #fff;
          border-radius: 0.5rem;
          font-weight: 700;
          font-size: 0.9rem;
          text-decoration: none;
          min-height: 44px;
        }
      `}</style>
    </div>
  );
}
