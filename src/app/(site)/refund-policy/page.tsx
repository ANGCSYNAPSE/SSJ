import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { LEGAL_DOCS } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy",
  description: "When registration fees and donations can be refunded, and how long a refund takes.",
};

export default function RefundPage() {
  const doc = LEGAL_DOCS.refund;
  return <LegalPage title={doc.title} intro={doc.intro} sections={doc.sections} />;
}
