import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MiniStatCardProps } from "@/lib/type";

export function MiniStatCard({ title, value, color, icon: Icon }: MiniStatCardProps) {
    return (
        <Card className="shadow-sm hover:shadow-md transition-shadow border-border">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                    {title}
                </CardTitle>
                <div className={`rounded-full p-1.5 ${color} bg-opacity-10 dark:bg-opacity-20`}>
                    <Icon className={`h-3.5 w-3.5 ${color}`} />
                </div>
            </CardHeader>
            <CardContent className="-mt-4">
                <div className="flex items-baseline gap-2">
                    <div className="text-2xl font-bold text-foreground">{value}</div>
                </div>
            </CardContent>
        </Card>
    );
}
