"use client";

import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet";
import { ICategory } from "@/lib/type";
import { SlidersHorizontal } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { ServiceFilters } from "./ServiceFilters";

const FILTER_KEYS = ["category", "minPrice", "maxPrice", "rating"];

export function ServiceFilterSheet({ categories }: { categories: ICategory[] }) {
    const [open, setOpen] = useState(false);
    const searchParams = useSearchParams();
    const activeCount = FILTER_KEYS.filter((key) => searchParams.get(key)).length;

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button
                    type="button"
                    variant="outline"
                    className="h-10 rounded-xl border-border/70 bg-background px-3.5 shadow-xs hover:bg-muted/50 dark:bg-card"
                >
                    <SlidersHorizontal className="size-4" />
                    Filters
                    {activeCount > 0 && (
                        <span className="ml-0.5 flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
                            {activeCount}
                        </span>
                    )}
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="gap-0 p-0">
                <SheetHeader className="border-b border-border/70 pr-12">
                    <SheetTitle>Refine services</SheetTitle>
                    <SheetDescription>Narrow results by price, category, and rating.</SheetDescription>
                </SheetHeader>
                <div className="min-h-0 flex-1 overflow-y-auto px-5 py-6">
                    <ServiceFilters categories={categories} />
                </div>
                <div className="border-t border-border/70 p-4">
                    <Button type="button" className="w-full rounded-xl" onClick={() => setOpen(false)}>
                        Show results
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    );
}
