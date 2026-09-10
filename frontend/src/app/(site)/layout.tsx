import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TopBar from "@/components/layout/TopBar";

/**
 * Marketing and content pages: full chrome.
 *
 * The header is fixed at 100px tall (140px from `lg` up, once the top bar's
 * 40px is added), so `main` reserves that height. Full-bleed hero sections
 * opt back out with a matching negative margin — keep both in sync.
 */
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <TopBar />
      <Header />
      <main className="flex-1 pt-[100px] lg:pt-[140px]">{children}</main>
      <Footer />
    </div>
  );
}
