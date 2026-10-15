import { describe, it, expect } from "vitest";
import type { Action, Priority, ActionStatus } from "@/types";

function filterByStatus(actions: Action[], status: ActionStatus): Action[] {
  return actions.filter((a) => a.status === status);
}

function filterByPriority(actions: Action[], priority: Priority): Action[] {
  return actions.filter((a) => a.priority === priority);
}

function sortByDueDate(actions: Action[]): Action[] {
  return [...actions].sort((a, b) => {
    if (!a.due_date) return 1;
    if (!b.due_date) return -1;
    return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
  });
}

const mockActions: Action[] = [
  { id: "1", user_id: "u1", capture_id: null, title: "Task A", description: null, priority: "high", status: "pending", due_date: "2025-01-01", tags: [], created_at: "", updated_at: "" },
  { id: "2", user_id: "u1", capture_id: null, title: "Task B", description: null, priority: "low", status: "completed", due_date: "2025-01-05", tags: [], created_at: "", updated_at: "" },
  { id: "3", user_id: "u1", capture_id: null, title: "Task C", description: null, priority: "urgent", status: "pending", due_date: null, tags: ["work"], created_at: "", updated_at: "" },
];

describe("Action filtering", () => {
  it("filters by status", () => {
    const pending = filterByStatus(mockActions, "pending");
    expect(pending).toHaveLength(2);
    expect(pending.every((a) => a.status === "pending")).toBe(true);
  });

  it("filters completed actions", () => {
    const completed = filterByStatus(mockActions, "completed");
    expect(completed).toHaveLength(1);
    expect(completed[0].id).toBe("2");
  });

  it("filters by priority", () => {
    const urgent = filterByPriority(mockActions, "urgent");
    expect(urgent).toHaveLength(1);
    expect(urgent[0].title).toBe("Task C");
  });

  it("sorts by due date with nulls last", () => {
    const sorted = sortByDueDate(mockActions);
    expect(sorted[0].id).toBe("1");
    expect(sorted[sorted.length - 1].due_date).toBeNull();
  });
});
