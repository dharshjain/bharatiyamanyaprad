import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Eye, EyeOff, Lock, User, ShieldCheck } from "lucide-react";
import { loginAdmin, getAdminSession } from "@/lib/supabase";

export const Route = createFileRoute("/admin/")({
  component: AdminLogin,
  head: () => ({
    meta: [{ title: "Admin Portal — Bharatiya Manyaprad" }],
  }),
  beforeLoad: () => {
    if (getAdminSession()) {
      throw { redirect: { to: "/admin/dashboard" } };
    }
  },
});

function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const result = await loginAdmin(username, password);
    setLoading(false);
    if (result.success) {
      navigate({ to: "/admin/dashboard" });
    } else {
      setError(result.error ?? "Login failed.");
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#0b0f17] px-4 py-12 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-96 rounded-full bg-amber-500/10 blur-[130px]" />

      <div className="relative w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 shadow-lg shadow-amber-500/20 font-bold">
            <ShieldCheck className="h-7 w-7" />
          </div>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-100">Admin Portal</h1>
          <p className="mt-1 text-sm text-slate-400 font-medium">
            Bharatiya Manyaprad Editorial Desk
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-[#2d3a54] bg-[#131c2e] p-6 sm:p-8 shadow-2xl shadow-black/60 backdrop-blur-xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div>
              <label
                htmlFor="admin-username"
                className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-300"
              >
                Username
              </label>
              <div className="relative">
                <User className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  id="admin-username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                  required
                  placeholder="Enter username"
                  className="w-full rounded-xl border border-[#2d3a54] bg-[#0b0f17] py-3 pr-4 pl-10 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition-all focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="admin-password"
                className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-300"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  id="admin-password"
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-[#2d3a54] bg-[#0b0f17] py-3 pr-11 pl-10 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition-all focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  className="absolute top-1/2 right-3.5 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-200"
                  aria-label={showPw ? "Hide password" : "Show password"}
                >
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-300 font-medium">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              id="admin-login-btn"
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 py-3 text-sm font-bold tracking-wide shadow-lg shadow-amber-500/20 active:scale-[0.99] transition-all disabled:opacity-50"
            >
              {loading ? "Authenticating…" : "Sign In to Admin Portal"}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-slate-500 font-medium">
          Restricted Access · Authorized Editorial Staff Only
        </p>
      </div>
    </div>
  );
}
