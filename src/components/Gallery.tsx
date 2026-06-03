import PhotoGrid from "@/components/PhotoGrid";
import { gallery } from "@/data/villa";

export default function Gallery() {
  return (
    <section id="galerie" className="scroll-mt-20 bg-sable">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <div className="mb-12 text-center">
          <h2 className="font-serif text-4xl text-anthracite sm:text-5xl">Galerie</h2>
          <span className="rule-deco mt-5" />
        </div>

        <PhotoGrid items={gallery} firstWide />
      </div>
    </section>
  );
}
