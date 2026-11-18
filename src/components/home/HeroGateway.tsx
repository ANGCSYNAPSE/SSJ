"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Mode = "day" | "night";

/**
 * ART settings: the only numbers to tweak when aligning the gate on large screens.
 *  zoom   - how much wider than the screen the picture is drawn (1 = exactly screen width).
 *           Raise it to push the side poles towards the screen edges (the top/bottom grow too).
 *  openTop - where the gate's opening starts, as a share of the drawn picture's height; the hero
 *           text starts there so it sits inside the gate, not over the sign board.
 *  keep   - share of the picture's height kept (1 = all of it, 0.96 = trims the bottom 4%).
 */
const ART: Record<Mode, { src: string; alt: string; width: number; height: number; zoom: number; keep: number; openTop: number }> = {
  day: {
    src: "/hero/final-day-gate.png", // public/hero/final-day-gate.png
    alt: "The Shree Shyam gateway in bright daylight",
    width: 1672,
    height: 941,
    zoom: 1.12,
    keep: 0.97,
    openTop: 0.43,
  },
  night: {
    src: "/hero/final-night-gate.png", // public/hero/final-night-gate.png
    alt: "The illuminated Shree Shyam gateway at night",
    width: 1672,
    height: 941,
    zoom: 1.25,
    keep: 0.97,
    openTop: 0.43,
  },
};

/** Day from 6:00 am until 6:00 pm; night from 6:00 pm until 6:00 am. */
export function heroModeFor(date: Date): Mode {
  const hour = date.getHours();
  return hour >= 6 && hour < 18 ? "day" : "night";
}

/**
 * Full-bleed gateway background. The ?hero=day and ?hero=night query params
 * are retained for previewing both images; otherwise the visitor's local time
 * selects the appropriate background.
 */
export default function HeroGateway() {
  const [mode, setMode] = useState<Mode | null>(null);

  useEffect(() => {
    const read = () => {
      const forced = new URLSearchParams(window.location.search).get("hero");
      setMode(forced === "day" || forced === "night" ? forced : heroModeFor(new Date()));
    };

    read();
    const timer = window.setInterval(read, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  // Large screens: the hero is exactly as tall as the drawn picture (plus the 112px under the header),
  // so the whole gate shows. page.tsx reads this as --hero-min.
  useEffect(() => {
    if (!mode) return;
    const a = ART[mode];
    document.documentElement.style.setProperty(
      "--hero-min",
      `calc(112px + 100vw * ${a.zoom * a.keep * (a.height / a.width)})`,
    );
    document.documentElement.style.setProperty(
      "--open-top",
      `calc(100vw * ${a.zoom * (a.height / a.width) * a.openTop})`,
    );
  }, [mode]);

  if (!mode) return null;
  const art = ART[mode];

  return (
    <>
      {/* Large screens: whole gate, centred, poles near the screen edges, starting below the header */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 top-[112px] hidden overflow-hidden lg:block">
        <Image
          src={art.src}
          alt=""
          width={art.width}
          height={art.height}
          priority
          sizes="120vw"
          quality={90}
          className="absolute left-1/2 top-0 h-auto max-w-none -translate-x-1/2"
          style={{ width: `${art.zoom * 100}%` }}
        />
      </div>

      {/* Phones and tablets: the whole gate at the top of the hero, content below it */}
      <div aria-hidden className="absolute inset-x-0 top-[112px] lg:hidden">
        <Image
          src={art.src}
          alt=""
          width={art.width}
          height={art.height}
          priority
          sizes="100vw"
          className="h-auto w-full"
        />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#06183f] to-transparent" />
      </div>

      {/* Keep the gate vivid while giving the centred hero copy enough contrast. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[#06183f]/20"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#06183f]/25 via-[#06183f]/10 to-[#06183f]/35"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(3,17,43,0.08)_0%,rgba(3,17,43,0.22)_72%,rgba(3,17,43,0.38)_100%)]"
      />
    </>
  );
}
