"use client";

import { useState, useEffect } from "react";
import { CalendarDays, Clock, AlertTriangle, CheckCircle2, Plus } from "lucide-react";
import { Header } from "@/components/layout/header";
import { StatsCard } from "@/components/ui/stats-card";
import { ActionCard } from "@/components/actions/action-card";
import { CaptureModal } from "@/components/capture/capture-modal";
import { Button } from "@/components/ui/button";
import { DEMO_ACTIONS, isDemoMode } from "@/lib/demo-store";
import type { Action } from "@/types";
import { isToday, isPast, isFuture } from "date-fns";

export default function DashboardPage() {
  const [actions, setActions] = useState<Action[]>([]);
  const [captureOpen, setCaptureOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (isDemoMode()) {
        setActions(DEMO_ACTIONS);
        setLoading(false);
        return;
      }
      try {
        const res = await fetch("/api/actions");
        if (res.ok) {
          const data = await res.json() as Action[];
          setActions(data);
        }
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    }
    void load();
  }, []);

  const todayActions = actions.filter(
    (a) => a.due_date && isToday(new Date(a.due_date)) && a.status !== "completed"
  );
  const upcoming = actions.filter(
    (a) => a.due_date && isFuture(new Date(a.due_date)) && !isToday(new Date(a.due_date)) && a.status !== "completed"
  );
  const overdue = actions.filter(
    (a) => a.due_date && isPast(new Date(a.due_date)) && !isToday(new Date(a.due_date)) && a.status !== "completed"
  );
  const completed = actions.filter((a) => a.status === "completed");

  async function handleToggle(id: string, done: boolean) {
    if (isDemoMode()) {
      setActions((prev) =>
        prev.map((a) => a.id === id ? { ...a, status: done ? "completed" : "pending" } : a)
      );
      return;
    }
    await fetch(`/api/actions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: done ? "completed" : "pending" }),
    });
    setActions((prev) =>
      prev.map((a) => a.id === id ? { ...a, status: done ? "completed" : "pending" } : a)
    );
  }

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <>
      <Header title="Dashboard" />
      <div className="p-4 sm:p-6 space-y-6">
        {isDemoMode() && (
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">
            Demo mode — showing sample data. Configure Supabase in .env.local to use real data.
          </div>
        )}
        <div>
          <h2 className="text-xl font-bold text-[#1c1917]">{greeting} 👋</h2>
          <p className="text-sm text-[#78716c] mt-0.5">Here&apos;s what&apos;s on your plate today</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatsCard title="Today" value={todayActions.length} icon={<CalendarDays className="w-4 h-4" />} href="/dashboard/today" color="indigo" />
          <StatsCard title="Upcoming" value={upcoming.length} icon={<Clock className="w-4 h-4" />} href="/dashboard/upcoming" color="yellow" />
          <StatsCard title="Overdue" value={overdue.length} icon={<AlertTriangle className="w-4 h-4" />} href="/dashboard/overdue" color="red" />
          <StatsCard title="Completed" value={completed.length} icon={<CheckCircle2 className="w-4 h-4" />} href="/dashboard/completed" color="green" />
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-[#1c1917]">Today&apos;s actions</h3>
            <Button size="sm" variant="secondary" onClick={() => setCaptureOpen(true)}>
              <Plus className="w-3.5 h-3.5" />
              Add
            </Button>
          </div>
          {loading ? (
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-16 bg-white rounded-[8px] border border-[#e5e4e2] animate-pulse" />
              ))}
            </div>
          ) : todayActions.length === 0 ? (
            <div className="text-center py-10 text-sm text-[#78716c]">
              <CalendarDays className="w-8 h-8 mx-auto mb-2 text-[#e5e4e2]" />
              No actions due today
            </div>
          ) : (
            <div className="space-y-2">
              {todayActions.map((action) => (
                <ActionCard key={action.id} action={action} onToggle={handleToggle} />
              ))}
            </div>
          )}
        </div>
      </div>
      <CaptureModal open={captureOpen} onClose={() => setCaptureOpen(false)} />
    </>
  );
}
