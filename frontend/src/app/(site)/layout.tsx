import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

/**
 * Marketing and content pages: full chrome.
 *
 * The header is fixed, so `main` reserves its height. The home hero opts back
 * out with a negative margin to sit underneath the transparent bar.
 */
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pt-[72px]">{children}</main>
      <Footer />
    </div>
  );
}
