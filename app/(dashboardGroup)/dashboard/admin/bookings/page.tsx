import { Suspense } from "react";
import { BookingList } from "../_components/bookings/BookingList";
import { BookingSearchBar } from "../_components/bookings/BookingSearchBar";
import { BookingFilters } from "../_components/bookings/BookingFilters";
import BookingSkeleton from "../_components/bookings/BookingSkeleton";

const AdminBookingsPage = async ({
    searchParams
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tight text-foreground">
                            Booking Management
                        </h1>
                        <p className="text-foreground/80 max-w-xl">
                            View all bookings across your platform.
                        </p>
                    </div>
                    <BookingSearchBar />
                </div>
            </div>

            {/* Filters */}
            <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
                <BookingFilters />
            </div>

            {/* Bookings List */}
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-foreground">
                        All Bookings
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        View all bookings.
                    </p>
                </div>

                <Suspense fallback={<BookingSkeleton />}>
                    <BookingList searchParams={searchParams} />
                </Suspense>
            </div>
        </div>
    );
};

export default AdminBookingsPage;
