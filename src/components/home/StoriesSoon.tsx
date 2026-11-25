"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Diya } from "@/components/seva/SevaPetals";

const CARDS = [
  { hue: "from-[#e9c9a0] to-[#d9a977]", pill: "w-24", lines: ["w-full", "w-[92%]", "w-[60%]"], name: "w-32" },
  { hue: "from-[#e6b7a4] to-[#cf8a73]", pill: "w-28", lines: ["w-full", "w-[88%]", "w-[70%]"], name: "w-28" },
  { hue: "from-[#d9c7a1] to-[#c2a468]", pill: "w-20", lines: ["w-[96%]", "w-full", "w-[52%]"], name: "w-36" },
  { hue: "from-[#e7c2b0] to-[#c98b78]", pill: "w-24", lines: ["w-full", "w-[84%]", "w-[66%]"], name: "w-28" },
  { hue: "from-[#dcc9a6] to-[#c9ad70]", pill: "w-28", lines: ["w-[94%]", "w-full", "w-[58%]"], name: "w-32" },
];

/**
 * "Success Stories" before there are any: a row of story cards you can scroll (swipe, or use the arrows and dots), shown out
 * of focus, with a calm note over them that the first stories are on their way. Nothing here is a real person or a made-up
 * quote; when real stories are ready, they replace these cards one by one.
 */
export default function StoriesSoon() {
  const scroller = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  // how many places the row can rest at (on a wide screen three cards show at once, so there are fewer)
  const [positions, setPositions] = useState(CARDS.length);

  const step = useCallback(() => {
    const el = scroller.current;
    const first = el?.firstElementChild as HTMLElement | null;
    return first ? first.offsetWidth + 24 : 320;
  }, []);

  const onScroll = useCallback(() => {
    const el = scroller.current;
    if (el) setIndex(Math.round(el.scrollLeft / step()));
  }, [step]);

  useEffect(() => {
    const measure = () => {
      const el = scroller.current;
      if (el) setPositions(Math.max(1, Math.round((el.scrollWidth - el.clientWidth) / step()) + 1));
      onScroll();
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [onScroll, step]);

  const go = (i: number) => scroller.current?.scrollTo({ left: Math.max(0, Math.min(positions - 1, i)) * step(), behavior: "smooth" });

  return (
    <div className="flex flex-col gap-8">
      <div className="relative">
        {/* the cards: out of focus, but they scroll like real ones */}
        <div
          ref={scroller}
          onScroll={onScroll}
          aria-hidden
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {CARDS.map((c, i) => (
            <div key={i} className="relative flex w-[86%] shrink-0 snap-start flex-col gap-5 overflow-hidden rounded-3xl border border-[#d4af37]/25 bg-[#fffbf3] p-7 shadow-[0_12px_16px_rgba(139,0,0,0.05)] sm:w-[calc(50%-12px)] lg:w-[calc((100%-48px)/3)]">
              <span aria-hidden className="pointer-events-none absolute -right-2 -top-6 select-none font-serif text-[120px] font-bold leading-none text-[#e47105]/15">&rdquo;</span>
              <div className="flex items-center gap-4 blur-[6px]">
                <span className={`h-16 w-16 shrink-0 rounded-full bg-gradient-to-br ${c.hue} ring-4 ring-[#e47105]/20`} />
                <div className="flex flex-col gap-2.5">
                  <span className={`h-4 rounded-full bg-[#3e1815]/70 ${c.name}`} />
                  <span className={`h-5 rounded-full bg-[#7b2d2d] ${c.pill}`} />
                </div>
              </div>
              <div className="flex gap-1 blur-[5px]">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} className="h-4 w-4 fill-[#e47105] text-[#e47105]" />
                ))}
              </div>
              <div className="flex flex-col gap-3 blur-[6px]">
                {c.lines.map((w, k) => (
                  <span key={k} className={`h-3 rounded-full bg-[#3e1815]/45 ${w}`} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* the note over them */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-4">
          <div className="pointer-events-auto flex max-w-[460px] flex-col items-center gap-3 rounded-3xl border border-[#e0b94f]/70 bg-white/80 px-7 py-7 text-center shadow-[0_24px_60px_rgba(107,31,31,0.22)] backdrop-blur-md">
            <Diya className="h-11 w-11" />
            <p className="font-serif text-2xl font-bold leading-tight text-[#3e1815]">{"Our first stories will be with you soon"}</p>
            <p className="text-[15px] leading-relaxed text-[#595656]">{"Our seva is just beginning. When the people we serve and the people who serve share their story, you will read it here."}</p>
            <Link href="/signup?register=volunteer" className="mt-1 rounded-xl bg-gradient-to-r from-[#f47700] to-[#ff9417] px-6 py-2.5 text-sm font-bold text-white shadow-[0_10px_22px_rgba(244,119,0,0.35)] transition-transform hover:-translate-y-0.5">
              {"Be part of the first story"}
            </Link>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button type="button" aria-label="Previous stories" onClick={() => go(index - 1)} disabled={index <= 0} className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d4af37]/40 bg-white transition-all hover:bg-[#fff1d8] active:scale-90 disabled:opacity-40">
          <ChevronLeft className="h-5 w-5 text-[#3e1815]" aria-hidden />
        </button>
        <div className="flex items-center gap-2.5">
          {Array.from({ length: positions }, (_, i) => (
            <button key={i} type="button" aria-label={`Go to stories ${i + 1}`} onClick={() => go(i)} className="p-1">
              <span className={`block h-2 rounded-full transition-all duration-500 ${i === index ? "w-6 bg-[#e47105]" : "w-2 bg-[#d4af37]"}`} />
            </button>
          ))}
        </div>
        <button type="button" aria-label="Next stories" onClick={() => go(index + 1)} disabled={index >= positions - 1} className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d4af37]/40 bg-white transition-all hover:bg-[#fff1d8] active:scale-90 disabled:opacity-40">
          <ChevronRight className="h-5 w-5 text-[#3e1815]" aria-hidden />
        </button>
      </div>
    </div>
  );
}
