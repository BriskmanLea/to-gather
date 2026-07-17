import { AboutSection, CallToAction, FeaturesSection, Footer, Header, HeroSection } from "@/widgets/landing/ui";

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