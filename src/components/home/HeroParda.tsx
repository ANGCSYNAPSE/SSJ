"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, CalendarDays, HandHeart, Heart, HeartHandshake, Landmark, Map, Users } from "lucide-react";
import SevaPetals, { Diya } from "@/components/seva/SevaPetals";
import "@/components/home/heroParda.css";

const QUICK = [
  { icon: Landmark, title: "Find a Temple", text: "Browse temples", href: "/temple-directory" },
  { icon: CalendarDays, title: "Upcoming Events", text: "Join a satsang near you", href: "/events" },
  { icon: HeartHandshake, title: "Seva Initiatives", text: "Serve with devotion", href: "/initiatives" },
  { icon: Heart, title: "Donate", text: "Support our mission", href: "/donation" },
];

const STATS = [
  { icon: Users, label: "Devotees Connected" },
  { icon: HeartHandshake, label: "Seva Initiatives" },
  { icon: Building2, label: "Temples Associated" },
  { icon: Map, label: "States Covered" },
];

/** The garlands hang across the whole width; all but the three over the dark left side fade once the curtains are open, so none cross Baba Shyam's face. */
const STRANDS = Array.from({ length: 17 }, (_, i) => {
  const x = 2.5 + i * 5.7;
  return { x, h: 50 + ((i * 53) % 7) * 22 + (i % 3 === 0 ? 40 : 0), sw: 4 + (i % 4), sd: -((i * 0.7) % 4), mid: x > 14 };
});

/**
 * The homepage hero "Temple Parda". On every load and refresh the curtains hang closed, then open to reveal Baba Shyam's darshan,
 * and the words rise in; anyone who asked their device for less motion gets the finished scene at once.
 * (The other hero, the carved gateway, is still in the page: switch with HOME_HERO in lib/constants.ts.)
 */
export default function HeroParda() {
  // It starts as "wait": the curtains hang closed (even in the server-rendered page) until Baba Shyam's picture has loaded, so the
  // opening never plays over an empty background on a slow connection. Then "run" plays the opening on every load and refresh.
  const [state, setState] = useState<"wait" | "run" | "done">("wait");
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Only a visitor who asked their device for less motion gets the finished scene at once.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setState("done");
      return;
    }
    const go = () => setState((s) => (s === "wait" ? "run" : s));
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth > 0) go();
    // If the picture is very slow, the curtains still open after a while rather than staying shut.
    const fallback = window.setTimeout(go, 15000);
    return () => window.clearTimeout(fallback);
  }, []);

  return (
    <section className={`hp hp-${state}`} aria-label="Welcome">
      <noscript>
        <style>{".hp-late{opacity:1!important}.hp-dar{filter:none!important}.hp-copy>div>*{opacity:1!important}.hp-curt{transform:scaleX(.1)!important}.hp-greet{opacity:0!important}"}</style>
      </noscript>

      {/* the darshan, behind the curtains */}
      <div className="hp-dar" aria-hidden>
        <div className="hp-darshan">
          <Image ref={imgRef} onLoad={() => setState((s) => (s === "wait" ? "run" : s))} onError={() => setState((s) => (s === "wait" ? "run" : s))} src="/images/home/about-baba.png" alt="" fill priority sizes="(min-width: 1024px) 70vw, 100vw" className="object-cover" />
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
      {/* the greeting in the middle, in namaste, until the curtains open */}
      <div className="hp-greet notranslate" aria-hidden translate="no">
        {/* the blessing hand, cut out of its background */}
        <span className="hp-hand">
          <Image src="/images/home/hero-hand.png" alt="" width={640} height={989} sizes="200px" priority />
        </span>
        <p>॥ जय श्री श्याम ॥</p>
      </div>
      <div className="hp-valance" aria-hidden />
      <div className="hp-garlands" aria-hidden>
        {STRANDS.map((s, i) => (
          <span key={i} className={`hp-strand${s.mid ? " mid" : ""}`} style={{ left: `${s.x}%`, height: s.h, ["--sw" as string]: `${s.sw}s`, ["--sd" as string]: `${s.sd}s` }} />
        ))}
      </div>
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

          <Link href="/about#mission" className="flex w-full max-w-[460px] items-center gap-4 rounded-[17px] border border-[#e0b94f]/60 bg-gradient-to-r from-[#fff1d8] to-[#ffe2ad] px-4 py-3 text-left shadow-[0_14px_34px_rgba(0,0,0,0.45)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.55)] sm:px-5 sm:py-3.5">
            <div className="h-9 w-1 shrink-0 rounded-full bg-[#e47105]" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-extrabold text-[#21170b]">{"Our Mission"}</p>
              <p className="mt-1 text-[11px] leading-[17px] text-[#4a3800] sm:text-xs sm:leading-[18px]">{"To create a global community of devotees united by faith, service and compassion."}</p>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/home/feather.svg" alt="" className="h-12 w-9 shrink-0" aria-hidden />
          </Link>

          {/* the four ways in, as small tags */}
          <div className="flex flex-wrap gap-2 sm:gap-2.5">
            {QUICK.map((q) => (
              <Link key={q.href} href={q.href} className="group inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-2 text-[13px] font-semibold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-[#ffd04f]/70 hover:bg-white/15">
                <q.icon className="h-4 w-4 text-[#ffd04f] transition-transform duration-300 group-hover:scale-110" aria-hidden />
                {q.title}
              </Link>
            ))}
          </div>
        </div>
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
