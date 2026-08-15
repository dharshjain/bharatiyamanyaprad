import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
});

/** Executive dark-slate layout for all /admin/* routes */
function AdminLayout() {
  return (
    <div className="min-h-screen bg-[#0b0f17] text-slate-100 font-sans antialiased selection:bg-amber-500/30 selection:text-amber-200">
      <Outlet />
    </div>
  );
}
