/**
 * src/lib/claude/client.ts
 * Anthropic Claude API クライアント
 *
 * Phase 3.1: env未設定時はモック（静的テンプレートを返す）
 * Phase 3.3: env設定後に Claude Sonnet 4.6 で動的生成
 *
 * 採用モデル: claude-sonnet-4-6（CEO判定済み）
 * コスト試算: 1リクエスト約¥0.09（Haiku）〜¥0.5（Sonnet）
 */

export const isClaudeConfigured = Boolean(import.meta.env.ANTHROPIC_API_KEY);

export type AiPromptFormat = 'chatgpt' | 'claude' | 'gemini' | 'general';
export type AiUseCase =
  | 'self_intro'
  | 'career'
  | 'matching_app'
  | 'cover_letter'
  | 'life_history';

export interface ProfileData {
  mbtiType?: string;
  bloodType?: string;
  topIntelligences?: string[];
  discProfile?: string;
  perfectionismType?: string;
  loveStyle?: string;
  moneySenseType?: string;
  big5?: { O: number; C: number; E: number; A: number; N: number };
  lastUpdated?: string;
}

/** Claude API でプロンプトカードを生成（env未設定時はモック）*/
export async function generateAiPromptCard(
  profile: ProfileData,
  format: AiPromptFormat,
  useCase: AiUseCase
): Promise<{ content: string; generatedAt: string; tokensUsed: number; mock: boolean }> {
  const now = new Date().toISOString();

  // env 未設定 → 静的テンプレート返却
  if (!isClaudeConfigured) {
    return {
      content: buildStaticTemplate(profile, format, useCase),
      generatedAt: now,
      tokensUsed: 0,
      mock: true,
    };
  }

  // env 設定済み → Claude API 呼び出し
  const Anthropic = (await import('@anthropic-ai/sdk')).default;
  const client = new Anthropic({ apiKey: import.meta.env.ANTHROPIC_API_KEY });

  const model = import.meta.env.CLAUDE_MODEL ?? 'claude-sonnet-4-6';
  const prompt = buildPrompt(profile, format, useCase);

  const response = await client.messages.create({
    model,
    max_tokens: 600,
    messages: [{ role: 'user', content: prompt }],
  });

  const content =
    response.content[0].type === 'text' ? response.content[0].text : '';
  const tokensUsed = response.usage.input_tokens + response.usage.output_tokens;

  return {
    content,
    generatedAt: now,
    tokensUsed,
    mock: false,
  };
}

/** プロンプトテンプレート構築 */
function buildPrompt(profile: ProfileData, format: AiPromptFormat, useCase: AiUseCase): string {
  const profileSummary = buildProfileSummary(profile);

  const formatInstructions: Record<AiPromptFormat, string> = {
    chatgpt:
      'ChatGPT Custom Instructions の「What would you like ChatGPT to know about you?」に貼り付けるテキストを日本語で300文字以内・箇条書きで生成してください。',
    claude:
      'Claude の System Prompt として機能するテキストを日本語で300文字以内・箇条書きで生成してください。',
    gemini:
      'Google Gemini の Custom Instructions に貼り付けるテキストを日本語で300文字以内・箇条書きで生成してください。',
    general:
      'AIアシスタント全般に使える自己紹介プロンプトを日本語で300文字以内・箇条書きで生成してください。',
  };

  const useCaseInstructions: Record<AiUseCase, string> = {
    self_intro: '用途: 自己紹介・初対面のAIとの会話',
    career: '用途: キャリア相談・仕事のアドバイス取得',
    matching_app: '用途: マッチングアプリの自己PR文作成',
    cover_letter: '用途: 職務経歴書・カバーレターの作成サポート',
    life_history: '用途: 自分史・ライフレビューの整理',
  };

  return `あなたは性格診断データの専門家です。以下の診断データを元に${formatInstructions[format]}

${useCaseInstructions[useCase]}

診断データ:
${profileSummary}

出力形式:
1行目: 「私の性格と特性（shindan-navi.jp 統合診断より）」
2行目以降: 箇条書き5〜7点
最終行: 「診断日: ${profile.lastUpdated ?? new Date().toLocaleDateString('ja-JP')}」

Big5スコアは「内向的/外向的」「几帳面/大雑把」などの表現に変換してください。
OCEAN/Big5という技術用語はユーザー向けに使わないでください。`;
}

/** プロフィールサマリー文字列を構築 */
function buildProfileSummary(profile: ProfileData): string {
  const lines: string[] = [];
  if (profile.mbtiType) lines.push(`- MBTI傾向: ${profile.mbtiType}`);
  if (profile.bloodType) lines.push(`- 血液型: ${profile.bloodType}型`);
  if (profile.topIntelligences?.length)
    lines.push(`- 多重知能TOP: ${profile.topIntelligences.join('・')}`);
  if (profile.discProfile) lines.push(`- DiSC傾向: ${profile.discProfile}`);
  if (profile.perfectionismType) lines.push(`- 完璧主義スタイル: ${profile.perfectionismType}`);
  if (profile.loveStyle) lines.push(`- 恋愛スタイル: ${profile.loveStyle}`);
  if (profile.moneySenseType) lines.push(`- 金銭感覚: ${profile.moneySenseType}`);
  if (profile.big5) {
    lines.push(
      `- 特性スコア: 開放性${profile.big5.O}/誠実性${profile.big5.C}/外向性${profile.big5.E}/協調性${profile.big5.A}/安定性${100 - profile.big5.N}`
    );
  }
  return lines.join('\n') || '- 診断データなし（診断を受けてください）';
}

/** 静的テンプレート（env未設定時のフォールバック）*/
function buildStaticTemplate(
  profile: ProfileData,
  format: AiPromptFormat,
  useCase: AiUseCase
): string {
  const formatLabel: Record<AiPromptFormat, string> = {
    chatgpt: 'ChatGPT Custom Instructions',
    claude: 'Claude System Prompt',
    gemini: 'Gemini Custom Instructions',
    general: 'AI アシスタント共通',
  };

  const typeParts: string[] = [];
  if (profile.mbtiType) typeParts.push(`MBTI: ${profile.mbtiType}`);
  if (profile.bloodType) typeParts.push(`血液型: ${profile.bloodType}型`);
  if (profile.topIntelligences?.length)
    typeParts.push(`多重知能: ${profile.topIntelligences[0]}`);

  return `【${formatLabel[format]}】

私の性格と特性（shindan-navi.jp 統合診断より）

${typeParts.length ? typeParts.map((t) => `・${t}`).join('\n') : '・診断ナビで複数の診断を受けたユーザー'}
・自己分析を大切にし、成長を追求する傾向がある
・コミュニケーションでは誠実さを重視する
・意思決定時は複数の視点を検討する
・フィードバックは率直かつ建設的に伝えてほしい

診断日: ${profile.lastUpdated ?? new Date().toLocaleDateString('ja-JP')}

---
※ このカードは Claude API 設定前のサンプルです。
  環境変数（ANTHROPIC_API_KEY）設定後に動的生成に切り替わります。`;
}
