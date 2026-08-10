"use client"

import Link from 'next/link'
import {
    Mail,
    Phone,
    MapPin,
    Clock,
    Wrench
} from 'lucide-react'
import { FacebookLogoIcon, GithubLogoIcon, LinkedinLogoIcon } from '@phosphor-icons/react'

const Footer = () => {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-background border-t border-border mt-10">
            <div className="container mx-auto px-4">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:grid-cols-4">
                    {/* Company Info */}
                    <div className="space-y-4">
                        {/* <h3 className="text-2xl font-bold text-foreground">
                            FixItNow
                        </h3> */}
                        <Link className="brand" href="/" aria-label="FixItNow home">
                            <span className="brand-mark"><Wrench size={17} strokeWidth={2.5} />
                            </span>FixIt<span>Now</span>
                        </Link>
                        <p className="text-sm text-foreground/80">
                            Your trusted platform for finding professional home services.
                            Connect with verified professionals in your area.
                        </p>
                        <div className="flex space-x-4">
                            <Link
                                href="https://www.facebook.com/ashraful.islam.ratul2k"
                                className="text-foreground/80 hover:text-blue-500 transition-colors"
                                aria-label="Facebook"
                            >
                                <FacebookLogoIcon className="h-7 w-7" />
                            </Link>
                            <Link
                                href="https://www.linkedin.com/in/ashraful-islam-ratul/"
                                className="text-foreground/80 hover:text-blue-500 transition-colors"
                                aria-label="Linkedin"
                            >
                                <LinkedinLogoIcon className="h-7 w-7" />
                            </Link>
                            <Link
                                href="https://github.com/mdashraful24"
                                className="text-foreground/80 hover:text-blue-500 transition-colors"
                                aria-label="Github"
                            >
                                <GithubLogoIcon className="h-7 w-7" />
                            </Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                            Quick Links
                        </h4>
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    href="/services"
                                    className="text-sm text-foreground/80 hover:text-blue-500 transition-colors"
                                >
                                    Browse Services
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-sm text-foreground/80 hover:text-blue-500 transition-colors"
                                >
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-sm text-foreground/80 hover:text-blue-500 transition-colors"
                                >
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-sm text-foreground/80 hover:text-blue-500 transition-colors"
                                >
                                    Blog
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                            Support
                        </h4>
                        <ul className="space-y-3">
                            {/* <li>
                                <Link
                                    href="#"
                                    className="text-sm text-foreground/80 hover:text-blue-500 transition-colors"
                                >
                                    FAQ
                                </Link>
                            </li> */}
                            <li>
                                <Link
                                    href="#"
                                    className="text-sm text-foreground/80 hover:text-blue-500 transition-colors"
                                >
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-sm text-foreground/80 hover:text-blue-500 transition-colors"
                                >
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-sm text-foreground/80 hover:text-blue-500 transition-colors"
                                >
                                    Help Center
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                            Contact Us
                        </h4>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3 text-sm text-foreground/80">
                                <MapPin className="h-5 w-5 text-primary dark:text-blue-500 shrink-0 mt-0.5" />
                                <span>123 FixItNow Street, Dhaka, Bangladesh</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm text-foreground/80">
                                <Phone className="h-5 w-5 text-primary dark:text-blue-500 shrink-0" />
                                <a href="tel:+8801234567890" className="hover:text-blue-500 transition-colors">
                                    +880 123 456 7890
                                </a>
                            </li>
                            <li className="flex items-center gap-3 text-sm text-foreground/80">
                                <Mail className="h-5 w-5 text-primary dark:text-blue-500 shrink-0" />
                                <a href="mailto:info@FixItNow.com" className="hover:text-blue-500 transition-colors">
                                    info@FixItNow.com
                                </a>
                            </li>
                            <li className="flex items-center gap-3 text-sm text-foreground/80">
                                <Clock className="h-5 w-5 text-primary dark:text-blue-500 shrink-0" />
                                <span>Mon-Fri: 8AM - 8PM</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Newsletter Section */}
                {/* <div className="border-t border-border py-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h4 className="text-sm font-semibold text-foreground">
                                Subscribe to our Newsletter
                            </h4>
                            <p className="text-sm text-foreground/80">
                                Get the latest updates and offers
                            </p>
                        </div>
                        <form className="flex w-full max-w-md gap-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-foreground/80 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                                required
                            />
                            <button
                                type="submit"
                                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:scale-105"
                            >
                                Subscribe
                                <ArrowRight className="h-4 w-4" />
                            </button>
                        </form>
                    </div>
                </div> */}

                {/* Bottom Bar */}
                <div className="border-t border-border py-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <p className="text-sm text-foreground/80">
                            &copy; {currentYear} FixItNow. All rights reserved.
                        </p>
                        <div className="flex items-center gap-6">
                            <Link
                                href="#"
                                className="text-sm text-foreground/80 hover:text-blue-500 transition-colors"
                            >
                                Privacy
                            </Link>
                            <Link
                                href="#"
                                className="text-sm text-foreground/80 hover:text-blue-500 transition-colors"
                            >
                                Terms
                            </Link>
                            <Link
                                href="#"
                                className="text-sm text-foreground/80 hover:text-blue-500 transition-colors"
                            >
                                Cookies
                            </Link>
                            <Link
                                href="#"
                                className="text-sm text-foreground/80 hover:text-blue-500 transition-colors"
                            >
                                Sitemap
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
