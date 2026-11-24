"use client";

import { useEffect, useState } from "react";
import { toPng } from "html-to-image";
import QRCode from "qrcode";
import { BadgeCheck } from "lucide-react";
import type { MemberCardData } from "@/lib/api";

/** The card is drawn at this size and scaled by the page; the saved picture is two times as sharp. */
export const CARD_W = 320;
export const CARD_H = 510;

const GOLD = "#e8c46a";

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");

const since = (iso: string) => new Date(iso).toLocaleDateString("en-IN", { month: "short", year: "numeric" });

/** The QR code of the card's link, as a picture. */
export function useQr(url: string | null) {
  const [src, setSrc] = useState<string | null>(null);
  useEffect(() => {
    if (!url) return;
    let cancelled = false;
    QRCode.toDataURL(url, { margin: 1, width: 360, errorCorrectionLevel: "M", color: { dark: "#4a0e0e", light: "#ffffff" } })
      .then((data) => !cancelled && setSrc(data))
      .catch(() => !cancelled && setSrc(null));
    return () => {
      cancelled = true;
    };
  }, [url]);
  return src;
}

const frame: React.CSSProperties = {
  width: CARD_W,
  height: CARD_H,
  borderRadius: 22,
  overflow: "hidden",
  position: "relative",
  boxShadow: "0 18px 40px rgba(60,10,10,.35)",
  border: `2px solid ${GOLD}`,
  background: "linear-gradient(170deg,#7a1f1f 0%,#4a0e0e 55%,#2b0707 100%)",
  color: "#fff",
  fontFamily: "inherit",
};

/** The front: Baba Shyam below, the person's photo, name and what they are above. */
export function CardFront({ card }: { card: MemberCardData }) {
  return (
    <div style={frame}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/card/baba-shyam.jpg" alt="" crossOrigin="anonymous" style={{ position: "absolute", left: 0, right: 0, bottom: 0, width: "100%", height: 260, objectFit: "cover", objectPosition: "center 12%" }} />
      {/* The picture fades up into the card's colour, so the text above it stays clear. */}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 260, background: "linear-gradient(to bottom, #4a0e0e 0%, rgba(74,14,14,.6) 26%, rgba(74,14,14,0) 58%, rgba(43,7,7,.5) 100%)" }} />

      <div style={{ position: "relative", padding: "20px 20px 0", textAlign: "center" }}>
        <p style={{ margin: 0, fontFamily: "Georgia, serif", fontSize: 24, fontWeight: 700, letterSpacing: 3, color: GOLD }}>SHYAM JAGAT</p>
        <p style={{ margin: "2px 0 0", fontSize: 11, letterSpacing: 2, color: "#f5d9a0" }}>|| जय श्री श्याम ||</p>

        <div style={{ margin: "18px auto 0", width: 124, height: 124, borderRadius: "50%", padding: 4, background: `linear-gradient(135deg,${GOLD},#b8860b)`, boxShadow: "0 8px 22px rgba(0,0,0,.45)" }}>
          {card.photoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={card.photoUrl} alt={card.name} crossOrigin="anonymous" style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover", display: "block" }} />
          ) : (
            <div style={{ width: "100%", height: "100%", borderRadius: "50%", background: "#fdf0d5", color: "#7a1f1f", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Georgia, serif", fontSize: 44, fontWeight: 700 }}>{initials(card.name)}</div>
          )}
        </div>

        <p className="notranslate" translate="no" style={{ margin: "14px 0 0", fontFamily: "Georgia, serif", fontSize: 25, fontWeight: 700, lineHeight: 1.15, textShadow: "0 2px 8px rgba(0,0,0,.4)" }}>
          {card.name}
          {card.verified && <BadgeCheck size={20} color={GOLD} style={{ display: "inline", marginLeft: 6, verticalAlign: "-3px" }} aria-label="Verified" />}
        </p>
        <div style={{ margin: "10px 0 0", display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6 }}>
          {card.kinds.map((k) => (
            <span key={k} style={{ background: "rgba(232,196,106,.2)", border: `1px solid ${GOLD}`, color: "#ffe9b0", borderRadius: 999, padding: "3px 12px", fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>{k}</span>
          ))}
        </div>
        {card.location && <p className="notranslate" translate="no" style={{ margin: "10px 0 0", fontSize: 13, color: "#f5d9a0" }}>{card.location}</p>}
      </div>

      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "0 18px 14px", display: "flex", justifyContent: "space-between", alignItems: "flex-end", fontSize: 11, color: "#fff", textShadow: "0 1px 6px rgba(0,0,0,.8)" }}>
        <span>Since {since(card.memberSince)}</span>
        <span style={{ letterSpacing: 1.5, fontWeight: 700 }}>SJ · {card.code}</span>
      </div>
    </div>
  );
}

/** The back: the QR code that opens this card's page. */
export function CardBack({ card, url, qr }: { card: MemberCardData; url: string; qr: string | null }) {
  return (
    <div style={{ ...frame, textAlign: "center" }}>
      <div style={{ position: "absolute", inset: 10, border: `1px solid ${GOLD}`, borderRadius: 16, opacity: 0.55 }} />
      <div style={{ position: "relative", padding: "34px 24px 0" }}>
        <p style={{ margin: 0, fontFamily: "Georgia, serif", fontSize: 22, fontWeight: 700, letterSpacing: 3, color: GOLD }}>SHYAM JAGAT</p>
        <p style={{ margin: "4px 0 0", fontSize: 12, letterSpacing: 2, color: "#f5d9a0" }}>सहयोग · सेवा · समर्पण</p>

        <p style={{ margin: "30px 0 12px", fontSize: 13, letterSpacing: 1, color: "#ffe9b0" }}>Scan to see my card</p>
        <div style={{ margin: "0 auto", width: 200, height: 200, background: "#fff", borderRadius: 18, padding: 10, boxShadow: "0 10px 26px rgba(0,0,0,.45)" }}>
          {qr ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={qr} alt={`QR code for ${card.name}'s card`} style={{ width: "100%", height: "100%", display: "block" }} />
          ) : (
            <div style={{ width: "100%", height: "100%", background: "#f3f3f3", borderRadius: 8 }} />
          )}
        </div>

        <p className="notranslate" translate="no" style={{ margin: "16px 0 0", fontFamily: "Georgia, serif", fontSize: 20, fontWeight: 700 }}>{card.name}</p>
        <p className="notranslate" translate="no" style={{ margin: "4px 0 0", fontSize: 11, color: "#f5d9a0", wordBreak: "break-all" }}>{url.replace(/^https?:\/\//, "")}</p>
      </div>
      <p style={{ position: "absolute", left: 0, right: 0, bottom: 22, margin: 0, fontSize: 11, letterSpacing: 2, color: GOLD }}>FAITH · SERVICE · HUMANITY</p>
    </div>
  );
}

/** Both sides, side by side. `forExport` lays them out in a row with a margin, ready to be saved as one picture. */
export function CardPair({ card, url, forExport = false }: { card: MemberCardData; url: string; forExport?: boolean }) {
  const qr = useQr(url);
  return (
    <div style={forExport ? { display: "flex", gap: 36, padding: 36, background: "#fdf6ec", width: "max-content" } : undefined} className={forExport ? undefined : "flex flex-wrap items-start justify-center gap-8"}>
      <CardFront card={card} />
      <CardBack card={card} url={url} qr={qr} />
    </div>
  );
}

/** Saves the card as a picture: the node is turned into a PNG and downloaded. */
export async function downloadCardPicture(node: HTMLElement, name: string) {
  const dataUrl = await toPng(node, { pixelRatio: 2, cacheBust: true, backgroundColor: "#fdf6ec" });
  const link = document.createElement("a");
  link.download = `shyam-jagat-card-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "member"}.png`;
  link.href = dataUrl;
  link.click();
}

/** Opens the phone's share sheet when there is one; otherwise copies the link. Returns what happened. */
export async function shareCardLink(url: string, name: string): Promise<"shared" | "copied" | "failed"> {
  try {
    if (navigator.share) {
      await navigator.share({ title: `${name} on Shyam Jagat`, text: `${name} on Shyam Jagat`, url });
      return "shared";
    }
    await navigator.clipboard.writeText(url);
    return "copied";
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") return "shared"; // the person closed the sheet
    try {
      await navigator.clipboard.writeText(url);
      return "copied";
    } catch {
      return "failed";
    }
  }
}
