import { Suspense } from "react";
import Link from "next/link";
import ServiceSkeleton from "./_components/serviceInfo/ServiceSkeleton";
import { ServiceList } from "./_components/serviceInfo/ServiceList";
// import { ServiceSearchBar } from "./_components/serviceInfo/ServiceSearchBar";
import { ArrowRight } from "lucide-react";
import HeroSection from "./_components/home/HereSection";
import HowItWorkSection from "./_components/home/HowItWorkSection";
import { TestimonialsSection } from "./_components/home/TestimonialsSection";
import CTASection from "./_components/home/CTASection";

export default async function HomePage({
  searchParams
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSection />

      {/* How It Works Section */}
      <HowItWorkSection />

      {/* Featured Services Section */}
      <section className="bg-background transition-colors">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div className="space-y-1.5">
              <h2 className="text-3xl font-bold text-foreground">
                Featured Services
              </h2>
              <p className="text-muted-foreground">
                Browse and choose the best services tailored to your needs
              </p>
            </div>
          </div>

          {/* <ServiceSearchBar /> */}

          <Suspense fallback={<ServiceSkeleton />}>
            <ServiceList searchParams={searchParams} />
          </Suspense>

          <Link
            href="/services"
            className="inline-flex items-center justify-end gap-2 text-primary font-semibold hover:text-primary/80 transition-colors mt-6 w-full"
          >
            View All Services
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* CTA Section */}
      <CTASection />
    </div>
  );
}
