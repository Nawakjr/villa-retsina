import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { buildLegalMetadata } from "@/i18n/metadata";

export const metadata: Metadata = buildLegalMetadata("fr");

export default function MentionsLegales() {
  return <LegalPage locale="fr" />;
}
