"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Flower2, Heart, Images, ScrollText, UserRound } from "lucide-react";
import Ornament from "@/components/ui/Ornament";
import GalleryDialog from "@/components/gallery/GalleryDialog";
import OwnWishFeed from "@/components/seva/OwnWishFeed";
import SevaArt from "@/components/seva/SevaArt";
import SevaDialog from "@/components/seva/SevaDialog";
import SevaPetals, { Diya } from "@/components/seva/SevaPetals";
import { OWN_WISH_FOLDER } from "@/lib/data/gallery";
import { SEVA_TYPES } from "@/lib/data/seva";

const OWN = SEVA_TYPES.find((s) => s.special)!;

const POINTS = [
  { icon: ScrollText, text: "Write what you would like your seva to go towards, in your own words." },
  { icon: Heart, text: "Give any amount you wish, by UPI or card, through Razorpay." },
  { icon: UserRound, text: "It is saved in your profile, and our team gets in touch to see how it can be done." },
];

/**
 * "Seva of Own Wish": the one seva on the home page that is the visitor's own. The other sevas are on the Our Initiatives
 * section just above, and open the same form from there. For a seva that is not listed anywhere, a visitor writes their own
 * wish; they can read what others have wished (it fills by itself), and open the gallery of photographs and videos shared
 * with the people whose wish it was.
 */
export default function OwnWishSection({ showMore = true }: { showMore?: boolean }) {
  const [giving, setGiving] = useState(false);
  const [gallery, setGallery] = useState(false);

  return (
    <section id="give-seva" className="relative scroll-mt-28 overflow-hidden bg-gradient-to-br from-[#2e0a0a] via-[#7a2312] to-[#c2570c] px-6 py-16 text-white lg:px-[108px] lg:py-24">
      <SevaPetals count={14} />
      <div aria-hidden className="pointer-events-none absolute -left-24 top-10 h-[360px] w-[360px] rounded-full bg-[#ffb347]/20 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-32 right-0 h-[420px] w-[420px] rounded-full bg-[#ff7a1a]/20 blur-3xl" />

      <div className="relative mx-auto grid max-w-[1240px] items-stretch gap-8 lg:grid-cols-[1.05fr_1fr]">
        {/* the invitation */}
        <div className="flex flex-col gap-6 rounded-[32px] border border-[#f6dc8c]/35 bg-white/10 p-8 shadow-[0_30px_70px_rgba(0,0,0,0.35)] backdrop-blur-md sm:p-10">
          <div className="flex items-center gap-3">
            <Diya className="h-12 w-12 drop-shadow-[0_0_16px_rgba(255,180,70,0.9)]" />
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em]">
              <Flower2 className="h-3.5 w-3.5 text-[#ffd66b]" aria-hidden />
              {"Seva of Own Wish"}
            </span>
          </div>
          <div>
            <p className="notranslate hindi-sub text-lg text-[#ffd66b]" translate="no">{OWN.hindi}</p>
            <h2 className="mt-1 font-serif text-4xl font-bold leading-[1.1] lg:text-[46px]">{"Is there a seva that is not on our list?"}</h2>
            <Ornament className="mt-4 text-[#ffb347]" />
          </div>
          <p className="text-lg leading-relaxed text-white/90">{"Tell us what is in your heart: blankets for a cold night, books for a school, a meal on a loved one's day. Your wish becomes your seva, and others can be inspired by it."}</p>

          <ul className="flex flex-col gap-3">
            {POINTS.map((p) => (
              <li key={p.text} className="flex items-start gap-3 text-[15px] leading-relaxed text-white/90">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#ffd66b]/20 text-[#ffd66b]">
                  <p.icon className="h-4 w-4" aria-hidden />
                </span>
                {p.text}
              </li>
            ))}
          </ul>

          <div className="mt-2 flex flex-wrap items-center gap-3">
            <button type="button" onClick={() => setGiving(true)} aria-haspopup="dialog" className="inline-flex h-14 items-center gap-3 rounded-2xl bg-gradient-to-r from-[#ffd66b] to-[#ffb347] px-8 text-base font-bold text-[#4a1414] shadow-[0_16px_36px_rgba(255,190,70,0.4)] transition-all hover:-translate-y-0.5 hover:brightness-105">
              <Heart className="h-5 w-5" aria-hidden />
              {"Give a seva of your own wish"}
            </button>
            <button type="button" onClick={() => setGallery(true)} aria-haspopup="dialog" className="inline-flex h-14 items-center gap-2.5 rounded-2xl border-2 border-[#ffd66b]/70 bg-white/10 px-5 text-[15px] font-bold text-[#ffe08a] backdrop-blur transition-all hover:-translate-y-0.5 hover:bg-[#ffd66b] hover:text-[#4a1414]">
              <Images className="h-5 w-5" aria-hidden />
              {"Gallery"}
            </button>
          </div>
        </div>

        {/* what others have wished, and the art */}
        <div className="flex flex-col gap-5">
          <div className="relative min-h-[200px] flex-1 overflow-hidden rounded-[32px] border-2 border-dashed border-[#e7c36a] shadow-[0_30px_70px_rgba(0,0,0,0.35)]">
            <SevaArt seva={OWN} className="absolute inset-0" />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#f1d58c] via-[#f1d58ccc] to-transparent" style={{ background: "linear-gradient(to top, #f1d58c 8%, #f1d58ccc 30%, transparent 62%)" }} />
            <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-6 text-[#4a2a05]">
              <p className="font-serif text-2xl font-bold">{"What others have wished"}</p>
              <p className="text-sm text-[#6b4a14]">{"In their own words, as offerings come in."}</p>
            </div>
          </div>
          <div className="rounded-[28px] bg-white/95 p-5 shadow-xl">
            <OwnWishFeed compact limit={2} />
          </div>
          {showMore && (
            <Link href="/seva" className="group inline-flex items-center justify-center gap-2 self-start rounded-full border border-[#f6dc8c]/60 bg-white/10 px-6 py-3 text-sm font-bold text-white backdrop-blur transition-all hover:-translate-y-0.5 hover:bg-white hover:text-[#7a2312]">
              {"More about Seva of Own Wish"}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
          )}
        </div>
      </div>

      <SevaDialog seva={giving ? OWN : null} onClose={() => setGiving(false)} />
      <GalleryDialog
        open={gallery}
        onClose={() => setGallery(false)}
        title="Seva of Own Wish: photos and videos"
        subtitle="Shared with the people whose wish it was"
        folders={[OWN_WISH_FOLDER]}
        gallery="own-wish"
        emptyText="Photos and videos will appear here when anyone shares them with us and our team has approved them."
      />
    </section>
  );
}
