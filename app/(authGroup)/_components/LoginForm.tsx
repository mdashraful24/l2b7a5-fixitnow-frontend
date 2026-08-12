/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    useActionState,
    useEffect,
    useState,
    useTransition,
} from "react";
import { googleLoginAction, loginAction } from "../_actions/authActions";
import { toast } from "sonner";
import { useSearchParams, useRouter } from "next/navigation";
import {
    Shield,
    Wrench,
    Users,
    Eye,
    EyeOff,
} from "lucide-react";
import { GoogleLogin } from "@react-oauth/google";
import { UserRoleByGoogle } from "@/lib/type";

type GoogleRole = UserRoleByGoogle["role"];

const LoginForm = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const redirectTo = searchParams.get("redirectTo") ?? "";

    const [state, action, pending] = useActionState(
        loginAction.bind(null, redirectTo),
        null
    );

    const [isQuickLogin, setIsQuickLogin] = useState(false);
    const [isGoogleLogin, setIsGoogleLogin] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [showPassword, setShowPassword] = useState(false);

    // Google login role
    const [googleRole, setGoogleRole] =
        useState<GoogleRole>("CUSTOMER");

    // Demo credentials
    const demoCredentials = {
        admin: {
            email: process.env.NEXT_PUBLIC_ADMIN_EMAIL,
            password: process.env.NEXT_PUBLIC_ADMIN_PASSWORD,
            label: "Admin",
            icon: Shield,
            color: "bg-purple-600 hover:bg-purple-700",
        },

        technician: {
            email: process.env.NEXT_PUBLIC_TECHNICIAN_EMAIL,
            password: process.env.NEXT_PUBLIC_TECHNICIAN_PASSWORD,
            label: "Technician",
            icon: Wrench,
            color: "bg-blue-600 hover:bg-blue-700",
        },

        customer: {
            email: process.env.NEXT_PUBLIC_CUSTOMER_EMAIL,
            password: process.env.NEXT_PUBLIC_CUSTOMER_PASSWORD,
            label: "Customer",
            icon: Users,
            color: "bg-green-600 hover:bg-green-700",
        },
    };

    // Reset local states when component mounts
    useEffect(() => {
        setIsQuickLogin(false);
        setIsGoogleLogin(false);
        setShowPassword(false);
    }, []);

    // Handle normal login state
    useEffect(() => {
        if (!state) return;

        if (!state.success) {
            toast.error(state.message || "Login Failed");
        } else {
            toast.success(
                state.message || "Login Successful"
            );
        }
    }, [state]);

    // Google Login Handler
    const handleGoogleLoginSuccess = async (
        credential: string
    ) => {
        if (
            isPending ||
            pending ||
            isQuickLogin ||
            isGoogleLogin
        ) {
            return;
        }

        setIsGoogleLogin(true);

        try {
            // Use startTransition for server action
            startTransition(async () => {
                const result = await googleLoginAction(
                    credential,
                    googleRole,
                    redirectTo
                );

                setIsGoogleLogin(false);

                if (!result?.success) {
                    toast.error(
                        result?.message ||
                        "Google login failed"
                    );
                    return;
                }

                // Show success toast
                toast.success(
                    result.message || "Google login successful"
                );

                // Handle redirect based on role
                if (redirectTo && redirectTo.startsWith("/") && !redirectTo.startsWith("//")) {
                    router.push(redirectTo);
                    return;
                }

                // Redirect based on role
                const role = result.role || googleRole;
                if (role === "CUSTOMER") {
                    router.push("/dashboard/customer");
                } else if (role === "TECHNICIAN") {
                    router.push("/dashboard/technician");
                } else if (role === "ADMIN") {
                    router.push("/dashboard/admin");
                } else {
                    // Fallback
                    router.push("/dashboard");
                }

                // Refresh the page to update the session
                router.refresh();
            });
        } catch (error) {
            console.error("Google login error:", error);
            toast.error("Google login failed. Please try again.");
            setIsGoogleLogin(false);
        }
    };

    // Quick Login
    const handleQuickLogin = async (
        role: keyof typeof demoCredentials
    ) => {
        if (
            isPending ||
            pending ||
            isQuickLogin ||
            isGoogleLogin
        ) {
            return;
        }

        setIsQuickLogin(true);

        const credentials = demoCredentials[role];

        const formData = new FormData();

        formData.append(
            "email",
            credentials.email || ""
        );

        formData.append(
            "password",
            credentials.password || ""
        );

        try {
            startTransition(async () => {
                const result = await loginAction(
                    redirectTo,
                    null,
                    formData
                );

                setIsQuickLogin(false);

                if (result?.success) {
                    toast.success(
                        `Logged in as ${credentials.label}`
                    );
                } else {
                    toast.error(
                        result?.message ||
                        "Quick login failed"
                    );
                }
            });
        } catch (error) {
            setIsQuickLogin(false);

            toast.error(
                "Login failed. Please try again."
            );

            console.error(
                "Quick login error:",
                error
            );
        }
    };

    // Loading state
    const isLoggingIn =
        isPending ||
        pending ||
        isQuickLogin ||
        isGoogleLogin;

    // Password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="space-y-6">
            {/* Quick Login */}
            <div className="space-y-3">
                <p className="text-sm text-foreground/80 text-center">
                    Quick Login (Demo)
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {Object.entries(
                        demoCredentials
                    ).map(([role, creds]) => {
                        const Icon = creds.icon;

                        return (
                            <Button
                                key={role}
                                type="button"
                                onClick={() =>
                                    handleQuickLogin(
                                        role as keyof typeof demoCredentials
                                    )
                                }
                                disabled={isLoggingIn}
                                className={`${creds.color} text-white w-full flex items-center gap-2`}
                            >
                                <Icon className="size-4" />

                                <span>
                                    {creds.label}
                                </span>
                            </Button>
                        );
                    })}
                </div>
            </div>

            {/* Google Login */}
            <Card className="p-5">
                <div className="text-center space-y-1">
                    <p className="text-[1rem] font-medium">
                        Continue with Google
                    </p>

                    <p className="text-sm text-foreground/90">
                        Choose your account type
                    </p>
                </div>

                {/* Role Selection */}
                <div className="grid grid-cols-2 gap-2">
                    <Button
                        type="button"
                        variant={googleRole === "CUSTOMER" ? "default" : "outline"}
                        className={
                            googleRole === "CUSTOMER"
                                ? "bg-green-600 hover:bg-green-700 text-white"
                                : "hover:border-green-500 hover:text-green-600"
                        }
                        disabled={isLoggingIn}
                        onClick={() => setGoogleRole("CUSTOMER")}
                    >
                        <Users className="size-4 mr-2" />
                        Customer
                    </Button>

                    <Button
                        type="button"
                        variant={googleRole === "TECHNICIAN" ? "default" : "outline"}
                        className={
                            googleRole === "TECHNICIAN"
                                ? "bg-blue-600 hover:bg-blue-700 text-white"
                                : "hover:border-blue-500 hover:text-blue-600"
                        }
                        disabled={isLoggingIn}
                        onClick={() => setGoogleRole("TECHNICIAN")}
                    >
                        <Wrench className="size-4 mr-2" />
                        Technician
                    </Button>
                </div>

                {/* Google Login Button */}
                <div className="flex justify-center w-full">
                    {isGoogleLogin ? (
                        <Button
                            type="button"
                            variant="outline"
                            disabled
                            className="w-full"
                        >
                            <div className="size-4 mr-2 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                            Signing in with Google...
                        </Button>
                    ) : (
                        <GoogleLogin
                            onSuccess={(
                                credentialResponse
                            ) => {
                                if (
                                    !credentialResponse.credential
                                ) {
                                    toast.error(
                                        "Google ID token not received"
                                    );
                                    return;
                                }

                                handleGoogleLoginSuccess(
                                    credentialResponse.credential
                                );
                            }}
                            onError={() => {
                                setIsGoogleLogin(false);
                                toast.error(
                                    "Google login failed. Please try again."
                                );
                            }}
                            useOneTap={false}
                            theme="outline"
                            size="large"
                            width="100%"
                            text="continue_with"
                            shape="pill"
                            logo_alignment="center"
                        />
                    )}
                </div>
            </Card>

            {/* Divider */}
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

            {/* Email / Password Login */}
            <form
                action={action}
                className="space-y-4"
            >
                <Card className="p-5 space-y-4">
                    {/* Email */}
                    <Input
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        required
                        disabled={isLoggingIn}
                    />

                    {/* Password */}
                    <div className="relative">
                        <Input
                            name="password"
                            type={
                                showPassword
                                    ? "text"
                                    : "password"
                            }
                            placeholder="Enter your password"
                            required
                            disabled={isLoggingIn}
                            className="pr-10"
                        />
                        <button
                            type="button"
                            onClick={
                                togglePasswordVisibility
                            }
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/50 hover:text-foreground/80 transition-colors"
                            tabIndex={-1}
                            aria-label={
                                showPassword
                                    ? "Hide password"
                                    : "Show password"
                            }
                        >
                            {showPassword ? (
                                <EyeOff className="size-4" />
                            ) : (
                                <Eye className="size-4" />
                            )}
                        </button>
                    </div>

                    {/* Login */}
                    <Button
                        type="submit"
                        disabled={isLoggingIn}
                        className="w-full"
                    >
                        {isLoggingIn
                            ? "Logging in..."
                            : "Login"}
                    </Button>
                </Card>
            </form>

        </div>
    );
};

export default LoginForm;
