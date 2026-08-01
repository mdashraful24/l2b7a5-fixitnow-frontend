"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, CalendarDays, User, LogOut, Home, Users } from "lucide-react";
import { logOut } from "@/services/logout";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AdminSidebarProps } from "@/lib/type";

const navLinks = [
    { href: "/dashboard/admin", label: "Overview", icon: LayoutDashboard, exact: true },
    { href: "/dashboard/admin/users", label: "Users", icon: Users, exact: false },
    { href: "/dashboard/admin/bookings", label: "Bookings", icon: CalendarDays, exact: false },
    { href: "/dashboard/admin/categories", label: "Categories", icon: CalendarDays, exact: false },
    // { href: "/profile", label: "My Profile", icon: User, exact: true },
    { href: "/", label: "Home", icon: Home, exact: true },
];

export function AdminSidebar({ user }: AdminSidebarProps) {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = async () => {
        await logOut();
        toast.success("Logged out successfully");
        router.push("/auth/login");
    };

    const initials = user.name
        ?.split(" ")
        .slice(0, 2)
        .map((w) => w[0])
        .join("")
        .toUpperCase();

    return (
        <div className="sticky top-[6.6rem] space-y-4">
            {/* User card */}
            {/* <div className="rounded-xl border bg-white p-4 shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                        {initials}
                    </div>
                    <div className="min-w-0">
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-xs text-gray-700 break-all">{user.email}</p>
                        <span className="mt-1 inline-block rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                            {user.role}
                        </span>
                    </div>
                </div>
            </div> */}

            {/* Navigation */}
            <nav className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
                <div className="p-2 space-y-0.5">
                    {navLinks.map((item) => {
                        const isActive = item.exact
                            ? pathname === item.href
                            : pathname.startsWith(item.href);
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${isActive
                                        ? "bg-primary text-primary-foreground"
                                        : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                                    }`}
                            >
                                <item.icon className="h-4 w-4 shrink-0" />
                                {item.label}
                            </Link>
                        );
                    })}
                </div>
                <div className="border-t border-border p-2">
                    <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-500 transition-colors hover:bg-red-50 dark:hover:bg-red-950/30 cursor-pointer"
                    >
                        <LogOut className="h-4 w-4" />
                        Logout
                    </button>
                </div>
            </nav>
        </div>
    );
}
