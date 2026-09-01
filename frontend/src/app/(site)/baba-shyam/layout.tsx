import type { Metadata } from "next";

export const metadata: Metadata = { title: "Baba Shyam - Shyam Jagat" };

export default function BabaShyamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
