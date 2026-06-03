"use client";

import { useCallback, useEffect } from "react";
import Media from "@/components/Media";
import type { GalleryItem } from "@/data/villa";

type Props = {
  items: GalleryItem[];
  index: number;
  onClose: () => void;
  onIndexChange: (i: number) => void;
};

/**
 * Lightbox plein écran, légère et sans dépendance externe.
 * Échap pour fermer, flèches ← → pour naviguer, fermeture au clic sur le fond.
 */
export default function Lightbox({ items, index, onClose, onIndexChange }: Props) {
  const count = items.length;

  const prev = useCallback(
    () => onIndexChange((index - 1 + count) % count),
    [index, count, onIndexChange],
  );
  const next = useCallback(
    () => onIndexChange((index + 1) % count),
    [index, count, onIndexChange],
  );

  // Clavier : Échap / flèches
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, prev, next]);

  // Verrouille le scroll de la page tant que la lightbox est ouverte
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  const current = items[index];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Galerie photo"
      onClick={onClose}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-anthracite/90 backdrop-blur-sm [animation:retsinaFade_0.25s_ease-out]"
    >
      {/* Fermer */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Fermer"
        className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full text-white/80 transition hover:bg-white/10 hover:text-white"
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
        </svg>
      </button>

      {/* Précédent */}
      {count > 1 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            prev();
          }}
          aria-label="Photo précédente"
          className="absolute left-2 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full text-white/80 transition hover:bg-white/10 hover:text-white sm:left-5"
        >
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
            <path d="M15 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}

      {/* Suivant */}
      {count > 1 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            next();
          }}
          aria-label="Photo suivante"
          className="absolute right-2 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full text-white/80 transition hover:bg-white/10 hover:text-white sm:right-5"
        >
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
            <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}

      {/* Image (le clic dessus ne ferme pas) */}
      <figure
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[88vh] w-[92vw] max-w-5xl flex-col items-center gap-4"
      >
        <Media
          src={current.src}
          alt={current.alt}
          tone={current.tone}
          className="aspect-[4/3] max-h-[78vh] w-full rounded-xl"
          imgClassName="object-contain"
          sizes="92vw"
        />
        <figcaption className="flex items-center gap-3 text-sm text-white/75">
          <span>{current.alt}</span>
          {count > 1 && (
            <span className="text-white/45">
              {index + 1} / {count}
            </span>
          )}
        </figcaption>
      </figure>
    </div>
  );
}
