import { BookingStatus, IBooking, TotalBookingsCountStats } from "@/lib/type";
import {
    Package,
    Clock,
    CheckCircle,
    XCircle,
    FileText,
    ThumbsUp,
    ThumbsDown,
    CreditCard,
    Ban,
    Loader2,
    CheckCircle2,
    CalendarDays,
    DollarSign,
    ListChecks,
    AlertCircle
} from "lucide-react";
import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export type StatusFilter = BookingStatus | "ALL";

type IconType = ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;

export const statusTabs: {
    label: string;
    value: StatusFilter;
    icon: IconType
}[] = [
        { label: "All", value: "ALL", icon: Package },
        { label: "Requested", value: "REQUESTED", icon: Clock },
        { label: "Accepted", value: "ACCEPTED", icon: CheckCircle },
        { label: "Declined", value: "DECLINED", icon: XCircle },
        { label: "Paid", value: "PAID", icon: FileText },
        { label: "In Progress", value: "IN_PROGRESS", icon: Clock },
        { label: "Completed", value: "COMPLETED", icon: CheckCircle },
        { label: "Cancelled", value: "CANCELLED", icon: XCircle },
    ];

export type BookingStatCardKey = "total" | "requested" | "declined" | "accepted" | "paid" | "inProgress" | "completed" | "cancelled" | "earnings";

export type BookingStatCardTheme = {
    key: BookingStatCardKey;
    label: string;
    icon: IconType;
    color: string;
    iconColor: string;
};

export const bookingStatCardThemes: BookingStatCardTheme[] = [
    {
        key: "total",
        label: "Total Bookings",
        icon: CalendarDays,
        color: "bg-gradient-to-br from-gray-700 to-gray-900",
        iconColor: "text-gray-300",
    },
    {
        key: "requested",
        label: "Requested",
        icon: Clock,
        color: "bg-gradient-to-br from-orange-500 to-orange-600",
        iconColor: "text-orange-200",
    },
    {
        key: "declined",
        label: "Declined",
        icon: ThumbsDown,
        color: "bg-gradient-to-br from-red-500 to-red-600",
        iconColor: "text-red-200",
    },
    {
        key: "accepted",
        label: "Accepted",
        icon: CheckCircle,
        color: "bg-gradient-to-br from-blue-500 to-blue-600",
        iconColor: "text-blue-200",
    },
    {
        key: "paid",
        label: "Paid",
        icon: CreditCard,
        color: "bg-gradient-to-br from-purple-500 to-purple-600",
        iconColor: "text-purple-200",
    },
    {
        key: "inProgress",
        label: "In Progress",
        icon: Loader2,
        color: "bg-gradient-to-br from-green-500 to-green-600",
        iconColor: "text-green-200",
    },
    {
        key: "completed",
        label: "Completed",
        icon: ThumbsUp,
        color: "bg-gradient-to-br from-gray-400 to-gray-500",
        iconColor: "text-gray-200",
    },
    {
        key: "cancelled",
        label: "Cancelled",
        icon: Ban,
        color: "bg-gradient-to-br from-red-700 to-red-800",
        iconColor: "text-red-200",
    },
    {
        key: "earnings",
        label: "Earnings",
        icon: DollarSign,
        color: "bg-gradient-to-br from-emerald-600 to-emerald-700",
        iconColor: "text-emerald-200",
    },
];

export const buildBookingStatCards = (stats: Partial<Record<BookingStatCardKey, number | string>>) =>
    bookingStatCardThemes.map((item) => ({
        ...item,
        value: item.key === "earnings" ? `$${stats.earnings ?? 0}` : stats[item.key] ?? 0,
    }));

export type BookingStatusTheme = {
    label: string;
    icon: IconType;
    accent: string;
    badgeBg: string;
    badgeText: string;
    badgeBorder: string;
    softBg: string;
    softText: string;
    softBorder: string;
};

export const bookingStatusTheme: Record<BookingStatus, BookingStatusTheme> = {
    REQUESTED: {
        label: "Requested",
        icon: Clock,
        accent: "bg-orange-500",
        badgeBg: "bg-orange-100",
        badgeText: "text-orange-700",
        badgeBorder: "border-orange-200",
        softBg: "bg-orange-50 dark:bg-orange-950/30",
        softText: "text-orange-700 dark:text-orange-300",
        softBorder: "border-orange-200 dark:border-orange-800",
    },
    ACCEPTED: {
        label: "Accepted",
        icon: CheckCircle,
        accent: "bg-blue-500",
        badgeBg: "bg-blue-100",
        badgeText: "text-blue-700",
        badgeBorder: "border-blue-200",
        softBg: "bg-blue-50 dark:bg-blue-950/30",
        softText: "text-blue-700 dark:text-blue-300",
        softBorder: "border-blue-200 dark:border-blue-800",
    },
    DECLINED: {
        label: "Declined",
        icon: ThumbsDown,
        accent: "bg-red-500",
        badgeBg: "bg-red-100",
        badgeText: "text-red-700",
        badgeBorder: "border-red-200",
        softBg: "bg-red-50 dark:bg-red-950/30",
        softText: "text-red-700 dark:text-red-300",
        softBorder: "border-red-200 dark:border-red-800",
    },
    PAID: {
        label: "Paid",
        icon: CreditCard,
        accent: "bg-purple-500",
        badgeBg: "bg-purple-100",
        badgeText: "text-purple-700",
        badgeBorder: "border-purple-200",
        softBg: "bg-purple-50 dark:bg-purple-950/30",
        softText: "text-purple-700 dark:text-purple-300",
        softBorder: "border-purple-200 dark:border-purple-800",
    },
    IN_PROGRESS: {
        label: "In Progress",
        icon: Loader2,
        accent: "bg-green-500",
        badgeBg: "bg-green-100",
        badgeText: "text-green-700",
        badgeBorder: "border-green-200",
        softBg: "bg-green-50 dark:bg-green-950/30",
        softText: "text-green-700 dark:text-green-300",
        softBorder: "border-green-200 dark:border-green-800",
    },
    COMPLETED: {
        label: "Completed",
        icon: ThumbsUp,
        accent: "bg-gray-500",
        badgeBg: "bg-gray-100",
        badgeText: "text-gray-700",
        badgeBorder: "border-gray-200",
        softBg: "bg-gray-50 dark:bg-gray-950/30",
        softText: "text-gray-700 dark:text-gray-300",
        softBorder: "border-gray-200 dark:border-gray-800",
    },
    CANCELLED: {
        label: "Cancelled",
        icon: Ban,
        accent: "bg-red-500",
        badgeBg: "bg-red-300",
        badgeText: "text-red-700",
        badgeBorder: "border-red-200",
        softBg: "bg-red-50 dark:bg-red-950/30",
        softText: "text-red-700 dark:text-red-300",
        softBorder: "border-red-200 dark:border-red-800",
    },
};

export const statusBadge: Record<string, { bg: string; text: string; border: string; icon: IconType }> = Object.fromEntries(
    Object.entries(bookingStatusTheme).map(([status, theme]) => [
        status,
        {
            bg: theme.badgeBg,
            text: theme.badgeText,
            border: theme.badgeBorder,
            icon: theme.icon,
        },
    ])
) as Record<string, { bg: string; text: string; border: string; icon: IconType }>;

export interface BookingCardProps {
    booking: IBooking;
    statusColors: Record<BookingStatus, string>;
}

export const STATUS_LABELS: Record<BookingStatus, string> = Object.fromEntries(
    Object.entries(bookingStatusTheme).map(([status, theme]) => [status, theme.label])
) as Record<BookingStatus, string>;

export const nonCancellableStatuses: BookingStatus[] = [
    "PAID",
    "IN_PROGRESS",
    "COMPLETED",
    "CANCELLED",
];

export interface EditBookingModalProps {
    booking: IBooking;
}

export const statusColors: Record<BookingStatus, string> = Object.fromEntries(
    Object.entries(bookingStatusTheme).map(([status, theme]) => [
        status,
        `${theme.badgeBg} ${theme.badgeText} ${theme.badgeBorder}`,
    ])
) as Record<BookingStatus, string>;

export const bookingStatusBadge: Record<BookingStatus, { bg: string; text: string; border: string; icon: IconType; label: string; }> = Object.fromEntries(
    Object.entries(bookingStatusTheme).map(([status, theme]) => [
        status,
        {
            bg: theme.badgeBg,
            text: theme.badgeText,
            border: theme.badgeBorder,
            icon: theme.icon,
            label: theme.label,
        },
    ])
) as Record<BookingStatus, { bg: string; text: string; border: string; icon: IconType; label: string; }>;

export const statusBadges: Record<string, string> = statusColors as Record<string, string>;

export const statusActions: Record<
    string,
    {
        label: string;
        status: string;
        icon: React.ElementType;
        variant?: string;
    }[]
> = {
    REQUESTED: [
        {
            label: "Accept Booking",
            status: "ACCEPTED",
            icon: CheckCircle2,
            // Blue because next status is ACCEPTED
            variant: "bg-blue-600 hover:bg-blue-700 text-white",
        },
        {
            label: "Decline Booking",
            status: "DECLINED",
            icon: XCircle,
            variant: "bg-red-600 hover:bg-red-700 text-white",
        },
    ],

    ACCEPTED: [
        {
            label: "Start Job",
            status: "IN_PROGRESS",
            icon: CheckCircle2,
            // Green matches IN_PROGRESS status
            variant: "bg-green-600 hover:bg-green-700 text-white",
        },
    ],

    PAID: [
        {
            label: "Start Job",
            status: "IN_PROGRESS",
            icon: CreditCard,
            // Green matches IN_PROGRESS status
            variant: "bg-green-600 hover:bg-green-700 text-white",
        },
    ],

    IN_PROGRESS: [
        {
            label: "Complete Job",
            status: "COMPLETED",
            icon: Loader2,
            // Gray matches COMPLETED status
            variant: "bg-gray-600 hover:bg-gray-700 text-white",
        },
    ],

    COMPLETED: [
        {
            label: "Job Completed",
            status: "COMPLETED",
            icon: CheckCircle,
            variant: "bg-gray-500 cursor-not-allowed text-white",
        },
    ],

    DECLINED: [
        {
            label: "Booking Declined",
            status: "DECLINED",
            icon: XCircle,
            variant: "bg-red-600 cursor-not-allowed text-white",
        },
    ],

    CANCELLED: [
        {
            label: "Booking Cancelled",
            status: "CANCELLED",
            icon: Ban,
            variant: "bg-red-900 cursor-not-allowed text-white",
        },
    ],
};

export const getBookingFilterOptions = (stats?: TotalBookingsCountStats) => [
    {
        value: "",
        label: "All",
        icon: ListChecks,
        count: stats?.totalBookings || 0,
        color: "bg-blue-500"
    },
    {
        value: "REQUESTED",
        label: "Requested",
        icon: Clock,
        count: stats?.requestedBookings || 0,
        color: "bg-orange-500"
    },
    {
        value: "ACCEPTED",
        label: "Accepted",
        icon: CheckCircle,
        count: stats?.acceptedBookings || 0,
        color: "bg-blue-500"
    },
    {
        value: "DECLINED",
        label: "Declined",
        icon: AlertCircle,
        count: stats?.declinedBookings || 0,
        color: "bg-red-500"
    },
    {
        value: "PAID",
        label: "Paid",
        icon: DollarSign,
        count: stats?.paidBookings || 0,
        color: "bg-purple-500"
    },
    {
        value: "IN_PROGRESS",
        label: "In Progress",
        icon: Loader2,
        count: stats?.inProgressBookings || 0,
        color: "bg-green-500"
    },
    {
        value: "COMPLETED",
        label: "Completed",
        icon: CheckCircle,
        count: stats?.completedBookings || 0,
        color: "bg-gray-500"
    },
    {
        value: "CANCELLED",
        label: "Cancelled",
        icon: XCircle,
        count: stats?.cancelledBookings || 0,
        color: "bg-red-800"
    }
];
