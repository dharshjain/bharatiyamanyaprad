import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Eye, EyeOff, Lock, User } from "lucide-react";
import { loginAdmin, getAdminSession } from "@/lib/supabase";

export const Route = createFileRoute("/admin/")({
  component: AdminLogin,
  head: () => ({
    meta: [{ title: "Admin — Bharatiya Manyaprad" }],
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
    <div className="flex min-h-screen items-center justify-center px-4">
      {/* Radial glow behind card */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div className="h-96 w-96 rounded-full bg-[#b8860b]/10 blur-[120px]" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo mark */}
        <div className="mb-8 text-center">
          <span
            className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full"
            style={{ background: "linear-gradient(135deg,#b8860b,#d4a843)" }}
          >
            <Lock className="h-6 w-6 text-[#0d0d0f]" />
          </span>
          <h1
            className="font-display text-2xl tracking-wide"
            style={{ color: "#f5f0e8" }}
          >
            Admin Portal
          </h1>
          <p className="mt-1 text-sm" style={{ color: "#6b6450" }}>
            Bharatiya Manyaprad
          </p>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl p-8"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(184,134,11,0.2)",
            backdropFilter: "blur(12px)",
          }}
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div>
              <label
                htmlFor="admin-username"
                className="mb-1.5 block text-xs font-medium uppercase tracking-widest"
                style={{ color: "#9a8a6a" }}
              >
                Username
              </label>
              <div className="relative">
                <User
                  className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2"
                  style={{ color: "#6b6450" }}
                />
                <input
                  id="admin-username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                  required
                  placeholder="admin"
                  className="w-full rounded-lg py-3 pr-4 pl-10 text-sm outline-none transition-all focus:ring-1"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(184,134,11,0.2)",
                    color: "#f5f0e8",
                    "--tw-ring-color": "#b8860b",
                  } as React.CSSProperties}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="admin-password"
                className="mb-1.5 block text-xs font-medium uppercase tracking-widest"
                style={{ color: "#9a8a6a" }}
              >
                Password
              </label>
              <div className="relative">
                <Lock
                  className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2"
                  style={{ color: "#6b6450" }}
                />
                <input
                  id="admin-password"
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  placeholder="••••••••"
                  className="w-full rounded-lg py-3 pr-11 pl-10 text-sm outline-none transition-all focus:ring-1"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(184,134,11,0.2)",
                    color: "#f5f0e8",
                    "--tw-ring-color": "#b8860b",
                  } as React.CSSProperties}
                />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  className="absolute top-1/2 right-3.5 -translate-y-1/2 transition-opacity hover:opacity-80"
                  style={{ color: "#6b6450" }}
                  aria-label={showPw ? "Hide password" : "Show password"}
                >
                  {showPw ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <p
                className="rounded-lg px-4 py-2.5 text-sm"
                style={{
                  background: "rgba(220,38,38,0.1)",
                  border: "1px solid rgba(220,38,38,0.3)",
                  color: "#f87171",
                }}
              >
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              id="admin-login-btn"
              type="submit"
              disabled={loading}
              className="w-full rounded-lg py-3 text-sm font-semibold tracking-wide transition-all hover:opacity-90 active:scale-[0.99] disabled:opacity-50"
              style={{
                background: "linear-gradient(135deg,#b8860b,#d4a843)",
                color: "#0d0d0f",
              }}
            >
              {loading ? "Authenticating…" : "Sign In"}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-xs" style={{ color: "#3d3728" }}>
          Restricted access · Bharatiya Manyaprad editorial system
        </p>
      </div>
    </div>
  );
}
