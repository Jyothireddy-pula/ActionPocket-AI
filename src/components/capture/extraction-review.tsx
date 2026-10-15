"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle } from "lucide-react";
import type { ExtractionResult } from "@/lib/ai/types";
import type { Action, Priority } from "@/types";

interface ExtractionReviewProps {
  result: ExtractionResult;
  onSave: (actions: Partial<Action>[]) => void;
  onBack: () => void;
}

export function ExtractionReview({ result, onSave, onBack }: ExtractionReviewProps) {
  const [selected, setSelected] = useState<Set<number>>(
    new Set(result.actions.map((_, i) => i))
  );

  function toggleAction(i: number) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  }

  function handleSave() {
    const actions: Partial<Action>[] = result.actions
      .filter((_, i) => selected.has(i))
      .map((a) => ({
        title: a.title,
        description: a.description,
        priority: a.priority as Priority,
        due_date: a.due_date ?? null,
        tags: a.tags,
        status: "pending" as const,
      }));
    onSave(actions);
  }

  return (
    <div className="space-y-4">
      {result.summary && (
        <div className="flex items-start gap-2 p-3 bg-indigo-50 rounded-lg">
          <CheckCircle className="w-4 h-4 text-indigo-600 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-indigo-700">{result.summary}</p>
        </div>
      )}
      <p className="text-sm text-[#78716c]">
        Review and select which actions to save ({selected.size} of {result.actions.length} selected):
      </p>
      <div className="space-y-2 max-h-80 overflow-y-auto">
        {result.actions.map((action, i) => (
          <label
            key={i}
            className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${selected.has(i) ? "border-indigo-300 bg-indigo-50" : "border-[#e5e4e2] bg-white"}`}
          >
            <input
              type="checkbox"
              checked={selected.has(i)}
              onChange={() => toggleAction(i)}
              className="mt-0.5 accent-indigo-600"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[#1c1917]">{action.title}</p>
              {action.description && (
                <p className="text-xs text-[#78716c] mt-0.5">{action.description}</p>
              )}
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                <Badge variant={action.priority as Priority}>{action.priority}</Badge>
                {action.due_date && (
                  <Badge>Due: {action.due_date}</Badge>
                )}
                {action.uncertain_fields.length > 0 && (
                  <span className="flex items-center gap-1 text-xs text-amber-600">
                    <AlertCircle className="w-3 h-3" />
                    Uncertain: {action.uncertain_fields.join(", ")}
                  </span>
                )}
              </div>
            </div>
          </label>
        ))}
      </div>
      <div className="flex gap-2 pt-2">
        <Button onClick={handleSave} disabled={selected.size === 0}>
          Save {selected.size} action{selected.size !== 1 ? "s" : ""}
        </Button>
        <Button variant="secondary" onClick={onBack}>Back</Button>
      </div>
    </div>
  );
}
