/**
 * Dictionnaire FRANÇAIS — référence. Sa structure (`typeof fr`) définit le type
 * `Dictionary` que toutes les autres langues doivent respecter.
 * Ne contient QUE du texte ; les images/icônes/coordonnées restent dans data/.
 */
export const fr = {
  langName: "Français",

  nav: {
    home: "Accueil",
    villa: "La villa",
    kamilari: "Kamilari",
    pricing: "Tarifs",
    availability: "Disponibilités",
    contact: "Contact",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    language: "Changer de langue",
  },

  lightbox: {
    label: "Galerie photo",
    close: "Fermer",
    prev: "Photo précédente",
    next: "Photo suivante",
    zoom: "Agrandir",
  },

  hero: {
    tagline: "Maison avec vue panoramique à Kamilari, Crète Sud",
    ctaDiscover: "Découvrir la villa",
    ctaAvailability: "Demander les disponibilités",
    slidesAlt: [
      "Terrasse couverte avec vue panoramique sur les montagnes",
      "Vue panoramique depuis la villa",
      "Jardin méditerranéen au coucher du soleil",
    ],
  },

  intro:
    "Une maison familiale sur deux niveaux, ouverte sur les montagnes, la mer au loin et la douceur crétoise.",

  levels: [
    {
      eyebrow: "Niveau principal",
      title: "Rez-de-chaussée",
      description:
        "Le cœur de la maison : des espaces de vie ouverts, une cheminée pour les soirées plus fraîches et de larges terrasses tournées vers le paysage.",
      alt: "Salon avec cheminée au rez-de-chaussée",
      features: [
        "2 chambres",
        "Salon / cuisine",
        "Cheminée",
        "1 salle de bain",
        "2 terrasses",
        "Buanderie",
        "Jardin",
      ],
    },
    {
      eyebrow: "Appartement indépendant",
      title: "Étage – Appartement indépendant",
      description:
        "Un appartement autonome à l'étage, idéal pour une seconde famille ou pour davantage d'intimité, avec son propre accès et ses terrasses.",
      alt: "Pièce principale lumineuse de l'appartement à l'étage",
      features: [
        "Pièce principale salon / cuisine",
        "1 chambre",
        "1 salle de bain",
        "2 terrasses",
      ],
    },
  ],

  gallery: {
    heading: "Galerie",
    alts: {
      "g-terrasse-principale": "Vue panoramique depuis la terrasse principale",
      "g-terrasse-ext": "Terrasse extérieure ouverte sur le paysage",
      "g-terrasse-rdc-nuit": "Terrasse du rez-de-chaussée à la tombée de la nuit",
      "g-terrasse-ouzo": "Coin terrasse au rez-de-chaussée",
      "g-jardin": "Jardin méditerranéen et transats",
      "g-arriere": "Arrière de la maison et accès parking",
      "g-rdc-salon": "Salon chaleureux avec cheminée",
      "g-rdc-cheminee": "Cheminée du séjour",
      "g-rdc-chambre-1": "Première chambre du rez-de-chaussée",
      "g-rdc-chambre-2": "Seconde chambre du rez-de-chaussée",
      "g-rdc-chambre-vue": "Vue depuis une chambre du rez-de-chaussée",
      "g-rdc-sdb": "Salle de bain du rez-de-chaussée",
      "g-etage-salon": "Cuisine ouverte sur le séjour de l'étage",
      "g-etage-chambre": "Chambre de l'appartement à l'étage",
      "g-etage-sdb": "Salle de bain de l'étage",
      "g-etage-vue": "Vue depuis l'étage",
      "g-terrasse-etage": "Terrasse de l'étage",
      "g-terrasse-etage-1": "Terrasse de l'étage, vue panoramique",
      "g-terrasse-etage-1b": "Terrasse de l'étage, autre perspective",
      "g-acces-etage": "Accès indépendant à l'appartement de l'étage",
      "g-acces-etage-b": "Escalier d'accès à l'étage",
      "g-ext-1": "Vue extérieure de la villa",
      "g-ext-2": "Façade de la villa",
      "g-ext-3": "La villa et son environnement",
      "g-ext-4": "Extérieur de la villa",
      "g-ext-5": "La villa dans son cadre crétois",
      "g-ext-6": "Vue extérieure de la maison",
      "g-ext-7": "Abords de la villa",
      "g-ext-8": "La villa vue de l'extérieur",
    },
  },

  kamilari: {
    title: "Kamilari, un village crétois authentique",
    paragraphs: [
      "Charmant village du sud de la Crète, Kamilari offre calme et authenticité.",
      "Tavernes conviviales, marchés locaux, plages à proximité et sites antiques à quelques minutes.",
      "L'endroit idéal pour se ressourcer en famille ou entre amis.",
    ],
    highlights: [
      { title: "Plages", detail: "à 10–15 min" },
      { title: "Tavernes", detail: "à pied" },
      { title: "Sites antiques", detail: "à proximité" },
      { title: "Aéroport", detail: "à 1 h" },
    ],
    alt: "Paysage de Kamilari : oliveraies descendant vers la mer",
    galleryHeading: "Kamilari & alentours",
    gallerySubtitle:
      "Le village, ses fêtes, les plages du sud de la Crète et les sites antiques à quelques minutes.",
    alts: {
      "s-place": "Place du village de Kamilari",
      "s-fete": "Fête traditionnelle au village",
      "s-plage-kalamaki": "Plage de Kalamaki",
      "s-plage-kalamaki-2": "Plage de Kalamaki, rivage crétois",
      "s-plage-lentas": "Plage de Lentas",
      "s-plage-triopetra": "Plage de Triopetra",
      "s-faestos": "Site archéologique de Phaistos",
    },
  },

  pricing: {
    heading: "Tarifs de location",
    colSeason: "Saison",
    colPeriod: "Période (indicative)",
    colRdc: "Rez-de-chaussée",
    colEtage: "Étage",
    colFull: "Maison entière — 2 niveaux",
  },

  availability: {
    heading: "Disponibilités",
    note: "Calendrier à titre indicatif uniquement — contactez-nous pour confirmer une période.",
    prevMonth: "Mois précédent",
    nextMonth: "Mois suivant",
    status: {
      disponible: "Disponible",
      reserve: "Réservé",
      confirmer: "À confirmer",
    },
    weekdays: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
    months: [
      "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
      "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre",
    ],
  },

  access: {
    heading: "Venir à la Villa Retsina",
    intro:
      "La villa se situe à Kamilari, en Crète du Sud. Lancez votre itinéraire en un clic.",
    waze: "Itinéraire Waze",
    gmaps: "Google Maps",
  },

  contact: {
    heading: "Nous contacter",
    intro:
      "Une question ? Envie de connaître nos disponibilités ? Écrivez-nous, nous vous répondons rapidement.",
    placeholders: {
      name: "Nom *",
      email: "Email *",
      phone: "Téléphone",
      dates: "Dates souhaitées",
      guests: "Nombre de personnes",
      message: "Votre message",
    },
    submit: "Envoyer ma demande",
    sending: "Envoi…",
    success: "Merci, votre demande a bien été envoyée.",
    errorGeneric: "Une erreur est survenue. Réessayez.",
    errorNetwork: "Connexion impossible. Réessayez plus tard.",
  },

  footer: {
    rights: "Tous droits réservés",
    legal: "Mentions légales",
    place: "Kamilari, Crète",
  },

  meta: {
    title: "Villa Retsina — Maison avec vue panoramique à Kamilari, Crète Sud",
    description:
      "Villa Retsina : maison familiale sur deux niveaux avec vue panoramique à Kamilari, au sud de la Crète. Calme, authenticité, plages et tavernes à proximité.",
  },

  legal: {
    title: "Mentions légales",
    backHome: "Retour à l'accueil",
    sections: {
      editor: {
        title: "Éditeur du site",
        body: "Ce site est édité par le propriétaire de la Villa Retsina, situé à Kamilari, Crète du Sud.",
        contactLabel: "Contact :",
      },
      hosting: {
        title: "Hébergement",
        body: "Site hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis — vercel.com.",
      },
      ip: {
        title: "Propriété intellectuelle",
        body: "L'ensemble des contenus (textes, photographies, éléments graphiques) présents sur ce site est protégé par le droit d'auteur. Toute reproduction sans autorisation préalable est interdite.",
      },
      data: {
        title: "Données personnelles",
        body: "Les informations transmises via le formulaire de contact (nom, email, téléphone, message) sont utilisées uniquement pour répondre à votre demande et ne sont ni revendues ni cédées à des tiers. Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données en écrivant à l'adresse de contact.",
      },
      cookies: {
        title: "Cookies",
        body: "Ce site n'utilise pas de cookies de suivi ni d'outils de traçage publicitaire.",
      },
    },
  },
};

export type Dictionary = typeof fr;
