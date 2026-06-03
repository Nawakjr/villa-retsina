# Villa Retsina

Site vitrine premium présentant la **Villa Retsina** à Kamilari, Crète Sud.
Construit sur la même base technique que `kowaa-landing`.

## Stack

- **Next.js 16** (App Router) · **React 19** · **TypeScript**
- **Tailwind CSS v4** (thème en `@theme` dans `globals.css`)
- **Resend** pour le formulaire de contact (`/api/contact`)
- Animations légères maison (`RevealOnView`, IntersectionObserver) — pas de lib externe
- Optimisé Vercel (offre gratuite) · mobile-first · statique au maximum

## Démarrage

```bash
npm install
cp .env.local.example .env.local   # puis renseigner les clés
npm run dev
```

## Variables d'environnement

| Variable          | Rôle                                              |
| ----------------- | ------------------------------------------------- |
| `RESEND_API_KEY`  | Clé API Resend (envoi des emails de contact)      |
| `MAIL_TO_CONTACT` | Adresse destinataire des demandes                 |
| `MAIL_FROM`       | Expéditeur (domaine vérifié dans Resend)          |

> Sans clé Resend, le site fonctionne ; seul l'envoi du formulaire échoue.

## Structure

```
src/
  app/        layout · page · globals.css · robots · sitemap · api/contact
  components/ Navbar Hero Intro LevelsSection Gallery KamilariSection
              PricingSection AvailabilitySection ContactSection Footer
              RevealOnView Media Icons
  data/       villa.ts · pricing.ts · availability.ts   (tout le contenu éditable)
public/assets/villa-retsina/   visuels (placeholders tant qu'absents — voir README dédié)
```

## Contenu & visuels

- **Textes / sections** : `src/data/villa.ts`
- **Tarifs** : `src/data/pricing.ts`
- **Calendrier (lecture seule)** : `src/data/availability.ts`
- **Photos** : voir `public/assets/villa-retsina/README.md`

## Déploiement Vercel

1. Importer le repo dans Vercel.
2. Ajouter `RESEND_API_KEY`, `MAIL_TO_CONTACT`, `MAIL_FROM`.
3. Deploy (build Next standard, aucune config supplémentaire).
