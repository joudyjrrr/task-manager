import React, { useEffect, type JSX } from "react";

type Props = {
  open: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  danger?: boolean;
};

export default function ConfirmDialog({
  open,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  danger = false,
}: Props): JSX.Element | null {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel?.();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center px-4">
      {/* overlay */}
      <button aria-label="Close" onClick={onCancel} className="fixed inset-0 bg-black/70" />

      {/* modal */}
      <div
        role="dialog"
        aria-modal="true"
        className="relative z-10 w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-slate-900/95 shadow-2xl backdrop-blur"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-b border-white/10 p-5">
          <div className="flex items-start gap-3">
            <div
              className={[
                "grid h-10 w-10 place-items-center rounded-2xl border",
                danger
                  ? "border-rose-400/30 bg-rose-400/10 text-rose-100"
                  : "border-white/10 bg-white/5 text-slate-100",
              ].join(" ")}
            >
              {danger ? "!" : "i"}
            </div>
            <div>
              <h3 className="text-base font-semibold">{title}</h3>
              <p className="mt-1 text-sm text-slate-300">{message}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 p-5">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm transition hover:bg-white/10"
          >
            {cancelText}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className={[
              "rounded-2xl px-4 py-2 text-sm font-semibold transition",
              danger
                ? "border border-rose-400/30 bg-rose-400/10 text-rose-100 hover:bg-rose-400/15"
                : "border border-white/10 bg-white/10 hover:bg-white/15",
            ].join(" ")}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
