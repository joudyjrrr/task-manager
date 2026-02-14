import React, { useCallback, useMemo, useState, type JSX } from "react";

type Props = {
    onAdd: (title: string, description?: string) => void;
};

export default function TaskForm({ onAdd }: Props): JSX.Element {
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [touched, setTouched] = useState<boolean>(false);

    const titleError = useMemo(() => {
        if (!touched) return "";
        const v = title.trim();
        if (!v) return "Please enter a title.";
        if (v.length < 2) return "Title must be at least 2 characters.";
        return "";
    }, [title, touched]);

    const canSubmit = useMemo(() => title.trim().length >= 2, [title]);

    const submit = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            setTouched(true);
            if (!canSubmit) return;

            onAdd(title, description);
            setTitle("");
            setDescription("");
            setTouched(false);
        },
        [canSubmit, onAdd, title, description]
    );

    return (
        <form onSubmit={submit} className="space-y-3">
            <div className="space-y-1.5">
                <label className="text-sm text-slate-300">
                    Title <span className="text-rose-300">*</span>
                </label>

                <div className="group relative">
                    <input
                        value={title}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                        onBlur={() => setTouched(true)}
                        placeholder="e.g. Prepare weekly report"
                        className={[
                            "relative w-full rounded-2xl border bg-black/20 px-3 py-2.5 text-sm outline-none",
                            "border-white/10 focus:border-white/25",
                            "placeholder:text-slate-500",
                            titleError ? "border-rose-400/60" : "",
                        ].join(" ")}
                    />
                </div>

                {titleError && (
                    <p className="text-xs text-rose-300">{titleError}</p>
                )}
            </div>

            <div className="space-y-1.5">
                <label className="text-sm text-slate-300">Description</label>
                <textarea
                    value={description}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
                    placeholder="Optional details..."
                    rows={4}
                    className="w-full resize-none rounded-2xl border border-white/10 bg-black/20 px-3 py-2.5 text-sm outline-none placeholder:text-slate-500 focus:border-white/25"
                />
            </div>

            <button
                type="submit"
                disabled={!canSubmit}
                className="w-full rounded-lg bg-blue-800 px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
                Add Task
            </button>

           
        </form>
    );
}
