import { useEffect, useRef } from "react";
import { createTypographyVortexRenderer } from "./typographyVortexRenderer";

// "ThreeUI Fragment Mono" — the vendor component's own webfont — has no
// Devanagari glyphs, so the Hindi/Sanskrit phrase needs a real Devanagari
// typeface actually loaded. Loaded from the Google Fonts CDN directly (see
// the <link> tags in src/app/layout.tsx) rather than self-hosted via
// next/font, per explicit request — the CDN's variable-weight build (100-900)
// is what this is meant to match, not next/font's static-weight subset.
const DEVANAGARI_FONT_FAMILY = '"Noto Serif Devanagari"';

export type TypographyVortexCanvasProps = {
  mode?: "dark" | "light";
  phrase?: string;
  speed?: number;
  ringGrowth?: number;
  opacity?: number;
  dissolveRadius?: number;
  particleAmount?: number;
  suctionDuration?: number;
  className?: string;
  /** Override the auto-loaded Devanagari fallback font, if needed. */
  fallbackFontFamily?: string;
};

export const TYPOGRAPHY_VORTEX_DEFAULTS = {
  mode: "dark" as const,
  phrase: "॥ ॐ श्री श्याम शरणं मम",
  speed: 3,
  ringGrowth: 1.23,
  opacity: 1,
  dissolveRadius: 1,
  particleAmount: 1,
  suctionDuration: 920,
} as const;

export function TypographyVortexCanvas({ className = "", ...props }: TypographyVortexCanvasProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const optionsRef = useRef({
    ...TYPOGRAPHY_VORTEX_DEFAULTS,
    fallbackFontFamily: DEVANAGARI_FONT_FAMILY,
    ...props,
  });
  optionsRef.current = {
    ...TYPOGRAPHY_VORTEX_DEFAULTS,
    fallbackFontFamily: DEVANAGARI_FONT_FAMILY,
    ...props,
  };

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return undefined;
    return createTypographyVortexRenderer(host, canvas, () => optionsRef.current);
  }, []);

  return (
    <div
      ref={hostRef}
      className={`typography-vortex-component typography-vortex-component--${optionsRef.current.mode}${className ? ` ${className}` : ""}`}
      data-mode={optionsRef.current.mode}
      data-dissolve-state="ambient"
      data-suction-state="idle"
      data-particles="0"
      data-dissolve-strength="0.00"
    >
      <canvas ref={canvasRef} aria-label="Interactive typography vortex" />
    </div>
  );
}
