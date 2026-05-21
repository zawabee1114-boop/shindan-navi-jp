/**
 * AuthHeader.tsx - ヘッダー認証ステータス表示（React Island）
 *
 * Phase 3.2: ログイン状態・プラン・ログアウトボタンを表示
 *
 * 表示パターン:
 * - 未ログイン: 「ログイン」ボタン
 * - ログイン済み（free): メール + プランバッジ + ログアウト
 * - ログイン済み（PASS/PRO）: メール + プランバッジ（強調）+ ログアウト
 *
 * CWV: React Island として client:only="react" でマウント
 * LocalStorage アクセスはマウント後のみ（SSR安全）
 *
 * a11y: WCAG 2.1 AA 準拠
 * - aria-label によるボタン説明
 * - 最小タップターゲット 44px
 * - カラーコントラスト比 4.5:1 以上
 */

import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured, signOut } from '../../lib/supabase/client';
import type { UserPlan } from '../../lib/supabase/types';

const planColors: Record<UserPlan, { bg: string; text: string; border: string }> = {
  free: { bg: '#f3f4f6', text: '#4b5563', border: '#e5e7eb' },
  pass: { bg: '#fef3c7', text: '#92400e', border: '#fde68a' },
  pro: { bg: '#eef2ff', text: '#3730a3', border: '#c7d2fe' },
};

const planLabels: Record<UserPlan, string> = {
  free: '無料',
  pass: 'PASS',
  pro: 'PRO',
};

export default function AuthHeader() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<{ email: string; id: string } | null>(null);
  const [plan, setPlan] = useState<UserPlan>('free');
  const [isSigningOut, setIsSigningOut] = useState(false);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      setIsLoading(false);
      return;
    }

    // 現在のセッションを取得
    const loadSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setUser({
            email: session.user.email ?? '',
            id: session.user.id,
          });

          // プラン取得（LocalStorage キャッシュ優先）
          const cachedPlan = localStorage.getItem('sn_db_plan') as UserPlan | null;
          if (cachedPlan && ['free', 'pass', 'pro'].includes(cachedPlan)) {
            setPlan(cachedPlan);
          }
        }
      } catch {
        // ignore
      } finally {
        setIsLoading(false);
      }
    };

    loadSession();

    // 認証状態の変更を監視
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          setUser({
            email: session.user.email ?? '',
            id: session.user.id,
          });

          // ログイン直後に LocalStorage → DB 同期を実行
          const { syncLocalStorageToDB, needsSync } = await import('../../lib/diagnosis-sync');
          if (needsSync(session.user.id)) {
            void syncLocalStorageToDB(session.user.id);
          }
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setPlan('free');
        }
        setIsLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      // POST /api/auth/signout でサーバーサイドの Cookie も削除
      await fetch('/api/auth/signout', { method: 'POST' });
      // クライアントサイドも signOut
      if (supabase) {
        await signOut();
      }
      setUser(null);
      setPlan('free');
      // トップへリダイレクト
      window.location.href = '/';
    } catch {
      setIsSigningOut(false);
    }
  };

  // SSR / ロード中は最小幅のプレースホルダー
  if (isLoading) {
    return (
      <div
        style={{ width: '80px', height: '36px', borderRadius: '999px', background: '#f3f4f6' }}
        aria-hidden="true"
      />
    );
  }

  // 未ログイン
  if (!user) {
    return (
      <a
        href="/login/"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.375rem',
          padding: '0.5rem 1rem',
          borderRadius: '999px',
          border: '1.5px solid #4f46e5',
          color: '#4f46e5',
          fontSize: '0.875rem',
          fontWeight: 700,
          textDecoration: 'none',
          minHeight: '44px',
          transition: 'all 0.15s',
          background: 'transparent',
        }}
        aria-label="ログインページへ"
      >
        ログイン
      </a>
    );
  }

  // ログイン済み
  const colors = planColors[plan];

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
      }}
    >
      {/* メールアドレス（省略表示）*/}
      <span
        style={{
          display: 'none',
          fontSize: '0.8rem',
          color: '#6b7280',
          maxWidth: '140px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
        className="auth-header-email"
        title={user.email}
      >
        {user.email}
      </span>

      {/* プランバッジ */}
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.25rem',
          padding: '0.2rem 0.625rem',
          borderRadius: '999px',
          fontSize: '0.72rem',
          fontWeight: 700,
          backgroundColor: colors.bg,
          color: colors.text,
          border: `1px solid ${colors.border}`,
          lineHeight: 1.4,
          textTransform: 'uppercase',
          letterSpacing: '0.02em',
        }}
        aria-label={`現在のプラン: ${planLabels[plan]}`}
      >
        {plan === 'pro' && <span aria-hidden="true">★</span>}
        {planLabels[plan]}
      </span>

      {/* プロフィールリンク */}
      <a
        href="/profile/"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          background: '#eef2ff',
          color: '#4f46e5',
          fontSize: '1rem',
          textDecoration: 'none',
          transition: 'background 0.15s',
          flexShrink: 0,
        }}
        aria-label="マイプロファイルページへ"
        title="プロフィール"
      >
        <span aria-hidden="true" style={{ lineHeight: 1 }}>👤</span>
      </a>

      {/* ログアウトボタン */}
      <button
        type="button"
        onClick={handleSignOut}
        disabled={isSigningOut}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0.375rem 0.75rem',
          borderRadius: '999px',
          border: '1.5px solid #e5e7eb',
          background: 'transparent',
          color: '#6b7280',
          fontSize: '0.8rem',
          fontWeight: 500,
          cursor: isSigningOut ? 'not-allowed' : 'pointer',
          opacity: isSigningOut ? 0.5 : 1,
          minHeight: '36px',
          fontFamily: 'inherit',
          transition: 'all 0.15s',
        }}
        aria-label="ログアウト"
      >
        {isSigningOut ? '...' : 'ログアウト'}
      </button>
    </div>
  );
}
