import { AboutSection } from "./AboutSection";
import { CallToAction } from "./CallToAction";
import { FeaturesSection } from "./FeaturesSection";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { HeroSection } from "./HeroSection";

export function LandingPage() {
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