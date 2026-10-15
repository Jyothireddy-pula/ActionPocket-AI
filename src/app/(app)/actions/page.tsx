"use client";

import { useState, useEffect, useMemo } from "react";
import { Plus, ListTodo } from "lucide-react";
import { Header } from "@/components/layout/header";
import { ActionCard } from "@/components/actions/action-card";
import { ActionFilters } from "@/components/actions/action-filters";
import { ActionForm } from "@/components/actions/action-form";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { DEMO_ACTIONS, isDemoMode } from "@/lib/demo-store";
import type { Action } from "@/types";

export default function ActionsPage() {
  const [actions, setActions] = useState<Action[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [createOpen, setCreateOpen] = useState(false);

  useEffect(() => {
    if (isDemoMode()) { setActions(DEMO_ACTIONS); setLoading(false); return; }
    fetch("/api/actions").then((r) => r.json()).then((d: Action[]) => setActions(d)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    return actions.filter((a) => {
      if (search && !a.title.toLowerCase().includes(search.toLowerCase())) return false;
      if (status && a.status !== status) return false;
      if (priority && a.priority !== priority) return false;
      return true;
    });
  }, [actions, search, status, priority]);

  async function handleToggle(id: string, done: boolean) {
    if (isDemoMode()) { setActions((p) => p.map((a) => a.id === id ? { ...a, status: done ? "completed" : "pending" } : a)); return; }
    await fetch(`/api/actions/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status: done ? "completed" : "pending" }) });
    setActions((p) => p.map((a) => a.id === id ? { ...a, status: done ? "completed" : "pending" } : a));
  }

  async function handleCreate(data: Partial<Action>) {
    if (isDemoMode()) {
      const newAction: Action = {
        id: `demo-${Date.now()}`,
        user_id: "demo-user",
        capture_id: null,
        title: data.title!,
        description: data.description ?? null,
        priority: data.priority ?? "medium",
        status: data.status ?? "pending",
        due_date: data.due_date ?? null,
        tags: data.tags ?? [],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      setActions((p) => [newAction, ...p]);
      setCreateOpen(false);
      return;
    }
    const res = await fetch("/api/actions", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    const created = await res.json() as Action;
    setActions((p) => [created, ...p]);
    setCreateOpen(false);
  }

  return (
    <>
      <Header title="All Actions" />
      <div className="p-4 sm:p-6 space-y-4">
        {isDemoMode() && (
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">Demo mode — sample data shown</div>
        )}
        <div className="flex flex-col sm:flex-row gap-3 justify-between">
          <ActionFilters search={search} onSearchChange={setSearch} status={status} onStatusChange={setStatus} priority={priority} onPriorityChange={setPriority} />
          <Button size="sm" onClick={() => setCreateOpen(true)}>
            <Plus className="w-4 h-4" /> New action
          </Button>
        </div>
        {loading ? (
          <div className="space-y-2">{[1, 2, 3].map((i) => <div key={i} className="h-16 bg-white rounded-[8px] border border-[#e5e4e2] animate-pulse" />)}</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-sm text-[#78716c]">
            <ListTodo className="w-10 h-10 mx-auto mb-2 text-[#e5e4e2]" />
            <p>{search || status || priority ? "No actions match your filters" : "No actions yet"}</p>
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map((a) => <ActionCard key={a.id} action={a} onToggle={handleToggle} />)}
          </div>
        )}
      </div>
      <Modal open={createOpen} onClose={() => setCreateOpen(false)} title="New action">
        <ActionForm onSave={handleCreate} onCancel={() => setCreateOpen(false)} />
      </Modal>
    </>
  );
}
