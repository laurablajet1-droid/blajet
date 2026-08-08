"use client";

import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { funnel, gmvMonthly, marketplace, segments, takeRate, unitEconomics } from "@/data/metrics";
import { Counter } from "@/components/Counter";
import { Badge, Card } from "@/components/ui";
import { RevenueScenarios } from "@/components/RevenueScenarios";
import { eur, num } from "@/lib/format";

const gold = "#C9A961";

function Tip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded border border-line bg-raised px-3 py-2 shadow-lift">
      <p className="text-2xs uppercase tracking-[0.14em] text-faint">{label}</p>
      {payload.map((p: any) => (
        <p key={p.dataKey} className="num mt-1 text-xs text-primary">
          {p.name}: {num(p.value)} k€
        </p>
      ))}
    </div>
  );
}

export default function Dashboard() {
  const lastMonth = gmvMonthly[gmvMonthly.length - 1];
  const gmvNow = lastMonth.charter + lastMonth.empty + lastMonth.pooling;
  const firstMonth = gmvMonthly[0];
  const gmvFirst = firstMonth.charter + firstMonth.empty + firstMonth.pooling;
  const growth = Math.round(((gmvNow - gmvFirst) / gmvFirst) * 100);
  const revenue = takeRate.reduce((s, t) => s + t.revenueMonth, 0);
  const blended = segments.reduce((s, x) => s + x.ltv, 0) / segments.reduce((s, x) => s + x.cac, 0);

  return (
    <div className="mx-auto max-w-shell px-5 py-14 md:px-8 md:py-20">
      <div className="flex flex-wrap items-end justify-between gap-6 border-b border-line pb-10">
        <div>
          <p className="eyebrow">Inversores</p>
          <h1 className="mt-3 font-display text-display2">El marketplace en números.</h1>
        </div>
        <Badge tone="neutral">Datos ilustrativos · proyección de modelo</Badge>
      </div>

      {/* Cifras de cabecera */}
      <div className="mt-10 grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "GMV del último mes", value: gmvNow, unit: "k€" },
          { label: "Revenue del último mes", value: Math.round(revenue), unit: "k€" },
          { label: "Crecimiento en 12 meses", value: growth, unit: "%" },
          { label: "LTV / CAC combinado", value: Number(blended.toFixed(1)), unit: "×", decimals: 1 },
        ].map((k) => (
          <div key={k.label} className="bg-surface px-6 py-7">
            <p className="eyebrow">{k.label}</p>
            <p className="mt-3 font-display text-[2.25rem] leading-none text-champagne">
              <Counter to={k.value} decimals={(k as any).decimals ?? 0} />
              <span className="ml-1.5 text-sm text-muted">{k.unit}</span>
            </p>
          </div>
        ))}
      </div>

      {/* GMV */}
      <section className="mt-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">GMV mensual por modalidad</p>
            <h2 className="mt-3 font-display text-display3">El pooling es lo que más rápido crece.</h2>
          </div>
          <div className="flex flex-wrap gap-5 text-2xs uppercase tracking-[0.14em] text-faint">
            {[
              { l: "Charter", o: 0.35 },
              { l: "Empty legs", o: 0.65 },
              { l: "Pooling", o: 1 },
            ].map((x) => (
              <span key={x.l} className="flex items-center gap-2">
                <span className="inline-block h-2.5 w-2.5 rounded-sm" style={{ background: gold, opacity: x.o }} />
                {x.l}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-8 h-[320px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={gmvMonthly} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
              <CartesianGrid stroke="var(--c-line)" vertical={false} />
              <XAxis dataKey="month" stroke="var(--c-faint)" tickLine={false} axisLine={false} fontSize={10} />
              <YAxis stroke="var(--c-faint)" tickLine={false} axisLine={false} fontSize={10} unit=" k" />
              <Tooltip content={<Tip />} cursor={{ fill: "var(--c-line)", opacity: 0.35 }} />
              <Bar dataKey="charter" name="Charter" stackId="a" fill={gold} fillOpacity={0.35} />
              <Bar dataKey="empty" name="Empty legs" stackId="a" fill={gold} fillOpacity={0.65} />
              <Bar dataKey="pooling" name="Pooling" stackId="a" fill={gold} radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="num mt-3 text-2xs text-faint">Miles de euros de volumen transaccionado. Últimos 12 meses.</p>
      </section>

      {/* Escenarios */}
      <section className="mt-20 border-t border-line pt-14">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Escenarios</p>
            <h2 className="mt-3 font-display text-display3">Mueve las comisiones y mira qué pasa.</h2>
          </div>
          <p className="max-w-sm text-xs leading-relaxed text-faint">
            Sobre el GMV real del último mes de la plataforma. Cambia el take rate de cada modalidad y el revenue se
            recalcula al instante.
          </p>
        </div>
        <div className="mt-10">
          <RevenueScenarios />
        </div>
      </section>

      {/* Take rate */}
      <section className="mt-20 grid gap-14 lg:grid-cols-2">
        <div>
          <p className="eyebrow">Take rate por modalidad</p>
          <h2 className="mt-3 font-display text-display3">Menos ticket, más margen.</h2>
          <div className="mt-8 space-y-6">
            {takeRate.map((t) => (
              <div key={t.modality}>
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-sm text-primary">{t.modality}</span>
                  <span className="num text-sm text-champagne">{t.rate} %</span>
                </div>
                <div className="mt-2 h-[3px] w-full overflow-hidden rounded-sm bg-line">
                  <div className="h-full rounded-sm bg-champagne" style={{ width: `${(t.rate / 15) * 100}%` }} />
                </div>
                <p className="num mt-2 text-2xs text-faint">
                  Ticket medio {eur(t.ticket)} € · revenue {t.revenueMonth} k€/mes
                </p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="eyebrow">Funnel de conversión</p>
          <h2 className="mt-3 font-display text-display3">De la visita a la reserva pagada.</h2>
          <div className="mt-8 space-y-4">
            {funnel.map((f, i) => (
              <div key={f.step}>
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-sm text-muted">{f.step}</span>
                  <span className="num text-sm text-primary">{num(f.value)}</span>
                </div>
                <div className="mt-2 h-6 w-full bg-line/40">
                  <div
                    className="h-full bg-champagne transition-[width] duration-700 ease-calm"
                    style={{ width: `${(f.value / funnel[0].value) * 100}%`, opacity: 0.28 + i * 0.18 }}
                  />
                </div>
                <p className="mt-1.5 text-2xs text-faint">{f.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Unit economics */}
      <section className="mt-20">
        <p className="eyebrow">Unit economics</p>
        <h2 className="mt-3 font-display text-display3">Dos segmentos, dos economías.</h2>

        <div className="mt-8 grid gap-px overflow-hidden rounded-md border border-line bg-line lg:grid-cols-2">
          {segments.map((s) => (
            <div key={s.segment} className="bg-surface p-7">
              <p className="text-sm text-primary">{s.segment}</p>
              <div className="mt-6 grid grid-cols-3 gap-4">
                {[
                  { l: "LTV", v: `${eur(s.ltv)} €` },
                  { l: "CAC", v: `${eur(s.cac)} €` },
                  { l: "LTV/CAC", v: `${(s.ltv / s.cac).toFixed(1)}×` },
                ].map((m) => (
                  <div key={m.l}>
                    <p className="eyebrow">{m.l}</p>
                    <p className="num mt-2 text-xl text-champagne">{m.v}</p>
                  </div>
                ))}
              </div>
              <p className="num mt-6 text-2xs text-faint">
                Ticket medio {eur(s.ticket)} € · {s.freq}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow">CAC por canal</p>
            <div className="mt-5 space-y-4">
              {unitEconomics.map((c) => (
                <div key={c.channel} className="flex items-baseline justify-between gap-4 border-b border-line pb-3">
                  <span className="text-sm text-muted">{c.channel}</span>
                  <span className="num text-sm">
                    {eur(c.cac)} € <span className="text-2xs text-faint">· {c.share} del volumen</span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="eyebrow">Salud del marketplace</p>
            <div className="mt-5 grid grid-cols-2 gap-6">
              {marketplace.map((m) => (
                <div key={m.label}>
                  <p className="num text-[1.75rem] leading-none text-champagne">
                    <Counter to={m.value} />
                    {m.suffix}
                  </p>
                  <p className="mt-2 text-xs text-muted">{m.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <p className="mt-20 border-t border-line pt-6 text-2xs leading-relaxed text-faint">
        Datos ilustrativos elaborados sobre el modelo de negocio de BlaJet y coherentes con los precios, operadores y
        rutas que se ven en la plataforma. No constituyen resultados auditados ni una previsión comprometida.
      </p>
    </div>
  );
}
