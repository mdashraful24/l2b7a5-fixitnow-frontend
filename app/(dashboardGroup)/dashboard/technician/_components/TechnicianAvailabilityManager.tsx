"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
    createTechnicianAvailability,
    updateTechnicianAvailability,
} from "@/app/(dashboardGroup)/_actions/technician";
import { AvailabilitySlot } from "@/lib/type";

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

export function TechnicianAvailabilityManager({ slots }: { slots: AvailabilitySlot[] }) {
    const router = useRouter();
    const [creating, setCreating] = useState(false);
    const [savingSlotId, setSavingSlotId] = useState<string | null>(null);
    const [newSlot, setNewSlot] = useState({
        dayOfWeek: "Monday",
        startAt: "",
        endAt: "",
        isAvailable: true,
    });

    const sortedSlots = useMemo(
        () => [...slots].sort((left, right) => new Date(left.startAt).getTime() - new Date(right.startAt).getTime()),
        [slots]
    );

    const handleCreate = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setCreating(true);

        const result = await createTechnicianAvailability({
            dayOfWeek: newSlot.dayOfWeek as (typeof dayOptions)[number],
            startAt: new Date(newSlot.startAt).toISOString(),
            endAt: new Date(newSlot.endAt).toISOString(),
            isAvailable: newSlot.isAvailable,
        });

        setCreating(false);

        if (result.success) {
            toast.success(result.message || "Availability slot created");
            router.refresh();
            setNewSlot({ dayOfWeek: newSlot.dayOfWeek as (typeof dayOptions)[number], startAt: "", endAt: "", isAvailable: true });
        } else {
            toast.error(result.message || "Unable to create slot");
        }
    };

    const handleToggleAvailability = async (slot: AvailabilitySlot) => {
        setSavingSlotId(slot.id);

        const result = await updateTechnicianAvailability({
            availabilitySlotId: slot.id,
            dayOfWeek: slot.dayOfWeek as (typeof dayOptions)[number],
            startAt: slot.startAt,
            endAt: slot.endAt,
            isAvailable: !slot.isAvailable,
        });

        setSavingSlotId(null);

        if (result.success) {
            toast.success(result.message || "Availability slot updated");
            router.refresh();
        } else {
            toast.error(result.message || "Unable to update slot");
        }
    };

    return (
        <div className="space-y-8">
            <form onSubmit={handleCreate} className="rounded-2xl border bg-white p-6 shadow-sm">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900">Create availability slot</h2>
                        <p className="text-sm text-gray-500">Add working hours that customers can book.</p>
                    </div>
                </div>

                <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <label className="space-y-2 text-sm font-medium text-gray-700">
                        <span>Day</span>
                        <select
                            value={newSlot.dayOfWeek}
                            onChange={(event) => setNewSlot((current) => ({ ...current, dayOfWeek: event.target.value }))}
                            className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-primary"
                        >
                            {dayOptions.map((day) => (
                                <option key={day} value={day}>{day}</option>
                            ))}
                        </select>
                    </label>

                    <label className="space-y-2 text-sm font-medium text-gray-700">
                        <span>Start time</span>
                        <input
                            type="datetime-local"
                            value={newSlot.startAt}
                            onChange={(event) => setNewSlot((current) => ({ ...current, startAt: event.target.value }))}
                            className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-primary"
                        />
                    </label>

                    <label className="space-y-2 text-sm font-medium text-gray-700">
                        <span>End time</span>
                        <input
                            type="datetime-local"
                            value={newSlot.endAt}
                            onChange={(event) => setNewSlot((current) => ({ ...current, endAt: event.target.value }))}
                            className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-primary"
                        />
                    </label>

                    <label className="flex items-center gap-3 rounded-lg border border-gray-200 px-4 text-sm font-medium text-gray-700">
                        <input
                            type="checkbox"
                            checked={newSlot.isAvailable}
                            onChange={(event) => setNewSlot((current) => ({ ...current, isAvailable: event.target.checked }))}
                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        Available for booking
                    </label>
                </div>

                <div className="mt-4 flex justify-end">
                    <button
                        type="submit"
                        disabled={creating}
                        className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary/90 disabled:opacity-60"
                    >
                        {creating ? "Creating..." : "Add slot"}
                    </button>
                </div>
            </form>

            <div className="rounded-2xl border bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900">Current schedule</h2>
                        <p className="text-sm text-gray-500">Toggle availability or update the time windows below.</p>
                    </div>
                </div>

                <div className="mt-5 space-y-4">
                    {sortedSlots.length === 0 ? (
                        <div className="rounded-xl border border-dashed bg-gray-50 p-8 text-center text-sm text-gray-500">
                            No availability slots yet.
                        </div>
                    ) : (
                        sortedSlots.map((slot) => (
                            <form
                                key={slot.id}
                                onSubmit={async (event) => {
                                    event.preventDefault();
                                    const formData = new FormData(event.currentTarget);
                                    setSavingSlotId(slot.id);

                                    const result = await updateTechnicianAvailability({
                                        availabilitySlotId: slot.id,
                                        dayOfWeek: formData.get("dayOfWeek") as (typeof dayOptions)[number],
                                        startAt: new Date(String(formData.get("startAt"))).toISOString(),
                                        endAt: new Date(String(formData.get("endAt"))).toISOString(),
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
                                className="rounded-xl border p-4"
                            >
                                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
                                    <label className="space-y-2 text-sm font-medium text-gray-700">
                                        <span>Day</span>
                                        <select
                                            name="dayOfWeek"
                                            defaultValue={slot.dayOfWeek}
                                            className="w-full rounded-lg border border-gray-200 px-4 py-2.5 outline-none focus:border-primary"
                                        >
                                            {dayOptions.map((day) => (
                                                <option key={day} value={day}>{day}</option>
                                            ))}
                                        </select>
                                    </label>

                                    <label className="space-y-2 text-sm font-medium text-gray-700">
                                        <span>Start</span>
                                        <input
                                            name="startAt"
                                            type="datetime-local"
                                            defaultValue={toDateTimeLocal(slot.startAt)}
                                            className="w-full rounded-lg border border-gray-200 px-4 py-2.5 outline-none focus:border-primary"
                                        />
                                    </label>

                                    <label className="space-y-2 text-sm font-medium text-gray-700">
                                        <span>End</span>
                                        <input
                                            name="endAt"
                                            type="datetime-local"
                                            defaultValue={toDateTimeLocal(slot.endAt)}
                                            className="w-full rounded-lg border border-gray-200 px-4 py-2.5 outline-none focus:border-primary"
                                        />
                                    </label>

                                    <label className="flex items-center gap-3 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700">
                                        <input
                                            name="isAvailable"
                                            type="checkbox"
                                            defaultChecked={slot.isAvailable}
                                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                        />
                                        Available
                                    </label>

                                    <div className="flex items-end gap-2">
                                        <button
                                            type="submit"
                                            disabled={savingSlotId === slot.id}
                                            className="flex-1 rounded-lg bg-primary px-2 py-2.5 text-sm font-semibold text-white hover:bg-primary/90 disabled:opacity-60"
                                        >
                                            {savingSlotId === slot.id ? "Saving..." : "Save slot"}
                                        </button>
                                        {/* <button
                                            type="button"
                                            onClick={() => handleToggleAvailability(slot)}
                                            disabled={savingSlotId === slot.id}
                                            className="rounded-lg border border-gray-200 px-2 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-60"
                                        >
                                            Toggle
                                        </button> */}
                                    </div>
                                </div>
                            </form>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}