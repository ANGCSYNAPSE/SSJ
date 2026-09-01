import type { Metadata } from "next";

export const metadata: Metadata = { title: "Artist Registration - Shyam Jagat" };

export default function ArtistRegistrationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
