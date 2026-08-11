/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import {
    ChevronDown,
    ChevronUp,
    Search,
    Calendar,
    User,
    DollarSign,
    AlertCircle,
    CheckCircle,
    XCircle,
    Clock,
} from 'lucide-react';
import { statusBadges } from '@/lib/bookingConstants';

interface Booking {
    id: string;
    status: string;
    scheduledAt: string;
    totalAmount: number;
    createdAt: string;
    customer?: { name: string };
    service?: { title: string };
    technician?: { name: string };
}

interface BookingsDataTableProps {
    bookings: Booking[];
}

type SortField = 'date' | 'customer' | 'service' | 'technician' | 'amount' | 'status';
type SortOrder = 'asc' | 'desc';

const SortIcon = ({
    field,
    currentField,
    currentOrder,
}: {
    field: SortField;
    currentField: SortField;
    currentOrder: SortOrder;
}) => {
    if (currentField !== field) return <ChevronDown className="h-4 w-4 opacity-30" />;
    return currentOrder === 'asc' ?
        <ChevronUp className="h-4 w-4" /> :
        <ChevronDown className="h-4 w-4" />;
};

export default function AdminBookingsDataTable({ bookings }: BookingsDataTableProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortField, setSortField] = useState<SortField>('date');
    const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

    const getStatusIcon = (status: string) => {
        const statusIcons: Record<string, any> = {
            'COMPLETED': CheckCircle,
            'IN_PROGRESS': Clock,
            'REQUESTED': AlertCircle,
            'ACCEPTED': CheckCircle,
            'CANCELLED': XCircle,
            'DECLINED': XCircle,
            'PAID': CheckCircle,
        };
        return statusIcons[status] || AlertCircle;
    };

    const getStatusColor = (status: string) => {
        const colors: Record<string, string> = {
            'COMPLETED': 'text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400',
            'IN_PROGRESS': 'text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400',
            'REQUESTED': 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 dark:text-yellow-400',
            'ACCEPTED': 'text-purple-600 bg-purple-50 dark:bg-purple-900/20 dark:text-purple-400',
            'CANCELLED': 'text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400',
            'DECLINED': 'text-gray-600 bg-gray-50 dark:bg-gray-800 dark:text-gray-400',
            'PAID': 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 dark:text-emerald-400',
        };
        return colors[status] || 'text-gray-600 bg-gray-50 dark:bg-gray-800 dark:text-gray-400';
    };

    const getStatusLabel = (status: string) => {
        return status.replace('_', ' ');
    };

    const handleSort = (field: SortField) => {
        if (sortField === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortOrder('asc');
        }
    };

    const filteredAndSortedBookings = bookings
        .filter(booking => {
            const searchLower = searchTerm.toLowerCase();
            return (
                booking.customer?.name?.toLowerCase().includes(searchLower) ||
                booking.service?.title?.toLowerCase().includes(searchLower) ||
                booking.technician?.name?.toLowerCase().includes(searchLower) ||
                booking.id.toLowerCase().includes(searchLower) ||
                booking.status.toLowerCase().includes(searchLower)
            );
        })
        .sort((a, b) => {
            let comparison = 0;
            switch (sortField) {
                case 'date':
                    comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
                    break;
                case 'customer':
                    comparison = (a.customer?.name || '').localeCompare(b.customer?.name || '');
                    break;
                case 'service':
                    comparison = (a.service?.title || '').localeCompare(b.service?.title || '');
                    break;
                case 'technician':
                    comparison = (a.technician?.name || '').localeCompare(b.technician?.name || '');
                    break;
                case 'amount':
                    comparison = (a.totalAmount || 0) - (b.totalAmount || 0);
                    break;
                case 'status':
                    comparison = a.status.localeCompare(b.status);
                    break;
            }
            return sortOrder === 'asc' ? comparison : -comparison;
        });

    if (bookings.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="rounded-full bg-muted p-4 mb-4">
                    <Calendar className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">No bookings yet</h3>
                <p className="text-sm text-muted-foreground mt-1">
                    Bookings will appear here once customers start using the platform.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Search Bar */}
            {/* <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                    type="text"
                    placeholder="Search bookings by customer, service, technician, or ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full rounded-lg border border-border bg-background pl-10 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
            </div> */}

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-border">
                            <th
                                className="px-4 py-3 text-left font-semibold text-muted-foreground cursor-pointer hover:text-foreground"
                                onClick={() => handleSort('date')}
                            >
                                <div className="flex items-center gap-1">
                                    Date Created
                                    <SortIcon field="date" currentField={sortField} currentOrder={sortOrder} />
                                </div>
                            </th>
                            <th
                                className="px-4 py-3 text-left font-semibold text-muted-foreground cursor-pointer hover:text-foreground"
                                onClick={() => handleSort('customer')}
                            >
                                <div className="flex items-center gap-1">
                                    Customer
                                    <SortIcon field="customer" currentField={sortField} currentOrder={sortOrder} />
                                </div>
                            </th>
                            <th
                                className="px-4 py-3 text-left font-semibold text-muted-foreground cursor-pointer hover:text-foreground"
                                onClick={() => handleSort('service')}
                            >
                                <div className="flex items-center gap-1">
                                    Service
                                    <SortIcon field="service" currentField={sortField} currentOrder={sortOrder} />
                                </div>
                            </th>
                            <th
                                className="px-4 py-3 text-left font-semibold text-muted-foreground cursor-pointer hover:text-foreground"
                                onClick={() => handleSort('technician')}
                            >
                                <div className="flex items-center gap-1">
                                    Technician
                                    <SortIcon field="technician" currentField={sortField} currentOrder={sortOrder} />
                                </div>
                            </th>
                            <th
                                className="px-4 py-3 text-left font-semibold text-muted-foreground cursor-pointer hover:text-foreground"
                                onClick={() => handleSort('status')}
                            >
                                <div className="flex items-center gap-1">
                                    Status
                                    <SortIcon field="status" currentField={sortField} currentOrder={sortOrder} />
                                </div>
                            </th>
                            <th
                                className="px-4 py-3 text-right font-semibold text-muted-foreground cursor-pointer hover:text-foreground"
                                onClick={() => handleSort('amount')}
                            >
                                <div className="flex items-center justify-end gap-1">
                                    Amount
                                    <SortIcon field="amount" currentField={sortField} currentOrder={sortOrder} />
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAndSortedBookings.map((booking) => {
                            const StatusIcon = getStatusIcon(booking.status);
                            const statusColor = getStatusColor(booking.status);

                            return (
                                <tr key={booking.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                                    <td className="px-4 py-3 text-foreground">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4 text-muted-foreground" />
                                            <span>
                                                {new Date(booking.createdAt).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric'
                                                })}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-2">
                                            <User className="h-4 w-4 text-muted-foreground" />
                                            <span className="text-foreground">
                                                {booking.customer?.name || 'Guest'}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-foreground">
                                        {booking.service?.title || 'N/A'}
                                    </td>
                                    <td className="px-4 py-3 text-foreground">
                                        {booking.technician?.name || 'Unassigned'}
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${statusColor}`}>
                                            <StatusIcon className="h-3 w-3" />
                                            {getStatusLabel(booking.status)}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-right font-semibold text-foreground">
                                        <div className="flex items-center justify-end gap-1">
                                            <DollarSign className="h-3 w-3 text-muted-foreground" />
                                            {booking.totalAmount?.toFixed(2) || '0.00'}
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between text-sm text-muted-foreground">
                <p>
                    Showing {filteredAndSortedBookings.length} of {bookings.length} bookings
                </p>
                {/* {searchTerm && filteredAndSortedBookings.length === 0 && (
                    <p className="text-yellow-600 dark:text-yellow-400">
                        No bookings match your search
                    </p>
                )} */}
            </div>
        </div>
    );
}
