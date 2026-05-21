/**
 * src/lib/supabase/types.ts
 * Supabase データベース型定義（Phase 3 設計書 Section 2 準拠）
 *
 * テーブル:
 *   users / diagnosis_results / integrated_profiles /
 *   time_capsules / invitations / subscriptions /
 *   pass_purchases / compatibility_pairs / ai_prompt_usage
 */

export type UserPlan = 'free' | 'pass' | 'pro';
export type SubscriptionStatus = 'active' | 'past_due' | 'canceled' | 'incomplete';
export type CapsuleStatus = 'scheduled' | 'sent' | 'cancelled';
export type InviteMode = 'secret' | 'invite' | 'one_way' | 'full_share';
export type AiPromptFormat = 'chatgpt' | 'claude' | 'gemini' | 'general';

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          plan: UserPlan;
          pass_expires_at: string | null;
          display_name: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          plan?: UserPlan;
          pass_expires_at?: string | null;
          display_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          plan?: UserPlan;
          pass_expires_at?: string | null;
          display_name?: string | null;
          avatar_url?: string | null;
          updated_at?: string;
        };
      };

      diagnosis_results: {
        Row: {
          id: string;
          user_id: string;
          diagnosis_id: string;
          type_id: string;
          scores: Record<string, number>;
          big5_mapping: { O: number; C: number; E: number; A: number; N: number };
          completed_at: string;
          is_latest: boolean;
        };
        Insert: {
          id?: string;
          user_id: string;
          diagnosis_id: string;
          type_id: string;
          scores?: Record<string, number>;
          big5_mapping?: { O: number; C: number; E: number; A: number; N: number };
          completed_at?: string;
          is_latest?: boolean;
        };
        Update: {
          type_id?: string;
          scores?: Record<string, number>;
          big5_mapping?: { O: number; C: number; E: number; A: number; N: number };
          is_latest?: boolean;
        };
      };

      integrated_profiles: {
        Row: {
          id: string;
          user_id: string;
          snapshot_at: string;
          aggregated_big5: { O: number; C: number; E: number; A: number; N: number };
          scene_scores: Record<string, Record<string, number>>;
          diagnosis_count: number;
          version: string;
          is_current: boolean;
        };
        Insert: {
          id?: string;
          user_id: string;
          snapshot_at?: string;
          aggregated_big5?: { O: number; C: number; E: number; A: number; N: number };
          scene_scores?: Record<string, Record<string, number>>;
          diagnosis_count?: number;
          version?: string;
          is_current?: boolean;
        };
        Update: {
          aggregated_big5?: { O: number; C: number; E: number; A: number; N: number };
          scene_scores?: Record<string, Record<string, number>>;
          diagnosis_count?: number;
          is_current?: boolean;
        };
      };

      time_capsules: {
        Row: {
          id: string;
          user_id: string;
          letter_text: string;
          target_diagnosis_ids: string[];
          diagnosis_snapshot: Record<string, unknown>;
          scheduled_open_at: string;
          opened_at: string | null;
          email_sent_to: string | null;
          status: CapsuleStatus;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          letter_text: string;
          target_diagnosis_ids?: string[];
          diagnosis_snapshot?: Record<string, unknown>;
          scheduled_open_at: string;
          opened_at?: string | null;
          email_sent_to?: string | null;
          status?: CapsuleStatus;
          created_at?: string;
        };
        Update: {
          letter_text?: string;
          status?: CapsuleStatus;
          opened_at?: string | null;
          email_sent_to?: string | null;
        };
      };

      invitations: {
        Row: {
          id: string;
          inviter_id: string;
          invite_code: string;
          invitee_email: string | null;
          mode: InviteMode;
          inviter_diagnosis_snapshot: Record<string, unknown>;
          invitee_id: string | null;
          invitee_diagnosis_snapshot: Record<string, unknown> | null;
          compatibility_result: Record<string, unknown> | null;
          accepted_at: string | null;
          expires_at: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          inviter_id: string;
          invite_code: string;
          invitee_email?: string | null;
          mode?: InviteMode;
          inviter_diagnosis_snapshot?: Record<string, unknown>;
          invitee_id?: string | null;
          invitee_diagnosis_snapshot?: Record<string, unknown> | null;
          compatibility_result?: Record<string, unknown> | null;
          accepted_at?: string | null;
          expires_at?: string;
          created_at?: string;
        };
        Update: {
          invitee_id?: string | null;
          invitee_diagnosis_snapshot?: Record<string, unknown> | null;
          compatibility_result?: Record<string, unknown> | null;
          accepted_at?: string | null;
        };
      };

      subscriptions: {
        Row: {
          id: string;
          user_id: string;
          stripe_customer_id: string;
          stripe_subscription_id: string | null;
          plan: 'free' | 'pro';
          status: SubscriptionStatus;
          current_period_start: string | null;
          current_period_end: string | null;
          cancel_at_period_end: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          stripe_customer_id: string;
          stripe_subscription_id?: string | null;
          plan?: 'free' | 'pro';
          status?: SubscriptionStatus;
          current_period_start?: string | null;
          current_period_end?: string | null;
          cancel_at_period_end?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          stripe_subscription_id?: string | null;
          plan?: 'free' | 'pro';
          status?: SubscriptionStatus;
          current_period_start?: string | null;
          current_period_end?: string | null;
          cancel_at_period_end?: boolean;
          updated_at?: string;
        };
      };

      pass_purchases: {
        Row: {
          id: string;
          user_id: string;
          stripe_session_id: string;
          stripe_payment_intent: string | null;
          amount_jpy: number;
          purchased_at: string;
          expires_at: string;
          is_active: boolean;
        };
        Insert: {
          id?: string;
          user_id: string;
          stripe_session_id: string;
          stripe_payment_intent?: string | null;
          amount_jpy?: number;
          purchased_at?: string;
          expires_at?: string;
          is_active?: boolean;
        };
        Update: {
          is_active?: boolean;
        };
      };

      compatibility_pairs: {
        Row: {
          id: string;
          inviter_id: string;
          invitee_id: string | null;
          invitation_id: string | null;
          compatibility_result: {
            overall: number;
            love: number;
            work: number;
            friend: number;
            family: number;
            school: number;
          };
          mode: InviteMode;
          viewed_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          inviter_id: string;
          invitee_id?: string | null;
          invitation_id?: string | null;
          compatibility_result?: Record<string, number>;
          mode: InviteMode;
          viewed_at?: string | null;
          created_at?: string;
        };
        Update: {
          invitee_id?: string | null;
          compatibility_result?: Record<string, number>;
          viewed_at?: string | null;
        };
      };

      ai_prompt_usage: {
        Row: {
          id: string;
          user_id: string;
          used_at: string;
          format: AiPromptFormat;
        };
        Insert: {
          id?: string;
          user_id: string;
          used_at?: string;
          format: AiPromptFormat;
        };
        Update: never;
      };
    };
  };
}
