import React, { type JSX } from "react";
import type { Task } from "../types";
import TaskItem from "./TaskItem";

type Props = {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (task: Task) => void;
};

export default function TaskList({ tasks, onToggle, onDelete }: Props): JSX.Element {
  if (!tasks.length) {
    return (
      <div className="rounded-3xl border border-white/10 bg-black/20 p-6">
        <div className="flex items-start gap-4">
          <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/5">
            ✨
          </div>
          <div>
            <p className="font-semibold">Nothing here yet</p>
            <p className="mt-1 text-sm text-slate-300">
              Add a new task to get started — your list will appear here.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </ul>
  );
}
