import { Resend } from "resend";
import { NextResponse } from "next/server";

/* ── Rate limiting (en mémoire, par IP) ── */
const rateMap = new Map<string, number[]>();
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const hits = (rateMap.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
  hits.push(now);
  rateMap.set(ip, hits);
  return hits.length > RATE_MAX;
}

/* ── Anti-bot : délai minimum de remplissage ── */
const MIN_SUBMIT_DELAY_MS = 3_000;

function isTooFast(formLoadedAt: unknown): boolean {
  const t = Number(formLoadedAt);
  if (!t || Number.isNaN(t)) return true;
  return Date.now() - t < MIN_SUBMIT_DELAY_MS;
}

function isEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

// Détection de charabia : trop peu de voyelles = suspect (bots).
function looksLikeGibberish(s: string) {
  const letters = s.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ]/g, "");
  if (letters.length < 6) return false;
  const vowels = letters.match(/[aeiouàâäéèêëîïôöùûüAEIOUÀÂÄÉÈÊËÎÏÔÖÙÛÜ]/g) || [];
  return vowels.length / letters.length < 0.25;
}

function isValidName(s: string) {
  if (!/^[A-Za-zÀ-ÖØ-öø-ÿ\s\-']{2,50}$/.test(s)) return false;
  return !looksLikeGibberish(s);
}

function isValidPhoneOrEmpty(s: string) {
  if (!s) return true;
  const digits = s.replace(/[^\d]/g, "");
  return digits.length >= 9 && digits.length <= 15;
}

function escapeHtml(s: string) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function clean(v: unknown) {
  return String(v ?? "").trim();
}

export async function POST(req: Request) {
  try {
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded?.split(",")[0]?.trim() || "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { ok: false, error: "Trop de requêtes. Réessayez dans une minute." },
        { status: 429 },
      );
    }

    const body = await req.json();

    // Honeypot — un bot remplit ce champ caché.
    if (clean(body.companyTrap)) return NextResponse.json({ ok: true });
    // Soumission trop rapide = bot.
    if (isTooFast(body._t)) return NextResponse.json({ ok: true });

    const name = clean(body.name);
    const email = clean(body.email);
    const phone = clean(body.phone);
    const dates = clean(body.dates);
    const guests = clean(body.guests);
    const message = clean(body.message);

    if (!isValidName(name)) {
      return NextResponse.json({ ok: false, error: "Nom invalide." }, { status: 400 });
    }
    if (!isEmail(email)) {
      return NextResponse.json({ ok: false, error: "Email invalide." }, { status: 400 });
    }
    if (!isValidPhoneOrEmpty(phone)) {
      return NextResponse.json({ ok: false, error: "Téléphone invalide." }, { status: 400 });
    }
    if (message && (message.length > 5000 || looksLikeGibberish(message))) {
      return NextResponse.json({ ok: false, error: "Message invalide." }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY manquante.");
      return NextResponse.json(
        { ok: false, error: "Service d'envoi indisponible." },
        { status: 503 },
      );
    }
    const resend = new Resend(apiKey);

    const to = process.env.MAIL_TO_CONTACT || "contact@villa-retsina.com";
    const from = process.env.MAIL_FROM || "Villa Retsina <no-reply@villa-retsina.com>";
    const subject = "Villa Retsina — Nouvelle demande";

    const html = `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#243039">
        <h2 style="color:#7c8a5a">${escapeHtml(subject)}</h2>
        <p><b>Nom :</b> ${escapeHtml(name)}</p>
        <p><b>Email :</b> ${escapeHtml(email)}</p>
        <p><b>Téléphone :</b> ${escapeHtml(phone || "-")}</p>
        <p><b>Dates souhaitées :</b> ${escapeHtml(dates || "-")}</p>
        <p><b>Nombre de personnes :</b> ${escapeHtml(guests || "-")}</p>
        <hr/>
        <p style="white-space:pre-wrap">${escapeHtml(message || "-")}</p>
      </div>
    `;

    const { data, error } = await resend.emails.send({
      from,
      to: [to],
      subject,
      replyTo: email,
      html,
    });

    if (error) {
      console.error("RESEND ERROR:", error);
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, id: data?.id });
  } catch (e) {
    console.error("CONTACT ROUTE ERROR:", e);
    return NextResponse.json({ ok: false, error: "Erreur serveur." }, { status: 500 });
  }
}
