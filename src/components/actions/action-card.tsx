"use client";

import { CheckCircle, Circle, Clock, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Action, Priority } from "@/types";
import { format } from "date-fns";

interface ActionCardProps {
  action: Action;
  onToggle?: (id: string, completed: boolean) => void;
  onClick?: () => void;
}

const priorityLabels: Record<Priority, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
  urgent: "Urgent",
};

export function ActionCard({ action, onToggle, onClick }: ActionCardProps) {
  const isCompleted = action.status === "completed";

  return (
    <div
      className={`flex items-start gap-3 p-4 bg-white rounded-[8px] border border-[#e5e4e2] hover:shadow-sm transition-shadow ${onClick ? "cursor-pointer" : ""}`}
      onClick={onClick}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggle?.(action.id, !isCompleted);
        }}
        className="mt-0.5 flex-shrink-0 text-[#78716c] hover:text-indigo-600 transition-colors"
      >
        {isCompleted ? (
          <CheckCircle className="w-5 h-5 text-green-500" />
        ) : (
          <Circle className="w-5 h-5" />
        )}
      </button>
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium text-[#1c1917] ${isCompleted ? "line-through text-[#78716c]" : ""}`}>
          {action.title}
        </p>
        {action.description && (
          <p className="text-xs text-[#78716c] mt-0.5 truncate">{action.description}</p>
        )}
        <div className="flex flex-wrap items-center gap-2 mt-2">
          <Badge variant={action.priority}>{priorityLabels[action.priority]}</Badge>
          {action.due_date && (
            <span className="flex items-center gap-1 text-xs text-[#78716c]">
              <Clock className="w-3 h-3" />
              {format(new Date(action.due_date), "MMM d")}
            </span>
          )}
          {action.tags.map((tag) => (
            <span key={tag} className="flex items-center gap-1 text-xs text-[#78716c]">
              <Tag className="w-3 h-3" />
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
