import Image from "next/image";
import type { ComponentType, ReactNode } from "react";
import { Mandala } from "@/components/seva/DharmaIcons";

/**
 * The card designs of the site. Each one has a character of its own, so a page of cards never looks like the same box
 * repeated:
 *   FramedCard  a gold double frame with corner jewels, a mandala watermark and a temple-arch medallion (for Vision, Mission
 *               and other big statements; "light" on cream, "dark" on maroon)
 *   NumberTile  a numbered tile whose colour floods in from the corner on hover (for lists of features and steps)
 *   ArchPhoto   a photograph cut in the shape of a temple arch (for people and places)
 * All of it is drawn in CSS and SVG, and takes its colours from the site's saffron, gold and maroon.
 */

type Icon = ComponentType<{ className?: string; strokeWidth?: number | string }>;

const GOLD = "#e0b94f";

/** A small temple-arch frame holding an icon. */
export function ArchMedallion({ icon: Icon, tone = "light", className = "" }: { icon: Icon; tone?: "light" | "dark"; className?: string }) {
  return (
    <span
      className={`flex h-[84px] w-[64px] shrink-0 items-center justify-center rounded-t-[32px] rounded-b-md border ${
        tone === "dark" ? "border-[#f6dc8c]/60 bg-white/10 text-[#f6dc8c]" : "border-[#e0b94f] bg-[#fff4d6] text-[#b45309]"
      } shadow-[inset_0_0_16px_rgba(224,185,79,0.18)] ${className}`}
    >
      <Icon className="h-8 w-8" strokeWidth={1.5} />
    </span>
  );
}

export function FramedCard({
  tone = "light",
  icon,
  eyebrow,
  title,
  children,
  className = "",
}: {
  tone?: "light" | "dark";
  icon: Icon;
  eyebrow: string;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <div
      className={`group relative isolate overflow-hidden rounded-[28px] p-3 shadow-[0_24px_50px_rgba(107,31,31,0.16)] transition-transform duration-300 hover:-translate-y-1.5 ${className}`}
      style={{ background: dark ? "linear-gradient(155deg,#7b1f1f,#3a0c0c)" : "linear-gradient(155deg,#fffaf0,#fcebc9)" }}
    >
      <Mandala className={`gs-spin-slow pointer-events-none absolute -right-24 -top-24 -z-10 h-[340px] w-[340px] ${dark ? "text-[#f6dc8c]/20" : "text-[#e47105]/15"}`} />
      {/* the double gold frame */}
      <div className="relative h-full rounded-[20px] border p-7 sm:p-9" style={{ borderColor: `${GOLD}aa` }}>
        <span aria-hidden className="pointer-events-none absolute inset-[5px] rounded-[16px] border" style={{ borderColor: `${GOLD}55` }} />
        {[
          "-left-[5px] -top-[5px]",
          "-right-[5px] -top-[5px]",
          "-bottom-[5px] -left-[5px]",
          "-bottom-[5px] -right-[5px]",
        ].map((pos) => (
          <span key={pos} aria-hidden className={`absolute ${pos} h-2.5 w-2.5 rotate-45 bg-[#e0b94f]`} />
        ))}
        <div className="relative flex flex-col gap-6">
          <div className="flex items-start justify-between gap-4">
            <ArchMedallion icon={icon} tone={tone} />
            <span className={`mt-1 rounded-full border px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] ${dark ? "border-[#f6dc8c]/40 text-[#f6dc8c]" : "border-[#e0b94f] text-[#b45309]"}`}>{eyebrow}</span>
          </div>
          <h3 className={`font-serif text-[34px] font-bold leading-tight ${dark ? "text-white" : "text-[#3e1815]"}`}>{title}</h3>
          <span aria-hidden className="flex items-center gap-2" style={{ color: GOLD }}>
            <span className="h-px w-12 bg-current" />
            <span className="h-2 w-2 rotate-45 bg-current" />
            <span className="h-px w-5 bg-current" />
          </span>
          <div className={`text-[16px] leading-[1.85] ${dark ? "text-white/90" : "text-[#4a3a3a]"}`}>{children}</div>
        </div>
      </div>
    </div>
  );
}

const TILE_TONES = ["#e47105", "#9b2335", "#0f766e", "#3b4a9e", "#a16207", "#2f6b3a"];

/** A numbered tile: a big outlined number, an icon in a round medallion, and a colour that floods in from the corner on hover. */
export function NumberTile({ n, icon: Icon, title, children, tone, className = "" }: { n: number; icon: Icon; title: string; children: ReactNode; tone?: string; className?: string }) {
  const colour = tone ?? TILE_TONES[(n - 1) % TILE_TONES.length];
  return (
    <div className={`group relative isolate flex flex-col gap-4 overflow-hidden rounded-3xl border border-[#e8ddd0] bg-white p-7 shadow-[0_8px_24px_rgba(107,31,31,0.06)] transition-all duration-500 hover:-translate-y-1.5 hover:border-transparent hover:shadow-[0_22px_44px_rgba(107,31,31,0.18)] ${className}`}>
      {/* the colour that floods in from the corner */}
      <span aria-hidden className="absolute -left-12 -top-12 -z-10 h-24 w-24 rounded-full opacity-0 transition-all duration-700 ease-out group-hover:h-[640px] group-hover:w-[640px] group-hover:opacity-100" style={{ background: `radial-gradient(circle at 30% 30%, ${colour}, color-mix(in srgb, ${colour} 55%, #1a0505))` }} />
      <span aria-hidden className="pointer-events-none absolute right-5 top-2 select-none font-serif text-[84px] font-bold leading-none transition-colors duration-500" style={{ WebkitTextStroke: `1.5px ${colour}55`, color: "transparent" }}>
        {String(n).padStart(2, "0")}
      </span>
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:bg-white/20" style={{ background: `linear-gradient(145deg, ${colour}, color-mix(in srgb, ${colour} 60%, #1a0505))` }}>
        <Icon className="h-7 w-7" strokeWidth={1.6} />
      </span>
      <h3 className="font-serif text-[22px] font-bold leading-snug text-[#3e1815] transition-colors duration-500 group-hover:text-white">{title}</h3>
      <p className="text-sm leading-[1.7] text-[#6b6b6b] transition-colors duration-500 group-hover:text-white/90">{children}</p>
      <span aria-hidden className="mt-auto h-[3px] w-10 rounded-full transition-all duration-500 group-hover:w-24 group-hover:bg-white" style={{ background: colour }} />
    </div>
  );
}

/**
 * Three photographs cut in the shape of temple arches, of different heights, standing on a gold base. For people and places,
 * in place of one plain rounded picture. The photographs keep their own look; only their frames are shaped.
 */
export function ArchCollage({ images, className = "" }: { images: { src: string; alt: string; focus?: string }[]; className?: string }) {
  const heights = ["82%", "100%", "90%"];
  return (
    <div className={`relative ${className}`}>
      <span aria-hidden className="absolute -right-3 -top-4 h-24 w-32 opacity-60" style={{ backgroundImage: "radial-gradient(#e47105 2px, transparent 2.4px)", backgroundSize: "14px 14px" }} />
      <div className="relative grid aspect-[6/5] grid-cols-3 items-end gap-3 sm:gap-4">
        {images.slice(0, 3).map((img, i) => (
          <div key={img.src} className="relative overflow-hidden rounded-t-[999px] rounded-b-2xl border-[5px] border-[#e0b94f] bg-[#fdf6ec] shadow-[0_18px_36px_rgba(107,31,31,0.22)]" style={{ height: heights[i] }}>
            <Image src={img.src} alt={img.alt} fill sizes="(min-width: 1024px) 200px, 30vw" className="object-cover" style={img.focus ? { objectPosition: img.focus } : undefined} />
          </div>
        ))}
      </div>
      <span aria-hidden className="mt-3 flex items-center gap-2 text-[#e0b94f]">
        <span className="h-[3px] flex-1 rounded-full bg-gradient-to-r from-transparent to-current" />
        <span className="h-2.5 w-2.5 rotate-45 bg-current" />
        <span className="h-[3px] flex-1 rounded-full bg-gradient-to-l from-transparent to-current" />
      </span>
    </div>
  );
}
