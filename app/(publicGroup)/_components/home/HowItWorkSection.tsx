import { Calendar, Search, Users } from "lucide-react";

const steps = [
    {
        step: "01",
        title: "Search Services",
        description: "Browse through our extensive catalog of professional home services",
        icon: Search,
        color: "bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400"
    },
    {
        step: "02",
        title: "Compare & Choose",
        description: "Review profiles, ratings, and prices to find the perfect match",
        icon: Users,
        color: "bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400"
    },
    {
        step: "03",
        title: "Book & Relax",
        description: "Schedule your service and let our professionals handle the rest",
        icon: Calendar,
        color: "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400"
    },
];

const HowItWorkSection = () => {
    return (
        <section className="py-20 bg-background transition-colors duration-300">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                        How It Works
                    </h2>
                    <p className="text-lg text-foreground">
                        Get your home services done in three simple steps
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        return (
                            <div key={index} className="relative group">
                                <div className="text-center p-8 rounded-2xl bg-muted/50 hover:bg-card border border-border transition-all hover:shadow-xl hover:shadow-primary/5 dark:hover:shadow-primary/10">
                                    <div className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl ${step.color} mb-6 text-2xl font-bold`}>
                                        {step.step}
                                    </div>
                                    <div className="flex justify-center mb-4">
                                        <Icon className="h-8 w-8 text-muted-foreground" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-foreground mb-2">
                                        {step.title}
                                    </h3>
                                    <p className="text-muted-foreground">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    )
}

export default HowItWorkSection
