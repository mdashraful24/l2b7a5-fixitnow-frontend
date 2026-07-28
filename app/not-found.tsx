"use client";

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home, Search } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function NotFound() {
    const router = useRouter();

    return (
        <div className="min-h-screen w-full bg-linear-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 right-10 w-72 h-72 bg-blue-200/10 dark:bg-blue-500/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 left-10 w-72 h-72 bg-purple-200/10 dark:bg-purple-500/5 rounded-full blur-3xl"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-2xl w-full">
                <div className="flex flex-col items-center text-center space-y-8">
                    {/* Text content */}
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <h1 className="text-6xl md:text-7xl font-bold bg-clip-text text-transparent bg-linear-to-r from-slate-900 via-purple-600 to-slate-900 dark:from-white dark:via-purple-400 dark:to-white">
                                404
                            </h1>
                            <p className="text-xl md:text-2xl font-semibold text-slate-700 dark:text-slate-200">
                                Oops! Page Not Found
                            </p>
                        </div>

                        <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
                            We couldn&apos;t find what you&apos;re looking for. The page might have been moved or doesn&apos;t exist anymore.
                        </p>
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <Link href="/">
                            <Button
                                size="lg"
                                className="bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 gap-2 cursor-pointer"
                            >
                                <Home className="w-5 h-5" />
                                Back to Home
                            </Button>
                        </Link>

                        <Button
                            variant="outline"
                            size="lg"
                            onClick={() => router.back()}
                            className="border-2 border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 font-semibold gap-2 cursor-pointer"
                        >
                            <Search className="w-5 h-5" />
                            Go Back
                        </Button>
                    </div>

                    {/* Additional help text */}
                    <div className="pt-8 border-t border-slate-200 dark:border-slate-700 w-full">
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            Need help? Check out our{' '}
                            <Link
                                href="/"
                                className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                            >
                                documentation
                            </Link>{' '}
                            or{' '}
                            <Link
                                href="/"
                                className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                            >
                                contact us
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}