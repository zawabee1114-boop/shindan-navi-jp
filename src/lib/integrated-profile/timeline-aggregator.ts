/**
 * timeline-aggregator.ts
 * 診断スコア時系列履歴の蓄積・取得ロジック
 *
 * 設計:
 * - LocalStorageキー: sn_timeline_snapshots
 * - 形式: TimelineSnapshot[] (JSON配列)
 * - 既存の sn_scores_* キーは後方互換維持（読み取り専用）
 * - Big5用語はバックエンド専用。ユーザー向けラベルは「行動／対人／責任／情緒／好奇心」
 *
 * PRO制限:
 * - 無料: 過去90日まで表示
 * - PRO/PASS: 全期間表示
 */

import type { Big5Scores } from './types';

/** ユーザー向けラベル（Big5用語は非表示） */
export const TIMELINE_TRAIT_LABELS = {
  E: '行動傾向',
  A: '対人傾向',
  C: '責任傾向',
  N: '情緒傾向',
  O: '好奇心傾向',
} as const satisfies Record<keyof Big5Scores, string>;

/** ユーザー向けトレイトキー一覧（表示順） */
export const TIMELINE_TRAIT_KEYS: (keyof Big5Scores)[] = ['E', 'A', 'C', 'N', 'O'];

/** グラフ色（5本の折れ線） */
export const TIMELINE_TRAIT_COLORS: Record<keyof Big5Scores, string> = {
  E: '#4f46e5', // 行動傾向: インディゴ
  A: '#059669', // 対人傾向: エメラルド
  C: '#d97706', // 責任傾向: アンバー
  N: '#dc2626', // 情緒傾向: レッド
  O: '#7c3aed', // 好奇心傾向: バイオレット
};

/** タイムラインスナップショット1件 */
export interface TimelineSnapshot {
  /** スナップショットID (crypto.randomUUID相当 or Date.now文字列) */
  id: string;
  /** 保存日時 ISO 8601 JST */
  capturedAt: string;
  /** 加重平均Big5スコア（内部計算値・ユーザー向け非表示） */
  big5: Big5Scores;
  /** 受診済み診断数 */
  diagnosisCount: number;
  /** バージョン */
  version: number;
}

const LS_KEY = 'sn_timeline_snapshots';
const FREE_DAYS_LIMIT = 90;

/**
 * 全タイムラインスナップショットを取得
 */
export function loadTimelineSnapshots(): TimelineSnapshot[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as TimelineSnapshot[];
  } catch {
    return [];
  }
}

/**
 * タイムラインスナップショットを保存
 * 同日（JST日付が同じ）に既存スナップショットがあれば上書き更新する
 */
export function saveTimelineSnapshot(big5: Big5Scores, diagnosisCount: number): TimelineSnapshot {
  const snapshots = loadTimelineSnapshots();
  const now = new Date();
  const todayJst = formatDateJst(now);

  // 同日スナップショットの検索
  const existingIdx = snapshots.findIndex((s) => {
    const d = formatDateJst(new Date(s.capturedAt));
    return d === todayJst;
  });

  const newSnapshot: TimelineSnapshot = {
    id: generateId(),
    capturedAt: now.toISOString(),
    big5,
    diagnosisCount,
    version: (snapshots[existingIdx]?.version ?? 0) + 1,
  };

  if (existingIdx >= 0) {
    snapshots[existingIdx] = newSnapshot;
  } else {
    snapshots.push(newSnapshot);
  }

  // 日付昇順でソート
  snapshots.sort((a, b) => new Date(a.capturedAt).getTime() - new Date(b.capturedAt).getTime());

  try {
    localStorage.setItem(LS_KEY, JSON.stringify(snapshots));
  } catch {
    // LocalStorage容量オーバー時は古いものを削除して再試行
    const trimmed = snapshots.slice(-50);
    try { localStorage.setItem(LS_KEY, JSON.stringify(trimmed)); } catch {}
  }

  return newSnapshot;
}

/**
 * PRO制限を適用してスナップショットをフィルタリング
 * @param snapshots 全スナップショット
 * @param isPro PRO/PASSユーザーか
 */
export function applyProFilter(
  snapshots: TimelineSnapshot[],
  isPro: boolean
): { visible: TimelineSnapshot[]; hidden: TimelineSnapshot[]; limitDate: Date | null } {
  if (isPro || snapshots.length === 0) {
    return { visible: snapshots, hidden: [], limitDate: null };
  }

  const limitDate = new Date();
  limitDate.setDate(limitDate.getDate() - FREE_DAYS_LIMIT);

  const visible = snapshots.filter((s) => new Date(s.capturedAt) >= limitDate);
  const hidden = snapshots.filter((s) => new Date(s.capturedAt) < limitDate);

  return { visible, hidden, limitDate };
}

/**
 * スナップショットをSVGグラフ用データ点に変換
 * @param snapshots 表示対象スナップショット配列（昇順）
 */
export interface GraphPoint {
  x: number;           // SVG x座標 (0-100 %)
  y: Record<keyof Big5Scores, number>; // SVG y座標 (0-100 %: 0=top 100=bottom)
  dateLabel: string;   // 表示ラベル YYYY/MM/DD
  raw: TimelineSnapshot;
}

export function snapshotsToGraphPoints(snapshots: TimelineSnapshot[]): GraphPoint[] {
  if (snapshots.length === 0) return [];
  if (snapshots.length === 1) {
    const s = snapshots[0];
    return [{
      x: 50,
      y: {
        O: 100 - s.big5.O,
        C: 100 - s.big5.C,
        E: 100 - s.big5.E,
        A: 100 - s.big5.A,
        N: 100 - s.big5.N,
      },
      dateLabel: formatDateDisplay(new Date(s.capturedAt)),
      raw: s,
    }];
  }

  const times = snapshots.map((s) => new Date(s.capturedAt).getTime());
  const tMin = times[0];
  const tMax = times[times.length - 1];
  const tRange = tMax - tMin || 1;

  return snapshots.map((s, i) => ({
    x: ((times[i] - tMin) / tRange) * 100,
    y: {
      O: 100 - s.big5.O,
      C: 100 - s.big5.C,
      E: 100 - s.big5.E,
      A: 100 - s.big5.A,
      N: 100 - s.big5.N,
    },
    dateLabel: formatDateDisplay(new Date(s.capturedAt)),
    raw: s,
  }));
}

// ---- ヘルパー ----

function formatDateJst(date: Date): string {
  // JST = UTC+9
  const jst = new Date(date.getTime() + 9 * 60 * 60 * 1000);
  return jst.toISOString().slice(0, 10);
}

function formatDateDisplay(date: Date): string {
  const jst = new Date(date.getTime() + 9 * 60 * 60 * 1000);
  const y = jst.getUTCFullYear();
  const m = String(jst.getUTCMonth() + 1).padStart(2, '0');
  const d = String(jst.getUTCDate()).padStart(2, '0');
  return `${y}/${m}/${d}`;
}

function generateId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}
