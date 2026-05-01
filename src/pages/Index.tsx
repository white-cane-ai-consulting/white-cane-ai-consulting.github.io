import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { Who } from "@/components/site/Who";
import { Offer } from "@/components/site/Offer";
import { Achievements } from "@/components/site/Achievements";
import { Vision } from "@/components/site/Vision";
import { CTA } from "@/components/site/CTA";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    document.title = "White Cane AI Consulting — Clarity in the era of AI";
    const desc = "Independent AI consulting. We help businesses select, integrate and operationalize the right AI tools — strategy, tooling, workflows and governance.";
    let m = document.querySelector('meta[name="description"]');
    if (!m) { m = document.createElement('meta'); m.setAttribute('name', 'description'); document.head.appendChild(m); }
    m.setAttribute('content', desc);
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Nav />
      <Hero />
      <Who />
      <Offer />
      <Achievements />
      <Vision />
      <CTA />
    </main>
  );
};

export default Index;
