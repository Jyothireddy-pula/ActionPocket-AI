"use client";

import { useState, useEffect } from "react";
import { CalendarClock } from "lucide-react";
import { Header } from "@/components/layout/header";
import { ActionCard } from "@/components/actions/action-card";
import { DEMO_ACTIONS, isDemoMode } from "@/lib/demo-store";
import type { Action } from "@/types";
import { isFuture, isToday } from "date-fns";

export default function UpcomingPage() {
  const [actions, setActions] = useState<Action[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isDemoMode()) {
      setActions(DEMO_ACTIONS.filter((a) => a.due_date && isFuture(new Date(a.due_date)) && !isToday(new Date(a.due_date)) && a.status !== "completed"));
      setLoading(false);
      return;
    }
    fetch("/api/actions?filter=upcoming").then((r) => r.json()).then((d: Action[]) => setActions(d)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  async function handleToggle(id: string, done: boolean) {
    if (isDemoMode()) { setActions((p) => p.map((a) => a.id === id ? { ...a, status: done ? "completed" : "pending" } : a)); return; }
    await fetch(`/api/actions/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status: done ? "completed" : "pending" }) });
    setActions((p) => p.map((a) => a.id === id ? { ...a, status: done ? "completed" : "pending" } : a));
  }

  return (
    <>
      <Header title="Upcoming" />
      <div className="p-4 sm:p-6">
        {loading ? <div className="h-20 bg-white rounded-[8px] border border-[#e5e4e2] animate-pulse" /> :
          actions.length === 0 ? (
            <div className="text-center py-16 text-sm text-[#78716c]">
              <CalendarClock className="w-10 h-10 mx-auto mb-2 text-[#e5e4e2]" />
              <p>No upcoming actions</p>
            </div>
          ) : (
            <div className="space-y-2">
              {actions.map((a) => <ActionCard key={a.id} action={a} onToggle={handleToggle} />)}
            </div>
          )}
      </div>
    </>
  );
}
