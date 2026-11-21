"use client";

import { IService } from "@/lib/type";
import {
    ArrowRight,
    CalendarCheck,
    Clock,
    DollarSign,
    House,
    MapPin,
    Star,
    User,
    Wrench
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ServiceCardProps {
    service: IService;
}

export function ServiceCard({ service }: ServiceCardProps) {
    const detailsHref = `/services/${service.id}`;
    const reviews = service.technician?.reviews || [];
    const reviewAverage = reviews.length
        ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
        : 0;
    const rating = reviewAverage || service.technician?.rating || 0;
    const reviewCount = service.technician?.totalReviews || reviews.length;

    return (
        <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-card/80 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl">
            <Link
                href={detailsHref}
                aria-label={`View ${service.title}`}
                className="relative block aspect-[16/10] overflow-hidden bg-muted"
            >
                {service.serviceImage ? (
                    <Image
                        src={service.serviceImage}
                        alt={service.title}
                        fill
                        unoptimized
                        sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-primary/15 via-primary/5 to-transparent">
                        <div className="flex size-20 items-center justify-center rounded-3xl bg-background/80 text-primary shadow-inner transition-transform duration-300 group-hover:scale-110">
                            <div className="relative">
                                <House className="size-10" />
                                <Wrench className="absolute -right-2 -bottom-1 size-6 rounded-full bg-background p-0.5" />
                            </div>
                        </div>
                    </div>
                )}

                <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-black/70 to-transparent" />

                {rating >= 4.5 && (
                    <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-amber-400 px-2.5 py-1 text-xs font-semibold text-amber-950 shadow-lg">
                        <Star className="size-3 fill-amber-950" />
                        Top rated
                    </span>
                )}

                <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full bg-background/95 px-3 py-1.5 text-sm font-bold text-foreground shadow-lg backdrop-blur-sm">
                    <DollarSign className="size-3.5 text-emerald-500" />
                    {service.price}
                    {service.hourlyRate && (
                        <span className="text-xs font-medium text-muted-foreground">/hr</span>
                    )}
                </span>
            </Link>

            <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center justify-between gap-3">
                    <span className="inline-flex max-w-[70%] items-center gap-1.5 truncate rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                        <span className="size-1.5 shrink-0 rounded-full bg-primary" />
                        <span className="truncate">{service.category?.name}</span>
                    </span>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-foreground">
                        <Star className="size-3.5 fill-amber-400 text-amber-400" />
                        {rating.toFixed(1)}
                        {reviewCount > 0 && (
                            <span className="text-xs font-normal text-muted-foreground">({reviewCount})</span>
                        )}
                    </span>
                </div>

                <Link
                    href={detailsHref}
                    className="mt-3 line-clamp-2 text-lg font-bold text-foreground transition-colors group-hover:text-primary"
                >
                    {service.title}
                </Link>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                </p>

                <div className="my-4 h-px bg-border/70" />

                <div className="flex items-center justify-between gap-3 text-sm">
                    <div className="flex min-w-0 items-center gap-2">
                        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <User className="size-4" />
                        </span>
                        <div className="min-w-0">
                            <p className="truncate font-semibold text-foreground">
                                {service.technician?.user?.name}
                            </p>
                            <p className="flex items-center gap-1 truncate text-xs text-muted-foreground">
                                <MapPin className="size-3 shrink-0" />
                                {service.technician?.location}
                            </p>
                        </div>
                    </div>
                    <span className="inline-flex shrink-0 items-center gap-1 text-xs font-medium text-muted-foreground">
                        <Clock className="size-3.5" />
                        {service.duration} min
                    </span>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-2">
                    <Link
                        href={`/technicians/${service.technician?.id}`}
                        className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl border border-border/70 bg-background px-3 text-sm font-semibold text-foreground transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-primary dark:bg-card"
                    >
                        Technician
                        <ArrowRight className="size-4" />
                    </Link>
                    <Link
                        href={detailsHref}
                        className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl bg-primary px-3 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/85 hover:shadow-md active:scale-[0.98]"
                    >
                        <CalendarCheck className="size-4" />
                        View details
                    </Link>
                </div>
            </div>
        </article>
    );
}
