"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, CalendarDays, User, Home, LogOut, Clock3, User2 } from "lucide-react";
import { toast } from "sonner";
import { logOut } from "@/services/logout";

interface TechnicianSidebarProps {
    user: {
        name: string;
        email: string;
        role: string;
    };
}

const navLinks = [
    { href: "/dashboard/technician", label: "Overview", icon: LayoutDashboard, exact: true },
    { href: "/dashboard/technician/bookings", label: "Bookings", icon: CalendarDays, exact: false },
    { href: "/dashboard/technician/availability", label: "Availability", icon: Clock3, exact: false },
    { href: "/dashboard/technician/services", label: "Services", icon: Clock3, exact: false },
    { href: "/dashboard/technician/updated-profile", label: "Edit Profile", icon: User, exact: false },
    // { href: "/profile", label: "Profile", icon: User2, exact: true },
    { href: "/", label: "Home", icon: Home, exact: true },
];

export function TechnicianSidebar({ user }: TechnicianSidebarProps) {
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
        .map((word) => word[0])
        .join("")
        .toUpperCase();

    return (
        <div className="sticky top-[6.6rem] space-y-4">
            {/* <div className="rounded-xl border bg-white p-4 shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                        {initials}
                    </div>
                    <div className="min-w-0">
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-xs text-gray-700">{user.email}</p>
                        <span className="mt-1 inline-block rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                            {user.role}
                        </span>
                    </div>
                </div>
            </div> */}

            <nav className="overflow-hidden rounded-xl border bg-white shadow-sm">
                <div className="space-y-0.5 p-2">
                    {navLinks.map((item) => {
                        const isActive = item.exact
                            ? pathname === item.href
                            : pathname.startsWith(item.href);

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                                    isActive
                                        ? "bg-primary text-white"
                                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                }`}
                            >
                                <item.icon className="h-4 w-4 shrink-0" />
                                {item.label}
                            </Link>
                        );
                    })}
                </div>

                <div className="border-t p-2">
                    <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-500 transition-colors hover:bg-red-50"
                    >
                        <LogOut className="h-4 w-4" />
                        Logout
                    </button>
                </div>
            </nav>
        </div>
    );
}
