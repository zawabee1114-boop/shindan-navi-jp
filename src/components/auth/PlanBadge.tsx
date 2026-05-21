/**
 * PlanBadge.tsx - プランバッジ表示（React Island）
 *
 * ユーザーの現在プランをバッジで表示する。
 * LocalStorage のプラン情報を参照（Phase 3.2 以降は Supabase）。
 */

import { useState, useEffect } from 'react';
import { getLocalPlan, planLabels, type UserPlan } from '../../lib/plan-check';

interface PlanBadgeProps {
  /** 初期プラン（SSR用）*/
  initialPlan?: UserPlan;
  /** サイズ */
  size?: 'sm' | 'md';
}

const planColors: Record<UserPlan, { bg: string; text: string }> = {
  free: { bg: '#f3f4f6', text: '#4b5563' },
  pass: { bg: '#fef3c7', text: '#92400e' },
  pro: { bg: '#eef2ff', text: '#3730a3' },
};

export default function PlanBadge({ initialPlan = 'free', size = 'md' }: PlanBadgeProps) {
  const [plan, setPlan] = useState<UserPlan>(initialPlan);

  useEffect(() => {
    // クライアントサイドで LocalStorage から取得
    setPlan(getLocalPlan());
  }, []);

  const colors = planColors[plan];
  const label = planLabels[plan];

  const styles = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.25rem',
    padding: size === 'sm' ? '0.1rem 0.5rem' : '0.25rem 0.75rem',
    borderRadius: '999px',
    fontSize: size === 'sm' ? '0.7rem' : '0.8rem',
    fontWeight: 700,
    backgroundColor: colors.bg,
    color: colors.text,
    border: `1px solid ${colors.text}22`,
    lineHeight: 1.4,
  };

  return (
    <span style={styles} aria-label={`現在のプラン: ${label}`}>
      {plan === 'pro' && <span aria-hidden="true">★</span>}
      {plan === 'pass' && <span aria-hidden="true">🎟</span>}
      {label}
    </span>
  );
}
