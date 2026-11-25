"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CheckCircle2, Clock, EyeOff, ImagePlus, Loader2, Video, X } from "lucide-react";
import { ApiError, galleryApi, uploadsApi, type MyGalleryItem } from "@/lib/api";

const MAX_MB = 8;
const ACCEPT = "image/jpeg,image/png,image/webp,video/mp4,video/webm";

const STATUS: Record<MyGalleryItem["status"], { label: string; cls: string; icon: typeof Clock }> = {
  pending: { label: "Waiting for approval", cls: "bg-amber-50 text-amber-800", icon: Clock },
  approved: { label: "Shown in the gallery", cls: "bg-green-50 text-green-800", icon: CheckCircle2 },
  rejected: { label: "Not shown", cls: "bg-gray-100 text-gray-600", icon: EyeOff },
};

/**
 * Where a signed-in member shares a photograph or a video for a gallery: pick the folder (when there are several), choose the
 * file, write a few words, and confirm it is theirs to share. It goes to our team first; it appears in the gallery only after an
 * admin approves it. Below the form the member sees what they have shared and where each one stands.
 */
export default function GalleryUploadForm({ gallery, folders, defaultFolder }: { gallery: "initiatives" | "own-wish"; folders: { slug: string; title: string }[]; defaultFolder?: string }) {
  const [folder, setFolder] = useState(defaultFolder ?? folders[0]?.slug ?? "");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [caption, setCaption] = useState("");
  const [consent, setConsent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [mine, setMine] = useState<MyGalleryItem[]>([]);
  const input = useRef<HTMLInputElement>(null);

  const loadMine = useCallback(() => {
    galleryApi
      .mine()
      .then((items) => setMine(items.filter((i) => i.gallery === gallery && folders.some((f) => f.slug === i.folder))))
      .catch(() => undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gallery, folders.map((f) => f.slug).join()]);

  useEffect(() => loadMine(), [loadMine]);

  // the preview of the chosen file, freed when it is changed
  useEffect(() => {
    if (!file) return setPreview(null);
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  function choose(f: File | null) {
    setError("");
    setSent(false);
    if (!f) return setFile(null);
    if (!ACCEPT.split(",").includes(f.type)) return setError("Please choose a JPG, PNG or WebP picture, or an MP4 or WebM video.");
    if (f.size > MAX_MB * 1024 * 1024) return setError(`Please choose a file smaller than ${MAX_MB} MB.`);
    setFile(f);
  }

  async function send(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!file) return setError("Please choose a photo or a video.");
    if (!folder) return setError("Please choose the seva this is for.");
    if (!consent) return setError("Please confirm that this is yours to share, and that the people in it are happy for it to be shown.");
    setBusy(true);
    try {
      const { url } = await uploadsApi.upload(file);
      await galleryApi.share({ gallery, folder, kind: file.type.startsWith("video/") ? "video" : "photo", url, caption: caption.trim() || undefined });
      setSent(true);
      setFile(null);
      setCaption("");
      setConsent(false);
      if (input.current) input.current.value = "";
      loadMine();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "We could not send it just now. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  const folderTitle = (slug: string) => folders.find((f) => f.slug === slug)?.title ?? slug;

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={send} className="flex flex-col gap-5">
        {folders.length > 1 && (
          <label className="flex flex-col gap-1.5">
            <span className="text-[13px] font-semibold text-[#444]">Which seva is it for?</span>
            <select value={folder} onChange={(e) => setFolder(e.target.value)} className="h-12 rounded-xl border border-[#e8ddd0] bg-white px-4 text-sm text-[#3e1815] focus:border-[#e87722] focus:outline-none">
              {folders.map((f) => (
                <option key={f.slug} value={f.slug}>
                  {f.title}
                </option>
              ))}
            </select>
          </label>
        )}

        <div className="flex flex-col gap-1.5">
          <span className="text-[13px] font-semibold text-[#444]">Photo or video</span>
          {file && preview ? (
            <div className="relative overflow-hidden rounded-2xl border border-[#e0b94f]/50 bg-black/5">
              {file.type.startsWith("video/") ? <video src={preview} controls className="max-h-[300px] w-full object-contain" /> : // eslint-disable-next-line @next/next/no-img-element
                <img src={preview} alt="The photo you chose" className="max-h-[300px] w-full object-contain" />}
              <button type="button" onClick={() => { setFile(null); if (input.current) input.current.value = ""; }} aria-label="Remove this file" className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-[#3e1815] shadow">
                <X className="h-4 w-4" aria-hidden />
              </button>
            </div>
          ) : (
            <button type="button" onClick={() => input.current?.click()} onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); choose(e.dataTransfer.files?.[0] ?? null); }} className="flex min-h-[170px] flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-[#e0b94f] bg-[#fffaf0] p-6 text-center transition-colors hover:bg-[#fff3d9]">
              <span className="flex gap-2 text-[#e47105]">
                <ImagePlus className="h-9 w-9" aria-hidden />
                <Video className="h-9 w-9" aria-hidden />
              </span>
              <span className="font-serif text-lg font-bold text-[#3e1815]">Choose a photo or a video</span>
              <span className="text-xs text-[#6b6b6b]">JPG, PNG, WebP, MP4 or WebM, up to {MAX_MB} MB. You can also drop it here.</span>
            </button>
          )}
          <input ref={input} type="file" accept={ACCEPT} className="hidden" onChange={(e) => choose(e.target.files?.[0] ?? null)} />
        </div>

        <label className="flex flex-col gap-1.5">
          <span className="text-[13px] font-semibold text-[#444]">
            A few words <span className="font-normal text-[#8c8c8c]">(optional)</span>
          </span>
          <input value={caption} onChange={(e) => setCaption(e.target.value.slice(0, 200))} placeholder="For example: blankets given on a winter evening" className="h-12 rounded-xl border border-[#e8ddd0] bg-white px-4 text-sm text-[#3e1815] placeholder-[#a39a92] focus:border-[#e87722] focus:outline-none" />
        </label>

        <label className="flex items-start gap-2.5 text-[13px] leading-relaxed text-[#444]">
          <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 h-[18px] w-[18px] shrink-0 rounded accent-[#e87722]" />
          <span>This photo or video is mine to share, and the people in it are happy for it to be shown on the Shyam Jagat website.</span>
        </label>

        {error && <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</p>}
        {sent && (
          <p className="flex items-start gap-2 rounded-lg bg-green-50 px-4 py-3 text-sm font-medium text-green-800">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
            Thank you. It has gone to our team, and it will appear in the gallery after they have looked at it.
          </p>
        )}

        <button type="submit" disabled={busy} className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#f47700] to-[#ff9417] px-7 text-[15px] font-bold text-white shadow-[0_10px_22px_rgba(244,119,0,0.35)] transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 sm:w-fit">
          {busy ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : null}
          {busy ? "Sending…" : "Send for approval"}
        </button>
      </form>

      {mine.length > 0 && (
        <div className="flex flex-col gap-3">
          <p className="text-[13px] font-bold uppercase tracking-wide text-[#8a6100]">What you have shared</p>
          <ul className="grid gap-3 sm:grid-cols-2">
            {mine.slice(0, 6).map((item) => {
              const st = STATUS[item.status];
              return (
                <li key={item.id} className="flex items-center gap-3 rounded-xl border border-[#f0e3cc] bg-white p-2.5">
                  <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-black/5">
                    {item.kind === "video" ? (
                      <span className="flex h-full w-full items-center justify-center text-[#e47105]">
                        <Video className="h-6 w-6" aria-hidden />
                      </span>
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={item.url} alt="" className="h-full w-full object-cover" />
                    )}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold text-[#3e1815]">{item.caption || folderTitle(item.folder)}</span>
                    <span className={`mt-1 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-bold ${st.cls}`}>
                      <st.icon className="h-3 w-3" aria-hidden />
                      {st.label}
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
