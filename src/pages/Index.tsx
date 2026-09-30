import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { Who } from "@/components/site/Who";
import { Offer } from "@/components/site/Offer";
import { Achievements } from "@/components/site/Achievements";
import { Vision } from "@/components/site/Vision";
import { Pricing } from "@/components/site/Pricing";
import { CTA } from "@/components/site/CTA";
import { CookieBanner, PrivacyModal } from "@/components/site/CookieConsent";
import { ConsentProvider } from "@/contexts/ConsentContext";

const Index = () => {
  return (
    <ConsentProvider>
    <main className="min-h-screen bg-background text-foreground overflow-x-clip">
      <Nav />
      <Hero />
      <Offer />
      <Who />
      <Achievements />
      <Pricing />
      <Vision />
      <CTA />
      <CookieBanner />
      <PrivacyModal />
    </main>
    </ConsentProvider>
  );
};

export default Index;
