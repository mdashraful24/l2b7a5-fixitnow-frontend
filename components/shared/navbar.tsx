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
import { Home, LayoutDashboard, List, LogOut, Mail, Menu, User, Wrench } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { ThemeToggle } from '../theme/theme-toggle';

// User dropdown options
const userMenuItems = [
    { label: 'Profile', icon: User, action: 'profile' },
    // { label: 'Dashboard', icon: LayoutDashboard, action: 'dashboard' },
];

export function Navbar({ user }: NavbarProps) {
    const router = useRouter();
    const pathname = usePathname();

    const initials = user?.data?.name
        ?.split(' ')
        .slice(0, 2)
        .map((word) => word[0])
        .join('')
        .toUpperCase();

    // Check if current route is dashboard
    const isDashboardRoute = pathname.startsWith('/dashboard');
    const isProfileRoute = pathname === '/profile';

    // Get dashboard href based on user role
    const getDashboardHref = () => {
        if (!user?.data?.role) return '/dashboard';

        const role = user.data.role.toLowerCase();
        if (role === 'customer') return '/dashboard/customer';
        if (role === 'technician') return '/dashboard/technician';
        if (role === 'admin') return '/dashboard/admin';
        return '/dashboard';
    };

    // Navigation items configuration
    const navItems = [
        { label: 'Home', icon: Home, href: '/' },
        { label: 'Services', icon: Wrench, href: '/services' },
        { label: 'Categories', icon: List, href: '/all-categories' },
        { label: 'Contact', icon: Mail, href: '/contact' },
    ];

    // Add Dashboard link if user is logged in
    const allNavItems = user?.success
        ? [...navItems, { label: 'Dashboard', icon: LayoutDashboard, href: getDashboardHref() }]
        : navItems;

    // Hide dashboard menu item when already inside dashboard
    const visibleUserMenuItems = isDashboardRoute
        ? userMenuItems.filter((item) => item.action !== 'dashboard')
        : userMenuItems;

    // Handle navigation actions
    const handleNavigation = async (action: string) => {
        if (action === 'profile') {
            router.push('/profile');
            return;
        }

        if (action === 'dashboard') {
            router.push(getDashboardHref());
            return;
        }

        if (action === 'logout') {
            await logOut();
            toast.success('User logged out successfully');
            router.push('/auth/login');
        }
    };

    return (
        <nav className={`sticky top-0 z-50 border-b border-border ${isDashboardRoute ? 'bg-background' : 'bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80'}`}>
            <div className="lg:container mx-auto max-w-7xl flex items-center justify-between px-4 py-4">
                {/* Logo */}
                {/* <Link href="/" className="text-2xl font-bold text-primary dark:text-blue-400">
                    FixItNow
                </Link> */}

                <Link className="brand" href="/" aria-label="FixItNow home">
                    <span className="brand-mark"><Wrench size={17} strokeWidth={2.5} /></span>
                    FixIt<span>Now</span>
                </Link>

                {/* Desktop Navigation Links */}
                {!isDashboardRoute && (
                    <div className="hidden gap-1 md:flex">
                        {allNavItems.map((item) => (
                            <Button
                                key={item.label}
                                variant={pathname === item.href ? 'default' : 'ghost'}
                                asChild
                            >
                                <Link href={item.href}>{item.label}</Link>
                            </Button>
                        ))}
                    </div>
                )}

                {/* Right side items */}
                <div className="flex items-center gap-4">
                    {/* Mobile Menu Dropdown - Hidden on dashboard routes */}
                    {!isDashboardRoute && (
                        <div className="md:hidden">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="relative">
                                        <Menu className="h-5 w-5" />
                                        <span className="sr-only">Toggle menu</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    align="end"
                                    sideOffset={8}
                                    className="w-60 rounded-xl bg-background p-2 shadow-lg"
                                >
                                    {/* Show user info in mobile menu if logged in */}
                                    {user?.success && (
                                        <>
                                            <div className="mb-2">
                                                <div className="flex items-center gap-3 rounded-lg bg-secondary/50 p-2">
                                                    <div className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">
                                                        {initials || <User className="size-4" />}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="truncate text-sm font-medium">
                                                            {user?.data?.name || 'User'}
                                                        </p>
                                                        <p className="truncate text-xs text-muted-foreground">
                                                            {user?.data?.email || 'user@email.com'}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Navigation Links with Icons */}
                                            {allNavItems.map((item) => (
                                                <DropdownMenuItem key={item.label} asChild>
                                                    <Link
                                                        href={item.href}
                                                        className={`flex w-full items-center gap-3 rounded-lg px-2 py-2 ${pathname === item.href
                                                            ? 'bg-primary text-primary-foreground'
                                                            : 'hover:bg-accent'
                                                            }`}
                                                    >
                                                        <item.icon className="size-4" />
                                                        <span>{item.label}</span>
                                                    </Link>
                                                </DropdownMenuItem>
                                            ))}

                                            {/* Profile link with active state and icon */}
                                            <DropdownMenuItem asChild>
                                                <Link
                                                    href="/profile"
                                                    className={`flex w-full items-center gap-3 rounded-lg px-2 py-2 ${pathname === '/profile'
                                                        ? 'bg-primary text-primary-foreground'
                                                        : 'hover:bg-accent'
                                                        }`}
                                                >
                                                    <User className="size-4" />
                                                    <span>Profile</span>
                                                </Link>
                                            </DropdownMenuItem>

                                            {/* Mobile User Actions */}
                                            {visibleUserMenuItems
                                                .filter((item) => item.action !== 'profile')
                                                .map((item) => (
                                                    <DropdownMenuItem
                                                        key={item.label}
                                                        onClick={() => handleNavigation(item.action)}
                                                        className="flex items-center gap-3 rounded-lg px-2 py-2 cursor-pointer"
                                                    >
                                                        <item.icon className="size-4" />
                                                        <span>{item.label}</span>
                                                    </DropdownMenuItem>
                                                ))}

                                            {!isDashboardRoute && (
                                                <>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem
                                                        onClick={() => handleNavigation('logout')}
                                                        className="flex items-center gap-3 rounded-lg px-2 py-2 text-red-500 focus:text-red-500 cursor-pointer"
                                                    >
                                                        <LogOut className="size-4" />
                                                        <span>Logout</span>
                                                    </DropdownMenuItem>
                                                </>
                                            )}
                                        </>
                                    )}

                                    {/* Show auth links if not logged in */}
                                    {!user?.success && (
                                        <>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem asChild>
                                                <Link
                                                    href="/auth/login"
                                                    className="flex w-full items-center rounded-lg px-2 py-2 hover:bg-accent"
                                                >
                                                    Login
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem asChild>
                                                <Link
                                                    href="/auth/register"
                                                    className="flex w-full items-center rounded-lg px-2 py-2 hover:bg-accent"
                                                >
                                                    Register
                                                </Link>
                                            </DropdownMenuItem>
                                        </>
                                    )}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    )}

                    <ThemeToggle />

                    {/* User Avatar Dropdown - Always show on desktop, show on mobile only on dashboard routes */}
                    {user.success && (
                        <div className={isDashboardRoute ? 'block' : 'hidden md:block'}>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <div className="cursor-pointer">
                                        <div className="flex size-10 items-center justify-center rounded-full bg-primary text-white">
                                            {initials || <User className="size-5 text-primary" />}
                                        </div>
                                    </div>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent
                                    align="end"
                                    className="w-fit overflow-hidden rounded-2xl border bg-background p-0 shadow-xl"
                                >
                                    <DropdownMenuLabel>
                                        {/* User Header */}
                                        <div className="bg-linear-to-r from-primary/15 via-primary/10 to-primary/5 rounded-xl p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                                    {initials || <User className="size-6" />}
                                                </div>

                                                <div className="flex-1">
                                                    <h4 className="whitespace-nowrap text-base font-semibold text-accent-foreground">
                                                        {user?.data?.name || 'User Name'}
                                                    </h4>

                                                    <p className="whitespace-nowrap text-sm text-accent-foreground/70">
                                                        {user?.data?.email || 'user@email.com'}
                                                    </p>

                                                    <div className="mt-2 flex items-center gap-2">
                                                        <span className="rounded-full bg-secondary px-2 py-0.5 text-[12px] font-semibold text-accent-foreground/70">
                                                            {user?.data?.role || 'User'}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Menu Items */}
                                        <div className="py-2.5">
                                            {visibleUserMenuItems.map((item) => (
                                                <DropdownMenuItem
                                                    key={item.label}
                                                    asChild
                                                    className={`rounded-lg text-accent-foreground ${item.action === 'profile' && pathname === '/profile'
                                                        ? 'bg-primary/10'
                                                        : ''
                                                        }`}
                                                >
                                                    <button
                                                        onClick={() => handleNavigation(item.action)}
                                                        className="flex w-full items-center gap-3 cursor-pointer px-3 py-2"
                                                    >
                                                        <item.icon className="size-4" />
                                                        <span>{item.label}</span>
                                                        {item.action === 'profile' && pathname === '/profile' && (
                                                            <span className="ml-auto text-xs text-primary">Active</span>
                                                        )}
                                                    </button>
                                                </DropdownMenuItem>
                                            ))}

                                            {!isDashboardRoute && (
                                                <>
                                                    <DropdownMenuItem
                                                        onClick={() => handleNavigation('logout')}
                                                        className="rounded-lg text-red-500 focus:text-red-500 px-3 py-2 cursor-pointer"
                                                    >
                                                        <LogOut className="size-4" />
                                                        <span>Logout</span>
                                                    </DropdownMenuItem>
                                                </>
                                            )}
                                        </div>
                                    </DropdownMenuLabel>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    )}

                    {/* Auth buttons for desktop */}
                    {!user.success && (
                        <div className="hidden md:flex gap-2">
                            <Button
                                asChild
                                variant={
                                    pathname === '/auth/login' ? 'default' : 'outline'
                                }
                                size="sm"
                            >
                                <Link href="/auth/login">Login</Link>
                            </Button>

                            <Button
                                asChild
                                variant={
                                    pathname === '/auth/register'
                                        ? 'default'
                                        : 'outline'
                                }
                                size="sm"
                            >
                                <Link href="/auth/register">Register</Link>
                            </Button>
                        </div>
                    )}

                    {/* Mobile auth buttons - shown as icons when menu icon is visible */}
                    {!user.success && (
                        <div className="flex gap-1 md:hidden">
                            <Button
                                asChild
                                variant="ghost"
                                size="icon"
                            >
                                <Link href="/auth/login">
                                    <span className="sr-only">Login</span>
                                    <User className="h-5 w-5" />
                                </Link>
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
