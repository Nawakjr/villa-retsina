import { NextResponse } from "next/server";
import { setSession } from "@/lib/auth";

/* Limitation simple des tentatives par IP (anti-bruteforce). */
const attempts = new Map<string, number[]>();
const WINDOW_MS = 5 * 60_000;
const MAX_ATTEMPTS = 10;

function tooManyAttempts(ip: string): boolean {
  const now = Date.now();
  const hits = (attempts.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  hits.push(now);
  attempts.set(ip, hits);
  return hits.length > MAX_ATTEMPTS;
}

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (tooManyAttempts(ip)) {
    return NextResponse.json(
      { ok: false, error: "Trop de tentatives. Réessayez dans quelques minutes." },
      { status: 429 },
    );
  }

  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    return NextResponse.json(
      { ok: false, error: "ADMIN_PASSWORD n'est pas configuré sur le serveur." },
      { status: 500 },
    );
  }

  let password = "";
  try {
    const body = await req.json();
    password = typeof body?.password === "string" ? body.password : "";
  } catch {
    /* ignore */
  }

  if (password !== expected) {
    return NextResponse.json(
      { ok: false, error: "Mot de passe incorrect." },
      { status: 401 },
    );
  }

  await setSession();
  return NextResponse.json({ ok: true });
}
