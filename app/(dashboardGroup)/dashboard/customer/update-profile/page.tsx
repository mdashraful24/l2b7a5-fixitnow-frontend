import { getMe } from "@/services/getMe";
import { redirect } from "next/navigation";
import { CustomerProfileForm } from "../_components/updateProfile/CustomerProfileForm";

export default async function CustomerUpdateProfilePage() {
    const user = await getMe();

    if (!user?.success) {
        redirect("/auth/login");
    }

    if (user.data?.role !== "CUSTOMER") {
        redirect("/");
    }

    const customer = user.data;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-foreground">
                    Edit Profile
                </h1>

                <p className="mt-1 text-sm text-muted-foreground">
                    Update your personal information and
                    account credentials.
                </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <CustomerProfileForm
                    initialValues={{
                        name: customer.name ?? "",
                        email: customer.email ?? "",
                        password: "",
                        phone: customer.phone ?? "",
                        address: customer.address ?? "",
                    }}
                />
            </div>
        </div>
    );
}
