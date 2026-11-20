import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { LEGAL_DOCS } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The rules for using the Shyam Jagat website, registering, paying the registration fee and donating.",
};

export default function TermsPage() {
  const doc = LEGAL_DOCS.terms;
  return <LegalPage title={doc.title} intro={doc.intro} sections={doc.sections} />;
}
