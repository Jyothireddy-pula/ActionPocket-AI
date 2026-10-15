"use client";

import { useState, useEffect } from "react";
import { Inbox, Trash2 } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DEMO_CAPTURES, isDemoMode } from "@/lib/demo-store";
import type { Capture } from "@/types";
import { format } from "date-fns";

export default function InboxPage() {
  const [captures, setCaptures] = useState<Capture[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isDemoMode()) {
      setCaptures(DEMO_CAPTURES);
      setLoading(false);
      return;
    }
    fetch("/api/captures")
      .then((r) => r.json())
      .then((data: Capture[]) => setCaptures(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete(id: string) {
    if (isDemoMode()) {
      setCaptures((prev) => prev.filter((c) => c.id !== id));
      return;
    }
    await fetch(`/api/captures/${id}`, { method: "DELETE" });
    setCaptures((prev) => prev.filter((c) => c.id !== id));
  }

  return (
    <>
      <Header title="Inbox" />
      <div className="p-4 sm:p-6">
        {isDemoMode() && (
          <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">
            Demo mode — showing sample captures.
          </div>
        )}
        {loading ? (
          <div className="space-y-3">
            {[1, 2].map((i) => <div key={i} className="h-20 bg-white rounded-[8px] border border-[#e5e4e2] animate-pulse" />)}
          </div>
        ) : captures.length === 0 ? (
          <div className="text-center py-16 text-sm text-[#78716c]">
            <Inbox className="w-10 h-10 mx-auto mb-2 text-[#e5e4e2]" />
            <p>Your inbox is empty</p>
            <p className="text-xs mt-1">Use the Capture button to add text for extraction</p>
          </div>
        ) : (
          <div className="space-y-3">
            {captures.map((capture) => (
              <Card key={capture.id} className="p-4">
                <div className="flex items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[#1c1917] line-clamp-3">{capture.raw_text}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-[#78716c]">{format(new Date(capture.created_at), "MMM d, yyyy")}</span>
                      {capture.processed && (
                        <span className="text-xs text-green-600 font-medium">Processed</span>
                      )}
                    </div>
                  </div>
                  <Button size="sm" variant="ghost" onClick={() => handleDelete(capture.id)}>
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
