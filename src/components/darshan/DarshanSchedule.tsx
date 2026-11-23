"use client";

import { useEffect, useState } from "react";
import { AARTI_TIMES, SEASONS, TEMPLE, TIMINGS_NOTE, currentSeason, type Season } from "@/lib/data/darshan";

/**
 * The aarti timetable: one row per aarti, winter and summer times side by side, with the season in force today marked.
 * The season follows today's date, so it needs no one to switch it.
 */
export default function DarshanSchedule({ showNote = true }: { showNote?: boolean }) {
  // The server cannot know the visitor's date, so the first paint assumes the season of the server and corrects on load.
  const [now, setNow] = useState<Season>(() => currentSeason());
  useEffect(() => setNow(currentSeason()), []);

  const order: Season[] = ["winter", "summer"];

  return (
    <div className="rounded-xl bg-white p-5 text-[#3e1815] lg:p-7">
      <p className="text-sm font-semibold text-[#3e1815]">{TEMPLE.name}</p>
      <p className="mt-0.5 text-xs text-[#6b4f4f]">{"Daily aarti timings"}</p>

      <div className="mt-4 grid grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,1fr)] items-end gap-x-3 border-b-2 border-[#3e1815]/25 pb-2 text-xs font-bold uppercase tracking-wide text-[#6b4f4f]">
        <span>{"Aarti"}</span>
        {order.map((season) => (
          <span key={season} className={`flex flex-col ${season === now ? "text-[#e47105]" : ""}`}>
            <span>{SEASONS[season].label}</span>
            <span className="text-[10px] font-semibold normal-case tracking-normal">
              {SEASONS[season].months}
              {season === now && " · Now"}
            </span>
          </span>
        ))}
      </div>

      {AARTI_TIMES.map((a, i) => (
        <div
          key={a.key}
          className={`grid grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,1fr)] items-center gap-x-3 py-3.5 ${i < AARTI_TIMES.length - 1 ? "border-b border-[#3e1815]/15" : ""}`}
        >
          <span className="flex flex-col">
            <span className="font-medium">{a.name}</span>
            <span className="notranslate hindi-sub text-xs text-[#8a6b6b]" translate="no">
              {a.hindi}
            </span>
          </span>
          {order.map((season) => (
            <span key={season} className={`text-sm ${season === now ? "font-bold text-[#e47105]" : "text-[#6b4f4f]"}`}>
              {a[season]}
            </span>
          ))}
        </div>
      ))}

      {showNote && (
        <p className="mt-4 rounded-lg bg-[#fdf6ec] px-3 py-2 text-xs leading-relaxed text-[#6b4f4f]">
          {TIMINGS_NOTE} {"Temple office: "}
          <a href={`tel:${TEMPLE.phone.replace(/\D/g, "")}`} className="font-semibold text-[#e47105] hover:underline">
            {TEMPLE.phone}
          </a>
          {"."}
        </p>
      )}
    </div>
  );
}
