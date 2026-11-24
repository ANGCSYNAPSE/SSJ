import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import DevotionHero from "@/components/darshan/DevotionHero";
import DevotionIcon from "@/components/darshan/DevotionIcon";
import LiveDarshanCard from "@/components/darshan/LiveDarshanCard";
import { DARSHAN_ITEM, DEVOTION_ITEMS } from "@/lib/data/devotion";

export const metadata: Metadata = {
  title: "All Aarti - Chalisa, Bhajan, Katha, Darshan and Yatra",
  description: "Aarti timings, darshan aarti, Chalisa, bhajan, the story of Barbarik, the Falgun Mela and the Khatushyamji yatra.",
};

export default function AartiHubPage() {
  return (
    <>
      <DevotionHero
        title="All Aarti"
        hindi="आरती · चालीसा · भजन · कथा · दर्शन · मेला · यात्रा"
        intro="Everything for the daily devotion of Baba Shyam in one place: the aarti timings, the darshan aarti, the Chalisa, bhajans, the katha, the Falgun Mela and the yatra to Khatushyamji."
      />

      <section className="bg-[#fdf6ec] px-6 py-14 lg:px-[108px] lg:py-20">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-10">
          <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            <Link
              href="/aarti/darshan"
              className="group flex flex-col justify-between gap-6 rounded-2xl border border-[#d4af37]/30 bg-white p-8 shadow-[0_12px_30px_rgba(139,0,0,0.06)] transition-shadow hover:shadow-[0_16px_36px_rgba(139,0,0,0.12)]"
            >
              <div className="flex items-start gap-5">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#e87722] text-white">
                  <DevotionIcon kind={DARSHAN_ITEM.icon} className="h-7 w-7" />
                </span>
                <div>
                  <h2 className="font-serif text-3xl font-bold text-[#3e1815]">{DARSHAN_ITEM.title}</h2>
                  <p className="notranslate hindi-sub mt-1 text-lg text-[#e47105]" translate="no">
                    {DARSHAN_ITEM.hindi}
                  </p>
                  <p className="mt-3 max-w-[520px] text-base leading-relaxed text-[#595656]">{DARSHAN_ITEM.blurb}</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-2 text-sm font-bold text-[#e47105]">
                {"See the timings"}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
              </span>
            </Link>
            <LiveDarshanCard className="border border-[#d4af37]/30 shadow-[0_12px_30px_rgba(139,0,0,0.06)]" />
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {DEVOTION_ITEMS.map((item) => {
              const needsText = item.verses !== undefined && item.verses.length === 0;
              return (
                <Link
                  key={item.slug}
                  href={`/aarti/${item.slug}`}
                  className="group flex flex-col gap-4 rounded-2xl border border-[#d4af37]/25 bg-white p-6 shadow-[0_12px_16px_rgba(139,0,0,0.05)] transition-shadow hover:shadow-[0_16px_26px_rgba(139,0,0,0.12)]"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e87722] text-white shadow-[0_10px_12px_rgba(232,119,34,0.2)]">
                    <DevotionIcon kind={item.icon} className="h-7 w-7" />
                  </span>
                  <div>
                    <h3 className="font-serif text-[22px] font-bold text-[#3e1815]">{item.title}</h3>
                    <p className="notranslate hindi-sub text-sm text-[#e47105]" translate="no">
                      {item.hindi}
                    </p>
                  </div>
                  <p className="text-sm leading-[22px] text-[#595656]">{item.blurb}</p>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-sm font-bold text-[#e47105]">
                      {"Open"}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                    </span>
                    {needsText && <span className="rounded-full bg-[#fdf6ec] px-2.5 py-1 text-[11px] font-semibold text-[#8a6100]">{"Full text coming soon"}</span>}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
