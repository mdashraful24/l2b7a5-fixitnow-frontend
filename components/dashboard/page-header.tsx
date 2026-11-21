import type { ReactNode } from "react";

type PageHeaderProps = {
    eyebrow: string;
    title: string;
    description?: string;
    actions?: ReactNode;
};

export function PageHeader({ eyebrow, title, description, actions }: PageHeaderProps) {
    return (
        <section className="flex flex-col gap-4 border-b border-border/70 pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0 space-y-1.5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">{eyebrow}</p>
                <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">{title}</h1>
                {description && <p className="text-sm text-muted-foreground">{description}</p>}
            </div>
            {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
        </section>
    );
}
