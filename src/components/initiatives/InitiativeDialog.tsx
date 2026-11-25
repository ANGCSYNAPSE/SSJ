"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { Check, HandHeart, X } from "lucide-react";
import SevaDialog from "@/components/seva/SevaDialog";
import { INITIATIVE_NOTE, type Initiative } from "@/lib/data/initiatives";
import { sevaForInitiative, type SevaType } from "@/lib/data/seva";

/**
 * A short, plain description of one service: its picture(s), what we aim to do, and a reminder that these are aims, not
 * guarantees. Closes on Escape, on a click outside, or with the close button.
 */
export default function InitiativeDialog({ item, onClose }: { item: Initiative | null; onClose: () => void }) {
  const [shown, setShown] = useState(0);
  // the seva form, opened from this service ("Give this seva")
  const [giving, setGiving] = useState<{ seva: SevaType; wish?: string } | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // A different service starts again from its first picture.
  useEffect(() => setShown(0), [item?.slug]);

  useEffect(() => {
    if (!item) return;
    const previous = document.activeElement as HTMLElement | null;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    // The page behind stays where it is while the dialog is open.
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      previous?.focus?.();
    };
  }, [item, onClose]);

  if (!item && !giving) return null;
  if (!item) return <SevaDialog seva={giving!.seva} initialWish={giving!.wish} onClose={() => setGiving(null)} />;
  const picture = item.images[Math.min(shown, item.images.length - 1)];

  return (
    <>
      {createPortal(
    <div
      className="fixed inset-0 z-[90] flex items-end justify-center bg-black/55 p-0 sm:items-center sm:p-6"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={item.title}
        className="relative flex max-h-[94vh] w-full max-w-[min(960px,calc(54vh*1.82))] flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#3e1815] shadow transition-colors hover:bg-white"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex min-h-0 flex-1 flex-col">
          <div className="relative aspect-[1399/768] w-full shrink-0 bg-[#2b1111]">
            <Image key={picture} src={picture} alt={item.title} fill sizes="(min-width: 768px) 900px, 100vw" className="object-contain" priority />
            {/* the actions, over the foot of the picture, where they are always in view */}
            <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-center gap-2.5 bg-gradient-to-t from-black/75 via-black/45 to-transparent px-4 pb-3.5 pt-14 sm:gap-3 sm:px-6 sm:pb-5">
              <button
                type="button"
                onClick={() => {
                  setGiving(sevaForInitiative(item.slug, item.title.split(" (")[0]));
                  onClose();
                }}
                className="inline-flex items-center gap-2 rounded-xl bg-[#f47700] px-5 py-3 text-sm font-bold text-white shadow-[0_8px_20px_rgba(0,0,0,0.4)] ring-1 ring-white/30 transition-all hover:-translate-y-0.5 hover:brightness-110 sm:text-[15px]"
              >
                <HandHeart className="h-4 w-4" aria-hidden />
                {"Give this seva"}
              </button>
              <Link href="/signup?register=volunteer" onClick={onClose} className="rounded-xl bg-white/95 px-5 py-3 text-sm font-bold text-[#6b1f1f] shadow-[0_8px_20px_rgba(0,0,0,0.35)] transition-all hover:-translate-y-0.5 hover:bg-white sm:text-[15px]">
                {"Volunteer with us"}
              </Link>
              <Link href="/contact" onClick={onClose} className="rounded-xl border border-white/70 bg-white/10 px-4 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/25 sm:text-[15px]">
                {"Ask a question"}
              </Link>
            </div>
          </div>
          {item.images.length > 1 && (
            <div className="flex shrink-0 gap-2 bg-[#fdf6ec] px-5 py-3">
              {item.images.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setShown(i)}
                  aria-label={`Picture ${i + 1} of ${item.images.length}`}
                  className={`relative h-14 w-20 overflow-hidden rounded-lg border-2 transition-opacity ${i === shown ? "border-[#e47105]" : "border-transparent opacity-70 hover:opacity-100"}`}
                >
                  <Image src={src} alt="" fill sizes="80px" className="object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* the words scroll, without showing a scrollbar */}
          <div className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto px-6 pb-7 pt-5 [-ms-overflow-style:none] [scrollbar-width:none] sm:px-9 [&::-webkit-scrollbar]:hidden">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#e47105]">{item.tag}</span>
              <h2 className="mt-1 font-serif text-3xl font-bold leading-tight text-[#3e1815]">{item.title}</h2>
              <div className="notranslate hindi-sub mt-0.5 text-base text-[#8a6b6b]" translate="no">
                {item.hindi}
              </div>
            </div>

            <div className="text-base leading-[1.75] text-[#595656]">{item.intro}</div>

            <div>
              <h3 className="font-serif text-xl font-bold text-[#3e1815]">{"What we aim to do"}</h3>
              <ul className="mt-3 flex flex-col gap-2.5">
                {item.aims.map((aim) => (
                  <li key={aim} className="flex items-start gap-3 text-[15px] leading-relaxed text-[#3e1815]">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-[#e47105]" aria-hidden />
                    <span>{aim}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl bg-[#fdf6ec] px-4 py-3 text-sm leading-relaxed text-[#6b4f4f]">{INITIATIVE_NOTE}</div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
      )}
      {giving && <SevaDialog seva={giving.seva} initialWish={giving.wish} onClose={() => setGiving(null)} />}
    </>
  );
}
