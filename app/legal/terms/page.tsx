import type { Metadata } from "next";
import LegalDocumentPage from "@/components/legal/legal-document-page";
import { getLegalDocument } from "@/lib/legal-documents";

const document = getLegalDocument("terms-of-service");

export const metadata: Metadata = {
  title: document.title,
  description: document.summary,
};

export default function TermsPage() {
  return <LegalDocumentPage slug="terms-of-service" />;
}
