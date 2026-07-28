import { Loader2 } from 'lucide-react'
import {
    Card,
    CardContent,
} from '@/components/ui/card'

const GlobalLoading = () => {
    return (
        <div className="flex min-h-dvh items-center justify-center p-6">
            <Card className="w-full max-w-sm shadow-lg">
                <CardContent className="flex flex-col items-center gap-4 py-10">
                    <Loader2 className="h-10 w-10 animate-spin text-primary" />

                    <div className="space-y-1 text-center">
                        <h3 className="font-semibold">
                            Loading Application
                        </h3>

                        <p className="text-sm text-muted-foreground">
                            Preparing your content...
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default GlobalLoading
