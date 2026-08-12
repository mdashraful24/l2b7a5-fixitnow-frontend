/* eslint-disable @typescript-eslint/no-explicit-any */

import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getAllServices } from "../../_actions/allServices";
import { IService } from "@/lib/type";
import Link from "next/link";
import Image from "next/image";
import {
    ArrowLeft,
    ArrowRight,
    CalendarCheck,
    CheckCircle2,
    Clock3,
    MapPin,
    ShieldCheck,
    Star,
    User,
    Wrench,
} from "lucide-react";
import ServiceSkeleton from "../../_components/serviceInfo/ServiceSkeleton";

interface ServiceDetailsPageProps {
    params: Promise<{ id: string }>;
}

async function getService(id: string): Promise<IService | null> {
    try {
        const result = await getAllServices({
            query: { limit: 100 } as any,
        });

        const service = result.data.find(
            (service: IService) => service.id === id
        );

        return service || null;
    } catch (error) {
        // console.error("Error fetching service:", error);
        return null;
    }
}

export default async function ServiceDetailsPage({
    params,
}: ServiceDetailsPageProps) {
    const { id } = await params;
    const service = await getService(id);

    if (!service) {
        notFound();
    }

    const reviews = service.technician.reviews || [];
    const totalReviews = reviews.length;

    const averageRating =
        totalReviews > 0
            ? reviews.reduce((sum, review) => sum + review.rating, 0) /
            totalReviews
            : 0;

    return (
        <div className="min-h-screen bg-slate-50/70 dark:bg-background">
            <Suspense fallback={<ServiceSkeleton />}>
                {/* Top Navigation / Breadcrumb */}
                <div className="container mx-auto flex items-center px-4 py-8">
                    <Link
                        href="/services"
                        className="group inline-flex items-center gap-2 text-sm font-medium text-foreground/80 transition-colors hover:text-primary dark:text-slate-400 dark:hover:text-blue-500"
                    >
                        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                        Back to services
                    </Link>

                    <span className="mx-3 text-foreground/80">
                        /
                    </span>

                    <span className="truncate text-sm font-medium text-foreground/80">
                        {service.category.name}
                    </span>
                </div>

                {/* Main Content */}
                <main className="container mx-auto px-4">
                    {/* Hero */}
                    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
                        {/* Left */}
                        <div className="min-w-0">
                            {/* Image */}
                            <div className="group relative h-72 overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 shadow-sm sm:h-96 lg:h-150 dark:border-border dark:bg-muted">
                                {service.serviceImage ? (
                                    <Image
                                        src={service.serviceImage}
                                        alt={service.title}
                                        fill
                                        priority
                                        className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                                        unoptimized
                                    />
                                ) : (
                                    <div className="flex h-full items-center justify-center bg-linear-to-br from-primary/5 via-primary/10 to-primary/5">
                                        <div className="flex h-32 w-32 items-center justify-center rounded-3xl bg-white shadow-xl ring-1 ring-primary/10 dark:bg-card">
                                            <Wrench className="h-16 w-16 text-primary" />
                                        </div>
                                    </div>
                                )}

                                {/* Image overlay */}
                                <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-black/60 to-transparent" />

                                {/* Availability */}
                                <div className="absolute right-5 top-5">
                                    <div
                                        className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold shadow-lg backdrop-blur-md ${service.isAvailable
                                            ? "bg-green-600/95 text-white"
                                            : "bg-red-500/95 text-white"
                                            }`}
                                    >
                                        <span className="relative flex h-2 w-2">
                                            {service.isAvailable && (
                                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-60" />
                                            )}
                                            <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
                                        </span>

                                        {service.isAvailable
                                            ? "Available"
                                            : "Currently unavailable"}
                                    </div>
                                </div>

                                {/* Category */}
                                <div className="absolute bottom-5 left-5">
                                    <span className="inline-flex items-center rounded-full bg-white/95 px-4 py-2 text-sm font-semibold shadow-lg backdrop-blur-md dark:bg-card/95 dark:text-white">
                                        {service.category.name}
                                    </span>
                                </div>
                            </div>

                            {/* Service Information */}
                            <div className="mt-8">
                                <div className="flex flex-wrap items-center gap-4">
                                    <div className="inline-flex items-center gap-1.5">
                                        <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                                        <span className="font-bold text-foreground/80 dark:text-white">
                                            {averageRating > 0
                                                ? averageRating.toFixed(1)
                                                : "New"}
                                        </span>

                                        {totalReviews > 0 && (
                                            <span className="text-sm text-foreground/80">
                                                ({totalReviews}{" "}
                                                {totalReviews === 1
                                                    ? "review"
                                                    : "reviews"}
                                                )
                                            </span>
                                        )}
                                    </div>

                                    <span className="h-1 w-1 rounded-full bg-slate-400 dark:bg-slate-600" />

                                    <div className="flex items-center gap-1.5 text-sm text-foreground/80 dark:text-white">
                                        <Clock3 className="h-4 w-4" />
                                        {service.duration} minutes
                                    </div>
                                </div>

                                <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl dark:text-white">
                                    {service.title}
                                </h1>

                                <p className="mt-5 max-w-3xl text-base leading-8 text-foreground/80 sm:text-lg">
                                    {service.description}
                                </p>
                            </div>

                            {/* Service Highlights */}
                            <div className="mt-8 grid gap-4 sm:grid-cols-3">
                                <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-border dark:bg-card">
                                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                        <Clock3 className="h-5 w-5" />
                                    </div>

                                    <p className="text-sm text-foreground/80">
                                        Service duration
                                    </p>

                                    <p className="mt-1 font-semibold">
                                        {service.duration} minutes
                                    </p>
                                </div>

                                <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-border dark:bg-card">
                                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
                                        <ShieldCheck className="h-5 w-5" />
                                    </div>

                                    <p className="text-sm text-foreground/80">
                                        Trusted service
                                    </p>

                                    <p className="mt-1 font-semibold">
                                        Verified technician
                                    </p>
                                </div>

                                <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-border dark:bg-card">
                                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                                        <Star className="h-5 w-5" />
                                    </div>

                                    <p className="text-sm text-foreground/80">
                                        Customer rating
                                    </p>

                                    <p className="mt-1 font-semibold">
                                        {averageRating > 0
                                            ? `${averageRating.toFixed(1)} / 5`
                                            : "No reviews yet"}
                                    </p>
                                </div>
                            </div>

                            {/* Technician */}
                            <section className="mt-8">
                                <div className="mb-4">
                                    <p className="text-sm font-semibold uppercase tracking-wider text-blue-500">
                                        Your service provider
                                    </p>
                                    <h2 className="mt-1.5 text-2xl font-bold">
                                        Meet your technician
                                    </h2>
                                </div>

                                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-border dark:bg-card">
                                    <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                                                <User className="h-8 w-8" />
                                            </div>

                                            <div>
                                                <h3 className="text-lg font-bold">
                                                    {
                                                        service.technician.user.name
                                                    }
                                                </h3>

                                                <div className="mt-1 flex items-center gap-1.5 text-sm text-foreground/80">
                                                    <MapPin className="h-4 w-4" />
                                                    <span>
                                                        {
                                                            service.technician.location
                                                        }
                                                    </span>
                                                </div>

                                                <div className="mt-2 flex items-center gap-1.5 text-sm">
                                                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                                                    <span className="font-semibold text-foreground/80">
                                                        {averageRating > 0
                                                            ? averageRating.toFixed(
                                                                1
                                                            )
                                                            : "New"}
                                                    </span>

                                                    {totalReviews > 0 && (
                                                        <span className="text-foreground/80">
                                                            · {totalReviews}{" "}
                                                            reviews
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <Link
                                            href={`/technicians/${service.technician.id}`}
                                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold transition-all hover:border-primary/30 hover:bg-blue-100 hover:text-primary dark:border-border dark:text-slate-300 dark:hover:bg-blue-700"
                                        >
                                            View profile
                                            <ArrowRight className="h-4 w-4" />
                                        </Link>
                                    </div>
                                </div>
                            </section>
                        </div>

                        {/* Booking Card */}
                        <aside className="lg:sticky lg:top-24 lg:self-start">
                            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50 dark:border-border dark:bg-card dark:shadow-black/20">
                                {/* Price header */}
                                <div className="border-b border-slate-200 p-6 dark:border-border">
                                    <p className="text-sm font-medium text-foreground/60">
                                        Service price
                                    </p>

                                    <div className="mt-2 flex items-end gap-2">
                                        <span className="text-4xl font-bold tracking-tight">
                                            ${service.price}
                                        </span>

                                        <span className="pb-1 text-sm text-foreground/60">
                                            / service
                                        </span>
                                    </div>

                                    {service.hourlyRate && (
                                        <p className="mt-1 text-sm text-foreground/70">
                                            ${service.hourlyRate}/hour
                                        </p>
                                    )}
                                </div>

                                {/* Booking details */}
                                <div className="p-6">
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                                                    <Clock3 className="h-4 w-4" />
                                                </div>

                                                <span className="text-sm text-foreground/80">
                                                    Duration
                                                </span>
                                            </div>

                                            <span className="text-sm font-semibold">
                                                {service.duration} min
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                                                    <MapPin className="h-4 w-4" />
                                                </div>

                                                <span className="text-sm text-foreground/80">
                                                    Location
                                                </span>
                                            </div>

                                            <span className="max-w-37.5 truncate text-right text-sm font-semibold text-slate-900 dark:text-white">
                                                {service.technician.location}
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                                                    <ShieldCheck className="h-4 w-4" />
                                                </div>

                                                <span className="text-sm text-foreground/80">
                                                    Service status
                                                </span>
                                            </div>

                                            <span
                                                className={`text-sm font-semibold ${service.isAvailable
                                                    ? "text-green-600 dark:text-green-400"
                                                    : "text-red-500"
                                                    }`}
                                            >
                                                {service.isAvailable
                                                    ? "Available"
                                                    : "Unavailable"}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="my-6 border-t border-dashed border-slate-200 dark:border-border" />

                                    {/* CTA */}
                                    {service.isAvailable ? (
                                        <Link
                                            href={`/booking?serviceId=${service.id}`}
                                            className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 text-base font-bold text-white shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/30 active:translate-y-0"
                                        >
                                            <CalendarCheck className="h-5 w-5" />
                                            Book this service
                                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                        </Link>
                                    ) : (
                                            <div className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-2xl bg-slate-100 px-6 py-4 text-base font-bold text-foreground/80 dark:bg-muted">
                                            <CalendarCheck className="h-5 w-5" />
                                            Currently unavailable
                                        </div>
                                    )}

                                    <p className="mt-4 text-center text-xs leading-5 text-foreground/70">
                                        Secure your appointment with a
                                        trusted FixItNow technician.
                                    </p>
                                </div>
                            </div>

                            {/* Trust Card */}
                            <div className="mt-4 rounded-2xl border border-primary/10 bg-primary/5 p-5 dark:bg-primary/10">
                                <div className="flex gap-3">
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-white">
                                        <CheckCircle2 className="h-5 w-5" />
                                    </div>

                                    <div>
                                        <p className="font-semibold">
                                            Book with confidence
                                        </p>

                                        <p className="mt-1 text-sm leading-6 text-foreground/70">
                                            Get professional service from a
                                            verified technician through
                                            FixItNow.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>

                    {/* Bottom CTA */}
                    <div className="mt-10 overflow-hidden rounded-3xl bg-linear-to-r from-primary to-primary/80 px-6 py-8 text-white shadow-xl shadow-primary/20 sm:px-10">
                        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-wider text-white/90">
                                    Need this service?
                                </p>

                                <h2 className="mt-1.5 text-2xl font-bold sm:text-3xl">
                                    Get your service booked today.
                                </h2>

                                <p className="mt-2 max-w-xl leading-6 text-white/80">
                                    Choose a convenient time and let a
                                    professional technician take care of the
                                    job.
                                </p>
                            </div>

                            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
                                {service.isAvailable && (
                                    <Link
                                        href={`/booking?serviceId=${service.id}`}
                                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-primary shadow-lg transition-transform hover:-translate-y-0.5"
                                    >
                                        <CalendarCheck className="h-5 w-5" />
                                        Book Now
                                    </Link>
                                )}

                                <Link
                                    href="/services"
                                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                                >
                                    Browse services
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </main>
            </Suspense>
        </div>
    );
}