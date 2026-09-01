import type { Metadata } from "next";

export const metadata: Metadata = { title: "Temple Directory - Shyam Jagat" };

export default function TempleDirectoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
