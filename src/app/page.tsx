import HeroSection         from "@/components/sections/HeroSection";
import TradeCalculator     from "@/components/sections/TradeCalculator";
import StatsSection        from "@/components/sections/StatsSection";
import ProductsShowcase    from "@/components/sections/ProductsShowcase";
import WhatWeOffer         from "@/components/sections/WhatWeOffer";
import GlobalPresence      from "@/components/sections/GlobalPresence";
import Testimonials        from "@/components/sections/Testimonials";
import ContactFormSection  from "@/components/sections/ContactFormSection";
import CTASection          from "@/components/sections/CTASection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TradeCalculator />
      <StatsSection />
      <ProductsShowcase />
      <WhatWeOffer />
      <GlobalPresence />
      <Testimonials />
      <ContactFormSection />
      <CTASection />
    </>
  );
}