/**
 * AIプロンプトカードジェネレーター
 *
 * ChatGPT / Claude / Gemini への入力フォーマットを生成する。
 * 自社AIチャット機能は持たない（外部AIサービスへの誘導のみ）。
 *
 * 重要ルール:
 * - Big5/OCEAN/ビッグファイブ のユーザー向け表記禁止
 * - 「特性」「傾向」「プロファイル」のみ使用
 * - 医療・精神疾患・治療 言及NG
 * - 占い口調・運命論NG
 * - LGBTQ+配慮（パートナー表記を中性に）
 */

import type { IntegratedProfile } from './types';

/** 生成されるプロンプトカード */
export interface PromptCard {
  /** プロンプトタイトル */
  title: string;
  /** 用途説明（50字以内） */
  description: string;
  /** プロンプト本文（コピー用） */
  prompt: string;
  /** 推奨AIサービス */
  recommendedFor: ('chatgpt' | 'claude' | 'gemini')[];
  /** アイコン */
  icon: string;
}

/** スコアを言葉で表現するヘルパー */
function scoreToLevel(score: number): string {
  if (score >= 75) return '高め';
  if (score >= 50) return '中程度';
  return '控えめ';
}

/**
 * プロファイルのサマリ文字列を生成する（プロンプト内埋め込み用）
 */
function buildProfileSummary(profile: IntegratedProfile): string {
  const { sceneScores, dominantTrait, completedCount } = profile;

  const lines = [
    `【私の特性プロファイル（${completedCount}診断の統合結果）】`,
    `・最も強い特性: ${dominantTrait}`,
    `・仕事での傾向: ${sceneScores.work.label}（強み: ${sceneScores.work.topStrengths.join('・')}）`,
    `・恋愛での傾向: ${sceneScores.love.label}（強み: ${sceneScores.love.topStrengths.join('・')}）`,
    `・友人関係の傾向: ${sceneScores.friend.label}（強み: ${sceneScores.friend.topStrengths.join('・')}）`,
    `・家族関係の傾向: ${sceneScores.family.label}（強み: ${sceneScores.family.topStrengths.join('・')}）`,
    `・学習スタイルの傾向: ${sceneScores.school.label}（強み: ${sceneScores.school.topStrengths.join('・')}）`,
  ];

  return lines.join('\n');
}

/**
 * ChatGPT カスタムインストラクション用プロンプトを生成する
 */
export function generateChatGPTPrompt(profile: IntegratedProfile): string {
  const summary = buildProfileSummary(profile);

  return `以下のプロフィールを踏まえて、私に最適なアドバイスを提供してください。

${summary}

【アドバイス指針】
・私の強みを活かした提案を優先してください
・注意点（${profile.sceneScores.work.cautions.join('・')}）も考慮してください
・具体的で実践しやすい内容を心がけてください
・私の傾向を理解した上で、私らしい選択肢を提示してください`;
}

/**
 * Claude 用プロンプトを生成する
 */
export function generateClaudePrompt(profile: IntegratedProfile): string {
  const summary = buildProfileSummary(profile);

  return `あなたは私の特性をよく理解したアドバイザーです。以下のプロファイルを参考に対話してください。

${summary}

このプロファイルを踏まえて対話する際は:
1. 私の「${profile.dominantTrait}」という特性を軸にした視点で考えてください
2. 仕事では${profile.sceneScores.work.topStrengths[0]}を、恋愛では${profile.sceneScores.love.topStrengths[0]}を活かした提案を
3. 改善の提案は批判でなく、私の強みを伸ばす方向で

※このプロファイルは傾向値であり、絶対的なものではありません。`;
}

/**
 * Gemini 用プロンプトを生成する
 */
export function generateGeminiPrompt(profile: IntegratedProfile): string {
  const summary = buildProfileSummary(profile);

  return `私の特性プロファイルを参考に、パーソナライズされた回答をお願いします。

${summary}

このプロファイルを念頭に置いて:
- 私の得意なアプローチ（${profile.sceneScores.work.topStrengths.join('・')}）を活かした提案を
- 私が大切にしている価値観（${profile.dominantTrait}）に沿った内容で
- 実践的で具体的なアクションを含めてください`;
}

/**
 * 自己紹介文生成プロンプトを生成する
 */
export function generateSelfIntroductionPrompt(profile: IntegratedProfile): string {
  const summary = buildProfileSummary(profile);

  return `以下の私の特性プロファイルを元に、様々な場面で使える自己紹介文を3パターン作成してください。

${summary}

【作成する3パターン】
1. ビジネス用（面接・名刺交換・ビジネスSNS）- 300字程度
2. 友達・カジュアル用（SNSプロフィール・自己紹介）- 150字程度
3. 趣味・サークル用（共通の趣味がある場での自己紹介）- 200字程度

各パターンは私の「${profile.dominantTrait}」という特性が自然に伝わる内容にしてください。
固有の情報（名前・職業・年齢）は[名前][職業][年齢]のようにプレースホルダーで示してください。`;
}

/**
 * キャリア・カバーレター生成プロンプトを生成する
 */
export function generateCoverLetterPrompt(profile: IntegratedProfile, _job?: string): string {
  const summary = buildProfileSummary(profile);

  return `以下の私の特性プロファイルを元に、転職・就職の志望動機文の下書きを作成してください。

${summary}

【作成条件】
・私の強みである「${profile.sceneScores.work.topStrengths.join('・')}」をエピソードとともに伝える構成
・「${profile.dominantTrait}」という特性が志望企業にどう貢献できるかを明示
・800〜1200字程度で、具体的なエピソードのプレースホルダー（[エピソード1][経験]等）を含む
・読みやすい段落構成（書き出し→強み→貢献→締め）

※作成後、固有情報（職種・企業名・実績数値）を私が書き加えて仕上げます。`;
}

/**
 * マッチングアプリプロフィール生成プロンプトを生成する
 */
export function generateDatingProfilePrompt(profile: IntegratedProfile): string {
  const summary = buildProfileSummary(profile);

  return `以下の私の特性プロファイルを元に、マッチングアプリのプロフィール文を作成してください。

${summary}

【作成条件】
・「${profile.sceneScores.love.label}」という恋愛傾向が自然に伝わる内容
・私の「${profile.dominantTrait}」という個性を魅力として表現
・趣味・好みは[趣味1][趣味2]のようにプレースホルダーで示す
・200〜300字で読みやすく、親しみやすいトーン
・下記3パターン: ①ほんわか系 ②アクティブ系 ③知的・丁寧系`;
}

/**
 * 全プロンプトカードを生成する
 */
export function generateAllPromptCards(profile: IntegratedProfile): PromptCard[] {
  return [
    {
      title: 'AI パーソナライズ設定',
      description: 'ChatGPT/Claude に私のことを覚えさせるプロンプト',
      prompt: generateChatGPTPrompt(profile),
      recommendedFor: ['chatgpt', 'claude', 'gemini'],
      icon: '🤖',
    },
    {
      title: '自己紹介文を作る',
      description: 'ビジネス・SNS・カジュアルの3パターン自動生成',
      prompt: generateSelfIntroductionPrompt(profile),
      recommendedFor: ['chatgpt', 'claude', 'gemini'],
      icon: '👋',
    },
    {
      title: '志望動機・カバーレター',
      description: '私の強みを活かした転職・就職書類の下書き',
      prompt: generateCoverLetterPrompt(profile),
      recommendedFor: ['chatgpt', 'claude'],
      icon: '📝',
    },
    {
      title: 'マッチングアプリ プロフィール',
      description: '私の恋愛傾向を活かしたプロフィール文',
      prompt: generateDatingProfilePrompt(profile),
      recommendedFor: ['chatgpt', 'claude', 'gemini'],
      icon: '💕',
    },
  ];
}
