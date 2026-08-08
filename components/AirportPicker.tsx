"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { airports } from "@/data/airports";
import { inputCls } from "./ui";

export function AirportPicker({
  value,
  onChange,
  placeholder,
  label,
  exclude,
}: {
  value: string;
  onChange: (code: string) => void;
  placeholder: string;
  label: string;
  exclude?: string;
}) {
  const selected = airports.find((a) => a.code === value);
  const [query, setQuery] = useState(selected ? `${selected.city} (${selected.code})` : "");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const a = airports.find((x) => x.code === value);
    setQuery(a ? `${a.city} (${a.code})` : "");
  }, [value]);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const pool = airports.filter((a) => a.code !== exclude);
    if (!q) return pool.slice(0, 7);
    return pool
      .filter(
        (a) =>
          a.city.toLowerCase().includes(q) ||
          a.code.toLowerCase().includes(q) ||
          a.name.toLowerCase().includes(q) ||
          a.country.toLowerCase().includes(q)
      )
      .slice(0, 7);
  }, [query, exclude]);

  const pick = (code: string) => {
    onChange(code);
    setOpen(false);
  };

  return (
    <div ref={boxRef} className="relative">
      <span className="eyebrow mb-2 block">{label}</span>
      <input
        className={inputCls}
        value={query}
        placeholder={placeholder}
        role="combobox"
        aria-expanded={open}
        aria-autocomplete="list"
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
          setActive(0);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") { e.preventDefault(); setOpen(true); setActive((i) => Math.min(i + 1, results.length - 1)); }
          if (e.key === "ArrowUp") { e.preventDefault(); setActive((i) => Math.max(i - 1, 0)); }
          if (e.key === "Enter" && open && results[active]) { e.preventDefault(); pick(results[active].code); }
          if (e.key === "Escape") setOpen(false);
        }}
      />
      {open && (
        <ul className="absolute z-40 mt-1.5 w-full overflow-hidden rounded border border-line bg-raised shadow-lift">
          {results.length === 0 && (
            <li className="px-3 py-3 text-sm text-muted">
              No volamos todavía a ese destino. Puedes pedir la ruta desde la página de pooling.
            </li>
          )}
          {results.map((a, i) => (
            <li key={a.code}>
              <button
                type="button"
                onMouseEnter={() => setActive(i)}
                onClick={() => pick(a.code)}
                className={`flex w-full items-baseline justify-between gap-3 px-3 py-2.5 text-left transition-colors ${
                  i === active ? "bg-line/60" : ""
                }`}
              >
                <span className="min-w-0">
                  <span className="block text-sm text-primary">{a.city}</span>
                  <span className="block truncate text-2xs text-faint">{a.name}</span>
                </span>
                <span className="num text-2xs tracking-[0.16em] text-champagne">{a.code}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
