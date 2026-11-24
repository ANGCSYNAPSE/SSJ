"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Check, Download, Link2, Loader2, Share2 } from "lucide-react";
import { ApiError, cardApi, type MemberCardData } from "@/lib/api";
import { CardPair, downloadCardPicture, shareCardLink } from "@/components/card/MemberCard";
import HangingCards from "@/components/card/HangingCards";
import { SocialIcons } from "@/components/profile/socialLinks";
import { siteOrigin } from "@/lib/constants";

/** A shared card, opened from its link or its QR code. */
export default function SharedCardPage() {
  const params = useParams<{ code: string }>();
  const code = params?.code ?? "";
  const [card, setCard] = useState<MemberCardData | null>(null);
  const [state, setState] = useState<"loading" | "missing" | "error" | "ready">("loading");
  const [note, setNote] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const exportRef = useRef<HTMLDivElement>(null);
  const url = `${siteOrigin()}/card/${code}`;

  useEffect(() => {
    let cancelled = false;
    cardApi
      .get(code)
      .then((data) => {
        if (cancelled) return;
        setCard(data);
        setState("ready");
      })
      .catch((err) => !cancelled && setState(err instanceof ApiError && err.status === 404 ? "missing" : "error"));
    return () => {
      cancelled = true;
    };
  }, [code]);

  const share = useCallback(async () => {
    if (!card) return;
    const result = await shareCardLink(url, card.name);
    setNote(result === "copied" ? "Link copied." : result === "failed" ? "Could not copy the link." : null);
  }, [card, url]);

  async function save() {
    if (!card || !exportRef.current) return;
    setBusy(true);
    try {
      await downloadCardPicture(exportRef.current, card.name);
    } catch {
      setNote("Could not save the picture. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="bg-[#fdf6ec] px-6 py-12 lg:py-16">
      <div className="mx-auto flex max-w-[860px] flex-col items-center gap-8 text-center">
        {state === "loading" && <Loader2 className="h-8 w-8 animate-spin text-[#e47105]" aria-label="Loading" />}

        {(state === "missing" || state === "error") && (
          <div className="flex max-w-[460px] flex-col items-center gap-3 py-10">
            <h1 className="font-serif text-3xl font-bold text-[#3e1815]">{state === "missing" ? "This card is not available" : "We could not open this card"}</h1>
            <p className="text-base text-[#595656]">
              {state === "missing" ? "The link may be wrong, or its owner has stopped sharing it." : "Please check your connection and try again."}
            </p>
            <Link href="/" className="mt-2 rounded-lg bg-[#e47105] px-6 py-3 text-sm font-bold text-white">{"Go to Shyam Jagat"}</Link>
          </div>
        )}

        {state === "ready" && card && (
          <>
            <div>
              <h1 className="font-serif text-3xl font-bold text-[#3e1815]">{"Shyam Jagat Digital Card"}</h1>
              <p className="mt-1 text-[#595656]">{"Jai Shri Shyam. This card belongs to "}<span className="notranslate font-semibold" translate="no">{card.name}</span>{"."}</p>
            </div>

            <div className="w-full max-w-[760px]">
              <HangingCards card={card} url={url} />
            </div>

            {(card.bio || Object.keys(card.links ?? {}).length > 0) && (
              <div className="flex max-w-[520px] flex-col items-center gap-4 rounded-2xl border border-[#d4af37]/30 bg-white px-8 py-6">
                {card.bio && <p className="font-serif text-lg italic leading-relaxed text-[#3e1815]">{card.bio}</p>}
                <SocialIcons links={card.links} size={46} className="justify-center" />
              </div>
            )}

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button type="button" onClick={share} className="flex items-center gap-2 rounded-lg bg-[#e47105] px-5 py-3 text-sm font-bold text-white shadow transition-opacity hover:opacity-90">
                <Share2 className="h-4 w-4" aria-hidden />
                {"Share this card"}
              </button>
              <button type="button" onClick={save} disabled={busy} className="flex items-center gap-2 rounded-lg border border-[#e47105] px-5 py-3 text-sm font-bold text-[#e47105] transition-colors hover:bg-[#e47105]/10 disabled:opacity-60">
                {busy ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <Download className="h-4 w-4" aria-hidden />}
                {"Save as picture"}
              </button>
            </div>
            {note && (
              <p className="flex items-center gap-1.5 text-sm text-green-700">
                {note.startsWith("Link") && <Check className="h-4 w-4" aria-hidden />}
                {note}
              </p>
            )}

            <div className="mt-4 flex flex-col items-center gap-3 rounded-2xl border border-[#d4af37]/30 bg-white px-8 py-7">
              <Link2 className="h-6 w-6 text-[#e47105]" aria-hidden />
              <p className="max-w-[420px] text-[#595656]">{"Shyam Jagat is a community of faith and seva. Join us and get your own card."}</p>
              <Link href="/signup" className="rounded-lg bg-[#e47105] px-6 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90">{"Join Shyam Jagat"}</Link>
            </div>

            {/* Kept off-screen: this is the picture that "Save as picture" downloads. */}
            <div aria-hidden style={{ position: "fixed", left: -10000, top: 0 }}>
              <div ref={exportRef}>
                <CardPair card={card} url={url} forExport />
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
