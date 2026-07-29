import { getMe } from "@/services/getMe";
import { getTechnicianById } from "@/app/(publicGroup)/_actions/getTechnician";
import { redirect } from "next/navigation";
import { TechnicianProfileForm } from "../_components/TechnicianProfileForm";

export default async function TechnicianProfilePage() {
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
                <h1 className="text-2xl font-bold text-gray-900">Technician profile not found</h1>
                <p className="mt-2 text-sm text-gray-500">Your account does not have a technician profile attached yet.</p>
            </div>
        );
    }

    const response = await getTechnicianById(technicianId);

    if (!response.success) {
        return (
            <div className="rounded-xl border bg-white p-8 shadow-sm">
                <h1 className="text-2xl font-bold text-gray-900">Unable to load profile</h1>
                <p className="mt-2 text-sm text-gray-500">{response.message || "Please try again later."}</p>
            </div>
        );
    }

    const technician = response.data;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Profile & Services</h1>
                <p className="mt-1 text-sm text-gray-500">Keep your public profile accurate so customers can find and trust you.</p>
            </div>

            {/* grid gap-6 xl:grid-cols-[1.15fr_0.85fr] */}
            <div className="">
                <div className="rounded-2xl border bg-white p-6 shadow-sm">
                    <TechnicianProfileForm
                        initialValues={{
                            name: technician.user.name ?? "",
                            email: technician.user.email ?? "",
                            password: "",
                            phone: technician.user.phone ?? "",
                            address: technician.user.address ?? "",
                            bio: technician.bio ?? "",
                            skills: technician.skills ?? [],
                            experience: technician.experience ?? "",
                            description: technician.description ?? "",
                            location: technician.location ?? "",
                        }}
                    />
                </div>

                {/* <div className="space-y-6">
                    <div className="rounded-2xl border bg-white p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-900">Public snapshot</h2>
                        <div className="mt-4 space-y-3 text-sm text-gray-600">
                            <div>
                                <p className="font-medium text-gray-700">Rating</p>
                                <p>{technician.rating} from {technician.reviewStats.totalReviews} reviews</p>
                            </div>
                            <div>
                                <p className="font-medium text-gray-700">Experience</p>
                                <p>{technician.experience || "Not specified"}</p>
                            </div>
                            <div>
                                <p className="font-medium text-gray-700">Location</p>
                                <p>{technician.location || "Not specified"}</p>
                            </div>
                            <div>
                                <p className="font-medium text-gray-700">Skills</p>
                                <p>{technician.skills?.length ? technician.skills.join(", ") : "No skills added yet"}</p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border bg-white p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-900">Offered services</h2>
                        <div className="mt-4 space-y-3">
                            {technician.services?.length ? (
                                technician.services.map((service: any) => (
                                    <div key={service.id} className="rounded-xl border p-4">
                                        <div className="flex items-start justify-between gap-4">
                                            <div>
                                                <p className="font-semibold text-gray-900">{service.title}</p>
                                                <p className="mt-1 text-sm text-gray-500 line-clamp-2">{service.description}</p>
                                            </div>
                                            <div className="text-right text-sm font-semibold text-primary">${service.price}</div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="rounded-xl border border-dashed bg-gray-50 p-6 text-sm text-gray-500">
                                    No services linked to this technician profile.
                                </div>
                            )}
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    );
}