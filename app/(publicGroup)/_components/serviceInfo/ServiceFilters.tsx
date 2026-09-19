"use client";

import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import { ICategory } from "@/lib/type";
import { Button } from "@/components/ui/button";
import { Star, FilterX } from "lucide-react";

interface ServiceFiltersProps {
    categories: ICategory[];
}

export function ServiceFilters({ categories }: ServiceFiltersProps) {
    const pathName = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();
    const debouncedReference = useRef<ReturnType<typeof setTimeout> | null>(null);

    const [hoverRating, setHoverRating] = useState(0);

    const [locationText, setLocationText] = useState(
        () => searchParams.get("location") || ""
    );
    const [minPriceText, setMinPriceText] = useState(
        () => searchParams.get("minPrice") || ""
    );
    const [maxPriceText, setMaxPriceText] = useState(
        () => searchParams.get("maxPrice") || ""
    );

    const rating = Number(searchParams.get("rating") || 0);

    const displayedRating = hoverRating || rating;

    const setRatingFilter = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (value) {
            params.set("rating", value);
        } else {
            params.delete("rating");
        }

        params.delete("page");

        router.replace(`${pathName}?${params.toString()}`);
    };

    const updateFilter = (key: string, value: string) => {
        if (debouncedReference.current) {
            clearTimeout(debouncedReference.current);
        }

        debouncedReference.current = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString());

            if (value) {
                params.set(key, value);
            } else {
                params.delete(key);
            }

            // Reset page on filter change
            params.delete("page");

            router.replace(`${pathName}?${params.toString()}`);
        }, 500);
    };

    const activeFilterKeys = [
        "location",
        "category",
        "minPrice",
        "maxPrice",
        "rating",
    ];

    const hasActiveFilters = activeFilterKeys.some((key) =>
        searchParams.get(key)
    );

    const clearAllFilters = () => {
        if (debouncedReference.current) {
            clearTimeout(debouncedReference.current);
        }

        const params = new URLSearchParams(searchParams.toString());

        activeFilterKeys.forEach((key) => params.delete(key));
        params.delete("page");

        setLocationText("");
        setMinPriceText("");
        setMaxPriceText("");

        router.replace(`${pathName}?${params.toString()}`);
    };

    return (
        <div className="space-y-6">
            {hasActiveFilters && (
                <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={clearAllFilters}
                >
                    <FilterX className="size-4" />
                    Clear All Filters
                </Button>
            )}

            <div>
                <h3 className="mb-2 font-semibold">Location</h3>
                <Input
                    placeholder="Enter city or area..."
                    value={locationText}
                    onChange={(e) => {
                        setLocationText(e.target.value);
                        updateFilter("location", e.target.value);
                    }}
                    className="w-full"
                />
            </div>

            <div>
                <h3 className="mb-3 font-semibold">Categories</h3>
                <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                        <input
                            type="radio"
                            id="cat-all"
                            name="category"
                            value=""
                            checked={!searchParams.get("category")}
                            onChange={(e) => updateFilter("category", e.target.value)}
                            className="h-4 w-4 border-gray-300 text-primary focus:ring-primary cursor-pointer"
                        />
                        <label htmlFor="cat-all" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
                            All Categories
                        </label>
                    </div>
                    {categories?.map((cat) => (
                        <div key={cat.id} className="flex items-center space-x-2">
                            <input
                                type="radio"
                                id={`cat-${cat.id}`}
                                name="category"
                                value={cat.name}
                                checked={searchParams.get("category") === cat.name}
                                onChange={(e) => updateFilter("category", e.target.value)}
                                className="h-4 w-4 border-gray-300 text-primary focus:ring-primary cursor-pointer"
                            />
                            <label htmlFor={`cat-${cat.id}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
                                {cat.name}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="mb-2 font-semibold">Price Range</h3>
                <div className="flex items-center gap-2">
                    <input
                        type="number"
                        placeholder="Min"
                        value={minPriceText}
                        onChange={(e) => {
                            setMinPriceText(e.target.value);
                            updateFilter("minPrice", e.target.value);
                        }}
                        className="w-full border border-gray-400 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    <span>-</span>
                    <input
                        type="number"
                        placeholder="Max"
                        value={maxPriceText}
                        onChange={(e) => {
                            setMaxPriceText(e.target.value);
                            updateFilter("maxPrice", e.target.value);
                        }}
                        className="w-full border border-gray-400 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                </div>
            </div>

            <div>
                <h3 className="mb-2 font-semibold">
                    Minimum Rating
                </h3>
                <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => {
                        const isFilled = star <= displayedRating;

                        return (
                            <button
                                key={star}
                                type="button"
                                onClick={() => {
                                    if (rating === star) {
                                        setRatingFilter("");
                                    } else {
                                        setRatingFilter(star.toString());
                                    }
                                }}
                                onMouseEnter={() => setHoverRating(star)}
                                onMouseLeave={() => setHoverRating(0)}
                                aria-label={`${star} star${star > 1 ? "s" : ""} minimum rating`}
                                className="cursor-pointer rounded-md p-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                            >
                                <Star
                                    className={`h-6 w-6 transition-colors duration-200 ${isFilled
                                        ? "fill-yellow-500 text-yellow-500"
                                        : "text-muted-foreground/40 hover:text-yellow-500"
                                        }`}
                                />
                            </button>
                        );
                    })}

                    {/* {rating > 0 && (
                        <span className="ml-1 text-sm font-medium text-muted-foreground">
                            Min {rating}★
                        </span>
                    )} */}
                </div>

                {/* <Button
                    type="button"
                    variant="outline"
                    className="mt-4 w-full"
                    onClick={() => {
                        setRatingFilter("");
                    }}
                >
                    Clear Rating
                </Button> */}
            </div>
        </div>
    );
}
