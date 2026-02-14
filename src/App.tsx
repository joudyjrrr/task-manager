import React, { useCallback, useEffect, useMemo, useState, type JSX } from "react";
import TaskForm from "./components/TaskForm";
import TaskFilters from "./components/TaskFilters";
import TaskList from "./components/TaskList";
import ConfirmDialog from "./components/ConfirmDialog";
import type { Filter, Task } from "./types";

const STORAGE_KEY = "advanced_todos_v2_pretty_ts";

function makeId(): string {
  return `${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

type StatTone = "sky" | "fuchsia" | "emerald";

function StatCard({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: StatTone;
}) {
  const toneMap: Record<StatTone, string> = {
    sky: "from-sky-400/20 to-sky-400/5 text-sky-100",
    fuchsia: "from-fuchsia-400/20 to-fuchsia-400/5 text-fuchsia-100",
    emerald: "from-emerald-400/20 to-emerald-400/5 text-emerald-100",
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-center">
      <p className="text-xs text-slate-400">{label}</p>
      <p className="mt-1 text-xl font-bold text-slate-100">{value}</p>
    </div>
  );
}

export default function App(): JSX.Element {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<Filter>("all");
  const [deleteTarget, setDeleteTarget] = useState<Task | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed: unknown = JSON.parse(raw);
      if (Array.isArray(parsed)) {
    
        const safe = parsed.filter((x: any) => x && typeof x.id === "string");
        setTasks(safe as Task[]);
      }
    } catch {

    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = useCallback((title: string, description?: string) => {
    const newTask: Task = {
      id: makeId(),
      title: title.trim(),
      description: description?.trim() ? description.trim() : "",
      completed: false,
      createdAt: Date.now(),
    };
    setTasks((prev) => [newTask, ...prev]);
  }, []);

  const toggleTask = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }, []);

  const requestDelete = useCallback((task: Task) => setDeleteTarget(task), []);
  const cancelDelete = useCallback(() => setDeleteTarget(null), []);
  const confirmDelete = useCallback(() => {
    if (!deleteTarget) return;
    setTasks((prev) => prev.filter((t) => t.id !== deleteTarget.id));
    setDeleteTarget(null);
  }, [deleteTarget]);

  const filteredTasks = useMemo(() => {
    if (filter === "completed") return tasks.filter((t) => t.completed);
    if (filter === "active") return tasks.filter((t) => !t.completed);
    return tasks;
  }, [tasks, filter]);

  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    return { total, completed, active: total - completed };
  }, [tasks]);

  const completedPct = useMemo(() => {
    if (!stats.total) return 0;
    return Math.round((stats.completed / stats.total) * 100);
  }, [stats]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <div className="mx-auto w-full max-w-6xl px-4 py-4">
       
        <header className="mb-4 flex items-center gap-2">

          <div className="rounded-2xl flex-1 border border-white/10 bg-white/5 p-3">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-medium text-slate-300">Progress</p>
              <span className="rounded-lg bg-white/10 px-2.5 py-1 text-sm font-semibold text-slate-200">
                {completedPct}%
              </span>
            </div>

            <div className="mb-4 h-2 w-full overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-blue-500 transition-all duration-500"
                style={{ width: `${completedPct}%` }}
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <StatCard label="Total" value={stats.total} tone="sky" />
              <StatCard label="Active" value={stats.active} tone="fuchsia" />
              <StatCard label="Done" value={stats.completed} tone="emerald" />
            </div>
          </div>
        </header>

  
        <main className="grid grid-cols-1 gap-6 lg:grid-cols-3">
  
          <section className="rounded-2xl border border-white/10 bg-white/5 p-5 h-fit">
            <h2 className="mb-4 text-lg font-semibold text-slate-100">Add Task</h2>
            <TaskForm onAdd={addTask} />
          </section>

     
          <section className="rounded-2xl border border-white/10 bg-white/5 p-5 lg:col-span-2 h-[500px] overflow-auto">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-lg font-semibold text-slate-100">Tasks</h2>
              <TaskFilters value={filter} onChange={setFilter} />
            </div>

            <TaskList tasks={filteredTasks} onToggle={toggleTask} onDelete={requestDelete} />
          </section>
        </main>

     
        <ConfirmDialog
          open={!!deleteTarget}
          title="Delete task"
          message={deleteTarget ? `This will permanently delete “${deleteTarget.title}”.` : ""}
          confirmText="Yes, delete"
          cancelText="Keep it"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
          danger
        />
      </div>
    </div>
  );
}
