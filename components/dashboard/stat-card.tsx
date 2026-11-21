import { ArrowDownRight, ArrowUpRight, type LucideIcon } from "lucide-react";

export type StatTone = "blue" | "emerald" | "amber" | "violet" | "rose" | "slate";

type StatCardProps = {
    label: string;
    value: string | number;
    icon: LucideIcon;
    tone?: StatTone;
    hint?: string;
    trend?: number;
};

const toneClasses: Record<StatTone, string> = {
    blue: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    emerald: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    amber: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    violet: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
    rose: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
    slate: "bg-slate-500/10 text-slate-600 dark:text-slate-400",
};

export function StatCard({ label, value, icon: Icon, tone = "blue", hint, trend }: StatCardProps) {
    const positive = (trend ?? 0) >= 0;

    return (
        <article className="rounded-xl border border-border/80 bg-card p-5 shadow-sm transition-shadow hover:shadow-md">
            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                        {label}
                    </p>
                    <p className="mt-3 truncate text-2xl font-semibold tracking-tight text-foreground">{value}</p>
                </div>
                <span className={`grid size-10 shrink-0 place-items-center rounded-lg ${toneClasses[tone]}`}>
                    <Icon className="size-5" />
                </span>
            </div>
            {(hint || trend !== undefined) && (
                <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                    {trend !== undefined && (
                        <span
                            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-medium ${
                                positive
                                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                    : "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                            }`}
                        >
                            {positive ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
                            {positive ? "+" : ""}
                            {trend}%
                        </span>
                    )}
                    {hint && <span className="truncate">{hint}</span>}
                </div>
            )}
        </article>
    );
}
