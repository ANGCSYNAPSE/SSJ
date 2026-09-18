import type { Metadata } from "next";

export const metadata: Metadata = { title: "Artists Directory - Shyam Jagat" };

export default function ArtistsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
