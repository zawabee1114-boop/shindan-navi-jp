/**
 * src/lib/time-capsule/storage.ts
 * タイムカプセル LocalStorage 管理
 *
 * Phase 3.1: LocalStorage ベース
 * Phase 3.4: Supabase time_capsules テーブルに移行
 */

export type CapsuleStatus = 'scheduled' | 'sent' | 'cancelled';

export interface TimeCapsule {
  id: string;
  letterText: string;
  targetMonths: 3 | 6 | 12;
  diagnosisSnapshot: Record<string, unknown>;
  scheduledOpenAt: string;
  createdAt: string;
  status: CapsuleStatus;
}

const STORAGE_KEY = 'shindan_time_capsules';

/** 一意IDを生成 */
function generateId(): string {
  return `tc_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

/** 全タイムカプセルを取得 */
export function getAllCapsules(): TimeCapsule[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/** タイムカプセルを保存 */
function saveCapsules(capsules: TimeCapsule[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(capsules));
  } catch {
    console.warn('[TimeCapsule] LocalStorage への保存に失敗しました');
  }
}

/** タイムカプセルを新規作成 */
export function createCapsule(
  letterText: string,
  targetMonths: 3 | 6 | 12,
  diagnosisSnapshot: Record<string, unknown> = {}
): TimeCapsule {
  const now = new Date();
  const openAt = new Date(now);
  openAt.setMonth(openAt.getMonth() + targetMonths);

  const capsule: TimeCapsule = {
    id: generateId(),
    letterText,
    targetMonths,
    diagnosisSnapshot,
    scheduledOpenAt: openAt.toISOString(),
    createdAt: now.toISOString(),
    status: 'scheduled',
  };

  const existing = getAllCapsules();
  saveCapsules([...existing, capsule]);
  return capsule;
}

/** 開封判定（期限到達チェック）*/
export function isReadyToOpen(capsule: TimeCapsule): boolean {
  return (
    capsule.status === 'scheduled' &&
    new Date(capsule.scheduledOpenAt) <= new Date()
  );
}

/** 開封済みにマーク */
export function markAsOpened(id: string): void {
  const capsules = getAllCapsules();
  const updated = capsules.map((c) =>
    c.id === id ? { ...c, status: 'sent' as CapsuleStatus } : c
  );
  saveCapsules(updated);
}

/** キャンセル */
export function cancelCapsule(id: string): void {
  const capsules = getAllCapsules();
  const updated = capsules.map((c) =>
    c.id === id ? { ...c, status: 'cancelled' as CapsuleStatus } : c
  );
  saveCapsules(updated);
}

/** スケジュール済みのカプセルのみ取得 */
export function getScheduledCapsules(): TimeCapsule[] {
  return getAllCapsules().filter((c) => c.status === 'scheduled');
}

/** 開封可能なカプセルを取得 */
export function getReadyCapsules(): TimeCapsule[] {
  return getScheduledCapsules().filter(isReadyToOpen);
}
