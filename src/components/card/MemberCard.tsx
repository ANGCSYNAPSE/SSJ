"use client";

import { useEffect, useState } from "react";
import { toPng } from "html-to-image";
import QRCode from "qrcode";
import { BadgeCheck } from "lucide-react";
import NaamRings from "@/components/profile/NaamRings";
import { filledLinks } from "@/components/profile/socialLinks";
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

const LOGO_SRC = "/images/brand/logo.svg";

const loadImage = (src: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });

/**
 * The card's QR code as a picture, with the Shyam Jagat logo set in its centre, so it is recognisably ours. The code is made
 * with the highest error correction (a quarter of it can be covered and it still scans), and the logo covers far less than that.
 * If the logo cannot be loaded, the plain code is used.
 */
export function useQr(url: string | null) {
  const [src, setSrc] = useState<string | null>(null);
  useEffect(() => {
    if (!url) return;
    let cancelled = false;
    (async () => {
      try {
        const canvas = document.createElement("canvas");
        await QRCode.toCanvas(canvas, url, { margin: 1, width: 560, errorCorrectionLevel: "H", color: { dark: "#4a0e0e", light: "#ffffff" } });
        const ctx = canvas.getContext("2d");
        if (ctx) {
          try {
            const logo = await loadImage(LOGO_SRC);
            const size = canvas.width;
            const badge = size * 0.25; // the logo's width
            const mid = size / 2;
            // a white disc with a gold ring, so the logo sits cleanly on the pattern
            ctx.beginPath();
            ctx.arc(mid, mid, badge / 2 + size * 0.028, 0, Math.PI * 2);
            ctx.fillStyle = "#ffffff";
            ctx.fill();
            ctx.lineWidth = size * 0.01;
            ctx.strokeStyle = GOLD;
            ctx.stroke();
            ctx.save();
            ctx.beginPath();
            ctx.arc(mid, mid, badge / 2, 0, Math.PI * 2);
            ctx.clip();
            const h = badge * (logo.naturalHeight && logo.naturalWidth ? logo.naturalHeight / logo.naturalWidth : 1);
            ctx.drawImage(logo, mid - badge / 2, mid - h / 2, badge, h);
            ctx.restore();
          } catch {
            /* the plain code is still a good code */
          }
        }
        if (!cancelled) setSrc(canvas.toDataURL("image/png"));
      } catch {
        if (!cancelled) setSrc(null);
      }
    })();
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

/** The small metal-ringed hole at the top of the card, where its cord (dori) is tied. */
function Eyelet() {
  return (
    <span
      aria-hidden
      style={{
        position: "absolute",
        top: 12,
        left: "50%",
        width: 18,
        height: 18,
        marginLeft: -9,
        borderRadius: "50%",
        zIndex: 6,
        background: "radial-gradient(circle at 50% 50%, #120303 0 36%, #b8860b 38% 60%, #f6dc8c 62% 100%)",
        boxShadow: "inset 0 1px 3px rgba(0,0,0,.7), 0 1px 2px rgba(0,0,0,.35)",
      }}
    />
  );
}

/**
 * The front: Baba Shyam below; above him the person's photo, name, what they are, their city, a line about them; and, over the
 * picture, a round button for each link they have (YouTube, Instagram...). Nothing here is private: no phone, no email.
 */
export function CardFront({ card }: { card: MemberCardData }) {
  const links = filledLinks(card.links);
  return (
    <div style={frame}>
      <Eyelet />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/card/baba-shyam.jpg" alt="" crossOrigin="anonymous" style={{ position: "absolute", left: 0, right: 0, bottom: 0, width: "100%", height: 230, objectFit: "cover", objectPosition: "center 12%" }} />
      {/* The picture fades up into the card's colour, so the text above it stays clear. */}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 230, background: "linear-gradient(to bottom, #4a0e0e 0%, rgba(74,14,14,.78) 24%, rgba(74,14,14,0) 62%, rgba(43,7,7,.62) 100%)" }} />

      <div style={{ position: "relative", zIndex: 0, padding: "36px 20px 0", textAlign: "center" }}>
        <p style={{ margin: 0, fontFamily: "Georgia, serif", fontSize: 22, fontWeight: 700, letterSpacing: 3, color: GOLD }}>SHYAM JAGAT</p>
        <p style={{ margin: "1px 0 0", fontSize: 10, letterSpacing: 2, color: "#f5d9a0" }}>|| जय श्री श्याम ||</p>

        <div style={{ position: "relative", margin: "12px auto 0", width: 108, height: 108 }}>
          {/* the name, in rings that grow fainter as they go out */}
          <div style={{ position: "absolute", left: -78, top: -78, width: 264, height: 264, zIndex: -1, opacity: 0.42, pointerEvents: "none" }}>
            <NaamRings animate={false} rings={3} color={GOLD} id="card-naam" className="block h-full w-full" />
          </div>
          <div style={{ position: "relative", width: 108, height: 108, borderRadius: "50%", padding: 4, background: `linear-gradient(135deg,${GOLD},#b8860b)`, boxShadow: "0 8px 22px rgba(0,0,0,.45)" }}>
            {card.photoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={card.photoUrl} alt={card.name} crossOrigin="anonymous" style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover", display: "block" }} />
            ) : (
              <div style={{ width: "100%", height: "100%", borderRadius: "50%", background: "#fdf0d5", color: "#7a1f1f", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Georgia, serif", fontSize: 38, fontWeight: 700 }}>{initials(card.name)}</div>
            )}
          </div>
        </div>

        <p className="notranslate" translate="no" style={{ margin: "10px 0 0", fontFamily: "Georgia, serif", fontSize: 23, fontWeight: 700, lineHeight: 1.15, textShadow: "0 2px 8px rgba(0,0,0,.4)" }}>
          {card.name}
          {card.verified && <BadgeCheck size={19} color={GOLD} style={{ display: "inline", marginLeft: 6, verticalAlign: "-3px" }} aria-label="Verified" />}
        </p>
        <div style={{ margin: "8px 0 0", display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 5 }}>
          {card.kinds.map((k) => (
            <span key={k} style={{ background: "rgba(232,196,106,.2)", border: `1px solid ${GOLD}`, color: "#ffe9b0", borderRadius: 999, padding: "2px 10px", fontSize: 10.5, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>{k}</span>
          ))}
        </div>
        {card.location && <p className="notranslate" translate="no" style={{ margin: "7px 0 0", fontSize: 12, color: "#f5d9a0" }}>{card.location}</p>}
        {card.bio && (
          <p className="notranslate" translate="no" style={{ margin: "6px auto 0", maxWidth: 250, fontFamily: "Georgia, serif", fontSize: 12, fontStyle: "italic", lineHeight: 1.4, color: "#fff3d6", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
            {card.bio}
          </p>
        )}
      </div>

      {links.length > 0 && (
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 44, display: "flex", justifyContent: "center", gap: 9 }}>
          {links.map((p) => (
            <span key={p.key} title={p.label} style={{ display: "flex", width: 34, height: 34, alignItems: "center", justifyContent: "center", borderRadius: "50%", background: p.colour, color: "#fff", border: "2px solid rgba(255,255,255,.9)", boxShadow: "0 4px 12px rgba(0,0,0,.5)" }}>
              <p.icon size={16} />
            </span>
          ))}
        </div>
      )}

      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "0 18px 14px", display: "flex", justifyContent: "space-between", alignItems: "flex-end", fontSize: 11, color: "#fff", textShadow: "0 1px 6px rgba(0,0,0,.8)" }}>
        <span>Since {since(card.memberSince)}</span>
        <span style={{ letterSpacing: 1.5, fontWeight: 700 }}>SJ · {card.code}</span>
      </div>
    </div>
  );
}

/**
 * The back: the QR code that opens this card's page. While the owner's sharing is off (`locked`), the code is shown faded under
 * a lock, because the link would open nothing for anyone else; it comes alive when sharing is switched on.
 */
export function CardBack({ card, url, qr, locked = false }: { card: MemberCardData; url: string; qr: string | null; locked?: boolean }) {
  const links = filledLinks(card.links);
  return (
    <div style={{ ...frame, textAlign: "center" }}>
      <Eyelet />
      <div style={{ position: "absolute", inset: 10, border: `1px solid ${GOLD}`, borderRadius: 16, opacity: 0.55 }} />
      <div style={{ position: "relative", padding: "42px 24px 0" }}>
        <p style={{ margin: 0, fontFamily: "Georgia, serif", fontSize: 22, fontWeight: 700, letterSpacing: 3, color: GOLD }}>SHYAM JAGAT</p>
        <p style={{ margin: "4px 0 0", fontSize: 12, letterSpacing: 2, color: "#f5d9a0" }}>सहयोग · सेवा · समर्पण</p>

        <p style={{ margin: "24px 0 12px", fontSize: 13, letterSpacing: 1, color: "#ffe9b0" }}>Scan to see my card</p>
        <div style={{ position: "relative", margin: "0 auto", width: 196, height: 196, background: "#fff", borderRadius: 18, padding: 10, boxShadow: "0 10px 26px rgba(0,0,0,.45)" }}>
          {qr ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={qr} alt={`QR code for ${card.name}'s card`} style={{ width: "100%", height: "100%", display: "block", filter: locked ? "blur(5px) grayscale(.7) opacity(.55)" : undefined }} />
          ) : (
            <div style={{ width: "100%", height: "100%", background: "#f3f3f3", borderRadius: 8 }} />
          )}
          {locked && (
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6, color: "#4a0e0e", fontSize: 12, fontWeight: 700, lineHeight: 1.3 }}>
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#4a0e0e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
              Sharing is off
            </div>
          )}
        </div>

        <p className="notranslate" translate="no" style={{ margin: "14px 0 0", fontFamily: "Georgia, serif", fontSize: 20, fontWeight: 700 }}>{card.name}</p>
        <p className="notranslate" translate="no" style={{ margin: "4px 0 0", fontSize: 11, color: "#f5d9a0", wordBreak: "break-all" }}>{url.replace(/^https?:\/\//, "")}</p>
        {links.length > 0 && (
          <div style={{ margin: "12px 0 0", display: "flex", justifyContent: "center", gap: 8 }}>
            {links.map((p) => (
              <span key={p.key} title={p.label} style={{ display: "flex", width: 28, height: 28, alignItems: "center", justifyContent: "center", borderRadius: "50%", background: p.colour, color: "#fff", border: "1.5px solid rgba(255,255,255,.85)" }}>
                <p.icon size={14} />
              </span>
            ))}
          </div>
        )}
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
