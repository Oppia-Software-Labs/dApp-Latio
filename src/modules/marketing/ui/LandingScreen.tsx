import { Hero } from "./sections/Hero";
import { LogoCloud } from "./sections/LogoCloud";
import { Features } from "./sections/Features";
import { Pricing } from "./sections/Pricing";
import { FAQ } from "./sections/FAQ";
import { Testimonials } from "./sections/Testimonials";
import { CTABanner } from "./sections/CTABanner";
import { Footer } from "./sections/Footer";

export function LandingScreen() {
  return (
    <main className="">
      <Hero />
      <LogoCloud />
      <Features />
      <Pricing />
      <FAQ />
      <Testimonials />
      <CTABanner />
      <Footer />
    </main>
  );
}
