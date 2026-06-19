export const locales = ["fr", "en", "de", "es", "it"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "fr";

/** Langues affichées dans le sélecteur. */
export const localeNames: Record<Locale, string> = {
  fr: "Français",
  en: "English",
  de: "Deutsch",
  es: "Español",
  it: "Italiano",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Code BCP-47 pour l'attribut lang / og:locale. */
export const htmlLang: Record<Locale, string> = {
  fr: "fr-FR",
  en: "en",
  de: "de-DE",
  es: "es-ES",
  it: "it-IT",
};

/** Préfixe d'URL d'une locale ("" pour la langue par défaut). */
export function localePath(locale: Locale): string {
  return locale === defaultLocale ? "" : `/${locale}`;
}
