import type { Metadata } from "next";
import "./globals.css";
import AuthProvider from "@/components/auth/AuthProvider";
import GTranslateWidget from "@/components/i18n/GTranslateWidget";

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
      <head>
        {/* Noto Serif Devanagari — loaded from the Google Fonts CDN itself
            (not self-hosted via next/font) per explicit request, since the
            self-hosted static-weight build rendered subtly differently from
            the full variable-weight CDN version used in the reference. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+Devanagari:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <GTranslateWidget />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
