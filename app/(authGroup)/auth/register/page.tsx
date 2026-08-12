import RegisterForm from "../../_components/RegisterForm"

export default function RegisterPage() {
    return (
        <div className="flex min-h-[90vh] items-center justify-center container mx-auto px-4 py-8">
            <div className="w-full max-w-110">
                <div className="space-y-8">
                    {/* Header Section */}
                    <div className="text-center space-y-3">
                        <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-2xl">
                            <div className="size-12 bg-linear-to-br from-primary to-primary/60 rounded-xl flex items-center justify-center">
                                <span className="text-2xl font-bold text-white">🚀</span>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <h1 className="text-3xl font-bold bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                                Create Account
                            </h1>
                            <p className="text-foreground/60 text-sm">
                                Join us and get started with your journey
                            </p>
                        </div>
                    </div>

                    {/* Registration Form */}
                    <RegisterForm />

                    {/* Footer Links */}
                    <div className="text-center space-y-2">
                        <p className="text-sm text-foreground/60">
                            Already have an account?{" "}
                            <a
                                href="/auth/login"
                                className="text-blue-600 font-semibold hover:underline transition-all duration-300 hover:text-blue-500"
                            >
                                Login here
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
