"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Lamp } from "lucide-react";
import { AARTI_TIMES, SEASONS, TIMINGS_NOTE, currentSeason, type Season } from "@/lib/data/darshan";

/** What each of the five aartis is, in a line (the names are the temple's own). */
const MEANING: Record<string, string> = {
  mangala: "The first aarti of the day. Baba Shyam is woken and greeted at dawn.",
  shringar: "After the morning adornment (shringar), the aarti is offered to Baba Shyam in his decorated form.",
  bhog: "The midday aarti, when the bhog, the offering of food, is presented to Baba Shyam.",
  sandhya: "The evening aarti at dusk, sung with lamps as the day turns to night.",
  shayan: "The last aarti of the day, before Baba Shyam is put to rest for the night.",
};

/**
 * The five aartis of every day at Shri Shyam Mandir, in order, each with its winter and its summer time (the one in force today
 * is marked). The times come from the same timetable as the Darshan page (lib/data/darshan.ts), so they can never differ.
 */
export default function RitualsTimeline() {
  const [season, setSeason] = useState<Season>("winter");
  useEffect(() => setSeason(currentSeason()), []);
  const other: Season = season === "winter" ? "summer" : "winter";

  return (
    <div className="flex flex-col gap-12">
      <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-0">
        {AARTI_TIMES.map((a, i) => (
          <li key={a.key} className="flex flex-col items-center gap-6">
            <div className="flex w-full items-center">
              <span className={`h-px flex-1 ${i === 0 ? "bg-transparent" : "bg-[#d4a017]/50"}`} />
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-[3px] border-white bg-maroon text-xs font-bold text-white">{i + 1}</span>
              <span className={`h-px flex-1 ${i === AARTI_TIMES.length - 1 ? "bg-transparent" : "bg-[#d4a017]/50"}`} />
            </div>
            <div className="flex flex-col items-center gap-3 px-2">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-white shadow-[0_4px_5px_rgba(0,0,0,0.05)]">
                <Lamp className="h-8 w-8 text-[#8b2e2e]" aria-hidden />
              </div>
              <p className="text-center font-serif text-xl font-bold leading-tight text-[#6b1f1f]">{a.name}</p>
              <p className="notranslate hindi-sub -mt-1.5 text-sm text-[#e87722]" translate="no">{a.hindi}</p>

              {/* the time in force now, and the other season's */}
              <div className="flex flex-col items-center gap-1.5">
                <p className="rounded-full bg-[#e87722] px-3.5 py-1 text-sm font-bold text-white">{a[season]}</p>
                <p className="text-[11px] text-[#6b4f4f]/80">
                  {SEASONS[season].label}{" time, now · "}
                  <span className="whitespace-nowrap">{SEASONS[other].label}: {a[other]}</span>
                </p>
              </div>
              <p className="max-w-[190px] text-center text-[13px] leading-relaxed text-[#6b4f4f]">{MEANING[a.key]}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mx-auto flex max-w-[760px] flex-col items-center gap-2 text-center">
        <p className="text-[13px] leading-relaxed text-[#6b4f4f]">
          {`${SEASONS.winter.label} timings run ${SEASONS.winter.months}; ${SEASONS.summer.label} timings run ${SEASONS.summer.months}. `}
          {TIMINGS_NOTE}
        </p>
        <Link href="/aarti/darshan" className="text-sm font-bold text-[#e47105] hover:underline">
          {"See the full timetable and the aarti darshan"}
        </Link>
      </div>
    </div>
  );
}
