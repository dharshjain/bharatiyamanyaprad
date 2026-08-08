import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
});

/** Bare layout for all /admin/* routes — no site header or footer */
function AdminLayout() {
  return (
    <div className="min-h-screen bg-[#0d0d0f]">
      <Outlet />
    </div>
  );
}
