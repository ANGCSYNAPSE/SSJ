"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDown, HandHeart, Upload } from "lucide-react";
import GalleryUploadForm from "@/components/gallery/GalleryUploadForm";
import { INITIATIVE_FOLDERS, OWN_WISH_FOLDER } from "@/lib/data/gallery";
import { findSeva } from "@/lib/data/seva";
import { galleryApi } from "@/lib/api";

type Given = { sevaType: string; offerings: number };

/**
 * The member's own place for pictures: one folder for each seva they have given. Inside a folder they can add a photograph or a
 * video of that seva, and see what they have already shared and whether it is waiting, shown or not shown. Nothing reaches the
 * public galleries until an admin approves it.
 */
export default function ProfileGallery() {
  const [given, setGiven] = useState<Given[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [open, setOpen] = useState<string | null>(null);

  useEffect(() => {
    galleryApi
      .mySevas()
      .then((rows) => {
        setGiven(rows);
        if (rows.length === 1) setOpen(rows[0].sevaType);
      })
      .catch(() => setFailed(true));
  }, []);

  return (
    <>
      <div>
        <h2 className="font-serif text-2xl font-bold text-maroon">{"My gallery"}</h2>
        <p className="mt-1 text-sm text-[#595656]">{"Share a photograph or a video under each seva you have given. It appears in the website gallery only after our team has approved it."}</p>
      </div>

      {failed ? (
        <p className="rounded-2xl border border-[#d4af37]/30 bg-white p-5 text-sm text-[#8a8580]">{"We could not load your sevas just now. Please try again in a moment."}</p>
      ) : given === null ? (
        <div className="h-28 animate-pulse rounded-2xl bg-white/70" aria-hidden />
      ) : given.length === 0 ? (
        <section className="flex flex-col items-center gap-3 rounded-2xl border border-[#d4af37]/30 bg-white p-8 text-center shadow-sm">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#fff1d8] text-[#e47105]">
            <HandHeart className="h-7 w-7" aria-hidden />
          </span>
          <h3 className="font-serif text-xl font-bold text-maroon">{"Your folders appear here after you give a seva"}</h3>
          <p className="max-w-[460px] text-sm leading-relaxed text-[#595656]">{"Each seva you give gets its own folder. You can then add a photograph or a video of it for the gallery."}</p>
          <Link href="/seva#give-seva" className="mt-1 rounded-xl bg-gradient-to-r from-[#f47700] to-[#ff9417] px-6 py-3 text-sm font-bold text-white shadow-[0_10px_22px_rgba(244,119,0,0.35)] transition-transform hover:-translate-y-0.5">
            {"Give seva"}
          </Link>
        </section>
      ) : (
        <ul className="flex flex-col gap-4">
          {given.map((g) => {
            const own = g.sevaType === "your-choice";
            const folder = own ? OWN_WISH_FOLDER : INITIATIVE_FOLDERS.find((f) => f.slug === g.sevaType);
            const title = findSeva(g.sevaType)?.title ?? folder?.title ?? g.sevaType;
            const isOpen = open === g.sevaType;
            // a seva with no folder in the initiatives gallery (none today) could not be shown anywhere, so it is not offered
            if (!folder) return null;
            return (
              <li key={g.sevaType} className="rounded-2xl border border-[#d4af37]/30 bg-white shadow-sm">
                <button type="button" onClick={() => setOpen(isOpen ? null : g.sevaType)} aria-expanded={isOpen} className="flex w-full items-center justify-between gap-3 p-4 text-left sm:p-5">
                  <span className="flex min-w-0 items-center gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white" style={{ background: `linear-gradient(135deg, ${folder.tone[0]}, ${folder.tone[1]})` }}>
                      <Upload className="h-5 w-5" aria-hidden />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate font-serif text-lg font-bold text-[#3e1815]">{title}</span>
                      <span className="block text-xs text-[#8a8580]">{`${g.offerings} offering${g.offerings === 1 ? "" : "s"} given · Add a photo or video`}</span>
                    </span>
                  </span>
                  <ChevronDown className={`h-5 w-5 shrink-0 text-[#8a6100] transition-transform ${isOpen ? "rotate-180" : ""}`} aria-hidden />
                </button>
                {isOpen && (
                  <div className="border-t border-[#f0e3cc] p-4 sm:p-5">
                    <GalleryUploadForm gallery={own ? "own-wish" : "initiatives"} folders={[{ slug: folder.slug, title }]} />
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
