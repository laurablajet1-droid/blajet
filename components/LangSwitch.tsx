"use client";

import { useLang } from "@/lib/lang";

export function LangSwitch({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLang();
  return (
    <div className={`flex items-center gap-px rounded-sm border border-line ${className}`} role="group" aria-label="Idioma">
      {(["es", "en"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`px-2 py-1 text-2xs uppercase tracking-[0.12em] transition-colors ${
            lang === l ? "text-champagne" : "text-faint hover:text-primary"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}