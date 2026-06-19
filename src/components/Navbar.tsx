"use client";

import { useEffect, useState } from "react";
import { locales, localeNames, localePath, type Locale } from "@/i18n/config";
import type { Content } from "@/i18n/content";

type Props = {
  locale: Locale;
  villaName: string;
  nav: Content["nav"];
  labels: { openMenu: string; closeMenu: string; language: string };
};

export default function Navbar({ locale, villaName, nav, labels }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || open;
  const home = localePath(locale) || "/";

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        solid
          ? "bg-sable/90 backdrop-blur-md shadow-[0_2px_24px_rgba(36,48,57,0.08)]"
          : "bg-transparent",
      ].join(" ")}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a
          href={home}
          className={[
            "flex items-center gap-2 font-serif text-xl tracking-wide transition-colors",
            solid ? "text-anthracite" : "text-white",
          ].join(" ")}
        >
          <LeafMark className="h-5 w-5 text-olive" />
          <span>{villaName}</span>
        </a>

        {/* Desktop */}
        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={[
                "text-[13px] font-medium uppercase tracking-[0.14em] transition-opacity hover:opacity-60",
                solid ? "text-anthracite" : "text-white",
              ].join(" ")}
            >
              {item.label}
            </a>
          ))}
          <LanguageSwitcher current={locale} solid={solid} label={labels.language} />
        </nav>

        {/* Burger */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? labels.closeMenu : labels.openMenu}
          aria-expanded={open}
          className={["md:hidden", solid ? "text-anthracite" : "text-white"].join(" ")}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <nav className="border-t border-anthracite/10 bg-sable/95 px-6 pb-6 pt-2 backdrop-blur-md md:hidden">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block border-b border-anthracite/5 py-3 text-sm font-medium uppercase tracking-[0.14em] text-anthracite last:border-0"
            >
              {item.label}
            </a>
          ))}
          <div className="flex flex-wrap gap-x-4 gap-y-2 pt-4">
            {locales.map((l) => (
              <a
                key={l}
                href={localePath(l) || "/"}
                className={[
                  "text-sm font-medium uppercase tracking-[0.12em]",
                  l === locale ? "text-olive-deep" : "text-anthracite/60",
                ].join(" ")}
              >
                {localeNames[l]}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}

function LanguageSwitcher({
  current,
  solid,
  label,
}: {
  current: Locale;
  solid: boolean;
  label: string;
}) {
  return (
    <div className="group relative">
      <button
        type="button"
        aria-label={label}
        className={[
          "flex items-center gap-1.5 text-[13px] font-medium uppercase tracking-[0.12em] transition-opacity hover:opacity-60",
          solid ? "text-anthracite" : "text-white",
        ].join(" ")}
      >
        <GlobeIcon className="h-4 w-4" />
        {current.toUpperCase()}
      </button>
      <div className="invisible absolute right-0 top-full z-50 mt-2 min-w-[9rem] rounded-xl border border-anthracite/10 bg-white p-1.5 opacity-0 shadow-lg transition-all duration-150 group-hover:visible group-hover:opacity-100">
        {locales.map((l) => (
          <a
            key={l}
            href={localePath(l) || "/"}
            className={[
              "block rounded-lg px-3 py-2 text-sm transition hover:bg-sable",
              l === current ? "font-semibold text-olive-deep" : "text-anthracite/80",
            ].join(" ")}
          >
            {localeNames[l]}
          </a>
        ))}
      </div>
    </div>
  );
}

function GlobeIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18" />
    </svg>
  );
}

function LeafMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M5 19c0-7 5-13 14-14-1 9-7 14-14 14Zm0 0c4-4 7-6 10-7" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
  );
}
