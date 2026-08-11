"use client";

import {
    MapPin,
    Mail,
    Phone,
    Clock,
    MessageSquare,
} from "lucide-react";
import {
    FacebookLogoIcon,
    GithubLogoIcon,
    LinkedinLogoIcon,
} from "@phosphor-icons/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ContactFormDialog from "../_components/contact/ContactFormDialog";

const ContactPage = () => {
    const contactInfo = [
        {
            icon: MapPin,
            title: "Visit Us",
            details: ["Dhaka, Bangladesh", "123 FixItNow Street, Dhaka"]
        },
        {
            icon: Mail,
            title: "Email Us",
            details: ["support@fixitnow.com", "info@fixitnow.com"]
        },
        {
            icon: Phone,
            title: "Call Us",
            details: ["+880 1234-567890", "+880 9876-543210"]
        },
        {
            icon: Clock,
            title: "Working Hours",
            details: ["Mon - Fri: 8:00 AM - 8:00 PM", "Sat - Sun: 9:00 AM - 5:00 PM"]
        }
    ];

    return (
        <div className="min-h-screen bg-background px-4 py-8">
            <div className="container mx-auto">
                {/* Header */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-4">
                        <MessageSquare className="h-4 w-4" />
                        Get in Touch
                    </div>
                    <h1 className="text-3xl font-extrabold text-foreground mb-4">
                        We&apos;d Love to Hear From You
                    </h1>
                    <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
                        Have a question about our services? Need a repair? Our team is here to help.
                        Reach out and we&apos;ll respond as soon as possible.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Contact Information */}
                    <div className="bg-background dark:bg-muted border border-border rounded-2xl p-6 shadow-sm">
                        <h2 className="text-xl font-bold text-foreground mb-6">Contact Information</h2>
                        <div className="space-y-5">
                            {contactInfo.map((info, index) => {
                                const Icon = info.icon;
                                return (
                                    <div key={index} className="flex gap-4">
                                        <div className="shrink-0">
                                            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                                                <Icon className="h-5 w-5 text-blue-600" />
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-sm text-foreground">{info.title}</h3>
                                            {info.details.map((detail, i) => (
                                                <p key={i} className="text-sm text-foreground/80">{detail}</p>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Social Media & Contact Form */}
                    <div className="space-y-6">
                        <div className="bg-background dark:bg-muted border border-border rounded-2xl p-6 shadow-sm">
                            <h2 className="text-xl font-bold text-foreground mb-4">Connect With Us</h2>
                            <p className="text-sm text-muted-foreground mb-4">
                                Follow us on social media for updates, tips, and special offers.
                            </p>
                            <div className="flex gap-3 mb-6">
                                <Link
                                    href="https://www.facebook.com/ashraful.islam.ratul2k"
                                    className="w-11 h-11 rounded-full bg-blue-100 hover:bg-blue-50 flex items-center justify-center text-blue-600 hover:text-blue-800 transition-all hover:scale-110"
                                >
                                    <FacebookLogoIcon className="h-6 w-6" />
                                </Link>
                                <Link
                                    href="https://www.linkedin.com/in/ashraful-islam-ratul/"
                                    className="w-11 h-11 rounded-full bg-blue-100 hover:bg-blue-50 flex items-center justify-center text-blue-600 hover:text-blue-800 transition-all hover:scale-110"
                                >
                                    <LinkedinLogoIcon className="h-6 w-6" />
                                </Link>
                                <Link
                                    href="https://github.com/mdashraful24"
                                    className="w-11 h-11 rounded-full bg-blue-100 hover:bg-blue-50 flex items-center justify-center text-blue-600 hover:text-blue-800 transition-all hover:scale-110"
                                >
                                    <GithubLogoIcon className="h-6 w-6" />
                                </Link>
                            </div>
                        </div>

                        <div className="bg-background dark:bg-muted border border-border rounded-2xl p-6 shadow-sm">
                            <h2 className="text-2xl font-bold text-foreground mb-2">Send Us a Message</h2>
                            <p className="text-sm text-muted-foreground mb-6">
                                Fill in the form below and we&apos;ll get back to you within 24 hours.
                            </p>

                            <ContactFormDialog
                                trigger={
                                    <Button
                                        size="lg"
                                        className="w-full md:w-auto px-8 py-3.5 rounded-xl bg-linear-to-r from-blue-600 to-blue-700 text-white font-semibold text-base transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5"
                                    >
                                        <MessageSquare className="h-4 w-4 mr-2" />
                                        Open Contact Form
                                    </Button>
                                }
                            />
                        </div>
                    </div>
                </div>

                {/* Map Section */}
                <div className="mt-12 bg-white border border-border rounded-2xl overflow-hidden shadow-sm">
                    <div className="h-80 md:h-96 relative">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14603.21840838315!2d90.392884!3d23.793343!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c70c15f1b49d%3A0x584b5a03b4c7b1e!2sDhaka%2C%20Bangladesh!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Google Maps - Dhaka, Bangladesh"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
