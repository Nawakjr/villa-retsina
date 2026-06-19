import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteHome from "@/components/SiteHome";
import { isLocale, locales, defaultLocale, type Locale } from "@/i18n/config";
import { buildHomeMetadata } from "@/i18n/metadata";

export const revalidate = 300;

export function generateStaticParams() {
  return locales
    .filter((l) => l !== defaultLocale)
    .map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale) || locale === defaultLocale) return {};
  return buildHomeMetadata(locale);
}

export default async function LocaleHome({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale) || locale === defaultLocale) notFound();
  return <SiteHome locale={locale as Locale} />;
}
