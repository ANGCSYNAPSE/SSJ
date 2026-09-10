import type { Metadata } from "next";

export const metadata: Metadata = { title: "Musician Registration - Shyam Jagat" };

export default function MusicianRegistrationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
