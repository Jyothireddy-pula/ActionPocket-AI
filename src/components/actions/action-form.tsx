"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import type { Action } from "@/types";

interface ActionFormProps {
  initialData?: Partial<Action>;
  onSave: (data: Partial<Action>) => Promise<void>;
  onCancel: () => void;
}

export function ActionForm({ initialData, onSave, onCancel }: ActionFormProps) {
  const [title, setTitle] = useState(initialData?.title ?? "");
  const [description, setDescription] = useState(initialData?.description ?? "");
  const [priority, setPriority] = useState<Action["priority"]>(initialData?.priority ?? "medium");
  const [status, setStatus] = useState<Action["status"]>(initialData?.status ?? "pending");
  const [dueDate, setDueDate] = useState(initialData?.due_date ?? "");
  const [tags, setTags] = useState((initialData?.tags ?? []).join(", "));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) { setError("Title is required"); return; }
    setLoading(true);
    try {
      await onSave({
        title: title.trim(),
        description: description.trim() || null,
        priority: priority as Action["priority"],
        status: status as Action["status"],
        due_date: dueDate || null,
        tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
      });
    } catch {
      setError("Failed to save action");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">{error}</div>}
      <Input label="Title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="What needs to be done?" required />
      <Textarea label="Description (optional)" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Add more context..." rows={3} />
      <div className="grid grid-cols-2 gap-3">
        <Select label="Priority" value={priority} onChange={(e) => setPriority(e.target.value as Action["priority"])} options={[
          { value: "low", label: "Low" },
          { value: "medium", label: "Medium" },
          { value: "high", label: "High" },
          { value: "urgent", label: "Urgent" },
        ]} />
        <Select label="Status" value={status} onChange={(e) => setStatus(e.target.value as Action["status"])} options={[
          { value: "pending", label: "Pending" },
          { value: "in_progress", label: "In progress" },
          { value: "completed", label: "Completed" },
          { value: "cancelled", label: "Cancelled" },
        ]} />
      </div>
      <Input label="Due date (optional)" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
      <Input label="Tags (comma-separated)" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="work, urgent, review" />
      <div className="flex gap-2 pt-2">
        <Button type="submit" loading={loading}>{initialData?.id ? "Save changes" : "Create action"}</Button>
        <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
      </div>
    </form>
  );
}
