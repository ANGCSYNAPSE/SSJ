"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

/**
 * A confirmation in the middle of the screen: a green tick, a title and a line of text. It closes itself after
 * `seconds` (5 by default), or when the person clicks outside it, presses Escape or uses the close button.
 */
export default function SuccessDialog({
  open,
  title,
  message,
  onClose,
  seconds = 5,
}: {
  open: boolean;
  title: string;
  message: string;
  onClose: () => void;
  seconds?: number;
}) {
  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(onClose, seconds * 1000);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, seconds, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[95] flex items-center justify-center bg-black/45 p-4"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div role="alertdialog" aria-modal="true" aria-label={title} className="relative w-full max-w-sm overflow-hidden rounded-2xl bg-white px-7 pb-8 pt-9 text-center shadow-2xl">
        <button type="button" onClick={onClose} aria-label="Close" className="absolute right-3 top-3 rounded-full p-1.5 text-[#8a8580] transition-colors hover:bg-black/5 hover:text-maroon">
          <X className="h-5 w-5" />
        </button>
        <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 ring-8 ring-green-50">
          <svg viewBox="0 0 24 24" className="h-11 w-11 text-green-600" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M5 12.5l4.5 4.5L19 7.5" />
          </svg>
        </span>
        <h2 className="mt-5 font-serif text-2xl font-bold text-maroon">{title}</h2>
        <p className="mt-2 text-[15px] leading-relaxed text-[#595656]">{message}</p>
        {/* Counts down the seconds before the window closes by itself. */}
        <span className="absolute inset-x-0 bottom-0 h-1 bg-green-100" aria-hidden>
          <span className="block h-full origin-left bg-green-500" style={{ animation: `ssj-countdown ${seconds}s linear forwards` }} />
        </span>
        <style>{"@keyframes ssj-countdown { from { transform: scaleX(1); } to { transform: scaleX(0); } }"}</style>
      </div>
    </div>,
    document.body,
  );
}
