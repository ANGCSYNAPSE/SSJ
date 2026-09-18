import type { Metadata } from "next";

export const metadata: Metadata = { title: "Our Initiatives - Shyam Jagat" };

export default function InitiativesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
