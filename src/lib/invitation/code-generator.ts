/**
 * src/lib/invitation/code-generator.ts
 * 招待コード生成・管理
 *
 * Phase 3.1: LocalStorage で保存（後でSupabaseに移行）
 * Phase 3.5: Supabase invitations テーブルに移行
 *
 * アルファベット: 誤読しやすい文字（O/0/I/1/l）を除外
 *
 * URL形式変更（fix/static-ssr-cleanup 2026-05-23）:
 * - 旧: /i/{code}/  → 動的ルートのため output:'static' で404
 * - 新: /invite/?code={code}  → 静的ページ + クエリパラメータ
 */

export type InviteMode = 'secret' | 'invite' | 'one_way' | 'full_share';

export interface LocalInvitation {
  code: string;
  mode: InviteMode;
  resultId: string;
  diagPath: string;
  createdAt: string;
  expiresAt: string;
}

const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const STORAGE_KEY = 'shindan_invitations';

/** 6文字の招待コードを生成 */
export function generateInviteCode(): string {
  return Array.from(
    { length: 6 },
    () => ALPHABET[Math.floor(Math.random() * ALPHABET.length)]
  ).join('');
}

/** 招待コードの検証（フォーマットチェック）*/
export function parseInviteCode(code: string): { valid: boolean; normalized: string } {
  const normalized = code.trim().toUpperCase();
  const valid = /^[ABCDEFGHJKLMNPQRSTUVWXYZ23456789]{4,8}$/.test(normalized);
  return { valid, normalized };
}

/** 招待情報を LocalStorage に保存 */
export function saveInvitationLocally(invitation: LocalInvitation): void {
  if (typeof window === 'undefined') return;
  try {
    const stored = getStoredInvitations();
    stored[invitation.code] = invitation;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
  } catch {
    console.warn('[InvitationStorage] LocalStorage への保存に失敗しました');
  }
}

/** コードから招待情報を取得 */
export function getInvitationByCode(code: string): LocalInvitation | null {
  if (typeof window === 'undefined') return null;
  const stored = getStoredInvitations();
  const inv = stored[code.toUpperCase()];
  if (!inv) return null;
  // 期限チェック
  if (new Date(inv.expiresAt) < new Date()) return null;
  return inv;
}

/** 全招待情報を取得 */
function getStoredInvitations(): Record<string, LocalInvitation> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

/** 招待オブジェクトを新規生成（LocalStorage保存込み）*/
export function createInvitation(
  resultId: string,
  mode: InviteMode,
  diagPath: string
): LocalInvitation {
  const code = generateInviteCode();
  const now = new Date();
  const expires = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // 30日後

  const invitation: LocalInvitation = {
    code,
    mode,
    resultId,
    diagPath,
    createdAt: now.toISOString(),
    expiresAt: expires.toISOString(),
  };

  saveInvitationLocally(invitation);
  return invitation;
}

/**
 * 招待URLを生成
 * URL形式: /invite/?code={code}&from={fromType}
 * （旧形式 /i/{code}/ は _redirects で301救済）
 */
export function buildInviteUrl(code: string, fromType?: string): string {
  const base = typeof window !== 'undefined' ? window.location.origin : 'https://shindan-navi.jp';
  const url = new URL('/invite/', base);
  url.searchParams.set('code', code);
  if (fromType) url.searchParams.set('from', fromType);
  return url.toString();
}
