"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ICategory } from "@/lib/type";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { DollarSign, FilterX, Star, Tag } from "lucide-react";
import { ReactNode, useRef, useState } from "react";

interface ServiceFiltersProps {
    categories: ICategory[];
}

function FilterSection({
    title,
    icon,
    children
}: {
    title: string;
    icon: ReactNode;
    children: ReactNode;
}) {
    return (
        <section className="border-b border-border/70 pb-5 last:border-0 last:pb-0">
            <div className="mb-3 flex items-center gap-2">
                <span className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    {icon}
                </span>
                <h3 className="text-sm font-semibold text-foreground">{title}</h3>
            </div>
            {children}
        </section>
    );
}

export function ServiceFilters({ categories }: ServiceFiltersProps) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const [hoverRating, setHoverRating] = useState(0);
    const [minPriceText, setMinPriceText] = useState(searchParams.get("minPrice") || "");
    const [maxPriceText, setMaxPriceText] = useState(searchParams.get("maxPrice") || "");

    const rating = Number(searchParams.get("rating") || 0);
    const displayedRating = hoverRating || rating;

    const activeFilterKeys = ["category", "minPrice", "maxPrice", "rating"];
    const legacyFilterKeys = ["location"];
    const activeCount = activeFilterKeys.filter((key) => searchParams.get(key)).length;

    const setParam = (key: string, value: string, resetPage = true) => {
        const params = new URLSearchParams(searchParams.toString());

        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }

        if (resetPage) {
            params.delete("page");
        }

        router.replace(`${pathname}?${params.toString()}`);
    };

    const updateFilter = (key: string, value: string) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            setParam(key, value);
        }, 500);
    };

    const clearAllFilters = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        const params = new URLSearchParams(searchParams.toString());

        [...activeFilterKeys, ...legacyFilterKeys].forEach((key) => params.delete(key));
        params.delete("page");

        setMinPriceText("");
        setMaxPriceText("");

        router.replace(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="space-y-5">
            {activeCount > 0 && (
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={clearAllFilters}
                    className="w-full justify-center rounded-xl border-dashed text-muted-foreground hover:text-foreground"
                >
                    <FilterX className="size-4" />
                    Clear all filters
                    <span className="ml-0.5 rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold text-primary">
                        {activeCount}
                    </span>
                </Button>
            )}

            <FilterSection title="Categories" icon={<Tag className="size-4" />}>
                <div className="no-scrollbar max-h-64 space-y-1.5 overflow-y-auto pr-1">
                    <label
                        htmlFor="service-category-all"
                        className="flex cursor-pointer items-center gap-3 rounded-xl border border-transparent px-2.5 py-2 text-sm transition-colors hover:bg-muted/70 has-[:checked]:border-primary/25 has-[:checked]:bg-primary/10 has-[:checked]:text-primary"
                    >
                        <input
                            id="service-category-all"
                            type="radio"
                            name="service-category"
                            value=""
                            checked={!searchParams.get("category")}
                            onChange={(event) => setParam("category", event.target.value)}
                            className="size-4 accent-primary"
                        />
                        <span className="font-medium">All categories</span>
                    </label>

                    {categories.map((category) => (
                        <label
                            key={category.id}
                            htmlFor={`service-category-${category.id}`}
                            className="flex cursor-pointer items-center gap-3 rounded-xl border border-transparent px-2.5 py-2 text-sm transition-colors hover:bg-muted/70 has-[:checked]:border-primary/25 has-[:checked]:bg-primary/10 has-[:checked]:text-primary"
                        >
                            <input
                                id={`service-category-${category.id}`}
                                type="radio"
                                name="service-category"
                                value={category.name}
                                checked={searchParams.get("category") === category.name}
                                onChange={(event) => setParam("category", event.target.value)}
                                className="size-4 accent-primary"
                            />
                            <span className="truncate font-medium">{category.name}</span>
                        </label>
                    ))}
                </div>
            </FilterSection>

            <FilterSection title="Price range" icon={<DollarSign className="size-4" />}>
                <div className="flex items-center gap-2">
                    <Input
                        type="number"
                        min={0}
                        value={minPriceText}
                        onChange={(event) => {
                            setMinPriceText(event.target.value);
                            updateFilter("minPrice", event.target.value);
                        }}
                        placeholder="Min"
                        aria-label="Minimum price"
                        className="h-10 rounded-xl py-2 text-sm"
                    />
                    <span className="text-muted-foreground">—</span>
                    <Input
                        type="number"
                        min={0}
                        value={maxPriceText}
                        onChange={(event) => {
                            setMaxPriceText(event.target.value);
                            updateFilter("maxPrice", event.target.value);
                        }}
                        placeholder="Max"
                        aria-label="Maximum price"
                        className="h-10 rounded-xl py-2 text-sm"
                    />
                </div>
            </FilterSection>

            <FilterSection title="Minimum rating" icon={<Star className="size-4" />}>
                <div className="flex flex-wrap items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => {
                        const isFilled = star <= displayedRating;

                        return (
                            <button
                                key={star}
                                type="button"
                                onClick={() => {
                                    setParam("rating", rating === star ? "" : star.toString());
                                }}
                                onMouseEnter={() => setHoverRating(star)}
                                onMouseLeave={() => setHoverRating(0)}
                                aria-label={`${star} star${star > 1 ? "s" : ""} minimum rating`}
                                className="cursor-pointer rounded-lg p-1 transition-transform hover:scale-110 focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:outline-none"
                            >
                                <Star
                                    className={`size-5 transition-colors ${isFilled ? "fill-amber-400 text-amber-400" : "text-muted-foreground/40"}`}
                                />
                            </button>
                        );
                    })}
                    <span className="ml-1 text-xs font-medium text-muted-foreground">
                        {rating > 0 ? `${rating}+ stars` : "Any rating"}
                    </span>
                </div>
            </FilterSection>
        </div>
    );
}
