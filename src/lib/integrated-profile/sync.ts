/**
 * src/lib/integrated-profile/sync.ts
 * 統合プロファイル Supabase 永続化
 *
 * Phase 3.2: 統合プロファイル生成時に integrated_profiles テーブルへ保存
 *
 * 設計:
 * - スナップショット方式（過去バージョンを保持）
 * - バージョン: v1, v2, v3 ... 自動インクリメント
 * - is_current: 最新スナップショットのみ true
 * - Big5 スコアは内部計算用。ユーザー向けには「特性スコア」として表示
 *
 * 使用: ブラウザ環境でのみ呼び出すこと（SSR禁止）
 */

import { supabase, isSupabaseConfigured } from '../supabase/client';
import type { IntegratedProfile } from './types';
import type { Database } from '../supabase/types';

type IntegratedProfileInsert = Database['public']['Tables']['integrated_profiles']['Insert'];

/**
 * 統合プロファイルを DB に保存
 *
 * @param userId Supabase user.id
 * @param profile 生成済み統合プロファイル
 * @returns 保存したスナップショットID（失敗時 null）
 */
export async function saveIntegratedProfileToDB(
  userId: string,
  profile: IntegratedProfile
): Promise<string | null> {
  if (!supabase || !isSupabaseConfigured) return null;
  if (typeof window === 'undefined') return null;

  try {
    // 現在のバージョン番号を取得
    const { data: latestRecords, error: fetchError } = await supabase
      .from('integrated_profiles')
      .select('version')
      .eq('user_id', userId)
      .order('snapshot_at', { ascending: false })
      .limit(1);

    if (fetchError) {
      console.warn('[ProfileSync] 最新バージョン取得エラー:', fetchError.message);
    }

    let nextVersion = 'v1';
    if (latestRecords && latestRecords.length > 0) {
      const lastVersionStr = latestRecords[0].version ?? 'v0';
      const lastNum = parseInt(lastVersionStr.replace('v', ''), 10) || 0;
      nextVersion = `v${lastNum + 1}`;
    }

    // 既存の is_current を false に更新
    await supabase
      .from('integrated_profiles')
      .update({ is_current: false })
      .eq('user_id', userId)
      .eq('is_current', true);

    // シーンスコアをシリアライズ（DB の jsonb カラム向け）
    const sceneScoresRecord: Record<string, Record<string, number>> = {};
    for (const [scene, scoreData] of Object.entries(profile.sceneScores)) {
      sceneScoresRecord[scene] = {
        score: scoreData.score,
      };
    }

    // 新規スナップショットを INSERT
    const { data: inserted, error: insertError } = await supabase
      .from('integrated_profiles')
      .insert({
        user_id: userId,
        snapshot_at: new Date().toISOString(),
        aggregated_big5: profile.aggregatedBig5,
        scene_scores: sceneScoresRecord,
        diagnosis_count: profile.completedCount,
        version: nextVersion,
        is_current: true,
      } satisfies IntegratedProfileInsert)
      .select('id')
      .single();

    if (insertError) {
      console.warn('[ProfileSync] INSERT エラー:', insertError.message);
      return null;
    }

    return inserted?.id ?? null;
  } catch (err) {
    console.warn('[ProfileSync] 例外:', err);
    return null;
  }
}

/**
 * DB から最新の統合プロファイルを取得
 *
 * @param userId Supabase user.id
 */
export async function loadLatestIntegratedProfileFromDB(userId: string) {
  if (!supabase || !isSupabaseConfigured) return null;

  try {
    const { data, error } = await supabase
      .from('integrated_profiles')
      .select('*')
      .eq('user_id', userId)
      .eq('is_current', true)
      .single();

    if (error) {
      if (error.code !== 'PGRST116') { // PGRST116 = no rows
        console.warn('[ProfileSync] 読み取りエラー:', error.message);
      }
      return null;
    }

    return data;
  } catch {
    return null;
  }
}

/**
 * DB から過去スナップショット一覧を取得
 *
 * @param userId Supabase user.id
 * @param limit 取得件数（デフォルト: 10）
 */
export async function loadProfileSnapshots(
  userId: string,
  limit = 10
) {
  if (!supabase || !isSupabaseConfigured) return [];

  try {
    const { data, error } = await supabase
      .from('integrated_profiles')
      .select('id, snapshot_at, diagnosis_count, version, is_current')
      .eq('user_id', userId)
      .order('snapshot_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.warn('[ProfileSync] スナップショット読み取りエラー:', error.message);
      return [];
    }

    return data ?? [];
  } catch {
    return [];
  }
}

/**
 * 直前の同期から変化があった場合のみ DB 保存を実行
 * （診断数が変わった、または前回から24時間以上経過した場合）
 *
 * @param userId Supabase user.id
 * @param profile 現在の統合プロファイル
 */
export async function conditionalSaveProfile(
  userId: string,
  profile: IntegratedProfile
): Promise<void> {
  if (!supabase || !isSupabaseConfigured) return;

  // 最新レコードと比較
  const latest = await loadLatestIntegratedProfileFromDB(userId);

  if (latest) {
    const lastCount = latest.diagnosis_count ?? 0;
    const lastSnapshotAt = new Date(latest.snapshot_at).getTime();
    const hoursSince = (Date.now() - lastSnapshotAt) / (1000 * 60 * 60);

    // 診断数が変わらず、24時間以内なら保存スキップ
    if (lastCount === profile.completedCount && hoursSince < 24) {
      return;
    }
  }

  await saveIntegratedProfileToDB(userId, profile);
}
