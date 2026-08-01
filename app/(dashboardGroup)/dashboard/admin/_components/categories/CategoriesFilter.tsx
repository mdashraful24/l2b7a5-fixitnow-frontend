"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { useState, useRef } from "react";

export function CategoriesFilter() {
    const pathName = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();

    const currentSearchTerm = searchParams.get("searchTerm") || "";
    const currentStatus = searchParams.get("isActive") || "";

    const [searchTerm, setSearchTerm] = useState(currentSearchTerm);
    const debouncedReference = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleSearchChange = (value: string) => {
        setSearchTerm(value);

        if (debouncedReference.current) {
            clearTimeout(debouncedReference.current);
        }

        debouncedReference.current = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString());

            if (value) {
                params.set("searchTerm", value);
            } else {
                params.delete("searchTerm");
            }

            router.replace(`${pathName}?${params.toString()}`);
        }, 500);
    };

    const handleStatusFilter = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (value === currentStatus) {
            params.delete("isActive");
        } else if (value) {
            params.set("isActive", value);
        } else {
            params.delete("isActive");
        }

        router.replace(`${pathName}?${params.toString()}`);
    };

    // const clearFilters = () => {
    //     setSearchTerm("");
    //     router.replace(pathName);
    // };

    // const hasFilters = currentSearchTerm || currentStatus;

    // Status options
    const statusOptions = [
        { value: "", label: "All Status" },
        { value: "true", label: "Active" },
        { value: "false", label: "Inactive" }
    ];

    return (
        <div className="space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center lg:gap-10">
                {/* Search Input */}
                <div className="relative flex-1 min-w-50">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        placeholder="Search categories by name..."
                        className="w-full rounded-lg border border-input bg-background pl-9 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors"
                    />
                    {searchTerm && (
                        <button
                            onClick={() => handleSearchChange("")}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    )}
                </div>

                {/* Status Filter */}
                <div className="flex items-center gap-2">
                    {/* <span className="text-sm text-muted-foreground whitespace-nowrap">Status:</span> */}
                    <div className="flex rounded-lg border border-input overflow-hidden">
                        {statusOptions.map((option) => (
                            <button
                                key={option.value}
                                onClick={() => handleStatusFilter(option.value)}
                                className={`px-3 py-2 text-sm font-medium transition-colors cursor-pointer ${option.value !== statusOptions[0].value ? 'border-l border-input' : ''
                                    } ${currentStatus === option.value
                                        ? "bg-primary text-primary-foreground"
                                        : "bg-background hover:bg-muted/50 text-foreground"
                                    }`}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Clear Filters */}
                {/* {hasFilters && (
                    <button
                        onClick={clearFilters}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-colors"
                    >
                        <X className="h-4 w-4" />
                        Clear Filters
                    </button>
                )} */}
            </div>

            {/* Active Filters Display */}
            {/* {hasFilters && (
                <div className="flex flex-wrap items-center gap-2 text-sm">
                    <span className="text-muted-foreground">Filters applied:</span>
                    {currentSearchTerm && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-primary/10 text-primary rounded-full text-xs">
                            Search: {currentSearchTerm}
                        </span>
                    )}
                    {currentStatus && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-primary/10 text-primary rounded-full text-xs">
                            Status: {currentStatus === "true" ? "Active" : "Inactive"}
                        </span>
                    )}
                </div>
            )} */}
        </div>
    );
}
