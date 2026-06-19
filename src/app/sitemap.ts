import type { MetadataRoute } from "next";
import { locales, localePath } from "@/i18n/config";

const SITE_URL = "https://villa-retsina.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    const base = localePath(locale); // "" pour fr
    entries.push({
      url: `${SITE_URL}${base || "/"}`,
      changeFrequency: "weekly",
      priority: locale === "fr" ? 1 : 0.8,
    });
    entries.push({
      url: `${SITE_URL}${base}/mentions-legales`,
      changeFrequency: "yearly",
      priority: 0.3,
    });
  }

  return entries;
}
