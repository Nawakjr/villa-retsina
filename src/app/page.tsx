import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import LevelsSection from "@/components/LevelsSection";
import Gallery from "@/components/Gallery";
import KamilariSection from "@/components/KamilariSection";
import PricingSection from "@/components/PricingSection";
import AvailabilitySection from "@/components/AvailabilitySection";
import AccessSection from "@/components/AccessSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { getAvailability, getPricing } from "@/lib/store";

// ISR : la page reste prérendue (rapide) et se rafraîchit après une
// modification dans l'admin (revalidatePath) ou au plus tard toutes les 5 min.
export const revalidate = 300;

export default async function Home() {
  const [availability, pricing] = await Promise.all([
    getAvailability(),
    getPricing(),
  ]);

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Intro />
      <LevelsSection />
      <Gallery />
      <KamilariSection />

      {/* Tarifs & Disponibilités */}
      <section className="bg-sable">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 sm:py-24 lg:grid-cols-2 lg:gap-16">
          <PricingSection rows={pricing.rows} note={pricing.note} />
          <AvailabilitySection availability={availability.dates} />
        </div>
      </section>

      <AccessSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
