import { privacySections } from "./privacy";
import { refundSections } from "./refund";
import { termsSections } from "./terms";
import type { LegalDoc, LegalDocKey } from "./types";

export type { LegalDoc, LegalDocKey, LegalSection } from "./types";

/** The three policy documents, in one place, so a page and a pop-up always show exactly the same words. */
export const LEGAL_DOCS: Record<LegalDocKey, LegalDoc> = {
  privacy: {
    key: "privacy",
    title: "Privacy Policy",
    short: "Privacy Policy",
    href: "/privacy-policy",
    intro: "Your trust matters to us. This page explains, in plain words, what we collect, why, and how you stay in control.",
    sections: privacySections,
  },
  terms: {
    key: "terms",
    title: "Terms of Service",
    short: "Terms of Service",
    href: "/terms",
    intro: "The simple rules for being part of the Shyam Jagat community online. Please read them before you register, pay or donate.",
    sections: termsSections,
  },
  refund: {
    key: "refund",
    title: "Refund & Cancellation Policy",
    short: "Refund Policy",
    href: "/refund-policy",
    intro: "What we refund, what we do not, and how long a refund takes. Registration fees and donations are treated differently.",
    sections: refundSections,
  },
};

/** Dates are written out in full so they can never be misread. */
export const LEGAL_UPDATED = "20 November 2026";

export const LEGAL_ORDER: LegalDocKey[] = ["privacy", "terms", "refund"];
