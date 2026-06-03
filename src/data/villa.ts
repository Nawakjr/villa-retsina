/**
 * Données éditoriales de la Villa Retsina.
 * Tout le contenu textuel du site vit ici pour rester facile à maintenir.
 *
 * ──────────────────────────────────────────────────────────────────────────
 *  📷  INTÉGRATION DES VRAIES PHOTOS
 * ──────────────────────────────────────────────────────────────────────────
 *  1. Déposer les fichiers dans :  public/assets/villa-retsina/
 *     (nomenclature et dimensions recommandées : voir le README de ce dossier)
 *  2. Pour activer une photo, renseigner son champ `src` ci-dessous avec le
 *     chemin public (qui commence à /assets/...). Exemple :
 *
 *        src: "/assets/villa-retsina/hero-terrasse.jpg",
 *
 *  Tant qu'un `src` reste absent (undefined), le composant <Media> affiche un
 *  placeholder dégradé — le site fonctionne donc sans aucune photo.
 *
 *  Fichiers attendus (à déposer dans public/assets/villa-retsina/) :
 *    • hero-terrasse.jpg        → hero, slide 1
 *    • hero-vue.jpg             → hero, slide 2
 *    • jardin.jpg               → hero, slide 3 + galerie
 *    • rdc-salon.jpg            → section Rez-de-chaussée + galerie
 *    • rdc-chambre-1.jpg        → galerie
 *    • rdc-chambre-2.jpg        → galerie
 *    • etage-salon.jpg          → section Étage + galerie
 *    • etage-chambre.jpg        → galerie (optionnel)
 *    • terrasse-principale.jpg  → galerie
 *    • terrasse-etage.jpg       → galerie (optionnel)
 *    • kamilari-village.jpg     → section Kamilari
 * ──────────────────────────────────────────────────────────────────────────
 */

export type IconName =
  | "bed"
  | "kitchen"
  | "fireplace"
  | "bath"
  | "terrace"
  | "laundry"
  | "garden"
  | "house"
  | "beach"
  | "taverna"
  | "ruins"
  | "plane";

export type Feature = {
  icon: IconName;
  label: string;
};

export type Level = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  features: Feature[];
  /** Photo principale du niveau (placeholder dégradé si absent). */
  src?: string;
  alt: string;
};

export type GalleryItem = {
  id: string;
  alt: string;
  /** Photo de la galerie (placeholder dégradé si absent). */
  src?: string;
  /** teinte du placeholder (variété visuelle) */
  tone: "mer" | "olive" | "sable" | "bois" | "anthracite";
};

export type HeroSlide = {
  id: string;
  alt: string;
  /** Visuel plein écran du hero (placeholder dégradé si absent). */
  src?: string;
  tone: "mer" | "olive" | "sable" | "bois" | "anthracite";
};

export const villa = {
  name: "Villa Retsina",
  tagline: "Maison avec vue panoramique à Kamilari, Crète Sud",
  intro:
    "Une maison familiale sur deux niveaux, ouverte sur les montagnes, la mer au loin et la douceur crétoise.",
  location: {
    village: "Kamilari",
    region: "Crète du Sud",
    lat: 35.03632,
    lng: 24.78842,
  },
  contact: {
    email: "contact@villa-retsina.com",
    phone: "+33 6 12 34 56 78",
    phoneHref: "tel:+33612345678",
  },
} as const;

export const nav = [
  { label: "Accueil", href: "#accueil" },
  { label: "La villa", href: "#la-villa" },
  { label: "Kamilari", href: "#kamilari" },
  { label: "Tarifs", href: "#tarifs" },
  { label: "Disponibilités", href: "#disponibilites" },
  { label: "Contact", href: "#contact" },
] as const;

// ── HERO (slider plein écran) ──────────────────────────────────────────────
export const heroSlides: HeroSlide[] = [
  {
    id: "terrasse",
    alt: "Terrasse couverte avec vue panoramique sur les montagnes",
    tone: "mer",
    src: "/assets/villa-retsina/hero-terrasse.jpg",
  },
  {
    id: "vue",
    alt: "Vue panoramique depuis la villa",
    tone: "sable",
    src: "/assets/villa-retsina/hero-vue.jpg",
  },
  {
    id: "jardin",
    alt: "Jardin méditerranéen au coucher du soleil",
    tone: "olive",
    src: "/assets/villa-retsina/jardin.jpg",
  },
];

// ── NIVEAUX (rez-de-chaussée & étage) ──────────────────────────────────────
export const levels: Level[] = [
  {
    id: "rez-de-chaussee",
    eyebrow: "Niveau principal",
    title: "Rez-de-chaussée",
    description:
      "Le cœur de la maison : des espaces de vie ouverts, une cheminée pour les soirées plus fraîches et de larges terrasses tournées vers le paysage.",
    alt: "Salon avec cheminée au rez-de-chaussée",
    src: "/assets/villa-retsina/rdc-salon.jpg",
    features: [
      { icon: "bed", label: "2 chambres" },
      { icon: "kitchen", label: "Salon / cuisine" },
      { icon: "fireplace", label: "Cheminée" },
      { icon: "bath", label: "1 salle de bain" },
      { icon: "terrace", label: "2 terrasses" },
      { icon: "laundry", label: "Buanderie" },
      { icon: "garden", label: "Jardin" },
    ],
  },
  {
    id: "etage",
    eyebrow: "Appartement indépendant",
    title: "Étage – Appartement indépendant",
    description:
      "Un appartement autonome à l'étage, idéal pour une seconde famille ou pour davantage d'intimité, avec son propre accès et ses terrasses.",
    alt: "Pièce principale lumineuse de l'appartement à l'étage",
    src: "/assets/villa-retsina/etage-salon.jpg",
    features: [
      { icon: "kitchen", label: "Pièce principale salon / cuisine" },
      { icon: "bed", label: "1 chambre" },
      { icon: "bath", label: "1 salle de bain" },
      { icon: "terrace", label: "2 terrasses" },
    ],
  },
];

// ── GALERIE ────────────────────────────────────────────────────────────────
export const gallery: GalleryItem[] = [
  // — Extérieur, terrasses & vues —
  {
    id: "g-terrasse-principale",
    alt: "Vue panoramique depuis la terrasse principale",
    tone: "mer",
    src: "/assets/villa-retsina/terrasse-principale.jpg",
  },
  {
    id: "g-terrasse-ext",
    alt: "Terrasse extérieure ouverte sur le paysage",
    tone: "mer",
    src: "/assets/villa-retsina/vue-terrasse-ext.jpg",
  },
  {
    id: "g-terrasse-rdc-nuit",
    alt: "Terrasse du rez-de-chaussée à la tombée de la nuit",
    tone: "anthracite",
    src: "/assets/villa-retsina/vue-terrasse-rdc-nuit.jpg",
  },
  {
    id: "g-terrasse-ouzo",
    alt: "Coin terrasse au rez-de-chaussée",
    tone: "sable",
    src: "/assets/villa-retsina/vue-terrasse-ouzo-rdc.jpg",
  },
  {
    id: "g-jardin",
    alt: "Jardin méditerranéen et transats",
    tone: "olive",
    src: "/assets/villa-retsina/jardin.jpg",
  },
  {
    id: "g-arriere",
    alt: "Arrière de la maison et accès parking",
    tone: "olive",
    src: "/assets/villa-retsina/vue-derriere-maison-acces-parking.jpg",
  },
  // — Rez-de-chaussée —
  {
    id: "g-rdc-salon",
    alt: "Salon chaleureux avec cheminée",
    tone: "sable",
    src: "/assets/villa-retsina/rdc-salon.jpg",
  },
  {
    id: "g-rdc-cheminee",
    alt: "Cheminée du séjour",
    tone: "bois",
    src: "/assets/villa-retsina/rdc-cheminee.jpg",
  },
  {
    id: "g-rdc-chambre-1",
    alt: "Première chambre du rez-de-chaussée",
    tone: "bois",
    src: "/assets/villa-retsina/rdc-chambre-1.jpg",
  },
  {
    id: "g-rdc-chambre-2",
    alt: "Seconde chambre du rez-de-chaussée",
    tone: "sable",
    src: "/assets/villa-retsina/rdc-chambre-2.jpg",
  },
  {
    id: "g-rdc-chambre-vue",
    alt: "Vue depuis une chambre du rez-de-chaussée",
    tone: "mer",
    src: "/assets/villa-retsina/vue-chambre-rdc.jpg",
  },
  {
    id: "g-rdc-sdb",
    alt: "Salle de bain du rez-de-chaussée",
    tone: "sable",
    src: "/assets/villa-retsina/salle-de-bain-rdc.jpg",
  },
  // — Étage / appartement indépendant —
  {
    id: "g-etage-salon",
    alt: "Cuisine ouverte sur le séjour de l'étage",
    tone: "olive",
    src: "/assets/villa-retsina/etage-salon.jpg",
  },
  {
    id: "g-etage-chambre",
    alt: "Chambre de l'appartement à l'étage",
    tone: "bois",
    src: "/assets/villa-retsina/etage-chambre.jpg",
  },
  {
    id: "g-etage-sdb",
    alt: "Salle de bain de l'étage",
    tone: "sable",
    src: "/assets/villa-retsina/salle-de-bain-etage.jpg",
  },
  {
    id: "g-etage-vue",
    alt: "Vue depuis l'étage",
    tone: "mer",
    src: "/assets/villa-retsina/vue-etage.jpg",
  },
  {
    id: "g-terrasse-etage",
    alt: "Terrasse de l'étage",
    tone: "mer",
    src: "/assets/villa-retsina/terrasse-etage.jpg",
  },
  {
    id: "g-terrasse-etage-1",
    alt: "Terrasse de l'étage, vue panoramique",
    tone: "mer",
    src: "/assets/villa-retsina/vue-terrasse-1-etage.jpg",
  },
  {
    id: "g-terrasse-etage-1b",
    alt: "Terrasse de l'étage, autre perspective",
    tone: "mer",
    src: "/assets/villa-retsina/vue-terrasse-1b-etage.jpg",
  },
  {
    id: "g-acces-etage",
    alt: "Accès indépendant à l'appartement de l'étage",
    tone: "olive",
    src: "/assets/villa-retsina/acces-etage.jpg",
  },
  {
    id: "g-acces-etage-b",
    alt: "Escalier d'accès à l'étage",
    tone: "olive",
    src: "/assets/villa-retsina/acces-etage-b.jpg",
  },
  // — Vues extérieures de la maison —
  { id: "g-ext-1", alt: "Vue extérieure de la villa", tone: "mer", src: "/assets/villa-retsina/kamilari-001.jpg" },
  { id: "g-ext-2", alt: "Façade de la villa", tone: "sable", src: "/assets/villa-retsina/kamilari-002.jpg" },
  { id: "g-ext-3", alt: "La villa et son environnement", tone: "olive", src: "/assets/villa-retsina/kamilari-003.jpg" },
  { id: "g-ext-4", alt: "Extérieur de la villa", tone: "sable", src: "/assets/villa-retsina/kamilari-004.jpg" },
  { id: "g-ext-5", alt: "La villa dans son cadre crétois", tone: "olive", src: "/assets/villa-retsina/kamilari-005.jpg" },
  { id: "g-ext-6", alt: "Vue extérieure de la maison", tone: "bois", src: "/assets/villa-retsina/kamilari-006.jpg" },
  { id: "g-ext-7", alt: "Abords de la villa", tone: "olive", src: "/assets/villa-retsina/kamilari-007.jpg" },
  { id: "g-ext-8", alt: "La villa vue de l'extérieur", tone: "mer", src: "/assets/villa-retsina/kamilari-008.jpg" },
];

// ── ALENTOURS (galerie de la section Kamilari) ──────────────────────────────
export const surroundings: GalleryItem[] = [
  { id: "s-place", alt: "Place du village de Kamilari", tone: "sable", src: "/assets/villa-retsina/kamilari-place-acropolis.jpg" },
  { id: "s-fete", alt: "Fête traditionnelle au village", tone: "bois", src: "/assets/villa-retsina/fete-village-kamilari.jpg" },
  { id: "s-plage-kalamaki", alt: "Plage de Kalamaki", tone: "mer", src: "/assets/villa-retsina/plage-kalamaki.jpg" },
  { id: "s-plage-kalamaki-2", alt: "Plage de Kalamaki, rivage crétois", tone: "mer", src: "/assets/villa-retsina/plage-kalamaki-2.jpg" },
  { id: "s-plage-lentas", alt: "Plage de Lentas", tone: "mer", src: "/assets/villa-retsina/plage-lentas.jpg" },
  { id: "s-plage-triopetra", alt: "Plage de Triopetra", tone: "mer", src: "/assets/villa-retsina/plage-triopetra.jpg" },
  { id: "s-faestos", alt: "Site archéologique de Phaistos", tone: "bois", src: "/assets/villa-retsina/faestos.jpg" },
];

export type KamilariHighlight = {
  icon: IconName;
  title: string;
  detail: string;
};

// ── KAMILARI / ALENTOURS ────────────────────────────────────────────────────
export const kamilari = {
  title: "Kamilari, un village crétois authentique",
  paragraphs: [
    "Charmant village du sud de la Crète, Kamilari offre calme et authenticité.",
    "Tavernes conviviales, marchés locaux, plages à proximité et sites antiques à quelques minutes.",
    "L'endroit idéal pour se ressourcer en famille ou entre amis.",
  ],
  highlights: [
    { icon: "beach", title: "Plages", detail: "à 10–15 min" },
    { icon: "taverna", title: "Tavernes", detail: "à pied" },
    { icon: "ruins", title: "Sites antiques", detail: "à proximité" },
    { icon: "plane", title: "Aéroport", detail: "à 1 h" },
  ] as KamilariHighlight[],
  alt: "Paysage de Kamilari : oliveraies descendant vers la mer",
  // Photo de la section (placeholder dégradé si absent) :
  src: "/assets/villa-retsina/kamilari-village.jpg" as string | undefined,
};
