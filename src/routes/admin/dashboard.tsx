import { createFileRoute, useNavigate, redirect } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import type { ReactNode, CSSProperties, ChangeEvent, Dispatch, SetStateAction, FormEvent } from "react";
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
  Loader2,
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

type Tab = "editorial" | "news" | "publications" | "settings";

// ─── Helpers ──────────────────────────────────────────────────────────────────

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
      className="fixed top-5 right-5 z-50 flex items-center gap-2 rounded-xl px-4 py-3 text-sm shadow-lg"
      style={{
        background: type === "success" ? "rgba(21,128,61,0.9)" : "rgba(185,28,28,0.9)",
        border: `1px solid ${type === "success" ? "rgba(74,222,128,0.4)" : "rgba(248,113,113,0.4)"}`,
        color: "#fff",
        backdropFilter: "blur(8px)",
      }}
    >
      {type === "success" ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
      {msg}
    </div>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div
      className="rounded-2xl p-6"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(184,134,11,0.12)",
      }}
    >
      <h2
        className="mb-5 text-sm font-semibold uppercase tracking-widest"
        style={{ color: "#b8860b" }}
      >
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
  const base: CSSProperties = {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(184,134,11,0.2)",
    color: "#f5f0e8",
    borderRadius: 8,
    padding: "10px 12px",
    width: "100%",
    fontSize: 14,
    outline: "none",
    fontFamily: "inherit",
  };
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium uppercase tracking-wider" style={{ color: "#9a8a6a" }}>
        {label}
      </label>
      {multiline ? (
        <textarea
          rows={3}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          style={base}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          style={base}
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
      className="flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition hover:opacity-90 disabled:opacity-50"
      style={{ background: "linear-gradient(135deg,#b8860b,#d4a843)", color: "#0d0d0f" }}
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
    { id: "settings", label: "Settings", icon: <Settings className="h-4 w-4" /> },
  ];

  return (
    <div className="flex min-h-screen" style={{ background: "#0d0d0f", color: "#f5f0e8" }}>
      {toast && (
        <Toast msg={toast.msg} type={toast.type} onDone={() => setToast(null)} />
      )}

      {/* Sidebar */}
      <aside
        className="flex w-64 shrink-0 flex-col"
        style={{
          background: "rgba(255,255,255,0.02)",
          borderRight: "1px solid rgba(184,134,11,0.12)",
        }}
      >
        {/* Logo */}
        <div className="px-6 py-6" style={{ borderBottom: "1px solid rgba(184,134,11,0.12)" }}>
          <p className="text-xs uppercase tracking-widest" style={{ color: "#b8860b" }}>
            Admin Panel
          </p>
          <p className="mt-1 text-base font-semibold" style={{ color: "#f5f0e8" }}>
            Bharatiya Manyaprad
          </p>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4">
          {tabs.map((t) => (
            <button
              key={t.id}
              id={`admin-tab-${t.id}`}
              onClick={() => setActiveTab(t.id)}
              className="mb-1 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm transition-all"
              style={
                activeTab === t.id
                  ? {
                      background: "linear-gradient(135deg,rgba(184,134,11,0.25),rgba(212,168,67,0.15))",
                      color: "#d4a843",
                      border: "1px solid rgba(184,134,11,0.3)",
                    }
                  : { color: "#6b6450", border: "1px solid transparent" }
              }
            >
              {t.icon}
              {t.label}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4" style={{ borderTop: "1px solid rgba(184,134,11,0.12)" }}>
          <button
            id="admin-logout-btn"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm transition hover:opacity-80"
            style={{ color: "#6b6450" }}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-8">
        {activeTab === "editorial" && <EditorialTab showToast={showToast} />}
        {activeTab === "news" && <NewsTab showToast={showToast} />}
        {activeTab === "publications" && <PublicationsTab showToast={showToast} />}
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
  const [addForm, setAddForm] = useState({ role: "advisory", name: "", designation: "", description: "", email: "" });
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

  useEffect(() => { load(); }, []);

  function startEdit(m: EditorialBoardMember) {
    setEditingId(m.id);
    setEditForm({ name: m.name, designation: m.designation ?? "", description: m.description ?? "", email: m.email ?? "", role: m.role, sort_order: m.sort_order });
  }

  async function saveEdit(id: string) {
    setSaving(true);
    const { error } = await supabase
      .from("editorial_board_members")
      .update({ ...editForm, updated_at: new Date().toISOString() })
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

  async function addMember() {
    if (!addForm.name.trim()) return showToast("Name is required.", "error");
    setSaving(true);
    const maxOrder = members.length ? Math.max(...members.map((m) => m.sort_order)) + 1 : 1;
    const { error } = await supabase.from("editorial_board_members").insert({ ...addForm, sort_order: maxOrder });
    setSaving(false);
    if (error) return showToast(error.message, "error");
    showToast("Member added.");
    setShowAdd(false);
    setAddForm({ role: "advisory", name: "", designation: "", description: "", email: "" });
    load();
  }

  async function uploadDocument(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `editorial-board-${Date.now()}.${ext}`;
    const { error: upErr } = await supabase.storage.from("editorial-documents").upload(path, file, { upsert: true });
    if (upErr) { setUploading(false); return showToast(upErr.message, "error"); }
    const { data: urlData } = supabase.storage.from("editorial-documents").getPublicUrl(path);
    const { error: dbErr } = await supabase.from("editorial_board_document").update({ file_url: urlData.publicUrl, file_name: file.name, updated_at: new Date().toISOString() }).eq("id", boardDoc?.id ?? "");
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
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold" style={{ color: "#f5f0e8" }}>Editorial Board</h1>
        <button
          id="editorial-add-btn"
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition hover:opacity-90"
          style={{ background: "rgba(184,134,11,0.2)", color: "#d4a843", border: "1px solid rgba(184,134,11,0.3)" }}
        >
          <Plus className="h-4 w-4" /> Add Member
        </button>
      </div>

      {/* Click here to read more — document upload */}
      <Section title="'Click here to read more' Document">
        <div className="flex items-center gap-4 flex-wrap">
          {boardDoc?.file_url ? (
            <a
              href={boardDoc.file_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm transition hover:opacity-80"
              style={{ background: "rgba(184,134,11,0.15)", color: "#d4a843", border: "1px solid rgba(184,134,11,0.3)" }}
            >
              <Download className="h-4 w-4" />
              {boardDoc.file_name ?? "View current file"}
            </a>
          ) : (
            <p className="text-sm" style={{ color: "#6b6450" }}>No document uploaded yet.</p>
          )}
          <button
            id="editorial-doc-upload-btn"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition hover:opacity-90 disabled:opacity-50"
            style={{ background: "rgba(255,255,255,0.06)", color: "#f5f0e8", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
            {boardDoc?.file_url ? "Replace document" : "Upload document"}
          </button>
          <input ref={fileInputRef} type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={uploadDocument} />
        </div>
        <p className="mt-2 text-xs" style={{ color: "#3d3728" }}>
          Accepted: PDF, DOC, DOCX · This file opens when visitors click "Click here to read more"
        </p>
      </Section>

      {/* Add member form */}
      {showAdd && (
        <Section title="Add New Member">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium uppercase tracking-wider" style={{ color: "#9a8a6a" }}>Role</label>
              <select
                value={addForm.role}
                onChange={(e) => setAddForm((f) => ({ ...f, role: e.target.value }))}
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(184,134,11,0.2)", color: "#f5f0e8", borderRadius: 8, padding: "10px 12px", fontSize: 14, outline: "none" }}
              >
                <option value="editor_in_chief" style={{ background: "#1a1a1c" }}>Editor in Chief & Publisher</option>
                <option value="executive_editor" style={{ background: "#1a1a1c" }}>Executive Editor</option>
                <option value="advisory" style={{ background: "#1a1a1c" }}>Advisory Board</option>
              </select>
            </div>
            <InputRow label="Name" value={addForm.name} onChange={(v) => setAddForm((f) => ({ ...f, name: v }))} placeholder="Dr. Full Name" />
            <InputRow label="Designation" value={addForm.designation} onChange={(v) => setAddForm((f) => ({ ...f, designation: v }))} placeholder="e.g. Executive Editor" />
            <InputRow label="Email" value={addForm.email} type="email" onChange={(v) => setAddForm((f) => ({ ...f, email: v }))} placeholder="email@example.com" />
            <div className="sm:col-span-2">
              <InputRow label="Description / Address" value={addForm.description} onChange={(v) => setAddForm((f) => ({ ...f, description: v }))} placeholder="University, position, city…" multiline />
            </div>
          </div>
          <div className="mt-4 flex gap-3">
            <SaveBtn onClick={addMember} loading={saving} />
            <button onClick={() => setShowAdd(false)} className="rounded-lg px-4 py-2.5 text-sm transition hover:opacity-80" style={{ color: "#6b6450" }}>Cancel</button>
          </div>
        </Section>
      )}

      {/* Member list by group */}
      {(["editor_in_chief", "executive_editor", "advisory"] as const).map((role) =>
        grouped[role].length > 0 ? (
          <Section key={role} title={roleLabel[role] ?? role}>
            <div className="space-y-4">
              {grouped[role].map((m) =>
                editingId === m.id ? (
                  <EditMemberForm
                    key={m.id}
                    form={editForm}
                    setForm={setEditForm}
                    onSave={() => saveEdit(m.id)}
                    onCancel={() => setEditingId(null)}
                    saving={saving}
                  />
                ) : (
                  <MemberCard key={m.id} member={m} onEdit={() => startEdit(m)} onDelete={() => deleteMember(m.id)} />
                ),
              )}
            </div>
          </Section>
        ) : null,
      )}
    </div>
  );
}

function MemberCard({ member, onEdit, onDelete }: { member: EditorialBoardMember; onEdit: () => void; onDelete: () => void }) {
  return (
    <div
      className="flex items-start justify-between gap-4 rounded-xl p-4"
      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div className="min-w-0 flex-1">
        <p className="font-semibold" style={{ color: "#f5f0e8" }}>{member.name}</p>
        {member.designation && <p className="mt-0.5 text-sm" style={{ color: "#b8860b" }}>{member.designation}</p>}
        {member.description && <p className="mt-1 text-sm leading-relaxed" style={{ color: "#6b6450" }}>{member.description}</p>}
        {member.email && <a href={`mailto:${member.email}`} className="mt-1 block text-xs hover:underline" style={{ color: "#9a8a6a" }}>{member.email}</a>}
      </div>
      <div className="flex shrink-0 gap-2">
        <button onClick={onEdit} className="rounded-lg p-2 transition hover:opacity-80" style={{ background: "rgba(184,134,11,0.15)", color: "#d4a843" }} aria-label="Edit member">
          <Pencil className="h-4 w-4" />
        </button>
        <button onClick={onDelete} className="rounded-lg p-2 transition hover:opacity-80" style={{ background: "rgba(220,38,38,0.15)", color: "#f87171" }} aria-label="Delete member">
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function EditMemberForm({ form, setForm, onSave, onCancel, saving }: { form: Partial<EditorialBoardMember>; setForm: Dispatch<SetStateAction<Partial<EditorialBoardMember>>>; onSave: () => void; onCancel: () => void; saving: boolean }) {
  return (
    <div className="rounded-xl p-4 space-y-3" style={{ background: "rgba(184,134,11,0.06)", border: "1px solid rgba(184,134,11,0.2)" }}>
      <div className="grid gap-3 sm:grid-cols-2">
        <InputRow label="Name" value={form.name ?? ""} onChange={(v) => setForm((f) => ({ ...f, name: v }))} />
        <InputRow label="Designation" value={form.designation ?? ""} onChange={(v) => setForm((f) => ({ ...f, designation: v }))} />
        <InputRow label="Email" value={form.email ?? ""} type="email" onChange={(v) => setForm((f) => ({ ...f, email: v }))} />
        <div>
          <label className="text-xs font-medium uppercase tracking-wider" style={{ color: "#9a8a6a" }}>Role</label>
          <select
            value={form.role ?? "advisory"}
            onChange={(e) => setForm((f) => ({ ...f, role: e.target.value as EditorialBoardMember["role"] }))}
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(184,134,11,0.2)", color: "#f5f0e8", borderRadius: 8, padding: "10px 12px", fontSize: 14, outline: "none", width: "100%", marginTop: 6 }}
          >
            <option value="editor_in_chief" style={{ background: "#1a1a1c" }}>Editor in Chief</option>
            <option value="executive_editor" style={{ background: "#1a1a1c" }}>Executive Editor</option>
            <option value="advisory" style={{ background: "#1a1a1c" }}>Advisory</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <InputRow label="Description" value={form.description ?? ""} onChange={(v) => setForm((f) => ({ ...f, description: v }))} multiline />
        </div>
      </div>
      <div className="flex gap-3">
        <SaveBtn onClick={onSave} loading={saving} />
        <button onClick={onCancel} className="rounded-lg px-4 py-2.5 text-sm transition hover:opacity-80" style={{ color: "#6b6450" }}>Cancel</button>
      </div>
    </div>
  );
}

// ─── News & Events Tab ─────────────────────────────────────────────────────────

function NewsTab({ showToast }: { showToast: (m: string, t?: "success" | "error") => void }) {
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

  useEffect(() => { load(); }, []);

  async function saveEdit(id: string) {
    setSaving(true);
    const { error } = await supabase.from("news_events").update({ content: editContent, updated_at: new Date().toISOString() }).eq("id", id);
    setSaving(false);
    if (error) return showToast(error.message, "error");
    showToast("News item updated.");
    setEditingId(null);
    load();
  }

  async function toggleActive(item: NewsEvent) {
    const { error } = await supabase.from("news_events").update({ is_active: !item.is_active }).eq("id", item.id);
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
    const { error } = await supabase.from("news_events").insert({ content: newContent, sort_order: maxOrder });
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
    const a = items[idx], b = items[swapIdx];
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
        <h1 className="text-2xl font-semibold" style={{ color: "#f5f0e8" }}>News & Events</h1>
        <button
          id="news-add-btn"
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition hover:opacity-90"
          style={{ background: "rgba(184,134,11,0.2)", color: "#d4a843", border: "1px solid rgba(184,134,11,0.3)" }}
        >
          <Plus className="h-4 w-4" /> Add Item
        </button>
      </div>

      {showAdd && (
        <Section title="Add News Item">
          <InputRow label="Content" value={newContent} onChange={setNewContent} placeholder="Enter news or announcement…" multiline />
          <div className="mt-4 flex gap-3">
            <SaveBtn onClick={addItem} loading={saving} />
            <button onClick={() => setShowAdd(false)} className="rounded-lg px-4 py-2.5 text-sm transition hover:opacity-80" style={{ color: "#6b6450" }}>Cancel</button>
          </div>
        </Section>
      )}

      <div className="space-y-3">
        {items.map((item, idx) => (
          <div
            key={item.id}
            className="rounded-xl p-5"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: `1px solid ${item.is_active ? "rgba(184,134,11,0.12)" : "rgba(255,255,255,0.04)"}`,
              opacity: item.is_active ? 1 : 0.5,
            }}
          >
            {editingId === item.id ? (
              <div className="space-y-3">
                <InputRow label="Content" value={editContent} onChange={setEditContent} multiline />
                <div className="flex gap-3">
                  <SaveBtn onClick={() => saveEdit(item.id)} loading={saving} />
                  <button onClick={() => setEditingId(null)} className="rounded-lg px-4 py-2.5 text-sm" style={{ color: "#6b6450" }}>Cancel</button>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <p className="text-sm leading-relaxed" style={{ color: "#f5f0e8" }}>{item.content}</p>
                </div>
                <div className="flex shrink-0 flex-col gap-1">
                  <div className="flex gap-1">
                    <button onClick={() => moveItem(item.id, "up")} disabled={idx === 0} className="rounded-lg p-1.5 transition hover:opacity-80 disabled:opacity-30" style={{ color: "#6b6450" }} aria-label="Move up"><ChevronUp className="h-3.5 w-3.5" /></button>
                    <button onClick={() => moveItem(item.id, "down")} disabled={idx === items.length - 1} className="rounded-lg p-1.5 transition hover:opacity-80 disabled:opacity-30" style={{ color: "#6b6450" }} aria-label="Move down"><ChevronDown className="h-3.5 w-3.5" /></button>
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => toggleActive(item)} className="rounded-lg p-1.5 transition hover:opacity-80" style={{ color: item.is_active ? "#6b6450" : "#d4a843" }} aria-label={item.is_active ? "Hide" : "Show"}>{item.is_active ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}</button>
                    <button onClick={() => { setEditingId(item.id); setEditContent(item.content); }} className="rounded-lg p-1.5 transition hover:opacity-80" style={{ color: "#d4a843" }} aria-label="Edit"><Pencil className="h-3.5 w-3.5" /></button>
                    <button onClick={() => deleteItem(item.id)} className="rounded-lg p-1.5 transition hover:opacity-80" style={{ color: "#f87171" }} aria-label="Delete"><Trash2 className="h-3.5 w-3.5" /></button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Publications Tab ──────────────────────────────────────────────────────────

function PublicationsTab({ showToast }: { showToast: (m: string, t?: "success" | "error") => void }) {
  const [pubs, setPubs] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Publication>>({});
  const [saving, setSaving] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [addForm, setAddForm] = useState({ title: "", volume: "", period: "", year: new Date().getFullYear() });
  const [uploading, setUploading] = useState<string | null>(null); // id of pub being uploaded
  const fileRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const addFileRef = useRef<HTMLInputElement>(null);
  const [addPdfFile, setAddPdfFile] = useState<File | null>(null);

  async function load() {
    setLoading(true);
    const { data } = await supabase.from("publications").select("*").order("sort_order");
    if (data) setPubs(data as Publication[]);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function uploadPdf(pubId: string, file: File): Promise<{ url: string; name: string } | null> {
    const ext = file.name.split(".").pop();
    const path = `pub-${pubId}-${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("publications").upload(path, file, { upsert: true });
    if (error) { showToast(error.message, "error"); return null; }
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
    const { error } = await supabase.from("publications").update({
      ...editForm,
      ...(pdfData ?? {}),
      year: Number(editForm.year),
      updated_at: new Date().toISOString(),
    }).eq("id", id);
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
    const { data, error } = await supabase.from("publications").insert({ ...addForm, year: Number(addForm.year), sort_order: maxOrder }).select().single();
    if (error || !data) { setSaving(false); return showToast(error?.message ?? "Error adding publication.", "error"); }
    let pdfData: { pdf_url: string; pdf_name: string } | undefined;
    if (addPdfFile) {
      const res = await uploadPdf(data.id, addPdfFile);
      if (res) {
        pdfData = { pdf_url: res.url, pdf_name: res.name };
        await supabase.from("publications").update(pdfData).eq("id", data.id);
      }
    }
    setSaving(false);
    showToast("Publication added.");
    setShowAdd(false);
    setAddForm({ title: "", volume: "", period: "", year: new Date().getFullYear() });
    setAddPdfFile(null);
    load();
  }

  async function uploadExistingPdf(pub: Publication, file: File) {
    setUploading(pub.id);
    const res = await uploadPdf(pub.id, file);
    if (res) {
      await supabase.from("publications").update({ pdf_url: res.url, pdf_name: res.name, updated_at: new Date().toISOString() }).eq("id", pub.id);
      showToast("PDF uploaded.");
      load();
    }
    setUploading(null);
  }

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold" style={{ color: "#f5f0e8" }}>Publications</h1>
        <button
          id="pub-add-btn"
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition hover:opacity-90"
          style={{ background: "rgba(184,134,11,0.2)", color: "#d4a843", border: "1px solid rgba(184,134,11,0.3)" }}
        >
          <Plus className="h-4 w-4" /> Add Publication
        </button>
      </div>

      {showAdd && (
        <Section title="Add New Publication">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <InputRow label="Title" value={addForm.title} onChange={(v) => setAddForm((f) => ({ ...f, title: v }))} placeholder="Bharatiya Manyaprad Vol XII…" />
            </div>
            <InputRow label="Volume" value={addForm.volume} onChange={(v) => setAddForm((f) => ({ ...f, volume: v }))} placeholder="Vol. XII" />
            <InputRow label="Period" value={addForm.period} onChange={(v) => setAddForm((f) => ({ ...f, period: v }))} placeholder="May 2025" />
            <InputRow label="Year" value={String(addForm.year)} type="number" onChange={(v) => setAddForm((f) => ({ ...f, year: Number(v) }))} />
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium uppercase tracking-wider" style={{ color: "#9a8a6a" }}>PDF File (optional)</label>
              <button
                type="button"
                onClick={() => addFileRef.current?.click()}
                className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm transition hover:opacity-80"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(184,134,11,0.2)", color: "#9a8a6a" }}
              >
                <Upload className="h-4 w-4" />
                {addPdfFile ? addPdfFile.name : "Choose PDF…"}
              </button>
              <input ref={addFileRef} type="file" accept=".pdf" className="hidden" onChange={(e) => setAddPdfFile(e.target.files?.[0] ?? null)} />
            </div>
          </div>
          <div className="mt-4 flex gap-3">
            <SaveBtn onClick={addPub} loading={saving} />
            <button onClick={() => setShowAdd(false)} className="rounded-lg px-4 py-2.5 text-sm" style={{ color: "#6b6450" }}>Cancel</button>
          </div>
        </Section>
      )}

      <div className="space-y-3">
        {pubs.map((pub) => (
          <div
            key={pub.id}
            className="rounded-xl p-5"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(184,134,11,0.12)" }}
          >
            {editingId === pub.id ? (
              <div className="space-y-3">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <InputRow label="Title" value={editForm.title ?? ""} onChange={(v) => setEditForm((f) => ({ ...f, title: v }))} />
                  </div>
                  <InputRow label="Volume" value={editForm.volume ?? ""} onChange={(v) => setEditForm((f) => ({ ...f, volume: v }))} />
                  <InputRow label="Period" value={editForm.period ?? ""} onChange={(v) => setEditForm((f) => ({ ...f, period: v }))} />
                  <InputRow label="Year" value={String(editForm.year ?? "")} type="number" onChange={(v) => setEditForm((f) => ({ ...f, year: Number(v) }))} />
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium uppercase tracking-wider" style={{ color: "#9a8a6a" }}>Replace PDF</label>
                    <button
                      type="button"
                      onClick={() => fileRefs.current[pub.id]?.click()}
                      className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm transition hover:opacity-80"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(184,134,11,0.2)", color: "#9a8a6a" }}
                    >
                      <Upload className="h-4 w-4" /> Choose new PDF
                    </button>
                    <input ref={(el) => { fileRefs.current[pub.id] = el; }} type="file" accept=".pdf" className="hidden" />
                  </div>
                </div>
                <div className="flex gap-3">
                  <SaveBtn onClick={() => saveEdit(pub.id)} loading={saving} />
                  <button onClick={() => setEditingId(null)} className="rounded-lg px-4 py-2.5 text-sm" style={{ color: "#6b6450" }}>Cancel</button>
                </div>
              </div>
            ) : (
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-widest" style={{ color: "#b8860b" }}>{pub.period}</p>
                  <p className="mt-1 font-semibold" style={{ color: "#f5f0e8" }}>{pub.title}</p>
                  <p className="text-sm" style={{ color: "#6b6450" }}>{pub.volume}</p>
                  {pub.pdf_url ? (
                    <a href={pub.pdf_url} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1.5 text-xs hover:underline" style={{ color: "#d4a843" }}>
                      <Download className="h-3.5 w-3.5" /> {pub.pdf_name ?? "Download PDF"}
                    </a>
                  ) : (
                    <span className="mt-2 inline-flex items-center gap-1.5 text-xs" style={{ color: "#3d3728" }}>No PDF uploaded</span>
                  )}
                </div>
                <div className="flex shrink-0 gap-2 flex-wrap justify-end">
                  <button
                    onClick={() => fileRefs.current[`quick-${pub.id}`]?.click()}
                    disabled={uploading === pub.id}
                    className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs transition hover:opacity-80 disabled:opacity-50"
                    style={{ background: "rgba(255,255,255,0.06)", color: "#9a8a6a", border: "1px solid rgba(255,255,255,0.08)" }}
                    aria-label="Upload PDF"
                  >
                    {uploading === pub.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Upload className="h-3.5 w-3.5" />}
                    {pub.pdf_url ? "Replace PDF" : "Upload PDF"}
                  </button>
                  <input
                    ref={(el) => { fileRefs.current[`quick-${pub.id}`] = el; }}
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadExistingPdf(pub, f); }}
                  />
                  <button onClick={() => { setEditingId(pub.id); setEditForm({ title: pub.title, volume: pub.volume, period: pub.period, year: pub.year }); }} className="rounded-lg p-2 transition hover:opacity-80" style={{ background: "rgba(184,134,11,0.15)", color: "#d4a843" }} aria-label="Edit">
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button onClick={() => deletePub(pub.id)} className="rounded-lg p-2 transition hover:opacity-80" style={{ background: "rgba(220,38,38,0.15)", color: "#f87171" }} aria-label="Delete">
                    <Trash2 className="h-4 w-4" />
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

// ─── Settings Tab ──────────────────────────────────────────────────────────────

function SettingsTab({ showToast }: { showToast: (m: string, t?: "success" | "error") => void }) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [saving, setSaving] = useState(false);

  async function handleChangePassword(e: FormEvent) {
    e.preventDefault();
    if (newPassword.length < 4) return showToast("Password must be at least 4 characters.", "error");
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
      <h1 className="text-2xl font-semibold" style={{ color: "#f5f0e8" }}>Settings</h1>

      <Section title="Change Password">
        <form onSubmit={handleChangePassword} className="space-y-4">
          <div className="relative">
            <InputRow label="New Password" value={newPassword} onChange={setNewPassword} type={showPw ? "text" : "password"} placeholder="Enter new password" />
          </div>
          <div className="relative">
            <InputRow label="Confirm New Password" value={confirmPassword} onChange={setConfirmPassword} type={showPw ? "text" : "password"} placeholder="Repeat new password" />
          </div>
          <label className="flex cursor-pointer items-center gap-2 text-sm" style={{ color: "#6b6450" }}>
            <input type="checkbox" checked={showPw} onChange={(e) => setShowPw(e.target.checked)} className="rounded" />
            Show passwords
          </label>
          <SaveBtn onClick={() => {}} loading={saving} />
        </form>
        <p className="mt-3 text-xs" style={{ color: "#3d3728" }}>
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
      <Loader2 className="h-8 w-8 animate-spin" style={{ color: "#b8860b" }} />
    </div>
  );
}
