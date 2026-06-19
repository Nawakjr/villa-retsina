import type { Locale } from "./config";
import { getDictionary } from ".";
import {
  villa,
  heroSlides,
  levels as levelsData,
  gallery as galleryData,
  surroundings as surroundingsData,
  kamilari as kamilariData,
} from "@/data/villa";

/**
 * Compose le contenu affichable d'une locale : fusionne les données
 * STRUCTURELLES (images, icônes, coordonnées, ids — dans data/villa.ts) avec
 * les TEXTES traduits (dictionnaires i18n). Les composants reçoivent des objets
 * prêts à l'emploi, identiques quelle que soit la langue.
 */
export function getContent(locale: Locale) {
  const d = getDictionary(locale);
  const galleryAlts = d.gallery.alts as Record<string, string>;
  const surroundingAlts = d.kamilari.alts as Record<string, string>;

  return {
    locale,
    villaName: villa.name,

    nav: [
      { label: d.nav.home, href: "#accueil" },
      { label: d.nav.villa, href: "#la-villa" },
      { label: d.nav.kamilari, href: "#kamilari" },
      { label: d.nav.pricing, href: "#tarifs" },
      { label: d.nav.availability, href: "#disponibilites" },
      { label: d.nav.contact, href: "#contact" },
    ],
    navMenu: {
      openMenu: d.nav.openMenu,
      closeMenu: d.nav.closeMenu,
      language: d.nav.language,
    },

    hero: {
      name: villa.name,
      tagline: d.hero.tagline,
      ctaDiscover: d.hero.ctaDiscover,
      ctaAvailability: d.hero.ctaAvailability,
      slides: heroSlides.map((s, i) => ({
        id: s.id,
        src: s.src,
        tone: s.tone,
        alt: d.hero.slidesAlt[i] ?? "",
      })),
    },

    intro: d.intro,

    levels: levelsData.map((lvl, i) => ({
      id: lvl.id,
      src: lvl.src,
      eyebrow: d.levels[i].eyebrow,
      title: d.levels[i].title,
      description: d.levels[i].description,
      alt: d.levels[i].alt,
      features: lvl.features.map((f, j) => ({
        icon: f.icon,
        label: d.levels[i].features[j] ?? f.label,
      })),
    })),

    gallery: {
      heading: d.gallery.heading,
      items: galleryData.map((g) => ({
        id: g.id,
        src: g.src,
        tone: g.tone,
        alt: galleryAlts[g.id] ?? g.alt,
      })),
    },

    kamilari: {
      title: d.kamilari.title,
      paragraphs: d.kamilari.paragraphs,
      alt: d.kamilari.alt,
      src: kamilariData.src,
      galleryHeading: d.kamilari.galleryHeading,
      gallerySubtitle: d.kamilari.gallerySubtitle,
      highlights: kamilariData.highlights.map((h, i) => ({
        icon: h.icon,
        title: d.kamilari.highlights[i].title,
        detail: d.kamilari.highlights[i].detail,
      })),
      surroundings: surroundingsData.map((s) => ({
        id: s.id,
        src: s.src,
        tone: s.tone,
        alt: surroundingAlts[s.id] ?? s.alt,
      })),
    },

    pricing: d.pricing,

    availability: d.availability,

    access: {
      heading: d.access.heading,
      intro: d.access.intro,
      waze: d.access.waze,
      gmaps: d.access.gmaps,
      coords: { lat: villa.location.lat, lng: villa.location.lng },
    },

    contact: d.contact,
    footer: d.footer,
    meta: d.meta,
    legal: d.legal,
    lightbox: d.lightbox,
  };
}

export type Content = ReturnType<typeof getContent>;
