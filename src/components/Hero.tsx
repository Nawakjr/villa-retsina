"use client";

import { useEffect, useState } from "react";
import Media from "@/components/Media";
import { heroSlides, villa } from "@/data/villa";

export default function Hero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = window.setInterval(
      () => setActive((i) => (i + 1) % heroSlides.length),
      6000,
    );
    return () => window.clearInterval(id);
  }, []);

  return (
    <section id="accueil" className="relative h-[100svh] min-h-[600px] w-full overflow-hidden">
      {/* Slides */}
      {heroSlides.map((slide, i) => (
        <div
          key={slide.id}
          className={[
            "absolute inset-0 transition-opacity duration-1000 ease-out motion-reduce:transition-none",
            i === active ? "opacity-100" : "opacity-0",
          ].join(" ")}
          aria-hidden={i !== active}
        >
          <Media
            src={slide.src}
            alt={slide.alt}
            tone={slide.tone}
            className="h-full w-full"
            priority={i === 0}
            sizes="100vw"
          />
        </div>
      ))}

      {/* Voile pour la lisibilité */}
      <div className="absolute inset-0 bg-gradient-to-b from-anthracite/50 via-anthracite/20 to-anthracite/55" />

      {/* Contenu */}
      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-center px-6 text-white">
        <h1 className="max-w-3xl font-serif text-5xl leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
          {villa.name}
        </h1>
        <p className="mt-5 max-w-xl text-lg font-light text-white/90 sm:text-xl">
          {villa.tagline}
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a
            href="#la-villa"
            className="inline-flex items-center justify-center rounded-full bg-olive px-7 py-3.5 text-sm font-medium uppercase tracking-[0.14em] text-white shadow-lg shadow-anthracite/20 transition hover:bg-olive-deep"
          >
            Découvrir la villa
          </a>
          <a
            href="#disponibilites"
            className="inline-flex items-center justify-center rounded-full border border-white/70 px-7 py-3.5 text-sm font-medium uppercase tracking-[0.14em] text-white backdrop-blur-sm transition hover:bg-white/10"
          >
            Demander les disponibilités
          </a>
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-2.5">
        {heroSlides.map((slide, i) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Voir le visuel ${i + 1}`}
            aria-current={i === active}
            className={[
              "h-2.5 rounded-full transition-all duration-300",
              i === active ? "w-7 bg-white" : "w-2.5 bg-white/50 hover:bg-white/80",
            ].join(" ")}
          />
        ))}
      </div>
    </section>
  );
}
