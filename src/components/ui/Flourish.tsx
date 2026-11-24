import type { ReactNode } from "react";

/** A small pill above a heading: a glowing dot and a few words. */
export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span className={`inline-flex w-fit items-center gap-2 rounded-full border border-[#e47105]/25 bg-[#e47105]/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-[#c2570c] ${className}`}>
      <span className="gs-glow h-2 w-2 rounded-full bg-[#e47105]" aria-hidden />
      {children}
    </span>
  );
}

/** A word in a heading, picked out in saffron with a hand-drawn underline beneath it. */
export function HighlightWord({ children, className = "text-[#e47105]" }: { children: ReactNode; className?: string }) {
  return (
    <span className={`relative inline-block ${className}`}>
      {children}
      <svg aria-hidden viewBox="0 0 200 12" preserveAspectRatio="none" className="absolute -bottom-2 left-0 h-2.5 w-full" fill="none">
        <path d="M2 8c24-7 46 5 70-1s46 5 70-1 38 2 56-2" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" opacity="0.55" />
      </svg>
    </span>
  );
}

/** A round sticker whose words turn slowly around a small mark in the middle. */
export function Sticker({ text = "Jai Shree Shyam", className = "" }: { text?: string; className?: string }) {
  const ring = `${text} ✦ ${text} ✦ `;
  return (
    <span aria-hidden className={`pointer-events-none relative flex h-28 w-28 items-center justify-center rounded-full bg-[#e47105] text-white shadow-[0_12px_30px_rgba(194,87,12,0.45)] ring-4 ring-white ${className}`}>
      <svg viewBox="0 0 100 100" className="gs-spin absolute inset-0 h-full w-full">
        <defs>
          <path id="gs-ring" d="M50 50m-37 0a37 37 0 1 1 74 0a37 37 0 1 1 -74 0" />
        </defs>
        <text fontSize="9.5" fontWeight="700" letterSpacing="1.6" fill="currentColor" style={{ textTransform: "uppercase" }}>
          <textPath href="#gs-ring">{ring}</textPath>
        </text>
      </svg>
      <svg viewBox="0 0 24 24" className="h-8 w-8" fill="currentColor">
        <path d="M12 21s-7.5-4.6-9.6-9.2C1 8.6 2.9 5 6.3 5c2 0 3.9 1.1 5.7 3.2C13.8 6.1 15.700 5 17.700 5 21.100 5 23 8.600 21.600 11.800 19.500 16.400 12 21 12 21z" />
      </svg>
    </span>
  );
}

/**
 * Puts a photograph in a frame with a little personality: a saffron block offset behind it, a dotted pattern peeking out
 * of a corner and, if you give one, a sticker on the opposite corner. The photograph keeps its own rounded shape.
 */
export function PhotoFrame({
  children,
  side = "left",
  sticker = true,
  className = "",
}: {
  children: ReactNode;
  side?: "left" | "right";
  sticker?: boolean;
  className?: string;
}) {
  const left = side === "left";
  return (
    <div className={`relative ${className}`}>
      <span aria-hidden className={`absolute -bottom-5 h-[92%] w-[92%] rounded-[35px] bg-gradient-to-br from-[#ffb347] to-[#e47105] ${left ? "-left-5" : "-right-5"}`} />
      <span
        aria-hidden
        className={`absolute -top-6 h-24 w-32 opacity-70 ${left ? "-right-6" : "-left-6"}`}
        style={{ backgroundImage: "radial-gradient(#e47105 2px, transparent 2.4px)", backgroundSize: "14px 14px" }}
      />
      <div className="relative">{children}</div>
      {sticker && <Sticker className={`absolute -bottom-8 ${left ? "right-4 lg:-right-8" : "left-4 lg:-left-8"}`} />}
    </div>
  );
}
