"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Trash2 } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { ActionForm } from "@/components/actions/action-form";
import { Button } from "@/components/ui/button";
import { DEMO_ACTIONS, isDemoMode } from "@/lib/demo-store";
import type { Action } from "@/types";

export default function ActionDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [action, setAction] = useState<Action | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isDemoMode()) {
      setAction(DEMO_ACTIONS.find((a) => a.id === id) ?? null);
      setLoading(false);
      return;
    }
    fetch(`/api/actions/${id}`).then((r) => r.json()).then((d: Action) => setAction(d)).catch(() => {}).finally(() => setLoading(false));
  }, [id]);

  async function handleSave(data: Partial<Action>) {
    if (isDemoMode()) { router.push("/actions"); return; }
    await fetch(`/api/actions/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    router.push("/actions");
  }

  async function handleDelete() {
    if (!confirm("Delete this action?")) return;
    if (isDemoMode()) { router.push("/actions"); return; }
    await fetch(`/api/actions/${id}`, { method: "DELETE" });
    router.push("/actions");
  }

  if (loading) return <><Header title="Action" /><div className="p-6 h-32 bg-white rounded-[8px] border border-[#e5e4e2] animate-pulse m-6" /></>;
  if (!action) return <><Header title="Action" /><div className="p-6 text-sm text-[#78716c]">Action not found.</div></>;

  return (
    <>
      <Header title="Edit Action" />
      <div className="p-4 sm:p-6 max-w-xl">
        <Link href="/actions" className="flex items-center gap-1 text-sm text-[#78716c] hover:text-[#1c1917] mb-4">
          <ArrowLeft className="w-4 h-4" /> Back to actions
        </Link>
        <div className="bg-white rounded-[8px] border border-[#e5e4e2] p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-base font-semibold text-[#1c1917]">Edit action</h2>
            <Button variant="danger" size="sm" onClick={handleDelete}>
              <Trash2 className="w-4 h-4" /> Delete
            </Button>
          </div>
          <ActionForm initialData={action} onSave={handleSave} onCancel={() => router.push("/actions")} />
        </div>
      </div>
    </>
  );
}
