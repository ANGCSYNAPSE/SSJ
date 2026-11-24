import type { Metadata } from "next";

// A card is shared by its link, not found through search.
export const metadata: Metadata = {
  title: "Shyam Jagat Digital Card",
  robots: { index: false, follow: false },
};

export default function CardLayout({ children }: { children: React.ReactNode }) {
  return children;
}
