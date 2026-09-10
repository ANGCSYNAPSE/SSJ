"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { DEFAULT_LOCALE, isLocaleCode, type LocaleCode } from "@/lib/i18n/locales";
import { translations, type TranslationKey } from "@/lib/i18n/translations";

const STORAGE_KEY = "ssj-locale";

interface LocaleContextValue {
  locale: LocaleCode;
  setLocale: (locale: LocaleCode) => void;
  t: (key: TranslationKey) => string;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export default function LocaleProvider({ children }: { children: React.ReactNode }) {
  // Always render the default locale on the first pass so server and client
  // markup match; the stored preference (if any) is applied after mount.
  const [locale, setLocaleState] = useState<LocaleCode>(DEFAULT_LOCALE);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && isLocaleCode(stored)) {
      setLocaleState(stored);
    }
  }, []);

  const setLocale = useCallback((next: LocaleCode) => {
    setLocaleState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
    document.cookie = `${STORAGE_KEY}=${next}; path=/; max-age=31536000`;
  }, []);

  const t = useCallback(
    (key: TranslationKey) => translations[locale][key] ?? translations[DEFAULT_LOCALE][key],
    [locale],
  );

  const value = useMemo(() => ({ locale, setLocale, t }), [locale, setLocale, t]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used inside <LocaleProvider>.");
  }
  return context;
}
