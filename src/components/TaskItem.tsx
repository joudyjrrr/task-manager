import React, { useMemo, type JSX } from "react";
import type { Task } from "../types";

function formatDate(ts: number): string {
  try {
    return new Date(ts).toLocaleString();
  } catch {
    return "";
  }
}

type Props = {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (task: Task) => void;
};

export default function TaskItem({ task, onToggle, onDelete }: Props): JSX.Element {
  const created = useMemo(() => formatDate(task.createdAt), [task.createdAt]);

  return (
    <li
      className={[
        "group rounded-3xl border border-white/10 bg-black/20 p-4",
        "transition hover:border-white/15 hover:bg-black/25",
        task.completed ? "opacity-85" : "",
      ].join(" ")}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      
        <div className="flex items-start gap-3">
          <button
            type="button"
            onClick={() => onToggle(task.id)}
            className={[
              "mt-0.5 grid h-9 w-9 place-items-center rounded-2xl border transition",
              task.completed
                ? "border-emerald-300/25 bg-emerald-400/10"
                : "border-white/10 bg-white/5 hover:bg-white/10",
            ].join(" ")}
            aria-label="Toggle completed"
            title="Toggle completed"
          >
            {task.completed ? "✓" : "○"}
          </button>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <p
                className={[
                  "truncate font-semibold",
                  task.completed ? "text-slate-200 line-through decoration-white/20" : "",
                ].join(" ")}
              >
                {task.title}
              </p>

              <span className="text-xs text-slate-400">• {created}</span>

              {task.completed ? (
                <span className="rounded-full border border-emerald-300/30 bg-emerald-300/10 px-2 py-0.5 text-xs text-emerald-200">
                  Completed
                </span>
              ) : (
                <span className="rounded-full border border-sky-300/30 bg-sky-300/10 px-2 py-0.5 text-xs text-sky-200">
                  Active
                </span>
              )}
            </div>

            {task.description ? (
              <p className="mt-2 text-sm text-slate-300">{task.description}</p>
            ) : (
              <p className="mt-2 text-sm text-slate-500">No description.</p>
            )}
          </div>
        </div>

    
        <div className="flex flex-wrap gap-2 sm:justify-end">
          <button
            type="button"
            onClick={() => onToggle(task.id)}
            className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 transition hover:bg-white/10"
          >
            {task.completed ? "Mark active" : "Mark done"}
          </button>

          <button
            type="button"
            onClick={() => onDelete(task)}
            className="rounded-2xl border border-rose-400/30 bg-rose-400/10 px-3 py-2 text-sm text-rose-100 transition hover:bg-rose-400/15"
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  );
}
