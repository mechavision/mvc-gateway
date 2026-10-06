import type { Metadata } from "next";
import LegalDocumentPage from "@/components/legal/legal-document-page";
import { getLegalDocument } from "@/lib/legal-documents";

const document = getLegalDocument("privacy-policy");

export const metadata: Metadata = {
  title: `${document.title} | The Mechanical Vision Corporation`,
  description: document.summary,
};

export default function PrivacyPage() {
  return <LegalDocumentPage slug="privacy-policy" />;
}
