import type { IconName } from "@/data/villa";

type Props = { className?: string };

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

function Bed({ className }: Props) {
  return (
    <svg {...base} className={className}>
      <path d="M3 18v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6" />
      <path d="M3 18h18M3 14h18M7 10V8a1 1 0 0 1 1-1h3v3M13 10V7h3a1 1 0 0 1 1 1v2" />
    </svg>
  );
}

function Kitchen({ className }: Props) {
  return (
    <svg {...base} className={className}>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M4 9h16M8 6h.01M8 13v4" />
      <circle cx="14" cy="15" r="2.5" />
    </svg>
  );
}

function Fireplace({ className }: Props) {
  return (
    <svg {...base} className={className}>
      <rect x="3" y="3" width="18" height="18" rx="1" />
      <path d="M7 21v-5a5 5 0 0 1 10 0v5" />
      <path d="M12 16c-1.2-.8-1.2-2 0-3 .6 1 2 1.2 2 2.6a2 2 0 1 1-4 0c0-.5.2-.9.5-1.2" />
    </svg>
  );
}

function Bath({ className }: Props) {
  return (
    <svg {...base} className={className}>
      <path d="M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-3Z" />
      <path d="M6 12V6a2 2 0 0 1 2-2 2 2 0 0 1 2 2M8 19l-1 2M17 19l1 2" />
    </svg>
  );
}

function Terrace({ className }: Props) {
  return (
    <svg {...base} className={className}>
      <path d="M3 10h18M12 3v7M12 10c-3 0-7 .6-9 0 .5-4 4.5-7 9-7s8.5 3 9 7c-2 .6-6 0-9 0Z" />
      <path d="M7 10v11M17 10v11" />
    </svg>
  );
}

function Laundry({ className }: Props) {
  return (
    <svg {...base} className={className}>
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <circle cx="12" cy="14" r="4.5" />
      <path d="M7 6h.01M10 6h.01" />
    </svg>
  );
}

function Garden({ className }: Props) {
  return (
    <svg {...base} className={className}>
      <path d="M12 21v-7" />
      <path d="M12 14c-3 0-5-2-5-5 3 0 5 2 5 5ZM12 11c0-3 2-5 5-5 0 3-2 5-5 5Z" />
      <path d="M5 21h14" />
    </svg>
  );
}

function House({ className }: Props) {
  return (
    <svg {...base} className={className}>
      <path d="M3 11l9-7 9 7" />
      <path d="M5 10v10h14V10M9 20v-6h6v6" />
    </svg>
  );
}

function Beach({ className }: Props) {
  return (
    <svg {...base} className={className}>
      <path d="M12 21a4 4 0 0 0-8 0M20 21a4 4 0 0 0-8 0" />
      <path d="M12 13V5M12 5c2-2 5-1 6 1-2.5-.5-4 .5-6 1ZM12 5c-2-2-5-1-6 1 2.5-.5 4 .5 6 1Z" />
    </svg>
  );
}

function Taverna({ className }: Props) {
  return (
    <svg {...base} className={className}>
      <path d="M5 3v6a3 3 0 0 0 6 0V3M8 9v12" />
      <path d="M17 3c-1.5 0-2.5 1.5-2.5 4s1 4 2.5 4M17 3v18" />
    </svg>
  );
}

function Ruins({ className }: Props) {
  return (
    <svg {...base} className={className}>
      <path d="M3 8l9-4 9 4M4 8v12M20 8v12M3 20h18" />
      <path d="M8 20V10M12 20V10M16 20V10" />
    </svg>
  );
}

function Plane({ className }: Props) {
  return (
    <svg {...base} className={className}>
      <path d="M10 3.5 4 12l3 .5 1.5 3 2-3.5 5.5 5 1.5-1L13 13l6-7-2-1-4.5 4-2.5-5Z" />
    </svg>
  );
}

const map: Record<IconName, (p: Props) => React.ReactElement> = {
  bed: Bed,
  kitchen: Kitchen,
  fireplace: Fireplace,
  bath: Bath,
  terrace: Terrace,
  laundry: Laundry,
  garden: Garden,
  house: House,
  beach: Beach,
  taverna: Taverna,
  ruins: Ruins,
  plane: Plane,
};

export default function Icon({
  name,
  className = "h-5 w-5",
}: {
  name: IconName;
  className?: string;
}) {
  const Cmp = map[name];
  return <Cmp className={className} />;
}
