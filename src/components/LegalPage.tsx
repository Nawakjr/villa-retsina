import Link from "next/link";
import Footer from "@/components/Footer";
import { getContent } from "@/i18n/content";
import { localePath, type Locale } from "@/i18n/config";
import { villa } from "@/data/villa";

export default function LegalPage({ locale }: { locale: Locale }) {
  const c = getContent(locale);
  const l = c.legal;
  const home = localePath(locale) || "/";

  return (
    <main className="min-h-screen bg-white">
      <header className="bg-sable">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-5">
          <Link
            href={home}
            className="flex items-center gap-2 font-serif text-xl text-anthracite transition hover:opacity-70"
          >
            <span className="text-olive">←</span> {c.villaName}
          </Link>
        </div>
      </header>

      <article className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
        <h1 className="font-serif text-4xl text-anthracite sm:text-5xl">{l.title}</h1>
        <span className="rule-deco mt-5" />

        <div className="mt-10 space-y-10 text-[15px] leading-relaxed text-anthracite/80">
          <Section title={l.sections.editor.title}>
            <p>{l.sections.editor.body}</p>
            <p className="mt-2">
              {l.sections.editor.contactLabel}{" "}
              <a className="text-olive-deep underline" href={`mailto:${villa.contact.email}`}>
                {villa.contact.email}
              </a>
            </p>
          </Section>

          <Section title={l.sections.hosting.title}>
            <p>{l.sections.hosting.body}</p>
          </Section>

          <Section title={l.sections.ip.title}>
            <p>{l.sections.ip.body}</p>
          </Section>

          <Section title={l.sections.data.title}>
            <p>{l.sections.data.body}</p>
          </Section>

          <Section title={l.sections.cookies.title}>
            <p>{l.sections.cookies.body}</p>
          </Section>
        </div>

        <div className="mt-14">
          <Link
            href={home}
            className="inline-flex items-center justify-center rounded-full bg-olive px-7 py-3 text-sm font-medium uppercase tracking-[0.14em] text-white transition hover:bg-olive-deep"
          >
            {l.backHome}
          </Link>
        </div>
      </article>

      <Footer locale={locale} villaName={c.villaName} footer={c.footer} />
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-serif text-2xl text-anthracite">{title}</h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}
