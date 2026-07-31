import { getMe } from "@/services/getMe";
import { getTechnicianById } from "@/app/(publicGroup)/_actions/getTechnician";
import { redirect } from "next/navigation";
import { TechnicianAvailabilityManager } from "../_components/TechnicianAvailabilityManager";

export default async function TechnicianAvailabilityPage() {
    const user = await getMe();

    if (!user?.success) {
        redirect("/auth/login");
    }

    if (user.data?.role !== "TECHNICIAN") {
        redirect("/");
    }

    const technicianId = user.data?.technicianProfile?.id;

    if (!technicianId) {
        return (
            <div className="rounded-xl border bg-white p-8 shadow-sm">
                <h1 className="text-2xl font-bold text-gray-900">Availability unavailable</h1>
                <p className="mt-2 text-sm text-gray-500">Your technician profile is missing, so availability cannot be managed yet.</p>
            </div>
        );
    }

    const response = await getTechnicianById(technicianId);

    if (!response.success) {
        return (
            <div className="rounded-xl border bg-white p-8 shadow-sm">
                <h1 className="text-2xl font-bold text-gray-900">Unable to load availability</h1>
                <p className="mt-2 text-sm text-gray-500">{response.message || "Please try again later."}</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Availability scheduler</h1>
                <p className="mt-1 text-sm text-gray-500">Create working hours and toggle availability for booking windows.</p>
            </div>

            <TechnicianAvailabilityManager slots={response.data.availability ?? []} />
        </div>
    );
}
