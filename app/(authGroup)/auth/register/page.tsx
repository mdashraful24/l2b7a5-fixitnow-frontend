import RegisterForm from "../../_components/RegisterForm"

const RegisterPage = () => {
    return (
        <>
            <div className="flex min-h-screen items-center justify-center">
                <div className="w-full max-w-md space-y-6 rounded-lg border p-8 shadow-lg">
                    {/* Form Header Section */}
                    <div className="space-y-2 text-center">
                        <h1 className="text-3xl font-bold">New Here?</h1>
                        <p className="text-gray-600">Enter your details to create an account</p>
                    </div>

                    {/* Form Section */}
                    <RegisterForm />
                </div>
            </div>
        </>
    )
}

export default RegisterPage