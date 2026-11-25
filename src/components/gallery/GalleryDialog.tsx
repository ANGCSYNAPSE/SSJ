"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Images, X } from "lucide-react";
import GalleryBody from "@/components/gallery/GalleryBody";
import type { GalleryFolder } from "@/lib/data/gallery";

/**
 * A gallery in a dialog, opened from the section it belongs to (so the visitor never leaves the page): folders, and in each
 * folder photographs and videos. Closes on Escape, on a click outside, or with the close button.
 */
export default function GalleryDialog({ open, onClose, title, subtitle, folders, gallery, note, emptyText }: { open: boolean; onClose: () => void; title: string; subtitle: string; folders: GalleryFolder[]; gallery: "initiatives" | "own-wish"; note?: string; emptyText: string }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      previous?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[90] flex items-end justify-center bg-black/60 p-0 backdrop-blur-[2px] sm:items-center sm:p-6" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div role="dialog" aria-modal="true" aria-label={title} className="gs-rise relative flex h-[92vh] w-full max-w-[1080px] flex-col overflow-hidden rounded-t-3xl bg-[#fdf6ec] shadow-2xl sm:rounded-3xl">
        <header className="relative flex shrink-0 items-center gap-4 border-b border-[#e0b94f]/40 bg-gradient-to-r from-[#4a0e0e] via-[#7a2312] to-[#b4501a] px-6 py-5 pr-16 text-white">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/15 text-[#ffd66b]">
            <Images className="h-6 w-6" aria-hidden />
          </span>
          <div className="min-w-0">
            <h2 className="font-serif text-2xl font-bold leading-tight">{title}</h2>
            <p className="text-sm text-white/80">{subtitle}</p>
          </div>
          <button ref={closeRef} type="button" onClick={onClose} aria-label="Close" className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25">
            <X className="h-5 w-5" />
          </button>
        </header>
        <div className="min-h-0 flex-1 overflow-y-auto p-5 sm:p-7">
          <GalleryBody folders={folders} gallery={gallery} note={note} emptyText={emptyText} />
        </div>
      </div>
    </div>,
    document.body,
  );
}
