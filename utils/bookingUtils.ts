import { IAvailableSlot } from "@/lib/type";

// export const BOOKING_CONFIG = {
//     MIN_BUFFER_MINUTES: Number(process.env.MIN_BUFFER_MINUTES),
//     TIME_INTERVAL_MINUTES: Number(process.env.TIME_INTERVAL_MINUTES),
// };

export const BOOKING_CONFIG = {
    MIN_BUFFER_MINUTES: Number(
        process.env.NEXT_PUBLIC_MIN_BUFFER_MINUTES
    ),

    TIME_INTERVAL_MINUTES: Number(
        process.env.NEXT_PUBLIC_TIME_INTERVAL_MINUTES
    ),
};

export function formatTime(dateStr: string) {
    return new Date(dateStr).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });
}

export function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

export function isToday(dateStr: string): boolean {
    const today = new Date();
    const date = new Date(dateStr);

    return (
        today.getFullYear() === date.getFullYear() &&
        today.getMonth() === date.getMonth() &&
        today.getDate() === date.getDate()
    );
}

export function formatTimeDisplay(timeStr: string): string {
    const [hours, minutes] = timeStr.split(":").map(Number);

    const ampm = hours >= 12 ? "PM" : "AM";
    const hour12 = hours % 12 || 12;

    return `${hour12}:${String(minutes).padStart(2, "0")} ${ampm}`;
}


export function getTimeOptionsWithBuffer(
    slot: IAvailableSlot,
    bufferMinutes: number = BOOKING_CONFIG.MIN_BUFFER_MINUTES,
    intervalMinutes: number = BOOKING_CONFIG.TIME_INTERVAL_MINUTES
): string[] {

    const options: string[] = [];

    const startDate = new Date(slot.startAt);
    const endDate = new Date(slot.endAt);

    const now = new Date();

    const bufferTime = new Date(
        now.getTime() + bufferMinutes * 60000
    );

    const currentMinutesWithBuffer =
        bufferTime.getHours() * 60 +
        bufferTime.getMinutes();


    const startMinutes =
        startDate.getHours() * 60 +
        startDate.getMinutes();

    const endMinutes =
        endDate.getHours() * 60 +
        endDate.getMinutes();


    let effectiveStartMinutes = startMinutes;


    if (isToday(slot.startAt)) {

        const nextSlotStart =
            Math.ceil(currentMinutesWithBuffer / intervalMinutes) *
            intervalMinutes;

        effectiveStartMinutes = Math.max(
            startMinutes,
            nextSlotStart
        );
    }


    let currentTime =
        Math.ceil(effectiveStartMinutes / intervalMinutes) *
        intervalMinutes;


    while (currentTime < endMinutes) {

        const hours = Math.floor(currentTime / 60);
        const mins = currentTime % 60;

        options.push(
            `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`
        );

        currentTime += intervalMinutes;
    }


    return options;
}