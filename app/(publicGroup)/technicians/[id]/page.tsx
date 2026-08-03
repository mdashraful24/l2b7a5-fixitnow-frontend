import { getTechnicianById } from "../../_actions/getTechnician";
import { notFound } from "next/navigation";
import TechnicianProfile from "../../_components/profileInfo/TechnicianProfile";
import { Suspense } from "react";
import TechnicianProfileSkeleton from "../../_components/profileInfo/TechnicianProfileSkeleton";

export default async function TechnicianByIdPage({
    params
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;
    const response = await getTechnicianById(id);

    if (!response.success || !response.data) {
        notFound();
    }

    const technician = response.data;

    return (
        <div className="lg:container mx-auto max-w-7xl px-4 py-10">
            <Suspense fallback={<TechnicianProfileSkeleton />}>
                <TechnicianProfile technician={technician} />
            </Suspense>
        </div>
    )
}
