import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAuthed } from "@/lib/auth";
import { setPricing, storageInfo } from "@/lib/store";
import type { PriceRow } from "@/data/pricing";

const STORAGE_ERROR =
  "Stockage non configuré. Connectez un store KV au projet sur Vercel (Storage → créer/connecter un KV) pour pouvoir enregistrer.";

function str(v: unknown, max = 120): string {
  return String(v ?? "").trim().slice(0, max);
}

export async function POST(req: Request) {
  if (!(await isAuthed())) {
    return NextResponse.json({ ok: false, error: "Non autorisé." }, { status: 401 });
  }

  let rowsIn: unknown[] = [];
  let note = "";
  try {
    const body = await req.json();
    rowsIn = Array.isArray(body?.rows) ? body.rows : [];
    note = str(body?.note, 300);
  } catch {
    return NextResponse.json({ ok: false, error: "Données invalides." }, { status: 400 });
  }

  if (rowsIn.length < 1 || rowsIn.length > 12) {
    return NextResponse.json(
      { ok: false, error: "Le nombre de lignes doit être compris entre 1 et 12." },
      { status: 400 },
    );
  }

  const rows: PriceRow[] = rowsIn.map((r) => {
    const row = (r ?? {}) as Record<string, unknown>;
    return {
      season: str(row.season),
      period: str(row.period),
      priceRdc: str(row.priceRdc),
      priceEtage: str(row.priceEtage),
      priceFull: str(row.priceFull),
    };
  });

  if (rows.some((r) => !r.season)) {
    return NextResponse.json(
      { ok: false, error: "Chaque ligne doit avoir un nom de saison." },
      { status: 400 },
    );
  }

  try {
    await setPricing({ rows, note });
  } catch (e) {
    console.error("setPricing:", e);
    const fileBackend = storageInfo().backend === "file";
    return NextResponse.json(
      { ok: false, error: fileBackend ? STORAGE_ERROR : "Échec de l'enregistrement (stockage)." },
      { status: 503 },
    );
  }

  revalidatePath("/");
  return NextResponse.json({ ok: true });
}
