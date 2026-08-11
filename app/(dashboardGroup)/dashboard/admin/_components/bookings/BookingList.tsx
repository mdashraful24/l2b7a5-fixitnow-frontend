import { getAllBookings } from "@/app/(dashboardGroup)/_actions/admin";
import { IAdminBookings } from "@/lib/type";
import { Calendar } from "lucide-react";
import Pagination from "@/app/(publicGroup)/_components/categories/Pagination";
import AdminBookingsDataTable from "../dashboardStats/AdminBookingsDataTable";

export async function BookingList({
    searchParams
}: {
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const query = await searchParams;
    const result = await getAllBookings({ query });

    if (!result.success || !result.data?.length) {
        return (
            <div className="py-12 text-center">
                <div className="flex flex-col items-center gap-2">
                    <Calendar className="h-12 w-12 text-muted-foreground/50" />
                    <p className="text-muted-foreground">No bookings found.</p>
                    {result.message && (
                        <p className="text-sm text-muted-foreground">{result.message}</p>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Pass the entire bookings array to the table */}
            <AdminBookingsDataTable bookings={result.data} compact={false} />

            {result.meta && (
                <Pagination
                    currentPage={result.meta.page}
                    totalPages={result.meta.totalPage}
                    totalItems={result.meta.total}
                    itemsPerPage={result.meta.limit}
                    itemLabel="bookings"
                />
            )}
        </div>
    );
}





// import { getAllBookings } from "@/app/(dashboardGroup)/_actions/admin";
// import { IAdminBookings } from "@/lib/type";
// import { BookingCard } from "./BookingCard";
// import { Calendar } from "lucide-react";
// import Pagination from "@/app/(publicGroup)/_components/categories/Pagination";

// export async function BookingList({
//     searchParams
// }: {
//     searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
// }) {
//     const query = await searchParams;
//     const result = await getAllBookings({ query });

//     if (!result.success || !result.data?.length) {
//         return (
//             <div className="py-12 text-center">
//                 <div className="flex flex-col items-center gap-2">
//                     <Calendar className="h-12 w-12 text-muted-foreground/50" />
//                     <p className="text-muted-foreground">No bookings found.</p>
//                     {result.message && (
//                         <p className="text-sm text-muted-foreground">{result.message}</p>
//                     )}
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="space-y-8">
//             <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
//                 {result.data.map((booking: IAdminBookings) => (
//                     <BookingCard key={booking.id} booking={booking} />
//                 ))}
//             </div>
//             {result.meta && (
//                 <Pagination
//                     currentPage={result.meta.page}
//                     totalPages={result.meta.totalPage}
//                     totalItems={result.meta.total}
//                     itemsPerPage={result.meta.limit}
//                     itemLabel="bookings"
//                 />
//             )}
//         </div>
//     );
// }
