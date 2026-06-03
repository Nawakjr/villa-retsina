import Link from "next/link";
import { villa } from "@/data/villa";

export default function Footer() {
  const year = 2025;
  return (
    <footer className="bg-olive-deep text-sable/90">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-6 py-6 text-[13px] sm:flex-row">
        <p>
          © {year} {villa.name} — {villa.location.village}, Crète — Tous droits
          réservés
        </p>
        <Link href="/mentions-legales" className="transition hover:text-white">
          Mentions légales
        </Link>
      </div>
    </footer>
  );
}
