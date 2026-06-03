"use client";

import { useState } from "react";
import Media from "@/components/Media";
import RevealOnView from "@/components/RevealOnView";
import Lightbox from "@/components/Lightbox";
import type { GalleryItem } from "@/data/villa";

/**
 * Grille de photos cliquables + lightbox. Réutilisée par la Galerie de la villa
 * et par la galerie « alentours » de la section Kamilari.
 */
export default function PhotoGrid({
  items,
  gridClassName = "grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3",
  firstWide = false,
}: {
  items: GalleryItem[];
  gridClassName?: string;
  /** Première vignette sur 2 colonnes en mobile (mise en avant). */
  firstWide?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const openAt = (i: number) => {
    setIndex(i);
    setOpen(true);
  };

  return (
    <>
      <div className={gridClassName}>
        {items.map((item, i) => (
          <RevealOnView
            key={item.id}
            delayMs={(i % 3) * 100}
            className={firstWide && i === 0 ? "col-span-2 md:col-span-1" : ""}
          >
            <button
              type="button"
              onClick={() => openAt(i)}
              aria-label={`Agrandir : ${item.alt}`}
              className="group block w-full cursor-pointer overflow-hidden rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-olive focus-visible:ring-offset-2"
            >
              <Media
                src={item.src}
                alt={item.alt}
                tone={item.tone}
                className="aspect-[4/3] w-full"
                imgClassName="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </button>
          </RevealOnView>
        ))}
      </div>

      {open && (
        <Lightbox
          items={items}
          index={index}
          onClose={() => setOpen(false)}
          onIndexChange={setIndex}
        />
      )}
    </>
  );
}
