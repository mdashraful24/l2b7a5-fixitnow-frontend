import { Award, Briefcase, Home, Sparkles, ThumbsUp, Toolbox, Users, Wrench } from "lucide-react";

// Statistics data
const stats = [
    { label: "Happy Customers", value: "10K+", icon: Users, color: "text-blue-600" },
    { label: "Expert Professionals", value: "500+", icon: Briefcase, color: "text-emerald-600" },
    { label: "Services Offered", value: "200+", icon: Sparkles, color: "text-purple-600" },
    { label: "Satisfaction Rate", value: "98%", icon: ThumbsUp, color: "text-orange-600" },
];

// Featured categories
const categories = [
    { name: "Plumbing", icon: Wrench, href: "/services?category=plumbing", color: "from-blue-500 to-blue-600" },
    { name: "Electrical", icon: Home, href: "/services?category=electrical", color: "from-yellow-500 to-yellow-600" },
    { name: "Cleaning", icon: Sparkles, href: "/services?category=cleaning", color: "from-emerald-500 to-emerald-600" },
    { name: "Other Services", icon: Toolbox, href: "/services?category=security", color: "from-red-500 to-red-600" },
];

const HereSection = () => {
    return (
        <div className="relative overflow-hidden bg-linear-to-br from-slate-900 via-blue-900 to-slate-800">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)`,
                }} />
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 80% 20%, rgba(255,255,255,0.05) 0%, transparent 50%)`,
                }} />
            </div>

            <div className="relative container mx-auto px-4 py-16 lg:py-24">
                <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
                    {/* Left Content */}
                    <div className="space-y-8">
                        {/* Trust Badge */}
                        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-4 py-2 text-sm font-medium text-white border border-white/20">
                            <Award className="h-4 w-4 text-yellow-400" />
                            <span>Trusted by 10,000+ homeowners</span>
                        </div>

                        {/* Main Heading */}
                        <div className="space-y-4">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                                Find Expert Home
                                <span className="block text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-emerald-400">
                                    Services You Can Trust
                                </span>
                            </h1>
                            <p className="text-lg text-blue-100/90 max-w-lg">
                                Connect with verified professionals for all your home needs.
                                From repairs to renovations, we&apos;ve got you covered.
                            </p>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-4">
                            {stats.map((stat, index) => {
                                const Icon = stat.icon;
                                return (
                                    <div key={index} className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <Icon className={`h-5 w-5 ${stat.color}`} />
                                            <span className="text-2xl font-bold text-white">{stat.value}</span>
                                        </div>
                                        <p className="text-sm text-blue-200/80">{stat.label}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right Content */}
                    <div className="hidden lg:block relative">
                        <div className="relative h-125 w-full">
                            <div className="absolute inset-0 bg-linear-to-br from-blue-500/20 to-emerald-500/20 rounded-3xl backdrop-blur-3xl border border-white/10" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="grid grid-cols-2 gap-4 p-8">
                                    {categories.map((cat, idx) => {
                                        const Icon = cat.icon;
                                        return (
                                            <div
                                                key={idx}
                                                className={`rounded-2xl bg-linear-to-br ${cat.color} p-6 text-white shadow-xl transform hover:scale-105 transition-transform duration-300`}
                                            >
                                                <Icon className="h-8 w-8 mb-2" />
                                                <p className="font-semibold">{cat.name}</p>
                                                <p className="text-sm opacity-80">24/7 Available</p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Wave Divider */}
            <div className="relative">
                <svg
                    className="absolute bottom-[-0.5px] w-full"
                    viewBox="0 0 1440 120"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 70C840 80 960 100 1080 105C1200 110 1320 110 1380 110L1440 110V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
                        className="fill-background"
                    />
                </svg>
            </div>
        </div>
    )
}

export default HereSection
