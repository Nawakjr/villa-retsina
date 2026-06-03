"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "ok" | "error";

export default function ContactSection() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  // Anti-bot : horodatage du chargement du formulaire (cf. /api/contact).
  const [formLoadedAt] = useState(() => Date.now());

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");

    // On capture le formulaire AVANT l'await : après, React remet
    // e.currentTarget à null (ce qui faisait planter form.reset()).
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      type: "contact",
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      dates: String(fd.get("dates") || ""),
      guests: String(fd.get("guests") || ""),
      message: String(fd.get("message") || ""),
      companyTrap: String(fd.get("companyTrap") || ""), // honeypot
      _t: formLoadedAt,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error || "Une erreur est survenue. Réessayez.");
        setStatus("error");
        return;
      }
      setStatus("ok");
      form.reset();
    } catch {
      setError("Connexion impossible. Réessayez plus tard.");
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="scroll-mt-20 bg-anthracite text-sable">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 sm:py-28 md:grid-cols-[0.85fr_1.15fr] md:gap-16">
        {/* Colonne info */}
        <div>
          <h2 className="font-serif text-4xl text-sable sm:text-5xl">Nous contacter</h2>
          <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-sable/70">
            Une question ? Envie de connaître nos disponibilités ? Écrivez-nous,
            nous vous répondons rapidement.
          </p>
        </div>

        {/* Formulaire */}
        <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
          {/* honeypot caché */}
          <input
            type="text"
            name="companyTrap"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute left-[-9999px] h-0 w-0"
          />

          <Field name="name" placeholder="Nom *" required autoComplete="name" />
          <Field name="email" type="email" placeholder="Email *" required autoComplete="email" />
          <Field name="phone" type="tel" placeholder="Téléphone" autoComplete="tel" />
          <Field name="dates" placeholder="Dates souhaitées" />
          <Field name="guests" placeholder="Nombre de personnes" className="sm:col-span-2" />

          <textarea
            name="message"
            placeholder="Votre message"
            rows={5}
            className="sm:col-span-2 rounded-xl border border-sable/20 bg-sable/5 px-4 py-3 text-sm text-sable placeholder:text-sable/45 outline-none transition focus:border-olive focus:bg-sable/10"
          />

          <div className="sm:col-span-2 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex items-center justify-center rounded-full bg-olive px-8 py-3.5 text-sm font-medium uppercase tracking-[0.14em] text-white transition hover:bg-olive-deep disabled:opacity-60"
            >
              {status === "sending" ? "Envoi…" : "Envoyer ma demande"}
            </button>

            {status === "ok" && (
              <p className="text-sm text-olive">Merci, votre demande a bien été envoyée.</p>
            )}
            {status === "error" && (
              <p className="text-sm text-[#e0a17f]">{error}</p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}

function Field({
  className = "",
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`rounded-xl border border-sable/20 bg-sable/5 px-4 py-3 text-sm text-sable placeholder:text-sable/45 outline-none transition focus:border-olive focus:bg-sable/10 ${className}`}
    />
  );
}
