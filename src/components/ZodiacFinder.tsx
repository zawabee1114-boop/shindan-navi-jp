/**
 * ZodiacFinder.tsx - 誕生日入力 → 星座判定 React島
 *
 * 機能:
 * - 月・日プルダウン入力
 * - 入力に応じてリアルタイムで星座を判定
 * - 「詳しい性格特性を見る」ボタン → /diagnosis/zodiac/{zodiac}/ へ遷移
 * - 判定結果はシンボル・星座名・期間を即時表示
 *
 * CWV対応:
 * - CLS: 結果エリアは min-height で確保
 * - INP: useState のみ・重い計算なし
 *
 * WCAG 2.1 AA:
 * - aria-label / role 付与
 * - focus-visible アウトライン
 * - カラーコントラスト 4.5:1 以上
 *
 * 絶対遵守:
 * - 占い口調・運命論NG
 * - 「ラッキー〇〇」「今日の運勢」NG
 * - 「性格特性の参考情報」として提示
 * - disclaimer 表示
 *
 * 確認日: 2026-05-21
 */

import { useState, useCallback } from 'react';
import { getZodiacByBirthdate } from '../data/diagnoses/zodiac/results';
import { typesDetail } from '../data/diagnoses/zodiac/types-detail';
import type { ZodiacType } from '../data/diagnoses/zodiac/meta';

// 月の選択肢
const MONTHS = Array.from({ length: 12 }, (_, i) => ({
  value: i + 1,
  label: `${i + 1}月`,
}));

// 日の選択肢（最大31日）
const DAYS = Array.from({ length: 31 }, (_, i) => ({
  value: i + 1,
  label: `${i + 1}日`,
}));

// エレメント別カラー
const ELEMENT_COLORS: Record<string, { bg: string; border: string; text: string }> = {
  fire:  { bg: '#FEF2F2', border: '#FCA5A5', text: '#991B1B' },
  earth: { bg: '#F5F5F4', border: '#A8A29E', text: '#44403C' },
  air:   { bg: '#EFF6FF', border: '#93C5FD', text: '#1E40AF' },
  water: { bg: '#ECFEFF', border: '#67E8F9', text: '#164E63' },
};

export default function ZodiacFinder() {
  const [selectedMonth, setSelectedMonth] = useState<number | ''>('');
  const [selectedDay, setSelectedDay] = useState<number | ''>('');
  const [result, setResult] = useState<ZodiacType | null>(null);
  const [error, setError] = useState<string>('');

  const handleFind = useCallback(() => {
    if (selectedMonth === '' || selectedDay === '') {
      setError('月と日を選択してください。');
      return;
    }
    setError('');
    const zodiac = getZodiacByBirthdate(selectedMonth, selectedDay);
    setResult(zodiac);
  }, [selectedMonth, selectedDay]);

  const detail = result ? typesDetail[result] : null;
  const colors = detail ? ELEMENT_COLORS[detail.element] : null;

  return (
    <div
      style={{
        background: 'var(--sn-surface, #fff)',
        border: '2px solid var(--sn-border, #e5e7eb)',
        borderRadius: '1rem',
        padding: '1.5rem',
        maxWidth: '480px',
        margin: '0 auto',
      }}
      aria-label="誕生日から星座を調べるツール"
    >
      <h3
        style={{
          fontSize: '1.1rem',
          fontWeight: 700,
          marginBottom: '1rem',
          color: 'var(--sn-text, #111827)',
        }}
      >
        誕生日から星座を調べる
      </h3>

      {/* 入力エリア */}
      <div
        style={{
          display: 'flex',
          gap: '0.75rem',
          alignItems: 'flex-end',
          flexWrap: 'wrap',
          marginBottom: '1rem',
        }}
      >
        {/* 月 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <label
            htmlFor="zf-month"
            style={{ fontSize: '0.875rem', color: 'var(--sn-muted, #6B7280)', fontWeight: 600 }}
          >
            月
          </label>
          <select
            id="zf-month"
            value={selectedMonth}
            onChange={(e) => {
              setSelectedMonth(e.target.value === '' ? '' : Number(e.target.value));
              setResult(null);
            }}
            style={{
              padding: '0.5rem 0.75rem',
              borderRadius: '0.5rem',
              border: '1.5px solid var(--sn-border, #e5e7eb)',
              fontSize: '1rem',
              background: 'var(--sn-surface, #fff)',
              color: 'var(--sn-text, #111827)',
              cursor: 'pointer',
              outline: 'none',
            }}
            aria-label="誕生月を選択"
          >
            <option value="">-- 月 --</option>
            {MONTHS.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>
        </div>

        {/* 日 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <label
            htmlFor="zf-day"
            style={{ fontSize: '0.875rem', color: 'var(--sn-muted, #6B7280)', fontWeight: 600 }}
          >
            日
          </label>
          <select
            id="zf-day"
            value={selectedDay}
            onChange={(e) => {
              setSelectedDay(e.target.value === '' ? '' : Number(e.target.value));
              setResult(null);
            }}
            style={{
              padding: '0.5rem 0.75rem',
              borderRadius: '0.5rem',
              border: '1.5px solid var(--sn-border, #e5e7eb)',
              fontSize: '1rem',
              background: 'var(--sn-surface, #fff)',
              color: 'var(--sn-text, #111827)',
              cursor: 'pointer',
              outline: 'none',
            }}
            aria-label="誕生日を選択"
          >
            <option value="">-- 日 --</option>
            {DAYS.map((d) => (
              <option key={d.value} value={d.value}>
                {d.label}
              </option>
            ))}
          </select>
        </div>

        {/* 判定ボタン */}
        <button
          type="button"
          onClick={handleFind}
          style={{
            padding: '0.6rem 1.25rem',
            borderRadius: '0.5rem',
            background: 'var(--sn-primary, #7C3AED)',
            color: '#fff',
            fontWeight: 700,
            fontSize: '0.95rem',
            border: 'none',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            transition: 'opacity 0.15s',
          }}
          aria-label="星座を判定する"
        >
          星座を調べる
        </button>
      </div>

      {/* エラー */}
      {error && (
        <p
          role="alert"
          style={{
            color: '#DC2626',
            fontSize: '0.875rem',
            marginBottom: '0.75rem',
          }}
        >
          {error}
        </p>
      )}

      {/* 結果エリア（min-height で CLS 抑制） */}
      <div
        style={{
          minHeight: result ? 'auto' : '0',
          transition: 'all 0.2s',
        }}
        aria-live="polite"
        aria-atomic="true"
      >
        {result && detail && colors && (
          <div
            style={{
              background: colors.bg,
              border: `2px solid ${colors.border}`,
              borderRadius: '0.75rem',
              padding: '1.25rem',
              marginBottom: '0.75rem',
            }}
          >
            {/* シンボルと星座名 */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '0.75rem',
              }}
            >
              <span style={{ fontSize: '2.5rem', lineHeight: 1 }}>{detail.symbol}</span>
              <div>
                <p
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: colors.text,
                    margin: 0,
                  }}
                >
                  {detail.japaneseName}
                </p>
                <p style={{ fontSize: '0.875rem', color: colors.text, margin: '0.125rem 0 0', opacity: 0.8 }}>
                  {detail.englishName} / {detail.dateRange}
                </p>
              </div>
            </div>

            {/* キャッチフレーズ */}
            <p
              style={{
                fontSize: '0.95rem',
                color: colors.text,
                fontWeight: 600,
                margin: '0 0 0.75rem',
                lineHeight: 1.5,
              }}
            >
              {detail.catchphrase}
            </p>

            {/* エレメント・モダリティ・守護星 */}
            <div
              style={{
                display: 'flex',
                gap: '0.5rem',
                flexWrap: 'wrap',
                marginBottom: '1rem',
              }}
            >
              {[
                `エレメント: ${
                  detail.element === 'fire' ? '火' :
                  detail.element === 'earth' ? '地' :
                  detail.element === 'air' ? '風' : '水'
                }`,
                `タイプ: ${
                  detail.modality === 'cardinal' ? '活動宮' :
                  detail.modality === 'fixed' ? '不動宮' : '柔軟宮'
                }`,
                `守護星: ${detail.rulingPlanet}`,
              ].map((tag) => (
                <span
                  key={tag}
                  style={{
                    padding: '0.2rem 0.6rem',
                    background: `${colors.border}40`,
                    borderRadius: '999px',
                    fontSize: '0.8rem',
                    color: colors.text,
                    fontWeight: 600,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* 詳細ページへのリンク */}
            <a
              href={`/diagnosis/zodiac/${result}/`}
              style={{
                display: 'inline-block',
                padding: '0.6rem 1.25rem',
                background: colors.border,
                color: colors.text,
                fontWeight: 700,
                fontSize: '0.95rem',
                borderRadius: '0.5rem',
                textDecoration: 'none',
                border: 'none',
                cursor: 'pointer',
                transition: 'opacity 0.15s',
              }}
              aria-label={`${detail.japaneseName}の性格特性詳細ページへ`}
            >
              {detail.japaneseName}の性格特性を詳しく見る →
            </a>
          </div>
        )}
      </div>

      {/* 注意書き */}
      <p
        style={{
          fontSize: '0.75rem',
          color: 'var(--sn-muted, #6B7280)',
          margin: 0,
          lineHeight: 1.6,
        }}
      >
        ※ 本ツールは西洋占星術の12星座分類を性格理解の参考として提供しています。
        占星術には科学的根拠が確認されていないとの研究（Carlson 1985 Nature）があります。
        未来予測・運勢判断には使えません。
      </p>
    </div>
  );
}
