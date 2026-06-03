"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  statusDot,
  statusLabels,
  statusStyles,
  type DayStatus,
} from "@/data/availability";
import type { PriceRow } from "@/data/pricing";
import { pricingMeta } from "@/data/pricing";

const MONTHS = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre",
];
const WEEKDAYS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
const CYCLE: DayStatus[] = ["disponible", "reserve", "confirmer"];

function pad(n: number) {
  return String(n).padStart(2, "0");
}
function mondayIndex(year: number, month: number) {
  return (new Date(year, month, 1).getDay() + 6) % 7;
}

type Props = {
  initialDates: Record<string, DayStatus>;
  initialRows: PriceRow[];
  initialNote: string;
};

export default function AdminEditor({
  initialDates,
  initialRows,
  initialNote,
}: Props) {
  const router = useRouter();

  // ── Disponibilités ──
  const now = new Date();
  const [view, setView] = useState({ year: now.getFullYear(), month: now.getMonth() });
  const [dates, setDates] = useState<Record<string, DayStatus>>(initialDates);
  const [availMsg, setAvailMsg] = useState("");
  const [availSaving, setAvailSaving] = useState(false);

  // ── Tarifs ──
  const [rows, setRows] = useState<PriceRow[]>(initialRows);
  const [note, setNote] = useState(initialNote);
  const [priceMsg, setPriceMsg] = useState("");
  const [priceSaving, setPriceSaving] = useState(false);

  const cells = useMemo(() => {
    const { year, month } = view;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const lead = mondayIndex(year, month);
    const out: ({ day: number; key: string; status: DayStatus } | null)[] = [];
    for (let i = 0; i < lead; i++) out.push(null);
    for (let d = 1; d <= daysInMonth; d++) {
      const key = `${year}-${pad(month + 1)}-${pad(d)}`;
      out.push({ day: d, key, status: dates[key] ?? "disponible" });
    }
    while (out.length % 7 !== 0) out.push(null);
    return out;
  }, [view, dates]);

  const goMonth = (delta: number) =>
    setView((v) => {
      const m = v.month + delta;
      return { year: v.year + Math.floor(m / 12), month: ((m % 12) + 12) % 12 };
    });

  const cycleDay = (key: string) => {
    setDates((prev) => {
      const cur = prev[key] ?? "disponible";
      const next = CYCLE[(CYCLE.indexOf(cur) + 1) % CYCLE.length];
      const copy = { ...prev };
      if (next === "disponible") delete copy[key];
      else copy[key] = next;
      return copy;
    });
  };

  async function saveAvailability() {
    setAvailSaving(true);
    setAvailMsg("");
    try {
      const res = await fetch("/api/admin/availability", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dates }),
      });
      const data = await res.json();
      setAvailMsg(res.ok && data.ok ? "Disponibilités enregistrées ✓" : data.error || "Erreur.");
    } catch (e) {
      console.error("saveAvailability:", e);
      setAvailMsg("Erreur réseau.");
    } finally {
      setAvailSaving(false);
    }
  }

  async function savePricing() {
    setPriceSaving(true);
    setPriceMsg("");
    try {
      const res = await fetch("/api/admin/pricing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rows, note }),
      });
      const data = await res.json();
      setPriceMsg(res.ok && data.ok ? "Tarifs enregistrés ✓" : data.error || "Erreur.");
    } catch (e) {
      console.error("savePricing:", e);
      setPriceMsg("Erreur réseau.");
    } finally {
      setPriceSaving(false);
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  const setRow = (i: number, field: keyof PriceRow, value: string) =>
    setRows((prev) => prev.map((r, j) => (j === i ? { ...r, [field]: value } : r)));

  const addRow = () =>
    setRows((prev) => [
      ...prev,
      { season: "", period: "", priceRdc: "", priceEtage: "", priceFull: "" },
    ]);

  const removeRow = (i: number) =>
    setRows((prev) => prev.filter((_, j) => j !== i));

  return (
    <main className="min-h-screen bg-sable">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-anthracite/10 bg-sable/90 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="font-serif text-xl text-anthracite">Administration</h1>
            <p className="text-xs text-anthracite/55">Villa Retsina</p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="text-sm text-anthracite/70 underline-offset-2 hover:underline"
            >
              Voir le site ↗
            </a>
            <button
              onClick={logout}
              className="rounded-full border border-anthracite/20 px-4 py-2 text-sm text-anthracite transition hover:bg-white"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-5xl gap-10 px-6 py-10 lg:grid-cols-2">
        {/* ── DISPONIBILITÉS ── */}
        <section className="rounded-2xl border border-anthracite/10 bg-white p-6">
          <h2 className="font-serif text-2xl text-anthracite">Disponibilités</h2>
          <p className="mt-1 text-sm text-anthracite/60">
            Cliquez sur un jour pour faire défiler : disponible → réservé → à confirmer.
          </p>

          <div className="mt-5 mb-4 flex items-center justify-between">
            <button
              onClick={() => goMonth(-1)}
              aria-label="Mois précédent"
              className="flex h-9 w-9 items-center justify-center rounded-full text-anthracite/60 hover:bg-sable"
            >
              ‹
            </button>
            <span className="font-serif text-lg text-anthracite">
              {MONTHS[view.month]} {view.year}
            </span>
            <button
              onClick={() => goMonth(1)}
              aria-label="Mois suivant"
              className="flex h-9 w-9 items-center justify-center rounded-full text-anthracite/60 hover:bg-sable"
            >
              ›
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1.5 text-center">
            {WEEKDAYS.map((w) => (
              <div key={w} className="pb-1 text-[11px] font-semibold uppercase text-anthracite/45">
                {w}
              </div>
            ))}
            {cells.map((cell, i) =>
              cell ? (
                <button
                  key={cell.key}
                  onClick={() => cycleDay(cell.key)}
                  title={statusLabels[cell.status]}
                  className={`flex aspect-square items-center justify-center rounded-lg text-sm transition hover:ring-2 hover:ring-olive/40 ${statusStyles[cell.status]}`}
                >
                  {cell.day}
                </button>
              ) : (
                <div key={`x${i}`} aria-hidden />
              ),
            )}
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-anthracite/10 pt-4 text-[13px] text-anthracite/70">
            {(Object.keys(statusLabels) as DayStatus[]).map((s) => (
              <span key={s} className="flex items-center gap-2">
                <span className={`h-2.5 w-2.5 rounded-full ${statusDot[s]}`} />
                {statusLabels[s]}
              </span>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-4">
            <button
              onClick={saveAvailability}
              disabled={availSaving}
              className="rounded-full bg-olive px-6 py-2.5 text-sm font-medium uppercase tracking-[0.12em] text-white transition hover:bg-olive-deep disabled:opacity-60"
            >
              {availSaving ? "Enregistrement…" : "Enregistrer les dispos"}
            </button>
            {availMsg && <span className="text-sm text-anthracite/70">{availMsg}</span>}
          </div>
        </section>

        {/* ── TARIFS ── */}
        <section className="rounded-2xl border border-anthracite/10 bg-white p-6">
          <h2 className="font-serif text-2xl text-anthracite">Tarifs</h2>
          <p className="mt-1 text-sm text-anthracite/60">
            Modifiez librement les saisons et les prix.
          </p>

          <div className="mt-5 space-y-4">
            {rows.map((row, i) => (
              <div key={i} className="rounded-xl border border-anthracite/10 bg-sable/30 p-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wide text-anthracite/50">
                    Ligne {i + 1}
                  </span>
                  <button
                    onClick={() => removeRow(i)}
                    className="text-xs text-bois hover:underline"
                  >
                    Supprimer
                  </button>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <Input label="Saison" value={row.season} onChange={(v) => setRow(i, "season", v)} />
                  <Input label="Période" value={row.period} onChange={(v) => setRow(i, "period", v)} />
                  <Input label={pricingMeta.colRdc} value={row.priceRdc} onChange={(v) => setRow(i, "priceRdc", v)} />
                  <Input label={pricingMeta.colEtage} value={row.priceEtage} onChange={(v) => setRow(i, "priceEtage", v)} />
                  <Input
                    label={pricingMeta.colFull}
                    value={row.priceFull}
                    onChange={(v) => setRow(i, "priceFull", v)}
                    className="col-span-2"
                  />
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={addRow}
            className="mt-3 text-sm font-medium text-olive-deep hover:underline"
          >
            + Ajouter une ligne
          </button>

          <label className="mt-5 block text-sm font-medium text-anthracite">
            Note sous le tableau
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={2}
              className="mt-2 w-full rounded-xl border border-anthracite/15 bg-sable/30 px-3 py-2 text-sm text-anthracite outline-none focus:border-olive"
            />
          </label>

          <div className="mt-6 flex items-center gap-4">
            <button
              onClick={savePricing}
              disabled={priceSaving}
              className="rounded-full bg-olive px-6 py-2.5 text-sm font-medium uppercase tracking-[0.12em] text-white transition hover:bg-olive-deep disabled:opacity-60"
            >
              {priceSaving ? "Enregistrement…" : "Enregistrer les tarifs"}
            </button>
            {priceMsg && <span className="text-sm text-anthracite/70">{priceMsg}</span>}
          </div>
        </section>
      </div>
    </main>
  );
}

function Input({
  label,
  value,
  onChange,
  className = "",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  className?: string;
}) {
  return (
    <label className={`block text-xs text-anthracite/60 ${className}`}>
      {label}
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-lg border border-anthracite/15 bg-white px-3 py-2 text-sm text-anthracite outline-none focus:border-olive"
      />
    </label>
  );
}
