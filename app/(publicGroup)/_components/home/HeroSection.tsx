"use client"

import { useEffect, useState } from 'react'
import {
    ArrowRight,
    CalendarCheck2,
    ChevronLeft,
    ChevronRight,
    Clock3,
    ShieldCheck,
    Star,
    ChevronDown,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const slides = [
    {
        eyebrow: 'Welcome to FixItNow',
        title: 'Your home repairs, in expert hands.',
        copy: 'Book trusted, verified local technicians for all your home service needs securely through FixItNow.',
        service: 'AC repair',
        category: 'Cooling & heating',
        price: 'From $89',
        duration: '60–90 min',
        rating: '4.9',
        initials: 'JM',
        name: 'Jordan Mitchell',
        color: 'bg-blue-500',
    },
    {
        eyebrow: 'Verified & Secure',
        title: 'Quality service you can trust.',
        copy: 'All FixItNow technicians are background-checked and highly rated by our community of homeowners.',
        service: 'Home cleaning',
        category: 'Cleaning & care',
        price: 'From $65',
        duration: '2–3 hours',
        rating: '5.0',
        initials: 'AR',
        name: 'Avery Reed',
        color: 'bg-emerald-500',
    },
    {
        eyebrow: 'Fast & Reliable',
        title: 'Book a pro in minutes.',
        copy: 'Choose your service, select an available slot, and manage your bookings effortlessly on FixItNow.',
        service: 'Handyman help',
        category: 'Assembly & repairs',
        price: 'From $55',
        duration: '1–2 hours',
        rating: '4.8',
        initials: 'TK',
        name: 'Theo Kim',
        color: 'bg-yellow-500',
    },
]

export function HeroSection() {
    const [active, setActive] = useState(0)
    const slide = slides[active]

    useEffect(() => {
        const timer = window.setInterval(
            () => setActive((current) => (current + 1) % slides.length),
            6500
        )
        return () => window.clearInterval(timer)
    }, [])

    const move = (direction: number) =>
        setActive(
            (current) => (current + direction + slides.length) % slides.length
        )

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        const targetId = e.currentTarget.getAttribute('href')
        if (targetId) {
            const targetElement = document.querySelector(targetId)
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                })
            }
        }
    }

    return (
        <section className="relative isolate min-h-[70vh] overflow-hidden text-foreground">
            {/* Hero content */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_minmax(430px,.9fr)] items-center gap-8 lg:gap-[7vw] container mx-auto px-4 min-h-[calc(62vh-4rem)] pt-14">
                {/* Left column */}
                <div className="max-w-xl">
                    <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.08em] text-blue-500">
                        <span className="h-1.75 w-1.75 rounded-full bg-blue-500" />
                        {slide.eyebrow}
                    </div>
                    <h1 className="max-w-162.5 mt-4 mb-4.5 text-6xl font-extrabold tracking-tight">
                        {slide.title}
                    </h1>
                    <p className="max-w-2xl text-[17px] leading-[1.55] text-foreground">
                        {slide.copy}
                    </p>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mt-7.25">
                        <Link href="/services" className="rounded-full px-5.25 py-3.75 text-sm font-bold bg-primary text-primary-foreground hover:shadow-[0_8px_20px_oklch(.48_.16_245_/.22)] hover:-translate-y-0.5 transition-all flex items-center gap-2">
                            Find a Services <ArrowRight className="h-4 w-4" />
                        </Link>
                        <Link href="/all-categories" className="flex items-center gap-2.25 text-sm font-bold text-foreground border-2 border-gray-500 rounded-full px-5.25 py-2.5 hover:shadow-[0_8px_20px_oklch(.48_.16_245_/.22)] hover:-translate-y-0.5 transition-all">
                            <span className="grid h-6.75 w-6.75 place-items-center rounded-full border pl-0.5 text-[9px] text-blue-500 bg-blue-100">
                                ▶
                            </span>
                            All Categories
                        </Link>
                    </div>
                    <div className="flex flex-wrap items-center gap-2.5 mt-9 text-[11px] text-muted-foreground">
                        <div className="flex pr-1">
                            {['JD', 'AK', 'LM'].map((initials, i) => (
                                <span
                                    key={i}
                                    className={`grid h-6.25 w-6.25 -mr-1.75 place-items-center rounded-full border-2 border-background text-[8px] font-extrabold ${i === 0
                                        ? 'bg-primary text-primary-foreground'
                                        : i === 1
                                            ? 'bg-accent text-accent-foreground'
                                            : 'bg-foreground text-background'
                                        }`}
                                >
                                    {initials}
                                </span>
                            ))}
                        </div>
                        <span>
                            <strong className="text-foreground">100+</strong> happy homeowners
                        </span>
                        <span className="hidden sm:inline h-4 w-px bg-border mx-1.25" />
                        <span className="flex items-center gap-1 text-foreground">
                            <Star className="h-3.25 w-3.25 fill-current text-[#e4a900]" />
                            4.9 average rating
                        </span>
                    </div>
                </div>

                {/* Right column - Visual */}
                <div className="min-w-0" aria-live="polite">
                    <div
                        className={`relative min-h-97.5 rounded-2xl overflow-hidden lg:shadow-[0_24px_55px_oklch(.2_.03_255_/.12)] transition-colors duration-300 ${slide.color}`}
                    >
                        {/* Window */}
                        <div className="absolute right-[10%] top-[12%] h-[53%] w-[46%] border-8 border-white/20 bg-white/10">
                            <div className="absolute right-[17%] top-[14%] h-8.25 w-8.25 rounded-full bg-accent" />
                            <div className="absolute top-[47%] h-2.25 w-full bg-white/20" />
                            <div className="absolute left-[47%] h-full w-2.25 bg-white/20" />
                        </div>

                        {/* Plant */}
                        <div className="absolute bottom-[6%] right-[4%] h-40 w-25">
                            <div className="absolute bottom-0 h-13.25 w-18.5 rounded-[45%_45%_40%_40%] bg-[oklch(.18_.05_120_/.32)]" />
                            <span className="absolute bottom-10.5 left-10.5 h-23 w-4.5 origin-bottom-left rotate-[-23deg] rounded-[100%_0_0_0] bg-[oklch(.26_.1_142_/.55)]" />
                            <i className="absolute bottom-10.5 left-6 h-23 w-4.5 origin-bottom-left rotate-[-52deg] scale-80 rounded-[100%_0_0_0] bg-[oklch(.26_.1_142_/.55)]" />
                            <b className="absolute bottom-10.5 left-13.75 h-23 w-4.5 origin-bottom-left rotate-24 scale-75 rounded-[100%_0_0_0] bg-[oklch(.26_.1_142_/.55)]" />
                        </div>

                        {/* Card */}
                        <div className="absolute bottom-[18%] left-[12%] w-[min(79%,390px)] rounded-2xl border border-white/45 bg-white/95 p-4.75 shadow-[0_17px_35px_oklch(.2_.03_255_/.15)] text-foreground backdrop-blur-sm">
                            <div className="flex items-center gap-2.5">
                                <div className="grid h-8.75 w-8.75 place-items-center rounded-full border-2 border-background bg-foreground text-[10px] font-extrabold text-background">
                                    {slide.initials}
                                </div>
                                <div>
                                    <Badge variant="secondary" className="mb-0.75 flex items-center gap-1 text-[9px] font-bold text-[oklch(.45_.13_145)] dark:text-white">
                                        <span className="h-1.25 w-1.25 rounded-full bg-green-500" />
                                        Available today
                                    </Badge>
                                    <strong className="block text-xs text-black">{slide.name}</strong>
                                    <small className="block text-[10px] text-black">
                                        Verified FixItNow pro
                                    </small>
                                </div>
                                <span className="ml-auto flex items-center gap-1 text-[11px] font-extrabold text-[#e4a900]">
                                    <Star className="h-3.5 w-3.5 fill-current" /> {slide.rating}
                                </span>
                            </div>

                            <div className="my-3.75 flex justify-between gap-3 border-y border-border dark:border-gray-400 py-3.5">
                                <div>
                                    <span className="block text-[8px] font-extrabold uppercase tracking-[0.09em] text-black">
                                        POPULAR SERVICE
                                    </span>
                                    <strong className="mt-0.75 block text-[17px] tracking-[-0.04em] text-black">
                                        {slide.service}
                                    </strong>
                                    <small className="mt-0.75 block text-[10px] text-black">
                                        {slide.category}
                                    </small>
                                </div>
                                <span className="self-center text-xs font-extrabold text-primary">
                                    {slide.price}
                                </span>
                            </div>

                            <div className="flex gap-3.75 text-[9px] text-black">
                                <span className="flex items-center gap-1">
                                    <Clock3 className="h-3.5 w-3.5" /> {slide.duration}
                                </span>
                                <span className="flex items-center gap-1">
                                    <ShieldCheck className="h-3.5 w-3.5" /> Background checked
                                </span>
                            </div>

                            {/* <Button className="mt-[14px] w-full rounded-lg bg-foreground px-[10px] py-[10px] text-[11px] font-bold text-background hover:bg-foreground/90">
                                View availability <ArrowRight className="h-4 w-4" />
                            </Button> */}
                        </div>

                        {/* Floating badges */}
                        <div className="absolute left-[5%] top-[8%] flex items-center gap-2.25 rounded-xl border border-white/45 bg-white/90 px-3 py-2.5 shadow-[0_9px_20px_oklch(.2_.03_255_/.12)] text-foreground backdrop-blur-sm">
                            <ShieldCheck className="h-4.25 w-4.25 text-primary" />
                            <div className='text-black'>
                                <strong className="block text-[10px]">Safety first</strong>
                                <small className="block text-[9px]">
                                    Every pro verified
                                </small>
                            </div>
                        </div>

                        <div className="absolute right-[5%] bottom-[8%] flex items-center gap-2.25 rounded-xl border border-white/45 bg-white/90 px-3 py-2.5 shadow-[0_9px_20px_oklch(.2_.03_255_/.12)] text-foreground backdrop-blur-sm">
                            <CalendarCheck2 className="h-4.25 w-4.25 text-primary" />
                            <div className='text-black'>
                                <strong className="block text-[10px]">Book in minutes</strong>
                                <small className="block text-[9px]">
                                    Easy, secure checkout
                                </small>
                            </div>
                        </div>
                    </div>

                    {/* Slider controls */}
                    <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-2 font-mono text-[12px] text-foreground">
                            <span>01</span>
                            <div className="h-0.5 w-22.5 bg-border">
                                <div
                                    className="h-full bg-primary transition-all duration-300"
                                    style={{ width: `${((active + 1) / slides.length) * 100}%` }}
                                />
                            </div>
                            <span>0{slides.length}</span>
                        </div>
                        <div className="flex gap-1.75">
                            <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 rounded-full border-border bg-transparent text-foreground/80 hover:bg-primary hover:text-primary-foreground"
                                onClick={() => move(-1)}
                                aria-label="Previous service"
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 rounded-full border-border bg-transparent text-foreground/80 hover:bg-primary hover:text-primary-foreground"
                                onClick={() => move(1)}
                                aria-label="Next service"
                            >
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll indicator with icon */}
            <div className="hidden lg:block">
                <Link
                    href="#howItWorks"
                    onClick={handleScroll}
                    className="absolute bottom-4.25 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-[12px] font-bold text-foreground/80 hover:text-foreground transition-colors group pt-5"
                >
                    <span>Scroll to explore</span>
                    <div className="flex flex-col items-center gap-1 animate-bounce">
                        <ChevronDown className="h-5 w-5" />
                        <span className="block h-px w-10.5 group-hover:bg-foreground transition-colors" />
                    </div>
                </Link>
            </div>
        </section>
    )
}

export default HeroSection
