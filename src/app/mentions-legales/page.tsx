import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { villa } from "@/data/villa";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site Villa Retsina.",
  alternates: { canonical: "/mentions-legales" },
  robots: { index: false, follow: true },
};

export default function MentionsLegales() {
  return (
    <main className="min-h-screen bg-white">
      {/* En-tête simple */}
      <header className="bg-sable">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-5">
          <Link
            href="/"
            className="flex items-center gap-2 font-serif text-xl text-anthracite transition hover:opacity-70"
          >
            <span className="text-olive">←</span> {villa.name}
          </Link>
        </div>
      </header>

      <article className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
        <h1 className="font-serif text-4xl text-anthracite sm:text-5xl">
          Mentions légales
        </h1>
        <span className="rule-deco mt-5" />

        <div className="mt-10 space-y-10 text-[15px] leading-relaxed text-anthracite/80">
          <Section title="Éditeur du site">
            <p>
              Ce site est édité par le propriétaire de la {villa.name}, situé à{" "}
              {villa.location.village}, {villa.location.region}.
            </p>
            <p className="mt-2">
              Contact :{" "}
              <a className="text-olive-deep underline" href={`mailto:${villa.contact.email}`}>
                {villa.contact.email}
              </a>
            </p>
          </Section>

          <Section title="Hébergement">
            <p>
              Site hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789,
              États-Unis —{" "}
              <a className="text-olive-deep underline" href="https://vercel.com" target="_blank" rel="noopener noreferrer">
                vercel.com
              </a>
              .
            </p>
          </Section>

          <Section title="Propriété intellectuelle">
            <p>
              L&apos;ensemble des contenus (textes, photographies, éléments
              graphiques) présents sur ce site est protégé par le droit d&apos;auteur.
              Toute reproduction sans autorisation préalable est interdite.
            </p>
          </Section>

          <Section title="Données personnelles">
            <p>
              Les informations transmises via le formulaire de contact (nom, email,
              téléphone, message) sont utilisées uniquement pour répondre à votre
              demande et ne sont ni revendues ni cédées à des tiers. Conformément au
              RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification et de
              suppression de vos données en écrivant à{" "}
              <a className="text-olive-deep underline" href={`mailto:${villa.contact.email}`}>
                {villa.contact.email}
              </a>
              .
            </p>
          </Section>

          <Section title="Cookies">
            <p>
              Ce site n&apos;utilise pas de cookies de suivi ni d&apos;outils de
              traçage publicitaire.
            </p>
          </Section>
        </div>

        <div className="mt-14">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-olive px-7 py-3 text-sm font-medium uppercase tracking-[0.14em] text-white transition hover:bg-olive-deep"
          >
            Retour à l&apos;accueil
          </Link>
        </div>
      </article>

      <Footer />
    </main>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="font-serif text-2xl text-anthracite">{title}</h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}
