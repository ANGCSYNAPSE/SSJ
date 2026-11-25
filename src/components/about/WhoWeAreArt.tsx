import { HandHeart, Heart, Users } from "lucide-react";
import NaamRings from "@/components/profile/NaamRings";
import { Mandala } from "@/components/seva/DharmaIcons";
import SevaPetals, { Diya } from "@/components/seva/SevaPetals";

const PILLARS = [
  { icon: Heart, hi: "भक्ति", title: "Devotion", line: "Faith is where we begin.", tone: "#e47105" },
  { icon: HandHeart, hi: "सेवा", title: "Seva", line: "Service is how it shows.", tone: "#9b2335" },
  { icon: Users, hi: "समाज", title: "Community", line: "One family, together.", tone: "#0f766e" },
];

/**
 * The picture for "Who We Are": no stock photographs, but the three things the words describe. A deep maroon disc holds a slowly
 * turning mandala, rings of "श्री श्याम" and a lit lamp (the faith everything starts from); under it stand three arch-topped cards,
 * Devotion, Seva and Community (the way that faith is put to work among people). All of it is drawn in CSS and SVG.
 */
export default function WhoWeAreArt({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <span aria-hidden className="absolute -right-2 -top-4 h-24 w-32 opacity-60" style={{ backgroundImage: "radial-gradient(#e47105 2px, transparent 2.4px)", backgroundSize: "14px 14px" }} />

      {/* the disc: mandala, name rings and the lamp */}
      <div className="relative mx-auto aspect-square w-[86%]">
        <span aria-hidden className="gs-spin-slow-rev absolute -inset-3 rounded-full border-2 border-dashed border-[#e0b94f]/70" />
        <div
          className="absolute inset-0 overflow-hidden rounded-full border-[6px] border-[#e0b94f] shadow-[0_26px_60px_rgba(107,31,31,0.35)]"
          style={{ background: "radial-gradient(circle at 50% 42%, #b02f22 0%, #6e1219 52%, #2e0609 100%)" }}
        >
          <Mandala className="gs-spin-slow pointer-events-none absolute -inset-[12%] text-[#f6dc8c]/20" />
          <NaamRings id="who" rings={5} className="pointer-events-none absolute inset-0 h-full w-full" />
          <SevaPetals count={7} />
          <span aria-hidden className="absolute left-1/2 top-1/2 h-[44%] w-[44%] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: "radial-gradient(circle, rgba(255,196,90,0.6), transparent 68%)" }} />
          <Diya className="absolute left-1/2 top-1/2 block w-[27%] -translate-x-1/2 -translate-y-[46%] drop-shadow-[0_0_14px_rgba(255,180,70,0.95)]" />
        </div>
      </div>

      {/* the three pillars */}
      <div className="relative z-10 mt-2 grid grid-cols-3 gap-2.5 sm:mt-5 sm:gap-4">
        {PILLARS.map((p) => (
          <div
            key={p.title}
            className="group relative flex flex-col items-center rounded-b-2xl rounded-t-[60px] border border-[#e0b94f]/70 bg-white px-2 pb-4 pt-5 text-center shadow-[0_14px_30px_rgba(107,31,31,0.16)] transition-transform duration-300 hover:-translate-y-1.5 sm:px-4 sm:pb-5"
          >
            <span aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-1 rounded-t-full" style={{ background: p.tone }} />
            <span className="flex h-11 w-11 items-center justify-center rounded-full text-white shadow-md transition-transform duration-300 group-hover:scale-110 sm:h-12 sm:w-12" style={{ background: `linear-gradient(145deg, ${p.tone}, color-mix(in srgb, ${p.tone} 60%, #1a0505))` }}>
              <p.icon className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.7} aria-hidden />
            </span>
            <span className="notranslate hindi-sub mt-2.5 text-lg font-extrabold leading-none sm:text-xl" style={{ color: p.tone }} translate="no">
              {p.hi}
            </span>
            <span className="mt-1.5 font-serif text-[15px] font-bold leading-tight text-[#3e1815] sm:text-[17px]">{p.title}</span>
            <span className="mt-1.5 hidden text-[12.5px] leading-snug text-[#6b6b6b] sm:block">{p.line}</span>
          </div>
        ))}
      </div>

      <span aria-hidden className="mt-5 flex items-center gap-2 text-[#e0b94f]">
        <span className="h-[3px] flex-1 rounded-full bg-gradient-to-r from-transparent to-current" />
        <span className="h-2.5 w-2.5 rotate-45 bg-current" />
        <span className="h-[3px] flex-1 rounded-full bg-gradient-to-l from-transparent to-current" />
      </span>
    </div>
  );
}
