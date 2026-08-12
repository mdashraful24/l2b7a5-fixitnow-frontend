/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle, Loader2 } from "lucide-react";
import { getSingleBooking } from "@/app/(dashboardGroup)/_actions/getBookings";
import { confirmPayment, revalidateBookingCache } from "@/app/(dashboardGroup)/_actions/customer";

export function PaymentSuccessClient() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const sessionId = searchParams.get("session_id");

    const [loading, setLoading] = useState(true);
    const [bookingId, setBookingId] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const validateBookingAccess = async (candidateBookingId: string) => {
        const bookingResult = await getSingleBooking(candidateBookingId);

        if (!bookingResult.success || !bookingResult.data) {
            return null;
        }

        return candidateBookingId;
    };

    useEffect(() => {
        if (!sessionId) {
            setError("Missing payment session information.");
            setLoading(false);
            return;
        }

        const confirm = async () => {
            try {
                const result = await confirmPayment(sessionId);

                if (result.success && result.data?.bookingId) {
                    const ownedBookingId = await validateBookingAccess(
                        result.data.bookingId
                    );

                    if (!ownedBookingId) {
                        setError("Unable to verify your booking.");
                        return;
                    }

                    setBookingId(ownedBookingId);

                    await revalidateBookingCache(ownedBookingId);

                    setTimeout(() => {
                        router.replace(
                            `/dashboard/customer/bookings/${ownedBookingId}/payment-details`
                        );
                    }, 2000);
                } else {
                    setError(
                        result.message || "Payment confirmation failed."
                    );
                }
            } catch (error) {
                // console.error(error);
                setError("Something went wrong while confirming payment.");
            } finally {
                setLoading(false);
            }
        };

        confirm();
    }, [sessionId, router]);


    // Loading state
    if (loading) {
        return (
            <div className="flex min-h-[80vh] items-center justify-center px-4">
                <div className="text-center">
                    <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />

                    <h2 className="mt-6 text-xl font-semibold">
                        Confirming your payment...
                    </h2>

                    <p className="mt-2 text-sm">
                        Please wait while we verify your transaction.
                    </p>
                </div>
            </div>
        );
    }


    // Error state
    if (error) {
        return (
            <div className="flex min-h-[80vh] items-center justify-center px-4">
                <div className="max-w-md text-center">

                    <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-red-100 dark:bg-red-950/30">
                        <span className="text-5xl">⚠️</span>
                    </div>

                    <h1 className="mt-6 text-3xl font-bold">
                        Payment Verification Failed
                    </h1>

                    <p className="mt-3 text-muted-foreground">
                        {error}
                    </p>

                </div>
            </div>
        );
    }


    // Success state
    return (
        <div className="flex min-h-[80vh] items-center justify-center px-4">
            <div className="max-w-md text-center">
                {/* Success Icon */}
                <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-green-100 dark:bg-green-950/30">
                    <CheckCircle className="h-14 w-14 text-green-600 dark:text-green-400" />
                </div>

                {/* Title */}
                <h1 className="mt-8 text-4xl font-bold tracking-tight">
                    Payment Successful 🎉
                </h1>

                {/* Description */}
                <p className="mt-4 text-foreground">
                    Your payment has been confirmed successfully.
                    Your booking is now secured and the technician has been notified.
                </p>

                {/* Status Card */}
                <div className="mt-8 rounded-xl border bg-card p-5 shadow-sm">
                    <div className="flex items-center justify-center gap-2 text-sm font-semibold text-green-600 dark:text-green-400">
                        <CheckCircle className="h-5 w-5" />
                        Payment Confirmed
                    </div>
                    <p className="mt-3 text-sm text-foreground">
                        Redirecting you to booking details...
                    </p>
                    <Loader2 className="mx-auto mt-4 h-5 w-5 animate-spin text-primary dark:text-blue-500" />
                </div>

                {/* Fallback */}
                {bookingId && (
                    <button
                        onClick={() =>
                            router.replace(
                                `/dashboard/customer/bookings/${bookingId}/payment-details`
                            )
                        }
                        className="mt-6 text-sm text-primary dark:text-blue-500 underline underline-offset-4 cursor-pointer"
                    >
                        Click here if you are not redirected
                    </button>
                )}
            </div>
        </div>
    );
}












// /* eslint-disable react-hooks/set-state-in-effect */
// "use client";

// import { useEffect, useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { CheckCircle, XCircle, Loader2 } from "lucide-react";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { getSingleBooking } from "@/app/(dashboardGroup)/_actions/getBookings";
// import { confirmPayment, revalidateBookingCache } from "@/app/(dashboardGroup)/_actions/customer";

// export function PaymentSuccessClient() {
//     const router = useRouter();
//     const searchParams = useSearchParams();

//     const sessionId = searchParams.get("session_id");
//     const bookingIdParam = searchParams.get("bookingId");

//     const [loading, setLoading] = useState(true);
//     const [bookingId, setBookingId] = useState<string | null>(null);
//     const [error, setError] = useState<string | null>(null);
//     const [paymentConfirmed, setPaymentConfirmed] = useState(false);

//     const validateBookingAccess = async (candidateBookingId: string) => {
//         const bookingResult = await getSingleBooking(candidateBookingId);

//         if (!bookingResult.success || !bookingResult.data) {
//             return null;
//         }

//         return candidateBookingId;
//     };

//     useEffect(() => {
//         if (!sessionId) {
//             setError("Missing session ID. Please contact support.");
//             setLoading(false);
//             return;
//         }

//         const confirm = async () => {
//             try {
//                 const result = await confirmPayment(sessionId);
//                 if (result.success) {
//                     const newBookingId = result.data?.bookingId;

//                     if (newBookingId) {
//                         const ownedBookingId = await validateBookingAccess(newBookingId);

//                         if (ownedBookingId) {
//                             setBookingId(ownedBookingId);
//                             setPaymentConfirmed(true);
//                             await revalidateBookingCache(ownedBookingId);
//                             // Auto redirect after success
//                             router.replace(
//                                 `/dashboard/customer/bookings/${ownedBookingId}/payment-details`
//                             );
//                         } else {
//                             setError("We could not verify this booking. Please open the payment link from your own booking page.");
//                         }
//                     } else {
//                         setError("Payment confirmed but no booking ID returned.");
//                     }
//                 } else {
//                     if (result.message?.includes("already been confirmed")) {
//                         setPaymentConfirmed(true);
//                         if (bookingIdParam) {
//                             const ownedBookingId = await validateBookingAccess(bookingIdParam);

//                             if (ownedBookingId) {
//                                 setBookingId(ownedBookingId);
//                                 await revalidateBookingCache(ownedBookingId);
//                                 // Already confirmed → redirect
//                                 router.replace(
//                                     `/dashboard/customer/bookings/${ownedBookingId}/payment-details`
//                                 );
//                             } else {
//                                 setError("We could not verify this booking. Please open the payment link from your own booking page.");
//                             }
//                         }
//                     } else {
//                         setError(
//                             result.message || "Payment confirmation failed."
//                         );
//                     }
//                 }
//             } catch (err) {
//                 console.error("Confirmation error:", err);
//                 setError("An unexpected error occurred.");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         confirm();
//     }, [sessionId, bookingIdParam, router]);

//     if (loading) {
//         return (
//             <div className="flex min-h-[80vh] flex-col items-center justify-center">
//                 <Loader2 className="h-12 w-12 animate-spin text-primary" />
//                 <p className="mt-4 text-muted-foreground">Confirming your payment...</p>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="flex min-h-[80vh] flex-col items-center justify-center px-4">
//                 <div className="max-w-md text-center">
//                     <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-red-100 dark:bg-red-950/30">
//                         <XCircle className="h-12 w-12 text-red-600 dark:text-red-400" />
//                     </div>
//                     <h1 className="text-3xl font-bold">Payment Confirmation Error</h1>
//                     <p className="mt-3 text-muted-foreground">{error}</p>
//                     <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
//                         {bookingIdParam && (
//                             <Link href={`/dashboard/customer/bookings/${bookingIdParam}/payment-details`}>
//                                 <Button size="lg" className="cursor-pointer">Check Booking Status</Button>
//                             </Link>
//                         )}
//                         <Link href="/dashboard/customer/bookings">
//                             <Button size="lg" variant="outline" className="cursor-pointer">Go to My Bookings</Button>
//                         </Link>
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="flex min-h-[80vh] flex-col items-center justify-center px-4">
//             <div className="max-w-md text-center">
//                 <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-100 dark:bg-green-950/30">
//                     <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
//                 </div>
//                 <h1 className="text-3xl font-bold text-foreground">Payment Successful! 🎉</h1>
//                 <p className="mt-3 text-muted-foreground">
//                     Your payment has been confirmed. Your booking is now confirmed and the technician has been notified.
//                 </p>
//                 {paymentConfirmed && (
//                     <div className="mt-4 rounded-lg bg-green-50 dark:bg-green-950/30 p-4 border border-green-200 dark:border-green-800">
//                         <p className="text-sm text-green-700 dark:text-green-300 flex items-center gap-2">
//                             <CheckCircle className="h-4 w-4" />
//                             ✓ Payment confirmed successfully
//                         </p>
//                     </div>
//                 )}
//                 <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
//                     {bookingId && (
//                         <Link href={`/dashboard/customer/bookings/${bookingId}/payment-details`}>
//                             <Button size="lg" className="cursor-pointer">View Booking Details</Button>
//                         </Link>
//                     )}
//                     <Link href="/dashboard/customer/bookings">
//                         <Button variant="outline" size="lg" className="cursor-pointer">View All Bookings</Button>
//                     </Link>
//                 </div>
//             </div>
//         </div>
//     );
// }
