import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "radix-ui/tooltip";
import { Toaster } from "sonner";
import { ThemeProvider } from "../components/theme/theme-provider";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: "FixItNow | Home Services Marketplace",
  description: "Book trusted home service professionals for repairs, maintenance, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("h-full antialiased", "font-sans", inter.variable)}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <TooltipProvider>
            <Toaster richColors position="top-right" />
            {children}
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
