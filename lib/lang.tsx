"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type Lang = "es" | "en";
export type Str = { es: string; en: string };

const KEY = "blajet.lang";

const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({
  lang: "es",
  setLang: () => {},
});

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("es");

  useEffect(() => {
    try {
      const param = new URLSearchParams(window.location.search).get("lang");
      const stored = window.localStorage.getItem(KEY);
      const next: Lang = param === "en" || param === "es" ? param : stored === "en" ? "en" : "es";
      setLangState(next);
      document.documentElement.lang = next;
    } catch {
      /* sin almacenamiento: se queda en español */
    }
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    document.documentElement.lang = l;
    try {
      window.localStorage.setItem(KEY, l);
    } catch {}
  }, []);

  const value = useMemo(() => ({ lang, setLang }), [lang, setLang]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);

/** Devuelve la traducción activa. Acepta texto plano para lo que no se traduce. */
export function useT() {
  const { lang } = useLang();
  return useCallback((s: Str | string) => (typeof s === "string" ? s : s[lang]), [lang]);
}

export const pick = (s: Str | string, lang: Lang) => (typeof s === "string" ? s : s[lang]);