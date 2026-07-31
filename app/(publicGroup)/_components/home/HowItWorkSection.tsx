import { Calendar, Search, Users } from "lucide-react";

const steps = [
    {
        step: "01",
        title: "Search Services",
        description: "Browse through our extensive catalog of professional home services",
        icon: Search,
        color: "bg-blue-50 text-blue-600"
    },
    {
        step: "02",
        title: "Compare & Choose",
        description: "Review profiles, ratings, and prices to find the perfect match",
        icon: Users,
        color: "bg-purple-50 text-purple-600"
    },
    {
        step: "03",
        title: "Book & Relax",
        description: "Schedule your service and let our professionals handle the rest",
        icon: Calendar,
        color: "bg-emerald-50 text-emerald-600"
    },
];

const HowItWorkSection = () => {
    return (
        <div className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        How It Works
                    </h2>
                    <p className="text-lg text-gray-600">
                        Get your home services done in three simple steps
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        return (
                            <div key={index} className="relative group">
                                {/* {index < steps.length - 1 && (
                                    <div className="hidden md:block absolute top-1/2 left-full w-full h-0.5 bg-linear-to-r from-blue-200 to-transparent -translate-y-1/2 -translate-x-1/2" />
                                )} */}
                                <div className="text-center p-8 rounded-2xl bg-gray-50/50 hover:bg-white transition-all hover:shadow-xl border border-gray-200">
                                    <div className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl ${step.color} mb-6 text-2xl font-bold`}>
                                        {step.step}
                                    </div>
                                    <div className="flex justify-center mb-4">
                                        <Icon className="h-8 w-8 text-gray-600" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        {step.title}
                                    </h3>
                                    <p className="text-gray-600">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}

export default HowItWorkSection
