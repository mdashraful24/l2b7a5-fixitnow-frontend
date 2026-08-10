"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
    createTechnicianAvailability,
    updateTechnicianAvailability,
} from "@/app/(dashboardGroup)/_actions/technician";
import { TechnicianAvailabilityManagerProps } from "@/lib/type";
import { Calendar, Clock, Plus, Save, ChevronLeft, ChevronRight, X } from "lucide-react";

const dayOptions = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
] as const;

const toDateTimeLocal = (value: string) => {
    const date = new Date(value);
    const offset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() - offset).toISOString().slice(0, 16);
};

const getBangladeshDayName = (value: string) =>
    new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        timeZone: "Asia/Dhaka",
    }).format(new Date(value));

export function TechnicianAvailabilityManager({
    slots,
    totalSlots = 0,
    currentPage = 1,
    totalPages = 1,
    itemsPerPage = 5
}: TechnicianAvailabilityManagerProps) {
    const router = useRouter();
    const [creating, setCreating] = useState(false);
    const [savingSlotId, setSavingSlotId] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newSlot, setNewSlot] = useState({
        dayOfWeek: "",
        startAt: "",
        endAt: "",
        isAvailable: true,
    });

    // Sort slots by creation date (newest first)
    const sortedSlots = useMemo(
        () =>
            [...slots].sort(
                (left, right) =>
                    new Date(right.createdAt).getTime() -
                    new Date(left.createdAt).getTime()
            ),
        [slots]
    );

    // Handle page change
    const handlePageChange = (page: number) => {
        const params = new URLSearchParams(window.location.search);
        params.set('page', page.toString());
        router.push(`${window.location.pathname}?${params.toString()}`);
    };

    const handleCreate = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Validate that start time and end time are provided
        if (!newSlot.startAt || !newSlot.endAt) {
            toast.error("Please select both start time and end time");
            return;
        }

        // Validate that start time is before end time
        const startDate = new Date(newSlot.startAt);
        const endDate = new Date(newSlot.endAt);

        if (startDate >= endDate) {
            toast.error("Start time must be before end time");
            return;
        }

        const resolvedDay = getBangladeshDayName(startDate.toISOString()) as (typeof dayOptions)[number];

        if (newSlot.dayOfWeek && newSlot.dayOfWeek !== resolvedDay) {
            toast.message(`Day adjusted to ${resolvedDay} based on Bangladesh time`);
        }

        setCreating(true);

        try {
            const result = await createTechnicianAvailability({
                dayOfWeek: resolvedDay,
                startAt: startDate.toISOString(),
                endAt: endDate.toISOString(),
                isAvailable: newSlot.isAvailable,
            });

            if (result.success) {
                toast.success(result.message || "Availability slot created");
                router.refresh();
                setIsModalOpen(false);
                setNewSlot({ dayOfWeek: resolvedDay, startAt: "", endAt: "", isAvailable: true });
            } else {
                toast.error(result.message || "Unable to create slot");
            }
        } catch (error) {
            toast.error("An error occurred while creating the slot");
            console.error(error);
        } finally {
            setCreating(false);
        }
    };

    const openModal = () => {
        setNewSlot({ dayOfWeek: "", startAt: "", endAt: "", isAvailable: true });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        if (!creating) {
            setIsModalOpen(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Create Button */}
            <div className="flex lg:flex-row flex-col justify-between gap-5">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Availability scheduler</h1>
                    <p className="mt-1 text-foreground/80">Create working hours and toggle availability for booking windows.</p>
                </div>

                <button
                    onClick={openModal}
                    className="flex w-full md:w-fit items-center justify-center md:justify-start gap-2 px-6 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-semibold rounded-xl transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer"
                >
                    <Plus className="w-4 h-4" />
                    Create availability slot
                </button>
            </div>

            {/* Modal Overlay */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity"
                    onClick={closeModal}
                >
                    <div
                        className="relative w-full max-w-3xl bg-card rounded-2xl shadow-2xl border border-border overflow-hidden transition-transform"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="px-6 py-5 border-b border-border bg-linear-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-950/20 dark:to-indigo-950/20">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                                        <Plus className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-semibold text-foreground">Create availability slot</h2>
                                        <p className="text-sm text-muted-foreground">Add working hours that customers can book</p>
                                    </div>
                                </div>
                                <button
                                    onClick={closeModal}
                                    disabled={creating}
                                    className="p-2 rounded-lg hover:bg-muted/70 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <X className="w-5 h-5 text-muted-foreground" />
                                </button>
                            </div>
                        </div>

                        {/* Modal Body */}
                        <form onSubmit={handleCreate} className="p-6">
                            <div className="rounded-2xl border border-border/70 bg-muted/20 p-4">
                                <div className="mb-4 flex items-start justify-between gap-3">
                                    <div>
                                        <p className="text-sm font-semibold text-foreground">New availability window</p>
                                        <p className="text-sm text-muted-foreground">Pick a day and the exact start/end times. The day will be adjusted automatically for Bangladesh time when needed.</p>
                                    </div>
                                </div>

                                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-foreground flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-muted-foreground" />
                                            Day
                                        </label>
                                        <select
                                            value={newSlot.dayOfWeek}
                                            onChange={(event) => setNewSlot((current) => ({ ...current, dayOfWeek: event.target.value }))}
                                            className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                                            required
                                        >
                                            <option value="">Select day</option>
                                            {dayOptions.map((day) => (
                                                <option key={day} value={day}>{day}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-foreground flex items-center gap-2">
                                            <Clock className="w-4 h-4 text-muted-foreground" />
                                            Start time <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="datetime-local"
                                            value={newSlot.startAt}
                                            onChange={(event) => setNewSlot((current) => ({ ...current, startAt: event.target.value }))}
                                            className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-foreground flex items-center gap-2">
                                            <Clock className="w-4 h-4 text-muted-foreground" />
                                            End time <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="datetime-local"
                                            value={newSlot.endAt}
                                            onChange={(event) => setNewSlot((current) => ({ ...current, endAt: event.target.value }))}
                                            className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                                            required
                                        />
                                    </div>

                                    <div className="flex items-end">
                                        <label className="flex w-full items-center justify-between gap-3 rounded-xl border border-input bg-background px-4 py-2.5 text-sm font-medium text-foreground hover:bg-muted/70 transition-colors duration-200 cursor-pointer">
                                            <span>Available for booking</span>
                                            <input
                                                type="checkbox"
                                                checked={newSlot.isAvailable}
                                                onChange={(event) => setNewSlot((current) => ({ ...current, isAvailable: event.target.checked }))}
                                                className="h-4 w-4 rounded border-input text-primary focus:ring-primary focus:ring-2"
                                            />
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="mt-6 flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    disabled={creating}
                                    className="px-6 py-2.5 bg-muted hover:bg-muted/80 text-foreground text-sm font-semibold rounded-xl transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={creating}
                                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-semibold rounded-xl transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                                >
                                    {creating ? (
                                        <>
                                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                            Creating...
                                        </>
                                    ) : (
                                        <>
                                            <Plus className="w-4 h-4" />
                                            Add slot
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Current Schedule */}
            <div className="bg-card rounded-2xl shadow border border-border overflow-hidden">
                <div className="px-6 py-3 border-b border-border bg-linear-to-r from-emerald-50/50 to-teal-50/50 dark:from-emerald-950/20 dark:to-teal-950/20">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                                <Calendar className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-foreground">Current schedule</h2>
                                <p className="text-sm text-muted-foreground">Manage your availability slots</p>
                            </div>
                        </div>
                        <div className="text-sm text-foreground">
                            {totalSlots} {totalSlots === 1 ? 'slot' : 'slots'} total
                            {totalPages > 1 && ` • Page ${currentPage} of ${totalPages}`}
                        </div>
                    </div>
                </div>

                <div className="p-6">
                    {sortedSlots.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-muted/50 rounded-full mb-4">
                                <Calendar className="w-8 h-8 text-muted-foreground" />
                            </div>
                            <p className="text-foreground font-medium">No availability slots yet</p>
                            <p className="text-sm text-muted-foreground mt-1">
                                <button
                                    onClick={openModal}
                                    className="text-primary hover:underline font-medium"
                                >
                                    Create your first availability slot
                                </button>
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {sortedSlots.map((slot) => (
                                <form
                                    key={slot.id}
                                    onSubmit={async (event) => {
                                        event.preventDefault();
                                        const formData = new FormData(event.currentTarget);
                                        setSavingSlotId(slot.id);

                                        const startAt = String(formData.get("startAt"));
                                        const endAt = String(formData.get("endAt"));

                                        // Validate that start time and end time are provided
                                        if (!startAt || !endAt) {
                                            toast.error("Please select both start time and end time");
                                            setSavingSlotId(null);
                                            return;
                                        }

                                        // Validate that start time is before end time
                                        const startDate = new Date(startAt);
                                        const endDate = new Date(endAt);

                                        if (startDate >= endDate) {
                                            toast.error("Start time must be before end time");
                                            setSavingSlotId(null);
                                            return;
                                        }

                                        const resolvedDay = getBangladeshDayName(startDate.toISOString()) as (typeof dayOptions)[number];

                                        const result = await updateTechnicianAvailability({
                                            availabilitySlotId: slot.id,
                                            dayOfWeek: resolvedDay,
                                            startAt: startDate.toISOString(),
                                            endAt: endDate.toISOString(),
                                            isAvailable: formData.get("isAvailable") === "on",
                                        });

                                        setSavingSlotId(null);

                                        if (result.success) {
                                            toast.success(result.message || "Availability updated");
                                            router.refresh();
                                        } else {
                                            toast.error(result.message || "Unable to update slot");
                                        }
                                    }}
                                    className="group rounded-xl border border-border/80 bg-background/70 p-5 transition-all duration-200 shadow-sm hover:shadow-md hover:border-primary/40"
                                >
                                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5 items-start">
                                        <div className="space-y-1">
                                            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Day</label>
                                            <select
                                                name="dayOfWeek"
                                                defaultValue={slot.dayOfWeek}
                                                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                                            >
                                                {dayOptions.map((day) => (
                                                    <option key={day} value={day}>{day}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="space-y-1">
                                            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Start <span className="text-red-500">*</span></label>
                                            <input
                                                name="startAt"
                                                type="datetime-local"
                                                defaultValue={toDateTimeLocal(slot.startAt)}
                                                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                                                required
                                            />
                                        </div>

                                        <div className="space-y-1">
                                            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">End <span className="text-red-500">*</span></label>
                                            <input
                                                name="endAt"
                                                type="datetime-local"
                                                defaultValue={toDateTimeLocal(slot.endAt)}
                                                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                                                required
                                            />
                                        </div>

                                        <div className="space-y-1">
                                            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</label>
                                            <label className="flex items-center justify-between gap-3 rounded-lg border border-input bg-background px-3 py-2 text-sm font-medium text-foreground cursor-pointer hover:bg-muted/70 transition-colors duration-200">
                                                <span className={slot.isAvailable ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}>
                                                    {slot.isAvailable ? "Available" : "Unavailable"}
                                                </span>
                                                <input
                                                    name="isAvailable"
                                                    type="checkbox"
                                                    defaultChecked={slot.isAvailable}
                                                    className="h-4 w-4 rounded border-input text-primary focus:ring-primary focus:ring-2"
                                                />
                                            </label>
                                        </div>

                                        <div className="flex flex-col gap-2 pt-2 md:pt-0">
                                            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Update Slot</label>
                                            <button
                                                type="submit"
                                                disabled={savingSlotId === slot.id}
                                                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-semibold rounded-lg transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                                            >
                                                {savingSlotId === slot.id ? (
                                                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                    </svg>
                                                ) : (
                                                    <Save className="w-4 h-4" />
                                                )}
                                                <span>{savingSlotId === slot.id ? "Saving..." : "Save"}</span>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Add simple pagination controls */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between gap-4 pt-4 border-t border-border">
                    <div className="text-sm text-foreground/70">
                        Showing {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, totalSlots)} of {totalSlots} slots
                    </div>
                    <div className="flex items-center gap-1">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-3 py-1.5 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer hover:bg-gray-50 transition-colors dark:hover:text-black"
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </button>
                        <span className="px-3 py-1.5 text-sm font-medium flex items-center gap-2">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1.5 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer hover:bg-gray-50 transition-colors dark:hover:text-black"
                        >
                            <ChevronRight className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}









// "use client";

// import { useMemo, useState } from "react";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";
// import {
//     createTechnicianAvailability,
//     updateTechnicianAvailability,
// } from "@/app/(dashboardGroup)/_actions/technician";
// import { AvailabilitySlot } from "@/lib/type";
// import { Calendar, Clock, Plus, Save } from "lucide-react";

// const dayOptions = [
//     "Sunday",
//     "Monday",
//     "Tuesday",
//     "Wednesday",
//     "Thursday",
//     "Friday",
//     "Saturday",
// ] as const;

// const toDateTimeLocal = (value: string) => {
//     const date = new Date(value);
//     const offset = date.getTimezoneOffset() * 60000;
//     return new Date(date.getTime() - offset).toISOString().slice(0, 16);
// };

// const getBangladeshDayName = (value: string) =>
//     new Intl.DateTimeFormat("en-US", {
//         weekday: "long",
//         timeZone: "Asia/Dhaka",
//     }).format(new Date(value));

// export function TechnicianAvailabilityManager({ slots }: { slots: AvailabilitySlot[] }) {
//     const router = useRouter();
//     const [creating, setCreating] = useState(false);
//     const [savingSlotId, setSavingSlotId] = useState<string | null>(null);
//     const [newSlot, setNewSlot] = useState({
//         dayOfWeek: "",
//         startAt: "",
//         endAt: "",
//         isAvailable: true,
//     });

//     const sortedSlots = useMemo(
//         () =>
//             [...slots].sort(
//                 (left, right) =>
//                     new Date(right.createdAt).getTime() -
//                     new Date(left.createdAt).getTime()
//             ),
//         [slots]
//     );

//     const handleCreate = async (event: React.FormEvent<HTMLFormElement>) => {
//         event.preventDefault();

//         // Validate that start time and end time are provided
//         if (!newSlot.startAt || !newSlot.endAt) {
//             toast.error("Please select both start time and end time");
//             return;
//         }

//         // Validate that start time is before end time
//         const startDate = new Date(newSlot.startAt);
//         const endDate = new Date(newSlot.endAt);

//         if (startDate >= endDate) {
//             toast.error("Start time must be before end time");
//             return;
//         }

//         const resolvedDay = getBangladeshDayName(startDate.toISOString()) as (typeof dayOptions)[number];

//         if (newSlot.dayOfWeek && newSlot.dayOfWeek !== resolvedDay) {
//             toast.message(`Day adjusted to ${resolvedDay} based on Bangladesh time`);
//         }

//         setCreating(true);

//         try {
//             const result = await createTechnicianAvailability({
//                 dayOfWeek: resolvedDay,
//                 startAt: startDate.toISOString(),
//                 endAt: endDate.toISOString(),
//                 isAvailable: newSlot.isAvailable,
//             });

//             if (result.success) {
//                 toast.success(result.message || "Availability slot created");
//                 router.refresh();
//                 setNewSlot({ dayOfWeek: resolvedDay, startAt: "", endAt: "", isAvailable: true });
//             } else {
//                 toast.error(result.message || "Unable to create slot");
//             }
//         } catch (error) {
//             toast.error("An error occurred while creating the slot");
//             console.error(error);
//         } finally {
//             setCreating(false);
//         }
//     };

//     return (
//         <div className="space-y-6">
//             {/* Create Form */}
//             <div className="bg-card rounded-2xl shadow-lg border border-border overflow-hidden">
//                 <div className="px-6 py-5 border-b border-border bg-linear-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-950/20 dark:to-indigo-950/20">
//                     <div className="flex items-center gap-3">
//                         <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
//                             <Plus className="w-5 h-5 text-blue-600 dark:text-blue-400" />
//                         </div>
//                         <div>
//                             <h2 className="text-lg font-semibold text-foreground">Create availability slot</h2>
//                             <p className="text-sm text-muted-foreground">Add working hours that customers can book</p>
//                         </div>
//                     </div>
//                 </div>

//                 <form onSubmit={handleCreate} className="p-6">
//                     <div className="rounded-2xl border border-border/70 bg-muted/20 p-4">
//                         <div className="mb-4 flex items-start justify-between gap-3">
//                             <div>
//                                 <p className="text-sm font-semibold text-foreground">New availability window</p>
//                                 <p className="text-sm text-muted-foreground">Pick a day and the exact start/end times. The day will be adjusted automatically for Bangladesh time when needed.</p>
//                             </div>
//                         </div>

//                         <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
//                             <div className="space-y-2">
//                                 <label className="text-sm font-medium text-foreground flex items-center gap-2">
//                                     <Calendar className="w-4 h-4 text-muted-foreground" />
//                                     Day
//                                 </label>
//                                 <select
//                                     value={newSlot.dayOfWeek}
//                                     onChange={(event) => setNewSlot((current) => ({ ...current, dayOfWeek: event.target.value }))}
//                                     className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
//                                     required
//                                 >
//                                     <option value="">Select day</option>
//                                     {dayOptions.map((day) => (
//                                         <option key={day} value={day}>{day}</option>
//                                     ))}
//                                 </select>
//                             </div>

//                             <div className="space-y-2">
//                                 <label className="text-sm font-medium text-foreground flex items-center gap-2">
//                                     <Clock className="w-4 h-4 text-muted-foreground" />
//                                     Start time <span className="text-red-500">*</span>
//                                 </label>
//                                 <input
//                                     type="datetime-local"
//                                     value={newSlot.startAt}
//                                     onChange={(event) => setNewSlot((current) => ({ ...current, startAt: event.target.value }))}
//                                     className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
//                                     required
//                                 />
//                             </div>

//                             <div className="space-y-2">
//                                 <label className="text-sm font-medium text-foreground flex items-center gap-2">
//                                     <Clock className="w-4 h-4 text-muted-foreground" />
//                                     End time <span className="text-red-500">*</span>
//                                 </label>
//                                 <input
//                                     type="datetime-local"
//                                     value={newSlot.endAt}
//                                     onChange={(event) => setNewSlot((current) => ({ ...current, endAt: event.target.value }))}
//                                     className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
//                                     required
//                                 />
//                             </div>

//                             <div className="flex items-end">
//                                 <label className="flex w-full items-center justify-between gap-3 rounded-xl border border-input bg-background px-4 py-2.5 text-sm font-medium text-foreground hover:bg-muted/70 transition-colors duration-200 cursor-pointer">
//                                     <span>Available for booking</span>
//                                     <input
//                                         type="checkbox"
//                                         checked={newSlot.isAvailable}
//                                         onChange={(event) => setNewSlot((current) => ({ ...current, isAvailable: event.target.checked }))}
//                                         className="h-4 w-4 rounded border-input text-primary focus:ring-primary focus:ring-2"
//                                     />
//                                 </label>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="mt-6 flex justify-end">
//                         <button
//                             type="submit"
//                             disabled={creating}
//                             className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-semibold rounded-xl transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
//                         >
//                             {creating ? (
//                                 <>
//                                     <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
//                                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
//                                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
//                                     </svg>
//                                     Creating...
//                                 </>
//                             ) : (
//                                 <>
//                                     <Plus className="w-4 h-4" />
//                                     Add slot
//                                 </>
//                             )}
//                         </button>
//                     </div>
//                 </form>
//             </div>

//             {/* Current Schedule */}
//             <div className="bg-card rounded-2xl shadow-lg border border-border overflow-hidden">
//                 <div className="px-6 py-3 border-b border-border bg-linear-to-r from-emerald-50/50 to-teal-50/50 dark:from-emerald-950/20 dark:to-teal-950/20">
//                     <div className="flex items-center justify-between">
//                         <div className="flex items-center gap-3">
//                             <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
//                                 <Calendar className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
//                             </div>
//                             <div>
//                                 <h2 className="text-lg font-semibold text-foreground">Current schedule</h2>
//                                 <p className="text-sm text-muted-foreground">Manage your availability slots</p>
//                             </div>
//                         </div>
//                         <div className="text-sm text-foreground">
//                             {sortedSlots.length} {sortedSlots.length === 1 ? 'slot' : 'slots'}
//                         </div>
//                     </div>
//                 </div>

//                 <div className="p-6">
//                     {sortedSlots.length === 0 ? (
//                         <div className="text-center py-12">
//                             <div className="inline-flex items-center justify-center w-16 h-16 bg-muted/50 rounded-full mb-4">
//                                 <Calendar className="w-8 h-8 text-muted-foreground" />
//                             </div>
//                             <p className="text-foreground font-medium">No availability slots yet</p>
//                             <p className="text-sm text-muted-foreground mt-1">Create your first availability slot above</p>
//                         </div>
//                     ) : (
//                         <div className="space-y-4">
//                             {sortedSlots.map((slot) => (
//                                 <form
//                                     key={slot.id}
//                                     onSubmit={async (event) => {
//                                         event.preventDefault();
//                                         const formData = new FormData(event.currentTarget);
//                                         setSavingSlotId(slot.id);

//                                         const startAt = String(formData.get("startAt"));
//                                         const endAt = String(formData.get("endAt"));

//                                         // Validate that start time and end time are provided
//                                         if (!startAt || !endAt) {
//                                             toast.error("Please select both start time and end time");
//                                             setSavingSlotId(null);
//                                             return;
//                                         }

//                                         // Validate that start time is before end time
//                                         const startDate = new Date(startAt);
//                                         const endDate = new Date(endAt);

//                                         if (startDate >= endDate) {
//                                             toast.error("Start time must be before end time");
//                                             setSavingSlotId(null);
//                                             return;
//                                         }

//                                         const resolvedDay = getBangladeshDayName(startDate.toISOString()) as (typeof dayOptions)[number];

//                                         const result = await updateTechnicianAvailability({
//                                             availabilitySlotId: slot.id,
//                                             dayOfWeek: resolvedDay,
//                                             startAt: startDate.toISOString(),
//                                             endAt: endDate.toISOString(),
//                                             isAvailable: formData.get("isAvailable") === "on",
//                                         });

//                                         setSavingSlotId(null);

//                                         if (result.success) {
//                                             toast.success(result.message || "Availability updated");
//                                             router.refresh();
//                                         } else {
//                                             toast.error(result.message || "Unable to update slot");
//                                         }
//                                     }}
//                                     className="group rounded-xl border border-border/80 bg-background/70 p-5 transition-all duration-200 shadow-sm hover:shadow-md hover:border-primary/40"
//                                 >
//                                     <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5 items-start">
//                                         <div className="space-y-1">
//                                             <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Day</label>
//                                             <select
//                                                 name="dayOfWeek"
//                                                 defaultValue={slot.dayOfWeek}
//                                                 className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
//                                             >
//                                                 {dayOptions.map((day) => (
//                                                     <option key={day} value={day}>{day}</option>
//                                                 ))}
//                                             </select>
//                                         </div>

//                                         <div className="space-y-1">
//                                             <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Start <span className="text-red-500">*</span></label>
//                                             <input
//                                                 name="startAt"
//                                                 type="datetime-local"
//                                                 defaultValue={toDateTimeLocal(slot.startAt)}
//                                                 className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
//                                                 required
//                                             />
//                                         </div>

//                                         <div className="space-y-1">
//                                             <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">End <span className="text-red-500">*</span></label>
//                                             <input
//                                                 name="endAt"
//                                                 type="datetime-local"
//                                                 defaultValue={toDateTimeLocal(slot.endAt)}
//                                                 className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
//                                                 required
//                                             />
//                                         </div>

//                                         <div className="space-y-1">
//                                             <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</label>
//                                             <label className="flex items-center justify-between gap-3 rounded-lg border border-input bg-background px-3 py-2 text-sm font-medium text-foreground cursor-pointer hover:bg-muted/70 transition-colors duration-200">
//                                                 <span className={slot.isAvailable ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}>
//                                                     {slot.isAvailable ? "Available" : "Unavailable"}
//                                                 </span>
//                                                 <input
//                                                     name="isAvailable"
//                                                     type="checkbox"
//                                                     defaultChecked={slot.isAvailable}
//                                                     className="h-4 w-4 rounded border-input text-primary focus:ring-primary focus:ring-2"
//                                                 />
//                                             </label>
//                                         </div>

//                                         <div className="flex flex-col gap-2 pt-2 md:pt-0">
//                                             <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Update Slot</label>
//                                             <button
//                                                 type="submit"
//                                                 disabled={savingSlotId === slot.id}
//                                                 className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-semibold rounded-lg transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
//                                             >
//                                                 {savingSlotId === slot.id ? (
//                                                     <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
//                                                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
//                                                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
//                                                     </svg>
//                                                 ) : (
//                                                     <Save className="w-4 h-4" />
//                                                 )}
//                                                 <span>{savingSlotId === slot.id ? "Saving..." : "Save"}</span>
//                                             </button>
//                                         </div>
//                                     </div>
//                                 </form>
//                             ))}
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }
