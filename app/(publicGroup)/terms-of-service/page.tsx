// app/terms-of-service/page.tsx
import { Metadata } from "next";
import Link from "next/link";
import {
    FileText,
    Users,
    Shield,
    CreditCard,
    AlertTriangle,
    CheckCircle,
    Clock,
    Mail,
    Phone,
    MapPin,
    ArrowRight,
    Info,
    BookOpen
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
    title: "Terms of Service - FixItNow",
    description: "Read the terms and conditions for using FixItNow platform.",
};

const termsSections = [
    {
        title: "Acceptance of Terms",
        icon: FileText,
        content: [
            "By using FixItNow, you agree to these Terms of Service",
            "If you do not agree, please do not use our platform",
            "We may update these terms at any time",
            "Continued use constitutes acceptance of updated terms",
            "You must be 18 years or older to use our services"
        ]
    },
    {
        title: "User Accounts",
        icon: Users,
        content: [
            "You are responsible for maintaining account security",
            "Provide accurate and complete registration information",
            "You are liable for all activities under your account",
            "Notify us immediately of unauthorized access",
            "We reserve the right to suspend or terminate accounts"
        ]
    },
    {
        title: "Services and Bookings",
        icon: Clock,
        content: [
            "Customers can browse services and book appointments",
            "Bookings are subject to technician availability",
            "Customers must provide accurate service requirements",
            "Technicians must maintain accurate availability",
            "Both parties agree to communicate professionally",
            "Cancellation policies apply to all bookings"
        ]
    },
    {
        title: "Payments and Fees",
        icon: CreditCard,
        content: [
            "Payments are processed securely through Stripe",
            "Customers pay for services at the time of booking",
            "Service fees are clearly displayed before payment",
            "Refunds are handled according to our refund policy",
            "Technicians receive payments after service completion",
            "All transactions are in USD"
        ]
    },
    {
        title: "User Responsibilities",
        icon: Shield,
        content: [
            "Provide accurate and truthful information",
            "Respect technicians and their property",
            "Do not misuse or abuse the platform",
            "Do not engage in fraudulent activities",
            "Comply with all applicable laws and regulations",
            "Report any issues or concerns promptly"
        ]
    },
    {
        title: "Technician Responsibilities",
        icon: Users,
        content: [
            "Maintain professional conduct at all times",
            "Provide services as described in your profile",
            "Arrive on time for scheduled appointments",
            "Use appropriate tools and equipment",
            "Follow safety protocols and regulations",
            "Maintain required licenses and certifications"
        ]
    },
    {
        title: "Dispute Resolution",
        icon: AlertTriangle,
        content: [
            "We encourage resolving disputes directly between parties",
            "FixItNow may mediate disputes at our discretion",
            "Both parties agree to act in good faith",
            "Formal disputes will be resolved through arbitration",
            "Governing law applies to all disputes"
        ]
    },
    {
        title: "Limitation of Liability",
        icon: Info,
        content: [
            "FixItNow is a marketplace connecting customers and technicians",
            "We are not responsible for service quality or outcomes",
            "We are not liable for indirect or consequential damages",
            "Our liability is limited to the amount paid for services",
            "We do not guarantee the accuracy of service descriptions"
        ]
    }
];

const TermsOfServicePage = () => {
    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-linear-to-br from-blue-600 to-blue-800 py-20">
                <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10" />
                <div className="container relative mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center text-white">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Terms and Conditions
                        </h1>
                        <p className="text-lg text-blue-100">
                            Please read these terms carefully before using FixItNow.
                            By using our platform, you agree to these terms.
                        </p>
                        <div className="flex items-center justify-center gap-4 mt-6 text-sm text-blue-200">
                            <span>Last Updated: August 1, 2026</span>
                            <span>•</span>
                            <span>Version 2.0</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quick Navigation */}
            {/* <section className="py-8 bg-white border-b sticky top-0 z-10 shadow-sm">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap gap-2 justify-center">
                        {termsSections.map((section, index) => {
                            const Icon = section.icon;
                            return (
                                <Link
                                    key={index}
                                    href={`#${section.title.toLowerCase().replace(/\s+/g, '-')}`}
                                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-full bg-slate-100 hover:bg-blue-100 transition-colors text-foreground/80 hover:text-blue-600"
                                >
                                    <Icon className="h-3 w-3" />
                                    {section.title}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section> */}

            {/* Terms Content */}
            <section className="pt-12 pb-4">
                <div className="container mx-auto px-4 max-w-5xl">
                    {/* Introduction */}
                    <div className="bg-blue-50 dark:bg-muted rounded-2xl p-6 md:p-8 mb-10">
                        <div className="flex items-start gap-4">
                            <BookOpen className="h-6 w-6 text-blue-600 shrink-0 mt-1" />
                            <div>
                                <h2 className="text-xl font-bold mb-2">Welcome to FixItNow</h2>
                                <p className="text-foreground/80">
                                    These Terms of Service govern your use of FixItNow, a home services
                                    marketplace platform. By accessing or using our platform, you agree
                                    to be bound by these terms. Please read them carefully.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Terms Sections */}
                    <div className="space-y-8">
                        {termsSections.map((section, index) => {
                            const Icon = section.icon;
                            return (
                                <div
                                    key={index}
                                    id={section.title.toLowerCase().replace(/\s+/g, '-')}
                                    className="scroll-mt-24"
                                >
                                    <Card className="border-0 shadow-sm">
                                        <CardHeader>
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-blue-50 rounded-lg">
                                                    <Icon className="h-6 w-6 text-blue-600" />
                                                </div>
                                                <CardTitle className="text-xl">{section.title}</CardTitle>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <ul className="space-y-2">
                                                {section.content.map((item, itemIndex) => (
                                                    <li key={itemIndex} className="flex items-start gap-3">
                                                        <CheckCircle className="h-4 w-4 text-blue-600 shrink-0 mt-1" />
                                                        <span className="text-[1rem] text-foreground/80">{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </CardContent>
                                    </Card>
                                </div>
                            );
                        })}
                    </div>

                    {/* Additional Legal Information */}
                    <div className="mt-10 grid md:grid-cols-2 gap-6">
                        <Card className="border-0 shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-xl flex items-center gap-2">
                                    <Shield className="h-5 w-5 text-blue-600" />
                                    Governing Law
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="-mt-3 text-[1rem] text-foreground/80">
                                    These terms are governed by the laws of the jurisdiction
                                    where FixItNow operates. Any disputes shall be resolved
                                    in accordance with applicable laws.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-xl flex items-center gap-2">
                                    <Clock className="h-5 w-5 text-blue-600" />
                                    Modifications
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="-mt-3 text-[1rem] text-foreground/80">
                                    We reserve the right to modify these terms at any time.
                                    Changes will be effective upon posting. Your continued
                                    use of the platform constitutes acceptance of changes.
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Contact Information */}
                    <div className="mt-10 bg-blue-600 text-white rounded-2xl p-6 md:p-8">
                        <h3 className="text-xl font-bold mb-2">Questions About These Terms?</h3>
                        <p className="text-blue-100 mb-4">
                            If you have any questions about these Terms of Service, please contact us:
                        </p>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
                            <div className="flex items-center gap-3 text-blue-100">
                                <Mail className="h-5 w-5" />
                                <span>info@fixitnow.com</span>
                            </div>
                            <div className="flex items-center gap-3 text-blue-100">
                                <Phone className="h-5 w-5" />
                                <span>+880 1728-473593</span>
                            </div>
                            <div className="flex items-center gap-3 text-blue-100">
                                <MapPin className="h-5 w-5" />
                                <span>123 FixItNow Street, Dhaka, Bangladesh</span>
                            </div>

                            {/* <Link href="/contact" className="mt-4 inline-block">
                                <Button variant="outline" className="text-black bg-white border-white hover:text-blue-600 cursor-pointer">
                                    Contact Support
                                </Button>
                            </Link> */}
                        </div>
                    </div>

                    {/* Back to Top */}
                    {/* <div className="mt-8 text-center">
                        <Link href="#" className="text-blue-600 hover:underline inline-flex items-center gap-2">
                            <ArrowRight className="h-4 w-4" />
                            Back to Top
                        </Link>
                    </div> */}
                </div>
            </section>

            {/* Footer Note */}
            {/* <section className="py-8 bg-muted border-t mt-4">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-sm text-foreground/70">
                        By using FixItNow, you agree to these Terms of Service and our
                        <Link href="/privacy-policy" className="text-blue-600 hover:underline mx-1">
                            Privacy Policy
                        </Link>
                    </p>
                </div>
            </section> */}
        </div>
    );
};

export default TermsOfServicePage;
