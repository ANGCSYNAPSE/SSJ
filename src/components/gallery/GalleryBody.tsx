"use client";

import { useCallback, useEffect, useState } from "react";
import { ArrowLeft, Camera, ChevronLeft, ChevronRight, FolderOpen, Play, Video, X } from "lucide-react";
import { useApprovedGallery } from "@/components/gallery/useApprovedGallery";
import type { GalleryFolder } from "@/lib/data/gallery";

type Tab = "photos" | "videos";

/**
 * A gallery with folders. With several folders it begins with a tile for each (open one to see what is inside); with one it
 * opens that folder at once. Inside a folder there are two tabs, Photos and Videos. A photograph opens large (arrows or the
 * keyboard move between photographs, Esc closes); a video plays right there. A folder with nothing in it yet says so kindly.
 */
export default function GalleryBody({ folders: base, gallery, note, emptyText }: { folders: GalleryFolder[]; /** Which gallery: the approved photographs and videos of it are added to the folders. */ gallery: "initiatives" | "own-wish"; note?: string; /** What a folder (or the whole gallery) with nothing in it says. */ emptyText: string }) {
  const folders = useApprovedGallery(gallery, base);
  const single = folders.length === 1;
  const nothingAtAll = folders.every((f) => f.photos.length === 0 && f.videos.length === 0);
  const [openSlug, setOpenSlug] = useState<string | null>(single ? folders[0].slug : null);
  const [tab, setTab] = useState<Tab>("photos");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const open = folders.find((f) => f.slug === openSlug) ?? null;
  const photos = open?.photos ?? [];

  const step = useCallback((d: number) => setLightbox((i) => (i === null ? i : (i + d + photos.length) % photos.length)), [photos.length]);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        setLightbox(null);
      }
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [lightbox, step]);

  const openFolder = (slug: string) => {
    setOpenSlug(slug);
    setTab("photos");
    setLightbox(null);
  };

  // Before anything has been shared and approved: the folders, out of focus, with a note over them.
  if (!open && nothingAtAll) {
    return (
      <div className="relative overflow-hidden rounded-2xl">
        <ul aria-hidden className="pointer-events-none grid select-none grid-cols-2 gap-4 blur-[7px] sm:grid-cols-3 lg:grid-cols-4">
          {folders.slice(0, 8).map((f) => (
            <li key={f.slug}>
              <span className="relative block aspect-[4/5] overflow-hidden rounded-2xl" style={{ background: `linear-gradient(160deg, ${f.tone[0]}, ${f.tone[1]})` }}>
                <span className="absolute right-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[#6b1f1f]">
                  <FolderOpen className="h-4 w-4" />
                </span>
                <span className="absolute inset-x-0 bottom-0 p-3.5 font-serif text-lg font-bold text-white">{f.title}</span>
              </span>
            </li>
          ))}
        </ul>
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <p className="max-w-[460px] rounded-2xl border border-[#e0b94f]/60 bg-white/90 px-6 py-5 text-center text-base leading-relaxed text-[#5b4a4a] shadow-xl backdrop-blur">{emptyText}</p>
        </div>
      </div>
    );
  }

  if (!open) {
    return (
      <ul key="folders" className="gs-slide grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {folders.map((f) => (
          <li key={f.slug}>
            <button type="button" onClick={() => openFolder(f.slug)} className="group relative block w-full text-left focus:outline-none focus-visible:ring-4 focus-visible:ring-[#ffb347]">
              <span className="relative block aspect-[4/5] overflow-hidden rounded-2xl shadow-[0_14px_30px_rgba(107,31,31,0.18)] transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_22px_40px_rgba(107,31,31,0.26)]" style={{ background: `linear-gradient(160deg, ${f.tone[0]}, ${f.tone[1]})` }}>
                <span aria-hidden className="absolute inset-x-0 top-0 z-10 h-1.5" style={{ background: f.tone[0] }} />
                {f.photos[0] && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={f.photos[0].src} alt="" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                )}
                <span aria-hidden className="absolute inset-0" style={{ background: `linear-gradient(to top, ${f.tone[1]} 6%, ${f.tone[1]}d9 26%, transparent 62%)` }} />
                <span className="absolute right-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[#6b1f1f] shadow">
                  <FolderOpen className="h-4 w-4" aria-hidden />
                </span>
                <span className="absolute inset-x-0 bottom-0 flex flex-col gap-0.5 p-3.5 text-white">
                  <span className="font-serif text-lg font-bold leading-tight">{f.title}</span>
                  <span className="notranslate hindi-sub text-xs text-white/85" translate="no">{f.hindi}</span>
                  <span className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-white/80">
                    {f.photos.length} {f.photos.length === 1 ? "photo" : "photos"}
                    {" · "}
                    {f.videos.length} {f.videos.length === 1 ? "video" : "videos"}
                  </span>
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    );
  }

  const empty = open.photos.length === 0 && open.videos.length === 0;

  return (
    <div key={open.slug} className="gs-slide flex flex-col gap-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="flex flex-col gap-1">
          {!single && (
            <button type="button" onClick={() => { setOpenSlug(null); setLightbox(null); }} className="inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-[#e47105] hover:underline">
              <ArrowLeft className="h-4 w-4" aria-hidden /> {"All folders"}
            </button>
          )}
          <h3 className="font-serif text-3xl font-bold text-[#3e1815]">{open.title}</h3>
          <p className="notranslate hindi-sub text-sm text-[#8a6b6b]" translate="no">{open.hindi}</p>
        </div>

        <div role="tablist" aria-label="Photos or videos" className="flex gap-1 rounded-full border border-[#e0b94f]/50 bg-white p-1">
          {([["photos", Camera, "Photos", open.photos.length], ["videos", Video, "Videos", open.videos.length]] as const).map(([key, Icon, label, count]) => (
            <button key={key} type="button" role="tab" aria-selected={tab === key} onClick={() => { setTab(key); setLightbox(null); }} className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition-all ${tab === key ? "bg-gradient-to-r from-[#f47700] to-[#ff9417] text-white shadow-md" : "text-[#6b1f1f] hover:bg-[#fff1d8]"}`}>
              <Icon className="h-4 w-4" aria-hidden />
              {label}
              <span className={`rounded-full px-1.5 text-[11px] ${tab === key ? "bg-white/25" : "bg-[#fdf0d5]"}`}>{count}</span>
            </button>
          ))}
        </div>
      </div>

      {empty ? (
        <div className="relative overflow-hidden rounded-2xl border border-dashed border-[#e0b94f]/70 bg-[#fffaf0] p-5">
          {/* out-of-focus tiles, so the place already looks like a gallery */}
          <div aria-hidden className="pointer-events-none grid grid-cols-2 gap-3 blur-[6px] sm:grid-cols-4">
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className="flex aspect-[4/3] items-center justify-center rounded-xl bg-gradient-to-br from-[#f0d9b0] to-[#e3bd84]">
                {i % 2 ? <Play className="h-8 w-8 text-white/80" /> : <Camera className="h-8 w-8 text-white/80" />}
              </span>
            ))}
          </div>
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <p className="max-w-[440px] rounded-2xl border border-[#e0b94f]/60 bg-white/90 px-5 py-4 text-center text-[15px] leading-relaxed text-[#5b4a4a] shadow-lg backdrop-blur">{emptyText}</p>
          </div>
        </div>
      ) : tab === "photos" ? (
        open.photos.length === 0 ? (
          <p className="rounded-xl bg-[#fffaf0] px-4 py-6 text-center text-sm text-[#6b4f4f]">{"No photos in this folder yet."}</p>
        ) : (
          <ul className="grid grid-cols-2 gap-4 lg:grid-cols-3">
            {open.photos.map((p, i) => (
              <li key={p.src}>
                <button type="button" onClick={() => setLightbox(i)} aria-label={`Open photo: ${p.alt}`} className="group relative block aspect-[4/3] w-full overflow-hidden rounded-2xl border border-[#e0b94f]/40 shadow-[0_10px_24px_rgba(107,31,31,0.12)] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#ffb347]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.src} alt={p.alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </button>
              </li>
            ))}
          </ul>
        )
      ) : open.videos.length === 0 ? (
        <p className="rounded-xl bg-[#fffaf0] px-4 py-6 text-center text-sm text-[#6b4f4f]">{"No videos in this folder yet."}</p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2">
          {open.videos.map((v) => (
            <li key={v.youtubeId ?? v.src} className="flex flex-col gap-2">
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-[#e0b94f]/40 bg-black">
                {v.youtubeId ? (
                  <iframe src={`https://www.youtube-nocookie.com/embed/${v.youtubeId}?rel=0&modestbranding=1`} title={v.title} allow="encrypted-media; picture-in-picture" allowFullScreen loading="lazy" className="absolute inset-0 h-full w-full" />
                ) : (
                  <video src={v.src} controls preload="metadata" className="absolute inset-0 h-full w-full" />
                )}
              </div>
              <p className="text-sm font-semibold text-[#3e1815]">{v.title}</p>
            </li>
          ))}
        </ul>
      )}

      {note && !empty && <p className="text-xs leading-relaxed text-[#6b4f4f]/80">{note}</p>}

      {lightbox !== null && photos[lightbox] && (
        <div role="dialog" aria-modal="true" aria-label={photos[lightbox].alt} className="fixed inset-0 z-[120] flex items-center justify-center bg-[#140505]/90 p-4 backdrop-blur-sm" onClick={() => setLightbox(null)}>
          <button type="button" onClick={() => setLightbox(null)} aria-label="Close" className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25">
            <X className="h-5 w-5" aria-hidden />
          </button>
          {photos.length > 1 && (
            <button type="button" onClick={(e) => { e.stopPropagation(); step(-1); }} aria-label="Previous photo" className="absolute left-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25 sm:left-6">
              <ChevronLeft className="h-6 w-6" aria-hidden />
            </button>
          )}
          <div className="relative h-[78vh] w-full max-w-[1000px]" onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photos[lightbox].src} alt={photos[lightbox].alt} className="absolute inset-0 h-full w-full rounded-xl object-contain" />
          </div>
          {photos.length > 1 && (
            <button type="button" onClick={(e) => { e.stopPropagation(); step(1); }} aria-label="Next photo" className="absolute right-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25 sm:right-6">
              <ChevronRight className="h-6 w-6" aria-hidden />
            </button>
          )}
          <p className="absolute inset-x-0 bottom-5 px-6 text-center text-sm text-white/85">{photos[lightbox].alt}</p>
        </div>
      )}
    </div>
  );
}
