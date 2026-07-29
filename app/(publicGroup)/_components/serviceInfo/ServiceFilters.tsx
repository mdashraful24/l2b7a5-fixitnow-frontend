"use client";

import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";
import { ICategory } from "@/lib/type";

interface ServiceFiltersProps {
    categories: ICategory[];
}

export function ServiceFilters({ categories }: ServiceFiltersProps) {
    const pathName = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();
    const debouncedReference = useRef<ReturnType<typeof setTimeout> | null>(null);

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

    return (
        <div className="space-y-6">
            <div>
                <h3 className="mb-4 text-lg font-semibold">Categories</h3>
                <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                        <input
                            type="radio"
                            id="cat-all"
                            name="category"
                            value=""
                            defaultChecked={!searchParams.get("category")}
                            onChange={(e) => updateFilter("category", e.target.value)}
                            className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                        />
                        <label htmlFor="cat-all" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
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
                                defaultChecked={searchParams.get("category") === cat.name}
                                onChange={(e) => updateFilter("category", e.target.value)}
                                className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                            />
                            <label htmlFor={`cat-${cat.id}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                {cat.name}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="mb-4 text-lg font-semibold">Price Range</h3>
                <div className="flex items-center gap-2">
                    <Input
                        type="number"
                        placeholder="Min"
                        defaultValue={searchParams.get("minPrice") || ""}
                        onChange={(e) => updateFilter("minPrice", e.target.value)}
                        className="w-full"
                    />
                    <span className="text-muted-foreground">-</span>
                    <Input
                        type="number"
                        placeholder="Max"
                        defaultValue={searchParams.get("maxPrice") || ""}
                        onChange={(e) => updateFilter("maxPrice", e.target.value)}
                        className="w-full"
                    />
                </div>
            </div>

            <div>
                <h3 className="mb-4 text-lg font-semibold">Minimum Rating</h3>
                <div className="space-y-3">
                    {[5, 4, 3, 2, 1].map((rating) => (
                        <div key={rating} className="flex items-center space-x-2">
                            <input
                                type="radio"
                                id={`rating-${rating}`}
                                name="rating"
                                value={rating.toString()}
                                defaultChecked={searchParams.get("rating") === rating.toString()}
                                onChange={(e) => updateFilter("rating", e.target.value)}
                                className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                            />
                            <label htmlFor={`rating-${rating}`} className="flex items-center text-sm font-medium leading-none">
                                {rating} Star{rating > 1 ? "s" : ""}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
            
            <div>
                <h3 className="mb-4 text-lg font-semibold">Location</h3>
                <Input
                    placeholder="Enter city or area..."
                    defaultValue={searchParams.get("location") || ""}
                    onChange={(e) => updateFilter("location", e.target.value)}
                    className="w-full"
                />
            </div>
        </div>
    );
}
