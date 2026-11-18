import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TopBar from "@/components/layout/TopBar";
import FeeReminder from "@/components/payments/FeeReminder";

/**
 * Marketing and content pages: full chrome.
 *
 * The header is fixed at 112px tall (72px header + the top bar's 40px,
 * both visible at every screen size), so `main` reserves that height.
 * Full-bleed hero sections opt back out with a matching negative margin —
 * keep both in sync.
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
      <main className="flex-1 pt-[112px]">{children}</main>
      <Footer />
      <FeeReminder />
    </div>
  );
}
