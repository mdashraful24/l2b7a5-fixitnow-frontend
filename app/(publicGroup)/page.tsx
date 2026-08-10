import HereSection from "./_components/home/HereSection";
import HowItWorkSection from "./_components/home/HowItWorkSection";
import WhyChooseUsSection from "./_components/home/WhyChooseUsSection";
import { TestimonialsSection } from "./_components/home/TestimonialsSection";
import FAQSection from "./_components/home/FAQSection";
import CTASection from "./_components/home/CTASection";
import AllCategories from "./_components/categories/AllCategories";
import TopServices from "./_components/serviceInfo/TopServices";
import HeroSection from "./_components/home/HeroSection";

export default async function HomePage() {

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSection />
      {/* <HereSection /> */}

      {/* How It Works Section */}
      <HowItWorkSection />

      {/* Why Choose Us Section */}
      <WhyChooseUsSection />

      {/* All Categories */}
      <AllCategories />

      {/* Featured Services Section */}
      <TopServices />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* CTA Section */}
      <CTASection />
    </div>
  );
}
