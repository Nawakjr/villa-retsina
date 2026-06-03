import RevealOnView from "@/components/RevealOnView";
import { villa } from "@/data/villa";

export default function Intro() {
  return (
    <section className="bg-sable">
      <RevealOnView className="mx-auto max-w-3xl px-6 py-20 text-center sm:py-28">
        <OliveBranch className="mx-auto mb-8 h-7 w-auto text-olive" />
        <p className="font-serif text-2xl leading-snug text-anthracite sm:text-3xl md:text-[2rem]">
          {villa.intro}
        </p>
      </RevealOnView>
    </section>
  );
}

function OliveBranch({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M8 12h64"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      {[20, 32, 44, 56].map((x, i) => (
        <g key={x}>
          <ellipse
            cx={x}
            cy={i % 2 ? 7 : 17}
            rx="4"
            ry="2.3"
            transform={`rotate(${i % 2 ? -25 : 25} ${x} ${i % 2 ? 7 : 17})`}
            fill="currentColor"
            opacity="0.85"
          />
        </g>
      ))}
      <circle cx="72" cy="12" r="2.4" fill="currentColor" />
    </svg>
  );
}
