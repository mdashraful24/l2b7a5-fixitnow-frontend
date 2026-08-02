import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCardProps } from "@/lib/type";
import { TrendingDown, TrendingUp } from "lucide-react";

export function StatCard({ title, value, icon: Icon, description, trend, color, bgColor, cardBgColor }: StatCardProps) {
    const isTrendPositive = trend !== undefined ? trend >= 0 : false;
    const TrendIcon = isTrendPositive ? TrendingUp : TrendingDown;

    return (
        <Card className={`shadow-sm hover:shadow-md transition-shadow border-border ${cardBgColor}`}>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium text-white">
                    {title}
                </CardTitle>
                <div className={`rounded-lg p-2 ${bgColor}`}>
                    <Icon className={`h-5 w-5 ${color}`} />
                </div>
            </CardHeader>
            <CardContent className="-mt-4">
                <div className="flex items-baseline gap-2">
                    <div className="text-3xl font-bold text-white">{value}</div>
                    {trend !== undefined && trend !== 0 && (
                        <div className={`flex items-center text-sm ${isTrendPositive ? 'text-green-500' : 'text-red-500'}`}>
                            <TrendIcon className="h-3 w-3 mr-0.5" />
                            {Math.abs(trend).toFixed(1)}%
                        </div>
                    )}
                </div>
                {description && (
                    <p className="text-xs text-white mt-1">{description}</p>
                )}
            </CardContent>
        </Card>
    );
}
