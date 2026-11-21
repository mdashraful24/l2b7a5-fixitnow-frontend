"use client";

import { ArrowUpDown, ChevronDown } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const SORT_OPTIONS = [
    { value: "newest", label: "Newest first" },
    { value: "price-low", label: "Price: low to high" },
    { value: "price-high", label: "Price: high to low" },
    { value: "duration", label: "Shortest duration" },
    { value: "title", label: "Name: A to Z" },
];

export function ServiceSort() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();
    const value = searchParams.get("sort") || "newest";

    const handleChange = (nextValue: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (nextValue === "newest") {
            params.delete("sort");
        } else {
            params.set("sort", nextValue);
        }

        params.delete("page");

        router.replace(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="relative min-w-0 flex-1 sm:w-52 sm:flex-none">
            <label htmlFor="service-sort" className="sr-only">
                Sort services
            </label>
            <ArrowUpDown className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
            <select
                id="service-sort"
                value={value}
                onChange={(event) => handleChange(event.target.value)}
                className="h-10 w-full cursor-pointer appearance-none rounded-xl border border-border/70 bg-background pr-9 pl-10 text-sm font-medium text-foreground shadow-xs outline-none transition-colors hover:bg-muted/50 focus-visible:border-primary/60 focus-visible:ring-2 focus-visible:ring-primary/20 dark:bg-card"
            >
                {SORT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <ChevronDown className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground" />
        </div>
    );
}
