"use client";

import { useEffect, useRef, useState } from "react";
import { Download, EyeOff, Link2, Loader2, Share2 } from "lucide-react";
import { ApiError, cardApi, type MemberCardData } from "@/lib/api";
import { CardPair, downloadCardPicture, shareCardLink } from "@/components/card/MemberCard";
import { cn } from "@/lib/utils";

/**
 * The person's own digital card on their profile: a preview, and the switch that makes it shareable. While sharing is off,
 * the card's link opens nothing for anyone else. Once on, they can share the link or save the card as a picture.
 */
export default function DigitalCardSection() {
  const [data, setData] = useState<{ enabled: boolean; url: string; card: MemberCardData } | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ kind: "error" | "info"; text: string } | null>(null);
  const exportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    cardApi
      .me()
      .then(setData)
      .catch(() => setMessage({ kind: "error", text: "Could not load your card." }));
  }, []);

  async function setSharing(enabled: boolean) {
    setBusy(true);
    setMessage(null);
    try {
      setData(await cardApi.setEnabled(enabled));
      setMessage({ kind: "info", text: enabled ? "Your card can now be shared." : "Your card is private again." });
    } catch (err) {
      setMessage({ kind: "error", text: err instanceof ApiError ? err.message : "Could not change this. Please try again." });
    } finally {
      setBusy(false);
    }
  }

  async function share() {
    if (!data) return;
    const result = await shareCardLink(data.url, data.card.name);
    if (result === "copied") setMessage({ kind: "info", text: "Link copied. Paste it anywhere to share." });
    else if (result === "failed") setMessage({ kind: "error", text: "Could not copy the link." });
  }

  async function save() {
    if (!data || !exportRef.current) return;
    setBusy(true);
    try {
      await downloadCardPicture(exportRef.current, data.card.name);
    } catch {
      setMessage({ kind: "error", text: "Could not save the picture. Please try again." });
    } finally {
      setBusy(false);
    }
  }

  if (!data) return message ? <p className="text-sm text-red-600">{message.text}</p> : null;

  return (
    <section className="rounded-2xl border border-[#d4af37]/30 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="font-serif text-lg font-bold text-maroon">{"My Digital Card"}</h2>
          <p className="text-sm text-[#595656]">
            {data.enabled
              ? "Your card is shareable. Anyone with the link, or the QR code on the back, can see it. It shows only your name, photo, city and what you are on Shyam Jagat. Never your phone or email."
              : "Your card is private. Switch sharing on to get a link and a QR code you can send to anyone."}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setSharing(!data.enabled)}
          disabled={busy}
          className={cn("flex shrink-0 items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold transition-colors disabled:opacity-60", data.enabled ? "border border-[#d4af37]/60 text-maroon hover:bg-[#fff8ec]" : "bg-gradient-to-r from-[#f47700] to-[#ff9417] text-white shadow")}
        >
          {busy ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : data.enabled ? <EyeOff className="h-4 w-4" aria-hidden /> : <Share2 className="h-4 w-4" aria-hidden />}
          {data.enabled ? "Make it private" : "Turn on sharing"}
        </button>
      </div>

      <div className="mt-5 overflow-x-auto pb-2">
        <CardPair card={data.card} url={data.url} />
      </div>

      {data.enabled && (
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button type="button" onClick={share} className="flex items-center gap-2 rounded-lg bg-[#e47105] px-5 py-2.5 text-sm font-bold text-white shadow transition-opacity hover:opacity-90">
            <Share2 className="h-4 w-4" aria-hidden />
            {"Share my card"}
          </button>
          <button type="button" onClick={save} disabled={busy} className="flex items-center gap-2 rounded-lg border border-[#e47105] px-5 py-2.5 text-sm font-bold text-[#e47105] transition-colors hover:bg-[#e47105]/10 disabled:opacity-60">
            <Download className="h-4 w-4" aria-hidden />
            {"Save as picture"}
          </button>
          <a href={data.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm font-semibold text-[#e47105] hover:underline">
            <Link2 className="h-4 w-4" aria-hidden />
            {"Open my card page"}
          </a>
        </div>
      )}
      {message && <p className={cn("mt-3 text-sm", message.kind === "error" ? "text-red-600" : "text-green-700")}>{message.text}</p>}

      {/* Kept off-screen: the picture that "Save as picture" downloads. */}
      <div aria-hidden style={{ position: "fixed", left: -10000, top: 0 }}>
        <div ref={exportRef}>
          <CardPair card={data.card} url={data.url} forExport />
        </div>
      </div>
    </section>
  );
}
