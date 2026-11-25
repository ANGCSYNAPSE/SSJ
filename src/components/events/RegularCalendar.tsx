"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CalendarHeart, Clock, Flag, Flower2, Lamp, MapPin, Sunrise } from "lucide-react";
import { AARTI_TIMES, SEASONS, TIMINGS_NOTE, currentSeason, type Season } from "@/lib/data/darshan";
import SourceNote from "@/components/ui/SourceNote";

const ROWS = [
  {
    cadence: "Every day",
    icon: Lamp,
    tone: "#c2570c",
    title: "Five aartis at Shri Shyam Mandir",
    when: "Mangala, Shringar, Bhog, Sandhya and Shayan, at the times listed on the left",
    where: "Khatushyamji, Sikar, Rajasthan",
    href: "/aarti/darshan",
    cta: "Timings and live darshan",
  },
  {
    cadence: "Twice a month",
    icon: Flower2,
    tone: "#0f766e",
    title: "Ekadashi, the day of Baba Shyam",
    when: "The 11th day of each lunar fortnight. Devotees fast, pray and travel to the temple",
    where: "Khatushyamji, and Shyam mandirs everywhere",
    href: "/events/ekadashi-darshan",
    cta: "Know more",
  },
  {
    cadence: "Every year",
    icon: CalendarHeart,
    tone: "#9b2335",
    title: "Baba Shyam Janmotsav",
    when: "Kartik Shukla Ekadashi (Dev Uthani Ekadashi), usually in November",
    where: "Khatushyamji, and Shyam mandirs everywhere",
    href: "/events/baba-shyam-janmotsav",
    cta: "Know more",
  },
  {
    cadence: "Every year",
    icon: Flag,
    tone: "#3b4a9e",
    title: "Falgun Mela",
    when: "Phalguna (February–March), main days around Shukla Ekadashi and Dwadashi",
    where: "Khatushyamji, Sikar, Rajasthan",
    href: "/events/khatu-shyam-falgun-mela",
    cta: "Know more",
  },
];

/**
 * "The Regular Dharmik Calendar": what comes round again and again for a devotee of Baba Shyam. On the left, the five aartis of
 * every day with the times in force today (from the temple's timetable in lib/data/darshan.ts); on the right, the observances of
 * the fortnight and the year. Everything here is regular, so nothing on it can be out of date; the lunar dates are announced by
 * the temple committee, and the page says so.
 */
export default function RegularCalendar() {
  const [season, setSeason] = useState<Season>("winter");
  useEffect(() => setSeason(currentSeason()), []);

  return (
    <div className="flex flex-col gap-10 lg:flex-row lg:items-start">
      <div className="flex w-full flex-col gap-5 rounded-2xl border border-[rgba(212,175,55,0.35)] bg-white p-7 shadow-[0px_12px_16px_rgba(139,0,0,0.05)] sm:p-8 lg:w-[460px] lg:shrink-0">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#f47700] to-[#ff9417] text-white">
            <Sunrise className="h-5 w-5" aria-hidden />
          </span>
          <div>
            <p className="font-serif text-xl font-bold text-[#3e1815]">{"Every day at the temple"}</p>
            <p className="text-xs font-semibold uppercase tracking-wide text-[#e47105]">{`${SEASONS[season].label} timings (${SEASONS[season].months})`}</p>
          </div>
        </div>

        <ul className="flex flex-col divide-y divide-[#f0e3cc]">
          {AARTI_TIMES.map((a) => (
            <li key={a.key} className="flex items-center justify-between gap-3 py-3">
              <span className="flex items-center gap-3">
                <Clock className="h-4 w-4 shrink-0 text-[#e47105]" aria-hidden />
                <span>
                  <span className="block text-[15px] font-semibold text-[#3e1815]">{a.name}</span>
                  <span className="notranslate hindi-sub block text-xs text-[#8a6b6b]" translate="no">{a.hindi}</span>
                </span>
              </span>
              <span className="rounded-full bg-[#fff1d8] px-3.5 py-1.5 text-sm font-bold text-[#9a4b06]">{a[season]}</span>
            </li>
          ))}
        </ul>
        <p className="rounded-lg bg-[#fdf6ec] px-3 py-2.5 text-xs leading-relaxed text-[#6b4f4f]">{TIMINGS_NOTE}</p>
        <SourceNote />
      </div>

      <ul className="flex flex-1 flex-col gap-4">
        {ROWS.map((row) => (
          <li key={row.title}>
            <Link
              href={row.href}
              className="group relative flex items-center gap-5 overflow-hidden rounded-2xl border border-[rgba(212,175,55,0.35)] bg-white p-5 shadow-[0px_8px_8px_rgba(139,0,0,0.02)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_34px_rgba(107,31,31,0.12)]"
            >
              <span aria-hidden className="absolute inset-y-0 left-0 w-1.5" style={{ background: row.tone }} />
              <span className="ml-1 flex w-[84px] shrink-0 flex-col items-center justify-center gap-1.5 rounded-xl p-3 text-white" style={{ background: `linear-gradient(150deg, ${row.tone}, color-mix(in srgb, ${row.tone} 55%, #1a0505))` }}>
                <row.icon className="h-6 w-6" strokeWidth={1.6} aria-hidden />
                <span className="text-center text-[10.5px] font-bold uppercase leading-tight tracking-wide">{row.cadence}</span>
              </span>
              <span className="flex min-w-0 flex-1 flex-col gap-1.5">
                <span className="text-lg font-bold leading-snug text-[#3e1815]">{row.title}</span>
                <span className="text-[13px] leading-relaxed text-[#595656]">{row.when}</span>
                <span className="flex items-center gap-1.5 text-[12.5px] text-[#8a6b6b]">
                  <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden />
                  {row.where}
                </span>
              </span>
              <span className="hidden shrink-0 rounded-md px-4 py-2 text-[13px] font-bold text-white sm:block" style={{ background: row.tone }}>
                {row.cta}
              </span>
            </Link>
          </li>
        ))}
        <li className="px-1 text-xs leading-relaxed text-[#6b4f4f]/80">
          {"Ekadashi, the Janmotsav and the Falgun Mela follow the lunar calendar, so their dates move every year. The Shri Shyam Mandir Committee announces them; check its notice before you plan a visit."}
        </li>
      </ul>
    </div>
  );
}
