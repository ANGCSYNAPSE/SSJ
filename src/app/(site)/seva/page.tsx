import type { Metadata } from "next";
import Link from "next/link";
import { Camera, Feather, HandHeart, Receipt, ScrollText } from "lucide-react";
import AdSlot from "@/components/ui/AdSlot";
import Ornament from "@/components/ui/Ornament";
import { DharmaCard, type DharmaPattern } from "@/components/ui/ArtCard";
import { Mandala } from "@/components/seva/DharmaIcons";
import OwnWishFeed from "@/components/seva/OwnWishFeed";
import GalleryBody from "@/components/gallery/GalleryBody";
import OwnWishSection from "@/components/seva/OwnWishSection";
import SevaPetals, { Diya } from "@/components/seva/SevaPetals";
import SevaShare from "@/components/seva/SevaShare";
import { OWN_WISH_FOLDER } from "@/lib/data/gallery";

export const metadata: Metadata = {
  title: "Seva of Own Wish",
  description: "Give a seva for something that is not on our list, in your own words. See what others have wished, and the photos and videos shared with them.",
};

const STEPS: { icon: typeof Feather; title: string; text: string; tone: string; pattern: DharmaPattern }[] = [
  { icon: Feather, title: "Tell us your wish", text: "Write what you would like your seva to go towards, in your own words: for a person, a place or a day that matters to you.", tone: "#c2570c", pattern: "mandala" },
  { icon: ScrollText, title: "Make your sankalp", text: "Tell us who you are, why you give and how you would like it done. Your reason is optional.", tone: "#3b4a9e", pattern: "jaali" },
  { icon: HandHeart, title: "Make your arpan", text: "Give any amount you wish, by UPI or card, through Razorpay. We never see or keep your card or UPI details.", tone: "#9b2335", pattern: "ripples" },
  { icon: Receipt, title: "Receive your receipt", text: "Your receipt comes to your email, and your seva is kept in your profile for you to see.", tone: "#2f6b3a", pattern: "lotus" },
];

export default function SevaPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative -mt-[112px] flex min-h-[560px] w-full items-center justify-center overflow-hidden bg-[#1f0707] px-6 pb-16 pt-[112px] text-center text-white">
        <Mandala className="gs-spin-slow pointer-events-none absolute -right-48 -top-48 h-[700px] w-[700px] text-[#f6dc8c]/15" />
        <Mandala className="gs-spin-slow-rev pointer-events-none absolute -bottom-72 -left-60 h-[760px] w-[760px] text-[#e47105]/15" />
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ff9a2e]/15 blur-3xl" />
        <SevaPetals count={14} />
        <div className="relative flex max-w-[820px] flex-col items-center gap-5">
          <Diya className="h-14 w-14 drop-shadow-[0_0_18px_rgba(255,180,70,0.9)]" />
          <p className="notranslate text-xl tracking-wide text-[#ffd66b]" translate="no">{"|| जय श्री श्याम ||"}</p>
          <h1 className="font-serif text-5xl font-bold leading-[1.05] sm:text-7xl">{"Seva of Own Wish"}</h1>
          <Ornament className="text-[#ffb347]" />
          <p className="max-w-[640px] text-lg leading-relaxed text-white/90 sm:text-xl">{"Every offering is a prayer. Give a seva for what is in your heart, and see what others have wished."}</p>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Link href="#give-seva" className="inline-flex h-12 items-center gap-2.5 rounded-2xl bg-gradient-to-r from-[#f47700] to-[#ff9417] px-7 text-[15px] font-bold text-white shadow-[0_14px_34px_rgba(244,119,0,0.45)] transition-all hover:-translate-y-0.5 hover:brightness-110">
              <HandHeart className="h-5 w-5" aria-hidden />
              {"Give Seva"}
            </Link>
            <Link href="#gallery" className="inline-flex h-12 items-center gap-2.5 rounded-2xl border-2 border-[#ffd04f] bg-white/10 px-6 text-[15px] font-bold text-[#ffe08a] backdrop-blur transition-all hover:-translate-y-0.5 hover:bg-[#ffd04f] hover:text-[#4a0e0e]">
              <Camera className="h-5 w-5" aria-hidden />
              {"See the gallery"}
            </Link>
          </div>
        </div>
      </section>

      {/* THE INVITATION (the other sevas are on the Our Initiatives page, and open the same form) */}
      <OwnWishSection showMore={false} />

      <AdSlot size="leaderboard" />

      {/* HOW IT WORKS */}
      <section className="bg-[#fdf6ec] px-6 py-16 lg:px-[108px] lg:py-24">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-12">
          <div className="mx-auto flex max-w-[760px] flex-col items-center gap-4 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.96px] text-[#e87722]">{"HOW IT WORKS"}</p>
            <h2 className="font-serif text-4xl font-bold leading-[1.1] text-[#3e1815] lg:text-[48px]">{"Four quiet steps"}</h2>
            <Ornament />
            <p className="text-lg leading-7 text-[#595656]">{"Make your sankalp first, and your arpan only when you are ready."}</p>
          </div>
          <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <li key={s.title}>
                <DharmaCard icon={s.icon} title={s.title} tone={s.tone} pattern={s.pattern} eyebrow={`Step ${i + 1}`}>
                  {s.text}
                </DharmaCard>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* SEVA OF OWN WISH: what others have given, in their own words */}
      <section id="own-wish" className="scroll-mt-28 bg-white px-6 py-16 lg:px-[108px] lg:py-24">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-10">
          <div className="mx-auto flex max-w-[760px] flex-col items-center gap-4 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.96px] text-[#e87722]">{"SEVA OF OWN WISH"}</p>
            <h2 className="font-serif text-4xl font-bold leading-[1.1] text-[#3e1815] lg:text-[48px]">{"What others have given, in their own wish"}</h2>
            <Ornament />
            <p className="text-lg leading-7 text-[#595656]">{"Not every seva fits on a card. Here are the wishes that devotees have chosen to give for, in their own words. They appear by themselves as offerings come in."}</p>
          </div>
          <OwnWishFeed limit={6} />
          <div className="text-center">
            <Link href="#give-seva" className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#f47700] to-[#ff9417] px-7 py-3.5 text-[15px] font-bold text-white shadow-[0_14px_34px_rgba(244,119,0,0.35)] transition-all hover:-translate-y-0.5 hover:brightness-110">
              <HandHeart className="h-5 w-5" aria-hidden />
              {"Give a seva of your own wish"}
            </Link>
          </div>
        </div>
      </section>

      {/* THE GALLERY OF SEVA OF OWN WISH: photos and videos shared with the people whose wish it was */}
      <section id="gallery" className="scroll-mt-28 bg-white px-6 py-16 lg:px-[108px] lg:py-24">
        <div className="mx-auto flex max-w-[1100px] flex-col gap-12">
          <div className="mx-auto flex max-w-[760px] flex-col items-center gap-4 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.96px] text-[#e87722]">{"GALLERY"}</p>
            <h2 className="font-serif text-4xl font-bold leading-[1.1] text-[#3e1815] lg:text-[48px]">{"Wishes fulfilled"}</h2>
            <Ornament />
            <p className="text-lg leading-7 text-[#595656]">{"Photographs and videos of the seva of own wish. Whatever is shared is shown only after our team has approved it. The seva of our initiatives has a gallery of its own, on the home page."}</p>
          </div>
          <GalleryBody folders={[OWN_WISH_FOLDER]} gallery="own-wish" emptyText="Photos and videos will appear here when anyone shares them with us and our team has approved them." />
        </div>
      </section>

      {/* SHARE YOUR SEVA */}
      <section id="share" className="scroll-mt-28 bg-[#fdf6ec] px-6 py-16 lg:px-[108px] lg:py-24">
        <div className="mx-auto flex max-w-[1100px] flex-col gap-10">
          <div className="mx-auto flex max-w-[760px] flex-col items-center gap-4 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.96px] text-[#e87722]">{"FOR MEMBERS"}</p>
            <h2 className="font-serif text-4xl font-bold leading-[1.1] text-[#3e1815] lg:text-[48px]">{"Share the story of your wish"}</h2>
            <Ornament />
            <p className="text-lg leading-7 text-[#595656]">{"The people who make our family are its best story. Members can add photographs and videos of their own wish fulfilled. Each one is shown after our team has approved it."}</p>
          </div>
          <SevaShare />
        </div>
      </section>

      <AdSlot size="banner" cta={"Explore"} />
    </>
  );
}
