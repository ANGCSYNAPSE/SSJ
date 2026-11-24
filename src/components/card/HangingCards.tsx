"use client";

import { useEffect, useRef, useState } from "react";
import { RotateCw } from "lucide-react";
import { CARD_H, CARD_W, CardBack, CardFront, useQr } from "@/components/card/MemberCard";
import type { MemberCardData } from "@/lib/api";

/**
 * The cord (dori) a card hangs by: a brass hook on the rail, two strands twisted together, two knots, and a loop through the
 * little hole at the top of the card. It is drawn as a picture, so it stays sharp at any size.
 */
function Dori() {
  return (
    <svg width="46" height="104" viewBox="0 0 46 104" className="relative z-10 block overflow-visible" aria-hidden>
      <defs>
        <linearGradient id="dori-brass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f6dc8c" />
          <stop offset="1" stopColor="#a8730a" />
        </linearGradient>
        <radialGradient id="dori-knot" cx="35%" cy="30%" r="75%">
          <stop offset="0" stopColor="#ffb347" />
          <stop offset="1" stopColor="#b3360c" />
        </radialGradient>
      </defs>
      {/* the hook on the rail */}
      <circle cx="23" cy="9" r="7" fill="none" stroke="url(#dori-brass)" strokeWidth="3.2" />
      {/* two strands, twisted */}
      <path d="M23 16 C 13 32, 33 50, 23 68 S 14 90, 23 98" fill="none" stroke="#c2260f" strokeWidth="3.4" strokeLinecap="round" />
      <path d="M23 16 C 33 32, 13 50, 23 68 S 32 90, 23 98" fill="none" stroke="#f6a623" strokeWidth="3.4" strokeLinecap="round" />
      {/* the knots */}
      <g>
        <circle cx="23" cy="36" r="6.4" fill="url(#dori-knot)" stroke="#7a1d00" strokeWidth="1" />
        <circle cx="23" cy="60" r="6" fill="url(#dori-knot)" stroke="#7a1d00" strokeWidth="1" />
        <circle cx="23" cy="82" r="5.4" fill="url(#dori-knot)" stroke="#7a1d00" strokeWidth="1" />
      </g>
      {/* the loop through the card's hole */}
      <circle cx="23" cy="100" r="4.2" fill="none" stroke="url(#dori-brass)" strokeWidth="2.6" />
    </svg>
  );
}

/** One card on its cord: the cord drops in with a little bounce, then the card sways gently, like a thing hanging on a thread. */
function Hung({ children, width, height, delay = 0 }: { children: React.ReactNode; width: number; height: number; delay?: number }) {
  return (
    <div className="hung flex flex-col items-center" style={{ ["--hd" as string]: `${delay}s` }}>
      <Dori />
      <div style={{ width, height, marginTop: -8 }} className="relative">
        {children}
      </div>
    </div>
  );
}

/** A card drawn at its natural size and shrunk to fit. */
function Scaled({ scale, children }: { scale: number; children: React.ReactNode }) {
  return (
    <div style={{ width: CARD_W * scale, height: CARD_H * scale }}>
      <div style={{ width: CARD_W, height: CARD_H, transform: `scale(${scale})`, transformOrigin: "top left" }}>{children}</div>
    </div>
  );
}

/**
 * The person's card, hung from a rail by its cords. On a wide screen the front and the back hang side by side. On a phone there is
 * room for one, so the card flips: tap it, or use the two buttons under it, to turn between the front and the QR side.
 * `locked` fades the QR while the owner's sharing is off, since the link would open nothing yet.
 */
export default function HangingCards({ card, url, locked = false }: { card: MemberCardData; url: string; locked?: boolean }) {
  const qr = useQr(url);
  const box = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [back, setBack] = useState(false);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const measure = () => setWidth(el.clientWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const wide = width >= CARD_W * 2 + 90;
  const scale = wide ? 1 : Math.min(1, Math.max(0.6, (width - 24) / CARD_W));
  const w = CARD_W * scale;
  const h = CARD_H * scale;

  return (
    <div ref={box} className="relative w-full">
      {/* the rail */}
      <div aria-hidden className="absolute left-2 right-2 top-[5px] z-0 h-[11px] rounded-full bg-gradient-to-b from-[#f6dc8c] via-[#c9962a] to-[#8a5a12] shadow-[0_6px_14px_rgba(80,40,0,0.35)]" />
      <span aria-hidden className="absolute left-0 top-[1px] z-0 h-[19px] w-[19px] rounded-full bg-gradient-to-br from-[#f6dc8c] to-[#8a5a12] shadow" />
      <span aria-hidden className="absolute right-0 top-[1px] z-0 h-[19px] w-[19px] rounded-full bg-gradient-to-br from-[#f6dc8c] to-[#8a5a12] shadow" />

      {width > 0 && wide && (
        <div className="relative flex justify-center gap-14 pt-1">
          <Hung width={w} height={h}>
            <CardFront card={card} />
          </Hung>
          <Hung width={w} height={h} delay={0.18}>
            <CardBack card={card} url={url} qr={qr} locked={locked} />
          </Hung>
        </div>
      )}

      {width > 0 && !wide && (
        <div className="relative flex flex-col items-center gap-5 pt-1">
          <Hung width={w} height={h}>
            <button type="button" onClick={() => setBack((b) => !b)} aria-label={back ? "Show the front of the card" : "Show the QR side of the card"} className="block cursor-pointer text-left" style={{ width: w, height: h }}>
              <div style={{ width: CARD_W, height: CARD_H, transform: `scale(${scale})`, transformOrigin: "top left", perspective: 1600 }}>
                <div style={{ position: "relative", width: CARD_W, height: CARD_H, transformStyle: "preserve-3d", transition: "transform 0.9s cubic-bezier(0.4, 0.2, 0.2, 1)", transform: back ? "rotateY(180deg)" : "rotateY(0deg)" }}>
                  <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}>
                    <CardFront card={card} />
                  </div>
                  <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
                    <CardBack card={card} url={url} qr={qr} locked={locked} />
                  </div>
                </div>
              </div>
            </button>
          </Hung>
          <div role="group" aria-label="Which side of the card" className="inline-flex items-center rounded-full bg-white p-1 shadow-md">
            {[
              { label: "Front", on: !back },
              { label: "QR code", on: back },
            ].map((t) => (
              <button key={t.label} type="button" onClick={() => setBack(t.label === "QR code")} aria-pressed={t.on} className={`rounded-full px-5 py-2 text-sm font-bold transition-all duration-300 ${t.on ? "bg-[#e47105] text-white shadow" : "text-[#6b1f1f]"}`}>
                {t.label}
              </button>
            ))}
          </div>
          <p className="flex items-center gap-1.5 text-xs text-[#8a6a4a]">
            <RotateCw className="h-3.5 w-3.5" aria-hidden />
            {"Tap the card to turn it over"}
          </p>
        </div>
      )}
    </div>
  );
}
