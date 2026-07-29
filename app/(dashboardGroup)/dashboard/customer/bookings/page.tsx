import { getAllBookings } from "../../../_actions/getBookings";
import { IBooking, BookingStatus } from "@/lib/type";
import { BookingCard } from "../_components/BookingCard";
import { CalendarDays } from "lucide-react";
import Link from "next/link";

const statusColors: Record<BookingStatus, string> = {
    REQUESTED: "bg-blue-50 text-blue-700 border-blue-200",
    ACCEPTED: "bg-teal-100 text-teal-700 border-teal-200",
    DECLINED: "bg-indigo-50 text-indigo-700 border-indigo-200",
    PAID: "bg-indigo-50 text-indigo-700 border-indigo-200",
    IN_PROGRESS: "bg-amber-50 text-amber-700 border-amber-200",
    COMPLETED: "bg-green-50 text-green-700 border-green-200",
    CANCELLED: "bg-red-50 text-red-700 border-red-200",
};

export default async function MyBookingsPage() {
    const result = await getAllBookings();
    const bookings: IBooking[] = result?.data ?? [];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">My Bookings</h1>
                <p className="mt-1 text-sm text-gray-500">All your service bookings in one place.</p>
            </div>

            {bookings.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-xl border border-dashed bg-white py-16 text-center">
                    <CalendarDays className="h-12 w-12 text-gray-300" />
                    <h3 className="mt-4 text-lg font-semibold text-gray-600">No bookings yet</h3>
                    <p className="mt-1 text-sm text-gray-400">Book a service to get started.</p>
                    <Link
                        href="/services"
                        className="mt-6 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary/90"
                    >
                        Browse Services
                    </Link>
                </div>
            ) : (
                <div className="space-y-4">
                    {bookings.map((booking) => (
                        <BookingCard
                            key={booking.id}
                            booking={booking}
                            statusColors={statusColors}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
