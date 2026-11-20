"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { ExternalLink, X } from "lucide-react";
import { LEGAL_DOCS, LEGAL_ORDER, LEGAL_UPDATED, type LegalDocKey } from "@/lib/legal";
import LegalSections from "@/components/legal/LegalSections";
import { cn } from "@/lib/utils";

/**
 * A policy shown right where the person needs it (while signing up, paying or donating) so they never lose their
 * place. It reads the same words as the full page, with tabs to move between the three documents.
 */
export function PolicyDialog({ initial, docs, onClose }: { initial: LegalDocKey; /** Which policies this place shows (only the ones that belong to it). */ docs: LegalDocKey[]; onClose: () => void }) {
  const [active, setActive] = useState<LegalDocKey>(initial);
  const closeRef = useRef<HTMLButtonElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const doc = LEGAL_DOCS[active];
  // Only the policies that belong where the person clicked: signing up shows Terms and Privacy, paying adds Refund.
  const tabs = LEGAL_ORDER.filter((key) => docs.includes(key));

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    // The page behind stays put while the policy is read.
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [onClose]);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: 0 });
  }, [active]);

  return createPortal(
    <div
      className="fixed inset-0 z-[90] flex items-end justify-center bg-black/55 p-0 sm:items-center sm:p-6"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div role="dialog" aria-modal="true" aria-label={doc.title} className="flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl">
        <div className="border-b border-[#d4af37]/30 bg-[#fffaf1] px-5 pt-4 sm:px-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="font-serif text-xl font-bold text-maroon sm:text-2xl">{doc.title}</h2>
              <p className="mt-0.5 text-xs text-[#8a8580]">{`Last updated: ${LEGAL_UPDATED}`}</p>
            </div>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="rounded-full p-1.5 text-[#8a8580] transition-colors hover:bg-black/5 hover:text-maroon"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div role="tablist" aria-label="Policies" className={cn("-mb-px mt-3 flex gap-1 overflow-x-auto", tabs.length < 2 && "hidden")}>
            {tabs.map((key) => (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={active === key}
                onClick={() => setActive(key)}
                className={cn(
                  "whitespace-nowrap border-b-2 px-3 py-2 text-sm font-semibold transition-colors",
                  active === key ? "border-[#e47105] text-[#e47105]" : "border-transparent text-[#595656] hover:text-maroon",
                )}
              >
                {LEGAL_DOCS[key].short}
              </button>
            ))}
          </div>
          {tabs.length < 2 && <div className="pb-3" />}
        </div>

        <div ref={bodyRef} className="overflow-y-auto px-5 py-5 sm:px-7">
          <p className="mb-5 text-sm leading-relaxed text-[#595656]">{doc.intro}</p>
          <LegalSections sections={doc.sections} compact idPrefix={`dlg-${active}-`} />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#d4af37]/30 bg-[#fffaf1] px-5 py-3 sm:px-7">
          <Link href={doc.href} target="_blank" rel="noopener" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#e47105] hover:underline">
            {"Open the full page"}
            <ExternalLink className="h-3.5 w-3.5" aria-hidden />
          </Link>
          <button type="button" onClick={onClose} className="rounded-lg bg-[#e87722] px-5 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90">
            {"Close"}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

/**
 * A link to a policy that opens it in place (see PolicyHost). It is an ordinary link to the full page too, so it
 * works without JavaScript and with a middle-click or Ctrl-click. The pop-up is opened by one listener for the whole
 * site rather than by a handler on each link: the page translator copies text blocks, and copied links keep their
 * address and data-policy but lose their React handlers.
 */
export default function PolicyLink({ doc, with: alongside = [], children, className }: { doc: LegalDocKey; /** Other policies that belong in the same place, shown as tabs. */ with?: LegalDocKey[]; children: React.ReactNode; className?: string }) {
  const docs = [doc, ...alongside.filter((d) => d !== doc)].join(",");
  return (
    <a href={LEGAL_DOCS[doc].href} data-policy={doc} data-policy-docs={docs} className={className ?? "text-primary underline"}>
      {children}
    </a>
  );
}

/** Mounted once in the root layout: opens the policy pop-up when any policy link is clicked. */
export function PolicyHost() {
  const [open, setOpen] = useState<{ doc: LegalDocKey; docs: LegalDocKey[] } | null>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element | null)?.closest?.("a[data-policy]");
      const key = link?.getAttribute("data-policy");
      if (!key || !(key in LEGAL_DOCS)) return;
      e.preventDefault();
      const docs = (link?.getAttribute("data-policy-docs") ?? key).split(",").filter((d): d is LegalDocKey => d in LEGAL_DOCS);
      setOpen({ doc: key as LegalDocKey, docs: docs.length ? docs : [key as LegalDocKey] });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return open ? <PolicyDialog initial={open.doc} docs={open.docs} onClose={() => setOpen(null)} /> : null;
}
