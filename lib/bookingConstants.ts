import { BookingStatus, IBooking } from "@/lib/type";
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
    CheckCircle2
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

export const statusBadge: Record<string, { bg: string; text: string; border: string; icon: IconType }> = {
    REQUESTED: {
        bg: "bg-blue-50",
        text: "text-blue-700",
        border: "border-blue-200",
        icon: Clock
    },
    ACCEPTED: {
        bg: "bg-teal-50",
        text: "text-teal-700",
        border: "border-teal-200",
        icon: CheckCircle
    },
    DECLINED: {
        bg: "bg-gray-50",
        text: "text-gray-700",
        border: "border-gray-200",
        icon: ThumbsDown
    },
    PAID: {
        bg: "bg-indigo-50",
        text: "text-indigo-700",
        border: "border-indigo-200",
        icon: CreditCard
    },
    IN_PROGRESS: {
        bg: "bg-amber-50",
        text: "text-amber-700",
        border: "border-amber-200",
        icon: Loader2
    },
    COMPLETED: {
        bg: "bg-green-50",
        text: "text-green-700",
        border: "border-green-200",
        icon: ThumbsUp
    },
    CANCELLED: {
        bg: "bg-red-50",
        text: "text-red-700",
        border: "border-red-200",
        icon: Ban
    },
};

export interface BookingCardProps {
    booking: IBooking;
    statusColors: Record<BookingStatus, string>;
}

export const STATUS_LABELS: Record<BookingStatus, string> = {
    REQUESTED: "Requested",
    ACCEPTED: "Accepted",
    DECLINED: "Declined",
    PAID: "Paid",
    IN_PROGRESS: "In Progress",
    COMPLETED: "Completed",
    CANCELLED: "Cancelled",
};

export const nonCancellableStatuses: BookingStatus[] = [
    "PAID",
    "IN_PROGRESS",
    "COMPLETED",
    "CANCELLED",
];

export interface EditBookingModalProps {
    booking: IBooking;
}

export const statusColors: Record<BookingStatus, string> = {
    REQUESTED: "bg-blue-50 text-blue-700 border-blue-200",
    ACCEPTED: "bg-teal-100 text-teal-700 border-teal-200",
    DECLINED: "bg-indigo-50 text-indigo-700 border-indigo-200",
    PAID: "bg-indigo-50 text-indigo-700 border-indigo-200",
    IN_PROGRESS: "bg-amber-50 text-amber-700 border-amber-200",
    COMPLETED: "bg-green-50 text-green-700 border-green-200",
    CANCELLED: "bg-red-50 text-red-700 border-red-200",
};

export const bookingStatusBadge: Record<BookingStatus, { bg: string; text: string; border: string; icon: IconType; label: string; }> = {
    REQUESTED: {
        bg: "bg-blue-50",
        text: "text-blue-700",
        border: "border-blue-200",
        icon: Clock,
        label: "Requested"
    },
    ACCEPTED: {
        bg: "bg-teal-50",
        text: "text-teal-700",
        border: "border-teal-200",
        icon: CheckCircle2,
        label: "Accepted - Pending Payment"
    },
    DECLINED: {
        bg: "bg-gray-50",
        text: "text-gray-700",
        border: "border-gray-200",
        icon: ThumbsDown,
        label: "Declined"
    },
    PAID: {
        bg: "bg-indigo-50",
        text: "text-indigo-700",
        border: "border-indigo-200",
        icon: CreditCard,
        label: "Paid"
    },
    IN_PROGRESS: {
        bg: "bg-amber-50",
        text: "text-amber-700",
        border: "border-amber-200",
        icon: Loader2,
        label: "In Progress"
    },
    COMPLETED: {
        bg: "bg-green-50",
        text: "text-green-700",
        border: "border-green-200",
        icon: ThumbsUp,
        label: "Completed"
    },
    CANCELLED: {
        bg: "bg-red-50",
        text: "text-red-700",
        border: "border-red-200",
        icon: Ban,
        label: "Cancelled"
    },
};

export const statusBadges: Record<string, string> = {
    REQUESTED: "bg-yellow-50 text-yellow-700 border-yellow-200",
    ACCEPTED: "bg-emerald-50 text-emerald-700 border-emerald-200",
    PAID: "bg-indigo-50 text-indigo-700 border-indigo-200",
    IN_PROGRESS: "bg-sky-50 text-sky-700 border-sky-200",
    COMPLETED: "bg-green-50 text-green-700 border-green-200",
    DECLINED: "bg-red-50 text-red-700 border-red-200",
    CANCELLED: "bg-gray-50 text-gray-700 border-gray-200",
};

export const statusActions: Record<string, { label: string; status: string; icon: React.ElementType; variant?: string }[]> = {
    REQUESTED: [
        {
            label: "Accept",
            status: "ACCEPTED",
            icon: CheckCircle2,
            variant: "bg-emerald-600 hover:bg-emerald-700 text-white",
        },
        // {
        //     label: "Decline",
        //     status: "DECLINED",
        //     icon: XCircle,
        //     variant: "bg-red-600 hover:bg-red-700 text-white",
        // },
        {
            label: "Cancel",
            status: "CANCELLED",
            icon: Ban,
            variant: "bg-red-600 hover:bg-red-700 text-white",
        },
    ],
    // ACCEPTED: [
    //     {
    //         label: "Start Work",
    //         status: "IN_PROGRESS",
    //         icon: CheckCircle2,
    //         variant: "bg-teal-600 hover:bg-teal-700 text-white",
    //     },
    // ],
    PAID: [
        {
            label: "Start Work",
            status: "IN_PROGRESS",
            icon: CreditCard,
            variant: "bg-indigo-600 hover:bg-indigo-700 text-white",
        },
    ],
    IN_PROGRESS: [
        {
            label: "Mark as Completed",
            status: "COMPLETED",
            icon: Loader2,
            variant: "bg-sky-600 hover:bg-sky-700 text-white",
        },
    ],
    COMPLETED: [
        {
            label: "Completed",
            status: "COMPLETED",
            icon: CheckCircle,
            variant: "bg-green-400 cursor-not-allowed text-white",
        },
    ],
    // DECLINED: [
    //     {
    //         label: "Declined",
    //         status: "DECLINED",
    //         icon: XCircle,
    //         variant: "bg-gray-400 cursor-not-allowed text-white",
    //     },
    // ],
    CANCELLED: [
        {
            label: "Cancelled",
            status: "CANCELLED",
            icon: Ban,
            variant: "bg-red-400 cursor-not-allowed text-white",
        },
    ],
};
