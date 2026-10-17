import { getMe } from "@/services/getMe";
import { redirect } from "next/navigation";
import MyProfile from "@/app/(publicGroup)/_components/profileInfo/MyProfile";

export default async function TechnicianProfilePage() {
    const user = await getMe();

    if (!user?.success) {
        redirect("/auth/login");
    }

    if (user.data?.role !== "TECHNICIAN") {
        redirect("/");
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-foreground">
                    My Profile
                </h1>

                <p className="mt-1 text-foreground/80">
                    View your account information and
                    personal details.
                </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <MyProfile user={user.data} />
            </div>
        </div>
    );
}
