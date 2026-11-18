"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Eye, X } from "lucide-react";

/**
 * A short "N details still to add" notice with a Preview button. The button opens the full list in a
 * small window, so the confirmation screen stays crisp instead of showing every missing field at once.
 */
export default function PendingPreview({ items, categoryKey, title }: { items: string[]; categoryKey?: string; title?: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  if (items.length === 0) return null;

  return (
    <>
      <div className="flex w-full max-w-[340px] items-center justify-between gap-3 rounded-xl bg-amber-50 px-3.5 py-2.5 text-left">
        <p className="text-xs font-semibold text-amber-900">
          {items.length} detail{items.length === 1 ? "" : "s"} still to add
        </p>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex shrink-0 items-center gap-1.5 rounded-lg border border-amber-300 bg-white px-3 py-1.5 text-xs font-bold text-amber-900 transition-colors hover:bg-amber-100"
        >
          <Eye className="h-3.5 w-3.5" aria-hidden /> Preview
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-[#12060a]/60 p-4 backdrop-blur-sm" onClick={() => setOpen(false)}>
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Details still to add"
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[400px] rounded-2xl bg-white p-5 shadow-[0_30px_80px_rgba(0,0,0,0.45)]"
          >
            <button type="button" onClick={() => setOpen(false)} aria-label="Close" className="absolute right-3 top-3 text-muted-foreground hover:text-maroon">
              <X className="h-5 w-5" />
            </button>
            <h2 className="font-serif text-lg font-bold text-maroon">{title ?? "Details still to add"}</h2>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {items.length} detail{items.length === 1 ? "" : "s"} pending. You can add them any time.
            </p>
            <ul className="mt-3 flex max-h-[45vh] flex-wrap gap-1.5 overflow-y-auto">
              {items.map((item) => (
                <li key={item} className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-900">
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-4 flex gap-2">
              {categoryKey && (
                <Link
                  href={`/complete-profile?category=${categoryKey}`}
                  className="flex-1 rounded-xl bg-gradient-to-r from-primary to-primary-dark py-2 text-center text-sm font-semibold text-white"
                >
                  Complete now
                </Link>
              )}
              <button type="button" onClick={() => setOpen(false)} className="flex-1 rounded-xl border border-border py-2 text-sm font-semibold text-maroon hover:bg-cream">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
