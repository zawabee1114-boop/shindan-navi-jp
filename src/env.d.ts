/**
 * src/env.d.ts
 * Astro 型拡張 - App.Locals / ImportMeta.Env
 *
 * Phase 3.2: 認証フロー本接続に伴い locals を拡張
 */

/// <reference types="astro/client" />

import type { Session, User } from '@supabase/supabase-js';
import type { UserPlan } from './lib/supabase/types';

declare global {
  namespace App {
    interface Locals {
      /** Supabase セッション（未認証時 null）*/
      session: Session | null;
      /** 認証済みユーザー（未認証時 null）*/
      user: User | null;
      /** ユーザープラン（未認証時 'free'）*/
      plan: UserPlan;
    }
  }
}

interface ImportMetaEnv {
  /** Supabase プロジェクト URL */
  readonly PUBLIC_SUPABASE_URL: string;
  /** Supabase 匿名キー（クライアント公開可）*/
  readonly PUBLIC_SUPABASE_ANON_KEY: string;
  /** Supabase Service Role Key（サーバーサイド専用）*/
  readonly SUPABASE_SERVICE_ROLE_KEY: string;
  /** サイトの正規URL */
  readonly PUBLIC_SITE_URL?: string;
  /** GA4 測定ID */
  readonly PUBLIC_GA4_ID?: string;
  /** AdSense パブリッシャーID */
  readonly PUBLIC_ADSENSE_PUB?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
