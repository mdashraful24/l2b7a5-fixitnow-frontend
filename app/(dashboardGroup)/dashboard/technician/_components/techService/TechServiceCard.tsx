import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ICategory, ITechService } from "@/lib/type";
import { TechServiceFormDialog } from "./TechServiceFormDialog";
import { Badge } from "@/components/ui/badge";

type TechServiceCardProps = {
    post: ITechService;
    categories: ICategory[];
}

export function TechServicePostCard({ post, categories }: TechServiceCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">{post.title}</CardTitle>
                <CardAction>
                    <TechServiceFormDialog mode="edit" service={post} categories={categories} />
                </CardAction>
            </CardHeader>
            <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground line-clamp-3 whitespace-pre-line">
                    {post.description}
                </p>
                <div className="flex flex-wrap items-center gap-2 text-sm">
                    <Badge variant="secondary">${post.price.toFixed(2)}</Badge>
                    <Badge variant="outline">{post.duration} min</Badge>
                    {post.category && (
                        <Badge variant="outline">{post.category.name}</Badge>
                    )}
                    {post.isAvailable === false && (
                        <Badge variant="destructive">Unavailable</Badge>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}