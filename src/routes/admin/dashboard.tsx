import { createFileRoute, useNavigate, redirect } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import type {
  ReactNode,
  ChangeEvent,
  Dispatch,
  SetStateAction,
  FormEvent,
} from "react";
import {
  BookOpen,
  FileText,
  Newspaper,
  Settings,
  LogOut,
  Plus,
  Trash2,
  Pencil,
  Check,
  X,
  Upload,
  Download,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Loader2,
  CreditCard,
  ExternalLink,
  RefreshCw,
  ImageIcon,
  Menu,
} from "lucide-react";
import {
  supabase,
  getAdminSession,
  clearAdminSession,
  changeAdminPassword,
  type EditorialBoardMember,
  type EditorialBoardDocument,
  type NewsEvent,
  type Publication,
  type Subscription,
} from "@/lib/supabase";

export const Route = createFileRoute("/admin/dashboard")({
  component: AdminDashboard,
  head: () => ({ meta: [{ title: "Dashboard — Admin · Bharatiya Manyaprad" }] }),
  beforeLoad: () => {
    if (!getAdminSession()) {
      throw redirect({ to: "/admin" });
    }
  },
});

type Tab = "editorial" | "news" | "publications" | "subscriptions" | "settings";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getPaginationPages(current: number, total: number): (number | "...")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  if (current <= 3) {
    return [1, 2, 3, 4, "...", total];
  }
  if (current >= total - 2) {
    return [1, "...", total - 3, total - 2, total - 1, total];
  }
  return [1, "...", current - 1, current, current + 1, "...", total];
}

function Toast({
  msg,
  type,
  onDone,
}: {
  msg: string;
  type: "success" | "error";
  onDone: () => void;
}) {
  useEffect(() => {
    const t = setTimeout(onDone, 3000);
    return () => clearTimeout(t);
  }, [onDone]);
  return (
    <div
      className={`fixed top-5 right-5 z-50 flex items-center gap-2.5 rounded-xl px-4 py-3 text-sm font-medium shadow-2xl transition-all ${
        type === "success"
          ? "bg-[#1e2d4a] text-slate-100 border border-emerald-500/40 shadow-emerald-500/10"
          : "bg-rose-950 text-rose-100 border border-rose-500/40 shadow-rose-500/10"
      }`}
    >
      {type === "success" ? (
        <Check className="h-4 w-4 text-emerald-400" />
      ) : (
        <X className="h-4 w-4 text-rose-300" />
      )}
      {msg}
    </div>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-[#2d3a54] bg-[#131c2e] p-5 sm:p-6 shadow-xl shadow-black/30">
      <h2 className="mb-5 text-xs font-bold uppercase tracking-wider text-amber-400">
        {title}
      </h2>
      {children}
    </div>
  );
}

function InputRow({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  multiline,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  multiline?: boolean;
}) {
  const baseClass =
    "w-full rounded-xl border border-[#2d3a54] bg-[#0b0f17] px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition-all focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 font-sans";
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
        {label}
      </label>
      {multiline ? (
        <textarea
          rows={3}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={baseClass}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={baseClass}
        />
      )}
    </div>
  );
}

function SaveBtn({ onClick, loading }: { onClick: () => void; loading: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 px-4 py-2.5 text-sm font-bold shadow-lg shadow-amber-500/20 transition-all active:scale-[0.98] disabled:opacity-50"
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
      {loading ? "Saving…" : "Save"}
    </button>
  );
}

// ─── Main Dashboard ────────────────────────────────────────────────────────────

function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("editorial");
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  function showToast(msg: string, type: "success" | "error" = "success") {
    setToast({ msg, type });
  }

  function handleLogout() {
    clearAdminSession();
    navigate({ to: "/admin" });
  }

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "editorial", label: "Editorial Board", icon: <BookOpen className="h-4 w-4" /> },
    { id: "news", label: "News & Events", icon: <Newspaper className="h-4 w-4" /> },
    { id: "publications", label: "Publications", icon: <FileText className="h-4 w-4" /> },
    { id: "subscriptions", label: "Subscriptions", icon: <CreditCard className="h-4 w-4" /> },
    { id: "settings", label: "Settings", icon: <Settings className="h-4 w-4" /> },
  ];

  return (
    <div className="flex min-h-screen bg-[#0b0f17] text-slate-100 font-sans flex-col md:flex-row">
      {toast && <Toast msg={toast.msg} type={toast.type} onDone={() => setToast(null)} />}

      {/* Mobile Top Navbar */}
      <header className="flex items-center justify-between border-b border-[#2d3a54] bg-[#131c2e] px-4 py-3 md:hidden sticky top-0 z-30 shadow-md">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 font-bold text-sm shadow-md">
            BM
          </div>
          <div>
            <p className="text-[0.65rem] uppercase tracking-wider text-amber-400 font-bold">Admin Portal</p>
            <p className="text-sm font-bold text-slate-100 leading-none">Bharatiya Manyaprad</p>
          </div>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="rounded-xl p-2 text-slate-300 hover:bg-[#1e2d4a] hover:text-white transition-colors"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </header>

      {/* Mobile Collapsible Navigation Menu */}
      {mobileMenuOpen && (
        <div className="border-b border-[#2d3a54] bg-[#131c2e] px-4 py-3 md:hidden space-y-1 shadow-2xl sticky top-[57px] z-20">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                setActiveTab(t.id);
                setMobileMenuOpen(false);
              }}
              className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-all ${
                activeTab === t.id
                  ? "bg-amber-500 text-slate-950 shadow-md"
                  : "text-slate-300 hover:bg-[#1e2d4a] hover:text-white"
              }`}
            >
              {t.icon}
              {t.label}
            </button>
          ))}
          <div className="pt-2 border-t border-[#2d3a54]">
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-rose-400 hover:bg-rose-500/10 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      )}

      {/* Mobile Horizontal Scrollable Tab Bar */}
      <div className="flex overflow-x-auto scrollbar-none border-b border-[#2d3a54] bg-[#131c2e] px-3 py-2 md:hidden gap-1.5 sticky top-[57px] z-10">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`flex shrink-0 items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
              activeTab === t.id
                ? "bg-amber-500 text-slate-950 shadow-md"
                : "bg-[#1e2d4a] text-slate-300 hover:bg-[#253658] hover:text-white"
            }`}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 shrink-0 flex-col border-r border-[#2d3a54] bg-[#131c2e] shadow-xl">
        {/* Logo Header */}
        <div className="px-6 py-5 border-b border-[#2d3a54]">
          <p className="text-[0.65rem] font-bold uppercase tracking-wider text-amber-400">
            Admin Portal
          </p>
          <p className="mt-1 text-base font-bold text-slate-100">
            Bharatiya Manyaprad
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              id={`admin-tab-${t.id}`}
              onClick={() => setActiveTab(t.id)}
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
                activeTab === t.id
                  ? "bg-[#1e2d4a] text-amber-400 border-l-4 border-amber-500 shadow-md"
                  : "text-slate-400 hover:bg-[#1a263d] hover:text-slate-200"
              }`}
            >
              {t.icon}
              {t.label}
            </button>
          ))}
        </nav>

        {/* Logout button */}
        <div className="p-4 border-t border-[#2d3a54]">
          <button
            id="admin-logout-btn"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-400 hover:bg-rose-500/10 hover:text-rose-400 transition-all"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 lg:p-8 min-w-0 max-w-full">
        {activeTab === "editorial" && <EditorialTab showToast={showToast} />}
        {activeTab === "news" && <NewsTab showToast={showToast} />}
        {activeTab === "publications" && <PublicationsTab showToast={showToast} />}
        {activeTab === "subscriptions" && <SubscriptionsTab showToast={showToast} />}
        {activeTab === "settings" && <SettingsTab showToast={showToast} />}
      </main>
    </div>
  );
}

// ─── Editorial Board Tab ───────────────────────────────────────────────────────

function EditorialTab({ showToast }: { showToast: (m: string, t?: "success" | "error") => void }) {
  const [members, setMembers] = useState<EditorialBoardMember[]>([]);
  const [boardDoc, setBoardDoc] = useState<EditorialBoardDocument | null>(null);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<EditorialBoardMember>>({});
  const [saving, setSaving] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [addForm, setAddForm] = useState({
    role: "advisory",
    name: "",
    designation: "",
    description: "",
    email: "",
    photo_url: "",
  });
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function load() {
    setLoading(true);
    const [m, d] = await Promise.all([
      supabase.from("editorial_board_members").select("*").order("sort_order"),
      supabase.from("editorial_board_document").select("*").limit(1).single(),
    ]);
    if (m.data) setMembers(m.data as EditorialBoardMember[]);
    if (d.data) setBoardDoc(d.data as EditorialBoardDocument);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  function startEdit(m: EditorialBoardMember) {
    setEditingId(m.id);
    setEditForm({
      name: m.name,
      designation: m.designation ?? "",
      description: m.description ?? "",
      email: m.email ?? "",
      role: m.role,
      sort_order: m.sort_order,
      photo_url: m.photo_url ?? "",
    });
  }

  async function saveEdit(id: string) {
    setSaving(true);
    const updateData = {
      ...editForm,
      photo_url: editForm.photo_url?.trim() || null,
      updated_at: new Date().toISOString(),
    };
    const { error } = await supabase
      .from("editorial_board_members")
      .update(updateData)
      .eq("id", id);
    setSaving(false);
    if (error) return showToast(error.message, "error");
    showToast("Member updated successfully.");
    setEditingId(null);
    load();
  }

  async function deleteMember(id: string) {
    if (!confirm("Delete this board member?")) return;
    const { error } = await supabase.from("editorial_board_members").delete().eq("id", id);
    if (error) return showToast(error.message, "error");
    showToast("Member deleted.");
    load();
  }

  async function updateMemberPhoto(id: string, url: string | null) {
    setSaving(true);
    const { error } = await supabase
      .from("editorial_board_members")
      .update({ photo_url: url, updated_at: new Date().toISOString() })
      .eq("id", id);
    setSaving(false);
    if (error) return showToast(error.message, "error");
    showToast("Profile photo updated successfully.");
    load();
  }

  async function addMember() {
    if (!addForm.name.trim()) return showToast("Name is required.", "error");
    setSaving(true);
    const maxOrder = members.length ? Math.max(...members.map((m) => m.sort_order)) + 1 : 1;
    const insertData = {
      ...addForm,
      photo_url: addForm.photo_url.trim() || null,
      sort_order: maxOrder,
    };
    const { error } = await supabase.from("editorial_board_members").insert(insertData);
    setSaving(false);
    if (error) return showToast(error.message, "error");
    showToast("Member added.");
    setShowAdd(false);
    setAddForm({
      role: "advisory",
      name: "",
      designation: "",
      description: "",
      email: "",
      photo_url: "",
    });
    load();
  }

  async function uploadDocument(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `editorial-board-${Date.now()}.${ext}`;
    const { error: upErr } = await supabase.storage
      .from("editorial-documents")
      .upload(path, file, { upsert: true });
    if (upErr) {
      setUploading(false);
      return showToast(upErr.message, "error");
    }
    const { data: urlData } = supabase.storage.from("editorial-documents").getPublicUrl(path);
    const { error: dbErr } = await supabase
      .from("editorial_board_document")
      .update({
        file_url: urlData.publicUrl,
        file_name: file.name,
        updated_at: new Date().toISOString(),
      })
      .eq("id", boardDoc?.id ?? "");
    setUploading(false);
    if (dbErr) return showToast(dbErr.message, "error");
    showToast("Document uploaded.");
    load();
  }

  const grouped = {
    editor_in_chief: members.filter((m) => m.role === "editor_in_chief"),
    executive_editor: members.filter((m) => m.role === "executive_editor"),
    advisory: members.filter((m) => m.role === "advisory"),
  };

  const roleLabel: Record<string, string> = {
    editor_in_chief: "Editor in Chief & Publisher",
    executive_editor: "Executive Editor",
    advisory: "Advisory Board",
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">
            Editorial Board
          </h1>
          <p className="text-sm text-slate-400 mt-0.5">
            Manage board members and official editorial documentation
          </p>
        </div>
        <button
          id="editorial-add-btn"
          onClick={() => setShowAdd(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 px-4 py-2.5 text-sm font-bold shadow-lg shadow-amber-500/20 transition-all active:scale-[0.98] self-start sm:self-auto"
        >
          <Plus className="h-4 w-4" /> Add Member
        </button>
      </div>

      {/* 'Click here to read more' Document Section */}
      <Section title="'Click here to read more' Document">
        <div className="flex items-center gap-4 flex-wrap">
          {boardDoc?.file_url ? (
            <a
              href={boardDoc.file_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-[#334568] bg-[#1e2d4a] px-4 py-2.5 text-sm font-semibold text-amber-400 hover:bg-[#253658] shadow-sm transition-all"
            >
              <Download className="h-4 w-4 text-amber-400" />
              {boardDoc.file_name ?? "View current file"}
            </a>
          ) : (
            <p className="text-sm text-slate-400">
              No document uploaded yet.
            </p>
          )}
          <button
            id="editorial-doc-upload-btn"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="inline-flex items-center gap-2 rounded-xl bg-[#0b0f17] border border-[#2d3a54] text-slate-200 px-4 py-2.5 text-sm font-semibold hover:bg-[#1a263d] transition-all disabled:opacity-50"
          >
            {uploading ? (
              <Loader2 className="h-4 w-4 animate-spin text-amber-400" />
            ) : (
              <Upload className="h-4 w-4 text-slate-400" />
            )}
            {boardDoc?.file_url ? "Replace document" : "Upload document"}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx"
            className="hidden"
            onChange={uploadDocument}
          />
        </div>
        <p className="mt-2.5 text-xs text-slate-400">
          Accepted: PDF, DOC, DOCX · This file opens when visitors click "Click here to read more"
        </p>
      </Section>

      {/* Add member form */}
      {showAdd && (
        <Section title="Add New Member">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Role
              </label>
              <select
                value={addForm.role}
                onChange={(e) => setAddForm((f) => ({ ...f, role: e.target.value }))}
                className="w-full rounded-xl border border-[#2d3a54] bg-[#0b0f17] px-3.5 py-2.5 text-sm text-slate-100 outline-none transition-all focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
              >
                <option value="editor_in_chief" className="bg-[#0b0f17]">
                  Editor in Chief &amp; Publisher
                </option>
                <option value="executive_editor" className="bg-[#0b0f17]">
                  Executive Editor
                </option>
                <option value="advisory" className="bg-[#0b0f17]">
                  Advisory Board
                </option>
              </select>
            </div>
            <InputRow
              label="Name"
              value={addForm.name}
              onChange={(v) => setAddForm((f) => ({ ...f, name: v }))}
              placeholder="Dr. Full Name"
            />
            <InputRow
              label="Designation"
              value={addForm.designation}
              onChange={(v) => setAddForm((f) => ({ ...f, designation: v }))}
              placeholder="e.g. Executive Editor"
            />
            <InputRow
              label="Email"
              value={addForm.email}
              type="email"
              onChange={(v) => setAddForm((f) => ({ ...f, email: v }))}
              placeholder="email@example.com"
            />
            <div className="sm:col-span-2">
              <InputRow
                label="Description / Address"
                value={addForm.description}
                onChange={(v) => setAddForm((f) => ({ ...f, description: v }))}
                placeholder="University, position, city…"
                multiline
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs font-semibold uppercase tracking-wider block mb-1.5 text-slate-300">
                Photo
              </label>
              <div className="flex items-center gap-4">
                {addForm.photo_url ? (
                  <div className="relative size-16 shrink-0 rounded-full border border-amber-500/40 overflow-hidden bg-[#0b0f17]">
                    <img src={addForm.photo_url} alt="Preview" className="size-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setAddForm((f) => ({ ...f, photo_url: "" }))}
                      className="absolute inset-0 bg-slate-950/80 flex items-center justify-center text-rose-400 opacity-0 hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                ) : (
                  <div className="size-16 shrink-0 rounded-full border border-dashed border-[#334568] flex items-center justify-center text-slate-400 bg-[#0b0f17]">
                    <Upload className="size-5" />
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    setSaving(true);
                    const ext = file.name.split(".").pop();
                    const path = `member-photo-${Date.now()}.${ext}`;
                    const { error: upErr } = await supabase.storage
                      .from("editorial-documents")
                      .upload(path, file, { upsert: true });
                    if (upErr) {
                      setSaving(false);
                      return showToast(upErr.message, "error");
                    }
                    const { data: urlData } = supabase.storage
                      .from("editorial-documents")
                      .getPublicUrl(path);
                    setAddForm((f) => ({ ...f, photo_url: urlData.publicUrl }));
                    setSaving(false);
                    showToast("Photo uploaded successfully.");
                  }}
                  className="text-xs text-slate-400"
                />
              </div>
            </div>
          </div>
          <div className="mt-5 flex gap-3">
            <SaveBtn onClick={addMember} loading={saving} />
            <button
              onClick={() => setShowAdd(false)}
              className="rounded-xl border border-[#2d3a54] bg-[#0b0f17] px-4 py-2.5 text-sm font-semibold text-slate-300 hover:bg-[#1a263d] transition-all"
            >
              Cancel
            </button>
          </div>
        </Section>
      )}

      {/* Member list by group */}
      {(["editor_in_chief", "executive_editor", "advisory"] as const).map((role) =>
        grouped[role].length > 0 ? (
          <Section key={role} title={roleLabel[role] ?? role}>
            <div className="space-y-3">
              {grouped[role].map((m) =>
                editingId === m.id ? (
                  <EditMemberForm
                    key={m.id}
                    form={editForm}
                    setForm={setEditForm}
                    onSave={() => saveEdit(m.id)}
                    onCancel={() => setEditingId(null)}
                    saving={saving}
                    setSaving={setSaving}
                    showToast={showToast}
                  />
                ) : (
                  <MemberCard
                    key={m.id}
                    member={m}
                    onEdit={() => startEdit(m)}
                    onDelete={() => deleteMember(m.id)}
                    onPhotoUpdate={(url) => updateMemberPhoto(m.id, url)}
                  />
                ),
              )}
            </div>
          </Section>
        ) : null,
      )}
    </div>
  );
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter((w) => /^[A-Z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
}

function MemberCard({
  member,
  onEdit,
  onDelete,
  onPhotoUpdate,
}: {
  member: EditorialBoardMember;
  onEdit: () => void;
  onDelete: () => void;
  onPhotoUpdate: (photoUrl: string | null) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-xl border border-[#2d3a54] bg-[#0b0f17]/70 p-4 shadow-md hover:border-[#3d4d6e] transition-all">
      <div className="flex items-start gap-4 min-w-0 flex-1">
        <input
          type="file"
          ref={fileRef}
          accept="image/*"
          className="hidden"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            setUploading(true);
            const ext = file.name.split(".").pop();
            const path = `member-photo-${Date.now()}.${ext}`;
            const { error: upErr } = await supabase.storage
              .from("editorial-documents")
              .upload(path, file, { upsert: true });
            if (upErr) {
              setUploading(false);
              alert(upErr.message);
              return;
            }
            const { data: urlData } = supabase.storage
              .from("editorial-documents")
              .getPublicUrl(path);
            onPhotoUpdate(urlData.publicUrl);
            setUploading(false);
          }}
        />

        <div className="relative size-12 shrink-0 rounded-full overflow-hidden group cursor-pointer border border-[#334568] hover:border-amber-500 transition-colors bg-[#131c2e]">
          {uploading ? (
            <div className="size-full bg-slate-950/70 flex items-center justify-center">
              <Loader2 className="size-4 animate-spin text-amber-400" />
            </div>
          ) : (
            <>
              {member.photo_url ? (
                <img src={member.photo_url} alt={member.name} className="size-full object-cover" />
              ) : (
                <div className="size-full bg-[#1e2d4a] flex items-center justify-center text-amber-400 text-xs font-bold">
                  {getInitials(member.name)}
                </div>
              )}
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="absolute inset-0 bg-slate-950/80 flex flex-col items-center justify-center text-[0.6rem] text-amber-400 font-semibold opacity-0 group-hover:opacity-100 transition-opacity outline-none"
                title="Upload profile photo"
              >
                <Upload className="size-3.5 mb-0.5 text-amber-400" />
                <span>Upload</span>
              </button>
            </>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <p className="font-bold text-slate-100 text-base">
            {member.name}
          </p>
          {member.designation && (
            <p className="mt-0.5 text-xs font-bold text-amber-400">
              {member.designation}
            </p>
          )}
          {member.description && (
            <p className="mt-1 text-xs leading-relaxed text-slate-400">
              {member.description}
            </p>
          )}
          {member.email && (
            <a
              href={`mailto:${member.email}`}
              className="mt-1 block text-xs font-medium text-slate-400 hover:underline hover:text-amber-300"
            >
              {member.email}
            </a>
          )}
        </div>
      </div>
      <div className="flex shrink-0 gap-2 self-end sm:self-center">
        <button
          onClick={onEdit}
          className="rounded-xl border border-[#334568] bg-[#1e2d4a] p-2 text-amber-400 hover:bg-[#253658] transition-all shadow-sm"
          aria-label="Edit member"
        >
          <Pencil className="h-4 w-4" />
        </button>
        <button
          onClick={onDelete}
          className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-2 text-rose-400 hover:bg-rose-500/20 transition-all shadow-sm"
          aria-label="Delete member"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function EditMemberForm({
  form,
  setForm,
  onSave,
  onCancel,
  saving,
  setSaving,
  showToast,
}: {
  form: Partial<EditorialBoardMember>;
  setForm: Dispatch<SetStateAction<Partial<EditorialBoardMember>>>;
  onSave: () => void;
  onCancel: () => void;
  saving: boolean;
  setSaving: Dispatch<SetStateAction<boolean>>;
  showToast: (m: string, t?: "success" | "error") => void;
}) {
  return (
    <div className="rounded-xl border border-amber-500/30 bg-[#0b0f17] p-4 sm:p-5 space-y-4 shadow-lg">
      <div className="grid gap-3 sm:grid-cols-2">
        <InputRow
          label="Name"
          value={form.name ?? ""}
          onChange={(v) => setForm((f) => ({ ...f, name: v }))}
        />
        <InputRow
          label="Designation"
          value={form.designation ?? ""}
          onChange={(v) => setForm((f) => ({ ...f, designation: v }))}
        />
        <InputRow
          label="Email"
          value={form.email ?? ""}
          type="email"
          onChange={(v) => setForm((f) => ({ ...f, email: v }))}
        />
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
            Role
          </label>
          <select
            value={form.role ?? "advisory"}
            onChange={(e) =>
              setForm((f) => ({ ...f, role: e.target.value as EditorialBoardMember["role"] }))
            }
            className="w-full rounded-xl border border-[#2d3a54] bg-[#0b0f17] px-3.5 py-2.5 text-sm text-slate-100 outline-none transition-all focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
          >
            <option value="editor_in_chief" className="bg-[#0b0f17]">Editor in Chief</option>
            <option value="executive_editor" className="bg-[#0b0f17]">Executive Editor</option>
            <option value="advisory" className="bg-[#0b0f17]">Advisory</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <InputRow
            label="Description"
            value={form.description ?? ""}
            onChange={(v) => setForm((f) => ({ ...f, description: v }))}
            multiline
          />
        </div>
        <div className="sm:col-span-2">
          <label className="text-xs font-semibold uppercase tracking-wider block mb-1.5 text-slate-300">
            Photo
          </label>
          <div className="flex items-center gap-4">
            {form.photo_url ? (
              <div className="relative size-16 shrink-0 rounded-full border border-amber-500/40 overflow-hidden bg-[#0b0f17]">
                <img src={form.photo_url} alt="Preview" className="size-full object-cover" />
                <button
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, photo_url: "" }))}
                  className="absolute inset-0 bg-slate-950/80 flex items-center justify-center text-rose-400 opacity-0 hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            ) : (
              <div className="size-16 shrink-0 rounded-full border border-dashed border-[#334568] flex items-center justify-center text-slate-400 bg-[#0b0f17]">
                <Upload className="size-5" />
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                setSaving(true);
                const ext = file.name.split(".").pop();
                const path = `member-photo-${Date.now()}.${ext}`;
                const { error: upErr } = await supabase.storage
                  .from("editorial-documents")
                  .upload(path, file, { upsert: true });
                if (upErr) {
                  setSaving(false);
                  return showToast(upErr.message, "error");
                }
                const { data: urlData } = supabase.storage
                  .from("editorial-documents")
                  .getPublicUrl(path);
                setForm((f) => ({ ...f, photo_url: urlData.publicUrl }));
                setSaving(false);
                showToast("Photo uploaded successfully.");
              }}
              className="text-xs text-slate-400"
            />
          </div>
        </div>
      </div>
      <div className="flex gap-3 pt-2">
        <SaveBtn onClick={onSave} loading={saving} />
        <button
          onClick={onCancel}
          className="rounded-xl border border-[#2d3a54] bg-[#0b0f17] px-4 py-2.5 text-sm font-semibold text-slate-300 hover:bg-[#1a263d] transition-all"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

// ─── News & Events Tab ─────────────────────────────────────────────────────────

type NewsSubTab = "notices" | "events";

function NewsTab({ showToast }: { showToast: (m: string, t?: "success" | "error") => void }) {
  const [subTab, setSubTab] = useState<NewsSubTab>("notices");

  return (
    <div className="space-y-6">
      {/* Sub-tab selection */}
      <div className="flex border-b border-[#2d3a54] pb-px mb-6 gap-6">
        <button
          onClick={() => setSubTab("notices")}
          className={`pb-3 text-sm font-bold tracking-wider transition-all uppercase border-b-2 ${
            subTab === "notices"
              ? "border-amber-500 text-amber-400"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          Notices (Ticker)
        </button>
        <button
          onClick={() => setSubTab("events")}
          className={`pb-3 text-sm font-bold tracking-wider transition-all uppercase border-b-2 ${
            subTab === "events"
              ? "border-amber-500 text-amber-400"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          Detailed Events
        </button>
      </div>

      {subTab === "notices" ? (
        <NoticesManager showToast={showToast} />
      ) : (
        <EventsManager showToast={showToast} />
      )}
    </div>
  );
}

function NoticesManager({ showToast }: { showToast: (m: string, t?: "success" | "error") => void }) {
  const [items, setItems] = useState<NewsEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [newContent, setNewContent] = useState("");

  async function load() {
    setLoading(true);
    const { data } = await supabase.from("news_events").select("*").order("sort_order");
    if (data) setItems(data as NewsEvent[]);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function saveEdit(id: string) {
    setSaving(true);
    const { error } = await supabase
      .from("news_events")
      .update({ content: editContent, updated_at: new Date().toISOString() })
      .eq("id", id);
    setSaving(false);
    if (error) return showToast(error.message, "error");
    showToast("News item updated.");
    setEditingId(null);
    load();
  }

  async function toggleActive(item: NewsEvent) {
    const { error } = await supabase
      .from("news_events")
      .update({ is_active: !item.is_active })
      .eq("id", item.id);
    if (error) return showToast(error.message, "error");
    load();
  }

  async function deleteItem(id: string) {
    if (!confirm("Delete this news item?")) return;
    const { error } = await supabase.from("news_events").delete().eq("id", id);
    if (error) return showToast(error.message, "error");
    showToast("News item deleted.");
    load();
  }

  async function addItem() {
    if (!newContent.trim()) return showToast("Content is required.", "error");
    setSaving(true);
    const maxOrder = items.length ? Math.max(...items.map((i) => i.sort_order)) + 1 : 1;
    const { error } = await supabase
      .from("news_events")
      .insert({ content: newContent, sort_order: maxOrder });
    setSaving(false);
    if (error) return showToast(error.message, "error");
    showToast("News item added.");
    setShowAdd(false);
    setNewContent("");
    load();
  }

  async function moveItem(id: string, direction: "up" | "down") {
    const idx = items.findIndex((i) => i.id === id);
    const swapIdx = direction === "up" ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= items.length) return;
    const a = items[idx],
      b = items[swapIdx];
    if (!a || !b) return;
    await Promise.all([
      supabase.from("news_events").update({ sort_order: b.sort_order }).eq("id", a.id),
      supabase.from("news_events").update({ sort_order: a.sort_order }).eq("id", b.id),
    ]);
    load();
  }

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-100">
          Notices (Ticker)
        </h2>
        <button
          id="news-add-btn"
          onClick={() => setShowAdd(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 px-4 py-2.5 text-sm font-bold shadow-lg shadow-amber-500/20 transition-all active:scale-[0.98]"
        >
          <Plus className="h-4 w-4" /> Add Item
        </button>
      </div>

      {showAdd && (
        <Section title="Add News Item">
          <InputRow
            label="Content"
            value={newContent}
            onChange={setNewContent}
            placeholder="Enter news or announcement…"
            multiline
          />
          <div className="mt-4 flex gap-3">
            <SaveBtn onClick={addItem} loading={saving} />
            <button
              onClick={() => setShowAdd(false)}
              className="rounded-xl border border-[#2d3a54] bg-[#0b0f17] px-4 py-2.5 text-sm font-semibold text-slate-300 hover:bg-[#1a263d] transition-all"
            >
              Cancel
            </button>
          </div>
        </Section>
      )}

      <div className="space-y-3">
        {items.map((item, idx) => (
          <div
            key={item.id}
            className={`rounded-xl border bg-[#131c2e] p-4 sm:p-5 shadow-md transition-all ${
              item.is_active ? "border-[#2d3a54]" : "border-[#2d3a54]/40 opacity-50 bg-[#0b0f17]"
            }`}
          >
            {editingId === item.id ? (
              <div className="space-y-3">
                <InputRow label="Content" value={editContent} onChange={setEditContent} multiline />
                <div className="flex gap-3">
                  <SaveBtn onClick={() => saveEdit(item.id)} loading={saving} />
                  <button
                    onClick={() => setEditingId(null)}
                    className="rounded-xl border border-[#2d3a54] bg-[#0b0f17] px-4 py-2.5 text-sm font-semibold text-slate-300 hover:bg-[#1a263d]"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex-1">
                  <p className="text-sm font-medium leading-relaxed text-slate-200">
                    {item.content}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-1.5 self-end sm:self-center">
                  <div className="flex gap-1 border-r border-[#2d3a54] pr-2 mr-1">
                    <button
                      onClick={() => moveItem(item.id, "up")}
                      disabled={idx === 0}
                      className="rounded-xl border border-[#2d3a54] bg-[#0b0f17] p-1.5 text-slate-300 hover:bg-[#1a263d] disabled:opacity-30 shadow-sm"
                      aria-label="Move up"
                    >
                      <ChevronUp className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => moveItem(item.id, "down")}
                      disabled={idx === items.length - 1}
                      className="rounded-xl border border-[#2d3a54] bg-[#0b0f17] p-1.5 text-slate-300 hover:bg-[#1a263d] disabled:opacity-30 shadow-sm"
                      aria-label="Move down"
                    >
                      <ChevronDown className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <button
                    onClick={() => toggleActive(item)}
                    className={`rounded-xl border p-2 text-xs font-semibold transition-all shadow-sm ${
                      item.is_active
                        ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20"
                        : "border-[#2d3a54] bg-[#0b0f17] text-slate-400 hover:bg-[#1a263d]"
                    }`}
                    aria-label={item.is_active ? "Hide" : "Show"}
                  >
                    {item.is_active ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                  </button>
                  <button
                    onClick={() => {
                      setEditingId(item.id);
                      setEditContent(item.content);
                    }}
                    className="rounded-xl border border-[#334568] bg-[#1e2d4a] p-2 text-amber-400 hover:bg-[#253658] shadow-sm"
                    aria-label="Edit"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-2 text-rose-400 hover:bg-rose-500/20 shadow-sm"
                    aria-label="Delete"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

interface EventItem {
  id: string;
  title: string;
  location: string | null;
  description: string | null;
  event_date: string;
  tags: string[] | null;
  cover_url: string | null;
  sort_order: number;
}

function EventsManager({ showToast }: { showToast: (m: string, t?: "success" | "error") => void }) {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Form states
  const [form, setForm] = useState({
    title: "",
    location: "",
    description: "",
    event_date: new Date().toISOString().split("T")[0],
    tags: "",
    cover_url: "",
    sort_order: 0,
  });

  async function load() {
    setLoading(true);
    const { data } = await supabase.from("events").select("*").order("event_date", { ascending: true });
    if (data) {
      setEvents(data as EventItem[]);
    } else {
      setEvents([]);
    }
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function addItem() {
    if (!form.title.trim()) return showToast("Title is required.", "error");
    if (!form.event_date) return showToast("Date is required.", "error");
    setSaving(true);
    
    const tagArray = form.tags
      ? form.tags.split(",").map((t) => t.trim().toUpperCase()).filter(Boolean)
      : [];

    const { error } = await supabase.from("events").insert({
      title: form.title,
      location: form.location || null,
      description: form.description || null,
      event_date: form.event_date,
      tags: tagArray,
      cover_url: form.cover_url || null,
      sort_order: form.sort_order || 0,
    });

    setSaving(false);
    if (error) return showToast(error.message, "error");
    showToast("Event added successfully.");
    setShowAdd(false);
    setForm({
      title: "",
      location: "",
      description: "",
      event_date: new Date().toISOString().split("T")[0],
      tags: "",
      cover_url: "",
      sort_order: 0,
    });
    load();
  }

  async function startEdit(ev: EventItem) {
    setEditingId(ev.id);
    setForm({
      title: ev.title,
      location: ev.location || "",
      description: ev.description || "",
      event_date: ev.event_date,
      tags: ev.tags ? ev.tags.join(", ") : "",
      cover_url: ev.cover_url || "",
      sort_order: ev.sort_order || 0,
    });
  }

  async function saveEdit(id: string) {
    if (!form.title.trim()) return showToast("Title is required.", "error");
    if (!form.event_date) return showToast("Date is required.", "error");
    setSaving(true);

    const tagArray = form.tags
      ? form.tags.split(",").map((t) => t.trim().toUpperCase()).filter(Boolean)
      : [];

    const { error } = await supabase
      .from("events")
      .update({
        title: form.title,
        location: form.location || null,
        description: form.description || null,
        event_date: form.event_date,
        tags: tagArray,
        cover_url: form.cover_url || null,
        sort_order: form.sort_order || 0,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    setSaving(false);
    if (error) return showToast(error.message, "error");
    showToast("Event updated successfully.");
    setEditingId(null);
    load();
  }

  async function deleteItem(id: string) {
    if (!confirm("Are you sure you want to delete this event?")) return;
    const { error } = await supabase.from("events").delete().eq("id", id);
    if (error) return showToast(error.message, "error");
    showToast("Event deleted.");
    load();
  }

  async function handleFileUpload(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `event-cover-${Date.now()}.${ext}`;

    const { error: upErr } = await supabase.storage
      .from("editorial-documents")
      .upload(path, file, { upsert: true });

    if (upErr) {
      setUploading(false);
      return showToast(upErr.message, "error");
    }

    const { data: urlData } = supabase.storage
      .from("editorial-documents")
      .getPublicUrl(path);

    setForm((prev) => ({ ...prev, cover_url: urlData.publicUrl }));
    setUploading(false);
    showToast("Cover image uploaded.");
  }

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-100">
          Events List
        </h2>
        {!showAdd && editingId === null && (
          <button
            onClick={() => {
              setForm({
                title: "",
                location: "",
                description: "",
                event_date: new Date().toISOString().split("T")[0],
                tags: "",
                cover_url: "",
                sort_order: events.length + 1,
              });
              setShowAdd(true);
            }}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 px-4 py-2.5 text-sm font-bold shadow-lg shadow-amber-500/20 transition-all active:scale-[0.98]"
          >
            <Plus className="h-4 w-4" /> Add Event
          </button>
        )}
      </div>

      {/* Add / Edit Form */}
      {(showAdd || editingId !== null) && (
        <Section title={showAdd ? "Add New Event" : "Edit Event"}>
          <div className="grid gap-4 sm:grid-cols-2">
            <InputRow
              label="Event Title"
              value={form.title}
              onChange={(v) => setForm((prev) => ({ ...prev, title: v }))}
              placeholder="e.g. National Colloquium on Indian Studies"
            />
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider block mb-1.5 text-slate-300">
                Event Date
              </label>
              <input
                type="date"
                value={form.event_date}
                onChange={(e) => setForm((prev) => ({ ...prev, event_date: e.target.value }))}
                className="w-full rounded-xl border border-[#2d3a54] bg-[#0b0f17] px-3.5 py-2.5 text-sm text-slate-100 outline-none transition-all focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
              />
            </div>
            <InputRow
              label="Location"
              value={form.location}
              onChange={(v) => setForm((prev) => ({ ...prev, location: v }))}
              placeholder="e.g. Gujarat University, Ahmedabad Kendra"
            />
            <InputRow
              label="Tags (Comma separated)"
              value={form.tags}
              onChange={(v) => setForm((prev) => ({ ...prev, tags: v }))}
              placeholder="e.g. SEMINAR, DIASPORA, LAUNCH"
            />
            <div className="sm:col-span-2">
              <InputRow
                label="Full Description"
                value={form.description}
                onChange={(v) => setForm((prev) => ({ ...prev, description: v }))}
                placeholder="Details of the event..."
                multiline
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs font-semibold uppercase tracking-wider block mb-1.5 text-slate-300">
                Cover Image (optional)
              </label>
              <div className="flex items-center gap-4">
                {form.cover_url ? (
                  <div className="relative size-16 shrink-0 rounded-xl border border-[#2d3a54] overflow-hidden bg-[#0b0f17]">
                    <img src={form.cover_url} alt="Preview" className="size-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setForm((prev) => ({ ...prev, cover_url: "" }))}
                      className="absolute inset-0 bg-slate-950/80 flex items-center justify-center text-rose-400 opacity-0 hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                ) : (
                  <div className="size-16 shrink-0 rounded-xl border border-dashed border-[#334568] flex items-center justify-center text-slate-400 bg-[#0b0f17]">
                    <Upload className="size-5" />
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  disabled={uploading}
                  className="text-xs text-slate-400"
                />
                {uploading && <Loader2 className="size-4 animate-spin text-amber-400" />}
              </div>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <SaveBtn
              onClick={showAdd ? addItem : () => saveEdit(editingId!)}
              loading={saving}
            />
            <button
              onClick={() => {
                setShowAdd(false);
                setEditingId(null);
              }}
              className="rounded-xl border border-[#2d3a54] bg-[#0b0f17] px-4 py-2.5 text-sm font-semibold text-slate-300 hover:bg-[#1a263d]"
            >
              Cancel
            </button>
          </div>
        </Section>
      )}

      {/* Events List View */}
      {editingId === null && !showAdd && (
        <div className="space-y-3">
          {events.length === 0 ? (
            <div className="text-center py-10 text-slate-500 italic text-sm">
              No events found in database.
            </div>
          ) : (
            events.map((ev, index) => (
              <div
                key={ev.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-[#2d3a54] bg-[#131c2e] p-4 sm:p-5 shadow-md hover:border-[#3d4d6e] transition-all"
              >
                <div className="flex items-start gap-4 min-w-0">
                  <div className="size-14 shrink-0 rounded-xl overflow-hidden border border-[#2d3a54] bg-[#0b0f17] flex items-center justify-center text-amber-400 relative font-sans text-xs">
                    {ev.cover_url ? (
                      <img src={ev.cover_url} alt={ev.title} className="size-full object-cover" />
                    ) : (
                      <span className="font-bold text-amber-400 text-lg">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    )}
                  </div>
                  
                  <div className="min-w-0">
                    <h3 className="font-bold text-base text-slate-100 truncate">
                      {ev.title}
                    </h3>
                    <p className="text-xs font-bold text-amber-400 mt-0.5">
                      {ev.event_date} {ev.location ? `| ${ev.location}` : ""}
                    </p>
                    {ev.tags && ev.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {ev.tags.map((t) => (
                          <span key={t} className="bg-[#1e2d4a] border border-amber-500/30 text-amber-300 text-[0.65rem] font-bold px-2 py-0.5 rounded-full">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 self-end sm:self-center shrink-0">
                  <button
                    onClick={() => startEdit(ev)}
                    className="rounded-xl border border-[#334568] bg-[#1e2d4a] p-2 text-amber-400 hover:bg-[#253658] shadow-sm"
                    aria-label="Edit event"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => deleteItem(ev.id)}
                    className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-2 text-rose-400 hover:bg-rose-500/20 shadow-sm"
                    aria-label="Delete event"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

// ─── Publications Tab ──────────────────────────────────────────────────────────

const ITEMS_PER_PAGE = 6;

function PublicationsTab({
  showToast,
}: {
  showToast: (m: string, t?: "success" | "error") => void;
}) {
  const [pubs, setPubs] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Publication>>({});
  const [saving, setSaving] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [addForm, setAddForm] = useState({
    journal_name: "Bharatiya Manyaprad",
    title: "",
    volume: "",
    issue_no: "",
    year: new Date().getFullYear(),
    pages: "",
    author: "",
    period: "",
    cover_url: "",
  });
  const [uploading, setUploading] = useState<string | null>(null);
  const fileRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const addFileRef = useRef<HTMLInputElement>(null);
  const [addPdfFile, setAddPdfFile] = useState<File | null>(null);
  const addCoverRef = useRef<HTMLInputElement>(null);
  const [addCoverFile, setAddCoverFile] = useState<File | null>(null);
  const [coverUploading, setCoverUploading] = useState(false);

  async function load() {
    setLoading(true);
    const { data } = await supabase.from("publications").select("*").order("sort_order");
    if (data) setPubs(data as Publication[]);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function uploadPdf(
    pubId: string,
    file: File,
  ): Promise<{ url: string; name: string } | null> {
    const ext = file.name.split(".").pop();
    const path = `pub-${pubId}-${Date.now()}.${ext}`;
    const { error } = await supabase.storage
      .from("publications")
      .upload(path, file, { upsert: true });
    if (error) {
      showToast(error.message, "error");
      return null;
    }
    const { data } = supabase.storage.from("publications").getPublicUrl(path);
    return { url: data.publicUrl, name: file.name };
  }

  async function uploadCoverImage(
    pubId: string,
    file: File,
  ): Promise<{ url: string; name: string } | null> {
    const ext = file.name.split(".").pop();
    const path = `cover-${pubId}-${Date.now()}.${ext}`;
    const { error } = await supabase.storage
      .from("publications")
      .upload(path, file, { upsert: true });
    if (error) {
      showToast(error.message, "error");
      return null;
    }
    const { data } = supabase.storage.from("publications").getPublicUrl(path);
    return { url: data.publicUrl, name: file.name };
  }

  async function saveEdit(id: string) {
    setSaving(true);
    const fileInput = fileRefs.current[id];
    let pdfData: { pdf_url: string; pdf_name: string } | undefined;
    if (fileInput?.files?.[0]) {
      const res = await uploadPdf(id, fileInput.files[0]);
      if (res) pdfData = { pdf_url: res.url, pdf_name: res.name };
    }
    const coverInput = fileRefs.current[`cover-${id}`];
    let coverData: { cover_url: string; cover_name: string } | undefined;
    if (coverInput?.files?.[0]) {
      const res = await uploadCoverImage(id, coverInput.files[0]);
      if (res) coverData = { cover_url: res.url, cover_name: res.name };
    }
    const coverUpdate = coverData
      ? coverData
      : editForm.cover_url === ""
        ? { cover_url: null, cover_name: null }
        : {};
    const { error } = await supabase
      .from("publications")
      .update({
        journal_name: editForm.journal_name,
        title: editForm.title,
        volume: editForm.volume,
        issue_no: editForm.issue_no || null,
        year: Number(editForm.year),
        pages: editForm.pages || null,
        author: editForm.author || null,
        period: editForm.period,
        ...(pdfData ?? {}),
        ...coverUpdate,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);
    setSaving(false);
    if (error) return showToast(error.message, "error");
    showToast("Publication updated.");
    setEditingId(null);
    load();
  }

  async function deletePub(id: string) {
    if (!confirm("Delete this publication?")) return;
    const { error } = await supabase.from("publications").delete().eq("id", id);
    if (error) return showToast(error.message, "error");
    showToast("Publication deleted.");
    load();
  }

  async function addPub() {
    if (!addForm.title.trim()) return showToast("Title is required.", "error");
    setSaving(true);
    const maxOrder = pubs.length ? Math.max(...pubs.map((p) => p.sort_order)) + 1 : 1;
    const { data, error } = await supabase
      .from("publications")
      .insert({
        journal_name: addForm.journal_name,
        title: addForm.title,
        volume: addForm.volume,
        issue_no: addForm.issue_no || null,
        year: Number(addForm.year),
        pages: addForm.pages || null,
        author: addForm.author || null,
        period: addForm.period || `${addForm.year}`,
        cover_url: addForm.cover_url || null,
        sort_order: maxOrder,
      })
      .select()
      .single();
    if (error || !data) {
      setSaving(false);
      return showToast(error?.message ?? "Error adding publication.", "error");
    }
    let pdfData: { pdf_url: string; pdf_name: string } | undefined;
    if (addPdfFile) {
      const res = await uploadPdf(data.id, addPdfFile);
      if (res) {
        pdfData = { pdf_url: res.url, pdf_name: res.name };
        await supabase.from("publications").update(pdfData).eq("id", data.id);
      }
    }
    if (addCoverFile) {
      const coverRes = await uploadCoverImage(data.id, addCoverFile);
      if (coverRes) {
        await supabase
          .from("publications")
          .update({ cover_url: coverRes.url, cover_name: coverRes.name })
          .eq("id", data.id);
      }
    }
    setSaving(false);
    showToast("Publication added.");
    setShowAdd(false);
    setAddForm({
      journal_name: "Bharatiya Manyaprad",
      title: "",
      volume: "",
      issue_no: "",
      year: new Date().getFullYear(),
      pages: "",
      author: "",
      period: "",
      cover_url: "",
    });
    setAddPdfFile(null);
    setAddCoverFile(null);
    load();
  }

  async function uploadExistingPdf(pub: Publication, file: File) {
    setUploading(pub.id);
    const res = await uploadPdf(pub.id, file);
    if (res) {
      await supabase
        .from("publications")
        .update({ pdf_url: res.url, pdf_name: res.name, updated_at: new Date().toISOString() })
        .eq("id", pub.id);
      showToast("PDF uploaded.");
      load();
    }
    setUploading(null);
  }

  if (loading) return <LoadingSpinner />;

      const totalPages = Math.max(1, Math.ceil(pubs.length / ITEMS_PER_PAGE));
      const paginatedPubs = pubs.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE,
      );

      return (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-100">
                Publications
              </h1>
              <p className="text-sm text-slate-400 mt-0.5">
                Manage printed volumes and downloadable PDFs ({pubs.length} total)
              </p>
            </div>
            <button
              id="pub-add-btn"
              onClick={() => setShowAdd(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 px-4 py-2.5 text-sm font-bold shadow-lg shadow-amber-500/20 transition-all active:scale-[0.98] self-start sm:self-auto"
            >
              <Plus className="h-4 w-4" /> Add Publication
            </button>
          </div>

          {showAdd && (
            <Section title="Add New Publication">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <InputRow
                    label="Journal Name"
                    value={addForm.journal_name}
                    onChange={(v) => setAddForm((f) => ({ ...f, journal_name: v }))}
                    placeholder="Bharatiya Manyaprad"
                  />
                </div>
                <div className="sm:col-span-2">
                  <InputRow
                    label="Title (Article / Paper)"
                    value={addForm.title}
                    onChange={(v) => setAddForm((f) => ({ ...f, title: v }))}
                    placeholder="Introduction: Telling the Tale"
                  />
                </div>
                <InputRow
                  label="Volume"
                  value={addForm.volume}
                  onChange={(v) => setAddForm((f) => ({ ...f, volume: v }))}
                  placeholder="Volume 1"
                />
                <InputRow
                  label="No."
                  value={addForm.issue_no}
                  onChange={(v) => setAddForm((f) => ({ ...f, issue_no: v }))}
                  placeholder="No.2"
                />
                <InputRow
                  label="Year"
                  value={String(addForm.year)}
                  type="number"
                  onChange={(v) => setAddForm((f) => ({ ...f, year: Number(v) }))}
                />
                <InputRow
                  label="pp."
                  value={addForm.pages}
                  onChange={(v) => setAddForm((f) => ({ ...f, pages: v }))}
                  placeholder="pp. 9-18"
                />
                <div className="sm:col-span-2">
                  <InputRow
                    label="Author Name"
                    value={addForm.author}
                    onChange={(v) => setAddForm((f) => ({ ...f, author: v }))}
                    placeholder="Dr. Neerja A Gupta"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                    PDF File (optional)
                  </label>
                  <button
                    type="button"
                    onClick={() => addFileRef.current?.click()}
                    className="flex items-center gap-2 rounded-xl border border-[#2d3a54] bg-[#0b0f17] px-4 py-2.5 text-sm font-semibold text-slate-200 hover:bg-[#1a263d]"
                  >
                    <Upload className="h-4 w-4 text-amber-400" />
                    {addPdfFile ? addPdfFile.name : "Choose PDF…"}
                  </button>
                  <input
                    ref={addFileRef}
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    onChange={(e) => setAddPdfFile(e.target.files?.[0] ?? null)}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold uppercase tracking-wider block mb-1.5 text-slate-300">
                    Cover Page Image (optional)
                  </label>
                  <div className="flex items-center gap-4">
                    {addForm.cover_url ? (
                      <div className="relative size-20 shrink-0 rounded-xl border border-[#2d3a54] overflow-hidden bg-[#0b0f17]">
                        <img src={addForm.cover_url} alt="Cover preview" className="size-full object-cover" />
                        <button
                          type="button"
                          onClick={() => {
                            setAddForm((f) => ({ ...f, cover_url: "" }));
                            setAddCoverFile(null);
                          }}
                          className="absolute inset-0 bg-slate-950/80 flex items-center justify-center text-rose-400 opacity-0 hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="size-20 shrink-0 rounded-xl border border-dashed border-[#334568] flex items-center justify-center text-slate-400 bg-[#0b0f17]">
                        <ImageIcon className="size-6" />
                      </div>
                    )}
                    <div className="flex flex-col gap-1">
                      <button
                        type="button"
                        onClick={() => addCoverRef.current?.click()}
                        disabled={coverUploading}
                        className="flex items-center gap-2 rounded-xl border border-[#2d3a54] bg-[#0b0f17] px-4 py-2.5 text-sm font-semibold text-slate-200 hover:bg-[#1a263d] disabled:opacity-50"
                      >
                        {coverUploading ? <Loader2 className="h-4 w-4 animate-spin text-amber-400" /> : <Upload className="h-4 w-4 text-slate-400" />}
                        {addCoverFile ? addCoverFile.name : "Choose cover image…"}
                      </button>
                    </div>
                    <input
                      ref={addCoverRef}
                      type="file"
                      accept="image/*,.pdf"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        setAddCoverFile(file);
                        setCoverUploading(true);
                        const ext = file.name.split(".").pop();
                        const path = `cover-preview-${Date.now()}.${ext}`;
                        const { error: upErr } = await supabase.storage
                          .from("publications")
                          .upload(path, file, { upsert: true });
                        if (upErr) {
                          setCoverUploading(false);
                          return showToast(upErr.message, "error");
                        }
                        const { data: urlData } = supabase.storage
                          .from("publications")
                          .getPublicUrl(path);
                        setAddForm((f) => ({ ...f, cover_url: urlData.publicUrl }));
                        setCoverUploading(false);
                        showToast("Cover image uploaded.");
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-5 flex gap-3">
                <SaveBtn onClick={addPub} loading={saving} />
                <button
                  onClick={() => setShowAdd(false)}
                  className="rounded-xl border border-[#2d3a54] bg-[#0b0f17] px-4 py-2.5 text-sm font-semibold text-slate-300 hover:bg-[#1a263d]"
                >
                  Cancel
                </button>
              </div>
            </Section>
          )}

          <div className="space-y-3">
            {paginatedPubs.length === 0 ? (
              <div className="text-center py-10 text-slate-500 italic text-sm">
                No publications found.
              </div>
            ) : (
              paginatedPubs.map((pub) => (
                <div
                  key={pub.id}
                  className="rounded-xl border border-[#2d3a54] bg-[#131c2e] p-4 sm:p-5 shadow-md hover:border-[#3d4d6e] transition-all"
                >
                  {editingId === pub.id ? (
                    <div className="space-y-3">
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className="sm:col-span-2">
                          <InputRow
                            label="Journal Name"
                            value={editForm.journal_name ?? "Bharatiya Manyaprad"}
                            onChange={(v) => setEditForm((f) => ({ ...f, journal_name: v }))}
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <InputRow
                            label="Title (Article / Paper)"
                            value={editForm.title ?? ""}
                            onChange={(v) => setEditForm((f) => ({ ...f, title: v }))}
                          />
                        </div>
                        <InputRow
                          label="Volume"
                          value={editForm.volume ?? ""}
                          onChange={(v) => setEditForm((f) => ({ ...f, volume: v }))}
                        />
                        <InputRow
                          label="No."
                          value={editForm.issue_no ?? ""}
                          onChange={(v) => setEditForm((f) => ({ ...f, issue_no: v }))}
                        />
                        <InputRow
                          label="Year"
                          value={String(editForm.year ?? "")}
                          type="number"
                          onChange={(v) => setEditForm((f) => ({ ...f, year: Number(v) }))}
                        />
                        <InputRow
                          label="pp."
                          value={editForm.pages ?? ""}
                          onChange={(v) => setEditForm((f) => ({ ...f, pages: v }))}
                        />
                        <div className="sm:col-span-2">
                          <InputRow
                            label="Author Name"
                            value={editForm.author ?? ""}
                            onChange={(v) => setEditForm((f) => ({ ...f, author: v }))}
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                            Replace PDF
                          </label>
                          <button
                            type="button"
                            onClick={() => fileRefs.current[pub.id]?.click()}
                            className="flex items-center gap-2 rounded-xl border border-[#2d3a54] bg-[#0b0f17] px-4 py-2.5 text-sm font-semibold text-slate-200 hover:bg-[#1a263d]"
                          >
                            <Upload className="h-4 w-4 text-amber-400" /> Choose new PDF
                          </button>
                          <input
                            ref={(el) => {
                              fileRefs.current[pub.id] = el;
                            }}
                            type="file"
                            accept=".pdf"
                            className="hidden"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="text-xs font-semibold uppercase tracking-wider block mb-1.5 text-slate-300">
                            Cover Page Image (optional)
                          </label>
                          <div className="flex items-center gap-4">
                            {editForm.cover_url ? (
                              <div className="relative size-20 shrink-0 rounded-xl border border-[#2d3a54] overflow-hidden bg-[#0b0f17]">
                                <img src={editForm.cover_url} alt="Cover preview" className="size-full object-cover" />
                                <button
                                  type="button"
                                  onClick={() => setEditForm((f) => ({ ...f, cover_url: "" }))}
                                  className="absolute inset-0 bg-slate-950/80 flex items-center justify-center text-rose-400 opacity-0 hover:opacity-100 transition-opacity"
                                >
                                  <Trash2 className="size-4" />
                                </button>
                              </div>
                            ) : (
                              <div className="size-20 shrink-0 rounded-xl border border-dashed border-[#334568] flex items-center justify-center text-slate-400 bg-[#0b0f17]">
                                <ImageIcon className="size-6" />
                              </div>
                            )}
                            <div className="flex flex-col gap-1">
                              <button
                                type="button"
                                onClick={() => fileRefs.current[`cover-${pub.id}`]?.click()}
                                className="flex items-center gap-2 rounded-xl border border-[#2d3a54] bg-[#0b0f17] px-4 py-2.5 text-sm font-semibold text-slate-200 hover:bg-[#1a263d]"
                              >
                                <Upload className="h-4 w-4 text-slate-400" /> {editForm.cover_url ? "Replace cover" : "Choose cover image…"}
                              </button>
                            </div>
                            <input
                              ref={(el) => {
                                fileRefs.current[`cover-${pub.id}`] = el;
                              }}
                              type="file"
                              accept="image/*,.pdf"
                              className="hidden"
                              onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (!file) return;
                                setCoverUploading(true);
                                const ext = file.name.split(".").pop();
                                const path = `cover-edit-${Date.now()}.${ext}`;
                                const { error: upErr } = await supabase.storage
                                  .from("publications")
                                  .upload(path, file, { upsert: true });
                                if (upErr) {
                                  setCoverUploading(false);
                                  return showToast(upErr.message, "error");
                                }
                                const { data: urlData } = supabase.storage
                                  .from("publications")
                                  .getPublicUrl(path);
                                setEditForm((f) => ({ ...f, cover_url: urlData.publicUrl }));
                                setCoverUploading(false);
                                showToast("Cover image uploaded.");
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-3 pt-2">
                        <SaveBtn onClick={() => saveEdit(pub.id)} loading={saving} />
                        <button
                          onClick={() => setEditingId(null)}
                          className="rounded-xl border border-[#2d3a54] bg-[#0b0f17] px-4 py-2.5 text-sm font-semibold text-slate-300 hover:bg-[#1a263d]"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                      <div className="flex items-start gap-4 min-w-0 flex-1">
                        <div className="size-14 shrink-0 rounded-xl overflow-hidden border border-[#2d3a54] bg-[#0b0f17] flex items-center justify-center">
                          {pub.cover_url ? (
                            <img src={pub.cover_url} alt={`Cover ${pub.volume}`} className="size-full object-cover" />
                          ) : (
                            <ImageIcon className="size-5 text-slate-500" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="text-[0.65rem] font-bold uppercase tracking-wider text-amber-400">
                            {pub.journal_name || "Bharatiya Manyaprad"}
                          </p>
                          <p className="mt-0.5 text-xs font-semibold text-slate-400">
                            {[pub.volume, pub.issue_no, String(pub.year), pub.pages]
                              .filter(Boolean)
                              .join(", ")}
                          </p>
                          <p className="mt-1 font-bold text-slate-100 text-base">
                            {pub.title}
                          </p>
                          {pub.author && (
                            <p className="text-xs text-slate-400 font-medium">
                              by {pub.author}
                            </p>
                          )}
                          {pub.pdf_url ? (
                            <a
                              href={pub.pdf_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:underline"
                            >
                              <Download className="h-3.5 w-3.5" /> {pub.pdf_name ?? "Download PDF"}
                            </a>
                          ) : (
                            <span className="mt-2 inline-flex items-center gap-1.5 text-xs text-slate-500">
                              No PDF uploaded
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex shrink-0 gap-2 flex-wrap justify-end self-end sm:self-start">
                        <button
                          onClick={() => fileRefs.current[`quick-${pub.id}`]?.click()}
                          disabled={uploading === pub.id}
                          className="flex items-center gap-1.5 rounded-xl border border-[#2d3a54] bg-[#0b0f17] px-3.5 py-1.5 text-xs font-semibold text-slate-200 hover:bg-[#1a263d] disabled:opacity-50 shadow-sm"
                          aria-label="Upload PDF"
                        >
                          {uploading === pub.id ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin text-amber-400" />
                          ) : (
                            <Upload className="h-3.5 w-3.5 text-slate-400" />
                          )}
                          {pub.pdf_url ? "Replace PDF" : "Upload PDF"}
                        </button>
                        <input
                          ref={(el) => {
                            fileRefs.current[`quick-${pub.id}`] = el;
                          }}
                          type="file"
                          accept=".pdf"
                          className="hidden"
                          onChange={(e) => {
                            const f = e.target.files?.[0];
                            if (f) uploadExistingPdf(pub, f);
                          }}
                        />
                        <button
                          onClick={() => {
                            setEditingId(pub.id);
                            setEditForm({
                              journal_name: pub.journal_name || "Bharatiya Manyaprad",
                              title: pub.title,
                              volume: pub.volume,
                              issue_no: pub.issue_no ?? "",
                              period: pub.period,
                              year: pub.year,
                              pages: pub.pages ?? "",
                              author: pub.author ?? "",
                              cover_url: pub.cover_url ?? "",
                              cover_name: pub.cover_name ?? "",
                            });
                          }}
                          className="rounded-xl border border-[#334568] bg-[#1e2d4a] p-2 text-amber-400 hover:bg-[#253658] shadow-sm"
                          aria-label="Edit"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => deletePub(pub.id)}
                          className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-2 text-rose-400 hover:bg-rose-500/20 shadow-sm"
                          aria-label="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#2d3a54] max-w-full">
              <p className="text-xs text-slate-400 font-medium text-center sm:text-left">
                Showing <span className="text-slate-100 font-bold">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span> to{" "}
                <span className="text-slate-100 font-bold">{Math.min(currentPage * ITEMS_PER_PAGE, pubs.length)}</span> of{" "}
                <span className="text-slate-100 font-bold">{pubs.length}</span> publications
              </p>

              <div className="flex flex-wrap items-center justify-center gap-2 max-w-full">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="flex items-center gap-1 rounded-xl border border-[#2d3a54] bg-[#131c2e] px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-[#1e2d4a] disabled:opacity-30 disabled:pointer-events-none transition-all shadow-sm"
                  aria-label="Previous Page"
                >
                  <ChevronLeft className="size-4" /> Prev
                </button>

                <div className="flex flex-wrap items-center justify-center gap-1.5 px-1 max-w-full">
                  {getPaginationPages(currentPage, totalPages).map((page, idx) =>
                    page === "..." ? (
                      <span key={`ellipsis-${idx}`} className="px-1 text-xs text-slate-500 font-bold select-none">
                        …
                      </span>
                    ) : (
                      <button
                        key={`page-${page}`}
                        onClick={() => setCurrentPage(page)}
                        className={`size-8 rounded-xl text-xs font-bold transition-all ${
                          currentPage === page
                            ? "bg-amber-500 text-slate-950 shadow-md"
                            : "border border-[#2d3a54] bg-[#0b0f17] text-slate-400 hover:bg-[#1e2d4a] hover:text-slate-200"
                        }`}
                      >
                        {page}
                      </button>
                    )
                  )}
                </div>

                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-1 rounded-xl border border-[#2d3a54] bg-[#131c2e] px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-[#1e2d4a] disabled:opacity-30 disabled:pointer-events-none transition-all shadow-sm"
                  aria-label="Next Page"
                >
                  Next <ChevronRight className="size-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      );
}

// ─── Subscriptions Tab ─────────────────────────────────────────────────────────

function SubscriptionsTab({
  showToast,
}: {
  showToast: (m: string, t?: "success" | "error") => void;
}) {
  const [subs, setSubs] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const { data } = await supabase
      .from("subscriptions")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setSubs(data as Subscription[]);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleStatusChange(id: string, newStatus: "Pending" | "Approved" | "Rejected") {
    const { error } = await supabase
      .from("subscriptions")
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq("id", id);

    if (error) {
      showToast("Failed to update status: " + error.message, "error");
    } else {
      showToast("Status updated to " + newStatus, "success");
      setSubs((prev) =>
        prev.map((s) => (s.id === id ? { ...s, status: newStatus } : s))
      );
    }
  }

  async function deleteSub(id: string, receiptName: string | null) {
    if (!confirm("Are you sure you want to delete this subscription record?")) return;

    if (receiptName) {
      await supabase.storage.from("subscriptions").remove([receiptName]);
    }

    const { error } = await supabase.from("subscriptions").delete().eq("id", id);
    if (error) {
      showToast("Failed to delete record: " + error.message, "error");
    } else {
      showToast("Subscription record deleted", "success");
      setSubs((prev) => prev.filter((s) => s.id !== id));
    }
  }

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">
            Subscriptions Registry
          </h1>
          <p className="text-sm text-slate-400 mt-0.5">
            Review user subscription requests and payment receipts
          </p>
        </div>
        <button
          onClick={load}
          className="inline-flex items-center gap-1.5 rounded-xl border border-[#334568] bg-[#1e2d4a] px-3.5 py-2 text-xs font-semibold text-amber-400 hover:bg-[#253658] shadow-sm transition-all"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Refresh
        </button>
      </div>

      <div className="space-y-4">
        {subs.length === 0 ? (
          <p className="text-sm italic text-slate-500">
            No subscriptions have been registered yet.
          </p>
        ) : (
          subs.map((s) => (
            <div
              key={s.id}
              className="flex flex-col gap-5 rounded-2xl border border-[#2d3a54] bg-[#131c2e] p-5 sm:p-6 shadow-xl shadow-black/30"
            >
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#2d3a54] pb-4">
                <div>
                  <h3 className="font-bold text-lg text-slate-100">
                    {s.name}
                  </h3>
                  <p className="text-sm text-slate-300 font-medium">
                    {s.email} · {s.mobile}
                  </p>
                  <p className="text-xs mt-1 text-slate-400">
                    Registered: {new Date(s.created_at).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-[0.62rem] uppercase tracking-wider font-bold text-slate-400">
                      Payment Status
                    </label>
                    <select
                      value={s.status}
                      onChange={(e) => handleStatusChange(s.id, e.target.value as any)}
                      className={`rounded-xl border px-3 py-1.5 text-xs font-bold focus:outline-none transition-colors cursor-pointer ${
                        s.status === "Approved"
                          ? "border-emerald-500/30 bg-emerald-500/15 text-emerald-300"
                          : s.status === "Rejected"
                            ? "border-rose-500/30 bg-rose-500/15 text-rose-300"
                            : "border-amber-500/30 bg-amber-500/15 text-amber-300"
                      }`}
                    >
                      <option value="Pending" className="bg-[#0b0f17] text-amber-300">Pending</option>
                      <option value="Approved" className="bg-[#0b0f17] text-emerald-300">Approved</option>
                      <option value="Rejected" className="bg-[#0b0f17] text-rose-300">Rejected</option>
                    </select>
                  </div>

                  <button
                    onClick={() => deleteSub(s.id, s.receipt_name)}
                    className="mt-4 rounded-xl border border-rose-500/30 bg-rose-500/10 p-2 text-rose-400 hover:bg-rose-500/20 shadow-sm transition-all"
                    aria-label="Delete registry record"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 text-sm">
                <div>
                  <p className="text-[0.65rem] uppercase tracking-wider font-bold text-slate-400">
                    Subscription Type
                  </p>
                  <p className="font-semibold text-slate-200 mt-1">{s.type} ({s.period})</p>
                </div>
                <div>
                  <p className="text-[0.65rem] uppercase tracking-wider font-bold text-slate-400">
                    Payment Method
                  </p>
                  <p className="font-semibold text-slate-200 mt-1">{s.payment}</p>
                </div>
                <div>
                  <p className="text-[0.65rem] uppercase tracking-wider font-bold text-slate-400">
                    Transferred Amount
                  </p>
                  <p className="font-bold text-amber-400 mt-1">₹{s.amount || "N/A"}</p>
                </div>
                <div>
                  <p className="text-[0.65rem] uppercase tracking-wider font-bold text-slate-400">
                    Bank &amp; Payment Date
                  </p>
                  <p className="font-semibold text-slate-200 mt-1">
                    {s.bank || "N/A"} {s.date ? `(${s.date})` : ""}
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-3 border-t border-[#2d3a54]">
                <div className="max-w-xl">
                  <p className="text-[0.65rem] uppercase tracking-wider font-bold text-slate-400">
                    Postal Dispatch Address
                  </p>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    {s.address}, {s.country}
                  </p>
                </div>

                {s.receipt_url && (
                  <a
                    href={s.receipt_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-xl border border-[#334568] bg-[#1e2d4a] px-3.5 py-2 text-xs font-semibold text-amber-400 hover:bg-[#253658] shadow-sm transition-all self-start md:self-center"
                  >
                    <ExternalLink className="h-3.5 w-3.5 text-amber-400" />
                    View Payment Receipt
                  </a>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// ─── Settings Tab ──────────────────────────────────────────────────────────────

function SettingsTab({ showToast }: { showToast: (m: string, t?: "success" | "error") => void }) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [saving, setSaving] = useState(false);

  async function handleChangePassword(e: FormEvent) {
    e.preventDefault();
    if (newPassword.length < 4)
      return showToast("Password must be at least 4 characters.", "error");
    if (newPassword !== confirmPassword) return showToast("Passwords do not match.", "error");
    setSaving(true);
    const result = await changeAdminPassword(newPassword);
    setSaving(false);
    if (!result.success) return showToast(result.error ?? "Failed to update password.", "error");
    showToast("Password updated successfully.");
    setNewPassword("");
    setConfirmPassword("");
  }

  return (
    <div className="space-y-6 max-w-lg">
      <div>
        <h1 className="text-2xl font-bold text-slate-100">
          Settings
        </h1>
        <p className="text-sm text-slate-400 mt-0.5">
          Manage system preferences and portal credentials
        </p>
      </div>

      <Section title="Change Password">
        <form onSubmit={handleChangePassword} className="space-y-4">
          <InputRow
            label="New Password"
            value={newPassword}
            onChange={setNewPassword}
            type={showPw ? "text" : "password"}
            placeholder="Enter new password"
          />
          <InputRow
            label="Confirm New Password"
            value={confirmPassword}
            onChange={setConfirmPassword}
            type={showPw ? "text" : "password"}
            placeholder="Repeat new password"
          />
          <label className="flex cursor-pointer items-center gap-2 text-xs font-semibold text-slate-300">
            <input
              type="checkbox"
              checked={showPw}
              onChange={(e) => setShowPw(e.target.checked)}
              className="rounded border-[#2d3a54] bg-[#0b0f17] text-amber-500 focus:ring-amber-500"
            />
            Show passwords
          </label>
          <div className="pt-2">
            <SaveBtn onClick={() => {}} loading={saving} />
          </div>
        </form>
        <p className="mt-3 text-xs text-slate-500">
          No old password required. After changing, your current session remains active.
        </p>
      </Section>
    </div>
  );
}

// ─── Loading Spinner ───────────────────────────────────────────────────────────

function LoadingSpinner() {
  return (
    <div className="flex h-64 items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-amber-400" />
    </div>
  );
}
