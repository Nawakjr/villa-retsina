"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error || "Connexion impossible.");
        setLoading(false);
        return;
      }
      router.replace("/admin");
      router.refresh();
    } catch {
      setError("Connexion impossible.");
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-sable px-6">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm rounded-2xl border border-anthracite/10 bg-white p-8 shadow-sm"
      >
        <h1 className="font-serif text-2xl text-anthracite">Administration</h1>
        <p className="mt-1 text-sm text-anthracite/60">Villa Retsina</p>

        <label className="mt-6 block text-sm font-medium text-anthracite">
          Mot de passe
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
            required
            className="mt-2 w-full rounded-xl border border-anthracite/15 bg-sable/40 px-4 py-3 text-sm text-anthracite outline-none transition focus:border-olive focus:bg-white"
          />
        </label>

        {error && <p className="mt-3 text-sm text-bois">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-full bg-olive px-6 py-3 text-sm font-medium uppercase tracking-[0.14em] text-white transition hover:bg-olive-deep disabled:opacity-60"
        >
          {loading ? "Connexion…" : "Se connecter"}
        </button>
      </form>
    </main>
  );
}
