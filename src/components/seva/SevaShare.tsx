"use client";

import Link from "next/link";
import { FolderOpen, ImagePlus, Lock, ShieldCheck, UserRound, UploadCloud } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import GalleryUploadForm from "@/components/gallery/GalleryUploadForm";
import { OWN_WISH_FOLDER } from "@/lib/data/gallery";
import { SEVA_TYPES } from "@/lib/data/seva";

const STEPS = [
  { icon: UserRound, title: "Sign in as a member", text: "Sharing is for people who have a Shyam Jagat account." },
  { icon: FolderOpen, title: "Pick your wish", text: "Choose the seva of own wish that your photo or video belongs to." },
  { icon: UploadCloud, title: "Upload photos or videos", text: "Add a JPG or PNG, or a short video, with a few words about it." },
  { icon: ShieldCheck, title: "We check, then it appears", text: "Our team looks at each photo and video first. Once it is approved, it joins the gallery for everyone to see." },
];

/**
 * "Share your seva": the way a member will add photographs to the folder of their seva. It is not open yet, so the uploader is
 * drawn out of focus and cannot be used, with a card over it that explains how it will work. Nothing can be uploaded from here.
 */
export default function SevaShare() {
  const { user, loading } = useAuth();

  // A signed-in member can share right here.
  if (user) {
    return (
      <div className="rounded-[28px] border border-[#e0b94f]/50 bg-white p-6 shadow-[0_24px_60px_rgba(107,31,31,0.12)] sm:p-10">
        <h3 className="font-serif text-2xl font-bold text-[#3e1815] sm:text-3xl">{"Share your wish fulfilled"}</h3>
        <p className="mb-6 mt-2 text-[15px] leading-relaxed text-[#595656]">{"Add a photograph or a short video. It goes to our team first, and appears in the gallery only after it is approved."}</p>
        <GalleryUploadForm gallery="own-wish" folders={[{ slug: OWN_WISH_FOLDER.slug, title: OWN_WISH_FOLDER.title }]} />
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-[28px] border border-[#e0b94f]/50 bg-white shadow-[0_24px_60px_rgba(107,31,31,0.12)]">
      {/* the uploader, out of focus and locked */}
      <div aria-hidden className="pointer-events-none absolute inset-0 grid select-none gap-6 overflow-hidden p-6 blur-[5px] sm:p-10 lg:grid-cols-[1.2fr_1fr]">
        <div className="flex min-h-[280px] flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-[#e0b94f] bg-[#fffaf0] p-6 text-center">
          <ImagePlus className="h-12 w-12 text-[#e47105]" />
          <p className="font-serif text-xl font-bold text-[#3e1815]">{"Drop your photos or videos here"}</p>
          <p className="text-sm text-[#6b6b6b]">{"JPG or PNG, up to 5 MB each"}</p>
        </div>
        <div className="flex flex-col gap-4">
          <div className="h-12 rounded-xl border border-[#e8ddd0] bg-white px-4 py-3 text-sm text-[#8a8580]">{SEVA_TYPES[0].title}</div>
          <div className="h-12 rounded-xl border border-[#e8ddd0] bg-white px-4 py-3 text-sm text-[#8a8580]">{"A short caption"}</div>
          <div className="h-24 rounded-xl border border-[#e8ddd0] bg-white" />
          <div className="rounded-xl bg-[#e47105] px-6 py-3 text-center text-sm font-bold text-white">{"Share with the family"}</div>
        </div>
      </div>

      {/* how it will work */}
      <div className="relative flex items-center justify-center bg-gradient-to-b from-white/55 via-white/70 to-white/55 p-3 sm:p-8">
        <div className="w-full max-w-[880px] rounded-3xl border border-[#e0b94f]/70 bg-white/92 p-5 text-center shadow-[0_24px_60px_rgba(107,31,31,0.22)] backdrop-blur-md sm:p-8">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#fdf0d5] px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#8a6100]">
            <Lock className="h-3.5 w-3.5" aria-hidden />
            {"For members"}
          </span>
          <h3 className="mt-3 font-serif text-2xl font-bold text-[#3e1815] sm:text-3xl">{"Share your wish fulfilled"}</h3>
          <p className="mx-auto mt-2 max-w-[560px] text-[15px] leading-relaxed text-[#595656]">{"Members can add photographs and videos of their own wish to the gallery above. Sign in to share. This is how it works:"}</p>

          <ol className="mt-5 grid gap-3 text-left sm:grid-cols-2">
            {STEPS.map((s, i) => (
              <li key={s.title} className="flex items-start gap-3 rounded-2xl border border-[#f0e3cc] bg-[#fffdf8] p-4">
                <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#f47700] to-[#ff9417] text-white">
                  <s.icon className="h-5 w-5" aria-hidden />
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#6b1f1f] text-[10px] font-bold">{i + 1}</span>
                </span>
                <span>
                  <span className="block text-[15px] font-bold text-[#3e1815]">{s.title}</span>
                  <span className="mt-0.5 block text-[13px] leading-relaxed text-[#6b6b6b]">{s.text}</span>
                </span>
              </li>
            ))}
          </ol>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {loading ? null : (
              <>
                <Link href="/signup" className="rounded-xl bg-gradient-to-r from-[#f47700] to-[#ff9417] px-6 py-3 text-sm font-bold text-white shadow-[0_10px_22px_rgba(244,119,0,0.35)] transition-transform hover:-translate-y-0.5">
                  {"Create your account"}
                </Link>
                <Link href="/login" className="rounded-xl border border-[#e47105] px-6 py-3 text-sm font-bold text-[#e47105] transition-colors hover:bg-[#fff1d8]">
                  {"Log in"}
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
