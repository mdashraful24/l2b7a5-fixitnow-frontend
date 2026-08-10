"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
    {
        question: "How do I book a service?",
        answer: "Booking a service is easy! Simply browse our categories or search for the specific service you need, choose a professional, and select an available time slot that works for you."
    },
    {
        question: "Are your professionals verified?",
        answer: "Yes, all our service professionals go through a rigorous background check and skill verification process before they can join our platform."
    },
    {
        question: "What if I am not satisfied with the service?",
        answer: "Customer satisfaction is our top priority. If you're not happy with the service provided, please contact our support team within 24 hours, and we will make it right."
    },
    {
        question: "How does the pricing work?",
        answer: "Our pricing is transparent and upfront. You'll see the exact cost or an estimated range before you confirm your booking. There are no hidden fees."
    },
    {
        question: "Can I reschedule or cancel my booking?",
        answer: "Yes, you can reschedule or cancel your booking up to 24 hours before the scheduled time without any penalty. Late cancellations may incur a small fee."
    }
];

const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const sectionRef = useRef<HTMLDivElement>(null);

    const toggleFaq = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    // Close FAQ when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (sectionRef.current && !sectionRef.current.contains(event.target as Node)) {
                setOpenIndex(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Close FAQ when pressing Escape key
    useEffect(() => {
        const handleEscapeKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setOpenIndex(null);
            }
        };

        document.addEventListener('keydown', handleEscapeKey);
        return () => {
            document.removeEventListener('keydown', handleEscapeKey);
        };
    }, []);

    return (
        <section className="pb-20 bg-background transition-colors duration-300">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-lg text-foreground">
                        Got questions? We&apos;ve got answers.
                    </p>
                </div>

                <div
                    ref={sectionRef}
                    className="max-w-5xl mx-auto space-y-4">
                    {faqs.map((faq, index) => {
                        const isOpen = openIndex === index;
                        return (
                            <div
                                key={index}
                                className="border border-border rounded-lg overflow-hidden bg-card hover:border-blue-600 transition-all duration-300 shadow"
                            >
                                <button
                                    className="w-full px-6 py-4 text-left flex justify-between items-center"
                                    onClick={() => toggleFaq(index)}
                                >
                                    <span className="font-medium text-lg text-foreground">{faq.question}</span>
                                    <ChevronDown
                                        className={`h-5 w-5 text-foreground transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                                    />
                                </button>
                                <div
                                    className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-40 pb-4 opacity-100" : "max-h-0 opacity-0"}`}
                                >
                                    <p className="text-foreground pt-2 border-t border-border">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default FAQSection;
