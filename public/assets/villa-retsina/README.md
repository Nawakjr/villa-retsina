# Visuels — Villa Retsina

Dépose ici les vraies photos de la villa. Tant qu'un fichier n'est pas présent
et son `src` non renseigné, le site affiche un **placeholder dégradé**
(composant [`src/components/Media.tsx`](../../../src/components/Media.tsx)).

## Comment activer une photo

1. Déposer le fichier dans ce dossier (`public/assets/villa-retsina/`).
2. Ouvrir [`src/data/villa.ts`](../../../src/data/villa.ts) et **décommenter / renseigner**
   le champ `src` correspondant, par exemple :

   ```ts
   src: "/assets/villa-retsina/hero-terrasse.jpg",
   ```

Le chemin commence toujours par `/assets/villa-retsina/` (le dossier `public/`
est servi à la racine du site).

## Images attendues

| Fichier                   | Emplacement sur le site            | Dimensions min. recommandées | Statut       |
| ------------------------- | ---------------------------------- | ---------------------------- | ------------ |
| `hero-terrasse.jpg`       | Hero — slide 1                     | **2400 × 1600**              | ✅ déposé    |
| `hero-vue.jpg`            | Hero — slide 2                     | **2400 × 1600**              | ✅ déposé    |
| `jardin.jpg`              | Hero — slide 3 + galerie           | **2400 × 1600**              | ✅ déposé    |
| `rdc-salon.jpg`           | Section Rez-de-chaussée + galerie  | **1600 × 1200**              | ✅ déposé    |
| `rdc-chambre-1.jpg`       | Galerie                            | **1600 × 1200**              | ✅ déposé    |
| `rdc-chambre-2.jpg`       | Galerie                            | **1600 × 1200**              | ✅ déposé    |
| `etage-salon.jpg`         | Section Étage + galerie            | **1600 × 1200**              | ✅ déposé    |
| `etage-chambre.jpg`       | Galerie                            | **1600 × 1200**              | ✅ déposé    |
| `terrasse-principale.jpg` | Galerie                            | **1600 × 1200**              | ✅ déposé    |
| `terrasse-etage.jpg`      | Galerie                            | **1600 × 1200**              | ✅ déposé    |
| `kamilari-village.jpg`    | Section Kamilari                   | **1600 × 1200**              | ✅ déposé    |

> Toutes les images sont en **JPEG compressé** (Squoosh).
> Variantes déposées non utilisées par défaut : `hero-vue2.jpg`, `etage-salon2.jpg`
> (alternatives — non référencées dans `villa.ts`).

### Galeries étendues

Au-delà des images de base ci-dessus, deux galeries supplémentaires sont
alimentées dans [`src/data/villa.ts`](../../../src/data/villa.ts) :

- **`gallery`** (section Galerie) : photos détaillées de la villa — terrasses,
  rez-de-chaussée, étage (`vue-terrasse-*`, `rdc-cheminee`, `vue-chambre-rdc`,
  `salle-de-bain-*`, `acces-etage*`, `vue-etage`, etc.).
- **`surroundings`** (galerie « Kamilari & alentours ») : `kamilari-001…008`,
  `kamilari-place-acropolis`, `fete-village-kamilari`, `plage-kalamaki(-2)`,
  `plage-lentas`, `plage-triopetra`, `faestos`.

Pour ajouter une photo : la déposer ici puis ajouter une entrée dans le tableau
correspondant de `villa.ts`.

> ⚠️ À convertir : `vue etage cuisine.png` (5,3 Mo, non compressé, espaces dans
> le nom) n'est **pas** utilisée. La passer en JPEG via Squoosh, la renommer
> (ex. `etage-cuisine.jpg`) puis l'ajouter à `gallery` si souhaité.

### Repères

- **Hero** : 2400 × 1600 minimum (affiché plein écran, format paysage).
- **Galerie** : 1600 × 1200 minimum (format 4:3, comme l'affichage des vignettes).
- **Miniatures** : générées automatiquement par `next/image` (responsive,
  formats modernes, lazy-loading) — inutile de produire des versions réduites.

## Recommandations performance (Lighthouse)

- Privilégier des **JPEG bien compressés** (qualité ~80) ; `next/image` se
  charge de servir WebP/AVIF selon le navigateur.
- Outils : [Squoosh](https://squoosh.app) ou [TinyPNG](https://tinypng.com).
- Garder le **ratio 4:3** pour les photos de galerie et de sections afin
  d'éviter les recadrages.
