import type { Metadata } from "next";
import "./globals.css";

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
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
