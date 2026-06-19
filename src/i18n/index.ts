import type { Locale } from "./config";
import { fr, type Dictionary } from "./dictionaries/fr";
import { en } from "./dictionaries/en";
import { de } from "./dictionaries/de";
import { es } from "./dictionaries/es";
import { it } from "./dictionaries/it";
import { el } from "./dictionaries/el";

const dictionaries: Record<Locale, Dictionary> = { fr, en, de, es, it, el };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary };
