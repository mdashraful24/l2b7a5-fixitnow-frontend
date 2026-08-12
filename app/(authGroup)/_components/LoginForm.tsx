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
    Mail,
    Lock,
    Sparkles
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
    const [focusedField, setFocusedField] = useState<string | null>(null);

    // Google login role
    const [googleRole, setGoogleRole] =
        useState<GoogleRole>("CUSTOMER");

    // Track which quick login role is being used
    const [activeQuickRole, setActiveQuickRole] = useState<string | null>(null);

    // Demo credentials
    const demoCredentials = {
        admin: {
            email: process.env.NEXT_PUBLIC_ADMIN_EMAIL,
            password: process.env.NEXT_PUBLIC_ADMIN_PASSWORD,
            label: "Admin",
            icon: Shield,
            color: "from-purple-600 to-purple-700",
            hoverColor: "hover:from-purple-700 hover:to-purple-800",
            bgColor: "bg-purple-50 dark:bg-purple-950/20",
            borderColor: "border-purple-200 dark:border-purple-800",
            textColor: "text-purple-600 dark:text-purple-400",
        },
        technician: {
            email: process.env.NEXT_PUBLIC_TECHNICIAN_EMAIL,
            password: process.env.NEXT_PUBLIC_TECHNICIAN_PASSWORD,
            label: "Technician",
            icon: Wrench,
            color: "from-blue-600 to-blue-700",
            hoverColor: "hover:from-blue-700 hover:to-blue-800",
            bgColor: "bg-blue-50 dark:bg-blue-950/20",
            borderColor: "border-blue-200 dark:border-blue-800",
            textColor: "text-blue-600 dark:text-blue-400",
        },
        customer: {
            email: process.env.NEXT_PUBLIC_CUSTOMER_EMAIL,
            password: process.env.NEXT_PUBLIC_CUSTOMER_PASSWORD,
            label: "Customer",
            icon: Users,
            color: "from-green-600 to-green-700",
            hoverColor: "hover:from-green-700 hover:to-green-800",
            bgColor: "bg-green-50 dark:bg-green-950/20",
            borderColor: "border-green-200 dark:border-green-800",
            textColor: "text-green-600 dark:text-green-400",
        },
    };

    // Reset local states when component mounts
    useEffect(() => {
        setIsQuickLogin(false);
        setIsGoogleLogin(false);
        setShowPassword(false);
        setActiveQuickRole(null);
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
        if (isGoogleLogin || isQuickLogin || isPending || pending) {
            return;
        }

        setIsGoogleLogin(true);

        try {
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

                toast.success(
                    result.message || "Google login successful"
                );

                if (redirectTo && redirectTo.startsWith("/") && !redirectTo.startsWith("//")) {
                    router.push(redirectTo);
                    return;
                }

                const role = result.role || googleRole;
                if (role === "CUSTOMER") {
                    router.push("/dashboard/customer");
                } else if (role === "TECHNICIAN") {
                    router.push("/dashboard/technician");
                } else if (role === "ADMIN") {
                    router.push("/dashboard/admin");
                } else {
                    router.push("/dashboard");
                }

                router.refresh();
            });
        } catch (error) {
            toast.error("Google login failed. Please try again.");
            setIsGoogleLogin(false);
        }
    };

    // Quick Login
    const handleQuickLogin = async (
        role: keyof typeof demoCredentials
    ) => {
        if (isQuickLogin || isGoogleLogin || isPending || pending) {
            return;
        }

        setIsQuickLogin(true);
        setActiveQuickRole(role);

        const credentials = demoCredentials[role];

        const formData = new FormData();
        formData.append("email", credentials.email || "");
        formData.append("password", credentials.password || "");

        try {
            startTransition(async () => {
                const result = await loginAction(
                    redirectTo,
                    null,
                    formData
                );

                setIsQuickLogin(false);
                setActiveQuickRole(null);

                if (result?.success) {
                    toast.success(`Logged in as ${credentials.label}`);
                } else {
                    toast.error(result?.message || "Quick login failed");
                }
            });
        } catch (error) {
            setIsQuickLogin(false);
            setActiveQuickRole(null);
            toast.error("Login failed. Please try again.");
        }
    };

    const isLoggingIn = isPending || pending;

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="space-y-8">
            {/* Quick Login Section */}
            <div className="space-y-4">
                <div className="flex items-center gap-2 justify-center">
                    <Sparkles className="size-4 text-yellow-500" />
                    <p className="text-sm font-medium text-foreground/70">
                        Quick Access
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {Object.entries(demoCredentials).map(([role, creds]) => {
                        const Icon = creds.icon;
                        const isThisRoleLoading = isQuickLogin && activeQuickRole === role;

                        return (
                            <Button
                                key={role}
                                type="button"
                                onClick={() =>
                                    handleQuickLogin(
                                        role as keyof typeof demoCredentials
                                    )
                                }
                                disabled={isGoogleLogin || isLoggingIn || (isQuickLogin && activeQuickRole !== role)}
                                className={`bg-linear-to-r ${creds.color} ${creds.hoverColor} text-white w-full flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] border-0`}
                            >
                                {isThisRoleLoading ? (
                                    <>
                                        <div className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                        <span>Logging in...</span>
                                    </>
                                ) : (
                                    <>
                                        <Icon className="size-4" />
                                        <span>{creds.label}</span>
                                    </>
                                )}
                            </Button>
                        );
                    })}
                </div>
            </div>

            {/* Divider */}
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-foreground/10" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-4 text-foreground/70">
                        Or continue with
                    </span>
                </div>
            </div>

            {/* Google Login */}
            <Card className="p-6 border-2 border-foreground/5 bg-linear-to-br from-background to-foreground/5">
                <div className="space-y-4">
                    <div className="text-center space-y-1">
                        <p className="text-sm font-medium">
                            Google Authentication
                        </p>
                        <p className="text-xs text-foreground/70">
                            Select your account type
                        </p>
                    </div>

                    {/* Role Selection */}
                    <div className="grid grid-cols-2 gap-2">
                        {[
                            { role: "CUSTOMER", label: "Customer", icon: Users, color: "green" },
                            { role: "TECHNICIAN", label: "Technician", icon: Wrench, color: "blue" },
                        ].map(({ role, label, icon: Icon, color }) => (
                            <Button
                                key={role}
                                type="button"
                                variant={googleRole === role ? "default" : "outline"}
                                className={`transition-all duration-300 ${googleRole === role
                                    ? `bg-${color}-600 hover:bg-${color}-700 text-white shadow-md`
                                    : `hover:border-${color}-500 hover:text-${color}-600 hover:bg-${color}-50 dark:hover:bg-${color}-950/20`
                                    }`}
                                disabled={isGoogleLogin || isQuickLogin || isLoggingIn}
                                onClick={() => setGoogleRole(role as GoogleRole)}
                            >
                                <Icon className="size-4 mr-2" />
                                {label}
                            </Button>
                        ))}
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
                                {isGoogleLogin ? "Google login in progress..." : "Please wait..."}
                            </Button>
                        ) : (
                            <div className="w-full relative">
                                {isQuickLogin || isLoggingIn ? (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        disabled
                                        className="w-full opacity-50 cursor-not-allowed"
                                    >
                                        <div className="size-4 mr-2 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                                        {isQuickLogin ? "Quick login in progress..." : "Please wait..."}
                                    </Button>
                                ) : (
                                    <GoogleLogin
                                        onSuccess={(credentialResponse) => {
                                            if (!credentialResponse.credential) {
                                                toast.error("Google ID token not received");
                                                return;
                                            }
                                            handleGoogleLoginSuccess(credentialResponse.credential);
                                        }}
                                        onError={() => {
                                            setIsGoogleLogin(false);
                                            toast.error("Google login failed. Please try again.");
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
                        )}
                    </div>
                </div>
            </Card>

            {/* Divider */}
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-foreground/10" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-4 text-foreground/70">
                        Or use email
                    </span>
                </div>
            </div>

            {/* Email / Password Login */}
            <form action={action} className="space-y-4">
                <Card className="p-6 border-2 border-foreground/5 bg-linear-to-br from-background to-foreground/5">
                    <div className="space-y-4">
                        {/* Email */}
                        <div className="relative">
                            <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 size-4 transition-colors duration-300 ${focusedField === "email"
                                ? "text-primary"
                                : "text-foreground/40"
                                }`} />
                            <Input
                                name="email"
                                type="email"
                                placeholder="Enter your email"
                                required
                                disabled={isLoggingIn || isQuickLogin || isGoogleLogin}
                                onFocus={() => setFocusedField("email")}
                                onBlur={() => setFocusedField(null)}
                                className="pl-10 transition-all duration-300 focus:shadow-md"
                            />
                        </div>

                        {/* Password */}
                        <div className="relative">
                            <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 size-4 transition-colors duration-300 ${focusedField === "password"
                                ? "text-primary"
                                : "text-foreground/40"
                                }`} />
                            <Input
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                required
                                disabled={isLoggingIn || isQuickLogin || isGoogleLogin}
                                onFocus={() => setFocusedField("password")}
                                onBlur={() => setFocusedField(null)}
                                className="pl-10 pr-10 transition-all duration-300 focus:shadow-md"
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground/80 transition-colors duration-300"
                                tabIndex={-1}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                            </button>
                        </div>

                        {/* Login Button */}
                        <Button
                            type="submit"
                            disabled={isLoggingIn || isQuickLogin || isGoogleLogin}
                            className="w-full bg-linear-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                        >
                            {isLoggingIn ? (
                                <>
                                    <div className="size-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                    Logging in...
                                </>
                            ) : (
                                "Sign In"
                            )}
                        </Button>
                    </div>
                </Card>
            </form>
        </div>
    );
};

export default LoginForm;
