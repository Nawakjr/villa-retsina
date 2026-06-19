import type { Metadata } from "next";
import SiteHome from "@/components/SiteHome";
import { buildHomeMetadata } from "@/i18n/metadata";

export const revalidate = 300;

export const metadata: Metadata = buildHomeMetadata("fr");

export default function Home() {
  return <SiteHome locale="fr" />;
}
