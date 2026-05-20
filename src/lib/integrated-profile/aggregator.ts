/**
 * 統合プロファイル アグリゲーター
 *
 * LocalStorage から8診断の結果を取得し、
 * 加重平均 Big5スコアと統合プロファイルを生成する。
 *
 * プライバシー: LocalStorage のみ。サーバー送信なし。
 *
 * LocalStorage キー一覧:
 *   - sn_scores_multi-int         （多重知能）
 *   - sn_scores_perfectionism     （完璧主義）
 *   - sn_scores_disc              （DiSC）
 *   - sn_scores_love_style        （恋愛スタイル）
 *   - sn_scores_money_style       （金銭感覚）
 *   - sn_scores_friend_compat     （友達相性）
 *   - zodiac_result_{key}         （星座 → 誕生日キー）
 *   - sn_blood_type               （血液型 → シンプル文字列保存）
 */

import type { Big5Scores, DiagnosisResultEntry, IntegratedProfile } from './types';
import { DIAGNOSIS_WEIGHTS, DIAGNOSIS_LIST } from './types';
import { calculateSceneScores } from './scene-mapper';

/** multi-int タイプ→Big5マッピング（types.tsから）*/
const MULTI_INT_BIG5: Record<string, Big5Scores> = {
  linguistic:     { O: 80, C: 65, E: 55, A: 60, N: 45 },
  logical:        { O: 75, C: 80, E: 40, A: 50, N: 35 },
  spatial:        { O: 90, C: 55, E: 55, A: 60, N: 40 },
  kinesthetic:    { O: 65, C: 60, E: 75, A: 65, N: 40 },
  musical:        { O: 85, C: 50, E: 60, A: 65, N: 55 },
  interpersonal:  { O: 70, C: 60, E: 85, A: 85, N: 45 },
  intrapersonal:  { O: 80, C: 70, E: 30, A: 55, N: 50 },
  naturalist:     { O: 80, C: 65, E: 40, A: 70, N: 35 },
};

/** perfectionism タイプ→Big5マッピング */
const PERFECTIONISM_BIG5: Record<string, Big5Scores> = {
  thorough:       { O: 60, C: 90, E: 50, A: 40, N: 50 },
  particular:     { O: 55, C: 85, E: 45, A: 50, N: 55 },
  procrastinating:{ O: 50, C: 40, E: 30, A: 55, N: 75 },
  expecting:      { O: 50, C: 70, E: 50, A: 65, N: 70 },
};

/** DiSC タイプ→Big5マッピング */
const DISC_BIG5: Record<string, Big5Scores> = {
  D: { O: 50, C: 70, E: 85, A: 35, N: 40 },
  i: { O: 75, C: 50, E: 90, A: 60, N: 40 },
  S: { O: 45, C: 70, E: 40, A: 85, N: 30 },
  C: { O: 55, C: 90, E: 35, A: 55, N: 50 },
};

/** 恋愛スタイル タイプ→Big5マッピング（研究傾向値） */
const LOVE_STYLE_BIG5: Record<string, Big5Scores> = {
  eros:    { O: 75, C: 60, E: 70, A: 65, N: 40 },
  ludus:   { O: 70, C: 45, E: 80, A: 35, N: 35 },
  storge:  { O: 55, C: 75, E: 50, A: 80, N: 30 },
  pragma:  { O: 55, C: 85, E: 50, A: 60, N: 35 },
  mania:   { O: 60, C: 55, E: 65, A: 55, N: 80 },
  agape:   { O: 70, C: 70, E: 60, A: 90, N: 25 },
};

/** 金銭感覚 タイプ→Big5マッピング */
const MONEY_STYLE_BIG5: Record<string, Big5Scores> = {
  avoidance: { O: 50, C: 40, E: 45, A: 60, N: 75 },
  worship:   { O: 60, C: 55, E: 65, A: 40, N: 55 },
  status:    { O: 65, C: 60, E: 70, A: 45, N: 50 },
  vigilance: { O: 50, C: 85, E: 40, A: 55, N: 45 },
};

/** 友達相性 タイプ→Big5マッピング */
const FRIEND_COMPAT_BIG5: Record<string, Big5Scores> = {
  'mood-maker':    { O: 70, C: 55, E: 90, A: 75, N: 30 },
  'deep-listener': { O: 65, C: 65, E: 35, A: 90, N: 40 },
  'lone-wolf':     { O: 75, C: 70, E: 25, A: 45, N: 45 },
  'leader':        { O: 60, C: 75, E: 80, A: 55, N: 35 },
  'peacemaker':    { O: 55, C: 65, E: 50, A: 85, N: 35 },
  'explorer':      { O: 90, C: 45, E: 70, A: 60, N: 40 },
};

/** 星座 タイプ→Big5マッピング（研究傾向値） */
const ZODIAC_BIG5: Record<string, Big5Scores> = {
  aries:       { O: 65, C: 55, E: 80, A: 45, N: 45 },
  taurus:      { O: 55, C: 80, E: 40, A: 70, N: 40 },
  gemini:      { O: 85, C: 45, E: 85, A: 60, N: 50 },
  cancer:      { O: 60, C: 65, E: 45, A: 80, N: 60 },
  leo:         { O: 70, C: 60, E: 85, A: 55, N: 45 },
  virgo:       { O: 60, C: 90, E: 40, A: 60, N: 55 },
  libra:       { O: 70, C: 60, E: 65, A: 80, N: 45 },
  scorpio:     { O: 70, C: 70, E: 45, A: 50, N: 65 },
  sagittarius: { O: 85, C: 45, E: 80, A: 55, N: 35 },
  capricorn:   { O: 50, C: 85, E: 40, A: 55, N: 45 },
  aquarius:    { O: 90, C: 50, E: 60, A: 55, N: 40 },
  pisces:      { O: 80, C: 45, E: 50, A: 80, N: 65 },
};

/** 血液型 タイプ→Big5マッピング（研究傾向値） */
const BLOOD_TYPE_BIG5: Record<string, Big5Scores> = {
  A:  { O: 55, C: 80, E: 45, A: 70, N: 55 },
  B:  { O: 75, C: 50, E: 75, A: 45, N: 45 },
  O:  { O: 65, C: 65, E: 70, A: 65, N: 40 },
  AB: { O: 75, C: 65, E: 55, A: 60, N: 55 },
};

/** dominant trait ラベル（Big5高スコアから） */
function getDominantTrait(big5: Big5Scores): string {
  const traits: [keyof Big5Scores, string][] = [
    ['O', '創造性と好奇心'],
    ['C', '誠実さと計画力'],
    ['E', '社交性と行動力'],
    ['A', '協調性と思いやり'],
    ['N', '感受性と細やかさ'],
  ];
  const sorted = [...traits].sort((a, b) => big5[b[0]] - big5[a[0]]);
  return sorted[0][1];
}

/**
 * LocalStorage から全診断の結果を取得する
 * 返すのは各診断IDをキーとした Record。見つからない場合は null。
 *
 * 注意: この関数はブラウザ環境でのみ呼び出すこと（SSR禁止）
 */
export function loadAllDiagnosisResults(): Record<string, DiagnosisResultEntry | null> {
  if (typeof window === 'undefined') {
    return Object.fromEntries(DIAGNOSIS_LIST.map((d) => [d.id, null]));
  }

  const results: Record<string, DiagnosisResultEntry | null> = {};

  // multi-int
  try {
    const raw = localStorage.getItem('sn_scores_multi-int');
    if (raw) {
      const data = JSON.parse(raw);
      if (data.dominantType && MULTI_INT_BIG5[data.dominantType]) {
        results['multi-int'] = {
          typeId: data.dominantType,
          savedAt: data.savedAt || new Date().toISOString(),
          big5: MULTI_INT_BIG5[data.dominantType],
        };
      } else {
        results['multi-int'] = null;
      }
    } else {
      results['multi-int'] = null;
    }
  } catch { results['multi-int'] = null; }

  // perfectionism
  try {
    const raw = localStorage.getItem('sn_scores_perfectionism');
    if (raw) {
      const data = JSON.parse(raw);
      const typeId = data.type || data.typeId;
      if (typeId && PERFECTIONISM_BIG5[typeId]) {
        results['perfectionism'] = {
          typeId,
          savedAt: data.savedAt || new Date().toISOString(),
          big5: PERFECTIONISM_BIG5[typeId],
        };
      } else {
        results['perfectionism'] = null;
      }
    } else {
      results['perfectionism'] = null;
    }
  } catch { results['perfectionism'] = null; }

  // disc
  try {
    const raw = localStorage.getItem('sn_scores_disc');
    if (raw) {
      const data = JSON.parse(raw);
      const typeId = data.type || data.dominantType || data.typeId;
      if (typeId && DISC_BIG5[typeId]) {
        results['disc'] = {
          typeId,
          savedAt: data.savedAt || new Date().toISOString(),
          big5: DISC_BIG5[typeId],
        };
      } else {
        results['disc'] = null;
      }
    } else {
      results['disc'] = null;
    }
  } catch { results['disc'] = null; }

  // love_style
  try {
    const raw = localStorage.getItem('sn_scores_love_style');
    if (raw) {
      const data = JSON.parse(raw);
      const typeId = data.dominantStyle || data.type || data.typeId;
      if (typeId && LOVE_STYLE_BIG5[typeId]) {
        results['love_style'] = {
          typeId,
          savedAt: data.savedAt || new Date().toISOString(),
          big5: LOVE_STYLE_BIG5[typeId],
        };
      } else {
        results['love_style'] = null;
      }
    } else {
      results['love_style'] = null;
    }
  } catch { results['love_style'] = null; }

  // money_style
  try {
    const raw = localStorage.getItem('sn_scores_money_style');
    if (raw) {
      const data = JSON.parse(raw);
      const typeId = data.dominantType || data.type || data.typeId;
      if (typeId && MONEY_STYLE_BIG5[typeId]) {
        results['money_style'] = {
          typeId,
          savedAt: data.savedAt || new Date().toISOString(),
          big5: MONEY_STYLE_BIG5[typeId],
        };
      } else {
        results['money_style'] = null;
      }
    } else {
      results['money_style'] = null;
    }
  } catch { results['money_style'] = null; }

  // friend_compat
  try {
    const raw = localStorage.getItem('sn_scores_friend_compat');
    if (raw) {
      const data = JSON.parse(raw);
      const typeId = data.friendType || data.type || data.typeId;
      if (typeId && FRIEND_COMPAT_BIG5[typeId]) {
        results['friend_compat'] = {
          typeId,
          savedAt: data.savedAt || new Date().toISOString(),
          big5: FRIEND_COMPAT_BIG5[typeId],
        };
      } else {
        results['friend_compat'] = null;
      }
    } else {
      results['friend_compat'] = null;
    }
  } catch { results['friend_compat'] = null; }

  // zodiac （誕生日キー形式: zodiac_result_{year}-{month}-{day}）
  try {
    let zodiacFound = false;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('zodiac_result_')) {
        const raw = localStorage.getItem(key);
        if (raw) {
          const item = JSON.parse(raw);
          const data = item.value || item;
          const typeId = data.zodiacType || data.sign || data.type;
          if (typeId && ZODIAC_BIG5[typeId]) {
            results['zodiac'] = {
              typeId,
              savedAt: data.savedAt || new Date().toISOString(),
              big5: ZODIAC_BIG5[typeId],
            };
            zodiacFound = true;
            break;
          }
        }
      }
    }
    if (!zodiacFound) results['zodiac'] = null;
  } catch { results['zodiac'] = null; }

  // blood_compat （血液型: sn_blood_type または blood_compat選択から）
  try {
    // 血液型はユーザーが選択するだけでLocalStorageに個別保存しない診断
    // /diagnosis/blood/ 完了後に選択タイプを保存するキーを確認
    const raw = localStorage.getItem('sn_blood_type') || localStorage.getItem('sn_scores_blood_compat');
    if (raw) {
      let typeId: string | null = null;
      try {
        const parsed = JSON.parse(raw);
        typeId = parsed.type || parsed.bloodType || parsed.typeId;
      } catch {
        // JSONでない場合は直接文字列として使用
        typeId = raw.replace(/"/g, '');
      }
      if (typeId && BLOOD_TYPE_BIG5[typeId]) {
        results['blood_compat'] = {
          typeId,
          savedAt: new Date().toISOString(),
          big5: BLOOD_TYPE_BIG5[typeId],
        };
      } else {
        results['blood_compat'] = null;
      }
    } else {
      results['blood_compat'] = null;
    }
  } catch { results['blood_compat'] = null; }

  return results;
}

/**
 * 加重平均 Big5スコアを計算する
 */
export function aggregateBig5(results: Record<string, DiagnosisResultEntry | null>): Big5Scores {
  let totalWeight = 0;
  const sums = { O: 0, C: 0, E: 0, A: 0, N: 0 };

  for (const [diagId, entry] of Object.entries(results)) {
    if (!entry) continue;
    const weight = DIAGNOSIS_WEIGHTS[diagId] ?? 1.0;
    totalWeight += weight;
    sums.O += entry.big5.O * weight;
    sums.C += entry.big5.C * weight;
    sums.E += entry.big5.E * weight;
    sums.A += entry.big5.A * weight;
    sums.N += entry.big5.N * weight;
  }

  if (totalWeight === 0) {
    // 診断ゼロの場合はデフォルト値（全50）
    return { O: 50, C: 50, E: 50, A: 50, N: 50 };
  }

  return {
    O: Math.round(sums.O / totalWeight),
    C: Math.round(sums.C / totalWeight),
    E: Math.round(sums.E / totalWeight),
    A: Math.round(sums.A / totalWeight),
    N: Math.round(sums.N / totalWeight),
  };
}

/**
 * 統合プロファイルを生成する（メインエントリポイント）
 *
 * @returns IntegratedProfile
 */
export function generateIntegratedProfile(): IntegratedProfile {
  const diagnosisResults = loadAllDiagnosisResults();
  const completedDiagnoses = Object.entries(diagnosisResults)
    .filter(([, v]) => v !== null)
    .map(([k]) => k);

  const completedCount = completedDiagnoses.length;
  const completionRate = Math.round((completedCount / 8) * 100);

  const aggregatedBig5 = aggregateBig5(diagnosisResults);
  const sceneScores = calculateSceneScores(aggregatedBig5, diagnosisResults);
  const dominantTrait = getDominantTrait(aggregatedBig5);

  return {
    completedDiagnoses,
    completedCount,
    completionRate,
    aggregatedBig5,
    sceneScores,
    dominantTrait,
    diagnosisResults,
  };
}
