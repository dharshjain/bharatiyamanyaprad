import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://ykzbptfiyyzskfijbniu.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_kFHKnlrAzSQrr0fvXQ0h2A_yCeBt1Fy";

/**
 * Resolve a WebSocket constructor that works in every environment:
 *   - Browser: native globalThis.WebSocket
 *   - SSR / Vite module-runner (Node 24): falls back to a no-op stub
 *     because we never use Supabase Realtime; only REST + Storage APIs are used.
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
const WebSocketImpl: any =
  typeof globalThis !== "undefined" && typeof (globalThis as any).WebSocket !== "undefined"
    ? (globalThis as any).WebSocket
    : class NoOpWebSocket {
        // Minimal stub — satisfies the realtime-js constructor check without crashing
        static CONNECTING = 0;
        static OPEN = 1;
        static CLOSING = 2;
        static CLOSED = 3;
        constructor() {
          /* intentional no-op for SSR */
        }
        close() {}
        send() {}
        addEventListener() {}
        removeEventListener() {}
      };
/* eslint-enable @typescript-eslint/no-explicit-any */

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  realtime: {
    transport: WebSocketImpl,
  },
});

// ── Types ────────────────────────────────────────────────────

export type AdminCredential = {
  id: string;
  username: string;
  password: string;
  created_at: string;
  updated_at: string;
};

export type EditorialBoardMember = {
  id: string;
  role: "editor_in_chief" | "executive_editor" | "advisory";
  name: string;
  designation: string | null;
  description: string | null;
  email: string | null;
  photo_url: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type EditorialBoardDocument = {
  id: string;
  file_url: string | null;
  file_name: string | null;
  updated_at: string;
};

export type NewsEvent = {
  id: string;
  content: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type Publication = {
  id: string;
  journal_name: string;
  title: string;
  volume: string;
  period: string;
  year: number;
  issue_no: string | null;
  pages: string | null;
  author: string | null;
  pdf_url: string | null;
  pdf_name: string | null;
  cover_url: string | null;
  cover_name: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type Subscription = {
  id: string;
  name: string;
  email: string;
  address: string;
  country: string;
  mobile: string;
  type: string;
  period: string;
  payment: string;
  bank: string | null;
  amount: string | null;
  date: string | null;
  receipt_url: string | null;
  receipt_name: string | null;
  status: "Pending" | "Approved" | "Rejected";
  created_at: string;
  updated_at: string;
};

// ── Auth helpers ─────────────────────────────────────────────

const SESSION_KEY = "bm_admin_session";

export function getAdminSession(): boolean {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return false;
    const { authenticated, ts } = JSON.parse(raw);
    // Session expires after 8 hours
    if (!authenticated || Date.now() - ts > 8 * 60 * 60 * 1000) {
      localStorage.removeItem(SESSION_KEY);
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

export function setAdminSession() {
  localStorage.setItem(SESSION_KEY, JSON.stringify({ authenticated: true, ts: Date.now() }));
}

export function clearAdminSession() {
  localStorage.removeItem(SESSION_KEY);
}

export async function loginAdmin(
  username: string,
  password: string,
): Promise<{ success: boolean; error?: string }> {
  const { data, error } = await supabase
    .from("admin_credentials")
    .select("id")
    .eq("username", username)
    .eq("password", password)
    .single();

  if (error || !data) {
    return { success: false, error: "Invalid username or password." };
  }
  setAdminSession();
  return { success: true };
}

export async function changeAdminPassword(
  newPassword: string,
): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase
    .from("admin_credentials")
    .update({ password: newPassword, updated_at: new Date().toISOString() })
    .eq("username", "admin");

  if (error) return { success: false, error: error.message };
  return { success: true };
}
