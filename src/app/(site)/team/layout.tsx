import type { Metadata } from "next";
import Link from "next/link";
import { Hammer } from "lucide-react";

// The Team section is being rebuilt, so search engines are asked to leave it out until it is finished.
export const metadata: Metadata = { robots: { index: false, follow: false } };

/**
 * The Team section (this page and every page under /team) is not finished. Until it is, the content is shown behind a soft
 * haze with a "Coming soon" message that stays in view while the visitor scrolls. To switch the section back on, delete
 * this file: the pages themselves are untouched.
 */
export default function TeamLayout({ children }: { children: React.ReactNode }) {
  return (
    // "clip" trims the blur at the edges without making this a scroll container (which would stop the message staying in view).
    <div className="relative overflow-clip">
      {/* The page behind the haze: blurred, and out of reach of the mouse, keyboard and screen readers. */}
      <div aria-hidden className="pointer-events-none select-none blur-[7px]" {...({ inert: "" } as Record<string, string>)}>
        {children}
      </div>

      <div className="absolute inset-0 z-20 bg-white/35 backdrop-blur-[2px]">
        <div className="sticky top-[calc(50vh-150px)] flex justify-center px-6 pt-10">
          <div
            role="status"
            className="flex w-full max-w-[460px] flex-col items-center gap-3 rounded-3xl border border-[#d4af37]/40 bg-white/95 px-8 py-9 text-center shadow-[0_20px_60px_rgba(0,0,0,0.25)]"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#e47105] text-white shadow-lg">
              <Hammer className="h-7 w-7" aria-hidden />
            </span>
            <span className="rounded-full bg-maroon px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-white">{"Coming Soon"}</span>
            <h2 className="font-serif text-3xl font-bold leading-tight text-[#3e1815]">{"Our Team"}</h2>
            <p className="text-base leading-relaxed text-[#595656]">
              {"This section is under process. We are updating it and will bring it back very soon."}
            </p>
            <Link href="/" className="mt-2 rounded-lg bg-[#e47105] px-6 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90">
              {"Back to Home"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
