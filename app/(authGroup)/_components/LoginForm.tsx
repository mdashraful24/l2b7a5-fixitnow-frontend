/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useActionState, useEffect, useState, useTransition } from "react";
import { loginAction } from "../_actions/authActions";
import { toast } from "sonner";
import { useSearchParams, useRouter } from "next/navigation";
import { Shield, Wrench, Users, Eye, EyeOff } from "lucide-react";

const LoginForm = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const redirectTo = searchParams.get("redirectTo") ?? "";
    const [state, action, pending] = useActionState(loginAction.bind(null, redirectTo), null);
    const [isQuickLogin, setIsQuickLogin] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [showPassword, setShowPassword] = useState(false);

    // Get credentials from environment variables
    const demoCredentials = {
        admin: {
            email: process.env.NEXT_PUBLIC_ADMIN_EMAIL,
            password: process.env.NEXT_PUBLIC_ADMIN_PASSWORD,
            label: "Admin",
            icon: Shield,
            color: "bg-purple-600 hover:bg-purple-700"
        },
        technician: {
            email: process.env.NEXT_PUBLIC_TECHNICIAN_EMAIL,
            password: process.env.NEXT_PUBLIC_TECHNICIAN_PASSWORD,
            label: "Technician",
            icon: Wrench,
            color: "bg-blue-600 hover:bg-blue-700"
        },
        customer: {
            email: process.env.NEXT_PUBLIC_CUSTOMER_EMAIL,
            password: process.env.NEXT_PUBLIC_CUSTOMER_PASSWORD,
            label: "Customer",
            icon: Users,
            color: "bg-green-600 hover:bg-green-700"
        }
    };

    // Reset state when component mounts or when coming back from logout
    useEffect(() => {
        // Reset any pending states
        setIsQuickLogin(false);
        setShowPassword(false);
    }, []);

    useEffect(() => {
        if (!state) return;

        if (!state.success) {
            toast.error(state.message || "Login Failed");
        } else {
            toast.success(state.message || "Login Successful");
            // Redirect after successful login
            const redirectPath = redirectTo || "/dashboard";
            router.push(redirectPath);
        }
    }, [state, router, redirectTo]);

    // Handle quick login
    const handleQuickLogin = async (role: keyof typeof demoCredentials) => {
        // Don't allow if already pending
        if (isPending || pending || isQuickLogin) return;

        setIsQuickLogin(true);
        const credentials = demoCredentials[role];

        // Create form data
        const formData = new FormData();
        formData.append("email", credentials.email || "");
        formData.append("password", credentials.password || "");

        try {
            // Use startTransition for better state management
            startTransition(async () => {
                const result = await loginAction(redirectTo, null, formData);

                setIsQuickLogin(false);

                if (result?.success) {
                    toast.success(`Logged in as ${credentials.label}`);
                } else {
                    toast.error(result?.message || "Quick login failed");
                }
            });
        } catch (error) {
            setIsQuickLogin(false);
            toast.error("Login failed. Please try again.");
            console.error("Quick login error:", error);
        }
    };

    // Check if any login is in progress
    const isLoggingIn = isPending || pending || isQuickLogin;

    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="space-y-6">
            {/* Quick Login Buttons */}
            <div className="space-y-3">
                <p className="text-sm text-foreground/80 text-center">
                    Quick Login (Demo)
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {Object.entries(demoCredentials).map(([role, creds]) => {
                        const Icon = creds.icon;
                        return (
                            <Button
                                key={role}
                                type="button"
                                onClick={() => handleQuickLogin(role as keyof typeof demoCredentials)}
                                disabled={isLoggingIn}
                                className={`${creds.color} text-white w-full flex items-center gap-2`}
                            >
                                <Icon className="size-4" />
                                <span>{creds.label}</span>
                            </Button>
                        );
                    })}
                </div>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-foreground/80">
                            Or login with email
                        </span>
                    </div>
                </div>
            </div>

            {/* Regular Login Form */}
            <form action={action} className="space-y-4">
                <Card className="p-5 space-y-4">
                    <Input
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        required
                        disabled={isLoggingIn}
                    />
                    <div className="relative">
                        <Input
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            required
                            disabled={isLoggingIn}
                            className="pr-10"
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/50 hover:text-foreground/80 transition-colors"
                            tabIndex={-1}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? (
                                <EyeOff className="size-4" />
                            ) : (
                                <Eye className="size-4" />
                            )}
                        </button>
                    </div>
                    <Button
                        type="submit"
                        disabled={isLoggingIn}
                        className="w-full"
                    >
                        {isLoggingIn ? "Logging in..." : "Login"}
                    </Button>
                </Card>
            </form>
        </div>
    );
};

export default LoginForm;
