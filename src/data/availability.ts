/**
 * Disponibilités — calendrier en LECTURE SEULE.
 * Aucune réservation en ligne : ces données servent uniquement à afficher
 * l'état indicatif des dates. Mise à jour manuelle.
 *
 * Clé : date ISO "YYYY-MM-DD". Toute date absente est considérée "disponible".
 */

export type DayStatus = "disponible" | "reserve" | "confirmer";

export const statusLabels: Record<DayStatus, string> = {
  disponible: "Disponible",
  reserve: "Réservé",
  confirmer: "À confirmer",
};

/** Couleurs (classes Tailwind) associées à chaque statut. */
export const statusStyles: Record<DayStatus, string> = {
  disponible: "bg-olive/15 text-anthracite",
  reserve: "bg-bois/25 text-bois",
  confirmer: "bg-amber-200/60 text-amber-900",
};

export const statusDot: Record<DayStatus, string> = {
  disponible: "bg-olive",
  reserve: "bg-bois",
  confirmer: "bg-amber-400",
};

/** Premier mois affiché par défaut (année, mois index 0-based). */
export const defaultMonth = { year: 2026, month: 5 }; // Juin 2026

/** Statuts indicatifs des dates (exemple mocké). */
export const availability: Record<string, DayStatus> = {
  // Juin 2026
  "2026-06-07": "reserve",
  "2026-06-08": "reserve",
  "2026-06-09": "reserve",
  "2026-06-10": "confirmer",
  "2026-06-11": "confirmer",
  "2026-06-12": "confirmer",
  "2026-06-21": "reserve",
  "2026-06-22": "reserve",
  // Juillet 2026
  "2026-07-04": "reserve",
  "2026-07-05": "reserve",
  "2026-07-06": "reserve",
  "2026-07-07": "reserve",
  "2026-07-18": "confirmer",
  "2026-07-19": "confirmer",
  "2026-07-25": "reserve",
  "2026-07-26": "reserve",
  "2026-07-27": "reserve",
};

export const availabilityNote =
  "Calendrier à titre indicatif uniquement — contactez-nous pour confirmer une période.";
