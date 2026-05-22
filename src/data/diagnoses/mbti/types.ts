/**
 * MBTI主診断 タイプ定義（薄いラッパー）
 *
 * 16タイプ詳細データは mbti-compat/types-detail.ts が正。
 * 重複作成しない。このファイルは re-export + 主診断用の軽い変換のみ。
 *
 * 確認日: 2026-05-22
 */

// mbti-compat/types-detail.ts を re-export
export {
  typesDetail,
  getTypeDetail,
  typeNameMap,
  type MBTITypeDetail,
  type FunctionStack,
  type Big5Profile,
} from '../mbti-compat/types-detail';

export type { MBTIType } from '../mbti-compat/meta';

// MBTI主診断用: 4気質グループ定義
export type TemperamentId = 'NT' | 'NF' | 'SJ' | 'SP';

export const temperamentLabels: Record<TemperamentId, { name: string; desc: string; color: string }> = {
  NT: {
    name: '合理主義者（NT）',
    desc: '論理・戦略・知識を重視するグループ',
    color: '#6c47ff',
  },
  NF: {
    name: '理想主義者（NF）',
    desc: '共感・意味・人間の可能性を重視するグループ',
    color: '#e85d9b',
  },
  SJ: {
    name: '保護者（SJ）',
    desc: '責任・伝統・安定・組織を重視するグループ',
    color: '#0ea5e9',
  },
  SP: {
    name: '職人（SP）',
    desc: '行動・自由・現在の瞬間・実践を重視するグループ',
    color: '#f59e0b',
  },
};

// 16タイプの気質グループ分類（MBTI主診断一覧グリッド用）
export const typesByTemperament: Record<TemperamentId, string[]> = {
  NT: ['INTJ', 'INTP', 'ENTJ', 'ENTP'],
  NF: ['INFJ', 'INFP', 'ENFJ', 'ENFP'],
  SJ: ['ISTJ', 'ISFJ', 'ESTJ', 'ESFJ'],
  SP: ['ISTP', 'ISFP', 'ESTP', 'ESFP'],
};

// タイプ絵文字（結果ページ表示用）
export const typeEmojis: Record<string, string> = {
  INTJ: '🔭',
  INTP: '🔬',
  ENTJ: '⚡',
  ENTP: '💡',
  INFJ: '🌙',
  INFP: '🌸',
  ENFJ: '🌟',
  ENFP: '🎆',
  ISTJ: '🏛️',
  ISFJ: '🌿',
  ESTJ: '🏗️',
  ESFJ: '🤝',
  ISTP: '🔧',
  ISFP: '🎨',
  ESTP: '⚡',
  ESFP: '🎭',
};
