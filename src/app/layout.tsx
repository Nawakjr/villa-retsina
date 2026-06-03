import "./globals.css";
import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const SITE_URL = "https://villa-retsina.com";
const SITE_NAME = "Villa Retsina";
const TITLE = "Villa Retsina — Maison avec vue panoramique à Kamilari, Crète Sud";
const DESCRIPTION =
  "Villa Retsina : maison familiale sur deux niveaux avec vue panoramique à Kamilari, au sud de la Crète. Calme, authenticité, plages et tavernes à proximité.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: "%s · Villa Retsina" },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "Villa Retsina",
    "location villa Crète",
    "Kamilari",
    "Crète du Sud",
    "maison de vacances Crète",
    "villa vue panoramique",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  name: SITE_NAME,
  description: DESCRIPTION,
  url: SITE_URL,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kamilari",
    addressRegion: "Crète",
    addressCountry: "GR",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={`${cormorant.variable} ${inter.variable} bg-white text-anthracite antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
