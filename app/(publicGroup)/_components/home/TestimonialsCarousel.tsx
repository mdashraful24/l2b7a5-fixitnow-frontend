"use client";

import { Star, Quote, BadgeCheck } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

import { IReview } from "@/lib/type";

interface TestimonialsCarouselProps {
    testimonials: IReview[];
}

export const TestimonialsCarousel = ({
    testimonials,
}: TestimonialsCarouselProps) => {
    if (!testimonials || !testimonials.length) {
        return (
            <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <p className="text-xl">No testimonials found</p>
                <p className="mt-2">Please, try another time</p>
            </div>
        )
    }

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
        });
    };

    return (
        <Carousel
            opts={{
                align: "start",
                loop: true,
            }}
            plugins={[
                Autoplay({
                    delay: 3000,
                    stopOnInteraction: false,
                    stopOnMouseEnter: true,
                }),
            ]}
            className="w-full max-w-352 mx-auto"
        >
            <CarouselContent className="-ml-4">
                {testimonials.map((testimonial) => {
                    const initial =
                        testimonial.customer?.name
                            ?.charAt(0)
                            .toUpperCase() ?? "U";

                    return (
                        <CarouselItem
                            key={testimonial.id}
                            className="lg:pl-5 basis-full sm:basis-1/2 lg:basis-1/3"
                        >
                            <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300">
                                {/* Quote icon */}
                                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                                    <Quote className="h-5 w-5" />
                                </div>

                                {/* Rating */}
                                <div className="mb-3 flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`h-4 w-4 ${i < testimonial.rating
                                                ? "fill-amber-400 text-amber-400"
                                                : "text-muted-foreground/30"
                                                }`}
                                        />
                                    ))}
                                </div>

                                {/* Comment */}
                                <p className="flex-1 leading-relaxed text-foreground/85">
                                    &quot;{testimonial.comment ?? "Great service!"}&quot;
                                </p>

                                {/* Divider */}
                                <div className="my-5 h-px bg-border" />

                                {/* Customer */}
                                <div className="flex items-center gap-3">
                                    <div className="relative shrink-0">
                                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-linear-to-br from-primary to-primary/60 text-sm font-semibold text-primary-foreground ring-2 ring-primary/20">
                                            {initial}
                                        </div>
                                    </div>

                                    <div className="min-w-0">
                                        <p className="truncate font-semibold text-foreground">
                                            {testimonial.customer?.name ??
                                                "Unknown User"}
                                        </p>

                                        <p className="flex items-center gap-1 text-xs text-muted-foreground">
                                            <BadgeCheck className="h-3.5 w-3.5 text-primary" />
                                            Verified Customer
                                        </p>
                                    </div>

                                    <span className="ml-auto shrink-0 text-xs text-muted-foreground">
                                        {formatDate(testimonial.createdAt)}
                                    </span>
                                </div>
                            </div>
                        </CarouselItem>
                    );
                })}
            </CarouselContent>

            <CarouselPrevious className="hidden lg:flex size-10 border-border bg-card text-foreground hover:border-primary hover:bg-primary hover:text-primary-foreground" />
            <CarouselNext className="hidden lg:flex size-10 border-border bg-card text-foreground hover:border-primary hover:bg-primary hover:text-primary-foreground" />
        </Carousel>
    );
};