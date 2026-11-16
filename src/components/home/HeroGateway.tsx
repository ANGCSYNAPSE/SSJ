"use client";

import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";

type Mode = "day" | "night";

interface Art {
  src: string;
  alt: string;
  /** Size of the picture file. */
  width: number;
  height: number;
  /** The part worth showing: the gate, with a little sky above and road below. */
  crop: { y: number; height: number };
  /** How far (picture pixels) each edge dissolves into the background, so the gate never looks pasted on. */
  fade: { left: number; right: number; top: number };
  /** Empty space (picture pixels) added left of the picture on large screens, so the gate sits a little right of centre. */
  shift: number;
  /** The band of the picture that is only sky; stretched across the whole hero as its background. Null when the sky is plain black. */
  sky: { y: number; height: number } | null;
}

const ART: Record<Mode, Art> = {
  night: {
    src: "/hero/night-gateway-hd-corrected.svg",
    alt: "The Shri Shyam Sharanam gateway lit up at night",
    width: 1119,
    height: 1405,
    crop: { y: 380, height: 1025 },
    fade: { left: 70, right: 70, top: 110 },
    shift: 300,
    sky: null,
  },
  day: {
    src: "/hero/daylight-gateway-jai-shri-shyam-hd.svg",
    alt: "The Jai Shri Shyam gateway in daylight",
    width: 1076,
    height: 1461,
    crop: { y: 170, height: 940 },
    fade: { left: 110, right: 70, top: 80 },
    shift: 280,
    sky: { y: 0, height: 230 },
  },
};

/** Day from 6:00 am until 6:00 pm, night from 6:00 pm until 6:00 am (the visitor's own clock). */
export function heroModeFor(date: Date): Mode {
  const hour = date.getHours();
  return hour >= 6 && hour < 18 ? "day" : "night";
}

/** The sharp gate, cropped to the useful part, fading into the background at its sides and top. */
function Gate({ mode, art, shift, className }: { mode: Mode; art: Art; shift: number; className: string }) {
  const { width, height, crop, fade } = art;
  const id = `hero-${mode}-${shift}`;

  return (
    <svg
      role="img"
      aria-label={art.alt}
      viewBox={`${-shift} ${crop.y} ${width + shift} ${crop.height}`}
      preserveAspectRatio="xMaxYMax meet"
      className={className}
    >
      <defs>
        <linearGradient id={`${id}-x`} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={width} y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset={fade.left / width} stopColor="#fff" />
          <stop offset={1 - fade.right / width} stopColor="#fff" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${id}-y`} gradientUnits="userSpaceOnUse" x1="0" y1={crop.y} x2="0" y2={crop.y + crop.height}>
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset={fade.top / crop.height} stopColor="#fff" />
          <stop offset="1" stopColor="#fff" />
        </linearGradient>
        <mask id={`${id}-mx`} maskUnits="userSpaceOnUse" x="0" y={crop.y} width={width} height={crop.height}>
          <rect x="0" y={crop.y} width={width} height={crop.height} fill={`url(#${id}-x)`} />
        </mask>
        <mask id={`${id}-my`} maskUnits="userSpaceOnUse" x="0" y={crop.y} width={width} height={crop.height}>
          <rect x="0" y={crop.y} width={width} height={crop.height} fill={`url(#${id}-y)`} />
        </mask>
      </defs>
      <g mask={`url(#${id}-mx)`}>
        <image href={art.src} width={width} height={height} mask={`url(#${id}-my)`} />
      </g>
    </svg>
  );
}

function useHeroMode() {
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
  return mode;
}

function Badge({ className }: { className: string }) {
  return (
    <div className={className}>
      <MapPin className="h-4 w-4 text-white" aria-hidden />
      <div className="leading-tight">
        <p className="text-[13px] font-semibold text-white">श्री खाटू श्याम मंदिर</p>
        <p className="text-[11px] text-[#d9d9d9]">राजस्थान</p>
      </div>
    </div>
  );
}

/**
 * The home hero artwork. On large screens the whole picture runs the full width of
 * the page, starting behind the headline in the hero; whatever does not fit in the
 * hero is the whole gate, scaled to fit, over its own blurred sky. On phones and tablets the whole gate sits under the text.
 *
 * Day 6 am to 6 pm, night 6 pm to 6 am (visitor clock); ?hero=day or ?hero=night previews.
 * Renders as direct children of the hero <section>.
 */
export default function HeroGateway() {
  const mode = useHeroMode();
  if (!mode) return null;
  const art = ART[mode];

  return (
    <>
      <div aria-hidden className="absolute inset-0 hidden overflow-hidden lg:block">
        {art.sky && (
          <svg
            viewBox={`0 ${art.sky.y} ${art.width} ${art.sky.height}`}
            preserveAspectRatio="xMidYMid slice"
            className="h-full w-full scale-110"
            style={{ filter: "blur(14px)" }}
          >
            <image href={art.src} width={art.width} height={art.height} />
          </svg>
        )}
      </div>
      <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-black/70 via-black/25 to-transparent lg:block" />
      {/* The whole gate, sized to fit the hero, so nothing is cut off */}
      <div className="absolute inset-x-0 bottom-0 top-[140px] hidden lg:block">
        <Gate mode={mode} art={art} shift={art.shift} className="h-full w-full" />
      </div>
      <Badge className="absolute bottom-20 right-10 z-10 hidden items-center gap-2 rounded-full bg-[#1a1a1a]/70 px-3.5 py-2.5 backdrop-blur-sm lg:flex" />

      {/* Phones and tablets: the whole gate under the text */}
      <div className="relative z-10 order-last mx-auto w-full max-w-[560px] lg:hidden">
        <Gate mode={mode} art={art} shift={0} className="block h-auto w-full" />
        <Badge className="absolute right-3 top-3 flex items-center gap-2 rounded-full bg-[#1a1a1a]/70 px-3.5 py-2.5 backdrop-blur-sm sm:right-6 sm:top-5" />
      </div>
    </>
  );
}
