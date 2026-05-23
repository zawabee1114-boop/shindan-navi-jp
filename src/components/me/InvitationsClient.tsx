/**
 * InvitationsClient.tsx - 招待ダッシュボード React Island
 *
 * Phase 3.5 静的化リファクタ（fix/invitations-static）:
 * - SSR 版 /me/invitations/index.astro が prerender=false のため本番404
 * - クライアントサイドで Supabase PUBLIC_ANON_KEY を使い認証 + DB 取得
 *
 * 表示パターン:
 *   - Supabase 未設定: 設定エラー表示
 *   - 未ログイン: ログイン CTA
 *   - ロード中: スケルトン UI
 *   - ログイン済み: active / used / expired 3 ステータス表示
 *   - PRO 会員: 相性詳細スコア表示
 *   - 無料/PASS: スコアぼかし + PRO アップグレード CTA
 *
 * CWV: client:load でマウント（個人データのため必須）
 * a11y: WCAG 2.1 AA 準拠（aria-label / role / aria-live 使用）
 * noindex: Astro 側で設定済み（個人データページ）
 */

import { useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../../lib/supabase/client';
import type { UserPlan } from '../../lib/supabase/types';

// ===== 型定義 =====

interface InvitationRow {
  id: string;
  invite_code: string;
  mode: string;
  expires_at: string;
  accepted_at: string | null;
  created_at: string;
  compatibility_result: Record<string, unknown> | null;
}

interface CompatScores {
  overall: number;
  love: number;
  work: number;
  friend: number;
  family: number;
  school: number;
}

interface EnrichedInvitation extends InvitationRow {
  status: 'used' | 'active' | 'expired';
  overallScore: number | null;
  compatScores: CompatScores | null;
  modeBg: string;
  modeLabel: string;
  modeIcon: string;
  formattedAcceptedAt: string;
  formattedCreatedAt: string;
  formattedExpiresAt: string;
  inviteUrl: string;
}

// ===== 定数 =====

const SCENE_AXES = ['love', 'work', 'friend', 'family', 'school'] as const;
type SceneAxis = (typeof SCENE_AXES)[number];

const MODE_LABELS: Record<string, string> = {
  secret: 'こっそり',
  invite: '招待',
  one_way: '片方向',
  full_share: '完全共有',
};
const MODE_ICONS: Record<string, string> = {
  secret: '🔮',
  invite: '👋',
  one_way: '👁️',
  full_share: '🤝',
};
const MODE_COLORS: Record<string, string> = {
  secret: '#6b7280',
  invite: '#6366f1',
  one_way: '#3b82f6',
  full_share: '#10b981',
};
const AXIS_LABELS: Record<SceneAxis, string> = {
  love: '恋愛',
  work: '仕事',
  friend: '友人',
  family: '家族',
  school: '学校',
};

// ===== ユーティリティ =====

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}`;
}

function enrichInvitation(inv: InvitationRow): EnrichedInvitation {
  const now = new Date();
  const status: 'used' | 'active' | 'expired' = inv.accepted_at
    ? 'used'
    : new Date(inv.expires_at) < now
    ? 'expired'
    : 'active';

  const rawResult = inv.compatibility_result;
  let overallScore: number | null = null;
  let compatScores: CompatScores | null = null;

  if (rawResult && typeof rawResult === 'object') {
    const r = rawResult as Record<string, unknown>;
    if (typeof r.overall === 'number') {
      overallScore = r.overall;
      compatScores = {
        overall: r.overall,
        love: typeof r.love === 'number' ? r.love : 0,
        work: typeof r.work === 'number' ? r.work : 0,
        friend: typeof r.friend === 'number' ? r.friend : 0,
        family: typeof r.family === 'number' ? r.family : 0,
        school: typeof r.school === 'number' ? r.school : 0,
      };
    }
  }

  return {
    ...inv,
    status,
    overallScore,
    compatScores,
    modeBg: MODE_COLORS[inv.mode] ?? '#6b7280',
    modeLabel: MODE_LABELS[inv.mode] ?? inv.mode,
    modeIcon: MODE_ICONS[inv.mode] ?? '🤝',
    formattedAcceptedAt: inv.accepted_at ? formatDate(inv.accepted_at) : '—',
    formattedCreatedAt: formatDate(inv.created_at),
    formattedExpiresAt: formatDate(inv.expires_at),
    inviteUrl: `https://shindan-navi.jp/i/${inv.invite_code}/`,
  };
}

// ===== サブコンポーネント =====

function SkeletonLoader() {
  return (
    <div className="inv-skeleton" aria-busy="true" aria-label="読み込み中">
      <div className="inv-skeleton-stat" />
      <div className="inv-skeleton-stat" />
      <div className="inv-skeleton-stat" />
      <div className="inv-skeleton-item" />
      <div className="inv-skeleton-item" />
    </div>
  );
}

interface CompatResultProps {
  inv: EnrichedInvitation;
  isPro: boolean;
}
function CompatResult({ inv, isPro }: CompatResultProps) {
  if (inv.overallScore === null) {
    return <p className="inv-no-score">スコア算出中</p>;
  }
  if (isPro) {
    return (
      <div className="inv-compat-result">
        <div className="inv-compat-score" aria-label={`相性スコア ${inv.overallScore}点`}>
          <span className="inv-compat-num">{inv.overallScore}</span>
          <span className="inv-compat-unit">点</span>
        </div>
        {inv.compatScores && (
          <div className="inv-compat-breakdown">
            {SCENE_AXES.map((axis) => (
              <div key={axis} className="inv-compat-axis">
                <span className="inv-compat-axis-label">{AXIS_LABELS[axis]}</span>
                <div className="inv-compat-bar-bg">
                  <div
                    className="inv-compat-bar-fill"
                    style={{ width: `${inv.compatScores![axis]}%` }}
                  />
                </div>
                <span className="inv-compat-axis-score">{inv.compatScores![axis]}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
  return (
    <div className="inv-compat-blur-wrapper" aria-label="相性スコア（詳細はPROで表示）">
      <div className="inv-compat-score inv-compat-score--blurred">
        <span className="inv-compat-num">{inv.overallScore}</span>
        <span className="inv-compat-unit">点</span>
      </div>
      <a
        href="/pro/?ref=compat-dashboard"
        className="inv-pro-unlock-btn"
        aria-label="PROで詳細を見る"
      >
        PROで詳細を見る
      </a>
    </div>
  );
}

interface CopyButtonProps {
  url: string;
}
function CopyButton({ url }: CopyButtonProps) {
  const [label, setLabel] = useState('URLコピー');
  const [disabled, setDisabled] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setLabel('コピーしました');
      setDisabled(true);
      setTimeout(() => {
        setLabel('URLコピー');
        setDisabled(false);
      }, 2000);
    } catch {
      prompt('URLをコピーしてください:', url);
    }
  };

  return (
    <button
      className="inv-action-btn inv-action-btn--copy"
      type="button"
      onClick={handleCopy}
      disabled={disabled}
      aria-label="招待URLをコピー"
    >
      {label}
    </button>
  );
}

interface CancelButtonProps {
  id: string;
  onCancel: (id: string) => void;
}
function CancelButton({ id, onCancel }: CancelButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleCancel = async () => {
    if (!confirm('この招待を取り消しますか？')) return;
    setLoading(true);
    try {
      const res = await fetch('/api/invitation/cancel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ invitation_id: id }),
      });
      const data: { ok: boolean } = await res.json();
      if (data.ok) {
        onCancel(id);
      } else {
        alert('取り消しに失敗しました。再度お試しください。');
        setLoading(false);
      }
    } catch {
      alert('通信エラーが発生しました。');
      setLoading(false);
    }
  };

  return (
    <button
      className="inv-action-btn inv-action-btn--cancel"
      type="button"
      onClick={handleCancel}
      disabled={loading}
      aria-label="この招待を取り消す"
    >
      {loading ? '処理中...' : '取り消す'}
    </button>
  );
}

// ===== メインコンポーネント =====

export default function InvitationsClient() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [plan, setPlan] = useState<UserPlan>('free');
  const [invitations, setInvitations] = useState<EnrichedInvitation[]>([]);
  const [dbError, setDbError] = useState(false);
  const [expiredOpen, setExpiredOpen] = useState(false);

  const isPro = plan === 'pro';

  // キャンセル後にリストから除去
  const handleCancel = useCallback((id: string) => {
    setInvitations((prev) =>
      prev.map((inv) =>
        inv.id === id ? { ...inv, status: 'expired' as const } : inv
      )
    );
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      setIsLoading(false);
      return;
    }

    const loadData = async () => {
      try {
        const {
          data: { session },
        } = await supabase!.auth.getSession();

        if (!session?.user) {
          setIsLoggedIn(false);
          setIsLoading(false);
          return;
        }

        setIsLoggedIn(true);

        // プラン取得（LocalStorage キャッシュ優先）
        const cachedPlan = localStorage.getItem('sn_db_plan') as UserPlan | null;
        if (cachedPlan && ['free', 'pass', 'pro'].includes(cachedPlan)) {
          setPlan(cachedPlan);
        } else {
          // DB から取得
          const { data: userData } = await supabase!
            .from('users')
            .select('plan')
            .eq('id', session.user.id)
            .single();
          if (userData?.plan) {
            setPlan(userData.plan as UserPlan);
          }
        }

        // 招待一覧取得
        const { data, error } = await supabase!
          .from('invitations')
          .select(
            'id, invite_code, mode, expires_at, accepted_at, created_at, compatibility_result'
          )
          .eq('inviter_id', session.user.id)
          .order('created_at', { ascending: false })
          .limit(50);

        if (error) {
          console.error('[InvitationsClient] DB エラー:', error.message);
          setDbError(true);
        } else {
          const enriched = ((data as InvitationRow[]) ?? []).map(enrichInvitation);
          setInvitations(enriched);
        }
      } catch (err) {
        console.error('[InvitationsClient] 接続エラー:', err);
        setDbError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // ===== ロード中 =====
  if (isLoading) {
    return <SkeletonLoader />;
  }

  // ===== Supabase 未設定 =====
  if (!isSupabaseConfigured) {
    return (
      <div className="inv-alert inv-alert--error" role="alert">
        <span aria-hidden="true">⚠️</span>
        Supabase が未設定です。管理者にお問い合わせください。
      </div>
    );
  }

  // ===== 未ログイン =====
  if (!isLoggedIn) {
    return (
      <div className="inv-alert" role="status">
        <span aria-hidden="true">ℹ️</span>
        ログインすると招待履歴がすべて表示されます。
        <a href="/login/?redirect=/me/invitations/" className="inv-alert-link">
          ログインする
        </a>
      </div>
    );
  }

  const usedList = invitations.filter((i) => i.status === 'used');
  const activeList = invitations.filter((i) => i.status === 'active');
  const expiredList = invitations.filter((i) => i.status === 'expired');

  return (
    <>
      {/* DB エラー */}
      {dbError && (
        <div className="inv-alert inv-alert--error" role="alert">
          <span aria-hidden="true">⚠️</span>
          データの読み込みに失敗しました。しばらく経ってから再度お試しください。
        </div>
      )}

      {/* 統計 */}
      <div className="inv-stats" role="group" aria-label="招待統計">
        <div className="inv-stat-card">
          <span className="inv-stat-num">{invitations.length}</span>
          <span className="inv-stat-label">発行済み</span>
        </div>
        <div className="inv-stat-card inv-stat-card--used">
          <span className="inv-stat-num">{usedList.length}</span>
          <span className="inv-stat-label">相性確認済み</span>
        </div>
        <div className="inv-stat-card inv-stat-card--active">
          <span className="inv-stat-num">{activeList.length}</span>
          <span className="inv-stat-label">待機中</span>
        </div>
      </div>

      {/* 相性確認済み */}
      {usedList.length > 0 && (
        <section className="inv-section" aria-labelledby="inv-used-heading">
          <h2 className="inv-section-title" id="inv-used-heading">
            <span aria-hidden="true">✅</span> 相性確認済み（{usedList.length}件）
          </h2>
          <ul className="inv-list" role="list">
            {usedList.map((inv) => (
              <li key={inv.id} className="inv-item inv-item--used">
                <div className="inv-item-left">
                  <span
                    className="inv-mode-badge"
                    style={{ background: inv.modeBg }}
                  >
                    {inv.modeIcon} {inv.modeLabel}
                  </span>
                  <p className="inv-item-code">
                    コード: <code className="inv-code-text">{inv.invite_code}</code>
                  </p>
                  <p className="inv-item-date">受診日: {inv.formattedAcceptedAt}</p>
                </div>
                <div className="inv-item-right">
                  <CompatResult inv={inv} isPro={isPro} />
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 待機中 */}
      {activeList.length > 0 && (
        <section className="inv-section" aria-labelledby="inv-active-heading">
          <h2 className="inv-section-title" id="inv-active-heading">
            <span aria-hidden="true">⏳</span> 待機中（{activeList.length}件）
          </h2>
          <ul className="inv-list" role="list">
            {activeList.map((inv) => (
              <li key={inv.id} className="inv-item inv-item--active">
                <div className="inv-item-left">
                  <span
                    className="inv-mode-badge"
                    style={{ background: inv.modeBg }}
                  >
                    {inv.modeIcon} {inv.modeLabel}
                  </span>
                  <p className="inv-item-code">
                    コード: <code className="inv-code-text">{inv.invite_code}</code>
                  </p>
                  <p className="inv-item-date">期限: {inv.formattedExpiresAt}</p>
                </div>
                <div className="inv-item-right inv-item-actions">
                  <CopyButton url={inv.inviteUrl} />
                  <CancelButton id={inv.id} onCancel={handleCancel} />
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 期限切れ（折りたたみ）*/}
      {expiredList.length > 0 && (
        <section className="inv-section">
          <details
            className="inv-expired-details"
            open={expiredOpen}
            onToggle={(e) => setExpiredOpen((e.target as HTMLDetailsElement).open)}
          >
            <summary className="inv-section-title">
              <span aria-hidden="true">🗂️</span> 期限切れ（{expiredList.length}件）
            </summary>
            <ul className="inv-list inv-list--muted" role="list">
              {expiredList.map((inv) => (
                <li key={inv.id} className="inv-item inv-item--expired">
                  <span className="inv-mode-badge inv-mode-badge--muted">
                    {inv.modeIcon} {inv.modeLabel}
                  </span>
                  <p className="inv-item-code">
                    コード: <code className="inv-code-text">{inv.invite_code}</code>
                  </p>
                  <p className="inv-item-date">
                    発行: {inv.formattedCreatedAt} / 期限: {inv.formattedExpiresAt}
                  </p>
                </li>
              ))}
            </ul>
          </details>
        </section>
      )}

      {/* 招待ゼロ */}
      {!dbError && invitations.length === 0 && (
        <div className="inv-empty">
          <span className="inv-empty-icon" aria-hidden="true">🤝</span>
          <h2 className="inv-empty-title">まだ招待を送っていません</h2>
          <p className="inv-empty-desc">
            診断結果ページから「友達と相性チェック」ボタンで招待リンクを発行できます
          </p>
          <a href="/diagnosis/" className="inv-cta-btn">
            診断を受ける →
          </a>
        </div>
      )}
    </>
  );
}
