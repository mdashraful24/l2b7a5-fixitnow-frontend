import HeroSection from "./_components/home/HereSection";
import HowItWorkSection from "./_components/home/HowItWorkSection";
import { TestimonialsSection } from "./_components/home/TestimonialsSection";
import CTASection from "./_components/home/CTASection";
import AllCategories from "./_components/categories/AllCategories";
import TopServices from "./_components/serviceInfo/TopServices";

export default async function HomePage() {

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSection />

      {/* How It Works Section */}
      <HowItWorkSection />

      {/* All Categories */}
      <AllCategories />

      {/* Featured Services Section */}
      <TopServices/>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* CTA Section */}
      <CTASection />
    </div>
  );
}
