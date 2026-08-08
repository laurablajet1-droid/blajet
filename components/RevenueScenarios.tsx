"use client";

import { useMemo, useState } from "react";
import { gmvMonthly, takeRate } from "@/data/metrics";
import { Counter } from "./Counter";
import { eur } from "@/lib/format";

// El inversor mueve las comisiones y ve el revenue recalcularse sobre el GMV real de la app.
const modalities = [
  { id: "charter", label: "Charter a medida", base: 8, min: 4, max: 15 },
  { id: "empty", label: "Empty legs", base: 12, min: 6, max: 22 },
  { id: "pooling", label: "Pooling", base: 15, min: 8, max: 28 },
] as const;

export function RevenueScenarios() {
  const [rates, setRates] = useState<Record<string, number>>({ charter: 8, empty: 12, pooling: 15 });
  const last = gmvMonthly[gmvMonthly.length - 1];
  const baseRates = { charter: 8, empty: 12, pooling: 15 };

  const model = useMemo(() => {
    const rev = (r: Record<string, number>) =>
      (last.charter * r.charter + last.empty * r.empty + last.pooling * r.pooling) / 100;
    const now = rev(rates);
    const base = rev(baseRates);
    return {
      month: now,
      year: now * 12,
      delta: now - base,
      gmv: last.charter + last.empty + last.pooling,
      blended: (now / (last.charter + last.empty + last.pooling)) * 100,
    };
  }, [rates, last]);

  const changed = modalities.some((m) => rates[m.id] !== (baseRates as any)[m.id]);

  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16">
      <div>
        <div className="space-y-7">
          {modalities.map((m) => (
            <div key={m.id}>
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-sm text-primary">{m.label}</span>
                <span className="num text-sm text-champagne">{rates[m.id]} %</span>
              </div>
              <input
                type="range"
                min={m.min}
                max={m.max}
                value={rates[m.id]}
                onChange={(e) => setRates((r) => ({ ...r, [m.id]: Number(e.target.value) }))}
                className="mt-3 w-full accent-[var(--c-champagne)]"
                aria-label={`Comisión de ${m.label} en porcentaje`}
              />
              <p className="num mt-1.5 text-2xs text-faint">
                Hoy {m.base} % · GMV del mes {eur((last as any)[m.id])} k€
              </p>
            </div>
          ))}
        </div>

        {changed && (
          <button
            onClick={() => setRates({ ...baseRates })}
            className="mt-7 text-2xs text-faint underline-offset-4 transition-colors hover:text-primary hover:underline"
          >
            Volver a las comisiones actuales
          </button>
        )}
      </div>

      <div>
        <div className="grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2">
          <div className="bg-surface px-6 py-7">
            <p className="eyebrow">Revenue del mes</p>
            <p className="mt-3 font-display text-[2.25rem] leading-none text-champagne">
              <Counter to={Math.round(model.month)} startOnView={false} />
              <span className="ml-1.5 text-sm text-muted">k€</span>
            </p>
          </div>
          <div className="bg-surface px-6 py-7">
            <p className="eyebrow">Anualizado</p>
            <p className="mt-3 font-display text-[2.25rem] leading-none">
              <Counter to={Math.round(model.year / 100) / 10} decimals={1} startOnView={false} />
              <span className="ml-1.5 text-sm text-muted">M€</span>
            </p>
          </div>
        </div>

        <dl className="mt-8 space-y-3 text-sm">
          <div className="flex items-baseline justify-between gap-4 border-b border-line pb-3">
            <dt className="text-muted">GMV sobre el que se calcula</dt>
            <dd className="num">{eur(model.gmv)} k€/mes</dd>
          </div>
          <div className="flex items-baseline justify-between gap-4 border-b border-line pb-3">
            <dt className="text-muted">Take rate combinado</dt>
            <dd className="num text-champagne">{model.blended.toFixed(1)} %</dd>
          </div>
          <div className="flex items-baseline justify-between gap-4">
            <dt className="text-muted">Diferencia frente a hoy</dt>
            <dd className={`num ${model.delta >= 0 ? "text-good" : "text-warn"}`}>
              {model.delta >= 0 ? "+" : "−"}
              {eur(Math.abs(model.delta))} k€/mes
            </dd>
          </div>
        </dl>

        <p className="mt-8 text-xs leading-relaxed text-muted">
          Un punto de comisión en pooling pesa poco hoy en euros, pero es la modalidad que más rápido crece: si mantiene
          su ritmo, en doce meses mueve más volumen que los empty legs. Ahí está la palanca del modelo.
        </p>
      </div>
    </div>
  );
}