import { getMe } from "@/services/getMe";
import { getTechnicianById } from "@/app/(publicGroup)/_actions/getTechnician";
import { redirect } from "next/navigation";
import { TechnicianAvailabilityManager } from "../_components/techAvailabilitySlot/TechnicianAvailabilityManager";

export default async function TechnicianAvailabilityPage({
    searchParams,
}: {
    searchParams: Promise<{ page?: string }>
}) {
    const user = await getMe();
    const { page } = await searchParams;
    const currentPage = Number(page) || 1;
    const itemsPerPage = 5;

    if (!user?.success) {
        redirect("/auth/login");
    }

    if (user.data?.role !== "TECHNICIAN") {
        redirect("/");
    }

    const technicianId = user.data?.technicianProfile?.id;

    if (!technicianId) {
        return (
            <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
                <h1 className="text-2xl font-bold text-foreground">Availability unavailable</h1>
                <p className="mt-2 text-sm text-muted-foreground">Your technician profile is missing, so availability cannot be managed yet.</p>
            </div>
        );
    }

    const response = await getTechnicianById(technicianId);
    const allSlots = response.data?.availability ?? [];

    if (!response.success) {
        return (
            <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
                <h1 className="text-2xl font-bold text-foreground">Unable to load availability</h1>
                <p className="mt-2 text-sm text-muted-foreground">{response.message || "Please try again later."}</p>
            </div>
        );
    }

    // Calculate pagination
    const totalSlots = allSlots.length;
    const totalPages = Math.ceil(totalSlots / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedSlots = allSlots.slice(startIndex, endIndex);

    return (
        <div className="space-y-6">
            <TechnicianAvailabilityManager
                slots={paginatedSlots}
                totalSlots={totalSlots}
                currentPage={currentPage}
                totalPages={totalPages}
                itemsPerPage={itemsPerPage}
            />
        </div>
    );
}
