import LoginForm from "../../_components/LoginForm";

export default function LoginPage() {
    return (
        <div className="flex min-h-[90vh] items-center justify-center px-4">
            <div className="w-full max-w-md space-y-6 rounded-lg border p-8 shadow-lg">
                {/* Form Header Section */}
                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-bold">Welcome Back!</h1>
                    <p className="text-foreground/80">
                        Enter your credentials to access your account
                    </p>
                </div>

                {/* Form Section */}
                <LoginForm />

                {/* Additional Links Section */}
                <div className="text-center text-sm text-foreground/80">
                    <p>
                        Don&apos;t have an account?{" "}
                        <a href="/auth/register" className="text-blue-500 font-semibold hover:underline">
                            Register here
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}
