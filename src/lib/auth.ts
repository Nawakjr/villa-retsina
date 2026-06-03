import "server-only";
import crypto from "crypto";
import { cookies } from "next/headers";

/**
 * Authentification minimale de l'admin par mot de passe unique.
 * Le mot de passe (`ADMIN_PASSWORD`) n'est jamais stocké côté client : on pose
 * un cookie httpOnly contenant un jeton HMAC dérivé d'un secret serveur.
 */

export const COOKIE_NAME = "villa_admin";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 jours

function secret() {
  return (
    process.env.ADMIN_SECRET ||
    process.env.ADMIN_PASSWORD ||
    "villa-retsina-dev-secret"
  );
}

export function makeToken(): string {
  return crypto
    .createHmac("sha256", secret())
    .update("villa-admin-session-v1")
    .digest("hex");
}

export async function isAuthed(): Promise<boolean> {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  if (!token) return false;
  const expected = makeToken();
  // comparaison à temps constant
  const a = Buffer.from(token);
  const b = Buffer.from(expected);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export async function setSession(): Promise<void> {
  const store = await cookies();
  store.set(COOKIE_NAME, makeToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function clearSession(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}
