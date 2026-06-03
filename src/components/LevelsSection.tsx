import Media from "@/components/Media";
import Icon from "@/components/Icons";
import RevealOnView from "@/components/RevealOnView";
import { levels, type Level } from "@/data/villa";

export default function LevelsSection() {
  return (
    <section id="la-villa" className="scroll-mt-20 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <div className="grid gap-14 md:grid-cols-2 md:gap-12 lg:gap-20">
          {levels.map((level, i) => (
            <RevealOnView key={level.id} delayMs={i * 120}>
              <LevelCard level={level} />
            </RevealOnView>
          ))}
        </div>
      </div>
    </section>
  );
}

function LevelCard({ level }: { level: Level }) {
  return (
    <article className="flex flex-col">
      <Media
        src={level.src}
        alt={level.alt}
        tone={level.id === "etage" ? "mer" : "sable"}
        className="aspect-[4/3] w-full rounded-2xl"
        sizes="(max-width: 768px) 100vw, 50vw"
      />

      <p className="mt-7 text-[11px] font-semibold uppercase tracking-[0.2em] text-olive">
        {level.eyebrow}
      </p>
      <h2 className="mt-2 font-serif text-3xl text-anthracite sm:text-4xl">
        {level.title}
      </h2>
      <p className="mt-4 max-w-md text-[15px] leading-relaxed text-anthracite/70">
        {level.description}
      </p>

      <ul className="mt-7 grid grid-cols-1 gap-x-8 gap-y-3.5 sm:grid-cols-2">
        {level.features.map((f) => (
          <li
            key={f.label}
            className="flex items-center gap-3 text-[15px] text-anthracite/85"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sable text-olive-deep">
              <Icon name={f.icon} className="h-[18px] w-[18px]" />
            </span>
            {f.label}
          </li>
        ))}
      </ul>
    </article>
  );
}
