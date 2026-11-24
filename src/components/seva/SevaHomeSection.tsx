"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import Ornament from "@/components/ui/Ornament";
import SevaArt from "@/components/seva/SevaArt";
import SevaDialog from "@/components/seva/SevaDialog";
import SevaPetals, { Diya } from "@/components/seva/SevaPetals";
import { SEVA_TYPES, type SevaType } from "@/lib/data/seva";

/**
 * The homepage's "Give Seva" band: one card for each seva. A card opens a dialog, where the devotee first makes their
 * Sankalp (who they are, why they give, how they would like it done) and then their Arpan (the offering). There is no page of
 * its own for this. "Seva of My Choice" is drawn light, with a dashed gold edge, so it stands apart from the coloured ones.
 */
export default function SevaHomeSection() {
  const [open, setOpen] = useState<SevaType | null>(null);

  return (
    <section id="give-seva" className="relative scroll-mt-28 overflow-hidden bg-gradient-to-br from-[#2e0a0a] via-[#7a2312] to-[#c2570c] px-6 py-16 text-white lg:px-[108px] lg:py-24">
      <SevaPetals count={16} />
      <div aria-hidden className="pointer-events-none absolute -left-24 top-10 h-[360px] w-[360px] rounded-full bg-[#ffb347]/20 blur-3xl" />
      <div className="relative mx-auto flex max-w-[1440px] flex-col gap-12">
        <div className="mx-auto flex max-w-[760px] flex-col items-center gap-4 text-center">
          <Diya className="h-12 w-12" />
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] backdrop-blur">
            <Heart className="h-3.5 w-3.5 fill-[#ffb347] text-[#ffb347]" aria-hidden />
            {"Give Seva"}
          </span>
          <h2 className="font-serif text-4xl font-bold leading-[1.1] lg:text-[52px]">{"Give seva, in your own way"}</h2>
          <Ornament className="text-[#ffb347]" />
          <p className="text-lg leading-relaxed text-white/90">{"Choose a seva that is close to your heart. Make your sankalp first, and your arpan only when you are ready."}</p>
        </div>

        <ul className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-5">
          {SEVA_TYPES.map((seva) => {
            const special = !!seva.special;
            return (
              <li key={seva.slug}>
                <button
                  type="button"
                  onClick={() => setOpen(seva)}
                  aria-haspopup="dialog"
                  className={`group relative block aspect-[4/5] w-full overflow-hidden rounded-2xl text-left transition-all duration-300 hover:-translate-y-2 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#ffb347] ${
                    special ? "border-2 border-dashed border-[#c99a2e] shadow-[0_14px_34px_rgba(0,0,0,0.3)] hover:shadow-[0_24px_46px_rgba(0,0,0,0.4)]" : "shadow-xl hover:shadow-2xl"
                  }`}
                >
                  <SevaArt seva={seva} float={false} className="absolute inset-0 transition-transform duration-700 group-hover:scale-110" />
                  <span aria-hidden className="absolute inset-0" style={{ background: special ? "linear-gradient(to top, #f1d58c 6%, #f1d58ccc 22%, transparent 48%)" : `linear-gradient(to top, ${seva.tone[1]} 4%, ${seva.tone[1]}cc 24%, transparent 52%)` }} />
                  {special && <span className="absolute right-3 top-3 rounded-full bg-[#7b2d2d] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#fbeec8]">{"Your own"}</span>}
                  <span className={`absolute inset-x-0 bottom-0 flex flex-col gap-0.5 p-3.5 ${special ? "text-[#4a2a05]" : ""}`}>
                    <span className="font-serif text-lg font-bold leading-tight">{seva.title.split(" (")[0]}</span>
                    <span className={`notranslate hindi-sub text-xs ${special ? "text-[#6b4a14]" : "text-white/85"}`} translate="no">
                      {seva.hindi}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <SevaDialog seva={open} onClose={() => setOpen(null)} />
    </section>
  );
}
