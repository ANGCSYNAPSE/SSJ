export interface LegalSection {
  id: string;
  title: string;
  /** Paragraphs and bullet lists, in order. A string is a paragraph; an array is a bullet list. */
  body: (string | string[])[];
}

export type LegalDocKey = "privacy" | "terms" | "refund";

export interface LegalDoc {
  key: LegalDocKey;
  /** The page heading. */
  title: string;
  /** A short name for tabs and links. */
  short: string;
  href: string;
  intro: string;
  sections: LegalSection[];
}
