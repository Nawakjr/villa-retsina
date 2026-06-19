import type { Metadata } from "next";
import { locales, localePath, type Locale } from "./config";
import { getDictionary } from ".";

const OG_LOCALE: Record<Locale, string> = {
  fr: "fr_FR",
  en: "en_US",
  de: "de_DE",
  es: "es_ES",
  it: "it_IT",
  el: "el_GR",
};

/** Construit les alternates hreflang pour toutes les langues. */
function languageAlternates(suffix: string): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const l of locales) {
    languages[l] = `${localePath(l)}${suffix}` || "/";
  }
  languages["x-default"] = suffix || "/";
  return languages;
}

export function buildHomeMetadata(locale: Locale): Metadata {
  const d = getDictionary(locale);
  const path = localePath(locale) || "/";
  return {
    title: d.meta.title,
    description: d.meta.description,
    alternates: { canonical: path, languages: languageAlternates("") },
    openGraph: {
      title: d.meta.title,
      description: d.meta.description,
      url: path,
      type: "website",
      locale: OG_LOCALE[locale],
    },
    twitter: { title: d.meta.title, description: d.meta.description },
  };
}

export function buildLegalMetadata(locale: Locale): Metadata {
  const d = getDictionary(locale);
  const path = `${localePath(locale)}/mentions-legales`;
  return {
    title: d.legal.title,
    alternates: {
      canonical: path,
      languages: languageAlternates("/mentions-legales"),
    },
    robots: { index: false, follow: true },
  };
}
