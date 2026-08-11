import { getMe } from "@/services/getMe";
import { redirect } from "next/navigation";
import { AdminProfileForm } from "../_components/updateProfile/AdminProfileForm";

export default async function AdminUpdateProfilePage() {
    const user = await getMe();

    if (!user?.success) {
        redirect("/auth/login");
    }

    if (user.data?.role !== "ADMIN") {
        redirect("/");
    }

    const admin = user.data;

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
                <AdminProfileForm
                    initialValues={{
                        name: admin.name ?? "",
                        email: admin.email ?? "",
                        password: "",
                        phone: admin.phone ?? "",
                        address: admin.address ?? "",
                    }}
                />
            </div>
        </div>
    );
}
