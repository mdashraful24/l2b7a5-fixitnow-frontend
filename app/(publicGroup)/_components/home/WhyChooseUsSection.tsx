import { ShieldCheck, Clock, Award, ThumbsUp } from "lucide-react";

const features = [
    {
        title: "Verified Professionals",
        description: "All our service providers undergo strict background checks and verification.",
        icon: ShieldCheck,
        color: "bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400"
    },
    {
        title: "On-Time Service",
        description: "We value your time. Our professionals arrive exactly when scheduled.",
        icon: Clock,
        color: "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400"
    },
    {
        title: "High Quality Work",
        description: "We ensure top-notch service quality with our experienced technicians.",
        icon: Award,
        color: "bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400"
    },
    {
        title: "Satisfaction Guaranteed",
        description: "Your satisfaction is our priority. We offer a money-back guarantee.",
        icon: ThumbsUp,
        color: "bg-orange-50 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400"
    }
];

const WhyChooseUsSection = () => {
    return (
        <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                    Why Choose Us
                </h2>
                <p className="text-lg text-foreground">
                    We provide the best service experience with our trusted professionals
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                        <div key={index} className="p-6 rounded-2xl bg-background border border-border hover:shadow-lg transition-all text-center group">
                            <div className={`inline-flex h-16 w-16 items-center justify-center rounded-full ${feature.color} mb-6 transition-transform group-hover:scale-110`}>
                                <Icon className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-foreground/80">
                                {feature.description}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default WhyChooseUsSection;
