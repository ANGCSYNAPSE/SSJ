"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface Wisdom {
  text: string;
  by: string;
  /** A line in Devanagari (kept as it is when the page is translated). */
  hindi?: boolean;
}

const SLIDE_MS = 5500;

/**
 * "Words of Divine Wisdom": a saying at a time, turning by itself every few seconds (it waits while the pointer or a finger is on
 * it, or the keyboard is on one of its buttons, and it does not turn by itself for anyone who asked for less motion). The arrows
 * and the dots choose a saying by hand; touching or pressing an arrow also restarts the wait.
 */
export default function WisdomCarousel({ items }: { items: Wisdom[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const count = items.length;

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // the wait restarts whenever the saying changes (by itself or by hand)
  useEffect(() => {
    if (paused || reduced || count < 2) return;
    const id = window.setTimeout(() => setIndex((i) => (i + 1) % count), SLIDE_MS);
    return () => window.clearTimeout(id);
  }, [index, paused, reduced, count]);

  const go = (next: number) => setIndex(((next % count) + count) % count);
  const item = items[index];

  return (
    <div
      className="flex w-full items-center justify-between gap-3 sm:gap-6"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
    >
      <button type="button" aria-label="Previous saying" onClick={() => go(index - 1)} className="shrink-0 rounded-full p-2 text-[#3e1815] transition-all hover:bg-[#3e1815]/10 active:scale-90">
        <ChevronLeft className="h-8 w-8" aria-hidden />
      </button>

      <div className="flex min-h-[250px] max-w-[800px] flex-1 flex-col items-center justify-center gap-5 text-center" aria-live="polite">
        <div key={index} className="gs-slide flex flex-col items-center gap-5">
          <p className="text-[80px] leading-[0.1] text-[#e87722] opacity-30" aria-hidden>&ldquo;</p>
          <p className={`font-serif text-2xl font-semibold italic text-[#e47105] sm:text-3xl lg:text-4xl ${item.hindi ? "notranslate" : ""}`} translate={item.hindi ? "no" : undefined}>
            {item.text}
          </p>
          <p className="text-sm font-semibold uppercase text-[#3e1815]">{item.by}</p>
        </div>

        <div className="mt-1 flex items-center gap-2">
          {items.map((_, i) => (
            <button key={i} type="button" aria-label={`Show saying ${i + 1}`} aria-current={i === index} onClick={() => go(i)} className="group p-1">
              <span className={`block h-2 rounded-full transition-all duration-500 ${i === index ? "w-6 bg-[#3e1815]" : "w-2 bg-[#3e1815]/30 group-hover:bg-[#3e1815]/55"}`} />
            </button>
          ))}
        </div>
      </div>

      <button type="button" aria-label="Next saying" onClick={() => go(index + 1)} className="shrink-0 rounded-full p-2 text-[#3e1815] transition-all hover:bg-[#3e1815]/10 active:scale-90">
        <ChevronRight className="h-8 w-8" aria-hidden />
      </button>
    </div>
  );
}
