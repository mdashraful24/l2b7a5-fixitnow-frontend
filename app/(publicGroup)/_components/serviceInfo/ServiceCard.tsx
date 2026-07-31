"use client";

import { IService } from "@/lib/type"
import {
    Wrench,
    Star,
    MapPin,
    Clock,
    DollarSign,
    CalendarCheck,
    User
} from "lucide-react"
import Image from "next/image";
import Link from "next/link"
import { usePathname } from "next/navigation"

interface ServiceCardProps {
    service: IService;
}

export function ServiceCard({ service }: ServiceCardProps) {
    const pathname = usePathname();
    const bookingHref = `/booking?serviceId=${service.id}`;

    // Check if we're on the home page
    const isHomePage = pathname === "/";

    const getRatingColor = (rating: number) => {
        if (rating >= 4.5) return "text-green-600";
        if (rating >= 4) return "text-blue-600";
        if (rating >= 3) return "text-yellow-600";
        return "text-orange-600";
    };

    return (
        <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 hover:border-primary/30">
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-linear-to-tr from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Header image area with gradient */}
            <div className="relative h-48 bg-linear-to-br from-primary/15 via-primary/5 to-transparent overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                        {service.serviceImage ? (
                            <Image
                                src={service.serviceImage}
                                unoptimized
                                alt={service.title}
                                width={500}
                                height={500}
                                className="object-cover"
                            />
                        ) : null}
                    </div>
                </div>

                {/* Status badges */}
                <div className="absolute top-3 right-3 flex flex-col gap-1.5">
                    {/* {service.isAvailable && (
                        <span className="flex items-center gap-1 rounded-full bg-green-500/90 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-white shadow-lg shadow-green-500/30">
                            <Sparkles className="h-3 w-3" />
                            Available
                        </span>
                    )} */}
                    {service.technician.rating >= 4.5 && (
                        <span className="flex items-center gap-1 rounded-full bg-yellow-500/90 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-white shadow-lg shadow-yellow-500/30">
                            <Star className="h-3 w-3 fill-white" />
                            Top Rated
                        </span>
                    )}
                </div>

                {/* Price badge - floating */}
                <div className="absolute bottom-3 left-3 rounded-full bg-black/80 backdrop-blur-sm px-4 py-1.5 text-white shadow-lg">
                    <div className="flex items-center gap-1">
                        <DollarSign className="h-3.5 w-3.5 text-emerald-400" />
                        <span className="text-sm font-bold">{service.price}</span>
                        {service.hourlyRate && (
                            <span className="text-xs text-gray-400">/hr</span>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex flex-1 flex-col p-5">
                {/* Category and title */}
                <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary transition-colors group-hover:bg-primary/20">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                            {service.category.name}
                        </span>
                        <div className="flex items-center gap-1">
                            <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                            <span className={`text-sm font-semibold ${getRatingColor(service.technician.rating)}`}>
                                {service.technician.rating}
                            </span>
                            <span className="text-xs text-gray-400">
                                ({service.technician.totalReviews})
                            </span>
                        </div>
                    </div>

                    <h3 className="line-clamp-1 text-lg font-bold text-gray-900 transition-colors group-hover:text-primary">
                        {service.title}
                    </h3>

                    <p className="text-sm text-gray-600 leading-relaxed">
                        {service.description}
                    </p>
                </div>

                {/* Divider */}
                <div className="my-3 h-px bg-linear-to-r from-transparent via-gray-200 to-transparent" />

                {/* Technician info */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <User className="h-4 w-4" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-semibold text-gray-800">
                                {service.technician.user.name}
                            </span>
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                                <MapPin className="h-3 w-3" />
                                <span>{service.technician.location}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Clock className="h-3.5 w-3.5" />
                        <span className="font-medium text-gray-700">{service.duration} min</span>
                    </div>
                </div>

                {/* Action Buttons */}
                {!isHomePage && (
                    <div className="mt-4 grid grid-cols-2 gap-2.5">
                        <Link
                            href={`/technicians/${service.technician.id}`}
                            className="group/btn flex items-center justify-center gap-2 rounded-xl border-2 border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-700 transition-all hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
                        >
                            <span>Technician Profile</span>
                            {/* <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" /> */}
                        </Link>
                        <Link
                            href={service.isAvailable ? bookingHref : "#"}
                            className={`flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition-all ${service.isAvailable
                                    ? "bg-linear-to-r from-primary to-primary/80 text-white shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:scale-[1.02] active:scale-[0.98]"
                                    : "cursor-not-allowed bg-gray-100 text-gray-400"
                                }`}
                        >
                            <CalendarCheck className="h-4 w-4" />
                            {service.isAvailable ? "Book Now" : "Unavailable"}
                        </Link>
                    </div>
                )}

                {/* {isHomePage && (
                    <div className="mt-4">
                        <Link
                            href={`/services/${service.id}`}
                            className="flex items-center justify-center gap-2 rounded-xl border-2 border-primary/20 bg-primary/5 px-4 py-2.5 text-sm font-semibold text-primary transition-all hover:bg-primary/10 hover:border-primary/40"
                        >
                            <span>View Details</span>
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </Link>
                    </div>
                )} */}
            </div>

            {/* Decorative corner accent */}
            <div className="absolute bottom-0 right-0 h-20 w-20 bg-linear-to-tl from-primary/5 to-transparent rounded-tl-full pointer-events-none" />
        </div>
    )
}
