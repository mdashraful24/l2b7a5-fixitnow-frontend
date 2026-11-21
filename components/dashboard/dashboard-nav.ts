import {
    CalendarDays,
    Clock3,
    FolderTree,
    LayoutDashboard,
    Mail,
    MessageCircle,
    Users,
    Wrench,
    type LucideIcon,
} from "lucide-react";

export type DashboardRole = "ADMIN" | "CUSTOMER" | "TECHNICIAN";

export type DashboardNavItem = {
    href: string;
    label: string;
    icon: LucideIcon;
    exact?: boolean;
    altHrefs?: string[];
};

export type DashboardNavGroup = {
    label: string;
    items: DashboardNavItem[];
};

export const dashboardNav: Record<DashboardRole, DashboardNavGroup[]> = {
    ADMIN: [
        {
            label: "Workspace",
            items: [
                { href: "/dashboard/admin", label: "Overview", icon: LayoutDashboard, exact: true },
                { href: "/dashboard/admin/users", label: "Users", icon: Users },
                { href: "/dashboard/admin/bookings", label: "Bookings", icon: CalendarDays },
                { href: "/dashboard/admin/categories", label: "Categories", icon: FolderTree },
                { href: "/dashboard/admin/contacts", label: "Messages", icon: Mail, exact: true },
            ],
        },
    ],
    CUSTOMER: [
        {
            label: "Workspace",
            items: [
                { href: "/dashboard/customer", label: "Overview", icon: LayoutDashboard, exact: true },
                { href: "/dashboard/customer/bookings", label: "My Bookings", icon: CalendarDays },
                { href: "/dashboard/customer/contacts", label: "Support", icon: MessageCircle, exact: true },
            ],
        },
        {
            label: "Shortcuts",
            items: [{ href: "/services", label: "Browse Services", icon: Wrench, exact: true }],
        },
    ],
    TECHNICIAN: [
        {
            label: "Workspace",
            items: [
                { href: "/dashboard/technician", label: "Overview", icon: LayoutDashboard, exact: true },
                { href: "/dashboard/technician/bookings", label: "Bookings", icon: CalendarDays },
                { href: "/dashboard/technician/availability", label: "Availability", icon: Clock3 },
                { href: "/dashboard/technician/services", label: "Services", icon: Wrench },
                { href: "/dashboard/technician/contacts", label: "Support", icon: Mail },
            ],
        },
    ],
};

export const dashboardRoleLabel: Record<DashboardRole, string> = {
    ADMIN: "Admin console",
    CUSTOMER: "Customer portal",
    TECHNICIAN: "Technician workspace",
};

export const dashboardQuickLinks: Record<
    DashboardRole,
    { profile: string; updateProfile: string; activity: string }
> = {
    ADMIN: {
        profile: "/dashboard/admin/profile",
        updateProfile: "/dashboard/admin/update-profile",
        activity: "/dashboard/admin/bookings",
    },
    CUSTOMER: {
        profile: "/dashboard/customer/profile",
        updateProfile: "/dashboard/customer/update-profile",
        activity: "/dashboard/customer/bookings",
    },
    TECHNICIAN: {
        profile: "/dashboard/technician/profile",
        updateProfile: "/dashboard/technician/updated-profile",
        activity: "/dashboard/technician/bookings",
    },
};
