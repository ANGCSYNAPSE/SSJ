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

export function isLocaleCode(value: string): value is LocaleCode {
  return LOCALES.some((locale) => locale.code === value);
}
