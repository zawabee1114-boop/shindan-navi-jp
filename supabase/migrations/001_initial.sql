-- ============================================================
-- shindan-navi.jp Phase 3 初期マイグレーション
-- 作成日: 2026-05-21
-- 設計書: Phase 3 完全アーキテクチャ設計書 Section 2
-- 実行場所: Supabase Dashboard > SQL Editor
--   または: supabase db push（CLI）
-- ============================================================

-- ============================================================
-- テーブル: users（auth.users と 1:1 対応）
-- ============================================================
CREATE TABLE IF NOT EXISTS public.users (
  id               UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email            TEXT NOT NULL,
  plan             TEXT NOT NULL DEFAULT 'free'
                     CHECK (plan IN ('free', 'pass', 'pro')),
  pass_expires_at  TIMESTAMPTZ,
  display_name     TEXT,
  avatar_url       TEXT,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_users_plan ON public.users(plan);
CREATE INDEX IF NOT EXISTS idx_users_pass_expires ON public.users(pass_expires_at)
  WHERE plan = 'pass';

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users: 自分のみ参照可" ON public.users
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "users: 自分のみ更新可" ON public.users
  FOR UPDATE USING (auth.uid() = id);

-- ============================================================
-- テーブル: diagnosis_results
-- ============================================================
CREATE TABLE IF NOT EXISTS public.diagnosis_results (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id        UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  diagnosis_id   TEXT NOT NULL,
  type_id        TEXT NOT NULL,
  scores         JSONB NOT NULL DEFAULT '{}',
  big5_mapping   JSONB NOT NULL DEFAULT '{}',
  completed_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  is_latest      BOOLEAN NOT NULL DEFAULT true
);

CREATE INDEX IF NOT EXISTS idx_diag_user_id ON public.diagnosis_results(user_id);
CREATE INDEX IF NOT EXISTS idx_diag_user_latest ON public.diagnosis_results(user_id, diagnosis_id)
  WHERE is_latest = true;
CREATE INDEX IF NOT EXISTS idx_diag_completed ON public.diagnosis_results(completed_at);

ALTER TABLE public.diagnosis_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "diagnosis: 自分のみ参照" ON public.diagnosis_results
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "diagnosis: 自分のみ挿入" ON public.diagnosis_results
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- is_latest 自動更新トリガー
CREATE OR REPLACE FUNCTION update_latest_flag()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.diagnosis_results
  SET is_latest = false
  WHERE user_id = NEW.user_id
    AND diagnosis_id = NEW.diagnosis_id
    AND id != NEW.id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trg_update_latest ON public.diagnosis_results;
CREATE TRIGGER trg_update_latest
  AFTER INSERT ON public.diagnosis_results
  FOR EACH ROW EXECUTE FUNCTION update_latest_flag();

-- ============================================================
-- テーブル: integrated_profiles
-- ============================================================
CREATE TABLE IF NOT EXISTS public.integrated_profiles (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  snapshot_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  aggregated_big5 JSONB NOT NULL DEFAULT '{}',
  scene_scores    JSONB NOT NULL DEFAULT '{}',
  diagnosis_count SMALLINT NOT NULL DEFAULT 0,
  version         TEXT NOT NULL DEFAULT '1.0',
  is_current      BOOLEAN NOT NULL DEFAULT true
);

CREATE INDEX IF NOT EXISTS idx_intpro_user_current ON public.integrated_profiles(user_id)
  WHERE is_current = true;
CREATE INDEX IF NOT EXISTS idx_intpro_snapshot ON public.integrated_profiles(user_id, snapshot_at);

ALTER TABLE public.integrated_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "intpro: 自分のみ" ON public.integrated_profiles
  FOR ALL USING (auth.uid() = user_id);

-- ============================================================
-- テーブル: time_capsules
-- ============================================================
CREATE TABLE IF NOT EXISTS public.time_capsules (
  id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id              UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  letter_text          TEXT NOT NULL,
  target_diagnosis_ids TEXT[] NOT NULL DEFAULT '{}',
  diagnosis_snapshot   JSONB NOT NULL DEFAULT '{}',
  scheduled_open_at    TIMESTAMPTZ NOT NULL,
  opened_at            TIMESTAMPTZ,
  email_sent_to        TEXT,
  status               TEXT NOT NULL DEFAULT 'scheduled'
                         CHECK (status IN ('scheduled', 'sent', 'cancelled')),
  created_at           TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_capsule_user ON public.time_capsules(user_id);
CREATE INDEX IF NOT EXISTS idx_capsule_schedule ON public.time_capsules(scheduled_open_at)
  WHERE status = 'scheduled';

ALTER TABLE public.time_capsules ENABLE ROW LEVEL SECURITY;

CREATE POLICY "capsule: 自分のみ" ON public.time_capsules
  FOR ALL USING (auth.uid() = user_id);

-- ============================================================
-- テーブル: invitations
-- ============================================================
CREATE TABLE IF NOT EXISTS public.invitations (
  id                          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  inviter_id                  UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  invite_code                 TEXT NOT NULL UNIQUE,
  invitee_email               TEXT,
  mode                        TEXT NOT NULL DEFAULT 'secret'
                                CHECK (mode IN ('secret', 'invite', 'one_way', 'full_share')),
  inviter_diagnosis_snapshot  JSONB NOT NULL DEFAULT '{}',
  invitee_id                  UUID REFERENCES public.users(id) ON DELETE SET NULL,
  invitee_diagnosis_snapshot  JSONB DEFAULT '{}',
  compatibility_result        JSONB DEFAULT '{}',
  accepted_at                 TIMESTAMPTZ,
  expires_at                  TIMESTAMPTZ NOT NULL DEFAULT (now() + INTERVAL '30 days'),
  created_at                  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_invite_code ON public.invitations(invite_code);
CREATE INDEX IF NOT EXISTS idx_invite_inviter ON public.invitations(inviter_id);
CREATE INDEX IF NOT EXISTS idx_invite_invitee ON public.invitations(invitee_id);

ALTER TABLE public.invitations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "invite: inviter は全操作可" ON public.invitations
  FOR ALL USING (auth.uid() = inviter_id);
CREATE POLICY "invite: invitee は参照・更新可" ON public.invitations
  FOR SELECT USING (auth.uid() = invitee_id OR invite_code IS NOT NULL);

-- ============================================================
-- テーブル: subscriptions
-- ============================================================
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id                     UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id                UUID NOT NULL UNIQUE REFERENCES public.users(id) ON DELETE CASCADE,
  stripe_customer_id     TEXT NOT NULL UNIQUE,
  stripe_subscription_id TEXT UNIQUE,
  plan                   TEXT NOT NULL DEFAULT 'free'
                           CHECK (plan IN ('free', 'pro')),
  status                 TEXT NOT NULL DEFAULT 'active'
                           CHECK (status IN ('active', 'past_due', 'canceled', 'incomplete')),
  current_period_start   TIMESTAMPTZ,
  current_period_end     TIMESTAMPTZ,
  cancel_at_period_end   BOOLEAN NOT NULL DEFAULT false,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at             TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_sub_user ON public.subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_sub_stripe_customer ON public.subscriptions(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_sub_period_end ON public.subscriptions(current_period_end)
  WHERE status = 'active';

ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "sub: 自分のみ参照" ON public.subscriptions
  FOR SELECT USING (auth.uid() = user_id);

-- ============================================================
-- テーブル: pass_purchases
-- ============================================================
CREATE TABLE IF NOT EXISTS public.pass_purchases (
  id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id              UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  stripe_session_id    TEXT NOT NULL UNIQUE,
  stripe_payment_intent TEXT,
  amount_jpy           INTEGER NOT NULL DEFAULT 390,
  purchased_at         TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at           TIMESTAMPTZ NOT NULL DEFAULT (now() + INTERVAL '1 year'),
  is_active            BOOLEAN NOT NULL DEFAULT true
);

CREATE INDEX IF NOT EXISTS idx_pass_user ON public.pass_purchases(user_id);
CREATE INDEX IF NOT EXISTS idx_pass_expires ON public.pass_purchases(user_id, expires_at)
  WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_pass_session ON public.pass_purchases(stripe_session_id);

ALTER TABLE public.pass_purchases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "pass: 自分のみ参照" ON public.pass_purchases
  FOR SELECT USING (auth.uid() = user_id);

-- ============================================================
-- テーブル: compatibility_pairs
-- ============================================================
CREATE TABLE IF NOT EXISTS public.compatibility_pairs (
  id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  inviter_id           UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  invitee_id           UUID REFERENCES public.users(id) ON DELETE SET NULL,
  invitation_id        UUID REFERENCES public.invitations(id) ON DELETE SET NULL,
  compatibility_result JSONB NOT NULL DEFAULT '{}',
  mode                 TEXT NOT NULL,
  viewed_at            TIMESTAMPTZ,
  created_at           TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_compat_inviter ON public.compatibility_pairs(inviter_id);
CREATE INDEX IF NOT EXISTS idx_compat_invitee ON public.compatibility_pairs(invitee_id);

ALTER TABLE public.compatibility_pairs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "compat: inviter参照" ON public.compatibility_pairs
  FOR SELECT USING (auth.uid() = inviter_id);
CREATE POLICY "compat: full_share時invitee参照" ON public.compatibility_pairs
  FOR SELECT USING (auth.uid() = invitee_id AND mode = 'full_share');

-- ============================================================
-- テーブル: ai_prompt_usage（レート制限）
-- ============================================================
CREATE TABLE IF NOT EXISTS public.ai_prompt_usage (
  id       UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id  UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  used_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  format   TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_ai_usage_user_day ON public.ai_prompt_usage(user_id, used_at);

-- ============================================================
-- auth.users 新規登録時に public.users を自動作成するトリガー
-- ============================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, plan)
  VALUES (NEW.id, NEW.email, 'free')
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
