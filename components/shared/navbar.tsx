'use client';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { NavbarProps } from '@/lib/type';
import { logOut } from '@/services/logout';
import { LayoutDashboard, LogOut, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { toast } from 'sonner';

// User dropdown options
const userMenuItems = [
    { label: 'Profile', icon: User, action: "profile" },
    { label: 'Dashboard', icon: LayoutDashboard, action: "dashboard" },
];

export function Navbar({ user }: NavbarProps) {
    const router = useRouter();
    const pathname = usePathname();

    const initials = user?.data?.name
        ?.split(" ")
        .slice(0, 2)
        .map((word) => word[0])
        .join("")
        .toUpperCase();

    // Navigation items configuration
    const navItems = [
        { label: "Home", href: "/" },
        { label: "Services", href: "/services" },
        // { label: "Technicians", href: "/technicians" },
    ];

    // Add your logout logic here
    const handleLogout = async (action: string) => {
        if (action === "profile") {
            router.push("/profile");
            return;
        }

        if (action === "dashboard") {
            if (user?.data?.role === "CUSTOMER") {
                router.push("/dashboard/customer")
            } else if (user?.data?.role === "TECHNICIAN") {
                router.push("/dashboard/technician")
            } else if (user?.data?.role === "ADMIN") {
                router.push("/dashboard/admin")
            }

            return;
        }

        if (action === "logout") {
            await logOut();
            toast.success("User logged out successfully");
            router.push("/auth/login");
        }
    };

    return (
        <nav className="border-b border-border">
            <div className="flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <Link href="/" className="text-2xl font-bold text-primary">
                    FixItNow
                </Link>

                {/* Navigation Links */}
                <div className="hidden gap-1 md:flex">
                    {navItems.map((item) => (
                        <Button
                            key={item.label}
                            variant={pathname === item.href ? "default" : "ghost"}
                            asChild
                        >
                            <a href={item.href}>{item.label}</a>
                        </Button>
                    ))}
                </div>

                {/* User Dropdown */}
                {
                    user.success ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <div className="cursor-pointer">
                                    <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center">
                                        {initials || <User className="size-5 text-primary" />}
                                    </div>
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                align="end"
                                className="w-72 overflow-hidden rounded-2xl border bg-background p-0 shadow-xl"
                            >
                                <DropdownMenuLabel>
                                    {/* User Header */}
                                    <div className="bg-linear-to-r from-primary/15 via-primary/10 to-primary/5 rounded-xl p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                                {initials || <User className="size-6" />}
                                            </div>

                                            <div className="flex-1">
                                                <h4 className="font-semibold text-sm text-accent-foreground">
                                                    {user?.data?.name || "User Name"}
                                                </h4>

                                                <p className="text-xs text-gray-700">
                                                    {user?.data?.email || "user@email.com"}
                                                </p>

                                                <div className="mt-2 flex items-center gap-2">
                                                    <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium text-gray-700">
                                                        {user?.data?.role || "User"}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Menu Items */}
                                    <div className="py-2">
                                        {userMenuItems.map((item) => (
                                            <DropdownMenuItem
                                                key={item.label}
                                                asChild
                                                className="text-accent-foreground rounded-lg"
                                            >
                                                <button
                                                    onClick={() => handleLogout(item.action)}
                                                    className="w-full flex items-center gap-3"
                                                >
                                                    <item.icon className="size-4" />
                                                    <span>{item.label}</span>
                                                </button>
                                            </DropdownMenuItem>
                                        ))}

                                        <DropdownMenuSeparator />

                                        <DropdownMenuItem
                                            onClick={() => handleLogout("logout")}
                                            className="rounded-lg text-red-500 focus:text-red-500"
                                        >
                                            <LogOut className="size-4" />
                                            <span>Logout</span>
                                        </DropdownMenuItem>
                                    </div>
                                </DropdownMenuLabel>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <div className="flex gap-2">
                            <Button
                                asChild
                                variant={pathname === "/auth/login" ? "default" : "outline"}
                            >
                                <Link href="/auth/login">Login</Link>
                            </Button>

                            <Button
                                asChild
                                variant={pathname === "/auth/register" ? "default" : "outline"}
                            >
                                <Link href="/auth/register">Register</Link>
                            </Button>
                        </div>
                    )
                }
            </div>
        </nav>
    );
}
