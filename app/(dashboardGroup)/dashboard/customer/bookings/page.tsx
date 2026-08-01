import { getAllBookings } from "../../../_actions/getBookings";
import { IBooking } from "@/lib/type";
import { BookingCard } from "../_components/BookingCard";
import { CalendarDays } from "lucide-react";
import Link from "next/link";
import { statusColors } from "@/lib/bookingConstants";

export default async function MyBookingsPage() {
    const result = await getAllBookings();
    const bookings: IBooking[] = result?.data ?? [];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-foreground">My Bookings</h1>
                <p className="mt-1 text-sm text-muted-foreground">All your service bookings in one place.</p>
            </div>

            {bookings.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card py-16 text-center">
                    <CalendarDays className="h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-semibold text-foreground">No bookings yet</h3>
                    <p className="mt-1 text-sm text-muted-foreground">Book a service to get started.</p>
                    <Link
                        href="/services"
                        className="mt-6 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
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
