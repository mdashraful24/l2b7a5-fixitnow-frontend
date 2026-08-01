import { Star } from "lucide-react";

const testimonials = [
    {
        name: "Sarah Johnson",
        role: "Homeowner",
        content: "Absolutely amazing service! The plumber arrived on time and fixed everything perfectly.",
        rating: 5,
        image: "/avatars/sarah.jpg"
    },
    {
        name: "Michael Chen",
        role: "Business Owner",
        content: "Reliable professionals who always deliver quality work. Highly recommended!",
        rating: 5,
        image: "/avatars/michael.jpg"
    },
    {
        name: "Emily Rodriguez",
        role: "Property Manager",
        content: "The best platform for finding trusted service providers. Saves me so much time.",
        rating: 5,
        image: "/avatars/emily.jpg"
    },
];

const TestimonialsSection = () => {
    return (
        <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                        What Our Top Customers Say
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        Real reviews from real people who used our services
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="bg-card rounded-2xl p-6 border border-border hover:shadow-lg hover:shadow-primary/5 dark:hover:shadow-primary/10 transition-all"
                        >
                            <div className="flex items-center gap-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                                    />
                                ))}
                            </div>
                            <p className="text-foreground/80 mb-4">&quot;{testimonial.content}&quot;</p>
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground font-semibold">
                                    {testimonial.name.charAt(0)}
                                </div>
                                <div>
                                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default TestimonialsSection
