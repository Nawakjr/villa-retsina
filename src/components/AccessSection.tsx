import RevealOnView from "@/components/RevealOnView";
import { villa } from "@/data/villa";

const { lat, lng } = villa.location;
const WAZE_URL = `https://waze.com/ul?ll=${lat},${lng}&navigate=yes`;
const GMAPS_URL = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

export default function AccessSection() {
  return (
    <section id="acces" className="scroll-mt-20 bg-white">
      <RevealOnView className="mx-auto max-w-3xl px-6 py-20 text-center sm:py-24">
        <h2 className="font-serif text-4xl text-anthracite sm:text-5xl">
          Venir à la Villa Retsina
        </h2>
        <span className="rule-deco mt-5" />

        <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-anthracite/65">
          La villa se situe à {villa.location.village}, en {villa.location.region}.
          Lancez votre itinéraire en un clic.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={WAZE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-olive px-7 py-3.5 text-sm font-medium uppercase tracking-[0.12em] text-white transition hover:bg-olive-deep sm:w-auto"
          >
            <NavIcon className="h-[18px] w-[18px]" />
            Itinéraire Waze
          </a>
          <a
            href={GMAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2.5 rounded-full border border-anthracite/20 px-7 py-3.5 text-sm font-medium uppercase tracking-[0.12em] text-anthracite transition hover:bg-sable sm:w-auto"
          >
            <PinIcon className="h-[18px] w-[18px]" />
            Google Maps
          </a>
        </div>

        <p className="mt-6 text-[13px] tracking-wide text-anthracite/45">
          {lat}, {lng}
        </p>
      </RevealOnView>
    </section>
  );
}

function NavIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M12 2 4.5 21l7.5-4 7.5 4L12 2Z" />
    </svg>
  );
}

function PinIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}
