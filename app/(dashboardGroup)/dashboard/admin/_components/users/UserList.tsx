/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllUsers } from "@/app/(dashboardGroup)/_actions/admin";
import { IAdminUsers } from "@/lib/type";
import { UsersCard } from "./UserCard";
import Pagination from "@/app/(publicGroup)/_components/categories/Pagination";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Mail, MapPin, Wrench, User, CheckCircle, XCircle, Clock } from "lucide-react";
import Link from "next/link";

export async function UserList({
    searchParams
}: {
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const query = await searchParams;
    const result = await getAllUsers({ query });

    if (!result.success || !result.data?.length) {
        return (
            <div className="py-12 text-center">
                <p className="text-foreground">No users found.</p>
                {result.message && (
                    <p className="text-sm text-foreground mt-2">{result.message}</p>
                )}
            </div>
        )
    }

    const getStatusBadge = (status: string) => {
        const statusMap: Record<string, { variant: "default" | "secondary" | "destructive" | "outline"; label: string; icon: any; className: string }> = {
            'ACTIVE': {
                variant: "default",
                label: "Active",
                icon: CheckCircle,
                className: "bg-green-600 hover:bg-green-700 text-white border-green-700 flex items-center gap-1"
            },
            'BANNED': {
                variant: "destructive",
                label: "Banned",
                icon: XCircle,
                className: "bg-red-600 hover:bg-red-700 text-white border-red-700 flex items-center gap-1"
            }
        };

        const statusInfo = statusMap[status] || {
            variant: "secondary",
            label: status,
            icon: Clock,
            className: "bg-gray-600 hover:bg-gray-700 text-white border-gray-700 flex items-center gap-1"
        };

        const Icon = statusInfo.icon;
        return (
            <Badge variant={statusInfo.variant as any} className={statusInfo.className}>
                <Icon className="h-3 w-3" />
                {statusInfo.label}
            </Badge>
        );
    };

    const getRoleBadge = (role: string) => {
        const roleMap: Record<string, { label: string; className: string }> = {
            'ADMIN': {
                label: "Admin",
                className: "bg-red-600 hover:bg-red-700 text-white border-red-700"
            },
            'TECHNICIAN': {
                label: "Technician",
                className: "bg-blue-600 hover:bg-blue-700 text-white border-blue-700"
            },
            'CUSTOMER': {
                label: "Customer",
                className: "bg-purple-600 hover:bg-purple-700 text-white border-purple-700"
            },
        };

        const roleInfo = roleMap[role] || {
            label: role,
            className: "bg-gray-600 hover:bg-gray-700 text-white border-gray-700"
        };

        return (
            <Badge variant="outline" className={roleInfo.className}>
                {roleInfo.label}
            </Badge>
        );
    };

    return (
        <div className='space-y-8'>
            {/* Table View */}
            <div className="rounded-md border border-border overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-12.5 pl-5">#</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead className="hidden sm:table-cell">Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead className="hidden md:table-cell">Status</TableHead>
                            <TableHead className="hidden lg:table-cell">Location</TableHead>
                            <TableHead className="hidden xl:table-cell">Joined</TableHead>
                            <TableHead className="text-right pr-5">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {result.data.map((user: IAdminUsers, index: number) => (
                            <TableRow key={user.id} className="hover:bg-muted/50 transition-colors">
                                <TableCell className="text-center font-medium text-muted-foreground">
                                    {index + 1}
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm shrink-0">
                                            {user.name?.charAt(0) || 'U'}
                                        </div>
                                        <div>
                                            <p className="font-medium">{user.name}</p>
                                            <p className="text-xs text-muted-foreground sm:hidden">
                                                {user.email}
                                            </p>
                                            {/* {user.technicianProfile && (
                                                <p className="text-xs text-muted-foreground flex items-center gap-1">
                                                    <Wrench className="h-3 w-3" />
                                                    {user.technicianProfile.bio?.slice(0, 30) || 'Technician'}
                                                </p>
                                            )} */}
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="hidden sm:table-cell">
                                    <div className="flex items-center gap-2">
                                        <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                                        <span className="text-sm">{user.email}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    {getRoleBadge(user.role)}
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                    {getStatusBadge(user.status)}
                                </TableCell>
                                <TableCell className="hidden lg:table-cell">
                                    {user.technicianProfile ? (
                                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                            <MapPin className="h-3.5 w-3.5" />
                                            {user.technicianProfile.location || 'N/A'}
                                        </div>
                                    ) : (
                                        <span className="text-sm text-foreground">-</span>
                                    )}
                                </TableCell>
                                <TableCell className="hidden xl:table-cell text-foreground">
                                    {new Date(user.createdAt).toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric',
                                        year: 'numeric'
                                    })}
                                </TableCell>
                                <TableCell className="text-right">
                                    <Link href={`/dashboard/admin/users/${user.id}`}>
                                        <Button size="sm" className="cursor-pointer">
                                            <Eye className="h-4 w-4" />
                                            <span>View</span>
                                        </Button>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Card View - Commented out */}
            {/* 
            <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
                {result.data.map((user: IAdminUsers) => (
                    <UsersCard key={user.id} user={user} />
                ))}
            </div>
            */}

            {result.meta && (
                <Pagination
                    currentPage={result.meta.page}
                    totalPages={result.meta.totalPage}
                    totalItems={result.meta.total}
                    itemsPerPage={result.meta.limit}
                    itemLabel="users"
                />
            )}
        </div>
    )
}
