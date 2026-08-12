import LoginForm from "../../_components/LoginForm";

export default function LoginPage() {
    return (
        <div className="flex min-h-[90vh] items-center justify-center container mx-auto px-4 py-8">
            <div className="w-full max-w-110">
                <div className="space-y-8">
                    {/* Header Section */}
                    <div className="text-center space-y-3">
                        <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-2xl">
                            <div className="size-12 bg-linear-to-br from-primary to-primary/60 rounded-xl flex items-center justify-center">
                                <span className="text-2xl font-bold text-white">⚡</span>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <h1 className="text-3xl font-bold bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                                Welcome Back!
                            </h1>
                            <p className="text-foreground/60 text-sm">
                                Sign in to your account to continue
                            </p>
                        </div>
                    </div>

                    {/* Login Form */}
                    <LoginForm />

                    {/* Footer Links */}
                    <div className="text-center space-y-2">
                        <p className="text-sm text-foreground/80">
                            Don&apos;t have an account?{" "}
                            <a
                                href="/auth/register"
                                className="text-blue-500 font-semibold hover:underline transition-all duration-300 hover:text-blue-600"
                            >
                                Create one
                            </a>
                        </p>
                        <p className="text-xs text-foreground/70">
                            By signing in, you agree to our{" "}
                            <a href="/terms-of-service" className="hover:text-blue-500 hover:underline">Terms</a>{" "}
                            and{" "}
                            <a href="/privacy-policy" className="hover:text-blue-500 hover:underline">Privacy Policy</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
