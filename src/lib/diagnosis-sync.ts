/**
 * src/lib/diagnosis-sync.ts
 * 診断結果 LocalStorage → Supabase DB 同期
 *
 * Phase 3.2: ログイン時に LocalStorage の診断結果を DB に保存
 *
 * 設計方針:
 * - ゲスト: LocalStorage のみ（既存動作を維持）
 * - ログイン: LocalStorage + Supabase DB に二重書き込み
 * - ログイン直後: 既存の LocalStorage 全件を DB に一括同期
 *
 * Big5/OCEAN 表記はユーザーへ非表示（バックエンド専用）
 * ユーザー向け語: 「特性スコア」「傾向」
 *
 * 使用: ブラウザ環境でのみ呼び出すこと（SSR禁止）
 */

import { supabase, isSupabaseConfigured } from './supabase/client';
import type { Database } from './supabase/types';

/** diagnosis_results Insert 型 */
type DiagnosisResultInsert = Database['public']['Tables']['diagnosis_results']['Insert'];

/**
 * LocalStorage のキーと診断IDのマッピング
 */
const LS_DIAGNOSIS_MAP: Record<string, string> = {
  'sn_scores_multi-int': 'multi-int',
  'sn_scores_perfectionism': 'perfectionism',
  'sn_scores_disc': 'disc',
  'sn_scores_love_style': 'love_style',
  'sn_scores_money_style': 'money_style',
  'sn_scores_friend_compat': 'friend_compat',
};

/**
 * LocalStorage から診断結果の生データを取得
 * @returns LocalStorage キー → 生データ の Record
 */
function loadRawFromLocalStorage(): Record<string, Record<string, unknown> | null> {
  if (typeof window === 'undefined') return {};

  const results: Record<string, Record<string, unknown> | null> = {};

  // 通常キー
  for (const [lsKey, diagId] of Object.entries(LS_DIAGNOSIS_MAP)) {
    try {
      const raw = localStorage.getItem(lsKey);
      if (raw) {
        results[diagId] = JSON.parse(raw);
      } else {
        results[diagId] = null;
      }
    } catch {
      results[diagId] = null;
    }
  }

  // 星座: zodiac_result_{year}-{month}-{day} 形式
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('zodiac_result_')) {
        const raw = localStorage.getItem(key);
        if (raw) {
          const parsed = JSON.parse(raw);
          const data = parsed.value || parsed;
          if (!results['zodiac']) {
            results['zodiac'] = data;
          }
        }
      }
    }
  } catch {
    results['zodiac'] = null;
  }

  // 血液型
  try {
    const raw = localStorage.getItem('sn_blood_type') || localStorage.getItem('sn_scores_blood_compat');
    if (raw) {
      try {
        results['blood_compat'] = JSON.parse(raw);
      } catch {
        // 生文字列の場合
        results['blood_compat'] = { type: raw.replace(/"/g, '') };
      }
    } else {
      results['blood_compat'] = null;
    }
  } catch {
    results['blood_compat'] = null;
  }

  return results;
}

/**
 * 生データから typeId を抽出する（診断IDごとの形式差異を吸収）
 */
function extractTypeId(diagId: string, data: Record<string, unknown>): string | null {
  switch (diagId) {
    case 'multi-int':
      return (data.dominantType as string) ?? null;
    case 'perfectionism':
      return (data.type as string) ?? (data.typeId as string) ?? null;
    case 'disc':
      return (data.type as string) ?? (data.dominantType as string) ?? (data.typeId as string) ?? null;
    case 'love_style':
      return (data.dominantStyle as string) ?? (data.type as string) ?? (data.typeId as string) ?? null;
    case 'money_style':
      return (data.dominantType as string) ?? (data.type as string) ?? (data.typeId as string) ?? null;
    case 'friend_compat':
      return (data.friendType as string) ?? (data.type as string) ?? (data.typeId as string) ?? null;
    case 'zodiac':
      return (data.zodiacType as string) ?? (data.sign as string) ?? (data.type as string) ?? null;
    case 'blood_compat':
      return (data.type as string) ?? (data.bloodType as string) ?? (data.typeId as string) ?? null;
    default:
      return null;
  }
}

/**
 * 診断結果を1件 DB に保存
 *
 * @param userId Supabase user.id
 * @param diagnosisId 診断ID
 * @param typeId タイプID（診断結果）
 * @param scores スコアオブジェクト
 * @returns 成功したか
 */
export async function saveDiagnosisResultToDB(
  userId: string,
  diagnosisId: string,
  typeId: string,
  scores?: Record<string, number>
): Promise<boolean> {
  if (!supabase || !isSupabaseConfigured) return false;
  if (typeof window === 'undefined') return false;

  try {
    // 同じ診断の既存レコードを is_latest=false に更新
    await supabase
      .from('diagnosis_results')
      .update({ is_latest: false })
      .eq('user_id', userId)
      .eq('diagnosis_id', diagnosisId);

    // 新規 INSERT
    const { error } = await supabase
      .from('diagnosis_results')
      .insert({
        user_id: userId,
        diagnosis_id: diagnosisId,
        type_id: typeId,
        scores: scores ?? {},
        big5_mapping: { O: 50, C: 50, E: 50, A: 50, N: 50 }, // バックエンド計算は aggregator で
        completed_at: new Date().toISOString(),
        is_latest: true,
      } satisfies DiagnosisResultInsert);

    if (error) {
      console.warn(`[DiagnosisSync] DB 保存エラー (${diagnosisId}):`, error.message);
      return false;
    }

    return true;
  } catch (err) {
    console.warn('[DiagnosisSync] 例外:', err);
    return false;
  }
}

/**
 * LocalStorage の全診断結果を DB に一括同期
 * ログイン直後に呼び出す
 *
 * @param userId Supabase user.id
 * @returns 同期件数
 */
export async function syncLocalStorageToDB(userId: string): Promise<number> {
  if (!supabase || !isSupabaseConfigured) return 0;
  if (typeof window === 'undefined') return 0;

  const rawData = loadRawFromLocalStorage();
  let syncCount = 0;

  for (const [diagId, data] of Object.entries(rawData)) {
    if (!data) continue;

    const typeId = extractTypeId(diagId, data);
    if (!typeId) continue;

    const success = await saveDiagnosisResultToDB(userId, diagId, typeId);
    if (success) syncCount++;
  }

  // 同期完了フラグをセット（重複同期防止）
  try {
    localStorage.setItem('sn_db_synced', JSON.stringify({
      userId,
      syncedAt: new Date().toISOString(),
      count: syncCount,
    }));
  } catch {
    // ignore
  }

  return syncCount;
}

/**
 * DB 同期が必要かチェック（前回同期から24時間以上経過 or 未同期）
 */
export function needsSync(userId: string): boolean {
  if (typeof window === 'undefined') return false;

  try {
    const raw = localStorage.getItem('sn_db_synced');
    if (!raw) return true;

    const data = JSON.parse(raw);
    if (data.userId !== userId) return true; // 別ユーザーなら再同期

    const syncedAt = new Date(data.syncedAt).getTime();
    return Date.now() - syncedAt > 24 * 60 * 60 * 1000;
  } catch {
    return true;
  }
}

/**
 * DB から最新の診断結果を取得
 * @param userId Supabase user.id
 */
export async function loadDiagnosisResultsFromDB(userId: string) {
  if (!supabase || !isSupabaseConfigured) return null;

  try {
    const { data, error } = await supabase
      .from('diagnosis_results')
      .select('*')
      .eq('user_id', userId)
      .eq('is_latest', true)
      .order('completed_at', { ascending: false });

    if (error) {
      console.warn('[DiagnosisSync] DB 読み取りエラー:', error.message);
      return null;
    }

    return data;
  } catch {
    return null;
  }
}
