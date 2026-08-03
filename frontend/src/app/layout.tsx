import type { Metadata } from "next";
import "./globals.css";
import AuthProvider from "@/components/auth/AuthProvider";

export const metadata: Metadata = {
  title: {
    default: "Shyam Jagat — Faith, Service, Humanity",
    template: "%s | Shyam Jagat",
  },
  description:
    "Shree Shyam Jagat is a platform dedicated to spreading devotion and serving humanity.",
  icons: { icon: "/favicon.ico" },
};

/**
 * Owns only the document shell and the session. Page chrome differs per
 * section, so the header and footer are chosen by the route group layouts:
 * (site) gets both, (auth) drops the footer.
 */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
