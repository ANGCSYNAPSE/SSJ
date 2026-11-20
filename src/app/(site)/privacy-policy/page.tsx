import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { LEGAL_DOCS } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "What information Shyam Jagat collects, why, who it is shared with, and the choices you have.",
};

export default function PrivacyPage() {
  const doc = LEGAL_DOCS.privacy;
  return <LegalPage title={doc.title} intro={doc.intro} sections={doc.sections} />;
}
