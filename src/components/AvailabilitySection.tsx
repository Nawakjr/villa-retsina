"use client";

import { useMemo, useState } from "react";
import {
  availabilityNote,
  defaultMonth,
  statusDot,
  statusLabels,
  statusStyles,
  type DayStatus,
} from "@/data/availability";

const MONTHS = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre",
];
const WEEKDAYS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

function pad(n: number) {
  return String(n).padStart(2, "0");
}

/** Lundi = 0 … Dimanche = 6 */
function mondayIndex(year: number, month: number) {
  const js = new Date(year, month, 1).getDay(); // 0 = dimanche
  return (js + 6) % 7;
}

export default function AvailabilitySection({
  availability,
}: {
  availability: Record<string, DayStatus>;
}) {
  const [{ year, month }, setView] = useState(defaultMonth);

  const cells = useMemo(() => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const lead = mondayIndex(year, month);
    const out: ({ day: number; status: DayStatus } | null)[] = [];
    for (let i = 0; i < lead; i++) out.push(null);
    for (let d = 1; d <= daysInMonth; d++) {
      const key = `${year}-${pad(month + 1)}-${pad(d)}`;
      out.push({ day: d, status: availability[key] ?? "disponible" });
    }
    while (out.length % 7 !== 0) out.push(null);
    return out;
  }, [year, month, availability]);

  const go = (delta: number) => {
    setView((v) => {
      const m = v.month + delta;
      return { year: v.year + Math.floor(m / 12), month: ((m % 12) + 12) % 12 };
    });
  };

  return (
    <div id="disponibilites" className="scroll-mt-24">
      <h2 className="font-serif text-3xl text-anthracite sm:text-4xl">
        Disponibilités
      </h2>
      <span className="rule-deco mt-4" />

      <div className="mt-8 rounded-2xl border border-anthracite/10 bg-white p-5 sm:p-6">
        {/* Entête mois */}
        <div className="mb-4 flex items-center justify-between">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Mois précédent"
            className="flex h-9 w-9 items-center justify-center rounded-full text-anthracite/60 transition hover:bg-sable hover:text-anthracite"
          >
            ‹
          </button>
          <span className="font-serif text-lg text-anthracite">
            {MONTHS[month]} {year}
          </span>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Mois suivant"
            className="flex h-9 w-9 items-center justify-center rounded-full text-anthracite/60 transition hover:bg-sable hover:text-anthracite"
          >
            ›
          </button>
        </div>

        {/* Grille */}
        <div className="grid grid-cols-7 gap-1.5 text-center">
          {WEEKDAYS.map((w) => (
            <div
              key={w}
              className="pb-1 text-[11px] font-semibold uppercase tracking-wide text-anthracite/45"
            >
              {w}
            </div>
          ))}
          {cells.map((cell, i) =>
            cell ? (
              <div
                key={i}
                className={`flex aspect-square items-center justify-center rounded-lg text-sm ${statusStyles[cell.status]}`}
                title={statusLabels[cell.status]}
              >
                {cell.day}
              </div>
            ) : (
              <div key={i} aria-hidden="true" />
            ),
          )}
        </div>

        {/* Légende */}
        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-anthracite/10 pt-4 text-[13px] text-anthracite/70">
          {(Object.keys(statusLabels) as DayStatus[]).map((s) => (
            <span key={s} className="flex items-center gap-2">
              <span className={`h-2.5 w-2.5 rounded-full ${statusDot[s]}`} />
              {statusLabels[s]}
            </span>
          ))}
        </div>
      </div>

      <p className="mt-4 text-[13px] italic text-anthracite/55">{availabilityNote}</p>
    </div>
  );
}
