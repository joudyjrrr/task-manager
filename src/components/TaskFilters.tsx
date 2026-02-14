import React, { type JSX } from "react";
import type { Filter } from "../types";

function Chip({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "rounded-full px-3 py-1.5 text-sm",
        "border border-white/10 transition",
        active
          ? "bg-white/15 text-slate-100 shadow-[0_0_0_1px_rgba(255,255,255,.06)]"
          : "bg-white/5 text-slate-200 hover:bg-white/10",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

type Props = {
  value: Filter;
  onChange: (v: Filter) => void;
};

export default function TaskFilters({ value, onChange }: Props): JSX.Element {
  return (
    <div className="flex flex-wrap gap-2">
      <Chip active={value === "all"} onClick={() => onChange("all")}>
        All
      </Chip>
      <Chip active={value === "active"} onClick={() => onChange("active")}>
        Uncompleted
      </Chip>
      <Chip active={value === "completed"} onClick={() => onChange("completed")}>
        Completed
      </Chip>
    </div>
  );
}
