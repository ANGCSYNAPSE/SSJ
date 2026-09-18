import type { Metadata } from "next";

export const metadata: Metadata = { title: "Donate - Shyam Jagat" };

export default function DonationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
