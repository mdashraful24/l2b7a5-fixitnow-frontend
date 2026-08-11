/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

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
import { Eye } from "lucide-react";
import Link from "next/link";

interface AdminBookingsDataTableProps {
    bookings: any[];
    compact?: boolean;
}

export default function AdminBookingsDataTable({ bookings, compact = false }: AdminBookingsDataTableProps) {
    const getStatusBadge = (status: string) => {
        const statusMap: Record<string, { variant: "default" | "secondary" | "destructive" | "outline"; label: string }> = {
            'COMPLETED': { variant: "default", label: "Completed" },
            'IN_PROGRESS': { variant: "default", label: "In Progress" },
            'REQUESTED': { variant: "outline", label: "Requested" },
            'ACCEPTED': { variant: "default", label: "Accepted" },
            'CANCELLED': { variant: "destructive", label: "Cancelled" },
            'DECLINED': { variant: "destructive", label: "Declined" },
            'PAID': { variant: "secondary", label: "Paid" },
        };

        const statusInfo = statusMap[status] || { variant: "secondary", label: status };
        return <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>;
    };

    return (
        <div className="rounded-md border border-border overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        {compact ? (
                            // Compact view - fewer columns
                            <>
                                <TableHead className="w-12.5 pl-5">#</TableHead>
                                <TableHead className="w-25">Booking ID</TableHead>
                                <TableHead>Customer</TableHead>
                                <TableHead className="hidden sm:table-cell">Service</TableHead>
                                <TableHead className="hidden md:table-cell">Amount</TableHead>
                                <TableHead className="hidden lg:table-cell">Date</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right pr-5">Action</TableHead>
                            </>
                        ) : (
                            // Full view - all columns
                            <>
                                <TableHead className="w-12.5 pl-5">#</TableHead>
                                <TableHead>Booking ID</TableHead>
                                <TableHead>Customer</TableHead>
                                <TableHead>Service</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Address</TableHead>
                                <TableHead>Status</TableHead>
                                {/* <TableHead>Payment</TableHead> */}
                                <TableHead className="text-right pr-5">Actions</TableHead>
                            </>
                        )}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {bookings.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={compact ? 8 : 10} className="text-center text-muted-foreground py-8">
                                No bookings found
                            </TableCell>
                        </TableRow>
                    ) : (
                        bookings.map((booking: any, index: number) => (
                            <TableRow key={booking.id}>
                                {compact ? (
                                    // Compact row
                                    <>
                                        <TableCell className="text-center font-medium text-muted-foreground">
                                            {index + 1}
                                        </TableCell>
                                        <TableCell className="font-mono text-xs">
                                            #{booking.bookingId?.slice(0, 8) || booking.id?.slice(0, 8)}
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            {booking.customer?.name || booking.customerName || 'N/A'}
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell">
                                            {booking.service?.title || booking.serviceName || 'N/A'}
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell font-medium">
                                            ${booking.totalAmount?.toFixed(2) || '0.00'}
                                        </TableCell>
                                        <TableCell className="hidden lg:table-cell text-foreground">
                                            {new Date(booking.createdAt).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell>
                                            {getStatusBadge(booking.status)}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Link href={`/dashboard/admin/bookings/${booking.id}`}>
                                                <Button size="sm" className="cursor-pointer">
                                                    <Eye className="h-4 w-4" />
                                                    <span>View</span>
                                                </Button>
                                            </Link>
                                        </TableCell>
                                    </>
                                ) : (
                                    // Full row
                                    <>
                                        <TableCell className="text-center font-medium text-muted-foreground">
                                            {index + 1}
                                        </TableCell>
                                        <TableCell>{booking.id?.slice(0, 8)}</TableCell>
                                        <TableCell>{booking.customer?.name || booking.customerName}</TableCell>
                                        <TableCell>{booking.service?.title || booking.serviceName}</TableCell>
                                        <TableCell>{new Date(booking.createdAt).toLocaleDateString()}</TableCell>
                                        <TableCell>${booking.totalAmount?.toFixed(2)}</TableCell>
                                        <TableCell>{booking.address}</TableCell>
                                        <TableCell>{getStatusBadge(booking.status)}</TableCell>
                                        {/* <TableCell>
                                            <Badge variant={booking.paymentStatus === 'PAID' ? 'default' : 'secondary'}>
                                                {booking.paymentStatus || 'N/A'}
                                            </Badge>
                                        </TableCell> */}
                                        <TableCell className="text-right">
                                            <Link href={`/dashboard/admin/bookings/${booking.id}`}>
                                                <Button size="sm" className="cursor-pointer">
                                                    <Eye className="h-4 w-4" />
                                                    <span>View</span>
                                                </Button>
                                            </Link>
                                        </TableCell>
                                    </>
                                )}
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
