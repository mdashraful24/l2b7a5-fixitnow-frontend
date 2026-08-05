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

const testimonials = [
    {
        name: "Sarah Johnson",
        role: "Customer",
        content:
            "Absolutely amazing service! The plumber arrived on time and fixed everything perfectly.",
        rating: 4,
    },
    {
        name: "Michael Chen",
        role: "Customer",
        content:
            "Reliable professionals who always deliver quality work. Highly recommended!",
        rating: 5,
    },
    {
        name: "Emily Rodriguez",
        role: "Customer",
        content:
            "The best platform for finding trusted service providers. Saves me so much time.",
        rating: 5,
    },
    {
        name: "David Lee",
        role: "Customer",
        content:
            "I had a great experience with the electrician I found here. Very knowledgeable and efficient.",
        rating: 3,
    },
    {
        name: "Olivia Martinez",
        role: "Customer",
        content:
            "The technicians are always professional and courteous. I feel confident using this service every time.",
        rating: 4,
    },
];

const TestimonialsSection = () => {
    return (
        <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                        What Our Top Customers Say
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        Real reviews from real people who used our services
                    </p>
                </div>
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
                                key={testimonial.name}
                                className="
                                    pl-4
                                    basis-full
                                    sm:basis-1/2
                                    lg:basis-1/3
                                "
                            >
                                <div className="
                                    bg-card 
                                    rounded-2xl 
                                    p-6 
                                    border 
                                    border-border 
                                    h-full
                                    transition-all
                                    hover:shadow-lg
                                    hover:-translate-y-1
                                ">
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
                                    <p className="text-foreground/80 mb-6 min-h-20">
                                        &quot;{testimonial.content}&quot;
                                    </p>
                                    <div className="flex items-center gap-3">
                                        <div className="
                                            h-10 
                                            w-10 
                                            shrink-0
                                            rounded-full 
                                            bg-linear-to-br 
                                            from-primary 
                                            to-primary/80 
                                            flex 
                                            items-center 
                                            justify-center 
                                            text-primary-foreground 
                                            font-semibold
                                        ">
                                            {testimonial.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-foreground">
                                                {testimonial.name}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {testimonial.role}
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
            </div>
        </section>
    );
};

export default TestimonialsSection;
