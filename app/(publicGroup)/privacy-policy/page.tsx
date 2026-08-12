// app/privacy-policy/page.tsx
import { Metadata } from "next";
import Link from "next/link";
import {
    Shield,
    Eye,
    Lock,
    Cookie,
    Mail,
    Database,
    CheckCircle,
    AlertCircle,
    Phone,
    MapPin
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
    title: "Privacy Policy - FixItNow",
    description: "Learn how FixItNow collects, uses, and protects your personal information.",
};

const privacySections = [
    {
        title: "Information We Collect",
        icon: Database,
        content: [
            "Personal Information: Name, email address, phone number, and physical address",
            "Payment Information: Payment method details (processed securely through Stripe)",
            "Service Information: Service preferences, booking history, and technician preferences",
            "Usage Data: How you interact with our platform, including pages visited and features used",
            "Device Information: Browser type, operating system, IP address, and device identifiers"
        ]
    },
    {
        title: "How We Use Your Information",
        icon: Eye,
        content: [
            "Provide, maintain, and improve our services",
            "Process bookings and payments",
            "Connect customers with technicians",
            "Send service-related communications and updates",
            "Personalize your experience on the platform",
            "Detect and prevent fraud and security issues",
            "Comply with legal obligations"
        ]
    },
    {
        title: "Information Sharing",
        icon: Mail,
        content: [
            "We share information with technicians to facilitate service bookings",
            "Third-party payment processors (Stripe) for secure payment processing",
            "Service providers who assist with our operations (hosting, analytics, etc.)",
            "We do not sell your personal information to third parties",
            "Information may be shared to comply with legal requirements"
        ]
    },
    {
        title: "Data Security",
        icon: Lock,
        content: [
            "We implement industry-standard security measures to protect your data",
            "All data is encrypted in transit using SSL/TLS protocols",
            "Secure authentication with role-based access control",
            "Regular security audits and updates to our systems",
            "Limited access to personal information on a need-to-know basis"
        ]
    },
    {
        title: "Cookies and Tracking",
        icon: Cookie,
        content: [
            "We use cookies to enhance your browsing experience",
            "Essential cookies for platform functionality",
            "Analytics cookies to understand how you interact with our services",
            "Preference cookies to remember your settings",
            "You can manage cookie preferences in your browser settings"
        ]
    },
    {
        title: "Your Rights",
        icon: CheckCircle,
        content: [
            "Access your personal information at any time",
            "Request correction of inaccurate data",
            "Request deletion of your personal information",
            "Opt-out of marketing communications",
            "Data portability - receive your data in a structured format",
            "Withdraw consent at any time"
        ]
    }
];

const PrivacyPolicyPage = () => {
    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-linear-to-br from-blue-600 to-blue-800 py-20">
                <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10" />
                <div className="container relative mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center text-white">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Your Privacy Matters
                        </h1>
                        <p className="text-lg text-blue-100">
                            We are committed to protecting your personal information and ensuring
                            transparency in how we handle your data.
                        </p>
                        <div className="flex items-center justify-center gap-4 mt-6 text-sm text-blue-200">
                            <span>Last Updated: August 1, 2026</span>
                            <span>•</span>
                            <span>Version 1.0</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quick Navigation */}
            {/* <section className="py-5 bg-muted border-b sticky top-17 z-10 shadow-sm">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap gap-3 justify-center">
                        {privacySections.map((section, index) => {
                            const Icon = section.icon;
                            return (
                                <Link
                                    key={index}
                                    href={`#${section.title.toLowerCase().replace(/\s+/g, '-')}`}
                                    className="flex items-center gap-2 px-4 py-2 text-sm rounded-full bg-slate-200 hover:bg-blue-100 transition-colors text-black hover:text-blue-600"
                                >
                                    <Icon className="h-4 w-4" />
                                    {section.title}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section> */}

            {/* Privacy Content */}
            <section className="pt-12 pb-4">
                <div className="container mx-auto px-4 max-w-5xl">
                    {/* Introduction */}
                    <div className="bg-blue-50 dark:bg-muted rounded-2xl p-6 md:p-8 mb-10">
                        <div className="flex items-start gap-4">
                            <Shield className="h-6 w-6 text-blue-600 shrink-0 mt-1" />
                            <div>
                                <h2 className="text-xl font-bold mb-2">Introduction</h2>
                                <p className="text-foreground/80">
                                    FixItNow (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy.
                                    This Privacy Policy explains how we collect, use, disclose, and safeguard
                                    your information when you use our platform. Please read this policy carefully
                                    to understand our practices regarding your personal data.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Privacy Sections */}
                    <div className="space-y-8">
                        {privacySections.map((section, index) => {
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
                                                <CardTitle className="text-2xl">{section.title}</CardTitle>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <ul className="space-y-3">
                                                {section.content.map((item, itemIndex) => (
                                                    <li key={itemIndex} className="flex items-start gap-3">
                                                        <CheckCircle className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
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

                    {/* Data Retention */}
                    <div className="mt-12 bg-slate-100 dark:bg-muted rounded-2xl p-6 md:p-8">
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <AlertCircle className="h-5 w-5 text-blue-600" />
                            Data Retention
                        </h3>
                        <p className="text-foreground/80">
                            We retain your personal information only for as long as necessary to fulfill
                            the purposes outlined in this Privacy Policy, unless a longer retention period
                            is required or permitted by law. We will delete or anonymize your information
                            when it is no longer needed.
                        </p>
                    </div>

                    {/* Contact Information */}
                    <div className="mt-12 bg-blue-600 text-white rounded-2xl p-6 md:p-8">
                        <h3 className="text-xl font-bold mb-2">Contact Us</h3>
                        <p className="text-blue-100 mb-4">
                            If you have any questions about this Privacy Policy or our data practices,
                            please contact us:
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
        </div>
    );
};

export default PrivacyPolicyPage;
