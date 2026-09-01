import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

/**
 * Marketing and content pages: full chrome.
 *
 * The header is fixed at 100px tall, so `main` reserves that height. Full-bleed
 * hero sections opt back out with a matching negative margin.
 */
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pt-[100px]">{children}</main>
      <Footer />
    </div>
  );
}
