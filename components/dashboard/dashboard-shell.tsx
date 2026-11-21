"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
    CalendarDays,
    ChevronUp,
    Home,
    LogOut,
    Menu,
    Monitor,
    Moon,
    Settings2,
    Sun,
    UserRound,
    Wrench,
} from "lucide-react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { logOut } from "@/services/logout";
import {
    dashboardNav,
    dashboardQuickLinks,
    dashboardRoleLabel,
    type DashboardRole,
} from "./dashboard-nav";

type DashboardShellUser = {
    name?: string | null;
    email?: string | null;
    imageUrl?: string | null;
};

type DashboardShellProps = {
    role: DashboardRole;
    user: DashboardShellUser;
    children: ReactNode;
};

const roleBadgeClass: Record<DashboardRole, string> = {
    ADMIN: "bg-violet-500/10 text-violet-600 dark:text-violet-300",
    CUSTOMER: "bg-sky-500/10 text-sky-600 dark:text-sky-300",
    TECHNICIAN: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-300",
};

const themeOptions = [
    { value: "light", label: "Light", icon: Sun },
    { value: "dark", label: "Dark", icon: Moon },
    { value: "system", label: "System", icon: Monitor },
] as const;

const noopSubscribe = () => () => {};
const getServerTheme = () => "system";

export function DashboardShell({ role, user, children }: DashboardShellProps) {
    const pathname = usePathname();
    const router = useRouter();
    const { theme, setTheme } = useTheme();
    const activeTheme = useSyncExternalStore(
        noopSubscribe,
        () => theme ?? "system",
        getServerTheme,
    );
    const [open, setOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const userMenuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handlePointerDown = (event: PointerEvent) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
                setUserMenuOpen(false);
            }
        };
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") setUserMenuOpen(false);
        };

        document.addEventListener("pointerdown", handlePointerDown);
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("pointerdown", handlePointerDown);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    const initials = user.name
        ?.split(" ")
        .slice(0, 2)
        .map((word) => word[0])
        .join("")
        .toUpperCase();

    const handleLogout = async () => {
        setUserMenuOpen(false);
        await logOut();
        toast.success("Logged out successfully");
        router.push("/auth/login");
    };

    const isActive = (href: string, exact?: boolean, altHrefs?: string[]) =>
        exact
            ? pathname === href || (altHrefs?.includes(pathname) ?? false)
            : pathname === href || pathname.startsWith(`${href}/`);

    const userTrigger = (isCollapsed: boolean) => (
        <button
            type="button"
            onClick={() => setUserMenuOpen((value) => !value)}
            aria-expanded={userMenuOpen}
            aria-haspopup="menu"
            className={`flex w-full items-center rounded-lg text-left transition-colors hover:bg-card ${
                isCollapsed ? "justify-center p-1" : "gap-3 bg-card p-3"
            }`}
        >
            <Avatar className="size-9 shrink-0">
                {user.imageUrl && <AvatarImage src={user.imageUrl} alt={user.name ?? "User"} />}
                <AvatarFallback className="bg-primary text-xs text-primary-foreground">
                    {initials || <Wrench className="size-4" />}
                </AvatarFallback>
            </Avatar>
            {!isCollapsed && (
                <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{user.name || "User"}</p>
                    <p className="truncate text-xs text-muted-foreground">{user.email || "No email"}</p>
                </div>
            )}
            {!isCollapsed && (
                <ChevronUp
                    className={`size-4 shrink-0 text-muted-foreground transition-transform duration-200 ${
                        userMenuOpen ? "rotate-180" : ""
                    }`}
                />
            )}
        </button>
    );

    const sidebar = (
        isCollapsed: boolean,
        onNavigate?: () => void,
        onToggle?: () => void,
    ) => (
        <div className="flex h-full flex-col bg-muted/30">
            <div
                className={`flex h-16 shrink-0 items-center border-b border-border/70 ${
                    isCollapsed ? "justify-center px-2" : "gap-2 px-3"
                }`}
            >
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={onToggle}
                            aria-label="Toggle dashboard navigation"
                            className="shrink-0 text-muted-foreground hover:text-foreground"
                        >
                            <Menu className="size-5" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right">Toggle navigation</TooltipContent>
                </Tooltip>
                {!isCollapsed && (
                    <Link href="/" className="brand min-w-0" aria-label="FixItNow home">
                        <span className="brand-mark">
                            <Wrench size={17} strokeWidth={2.5} />
                        </span>
                        <p className="truncate">FixIt<span>Now</span></p>
                    </Link>
                )}
            </div>

            <div className={`flex-1 overflow-y-auto py-5 ${isCollapsed ? "px-2" : "px-3"}`}>
                {dashboardNav[role].map((group) => (
                    <div key={group.label} className="mb-6 last:mb-0">
                        {!isCollapsed && (
                            <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/70">
                                {group.label}
                            </p>
                        )}
                        <nav className="space-y-0.5">
                            {group.items.map((item) => {
                                const active = isActive(item.href, item.exact, item.altHrefs);
                                const link = (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={onNavigate}
                                        className={`flex items-center rounded-full text-sm font-medium transition-colors ${
                                            isCollapsed ? "justify-center px-0 py-2.5" : "gap-3 px-3 py-2.5"
                                        } ${
                                            active
                                                ? "bg-primary/10 text-primary dark:bg-primary/15"
                                                : "text-muted-foreground hover:bg-card hover:text-foreground"
                                        }`}
                                    >
                                        <item.icon className="size-4 shrink-0" />
                                        {!isCollapsed && <span className="truncate">{item.label}</span>}
                                    </Link>
                                );

                                if (isCollapsed) {
                                    return (
                                        <Tooltip key={`tooltip-${item.href}`}>
                                            <TooltipTrigger asChild>{link}</TooltipTrigger>
                                            <TooltipContent side="right">{item.label}</TooltipContent>
                                        </Tooltip>
                                    );
                                }

                                return link;
                            })}
                        </nav>
                    </div>
                ))}
            </div>

            <div
                ref={userMenuRef}
                className={`relative shrink-0 border-t border-border/70 ${isCollapsed ? "p-2" : "p-3"}`}
            >
                <div
                    role="menu"
                    aria-hidden={!userMenuOpen}
                    className={`absolute bottom-full left-2 z-100 mb-2 w-67 origin-bottom transition-all duration-200 ease-out ${
                        userMenuOpen
                            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
                            : "pointer-events-none translate-y-2 scale-95 opacity-0"
                    }`}
                >
                    <div className="rounded-xl border border-border bg-popover p-2 shadow-xl backdrop-blur">
                        <div className="px-2 py-2">
                            <div className="flex items-center gap-3">
                                <Avatar className="size-9 shrink-0">
                                    {user.imageUrl && (
                                        <AvatarImage src={user.imageUrl} alt={user.name ?? "User"} />
                                    )}
                                    <AvatarFallback className="bg-primary text-xs text-primary-foreground">
                                        {initials || <Wrench className="size-4" />}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="min-w-0">
                                    <p className="truncate text-sm font-medium">{user.name || "User"}</p>
                                    <p className="truncate text-xs text-muted-foreground">
                                        {user.email || "No email"}
                                    </p>
                                </div>
                            </div>
                            <span
                                className={`mt-2 inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${roleBadgeClass[role]}`}
                            >
                                {role.toLowerCase()}
                            </span>
                        </div>

                        <div className="my-1 h-px bg-border" />
                        <p className="px-2 pb-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/70">
                            Account
                        </p>
                        <Link
                            role="menuitem"
                            href={dashboardQuickLinks[role].profile}
                            onClick={() => {
                                setUserMenuOpen(false);
                                onNavigate?.();
                            }}
                            className="flex items-center gap-3 rounded-lg px-2 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        >
                            <UserRound className="size-4" />
                            My Profile
                        </Link>
                        <Link
                            role="menuitem"
                            href={dashboardQuickLinks[role].updateProfile}
                            onClick={() => {
                                setUserMenuOpen(false);
                                onNavigate?.();
                            }}
                            className="flex items-center gap-3 rounded-lg px-2 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        >
                            <Settings2 className="size-4" />
                            Edit Profile
                        </Link>
                        <Link
                            role="menuitem"
                            href={dashboardQuickLinks[role].activity}
                            onClick={() => {
                                setUserMenuOpen(false);
                                onNavigate?.();
                            }}
                            className="flex items-center gap-3 rounded-lg px-2 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        >
                            <CalendarDays className="size-4" />
                            My Activity
                        </Link>
                        <Link
                            role="menuitem"
                            href="/"
                            onClick={() => {
                                setUserMenuOpen(false);
                                onNavigate?.();
                            }}
                            className="flex items-center gap-3 rounded-lg px-2 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        >
                            <Home className="size-4" />
                            Back to Site
                        </Link>

                        <div className="my-1 h-px bg-border" />
                        <p className="px-2 pb-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/70">
                            Appearance
                        </p>
                        <div className="grid grid-cols-3 gap-1">
                            {themeOptions.map((option) => {
                                const Icon = option.icon;
                                const active = activeTheme === option.value;
                                return (
                                    <button
                                        key={option.value}
                                        type="button"
                                        role="menuitemradio"
                                        aria-checked={active}
                                        onClick={() => {
                                            setTheme(option.value);
                                            setUserMenuOpen(false);
                                        }}
                                        className={`flex flex-col items-center gap-1 rounded-lg px-1 py-2 text-[11px] font-medium transition-colors ${
                                            active
                                                ? "bg-primary/10 text-primary"
                                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                        }`}
                                    >
                                        <Icon className="size-4" />
                                        {option.label}
                                    </button>
                                );
                            })}
                        </div>

                        <div className="my-1 h-px bg-border" />
                        <button
                            type="button"
                            role="menuitem"
                            onClick={handleLogout}
                            className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
                        >
                            <LogOut className="size-4" />
                            Log out
                        </button>
                    </div>
                </div>

                {isCollapsed ? (
                    <Tooltip>
                        <TooltipTrigger asChild>{userTrigger(true)}</TooltipTrigger>
                        <TooltipContent side="right">Account menu</TooltipContent>
                    </Tooltip>
                ) : (
                    userTrigger(false)
                )}
            </div>
        </div>
    );

    return (
        <div className="flex min-h-screen bg-background">
            <aside
                className={`relative z-50 hidden shrink-0 border-r border-border/70 bg-muted/30 lg:block ${
                    collapsed ? "w-19" : "w-66"
                }`}
            >
                <div className="sticky top-0 z-50 h-screen">
                    {sidebar(collapsed, undefined, () => setCollapsed((value) => !value))}
                </div>
            </aside>

            <div className="min-w-0 flex-1">
                <div className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
                    <div className="mb-6 flex items-center gap-3 lg:hidden">
                        <Sheet open={open} onOpenChange={setOpen}>
                            <SheetTrigger asChild>
                                <Button variant="outline" size="icon" aria-label="Open dashboard navigation">
                                    <Menu className="size-4" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-75 p-0 sm:max-w-75">
                                <SheetTitle className="sr-only">Dashboard navigation</SheetTitle>
                                {sidebar(false, () => setOpen(false), () => setOpen(false))}
                            </SheetContent>
                        </Sheet>
                        <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-foreground">{dashboardRoleLabel[role]}</p>
                            <p className="truncate text-xs text-muted-foreground">FixItNow workspace</p>
                        </div>
                    </div>

                    <main className="space-y-6">{children}</main>
                </div>
            </div>
        </div>
    );
}
