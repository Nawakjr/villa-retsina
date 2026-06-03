"use client";

import { useEffect, useState } from "react";
import { nav, villa } from "@/data/villa";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || open;

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
          href="#accueil"
          className={[
            "flex items-center gap-2 font-serif text-xl tracking-wide transition-colors",
            solid ? "text-anthracite" : "text-white",
          ].join(" ")}
        >
          <LeafMark className="h-5 w-5 text-olive" />
          <span>{villa.name}</span>
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
        </nav>

        {/* Burger */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          className={[
            "md:hidden",
            solid ? "text-anthracite" : "text-white",
          ].join(" ")}
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
        </nav>
      )}
    </header>
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
