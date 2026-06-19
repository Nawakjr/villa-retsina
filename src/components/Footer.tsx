import Link from "next/link";
import { localePath, type Locale } from "@/i18n/config";
import type { Content } from "@/i18n/content";

export default function Footer({
  locale,
  villaName,
  footer,
}: {
  locale: Locale;
  villaName: string;
  footer: Content["footer"];
}) {
  const year = 2026;
  const legalHref = `${localePath(locale)}/mentions-legales`;

  return (
    <footer className="bg-olive-deep text-sable/90">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-6 py-6 text-[13px] sm:flex-row">
        <p>
          © {year} {villaName} — {footer.place} — {footer.rights}
        </p>
        <Link href={legalHref} className="transition hover:text-white">
          {footer.legal}
        </Link>
      </div>
    </footer>
  );
}
