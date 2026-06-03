import Media from "@/components/Media";
import Icon from "@/components/Icons";
import RevealOnView from "@/components/RevealOnView";
import PhotoGrid from "@/components/PhotoGrid";
import { kamilari, surroundings } from "@/data/villa";

export default function KamilariSection() {
  return (
    <section id="kamilari" className="scroll-mt-20 bg-white">
      <div className="grid items-center gap-0 md:grid-cols-2">
        {/* Image pleine hauteur */}
        <Media
          src={kamilari.src}
          alt={kamilari.alt}
          tone="olive"
          className="h-72 w-full md:h-[34rem]"
          sizes="(max-width: 768px) 100vw, 50vw"
        />

        {/* Texte */}
        <RevealOnView className="px-6 py-16 md:px-14 lg:px-20">
          <h2 className="font-serif text-3xl text-anthracite sm:text-4xl">
            {kamilari.title}
          </h2>
          <div className="mt-5 space-y-2 text-[15px] leading-relaxed text-anthracite/70">
            {kamilari.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <ul className="mt-9 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {kamilari.highlights.map((h) => (
              <li key={h.title} className="flex flex-col items-start gap-2">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-sable text-olive-deep">
                  <Icon name={h.icon} className="h-5 w-5" />
                </span>
                <span className="text-sm font-medium text-anthracite">{h.title}</span>
                <span className="-mt-1.5 text-[13px] text-anthracite/60">{h.detail}</span>
              </li>
            ))}
          </ul>
        </RevealOnView>
      </div>

      {/* Galerie « alentours » */}
      <div className="mx-auto max-w-6xl px-6 pb-20 pt-16 sm:pb-24">
        <div className="mb-10 text-center">
          <h3 className="font-serif text-3xl text-anthracite sm:text-4xl">
            Kamilari &amp; alentours
          </h3>
          <span className="rule-deco mt-5" />
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-anthracite/60">
            Le village, ses fêtes, les plages du sud de la Crète et les sites
            antiques à quelques minutes.
          </p>
        </div>

        <PhotoGrid
          items={surroundings}
          gridClassName="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4"
        />
      </div>
    </section>
  );
}
