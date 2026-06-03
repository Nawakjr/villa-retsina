import Image from "next/image";

type Tone = "mer" | "olive" | "sable" | "bois" | "anthracite";

const gradients: Record<Tone, string> = {
  mer: "from-[#bcd6e0] via-[#8fb8c8] to-[#6c9fb2]",
  olive: "from-[#cdd3b6] via-[#9aa676] to-[#7c8a5a]",
  sable: "from-[#fbf6ec] via-[#f1e7d4] to-[#e2d2b6]",
  bois: "from-[#caa98f] via-[#a3765a] to-[#8a5a3c]",
  anthracite: "from-[#5b6b75] via-[#3a4a54] to-[#243039]",
};

/**
 * Affiche une vraie photo si `src` est fourni, sinon un placeholder
 * dégradé méditerranéen. Permet de livrer une maquette fonctionnelle
 * et de remplacer les visuels plus tard sans toucher au layout.
 */
export default function Media({
  src,
  alt,
  tone = "sable",
  className = "",
  imgClassName = "object-cover",
  priority = false,
  sizes,
}: {
  src?: string;
  alt: string;
  tone?: Tone;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div className={`relative overflow-hidden bg-sable ${className}`}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes ?? "100vw"}
          className={imgClassName}
        />
      ) : (
        <div
          role="img"
          aria-label={alt}
          className={`absolute inset-0 bg-gradient-to-br ${gradients[tone]}`}
        >
          {/* léger motif lumineux pour un rendu plus organique */}
          <div className="absolute inset-0 opacity-30 [background:radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.6),transparent_45%),radial-gradient(circle_at_75%_80%,rgba(255,255,255,0.25),transparent_40%)]" />
          <div className="absolute bottom-3 right-4 flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-white/70">
            <span className="h-1 w-1 rounded-full bg-white/70" />
            photo à venir
          </div>
        </div>
      )}
    </div>
  );
}
