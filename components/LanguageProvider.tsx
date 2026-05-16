"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  LANG_STORAGE_KEY,
  translations,
  type Lang,
} from "@/lib/translations";

type Dir = "ltr" | "rtl";

type LanguageContextValue = {
  lang: Lang;
  dir: Dir;
  t: (typeof translations)[Lang];
  setLang: (l: Lang) => void;
  toggle: () => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function detectInitialLang(): Lang {
  if (typeof window === "undefined") return "en";
  try {
    const saved = window.localStorage.getItem(LANG_STORAGE_KEY);
    if (saved === "en" || saved === "fa") return saved;
  } catch {
    // localStorage blocked
  }
  const nav = navigator.language?.toLowerCase() || "";
  if (nav.startsWith("fa") || nav.startsWith("prs") || nav.startsWith("ps"))
    return "fa";
  return "en";
}

export function LanguageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Always start as "en" on the server to match SSR output.
  // The inline script in <head> already set <html lang/dir> for first paint,
  // and this effect aligns React state on the client.
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const detected = detectInitialLang();
    setLangState(detected);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "fa" ? "rtl" : "ltr";
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem(LANG_STORAGE_KEY, l);
    } catch {
      // ignore
    }
  }, []);

  const toggle = useCallback(() => {
    setLangState((prev) => {
      const next: Lang = prev === "en" ? "fa" : "en";
      try {
        window.localStorage.setItem(LANG_STORAGE_KEY, next);
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  const value: LanguageContextValue = {
    lang,
    dir: lang === "fa" ? "rtl" : "ltr",
    t: translations[lang],
    setLang,
    toggle,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within <LanguageProvider>");
  }
  return ctx;
}
