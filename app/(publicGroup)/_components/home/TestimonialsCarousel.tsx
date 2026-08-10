"use client";

import { Star } from "lucide-react";
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
    // Fix: Check if testimonials exists before accessing length
    if (!testimonials || !testimonials.length) {
        return (
            <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <p className="text-xl">No testimonials found</p>
                <p className="mt-2">Please, try another time</p>
            </div>
        )
    }

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
            className="w-full max-w-7xl mx-auto"
        >
            <CarouselContent className="-ml-4">
                {testimonials.map((testimonial) => (
                    <CarouselItem
                        key={testimonial.id}
                        className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
                    >
                        <div className="bg-card rounded-2xl p-6 border border-border h-full transition-all hover:shadow-lg hover:-translate-y-1">
                            {/* Rating */}
                            <div className="flex items-center gap-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`h-4 w-4 ${i < testimonial.rating
                                                ? "fill-yellow-400 text-yellow-400"
                                                : "text-muted-foreground/30"
                                            }`}
                                    />
                                ))}
                            </div>

                            {/* Comment */}
                            <p className="text-foreground/80 mb-3 min-h-20">
                                &quot;{testimonial.comment ?? "Great service!"}&quot;
                            </p>

                            {/* Customer */}
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 shrink-0 rounded-full bg-linear-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground font-semibold">
                                    {testimonial.customer?.name
                                        ?.charAt(0)
                                        .toUpperCase() ?? "U"}
                                </div>

                                <div>
                                    <p className="font-semibold text-foreground">
                                        {testimonial.customer?.name ??
                                            "Unknown User"}
                                    </p>

                                    <p className="text-sm text-foreground">
                                        Customer
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>

            <CarouselPrevious className="hidden lg:flex" />
            <CarouselNext className="hidden lg:flex" />
        </Carousel>
    );
};
