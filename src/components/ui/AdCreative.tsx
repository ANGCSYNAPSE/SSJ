import type { CSSProperties } from "react";

export type AdSize = "leaderboard" | "banner" | "rectangle";
export type AdTemplate = "image" | "split";

/**
 * Every ad slot is the same compact wide strip, so no ad takes up a tall block of the page. The names (leaderboard, banner,
 * rectangle) are only where the admin placed it; they all draw at 728 × 90 and the slot scales that down on small screens.
 */
const STRIP = { w: 728, h: 90, label: "728 × 90" };
export const SLOT_DIMS: Record<AdSize, { w: number; h: number; label: string }> = {
  leaderboard: STRIP,
  banner: STRIP,
  rectangle: STRIP,
};

/** Named colour schemes an ad can use; "custom" takes the two colours the admin picked. */
export const THEMES: Record<string, [string, string]> = {
  maroon: ["#7a1f1f", "#4a1010"],
  navy: ["#12305a", "#0a1b36"],
  charcoal: ["#2e2e2e", "#121212"],
  forest: ["#1d5c3a", "#0d3320"],
  royal: ["#4b2a8a", "#2a1458"],
  teal: ["#0f6b6b", "#083f45"],
};

/** The button colour each scheme uses when the ad does not pick its own. */
const THEME_BUTTON: Record<string, string> = {
  maroon: "#e8751a",
  navy: "#f08a24",
  charcoal: "#e8751a",
  forest: "#f2b441",
  royal: "#e0457b",
  teal: "#f2b441",
};

/** The button's colour and a text colour that stays readable on it (dark text on light buttons, white on dark ones). */
export function buttonColours(ad: Pick<AdCreativeData, "theme" | "ctaColor">): { bg: string; fg: string } {
  const bg = ad.ctaColor && /^#[0-9a-f]{6}$/i.test(ad.ctaColor) ? ad.ctaColor : (THEME_BUTTON[ad.theme ?? "maroon"] ?? "#e8751a");
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(bg.slice(i, i + 2), 16) / 255).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return { bg, fg: luminance > 0.3 ? "#1a1209" : "#ffffff" };
}

export interface AdCreativeData {
  template?: AdTemplate | null;
  imageUrl?: string | null;
  headline?: string | null;
  subline?: string | null;
  ctaLabel?: string | null;
  linkUrl?: string | null;
  theme?: string | null;
  bgFrom?: string | null;
  bgTo?: string | null;
  ctaColor?: string | null;
  title?: string | null;
}

export function themeColours(ad: Pick<AdCreativeData, "theme" | "bgFrom" | "bgTo">): [string, string] {
  if (ad.theme === "custom" && ad.bgFrom && ad.bgTo) return [ad.bgFrom, ad.bgTo];
  return THEMES[ad.theme ?? "maroon"] ?? THEMES.maroon;
}

// How big the text and the picture are, for each slot. The slot is always drawn at its real size (see SLOT_DIMS).
const LOOK = {
  leaderboard: { pad: 22, head: 21, sub: 12.5, subTop: 3, cta: 12, ctaPad: "7px 16px", imageW: 190, gap: 18 },
  banner: { pad: 52, head: 40, sub: 19, subTop: 8, cta: 16, ctaPad: "13px 30px", imageW: 430, gap: 28 },
  rectangle: { pad: 20, head: 21, sub: 13, subTop: 5, cta: 12.5, ctaPad: "8px 18px", imageW: 0, gap: 0 },
} as const;

/**
 * One ad drawn at its slot's real size. "image" is just the picture; "split" is a coloured panel with the headline, a
 * line of text and a button, and a picture fading in from the right (from the top on the small square slot).
 * The text is written by the admin in whatever language they like, so it is kept out of automatic translation.
 */
export default function AdCreative({ ad, size, src }: { ad: AdCreativeData; size: AdSize; src: string | null }) {
  const { w, h } = SLOT_DIMS[size];

  if ((ad.template ?? "image") === "image") {
    return src ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} alt={ad.title ?? "Advertisement"} style={{ width: w, height: h, objectFit: "cover", display: "block" }} />
    ) : (
      <div style={{ width: w, height: h, background: "#ebebeb" }} />
    );
  }

  const look = LOOK.leaderboard;
  const [from, to] = themeColours(ad);
  const stacked = false;
  const cta = ad.ctaLabel?.trim() || (ad.linkUrl ? "Learn more" : "");
  const tone = buttonColours(ad);

  const picture: CSSProperties = stacked
    ? { position: "absolute", left: 0, right: 0, top: 0, height: 118, WebkitMaskImage: "linear-gradient(to bottom, #000 55%, transparent)", maskImage: "linear-gradient(to bottom, #000 55%, transparent)" }
    : { position: "absolute", right: 0, top: 0, bottom: 0, width: look.imageW, WebkitMaskImage: "linear-gradient(to right, transparent, #000 38%)", maskImage: "linear-gradient(to right, transparent, #000 38%)" };

  const textBox: CSSProperties = stacked
    ? { position: "absolute", left: look.pad, right: look.pad, bottom: 14, display: "flex", flexDirection: "column", alignItems: "flex-start" }
    : { position: "absolute", left: look.pad, top: 0, bottom: 0, right: src ? look.imageW * 0.62 : look.pad, display: "flex", alignItems: "center", justifyContent: "space-between", gap: look.gap };

  const button = cta && (
    <span
      style={{
        flexShrink: 0,
        background: tone.bg,
        color: tone.fg,
        fontWeight: 700,
        fontSize: look.cta,
        padding: look.ctaPad,
        borderRadius: 999,
        whiteSpace: "nowrap",
        boxShadow: "0 2px 6px rgba(0,0,0,.25)",
        marginTop: stacked ? 10 : 0,
      }}
    >
      {cta} {"›"}
    </span>
  );

  return (
    <div className="notranslate" translate="no" style={{ width: w, height: h, position: "relative", overflow: "hidden", background: `linear-gradient(100deg, ${from}, ${to})`, color: "#fff" }}>
      {src && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt="" style={{ ...picture, objectFit: "cover", display: "block" }} />
      )}
      <div style={textBox}>
        <div style={{ minWidth: 0 }}>
          <p className="font-serif" style={{ margin: 0, fontWeight: 700, fontSize: look.head, lineHeight: 1.15, letterSpacing: "-0.2px", textShadow: "0 1px 6px rgba(0,0,0,.25)" }}>
            {ad.headline}
          </p>
          {ad.subline && <p style={{ margin: 0, marginTop: look.subTop, fontSize: look.sub, lineHeight: 1.25, color: "#f4d9b0" }}>{ad.subline}</p>}
        </div>
        {button}
      </div>
    </div>
  );
}
