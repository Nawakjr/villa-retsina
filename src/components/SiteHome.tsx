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
import { getContent } from "@/i18n/content";
import { htmlLang, type Locale } from "@/i18n/config";
import { getAvailability, getPricing } from "@/lib/store";

export default async function SiteHome({ locale }: { locale: Locale }) {
  const c = getContent(locale);
  const [availability, pricing] = await Promise.all([
    getAvailability(),
    getPricing(),
  ]);

  return (
    <main lang={htmlLang[locale]} className="min-h-screen bg-white">
      <Navbar
        locale={locale}
        villaName={c.villaName}
        nav={c.nav}
        labels={c.navMenu}
      />
      <Hero hero={c.hero} />
      <Intro intro={c.intro} />
      <LevelsSection levels={c.levels} />
      <Gallery gallery={c.gallery} lightbox={c.lightbox} />
      <KamilariSection kamilari={c.kamilari} lightbox={c.lightbox} />

      {/* Tarifs & Disponibilités */}
      <section className="bg-sable">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 sm:py-24 lg:grid-cols-2 lg:gap-16">
          <PricingSection labels={c.pricing} rows={pricing.rows} note={pricing.note} />
          <AvailabilitySection labels={c.availability} availability={availability.dates} />
        </div>
      </section>

      <AccessSection access={c.access} />
      <ContactSection contact={c.contact} />
      <Footer locale={locale} villaName={c.villaName} footer={c.footer} />
    </main>
  );
}
