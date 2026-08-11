import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MiniStatCardProps } from "@/lib/type";

export function MiniStatCard({ title, value, color, icon: Icon, bgColor, iconBgColor }: MiniStatCardProps) {
    return (
        <Card className={`shadow-sm hover:shadow-md transition-shadow border-border ${bgColor}`}>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium text-white">
                    {title}
                </CardTitle>
                <div className={`rounded-full p-1.5 ${iconBgColor}`}>
                    <Icon className={`h-4 w-4 bg-transparent ${color}`} />
                </div>
            </CardHeader>
            <CardContent className="-mt-4">
                <div className="flex items-baseline gap-2">
                    <div className="text-2xl font-bold text-white">{value}</div>
                </div>
            </CardContent>
        </Card>
    );
}
