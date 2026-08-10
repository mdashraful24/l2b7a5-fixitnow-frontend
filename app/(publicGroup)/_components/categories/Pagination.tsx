/* eslint-disable prefer-const */
'use client';

import React from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PaginationProps } from '@/lib/type';

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    itemLabel = 'items'
}) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const handlePageChange = (page: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', page.toString());
        router.push(`${pathname}?${params.toString()}`);
    };

    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 5;
        let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
        let end = Math.min(totalPages, start + maxVisible - 1);

        if (end - start + 1 < maxVisible) {
            start = Math.max(1, end - maxVisible + 1);
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        return pages;
    };

    if (totalPages <= 1) return null;

    return (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 pt-4 border-t border-border">
            <div className="text-sm text-foreground/70">
                Showing {(currentPage - 1) * itemsPerPage + 1} -{' '}
                {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} {itemLabel}
            </div>

            <div className="flex items-center gap-2">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1.5 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer hover:bg-gray-50 transition-colors dark:hover:text-black"
                >
                    <ChevronLeft />
                </button>

                {getPageNumbers().map((page) => (
                    <button
                        key={page}
                        // onClick={() => handlePageChange(page)}
                        className={`px-3.5 py-1.5 rounded-lg transition-colors ${page === currentPage
                            ? 'bg-primary-600'
                            : 'hover:bg-gray-100 dark:hover:text-black border border-gray-300'
                            }`}
                    >
                        {page}
                    </button>
                ))}

                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1.5 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer hover:bg-gray-50 transition-colors dark:hover:text-black"
                >
                    <ChevronRight />
                </button>
            </div>
        </div>
    );
};

export default Pagination;
