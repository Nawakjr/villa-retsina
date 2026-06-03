/**
 * Tarifs de location.
 * Trois formules : rez-de-chaussée seul, étage seul, ou maison entière.
 */

export type PriceRow = {
  season: string;
  period: string;
  /** Tarif du rez-de-chaussée seul. */
  priceRdc: string;
  /** Tarif de l'étage / appartement indépendant seul. */
  priceEtage: string;
  /** Tarif de la maison entière (deux niveaux). */
  priceFull: string;
};

export const pricing: PriceRow[] = [
  {
    season: "Basse et moyenne saison",
    period: "Novembre – Mai",
    priceRdc: "75 € / nuit",
    priceEtage: "55 € / nuit",
    priceFull: "110 € / nuit",
  },
  {
    season: "Moyenne et haute saison",
    period: "Juin – Octobre",
    priceRdc: "90 € / nuit",
    priceEtage: "70 € / nuit",
    priceFull: "130 € / nuit",
  },
];

export const pricingMeta = {
  colRdc: "Rez-de-chaussée",
  colEtage: "Étage",
  colFull: "Maison entière — 2 niveaux",
  note: "Séjour minimum : 5 nuits en basse et moyenne saison, 7 nuits en haute saison.",
};
