import type { Metadata } from "next";

export const metadata: Metadata = { title: "Sacred Events & Celebrations - Shyam Jagat" };

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
