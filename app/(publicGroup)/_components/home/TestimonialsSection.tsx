import { getReviews } from "../../_actions/reviews";
import { IReview } from "@/lib/type";
import { TestimonialsCarousel } from "./TestimonialsCarousel";
import { Suspense } from "react";
import TestimonialsSkeleton from "./TestimonialsSkeleton";

export const TestimonialsSection = async () => {
    const response = await getReviews();

    const testimonials: IReview[] = response.data;

    return (
        <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                        What Our Top Customers Say
                    </h2>

                    <p className="text-lg text-foreground">
                        Real reviews from real people who used our services
                    </p>
                </div>

                <Suspense fallback={<TestimonialsSkeleton />}>
                    <TestimonialsCarousel testimonials={testimonials} />
                </Suspense>
            </div>
        </section>
    );
};
