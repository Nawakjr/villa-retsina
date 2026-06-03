import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAuthed } from "@/lib/auth";
import { setAvailability, storageInfo } from "@/lib/store";
import type { DayStatus } from "@/data/availability";

const STORAGE_ERROR =
  "Stockage non configuré. Connectez un store KV au projet sur Vercel (Storage → créer/connecter un KV) pour pouvoir enregistrer.";

const VALID: DayStatus[] = ["disponible", "reserve", "confirmer"];

/** Vérifie un format ISO `YYYY-MM-DD` ET que la date existe réellement. */
function isRealDate(key: string): boolean {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(key);
  if (!m) return false;
  const [, y, mo, d] = m;
  const dt = new Date(Number(y), Number(mo) - 1, Number(d));
  return (
    dt.getFullYear() === Number(y) &&
    dt.getMonth() === Number(mo) - 1 &&
    dt.getDate() === Number(d)
  );
}

export async function POST(req: Request) {
  if (!(await isAuthed())) {
    return NextResponse.json({ ok: false, error: "Non autorisé." }, { status: 401 });
  }

  let dates: Record<string, unknown> = {};
  try {
    const body = await req.json();
    dates = body?.dates ?? {};
  } catch {
    return NextResponse.json({ ok: false, error: "Données invalides." }, { status: 400 });
  }

  // On ne conserve que les dates valides et non "disponible" (défaut).
  const clean: Record<string, DayStatus> = {};
  for (const [key, val] of Object.entries(dates)) {
    if (
      isRealDate(key) &&
      typeof val === "string" &&
      (VALID as string[]).includes(val) &&
      val !== "disponible"
    ) {
      clean[key] = val as DayStatus;
    }
  }

  if (Object.keys(clean).length > 1000) {
    return NextResponse.json({ ok: false, error: "Trop de dates." }, { status: 400 });
  }

  try {
    await setAvailability({ dates: clean });
  } catch (e) {
    console.error("setAvailability:", e);
    // Échec d'écriture : sur Vercel sans store KV, le backend fichier n'est
    // pas inscriptible (FS en lecture seule) → message explicite.
    const fileBackend = storageInfo().backend === "file";
    return NextResponse.json(
      { ok: false, error: fileBackend ? STORAGE_ERROR : "Échec de l'enregistrement (stockage)." },
      { status: 503 },
    );
  }

  revalidatePath("/");
  return NextResponse.json({ ok: true });
}
