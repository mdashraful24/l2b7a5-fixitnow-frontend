"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function UserFilters() {
    const pathName = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();

    const currentRole = searchParams.get("role") || "";
    const currentStatus = searchParams.get("status") || "";

    const handleFilterChange = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }

        router.replace(`${pathName}?${params.toString()}`);
    };

    return (
        <div className="flex flex-wrap items-center gap-3">
            {/* Role Filter */}
            <select
                value={currentRole}
                onChange={(e) => handleFilterChange("role", e.target.value)}
                className="px-3 py-2 text-sm border border-gray-200 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
                <option value="">All Roles</option>
                <option value="CUSTOMER">Customers</option>
                <option value="TECHNICIAN">Technicians</option>
                <option value="ADMIN">Admins</option>
            </select>

            {/* Status Filter */}
            <select
                value={currentStatus}
                onChange={(e) => handleFilterChange("status", e.target.value)}
                className="px-3 py-2 text-sm border border-gray-200 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
                <option value="">All Status</option>
                <option value="ACTIVE">Active</option>
                <option value="BANNED">Banned</option>
            </select>
        </div>
    );
}
