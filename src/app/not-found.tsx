import Link from "next/link";
import Image from "next/image";
import { Home, Phone } from "lucide-react";
import AdSlot from "@/components/ui/AdSlot";

const quickLinks = [
  { href: "/temple-directory", label: "Temples Directory" },
  { href: "/artist-registration", label: "Artist Registration" },
  { href: "/donation", label: "Donate Now", active: true },
  { href: "/events", label: "Upcoming Events" },
];

export default function NotFound() {
  return (
    <>
      <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#fdf6ec] px-6 py-16 text-center">
        <Image src="/images/404/bg.png" alt="" fill sizes="100vw" className="object-cover" />
        <div className="relative flex flex-col items-center gap-4">
          <p className="bg-gradient-to-b from-[#6b1f1f] to-[#e87722] bg-clip-text font-serif text-[96px] font-extrabold leading-none text-transparent sm:text-[128px]">
            404
          </p>
          <div className="flex max-w-[720px] flex-col items-center gap-4">
            <h1 className="font-serif text-3xl font-bold text-[#3e1815] sm:text-[42px]">
              Oops! This Path Leads Nowhere
            </h1>
            <p className="text-base leading-[26px] text-[#444]">
              The page you are looking for may have been moved, deleted, or perhaps it never existed. Like a pilgrim seeking the right path, let us guide you back to light and devotion.
            </p>
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-5">
            <Link
              href="/"
              className="flex items-center gap-2 rounded-full bg-[#e47105] px-8 py-3.5 text-base font-semibold text-white shadow-[0_8px_8px_rgba(232,119,34,0.2)] transition-opacity hover:opacity-90"
            >
              Return to Home
              <Home className="h-[18px] w-[18px]" aria-hidden />
            </Link>
            <Link
              href="/contact"
              className="flex items-center gap-2 rounded-full border-2 border-[#6b1f1f] px-8 py-3.5 text-base font-semibold text-[#6b1f1f] transition-colors hover:bg-[#6b1f1f]/5"
            >
              Contact Support
              <Phone className="h-[18px] w-[18px]" aria-hidden />
            </Link>
          </div>
          <Image
            src="/images/404/lotus-divider.svg"
            alt=""
            width={400}
            height={32}
            unoptimized
            className="mt-8 h-8 w-[400px]"
          />
          <div className="flex flex-col items-center gap-4">
            <p className="text-[15px] font-semibold text-[#595656]">
              YOU MIGHT BE LOOKING FOR:
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={
                    link.active
                      ? "rounded-full bg-[#e47105] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_4px_4px_rgba(228,113,5,0.15)]"
                      : "rounded-full border border-[#d4af37]/25 bg-white px-5 py-2.5 text-sm font-medium text-[#3e1815] transition-colors hover:bg-[#fdf6ec]"
                  }
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AD - LEADERBOARD */}
      <AdSlot size="leaderboard" />
    </>
  );
}
