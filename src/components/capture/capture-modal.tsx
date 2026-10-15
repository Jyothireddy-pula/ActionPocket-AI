"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { ExtractionResult } from "@/lib/ai/types";
import { ExtractionReview } from "./extraction-review";

interface CaptureModalProps {
  open: boolean;
  onClose: () => void;
  onSave?: (actions: Partial<import("@/types").Action>[]) => void;
}

export function CaptureModal({ open, onClose, onSave }: CaptureModalProps) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ExtractionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleExtract() {
    if (!text.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/captures", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await res.json() as { extraction?: ExtractionResult; error?: string };
      if (!res.ok) throw new Error(data.error ?? "Extraction failed");
      setResult(data.extraction ?? null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  function handleClose() {
    setText("");
    setResult(null);
    setError(null);
    onClose();
  }

  return (
    <Modal open={open} onClose={handleClose} title="Capture & extract actions">
      {!result ? (
        <div className="space-y-4">
          <p className="text-sm text-[#78716c]">
            Paste any text — email, meeting notes, Slack message — and AI will extract action items.
          </p>
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your text here..."
            rows={8}
          />
          {error && <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">{error}</div>}
          <div className="flex gap-2">
            <Button onClick={handleExtract} loading={loading} disabled={!text.trim()}>
              Extract actions
            </Button>
            <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          </div>
        </div>
      ) : (
        <ExtractionReview
          result={result}
          onSave={(actions) => { onSave?.(actions); handleClose(); }}
          onBack={() => setResult(null)}
        />
      )}
    </Modal>
  );
}
