/** @type {import('tailwindcss').Config} */
// Tailwind v4 détecte automatiquement les sources et lit le thème depuis
// `@theme` dans globals.css. Ce fichier reste minimal pour compatibilité outillage.
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: { extend: {} },
  plugins: [],
};
