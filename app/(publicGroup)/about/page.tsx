import {
    ArrowRight,
    CalendarCheck,
    Check,
    Clock3,
    HeartHandshake,
    Home,
    ShieldCheck,
    Sparkles,
    Users,
    WalletCards,
    Wrench,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const values = [
    {
        icon: ShieldCheck,
        title: 'Trusted professionals',
        copy: 'We help customers connect with reliable technicians so they can book home services with greater confidence.',
    },
    {
        icon: CalendarCheck,
        title: 'Simple booking',
        copy: 'Browse services, choose a convenient date and time, and manage your booking without unnecessary complexity.',
    },
    {
        icon: HeartHandshake,
        title: 'Built for both sides',
        copy: 'FixItNow supports customers looking for quality service and technicians looking for meaningful opportunities to grow.',
    },
]

const features = [
    {
        icon: Wrench,
        title: 'Find the right service',
        copy: 'Explore home services across different categories and choose the solution that fits your needs.',
    },
    {
        icon: Clock3,
        title: 'Book on your schedule',
        copy: 'Select available dates and time slots that work for you, with clear scheduling information.',
    },
    {
        icon: WalletCards,
        title: 'Pay securely',
        copy: 'Complete your payment through a secure Stripe-powered checkout experience after your booking is accepted.',
    },
    {
        icon: Users,
        title: 'Work with skilled technicians',
        copy: 'Technicians can manage their profiles, services, availability, and customer bookings from one place.',
    },
]

const servicePoints = [
    'Verified service professionals',
    'Clear service information',
    'Flexible appointment scheduling',
    'Secure online payments',
]

// Toggle this to false to hide the image
const SHOW_IMAGE = true;

export default function AboutUsPage() {
    return (
        <main className="min-h-screen overflow-hidden bg-background text-foreground">
            {/* Hero */}
            <section
                id="top"
                className="container mx-auto grid gap-14 px-4 py-12 lg:grid-cols-[1.05fr_.95fr] lg:items-center"
            >
                <div>
                    <p className="mb-6 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-brand">
                        <Sparkles className="size-4" aria-hidden="true" />
                        About FixItNow
                    </p>

                    <h1 className="max-w-3xl text-pretty text-5xl font-semibold leading-[1.02] tracking-[-0.055em]">
                        Your home deserves the right help.
                    </h1>

                    <p className="mt-7 max-w-2xl text-pretty text-lg leading-8 text-foreground/80">
                        FixItNow is a home services marketplace that makes it easier
                        to find skilled technicians, book reliable services, and
                        manage the entire service experience from one place.
                    </p>

                    <div className="mt-9 grid gap-3 sm:grid-cols-2">
                        {servicePoints.map((point) => (
                            <span
                                key={point}
                                className="flex items-center gap-2 text-sm font-medium"
                            >
                                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-brand text-brand-foreground">
                                    <Check
                                        className="size-3"
                                        aria-hidden="true"
                                    />
                                </span>
                                {point}
                            </span>
                        ))}
                    </div>

                    <div className="mt-9 flex flex-wrap gap-3">
                        <Link
                            href="/services"
                            className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-brand-foreground transition-transform hover:-translate-y-0.5 hover:shadow-lg"
                        >
                            Explore Services
                            <ArrowRight
                                className="size-4"
                                aria-hidden="true"
                            />
                        </Link>

                        <Link
                            href="/auth/register"
                            className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-blue-600 to-blue-700 px-5 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/25"
                        >
                            Join FixItNow
                        </Link>
                    </div>
                </div>

                {/* Hero visual with image */}
                <div className={`relative min-h-72 lg:min-h-100 ${SHOW_IMAGE ? 'overflow-hidden border-2 border-blue-600 rounded-3xl bg-linear-to-br from-blue-600 to-purple-600 p-8 text-white lg:p-10' : ''}`}>
                    {/* Background Image */}
                    {SHOW_IMAGE && (
                        <div className="absolute inset-0">
                            {/* Decorative elements */}
                            < div className="absolute -right-10 -top-10 size-64 rounded-full border border-white/10" />
                            <div className="absolute -bottom-20 -right-10 size-80 rounded-full bg-white/10" />
                            <div className="absolute -left-20 -top-20 size-96 rounded-full bg-blue-400/20 blur-3xl" />

                            <Image
                                src="/images/hero-bg.jpg"
                                alt="FixItNow Background Image"
                                fill
                                className="object-cover"
                                priority
                            />
                            <div className="absolute inset-0 bg-linear-to-br from-blue-600/80 to-purple-600/80" />

                            <div className="absolute left-8 top-10 z-10 flex size-20 items-center justify-center rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm sm:left-10">
                                <Wrench className="size-9 text-white" />
                            </div>

                            <div className="absolute bottom-10 left-8 z-10 max-w-sm sm:left-10">
                                <p className="text-sm font-medium text-white/60">
                                    The FixItNow promise
                                </p>

                                <p className="mt-3 text-3xl font-medium leading-tight tracking-tight">
                                    Reliable home services, without the hassle.
                                </p>
                            </div>

                            <div className="absolute right-8 top-10 z-10 flex size-28 rotate-6 items-center justify-center rounded-full border border-white/30 bg-white/10 text-center text-xs font-semibold uppercase tracking-widest backdrop-blur-sm">
                                Home
                                <br />
                                help
                                <br />
                                made easy
                            </div>
                        </div>
                    )}

                    {SHOW_IMAGE && (
                        <>
                            {/* Feature Image */}
                            <div className="absolute inset-0">
                                <Image
                                    src="https://res.cloudinary.com/dycylbjm1/image/upload/v1786527011/fixitnow-brand-3_lk01d8.png"
                                    alt="FixItNow icon"
                                    fill
                                    unoptimized
                                    priority
                                    className="object-cover"
                                />
                            </div>
                        </>
                    )}
                </div>
            </section>

            {/* Story */}
            <section
                id="story"
                className="border-y border-border bg-secondary/45"
            >
                <div className="container mx-auto gap-10 px-4 py-12">
                    {/* <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
                            Why FixItNow
                        </p>

                        <p className="mt-4 max-w-xs text-sm leading-6 text-muted-foreground">
                            One platform connecting customers with the
                            professionals they need.
                        </p>
                    </div> */}

                    <div>
                        <h2 className="text-pretty text-3xl font-semibold tracking-tight sm:text-4xl">
                            Home services should be easier to find, book, and
                            manage.
                        </h2>

                        <p className="mt-6 text-lg leading-8 text-foreground/80">
                            Finding a reliable professional for a home repair or
                            maintenance job can often mean searching through
                            multiple platforms, making phone calls, comparing
                            prices, and trying to coordinate schedules.
                        </p>

                        <p className="mt-5 text-lg leading-8 text-foreground/80">
                            FixItNow brings that experience together in one
                            marketplace. Customers can discover services,
                            select available appointments, track bookings, and
                            make secure payments. Technicians get the tools they
                            need to manage their services, availability, and
                            bookings.
                        </p>

                        <p className="mt-5 text-lg leading-8 text-foreground/80">
                            Our goal is simple: make it easier for customers to
                            get things fixed and easier for skilled technicians
                            to grow their service business.
                        </p>
                    </div>
                </div>
            </section>

            {/* How it works */}
            <section className="container mx-auto gap-10 px-4 py-12">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
                        What FixItNow offers
                    </p>

                    <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                        Everything you need for a smoother service experience.
                    </h2>

                    <p className="mt-5 text-lg leading-8 text-foreground/80">
                        From discovering a service to completing a payment,
                        FixItNow keeps the process clear and straightforward.
                    </p>
                </div>

                <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
                    {features.map(({ icon: Icon, title, copy }) => (
                        <article
                            key={title}
                            className="bg-background p-6 transition-colors hover:bg-secondary/50"
                        >
                            <div className="flex size-10 items-center justify-center rounded-xl bg-blue-100 p-1 text-blue-600">
                                <Icon
                                    className="size-5"
                                    aria-hidden="true"
                                />
                            </div>

                            <h3 className="mt-5 text-xl font-semibold tracking-tight">
                                {title}
                            </h3>

                            <p className="mt-3 leading-7 text-foreground/80">
                                {copy}
                            </p>
                        </article>
                    ))}
                </div>
            </section>

            {/* Values */}
            <section
                id="values"
                className="border-y border-border bg-secondary/45"
            >
                <div className="container mx-auto px-4 py-12">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
                            What guides us
                        </p>

                        <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                            Good service is about more than getting the job
                            done.
                        </h2>
                    </div>

                    <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-3">
                        {values.map(
                            ({ icon: Icon, title, copy }) => (
                                <article
                                    key={title}
                                    className="bg-background p-6 transition-colors hover:bg-secondary/50"
                                >
                                    <div className="flex size-10 items-center justify-center rounded-xl bg-blue-100 p-2 text-blue-600">
                                        <Icon
                                            className="size-6 text-blue-600"
                                            aria-hidden="true"
                                        />
                                    </div>

                                    <h3 className="mt-5 text-xl font-semibold tracking-tight">
                                        {title}
                                    </h3>

                                    <p className="mt-3 leading-7 text-foreground/80">
                                        {copy}
                                    </p>
                                </article>
                            )
                        )}
                    </div>
                </div>
            </section>

            {/* For customers and technicians */}
            <section className="container mx-auto gap-10 px-4 py-12">
                <div className="grid gap-8 lg:grid-cols-2">
                    <div className="rounded-[2rem] border border-border bg-background p-8 sm:p-10">
                        <div className="flex size-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                            <Users className="size-6" />
                        </div>

                        <p className="mt-8 text-sm font-semibold uppercase tracking-[0.18em] text-brand">
                            For customers
                        </p>

                        <h2 className="mt-3 text-3xl font-semibold tracking-tight">
                            Get the help your home needs.
                        </h2>

                        <p className="mt-5 leading-7 text-foreground/80">
                            Discover services, compare your options, choose a
                            convenient appointment, and keep track of your
                            booking from your customer dashboard.
                        </p>

                        <Link
                            href="/services"
                            className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-blue-500 hover:underline"
                        >
                            Browse services
                            <ArrowRight className="size-4" />
                        </Link>
                    </div>

                    <div className="rounded-[2rem] bg-primary p-8 text-primary-foreground sm:p-10">
                        <div className="flex size-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                            <Wrench className="size-6" />
                        </div>

                        <p className="mt-8 text-sm font-semibold uppercase tracking-[0.18em] text-brand">
                            For technicians
                        </p>

                        <h2 className="mt-3 text-3xl font-semibold tracking-tight">
                            Turn your skills into opportunities.
                        </h2>

                        <p className="mt-5 leading-7 text-primary-foreground/90">
                            Manage your services, availability, customer
                            bookings, and professional profile from a
                            dedicated technician dashboard.
                        </p>

                        <Link
                            href="/auth/register"
                            className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline"
                        >
                            Become a technician
                            <ArrowRight className="size-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Mission */}
            <section
                id="mission"
                className="px-4"
            >
                <div
                    className="container mx-auto mb-6 overflow-hidden rounded-[2rem] bg-linear-to-br from-brand to-blue-600 p-8 text-brand-foreground"
                >
                    <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.18em]">
                                Our mission
                            </p>

                            <h2 className="mt-4 text-pretty text-4xl font-semibold leading-tight tracking-[-0.04em]">
                                Make home services simple, reliable, and accessible.
                            </h2>

                            <p className="mt-3 max-w-2xl leading-7">
                                FixItNow is building a better way for customers and
                                technicians to connect, work together, and get
                                things done.
                            </p>
                        </div>

                        <Link
                            href="/services"
                            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-blue-600 transition-all hover:-translate-y-0.5 hover:shadow-lg"
                        >
                            Get started
                            <ArrowRight
                                className="size-4"
                                aria-hidden="true"
                            />
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    )
}
