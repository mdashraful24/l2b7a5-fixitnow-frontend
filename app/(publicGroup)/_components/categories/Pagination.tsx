"use client";

import { PaginationProps } from "@/lib/type";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    itemLabel = "items"
}) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const handlePageChange = (page: number) => {
        if (page < 1 || page > totalPages || page === currentPage) {
            return;
        }

        const params = new URLSearchParams(searchParams.toString());
        params.set("page", page.toString());
        router.push(`${pathname}?${params.toString()}`);
    };

    if (totalPages <= 1) {
        return null;
    }

    const maxVisible = 5;
    const start = Math.max(1, Math.min(currentPage - Math.floor(maxVisible / 2), totalPages - maxVisible + 1));
    const end = Math.min(totalPages, Math.max(maxVisible, start + maxVisible - 1));
    const pages = Array.from({ length: end - start + 1 }, (_, index) => start + index);
    const firstItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
    const lastItem = Math.min(currentPage * itemsPerPage, totalItems);

    return (
        <nav
            aria-label="Pagination"
            className="flex flex-col items-center justify-between gap-4 border-t border-border/70 pt-6 sm:flex-row"
        >
            <p className="text-sm text-muted-foreground">
                Showing <span className="font-semibold text-foreground">{firstItem}</span> to{" "}
                <span className="font-semibold text-foreground">{lastItem}</span> of{" "}
                <span className="font-semibold text-foreground">{totalItems}</span> {itemLabel}
            </p>

            <div className="flex items-center gap-1.5">
                <button
                    type="button"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    aria-label="Previous page"
                    className="inline-flex size-9 items-center justify-center rounded-xl border border-border/70 bg-background text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40 dark:bg-card"
                >
                    <ChevronLeft className="size-4" />
                </button>

                {pages.map((page) => (
                    <button
                        key={page}
                        type="button"
                        onClick={() => handlePageChange(page)}
                        aria-current={page === currentPage ? "page" : undefined}
                        className={`inline-flex size-9 items-center justify-center rounded-xl text-sm font-semibold transition-colors ${page === currentPage
                            ? "bg-primary text-primary-foreground shadow-sm"
                            : "border border-border/70 bg-background text-foreground hover:bg-muted dark:bg-card"
                            }`}
                    >
                        {page}
                    </button>
                ))}

                <button
                    type="button"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    aria-label="Next page"
                    className="inline-flex size-9 items-center justify-center rounded-xl border border-border/70 bg-background text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40 dark:bg-card"
                >
                    <ChevronRight className="size-4" />
                </button>
            </div>
        </nav>
    );
};

export default Pagination;
