import { ArrowRight, Phone } from 'lucide-react'
import Link from 'next/link'

const CTASection = () => {
    return (
        <section className="relative overflow-hidden bg-linear-to-r from-primary to-primary/80">
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 30% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)`,
                }} />
            </div>

            <div className="relative container mx-auto px-4 py-16 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                    Ready to Get Started?
                </h2>
                <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto mb-8">
                    Join thousands of satisfied customers and find the perfect service for your home today.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/services"
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-background px-8 py-4 font-semibold shadow-lg transition-all hover:scale-105 hover:shadow-xl hover:shadow-primary/20"
                    >
                        Browse Services
                        <ArrowRight className="h-5 w-5" />
                    </Link>
                    {/* <Link
                        href="/contact"
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary-foreground/10 px-8 py-4 font-semibold text-primary-foreground border border-primary-foreground/30 transition-all hover:bg-primary-foreground/20 hover:scale-105"
                    >
                        <Phone className="h-5 w-5" />
                        Contact Us
                    </Link> */}
                </div>
            </div>
        </section>
    )
}

export default CTASection
