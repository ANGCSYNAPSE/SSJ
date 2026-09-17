declare global {
  interface Window {
    doGTranslate?: (langPair: string) => void;
  }
}

/** The 9 languages GTranslate is configured for — drives the navbar pill list. */
export const LOCALES = [
  { code: "en", nativeLabel: "English" },
  { code: "hi", nativeLabel: "हिंदी" },
  { code: "bn", nativeLabel: "বাংলা" },
  { code: "ta", nativeLabel: "தமிழ்" },
  { code: "te", nativeLabel: "తెలుగు" },
  { code: "ml", nativeLabel: "മലയാളം" },
  { code: "gu", nativeLabel: "ગુજરાતી" },
  { code: "mr", nativeLabel: "मराठी" },
  { code: "pa", nativeLabel: "ਪੰਜਾਬੀ" },
] as const;

export type LocaleCode = (typeof LOCALES)[number]["code"];
export const DEFAULT_LOCALE: LocaleCode = "en";

/**
 * Triggers a GTranslate language switch. GTranslate is loaded once, sitewide,
 * from the root layout (see GTranslateWidget) — this just calls the function
 * it exposes globally, `window.doGTranslate('<source>|<target>')`.
 *
 * Passing the site's own language ("en|en") is not a no-op: GTranslate's own
 * implementation treats a source === target pair as the signal to restore
 * the original, untranslated page — that's how switching back to English
 * works.
 *
 * Fails silently if the widget hasn't loaded yet (slow network, blocked
 * script, offline) so the rest of the site keeps working in English.
 */
export function switchLanguage(code: string) {
  if (typeof window === "undefined") return;
  if (typeof window.doGTranslate !== "function") return;
  window.doGTranslate(`en|${code}`);
}
