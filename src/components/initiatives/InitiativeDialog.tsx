"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { Check, X } from "lucide-react";
import { INITIATIVE_NOTE, type Initiative } from "@/lib/data/initiatives";

/**
 * A short, plain description of one service: its picture(s), what we aim to do, and a reminder that these are aims, not
 * guarantees. Closes on Escape, on a click outside, or with the close button.
 */
export default function InitiativeDialog({ item, onClose }: { item: Initiative | null; onClose: () => void }) {
  const [shown, setShown] = useState(0);
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

  if (!item) return null;
  const picture = item.images[Math.min(shown, item.images.length - 1)];

  return createPortal(
    <div
      className="fixed inset-0 z-[90] flex items-end justify-center bg-black/55 p-0 sm:items-center sm:p-6"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={item.title}
        className="relative flex max-h-[94vh] w-full max-w-[760px] flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl"
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

        <div className="overflow-y-auto">
          <div className="relative aspect-[16/9] w-full bg-[#2b1111]">
            <Image key={picture} src={picture} alt={item.title} fill sizes="(min-width: 768px) 760px, 100vw" className="object-contain" priority />
          </div>
          {item.images.length > 1 && (
            <div className="flex gap-2 bg-[#fdf6ec] px-5 py-3">
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

          <div className="flex flex-col gap-5 px-6 pb-7 pt-5 sm:px-8">
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

            <div className="flex flex-wrap items-center gap-3">
              <Link href="/donation" onClick={onClose} className="rounded-lg bg-[#e47105] px-5 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90">
                {"Support this seva"}
              </Link>
              <Link href="/signup?register=volunteer" onClick={onClose} className="rounded-lg border border-[#e47105] px-5 py-3 text-sm font-bold text-[#e47105] transition-colors hover:bg-[#e47105]/10">
                {"Volunteer with us"}
              </Link>
              <Link href="/contact" onClick={onClose} className="text-sm font-semibold text-[#e47105] hover:underline">
                {"Ask a question"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
