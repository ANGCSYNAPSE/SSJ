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
/** The language visitors see first, until they pick another one (the site itself is written in English). */
export const DEFAULT_LOCALE: LocaleCode = "hi";

const STORAGE_KEY = "ssj-lang";

/** The visitor's saved language choice, or the default when they have not chosen yet. */
export function savedLocale(): LocaleCode {
  try {
    const code = window.localStorage.getItem(STORAGE_KEY);
    if (LOCALES.some((l) => l.code === code)) return code as LocaleCode;
  } catch {
    /* storage blocked: fall back to the default */
  }
  return DEFAULT_LOCALE;
}

export function saveLocale(code: LocaleCode) {
  try {
    window.localStorage.setItem(STORAGE_KEY, code);
  } catch {
    /* ignore */
  }
}

/** Whether GTranslate has already translated this page into `code` (it keeps a googtrans cookie). */
function isTranslatedTo(code: string) {
  return document.cookie.split("; ").some((c) => c === `googtrans=/en/${code}`);
}

/**
 * Applies the saved (or default) language once GTranslate has loaded. Does nothing
 * when the page is already in that language, so it never reloads in a loop.
 */
export function applyInitialLanguage(code: LocaleCode) {
  if (code === "en" || isTranslatedTo(code)) return () => {};
  let tries = 0;
  const timer = window.setInterval(() => {
    tries += 1;
    if (typeof window.doGTranslate === "function") {
      window.clearInterval(timer);
      switchLanguage(code);
    } else if (tries > 50) {
      window.clearInterval(timer);
    }
  }, 300);
  return () => window.clearInterval(timer);
}

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
