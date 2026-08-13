"use client";

import { Skeleton } from "@/components/ui/skeleton";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export const ContactTableSkeleton = () => {
    return (
        <div className="space-y-4">
            {/* Search and Filter Bar Skeleton */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="flex flex-1 gap-2 w-full sm:w-auto">
                    <div className="relative flex-1">
                        <Skeleton className="h-10 w-full" />
                    </div>
                    <Skeleton className="h-10 w-20" />
                </div>
                <Skeleton className="h-10 w-10" />
            </div>

            {/* Stats Skeleton */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <Skeleton className="h-24 rounded-lg" />
                <Skeleton className="h-24 rounded-lg" />
                <Skeleton className="h-24 rounded-lg" />
            </div>

            {/* Table Skeleton */}
            <div className="border rounded-lg overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Subject</TableHead>
                            <TableHead className="hidden md:table-cell">Message</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="hidden md:table-cell">Date</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {[...Array(5)].map((_, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <Skeleton className="h-4 w-24" />
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                    <Skeleton className="h-4 w-32" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="h-6 w-20 rounded-full" />
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                    <Skeleton className="h-4 w-24" />
                                </TableCell>
                                <TableCell className="text-right">
                                    <Skeleton className="h-8 w-16 ml-auto" />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination Skeleton */}
            <div className="flex items-center justify-between gap-2 mt-4">
                <Skeleton className="h-4 w-32" />
                <div className="flex gap-2">
                    <Skeleton className="h-10 w-24" />
                    <Skeleton className="h-10 w-24" />
                </div>
            </div>
        </div>
    );
};

// Card view skeleton (alternative to table)
export const ContactCardSkeleton = () => {
    return (
        <div className="space-y-4">
            {/* Search and Filter Bar Skeleton */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="flex flex-1 gap-2 w-full sm:w-auto">
                    <div className="relative flex-1">
                        <Skeleton className="h-10 w-full" />
                    </div>
                    <Skeleton className="h-10 w-20" />
                </div>
                <Skeleton className="h-10 w-10" />
            </div>

            {/* Stats Skeleton */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <Skeleton className="h-24 rounded-lg" />
                <Skeleton className="h-24 rounded-lg" />
                <Skeleton className="h-24 rounded-lg" />
            </div>

            {/* Cards Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(6)].map((_, index) => (
                    <Skeleton key={index} className="h-48 rounded-lg" />
                ))}
            </div>

            {/* Pagination Skeleton */}
            <div className="flex items-center justify-between gap-2 mt-4">
                <Skeleton className="h-4 w-32" />
                <div className="flex gap-2">
                    <Skeleton className="h-10 w-24" />
                    <Skeleton className="h-10 w-24" />
                </div>
            </div>
        </div>
    );
};

// Stats only skeleton
export const ContactStatsSkeleton = () => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Skeleton className="h-24 rounded-lg" />
            <Skeleton className="h-24 rounded-lg" />
            <Skeleton className="h-24 rounded-lg" />
        </div>
    );
};

// Table rows skeleton
export const ContactTableRowsSkeleton = ({ rows = 5 }: { rows?: number }) => {
    return (
        <>
            {[...Array(rows)].map((_, index) => (
                <TableRow key={index}>
                    <TableCell>
                        <Skeleton className="h-4 w-24" />
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                        <Skeleton className="h-4 w-32" />
                    </TableCell>
                    <TableCell>
                        <Skeleton className="h-6 w-20 rounded-full" />
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                        <Skeleton className="h-4 w-24" />
                    </TableCell>
                    <TableCell className="text-right">
                        <Skeleton className="h-8 w-16 ml-auto" />
                    </TableCell>
                </TableRow>
            ))}
        </>
    );
};
