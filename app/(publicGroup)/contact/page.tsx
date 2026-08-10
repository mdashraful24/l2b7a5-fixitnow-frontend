"use client";

import { useState } from "react";
import {
    MapPin,
    Mail,
    Phone,
    Clock,
    Send,
    CheckCircle,
    AlertCircle,
    MessageSquare,
    User,
    Building2
} from "lucide-react";
import {
    FacebookLogoIcon,
    GithubLogoIcon,
    LinkedinLogoIcon,
    TwitterLogoIcon,
    YoutubeLogoIcon
} from "@phosphor-icons/react";
import Link from "next/link";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
        service: ""
    });
    const [status, setStatus] = useState<{
        type: 'success' | 'error' | null;
        message: string;
    }>({ type: null, message: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus({ type: null, message: "" });

        // Simulate API call
        try {
            await new Promise((resolve) => setTimeout(resolve, 1500));

            // Here you would typically send the data to your backend
            console.log("Form data submitted:", formData);

            setStatus({
                type: 'success',
                message: "Thank you! We'll get back to you within 24 hours."
            });
            setFormData({
                name: "",
                email: "",
                subject: "",
                message: "",
                service: ""
            });
        } catch (error) {
            setStatus({
                type: 'error',
                message: "Something went wrong. Please try again."
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const contactInfo = [
        {
            icon: MapPin,
            title: "Visit Us",
            details: ["Dhaka, Bangladesh", "1234 Service Road, Dhaka"]
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

    const services = [
        "AC Repair",
        "Plumbing",
        "Electrical",
        "Home Cleaning",
        "Handyman",
        "Other"
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 py-12 px-4">
            <div className="container mx-auto max-w-6xl">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-4">
                        <MessageSquare className="h-4 w-4" />
                        Get in Touch
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">
                        We&apos;d Love to Hear From You
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Have a question about our services? Need a repair? Our team is here to help.
                        Reach out and we&apos;ll respond as soon as possible.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Contact Information */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white border border-border rounded-2xl p-6 shadow-sm">
                            <h2 className="text-xl font-bold text-foreground mb-6">Contact Information</h2>
                            <div className="space-y-6">
                                {contactInfo.map((info, index) => {
                                    const Icon = info.icon;
                                    return (
                                        <div key={index} className="flex gap-4">
                                            <div className="flex-shrink-0">
                                                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                                                    <Icon className="h-5 w-5 text-blue-600" />
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-sm text-foreground">{info.title}</h3>
                                                {info.details.map((detail, i) => (
                                                    <p key={i} className="text-sm text-muted-foreground">{detail}</p>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Social Media */}
                        <div className="bg-white border border-border rounded-2xl p-6 shadow-sm">
                            <h2 className="text-xl font-bold text-foreground mb-4">Connect With Us</h2>
                            <p className="text-sm text-muted-foreground mb-4">
                                Follow us on social media for updates, tips, and special offers.
                            </p>
                            <div className="flex gap-3">
                                <Link
                                    href="#"
                                    className="w-11 h-11 rounded-full bg-slate-100 hover:bg-blue-50 flex items-center justify-center text-slate-600 hover:text-blue-600 transition-all hover:scale-110"
                                >
                                    <FacebookLogoIcon className="h-5 w-5" />
                                </Link>
                                <Link
                                    href="#"
                                    className="w-11 h-11 rounded-full bg-slate-100 hover:bg-blue-50 flex items-center justify-center text-slate-600 hover:text-blue-600 transition-all hover:scale-110"
                                >
                                    <TwitterLogoIcon className="h-5 w-5" />
                                </Link>
                                <Link
                                    href="#"
                                    className="w-11 h-11 rounded-full bg-slate-100 hover:bg-blue-50 flex items-center justify-center text-slate-600 hover:text-blue-600 transition-all hover:scale-110"
                                >
                                    <LinkedinLogoIcon className="h-5 w-5" />
                                </Link>
                                <Link
                                    href="#"
                                    className="w-11 h-11 rounded-full bg-slate-100 hover:bg-blue-50 flex items-center justify-center text-slate-600 hover:text-blue-600 transition-all hover:scale-110"
                                >
                                    <GithubLogoIcon className="h-5 w-5" />
                                </Link>
                                <Link
                                    href="#"
                                    className="w-11 h-11 rounded-full bg-slate-100 hover:bg-blue-50 flex items-center justify-center text-slate-600 hover:text-blue-600 transition-all hover:scale-110"
                                >
                                    <YoutubeLogoIcon className="h-5 w-5" />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white border border-border rounded-2xl p-6 md:p-8 shadow-sm">
                            <h2 className="text-2xl font-bold text-foreground mb-2">Send Us a Message</h2>
                            <p className="text-sm text-muted-foreground mb-6">
                                Fill in the form below and we&apos;ll get back to you within 24 hours.
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="font-medium text-sm text-foreground flex items-center gap-1">
                                            <User className="h-4 w-4 text-blue-600" />
                                            Full Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="John Doe"
                                            required
                                            className="w-full px-4 py-3 border border-border bg-slate-50 text-foreground rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="font-medium text-sm text-foreground flex items-center gap-1">
                                            <Mail className="h-4 w-4 text-blue-600" />
                                            Email Address <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="john@example.com"
                                            required
                                            className="w-full px-4 py-3 border border-border bg-slate-50 text-foreground rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="font-medium text-sm text-foreground flex items-center gap-1">
                                        <Building2 className="h-4 w-4 text-blue-600" />
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        placeholder="What is this regarding?"
                                        className="w-full px-4 py-3 border border-border bg-slate-50 text-foreground rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="font-medium text-sm text-foreground">
                                        Service Interested In
                                    </label>
                                    <select
                                        name="service"
                                        value={formData.service}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-border bg-slate-50 text-foreground rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="">Select a service (optional)</option>
                                        {services.map((service) => (
                                            <option key={service} value={service}>
                                                {service}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="font-medium text-sm text-foreground flex items-center gap-1">
                                        <MessageSquare className="h-4 w-4 text-blue-600" />
                                        Message <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Tell us about your repair needs or any questions..."
                                        required
                                        rows={5}
                                        className="w-full px-4 py-3 border border-border bg-slate-50 text-foreground rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                                    />
                                </div>

                                {/* Status Message */}
                                {status.type && (
                                    <div className={`flex items-start gap-3 p-4 rounded-xl ${status.type === 'success'
                                        ? 'bg-green-50 border border-green-200 text-green-700'
                                        : 'bg-red-50 border border-red-200 text-red-700'
                                        }`}>
                                        {status.type === 'success' ? (
                                            <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                                        ) : (
                                            <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                                        )}
                                        <span className="text-sm">{status.message}</span>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="group w-full md:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold text-base transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <span className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            Send Message
                                            <Send className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Map Section */}
                <div className="mt-12 bg-white border border-border rounded-2xl overflow-hidden shadow-sm">
                    <div className="h-[300px] bg-slate-200 relative">
                        {/* Replace with actual map embed */}
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 to-slate-50">
                            <div className="text-center">
                                <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-3" />
                                <p className="text-muted-foreground">Find us in Dhaka, Bangladesh</p>
                                <p className="text-sm text-muted-foreground">1234 Service Road, Dhaka</p>
                            </div>
                        </div>
                        {/* Uncomment to use Google Maps embed */}
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.348754849102!2d90.409355!3d23.750864!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQ1JzAzLjEiTiA5MMKwMjQnMzMuNyJF!5e0!3m2!1sen!2sbd!4v1641234567890!5m2!1sen!2sbd"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
