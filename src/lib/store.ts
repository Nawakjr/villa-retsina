import "server-only";
import path from "path";
import { availability as defaultAvailability } from "@/data/availability";
import type { DayStatus } from "@/data/availability";
import { pricing as defaultPricing, pricingMeta } from "@/data/pricing";
import type { PriceRow } from "@/data/pricing";

/**
 * Stockage des données éditables depuis l'admin (disponibilités + tarifs).
 *
 * Deux backends, choisis automatiquement :
 *   • Production (Vercel) : Vercel KV (Upstash Redis) si `KV_REST_API_URL` est
 *     défini — persiste entre les déploiements.
 *   • Développement local : fichier JSON `.data/store.json` (ignoré par git).
 *
 * Les valeurs par défaut proviennent des fichiers `src/data/*` : tant que rien
 * n'a été enregistré, le site affiche ces valeurs.
 */

export type AvailabilityStore = { dates: Record<string, DayStatus> };
export type PricingStore = { rows: PriceRow[]; note: string };

const KEY_AVAIL = "villa:availability";
const KEY_PRICING = "villa:pricing";

const useKV = !!process.env.KV_REST_API_URL;
const FILE = path.join(process.cwd(), ".data", "store.json");

/* ── Backend fichier (dev) ── */
async function fileReadAll(): Promise<Record<string, unknown>> {
  const { readFile } = await import("fs/promises");
  try {
    return JSON.parse(await readFile(FILE, "utf8"));
  } catch {
    return {};
  }
}
async function fileWrite(key: string, value: unknown) {
  const { mkdir, writeFile } = await import("fs/promises");
  const all = await fileReadAll();
  all[key] = value;
  await mkdir(path.dirname(FILE), { recursive: true });
  await writeFile(FILE, JSON.stringify(all, null, 2), "utf8");
}

/* ── Backend Vercel KV (prod) ── */
async function kvGet<T>(key: string): Promise<T | null> {
  const { kv } = await import("@vercel/kv");
  return (await kv.get<T>(key)) ?? null;
}
async function kvSet<T>(key: string, value: T) {
  const { kv } = await import("@vercel/kv");
  await kv.set(key, value);
}

/* ── Défauts ── */
function defaultAvailabilityStore(): AvailabilityStore {
  return { dates: { ...defaultAvailability } };
}
function defaultPricingStore(): PricingStore {
  return { rows: defaultPricing.map((r) => ({ ...r })), note: pricingMeta.note };
}

/* ── API publique ── */
export async function getAvailability(): Promise<AvailabilityStore> {
  try {
    if (useKV) return (await kvGet<AvailabilityStore>(KEY_AVAIL)) ?? defaultAvailabilityStore();
    const all = await fileReadAll();
    return (all[KEY_AVAIL] as AvailabilityStore) ?? defaultAvailabilityStore();
  } catch (e) {
    console.error("store.getAvailability fallback:", e);
    return defaultAvailabilityStore();
  }
}

export async function setAvailability(value: AvailabilityStore): Promise<void> {
  if (useKV) return kvSet(KEY_AVAIL, value);
  return fileWrite(KEY_AVAIL, value);
}

export async function getPricing(): Promise<PricingStore> {
  try {
    if (useKV) return (await kvGet<PricingStore>(KEY_PRICING)) ?? defaultPricingStore();
    const all = await fileReadAll();
    return (all[KEY_PRICING] as PricingStore) ?? defaultPricingStore();
  } catch (e) {
    console.error("store.getPricing fallback:", e);
    return defaultPricingStore();
  }
}

export async function setPricing(value: PricingStore): Promise<void> {
  if (useKV) return kvSet(KEY_PRICING, value);
  return fileWrite(KEY_PRICING, value);
}
