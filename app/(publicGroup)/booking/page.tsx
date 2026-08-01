import { AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getServiceById } from "../_actions/allServices";
import BookingWrapper from "../_components/bookingInfo/BookingWrapper";

interface BookingPageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function BookingPage({ searchParams }: BookingPageProps) {
    const params = await searchParams;
    const serviceId = params?.serviceId as string || "";

    if (!serviceId) {
        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
                <AlertCircle className="h-14 w-14 text-red-500" />
                <p className="text-lg font-medium text-foreground">Missing service ID</p>
                <Link href="/services" className="text-primary underline">Browse Services</Link>
            </div>
        );
    }

    const result = await getServiceById(serviceId);

    if (!result.success || !result.data) {
        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
                <AlertCircle className="h-14 w-14 text-red-500" />
                <p className="text-lg font-medium text-foreground">Service not found</p>
                <Link href="/services" className="text-primary underline">Browse Services</Link>
            </div>
        );
    }

    const service = result.data;

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto space-y-6 px-4 py-8">
                <Link
                    href="/services"
                    className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Services
                </Link>

                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-foreground">Book a Service</h1>
                    <p className="mt-1 text-muted-foreground">Select your preferred time slot and confirm your booking.</p>
                </div>

                {/* Wrap everything in a client component */}
                <BookingWrapper service={service} />
            </div>
        </div>
    );
}











// "use client";

// import { useEffect, useState, useCallback } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { createBooking } from "../_actions/createBooking";
// import { IAvailableSlot, ICreateBookingPayload, IService } from "@/lib/type";
// import {
//     CalendarCheck, Clock, DollarSign, MapPin, Star, User,
//     Wrench, CheckCircle, AlertCircle, ArrowLeft, Loader2
// } from "lucide-react";
// import Link from "next/link";
// import { toast } from "sonner";
// import { getServiceById } from "../_actions/allServices";

// function formatTime(dateStr: string) {
//     return new Date(dateStr).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
// }

// function formatDate(dateStr: string) {
//     return new Date(dateStr).toLocaleDateString("en-US", {
//         weekday: "long",
//         year: "numeric",
//         month: "long",
//         day: "numeric"
//     });
// }

// // Generate time options within a slot's range (30-minute intervals)
// function getTimeOptions(slot: IAvailableSlot): string[] {
//     const options: string[] = [];
//     const startDate = new Date(slot.startAt);
//     const endDate = new Date(slot.endAt);

//     const startMinutes = startDate.getHours() * 60 + startDate.getMinutes();
//     const endMinutes = endDate.getHours() * 60 + endDate.getMinutes();

//     // Generate 30-minute intervals
//     let currentMinutes = Math.ceil(startMinutes / 30) * 30;

//     while (currentMinutes < endMinutes) {
//         const hours = Math.floor(currentMinutes / 60);
//         const mins = currentMinutes % 60;
//         const timeStr = `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
//         options.push(timeStr);
//         currentMinutes += 30;
//     }

//     return options;
// }

// export default function BookingPage() {
//     const router = useRouter();
//     const searchParams = useSearchParams();

//     const serviceId = searchParams.get("serviceId") || "";

//     const [service, setService] = useState<IService | null>(null);
//     const [submitting, setSubmitting] = useState(false);
//     const [error, setError] = useState<string | null>(null);

//     // Form state
//     const [selectedSlot, setSelectedSlot] = useState<IAvailableSlot | null>(null);
//     const [selectedTime, setSelectedTime] = useState<string>("");
//     const [address, setAddress] = useState<string>("");
//     const [notes, setNotes] = useState<string>("");
//     const [timeOptions, setTimeOptions] = useState<string[]>([]);

//     // Fetch service data
//     const fetchService = useCallback(async () => {
//         if (!serviceId) {
//             setError("Missing service ID");
//             return;
//         }

//         try {
//             const res = await getServiceById(serviceId);

//             if (res.success && res.data) {
//                 setService(res.data);
//                 // Auto-select first available slot if available
//                 const availableSlots = res.data?.technician?.availability?.filter(
//                     (slot: IAvailableSlot) => slot.isAvailable
//                 ) ?? [];
//                 if (availableSlots.length > 0) {
//                     setSelectedSlot(availableSlots[0]);
//                 }
//             } else {
//                 setError("Service not found");
//             }
//         } catch (error) {
//             setError("Failed to load service details");
//             console.error("Error fetching service:", error);
//         }
//     }, [serviceId]);

//     // Load service on mount
//     useEffect(() => {
//         fetchService();
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, []);

//     // Update time options when slot changes
//     useEffect(() => {
//         if (selectedSlot) {
//             const options = getTimeOptions(selectedSlot);
//             setTimeOptions(options);
//             setSelectedTime("");
//         } else {
//             setTimeOptions([]);
//         }
//     }, [selectedSlot]);

//     const technician = service?.technician;
//     const availableSlots = service?.technician?.availability?.filter(
//         (slot: IAvailableSlot) => slot.isAvailable
//     ) ?? [];

//     // Build scheduledAt ISO string from selected slot and time
//     const buildScheduledAt = () => {
//         if (!selectedSlot || !selectedTime) return "";

//         // Get the date from the slot's startAt
//         const slotDate = new Date(selectedSlot.startAt);
//         const [hours, minutes] = selectedTime.split(':').map(Number);

//         // Create new date with the slot's date but selected time
//         const scheduledDate = new Date(slotDate);
//         scheduledDate.setHours(hours, minutes, 0, 0);

//         return scheduledDate.toISOString();
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();

//         if (!selectedSlot || !selectedTime || !address) {
//             toast.error("Please fill in all required fields.");
//             return;
//         }

//         if (!service || !technician) {
//             toast.error("Service or technician information is missing.");
//             return;
//         }

//         const scheduledAt = buildScheduledAt();
//         if (!scheduledAt) {
//             toast.error("Invalid time selection.");
//             return;
//         }

//         const payload: ICreateBookingPayload = {
//             technicianId: technician.id,
//             categoryId: service.categoryId,
//             serviceId: service.id,
//             availableSlotId: selectedSlot.id,
//             scheduledAt,
//             address,
//             notes: notes || undefined,
//             totalAmount: service.price ?? 0,
//         };

//         setSubmitting(true);
//         try {
//             const result = await createBooking(payload);
//             if (result.success) {
//                 toast.success("Booking created successfully!");
//                 router.push("/dashboard/customer");
//             } else {
//                 toast.error(result.message || "Failed to create booking.");
//             }
//         } catch (error) {
//             toast.error("An error occurred while creating the booking.");
//         } finally {
//             setSubmitting(false);
//         }
//     };

//     if (error || !service || !technician) {
//         return (
//             <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
//                 <AlertCircle className="h-14 w-14 text-red-500" />
//                 <p className="text-lg font-medium text-gray-700">{error || "Service or technician not found."}</p>
//                 <Link href="/services" className="text-primary underline">Browse Services</Link>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-gray-50">
//             <div className="container mx-auto max-w-5xl px-4 py-10">
//                 {/* Back link */}
//                 <Link
//                     href="/services"
//                     className="mb-6 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors"
//                 >
//                     <ArrowLeft className="h-4 w-4" />
//                     Back to Services
//                 </Link>

//                 <div className="mb-8">
//                     <h1 className="text-3xl font-bold text-gray-900">Book a Service</h1>
//                     <p className="mt-1 text-gray-500">Select your preferred time slot and confirm your booking.</p>
//                 </div>

//                 <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
//                     {/* ── LEFT: Summary ── */}
//                     <div className="space-y-4 lg:col-span-1">
//                         {/* Service summary */}
//                         <div className="rounded-xl border bg-white p-6 shadow-sm">
//                             <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">Service Details</h2>
//                             <div className="flex items-start gap-4">
//                                 <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
//                                     <Wrench className="h-6 w-6 text-primary" />
//                                 </div>
//                                 <div>
//                                     <h3 className="font-semibold text-gray-900">{service.title}</h3>
//                                     <p className="mt-1 text-sm text-gray-500 line-clamp-2">{service.description}</p>
//                                     <div className="mt-3 flex flex-wrap gap-3 text-sm">
//                                         <span className="flex items-center gap-1 text-gray-600">
//                                             <Clock className="h-3.5 w-3.5" /> {service.duration} min
//                                         </span>
//                                         <span className="flex items-center gap-1 font-semibold text-primary">
//                                             <DollarSign className="h-3.5 w-3.5" /> ${service.price}
//                                         </span>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Technician summary */}
//                         <div className="rounded-xl border bg-white p-6 shadow-sm">
//                             <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">Technician</h2>
//                             <div className="flex items-center gap-3">
//                                 <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
//                                     <User className="h-6 w-6 text-primary" />
//                                 </div>
//                                 <div>
//                                     <p className="font-semibold text-gray-900">{technician.user.name}</p>
//                                     <div className="mt-0.5 flex items-center gap-1 text-sm">
//                                         <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
//                                         <span className="font-medium">{technician.rating}</span>
//                                         <span className="text-gray-400">({technician.totalReviews})</span>
//                                     </div>
//                                     {technician.location && (
//                                         <div className="mt-1 flex items-center gap-1 text-xs text-gray-500">
//                                             <MapPin className="h-3 w-3" /> {technician.location}
//                                         </div>
//                                     )}
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Booking summary */}
//                         {selectedSlot && selectedTime && (
//                             <div className="rounded-xl border border-green-200 bg-green-50 p-5">
//                                 <div className="flex items-center gap-2 mb-3">
//                                     <CheckCircle className="h-5 w-5 text-green-600" />
//                                     <h2 className="text-sm font-semibold text-green-800">Booking Summary</h2>
//                                 </div>
//                                 <div className="space-y-1.5 text-sm text-green-700">
//                                     <p><span className="font-medium">Date:</span> {formatDate(selectedSlot.startAt)}</p>
//                                     <p><span className="font-medium">Time:</span> {selectedTime}</p>
//                                     <p><span className="font-medium">Duration:</span> {service.duration} minutes</p>
//                                     <div className="mt-3 border-t border-green-200 pt-3">
//                                         <p className="flex justify-between">
//                                             <span>Total Amount</span>
//                                             <span className="text-lg font-bold text-green-800">${service.price}</span>
//                                         </p>
//                                     </div>
//                                 </div>
//                             </div>
//                         )}
//                     </div>

//                     {/* ── RIGHT: Booking Form ── */}
//                     <div className="lg:col-span-2">
//                         <form onSubmit={handleSubmit} className="space-y-6">
//                             {/* Step 1: Pick a slot */}
//                             <div className="rounded-xl border bg-white p-6 shadow-sm">
//                                 <h2 className="mb-1 text-base font-semibold text-gray-900">
//                                     Step 1: Choose an Availability Slot
//                                 </h2>
//                                 <p className="mb-4 text-sm text-gray-500">Select the technician&apos;s available time window.</p>
//                                 {availableSlots.length === 0 ? (
//                                     <div className="rounded-lg border border-dashed p-6 text-center text-sm text-gray-400">
//                                         No available slots for this technician right now.
//                                     </div>
//                                 ) : (
//                                     <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
//                                         {availableSlots.map((slot) => (
//                                             <button
//                                                 key={slot.id}
//                                                 type="button"
//                                                 onClick={() => {
//                                                     setSelectedSlot(slot);
//                                                     setSelectedTime("");
//                                                 }}
//                                                 className={`group flex flex-col rounded-xl border-2 p-4 text-left transition-all ${selectedSlot?.id === slot.id
//                                                         ? "border-primary bg-primary/5"
//                                                         : "border-gray-200 hover:border-primary/50 hover:bg-gray-50"
//                                                     }`}
//                                             >
//                                                 <span className="font-semibold text-gray-900">
//                                                     {formatDate(slot.startAt)}
//                                                 </span>
//                                                 <span className="mt-1 text-sm text-gray-500">
//                                                     {formatTime(slot.startAt)} – {formatTime(slot.endAt)}
//                                                 </span>
//                                                 {selectedSlot?.id === slot.id && (
//                                                     <CheckCircle className="mt-2 h-4 w-4 text-primary" />
//                                                 )}
//                                             </button>
//                                         ))}
//                                     </div>
//                                 )}
//                             </div>

//                             {/* Step 2: Pick a time */}
//                             {selectedSlot && (
//                                 <div className="rounded-xl border bg-white p-6 shadow-sm">
//                                     <h2 className="mb-1 text-base font-semibold text-gray-900">
//                                         Step 2: Select a Time
//                                     </h2>
//                                     <p className="mb-4 text-sm text-gray-500">
//                                         Available times on <strong>{formatDate(selectedSlot.startAt)}</strong> between{" "}
//                                         <strong>{formatTime(selectedSlot.startAt)}</strong> and{" "}
//                                         <strong>{formatTime(selectedSlot.endAt)}</strong>.
//                                     </p>
//                                     {timeOptions.length === 0 ? (
//                                         <p className="text-sm text-amber-600">No available time slots.</p>
//                                     ) : (
//                                         <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
//                                             {timeOptions.map((time) => (
//                                                 <button
//                                                     key={time}
//                                                     type="button"
//                                                     onClick={() => setSelectedTime(time)}
//                                                     className={`rounded-lg border-2 px-3 py-2.5 text-sm font-medium transition-all ${selectedTime === time
//                                                             ? "border-primary bg-primary text-white"
//                                                             : "border-gray-200 hover:border-primary/50 hover:bg-primary/5"
//                                                         }`}
//                                                 >
//                                                     {time}
//                                                 </button>
//                                             ))}
//                                         </div>
//                                     )}
//                                 </div>
//                             )}

//                             {/* Step 3: Address & notes */}
//                             {selectedSlot && selectedTime && (
//                                 <div className="rounded-xl border bg-white p-6 shadow-sm">
//                                     <h2 className="mb-1 text-base font-semibold text-gray-900">
//                                         Step 3: Your Details
//                                     </h2>
//                                     <p className="mb-4 text-sm text-gray-500">Provide your service address.</p>
//                                     <div className="space-y-4">
//                                         <div>
//                                             <label className="mb-1.5 block text-sm font-medium text-gray-700">
//                                                 Service Address <span className="text-red-500">*</span>
//                                             </label>
//                                             <textarea
//                                                 value={address}
//                                                 onChange={(e) => setAddress(e.target.value)}
//                                                 placeholder="e.g. 123 Main Street, Dhaka"
//                                                 rows={3}
//                                                 required
//                                                 className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
//                                             />
//                                         </div>
//                                         <div>
//                                             <label className="mb-1.5 block text-sm font-medium text-gray-700">
//                                                 Notes <span className="text-xs text-gray-400">(optional)</span>
//                                             </label>
//                                             <textarea
//                                                 value={notes}
//                                                 onChange={(e) => setNotes(e.target.value)}
//                                                 placeholder="Any special instructions for the technician..."
//                                                 rows={2}
//                                                 className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
//                                             />
//                                         </div>
//                                     </div>
//                                 </div>
//                             )}

//                             {/* Submit */}
//                             <button
//                                 type="submit"
//                                 disabled={submitting || !selectedSlot || !selectedTime || !address}
//                                 className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 text-base font-semibold text-white transition-all hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
//                             >
//                                 {submitting ? (
//                                     <><Loader2 className="h-5 w-5 animate-spin" /> Confirming Booking...</>
//                                 ) : (
//                                     <><CalendarCheck className="h-5 w-5" /> Confirm Booking — ${service.price}</>
//                                 )}
//                             </button>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }
