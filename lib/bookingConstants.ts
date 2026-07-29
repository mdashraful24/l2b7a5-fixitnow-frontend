import { BookingStatus } from "@/lib/type";
import {
    Package,
    Clock,
    CheckCircle,
    XCircle,
    FileText,
    AlertCircle,
    ThumbsUp,
    ThumbsDown,
    CreditCard,
    Ban,
    Loader2
} from "lucide-react";
import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export type StatusFilter = BookingStatus | "ALL";

// Use a simpler type for icon components
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

export const statusBadge: Record<string, {
    bg: string;
    text: string;
    border: string;
    icon: IconType
}> = {
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
