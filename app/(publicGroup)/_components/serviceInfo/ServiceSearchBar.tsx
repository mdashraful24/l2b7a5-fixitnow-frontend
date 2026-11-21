"use client";

import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export function ServiceSearchBar({ initialValue = "" }: { initialValue?: string }) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();
    const [value, setValue] = useState(initialValue);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    const commit = (nextValue: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (nextValue.trim()) {
            params.set("searchTerm", nextValue.trim());
        } else {
            params.delete("searchTerm");
        }

        router.replace(`${pathname}?${params.toString()}`);
    };

    const handleChange = (nextValue: string) => {
        setValue(nextValue);

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            commit(nextValue);
        }, 500);
    };

    const clearSearch = () => {
        setValue("");

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        commit("");
    };

    return (
        <div className="relative w-full">
            <div className="pointer-events-none absolute top-1/2 left-4 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Search className="size-4.5" />
            </div>
            <Input
                type="search"
                value={value}
                onChange={(event) => handleChange(event.target.value)}
                placeholder="Search by service, category, or location..."
                aria-label="Search services"
                className="h-13 rounded-2xl border-border/60 bg-background/95 p-6 text-base shadow-lg shadow-black/5 backdrop-blur-sm focus-visible:border-primary/60 focus-visible:ring-primary/20 dark:bg-card/90"
            />
            {/* {value && (
                <button
                    type="button"
                    onClick={clearSearch}
                    aria-label="Clear search"
                    className="absolute top-1/2 right-4 flex size-8 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:outline-none"
                >
                    <X className="size-4" />
                </button>
            )} */}
        </div>
    );
}
