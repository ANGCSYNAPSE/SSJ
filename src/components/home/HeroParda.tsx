"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, HandHeart, HeartHandshake, Map, Users } from "lucide-react";
import SevaPetals, { Diya } from "@/components/seva/SevaPetals";
import "@/components/home/heroParda.css";

const STATS = [
  { icon: Users, label: "Devotees Connected" },
  { icon: HeartHandshake, label: "Seva Initiatives" },
  { icon: Building2, label: "Temples Associated" },
  { icon: Map, label: "States Covered" },
];

const SEEN_KEY = "sj-hero-parda-seen";

/** The garlands hang across the whole width; the ones in the middle fade once the curtains are open, so none cross Baba Shyam's face. */
const STRANDS = Array.from({ length: 17 }, (_, i) => {
  const x = 2.5 + i * 5.7;
  return { x, h: 50 + ((i * 53) % 7) * 22 + (i % 3 === 0 ? 40 : 0), sw: 4 + (i % 4), sd: -((i * 0.7) % 4), mid: x > 14 && x < 86 };
});

/**
 * The homepage hero "Temple Parda". On a first visit in a tab the curtains open to reveal Baba Shyam's darshan, and the words rise
 * in; after that, and for anyone who asked their device for less motion, the finished scene is shown at once.
 * (The other hero, the carved gateway, is still in the page: switch with HOME_HERO in lib/constants.ts.)
 */
export default function HeroParda() {
  const [state, setState] = useState<"pending" | "run" | "done">("pending");

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === "1";
    } catch {
      /* a blocked store only means the opening plays each time */
    }
    setState(reduced || seen ? "done" : "run");
    if (reduced || seen) return;
    // The visit counts as seen once the opening has played (not at the start, so a quick reload still shows it).
    const mark = window.setTimeout(() => {
      try {
        sessionStorage.setItem(SEEN_KEY, "1");
      } catch {
        /* nothing to do */
      }
    }, 6500);
    return () => window.clearTimeout(mark);
  }, []);

  return (
    <section className={`hp hp-${state}`} aria-label="Welcome">
      <noscript>
        <style>{".hp-pending{opacity:1!important}.hp-dar{filter:none!important}.hp-copy>div>*{opacity:1!important}.hp-curt{transform:scaleX(.1)!important}"}</style>
      </noscript>

      {/* the darshan, behind the curtains */}
      <div className="hp-dar" aria-hidden>
        <div className="hp-darshan">
          <Image src="/images/home/about-baba.png" alt="" fill priority sizes="(min-width: 1024px) 70vw, 100vw" className="object-cover" />
        </div>
      </div>
      <div className="hp-late hp-shade-l" aria-hidden />
      <div className="hp-late hp-shade-v" aria-hidden />
      <div className="hp-late hp-aura" aria-hidden />
      <div className="hp-shimmer" aria-hidden>
        <i />
      </div>
      <div className="hp-petals" aria-hidden>
        <SevaPetals count={14} />
      </div>

      {/* the curtains, the valance, the garlands and the lamps */}
      <div className="hp-curt l" aria-hidden>
        <span className="gold" />
        <span className="fringe" />
      </div>
      <div className="hp-curt r" aria-hidden>
        <span className="gold" />
        <span className="fringe" />
      </div>
      <div className="hp-cue notranslate" aria-hidden translate="no">
        ॥ जय श्री श्याम ॥
      </div>
      <div className="hp-valance" aria-hidden />
      <div className="hp-garlands" aria-hidden>
        {STRANDS.map((s, i) => (
          <span key={i} className={`hp-strand${s.mid ? " mid" : ""}`} style={{ left: `${s.x}%`, height: s.h, ["--sw" as string]: `${s.sw}s`, ["--sd" as string]: `${s.sd}s` }} />
        ))}
      </div>
      <span className="hp-lamp l" aria-hidden>
        <Diya className="block h-full w-full" />
      </span>
      <span className="hp-lamp r" aria-hidden>
        <Diya className="block h-full w-full" />
      </span>

      {/* the words */}
      <div className="hp-copy">
        <div>
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#ffd04f]/50 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#ffe08a] backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-[#ffd04f] shadow-[0_0_10px_#ffd04f]" aria-hidden />
            {"Jai Shree Shyam"}
          </span>
          <h1 className="flex flex-wrap items-baseline gap-x-[0.28em] font-serif font-extrabold leading-[1.08] drop-shadow-[0_4px_14px_rgba(0,0,0,0.55)] text-[clamp(3rem,6.4vw,6.2rem)]">
            <span className="text-[#ff9b19]">सहयोग</span>
            <span className="text-white">सेवा</span>
            <span className="text-[#ffd04f]">समर्पण</span>
          </h1>
          <p className="max-w-[520px] text-base font-medium leading-relaxed text-white/90 [text-shadow:0_2px_10px_rgba(0,0,0,0.8)] sm:text-lg">
            {"Shree Shyam Jagat is a platform dedicated to spreading devotion and serving humanity"}
          </p>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <Link href="/signup" className="group inline-flex h-12 items-center gap-3 rounded-2xl bg-gradient-to-r from-[#f47700] to-[#ff9417] px-6 text-[15px] font-bold text-white shadow-[0_14px_34px_rgba(244,119,0,0.45)] transition-all hover:-translate-y-0.5 hover:brightness-110 sm:h-14 sm:px-8 sm:text-base">
              {"Become a Member"}
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
            <Link href="/#give-seva" className="group inline-flex h-12 items-center gap-3 rounded-2xl border-2 border-[#ffd04f] bg-white/10 px-5 text-[15px] font-bold text-[#ffe08a] backdrop-blur transition-all hover:-translate-y-0.5 hover:bg-[#ffd04f] hover:text-[#4a0e0e] sm:h-14 sm:px-7 sm:text-base">
              <HandHeart className="h-5 w-5" aria-hidden />
              {"Give Seva"}
            </Link>
          </div>
        </div>
      </div>

      {/* the four small labels, over the foot of the hero (on a phone they sit just below it) */}
      <div className="hp-stats hidden sm:block">
        <HeroStats />
      </div>
    </section>
  );
}

/** The four small text-only labels: there are no numbers to claim. */
export function HeroStats({ className = "", light = false }: { className?: string; light?: boolean }) {
  return (
    <div className={`grid grid-cols-2 gap-3 lg:grid-cols-4 ${className}`}>
      {STATS.map((s) => (
        <div key={s.label} className={`flex items-center gap-3 rounded-2xl border px-4 py-3 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 ${light ? "border-[#e0b94f]/50 bg-white text-[#3e1815] shadow-[0_8px_20px_rgba(107,31,31,0.07)]" : "border-white/25 bg-white/10 text-white hover:border-[#ffd04f]/70"}`}>
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f47700]">
            <s.icon className="h-[18px] w-[18px]" aria-hidden />
          </span>
          <span className="text-[13px] font-bold leading-tight">{s.label}</span>
        </div>
      ))}
    </div>
  );
}
