"use client";

import { useEffect, useRef, useState } from "react";
import { Download, EyeOff, Link2, Loader2, Lock, QrCode, Share2 } from "lucide-react";
import { ApiError, cardApi, type MemberCardData } from "@/lib/api";
import { CardPair, downloadCardPicture, shareCardLink } from "@/components/card/MemberCard";
import HangingCards from "@/components/card/HangingCards";
import { Mandala } from "@/components/seva/DharmaIcons";
import Ornament from "@/components/ui/Ornament";
import { siteOrigin } from "@/lib/constants";
import { cn } from "@/lib/utils";

/**
 * The person's own digital card on their profile: the card hangs from a rail by its cords, with its QR code on the back, and the
 * switch that makes it shareable. While sharing is off, the card's link opens nothing for anyone else, and the QR says so. Once
 * on, they can share the link or save the card as a picture.
 *
 * The link is built from the address of the site the person is on, so the QR and the link always open this site's own card page.
 */
export default function DigitalCardSection() {
  const [data, setData] = useState<{ enabled: boolean; url: string; card: MemberCardData } | null>(null);
  const [origin, setOrigin] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ kind: "error" | "info"; text: string } | null>(null);
  const exportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOrigin(siteOrigin());
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

  if (!data) return message ? <p className="text-sm text-red-600">{message.text}</p> : null;

  const link = `${origin || new URL(data.url).origin}/card/${data.card.code}`;

  async function share() {
    const result = await shareCardLink(link, data!.card.name);
    if (result === "copied") setMessage({ kind: "info", text: "Link copied. Paste it anywhere to share." });
    else if (result === "failed") setMessage({ kind: "error", text: "Could not copy the link." });
  }

  async function save() {
    if (!exportRef.current) return;
    setBusy(true);
    try {
      await downloadCardPicture(exportRef.current, data!.card.name);
    } catch {
      setMessage({ kind: "error", text: "Could not save the picture. Please try again." });
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="relative isolate overflow-hidden rounded-[28px] border border-[#e0b94f]/40 bg-gradient-to-br from-[#fffdf8] via-[#fff7e6] to-[#fdecc8] p-5 shadow-[0_16px_40px_rgba(107,31,31,0.08)] sm:p-8">
      <span aria-hidden className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#e47105] via-[#ffd04f] to-[#e47105]" />
      <Mandala className="gs-spin-slow pointer-events-none absolute -right-24 -top-24 -z-10 h-[360px] w-[360px] text-[#e47105]/15" />
      <Mandala petals={12} className="hl-spin-rev pointer-events-none absolute -bottom-28 -left-24 -z-10 h-[300px] w-[300px] text-[#c2570c]/10" />

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0 max-w-[640px]">
          <h2 className="font-serif text-2xl font-bold text-[#6b1f1f]">{"My Digital Card"}</h2>
          <Ornament className="mt-2" />
          <p className="mt-3 text-sm leading-relaxed text-[#595656]">
            {data.enabled
              ? "Your card is shareable. Anyone with the link, or the QR code on the back, can see it. It shows only your name, photo, city, the line about yourself, the links you added, and what you are on Shyam Jagat. Never your phone or email."
              : "Your card is private. Switch sharing on to get a link and a QR code you can send to anyone."}
          </p>
          <p className="mt-2 inline-flex items-center gap-2 rounded-full bg-white/80 px-3.5 py-1.5 text-xs font-semibold text-[#6b1f1f] shadow-sm">
            <QrCode className="h-3.5 w-3.5 text-[#e47105]" aria-hidden />
            {"Your QR code carries the Shyam Jagat logo in its centre."}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setSharing(!data.enabled)}
          disabled={busy}
          className={cn("flex shrink-0 items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold transition-all hover:-translate-y-0.5 disabled:opacity-60", data.enabled ? "border border-[#d4af37]/60 bg-white text-maroon hover:bg-[#fff8ec]" : "bg-gradient-to-r from-[#f47700] to-[#ff9417] text-white shadow-[0_10px_24px_rgba(244,119,0,0.35)]")}
        >
          {busy ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : data.enabled ? <EyeOff className="h-4 w-4" aria-hidden /> : <Share2 className="h-4 w-4" aria-hidden />}
          {data.enabled ? "Make it private" : "Turn on sharing"}
        </button>
      </div>

      {!data.enabled && (
        <div className="gs-rise mt-5 flex items-start gap-3 rounded-2xl border border-amber-300/70 bg-amber-50 px-4 py-3.5 text-sm text-amber-900">
          <Lock className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          <p>
            <strong>{"The QR code and the link do not open yet."}</strong>
            {" While sharing is off, anyone who scans it sees nothing. Turn sharing on, and the card opens for them."}
          </p>
        </div>
      )}

      {/* the card, hanging from its rail */}
      <div className="mt-6 rounded-3xl bg-gradient-to-b from-[#f7e7c6]/70 to-[#fbf1da]/60 px-3 pb-10 pt-6 shadow-[inset_0_2px_16px_rgba(107,31,31,0.08)] sm:px-6">
        <HangingCards card={data.card} url={link} locked={!data.enabled} />
      </div>

      {data.enabled && (
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button type="button" onClick={share} className="flex items-center gap-2 rounded-xl bg-[#e47105] px-5 py-3 text-sm font-bold text-white shadow transition-all hover:-translate-y-0.5 hover:opacity-95">
            <Share2 className="h-4 w-4" aria-hidden />
            {"Share my card"}
          </button>
          <button type="button" onClick={save} disabled={busy} className="flex items-center gap-2 rounded-xl border border-[#e47105] bg-white px-5 py-3 text-sm font-bold text-[#e47105] transition-all hover:-translate-y-0.5 hover:bg-[#e47105]/10 disabled:opacity-60">
            <Download className="h-4 w-4" aria-hidden />
            {"Save as picture"}
          </button>
          <a href={link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-1 text-sm font-semibold text-[#e47105] hover:underline">
            <Link2 className="h-4 w-4" aria-hidden />
            {"Open my card page"}
          </a>
        </div>
      )}
      {message && <p className={cn("mt-3 text-sm", message.kind === "error" ? "text-red-600" : "text-green-700")}>{message.text}</p>}

      {/* Kept off-screen: the picture that "Save as picture" downloads. */}
      <div aria-hidden style={{ position: "fixed", left: -10000, top: 0 }}>
        <div ref={exportRef}>
          <CardPair card={data.card} url={link} forExport />
        </div>
      </div>
    </section>
  );
}
