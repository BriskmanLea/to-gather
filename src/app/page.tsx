import { AboutSection } from "@/features/landing/components/about-section";
import { CallToAction } from "@/features/landing/components/call-to-action";
import { FeaturesSection } from "@/features/landing/components/features-section";
import { Footer } from "@/features/landing/components/footer";
import { Header } from "@/features/landing/components/header";
import { HeroSection } from "@/features/landing/components/hero-section";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <AboutSection />
      <CallToAction />
      <Footer />
    </main>
  );
}