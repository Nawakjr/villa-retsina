import type { Metadata } from "next";
import Link from "next/link";
import Media from "@/components/Media";
import RevealOnView from "@/components/RevealOnView";
import Footer from "@/components/Footer";
import { getContent } from "@/i18n/content";

export const metadata: Metadata = {
  title: "Road Trip en Crète",
  description:
    "Notre itinéraire préféré pour découvrir la Crète en voiture : étapes, plages, tavernes, villages et bonnes adresses autour de la Villa Retsina.",
  alternates: { canonical: "/trip" },
};

type Step = {
  n: string;
  title: string;
  paragraphs: string[];
  image?: { src: string; alt: string; tone: "mer" | "olive" | "sable" | "bois" };
};

const steps: Step[] = [
  {
    n: "1",
    title: "Agios Nikolaos ou Mochlos",
    paragraphs: [
      "La première halte peut se faire à Agios Nikolaos ou à Mochlos. Agios Nikolaos est plus grand et plus animé, mais aussi plus touristique (réservation nécessaire).",
      "Mochlos est un petit port charmant et typique, aux petites tavernes sympathiques. Pas de grande plage, mais on peut quand même s'y baigner.",
      "Depuis Mochlos ou Agios Nikolaos, on peut rejoindre Spinalonga, l'ancienne île des lépreux (« L'Île des oubliés ») — ça vaut le détour. Autres points d'intérêt : le plateau de Lassithi, la plage de Vai et le monastère Toplou.",
    ],
  },
  {
    n: "2",
    title: "Kato Zakros",
    paragraphs: [
      "La deuxième étape peut se situer à Kato Zakros (à ne pas confondre avec Zakros). C'est un bout du monde, à l'extrémité est de la Crète.",
      "La route pour y arriver est très belle mais sinueuse — méfiez-vous des distances dans ce coin. Bel endroit pour la plage et la randonnée ; deux jours suffisent. Le lever de soleil sur la plage est un grand moment.",
    ],
  },
  {
    n: "3",
    title: "La route du sud : Myrtos & Keratokampos",
    paragraphs: [
      "On peut ensuite longer la route du sud et s'arrêter à Myrtos. Si l'option Kato Zakros n'est pas retenue, prenez directement la route qui traverse du nord au sud, d'Agios Nikolaos à Ierapetra.",
      "Autre option : Keratokampos, très authentique et bien moins fréquenté par les touristes étrangers. Certaines chambres sont un peu « roots », mais la mer est belle avec ses plages de sable.",
    ],
  },
  {
    n: "4",
    title: "Aghia Galini, Kamilari & la région de Matala",
    image: {
      src: "/assets/villa-retsina/kamilari-village.jpg",
      alt: "Le village de Kamilari",
      tone: "olive",
    },
    paragraphs: [
      "Évitez de loger à Matala. La petite ville de Kamilari est très agréable — c'est là que se trouve notre maison, la Villa Retsina.",
      "Autour de Kamilari, ne manquez pas l'olivier vieux de 2 800 ans (accessible à pied ou en voiture par la route qui passe devant la pizzeria Ariadni). Notre taverne préférée est l'Acropolis, en remontant dans le village — ça grimpe ! Pour les courses, le Supermarket Milonas, chez Marina (nos amis), au centre du village : demandez les « Keftés », à commander le matin pour le soir.",
      "Plages : Kommos (la plus proche, que du sable), Kalamaki (à 2 km, tavernes les pieds dans l'eau, ambiance plus grecque) et Lentas (village typique abrité du vent, à 45 min, un de nos préférés). Pour déjeuner, le Red Castle à Kokkinos Pirgos (demandez les rougets, les « barbougnas »).",
      "À voir aussi : Matala et ses grottes néolithiques (les hippies des années 60), les sites de Phaestos, Agia Triada et Gortyne. Héraklion et Knossos sont à moins d'une heure de voiture.",
    ],
  },
  {
    n: "5",
    title: "Vers Rethymnon, ou la côte sud jusqu'à Sfakia",
    image: {
      src: "/assets/villa-retsina/plage-triopetra.jpg",
      alt: "La plage de Triopetra",
      tone: "mer",
    },
    paragraphs: [
      "En remontant vers Rethymnon, on peut s'arrêter à la plage d'Aghios Pavlos ou à Triopetra (très belle, à éviter par grand vent — préférez le matin). Le monastère de Moni Preveli offre un superbe panorama, avec une belle plage en contrebas (accès par une marche de 20 à 30 min).",
      "Une pause à Rethymnon permet de profiter de la ville et du vieux port. Le monastère de Moni Arkadi, chargé de l'histoire de la Crète, vaut la visite.",
      "On peut aussi rester sur la côte sud et rejoindre Sfakia (Chora Sfakion). De là, un ou deux jours à Loutro (accessible uniquement en bateau) — une balade très agréable — ou la plage de Marmara. Randonnées dans les gorges d'Imbros ou d'Aradena. À Komitades, le petit resto Ostria mérite l'arrêt : terrasse magnifique et vue superbe.",
    ],
  },
  {
    n: "6",
    title: "Hania (La Canée)",
    paragraphs: [
      "La ville de Hania est à voir absolument : la vieille ville et le vieux port sont ravissants. On peut séjourner sur la presqu'île d'Akrotiri (Kalathas, Tersanas, Stavros). Sur la plage de Kalathas, saluez notre amie Touli et son père Giorgios à la taverne. Pour une bonne soirée : le Mitsos BBQ à Kounoupidiana.",
      "Depuis Hania : les magnifiques gorges de Samaria (4 à 5 h de marche, bonnes chaussures indispensables) et la balade en bateau vers Gramvoussa et le lagon de Balos depuis Kissamos (prenez les plus petits bateaux, avec le toboggan).",
    ],
  },
  {
    n: "7",
    title: "Paleochora & Elafonissi",
    paragraphs: [
      "Paleochora est une destination attachante : une jolie ville et deux plages (galets d'un côté, sable de l'autre). Une halte de quelques jours peut s'avérer idéale pour explorer la côte sud.",
      "De Paleochora, on rejoint le lagon d'Elafonissi, plus facilement accessible que Gramvoussa.",
    ],
  },
];

const lexique: { gr: string; fr: string }[] = [
  { gr: "Kalimera", fr: "bonjour" },
  { gr: "Kalispera", fr: "bonsoir" },
  { gr: "Kalinikta", fr: "bonne nuit" },
  { gr: "Yassas", fr: "salut" },
  { gr: "Paghakia", fr: "glaçons" },
  { gr: "Parakalo", fr: "s'il vous plaît" },
  { gr: "Mia Retsina parakalo", fr: "une bouteille de Retsina, s'il vous plaît" },
  { gr: "Efkaristo", fr: "merci" },
  { gr: "Logariasmo parakalo", fr: "l'addition, s'il vous plaît" },
];

export default function TripPage() {
  const c = getContent("fr");

  return (
    <main className="min-h-screen bg-white">
      {/* En-tête */}
      <header className="bg-sable">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-5">
          <Link
            href="/"
            className="flex items-center gap-2 font-serif text-xl text-anthracite transition hover:opacity-70"
          >
            <span className="text-olive">←</span> {c.villaName}
          </Link>
        </div>
      </header>

      <article className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-olive">
          Notre guide
        </p>
        <h1 className="mt-2 font-serif text-4xl text-anthracite sm:text-5xl">
          Road Trip en Crète
        </h1>
        <span className="rule-deco mt-5" />

        <div className="mt-8 space-y-4 text-[15px] leading-relaxed text-anthracite/75">
          <p>
            Voici notre itinéraire préféré pour découvrir la Crète en voiture —
            celui que nous conseillons à nos amis et à nos hôtes. Pour ceux qui
            parcourent toute l’île, un arrêt à Knossos vaut le coup pour une
            première approche de la civilisation minoenne.
          </p>
          <p>
            <strong className="font-semibold text-anthracite">
              Départ d’Héraklion vers l’est.
            </strong>{" "}
            Il n’est pas nécessaire de réserver toutes les nuits, mais prévoyez au
            moins la première (et éventuellement la deuxième).
          </p>
        </div>

        {/* Étapes */}
        <div className="mt-14 space-y-14">
          {steps.map((step) => (
            <RevealOnView key={step.n}>
              <section>
                <div className="flex items-baseline gap-4">
                  <span className="font-serif text-3xl text-olive">{step.n}</span>
                  <h2 className="font-serif text-2xl text-anthracite sm:text-3xl">
                    {step.title}
                  </h2>
                </div>

                {step.image && (
                  <Media
                    src={step.image.src}
                    alt={step.image.alt}
                    tone={step.image.tone}
                    className="mt-6 aspect-[16/9] w-full rounded-2xl"
                    sizes="(max-width: 768px) 100vw, 768px"
                  />
                )}

                <div className="mt-5 space-y-3 text-[15px] leading-relaxed text-anthracite/75">
                  {step.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </section>
            </RevealOnView>
          ))}
        </div>

        {/* Conseils */}
        <RevealOnView>
          <section className="mt-16 rounded-2xl bg-sable px-6 py-8 sm:px-10">
            <h2 className="font-serif text-2xl text-anthracite">Nos conseils</h2>
            <div className="mt-4 space-y-3 text-[15px] leading-relaxed text-anthracite/75">
              <p>
                La Crète n’est pas une région compliquée : laissez-vous porter et
                gardez de la place aux imprévus et aux rencontres.{" "}
                <em>« Siga siga »</em> comme on dit ici — chaque chose en son temps.
              </p>
              <p>
                La côte sud est plus sauvage et plus authentique que le nord, mais
                il y a aussi de belles choses à voir au nord. La mer est plus claire
                dans le sud.
              </p>
            </div>
          </section>
        </RevealOnView>

        {/* Lectures */}
        <RevealOnView>
          <section className="mt-14">
            <h2 className="font-serif text-2xl text-anthracite">
              Lectures pour un voyage en Crète
            </h2>
            <ul className="mt-4 space-y-2 text-[15px] text-anthracite/75">
              <li>• <em>La liberté ou la mort</em>, Nikos Kazantzakis</li>
              <li>• <em>L’Île des oubliés</em>, Victoria Hislop</li>
            </ul>
          </section>
        </RevealOnView>

        {/* Lexique */}
        <RevealOnView>
          <section className="mt-14">
            <h2 className="font-serif text-2xl text-anthracite">
              Petit lexique de survie
            </h2>
            <dl className="mt-5 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
              {lexique.map((entry) => (
                <div key={entry.gr} className="flex items-baseline gap-2 border-b border-anthracite/5 pb-2">
                  <dt className="font-medium text-anthracite">{entry.gr}</dt>
                  <dd className="text-anthracite/60">— {entry.fr}</dd>
                </div>
              ))}
            </dl>
          </section>
        </RevealOnView>

        <p className="mt-16 text-center font-serif text-2xl text-olive">
          Bon séjour&nbsp;!
        </p>

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-olive px-7 py-3 text-sm font-medium uppercase tracking-[0.14em] text-white transition hover:bg-olive-deep"
          >
            Retour à l’accueil
          </Link>
        </div>
      </article>

      <Footer locale="fr" villaName={c.villaName} footer={c.footer} />
    </main>
  );
}
