"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowRight, Check, Plane, Star } from "lucide-react";
import { AirportPicker } from "@/components/AirportPicker";
import { Button, Badge, Card, Skeleton, Price, inputCls, Empty } from "@/components/ui";
import { Stepper } from "@/components/Stepper";
import { Silhouette } from "@/components/Silhouette";
import { RouteArc } from "@/components/RouteArc";
import { Checkout } from "@/components/Checkout";
import { SavingsBar } from "@/components/SavingsBar";
import { categories, categoryById, Category } from "@/data/aircraft";
import { airportByCode, routeLabel, distanceKm } from "@/data/airports";
import { buildQuotes, extras as extraList, Quote, co2Kg } from "@/data/quotes";
import { operatorById } from "@/data/operators";
import { eur, minutesToHm } from "@/lib/format";

const steps = ["Tu vuelo", "Ofertas", "Detalle"];

export default function QuoteFlow() {
  const params = useSearchParams();
  const [from, setFrom] = useState(params.get("from") ?? "MAD");
  const [to, setTo] = useState(params.get("to") ?? "IBZ");
  const [date, setDate] = useState(params.get("date") ?? "");
  const [time, setTime] = useState("10:30");
  const [roundTrip, setRoundTrip] = useState(false);
  const [pax, setPax] = useState(Number(params.get("pax") ?? 4));
  const [cat, setCat] = useState<Category>("light");
  const [chosenExtras, setChosenExtras] = useState<string[]>([]);
  const [stage, setStage] = useState<"form" | "waiting" | "quotes">("form");
  const [arrived, setArrived] = useState(0);
  const [selected, setSelected] = useState<Quote | null>(null);
  const [checkout, setCheckout] = useState(false);

  const quotes = useMemo(() => buildQuotes(from, to, cat, pax, roundTrip), [from, to, cat, pax, roundTrip]);
  const spec = categoryById(cat);
  const capacityWarning = pax > Number(spec.seats.split("–")[1] ?? 8);

  const request = () => {
    setStage("waiting");
    setArrived(0);
    setTimeout(() => setStage("quotes"), 1200);
    [1600, 2100, 2600].forEach((t, i) => setTimeout(() => setArrived(i + 1), t));
  };

  const extrasTotal = chosenExtras.reduce((s, id) => s + (extraList.find((e) => e.id === id)?.price ?? 0), 0);
  const stepIndex = stage === "form" ? 0 : selected ? 2 : 1;

  return (
    <div className="mx-auto max-w-shell px-5 py-14 md:px-8 md:py-20">
      <div className="flex flex-wrap items-end justify-between gap-6 border-b border-line pb-8">
        <div>
          <p className="eyebrow">Charter a medida</p>
          <h1 className="mt-3 font-display text-display2">
            {stage === "form" ? "Cuéntanos tu vuelo." : routeLabel(from, to)}
          </h1>
        </div>
        <Stepper steps={steps} current={stepIndex} />
      </div>

      {/* Paso 1: formulario */}
      {stage === "form" && (
        <div className="mt-12 grid gap-14 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-20">
          <div className="space-y-10">
            <div className="grid gap-5 sm:grid-cols-2">
              <AirportPicker label="Origen" value={from} onChange={setFrom} placeholder="Ciudad o código" exclude={to} />
              <AirportPicker label="Destino" value={to} onChange={setTo} placeholder="Ciudad o código" exclude={from} />
            </div>

            <div className="grid gap-5 sm:grid-cols-3">
              <label className="block">
                <span className="eyebrow mb-2 block">Fecha</span>
                <input type="date" className={inputCls} value={date} onChange={(e) => setDate(e.target.value)} />
              </label>
              <label className="block">
                <span className="eyebrow mb-2 block">Hora aproximada</span>
                <input type="time" className={inputCls} value={time} onChange={(e) => setTime(e.target.value)} />
              </label>
              <label className="block">
                <span className="eyebrow mb-2 block">Pasajeros</span>
                <input
                  type="number"
                  min={1}
                  max={16}
                  className={`${inputCls} num`}
                  value={pax}
                  onChange={(e) => setPax(Math.max(1, Math.min(16, Number(e.target.value) || 1)))}
                />
              </label>
            </div>

            <div className="flex gap-2">
              {[
                { id: false, label: "Solo ida" },
                { id: true, label: "Ida y vuelta" },
              ].map((o) => (
                <button
                  key={String(o.id)}
                  onClick={() => setRoundTrip(o.id)}
                  className={`rounded-sm border px-4 py-2 text-sm transition-colors duration-200 ${
                    roundTrip === o.id ? "border-champagne text-champagne" : "border-line text-muted hover:border-faint"
                  }`}
                >
                  {o.label}
                </button>
              ))}
            </div>

            <div>
              <p className="eyebrow">Categoría de aeronave</p>
              <div className="mt-4 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
                {categories.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setCat(c.id)}
                    className={`bg-ink p-5 text-left transition-colors duration-200 ${
                      cat === c.id ? "ring-1 ring-inset ring-champagne" : "hover:bg-surface"
                    }`}
                  >
                    <Silhouette
                      variant={c.id === "turboprop" ? "turboprop" : c.id === "heavy" || c.id === "ultra" ? "heavy" : "jet"}
                      accent={cat === c.id}
                      className="mb-3 w-full max-w-[180px]"
                    />
                    <p className={`text-sm ${cat === c.id ? "text-champagne" : "text-primary"}`}>{c.name}</p>
                    <p className="num mt-2 text-2xs text-faint">
                      {c.seats} plazas · {c.range} · {c.speed}
                    </p>
                    <p className="num mt-1 text-2xs text-faint">{c.baggage}</p>
                    <p className="mt-2 text-xs leading-relaxed text-muted">{c.note}</p>
                  </button>
                ))}
              </div>
              {capacityWarning && (
                <p className="mt-3 text-sm text-warn">
                  Sois {pax} y esta categoría admite {spec.seats}. Puedes seguir: el operador propondrá un avión mayor si
                  hace falta.
                </p>
              )}
            </div>

            <div>
              <p className="eyebrow">Extras opcionales</p>
              <div className="mt-4 grid gap-px bg-line sm:grid-cols-2">
                {extraList.map((e) => {
                  const on = chosenExtras.includes(e.id);
                  return (
                    <button
                      key={e.id}
                      onClick={() => setChosenExtras((c) => (on ? c.filter((x) => x !== e.id) : [...c, e.id]))}
                      className="flex items-start justify-between gap-4 bg-ink p-4 text-left transition-colors hover:bg-surface"
                    >
                      <span>
                        <span className={`block text-sm ${on ? "text-champagne" : "text-primary"}`}>{e.label}</span>
                        <span className="mt-1 block text-xs text-muted">{e.detail}</span>
                      </span>
                      <span className="flex shrink-0 items-center gap-2">
                        <span className="num text-xs text-faint">+{eur(e.price)} €</span>
                        <span
                          className={`grid h-5 w-5 place-items-center rounded-sm border ${
                            on ? "border-champagne text-champagne" : "border-line text-transparent"
                          }`}
                        >
                          <Check size={12} strokeWidth={2} />
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <Card className="p-6">
              <p className="eyebrow">Resumen</p>
              <p className="mt-3 font-display text-display3">{routeLabel(from, to)}</p>
              <RouteArc from={from} to={to} durationMin={Math.round((distanceKm(from, to) / 780) * 60 + 18)} className="mt-5" />
              <dl className="mt-5 space-y-2.5 text-sm">
                {[
                  ["Distancia", `${distanceKm(from, to)} km`],
                  ["Trayecto", roundTrip ? "Ida y vuelta" : "Solo ida"],
                  ["Pasajeros", String(pax)],
                  ["Categoría", spec.name],
                  ["Extras", chosenExtras.length ? `${chosenExtras.length} seleccionados` : "Ninguno"],
                  ["Huella estimada", `${co2Kg(from, to, cat)} kg CO₂`],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-baseline justify-between gap-4">
                    <dt className="text-muted">{k}</dt>
                    <dd className="num text-primary">{v}</dd>
                  </div>
                ))}
              </dl>
              <Button size="lg" className="mt-6 w-full" onClick={request} disabled={from === to}>
                Pedir cotización
                <ArrowRight size={16} strokeWidth={1.5} />
              </Button>
              <p className="mt-3 text-center text-2xs text-faint">
                Sin compromiso ni tarjeta. Recibirás tres ofertas comparables.
              </p>
            </Card>
          </aside>
        </div>
      )}

      {/* Paso 2: espera y ofertas */}
      {stage !== "form" && !selected && (
        <div className="mt-12">
          <div className="flex flex-wrap items-center justify-between gap-4 border border-line bg-surface px-6 py-5">
            <div className="flex items-center gap-3">
              <span className="relative grid h-8 w-8 place-items-center rounded-full border border-champagne/50 text-champagne">
                <Plane size={14} strokeWidth={1.5} />
              </span>
              <div>
                <p className="text-sm text-primary">Solicitud enviada a la red de operadores</p>
                <p className="num text-2xs text-faint">
                  {routeLabel(from, to)} · {pax} pasajeros · {spec.name}
                  {date ? ` · ${date} ${time}` : ""}
                </p>
              </div>
            </div>
            <Button variant="quiet" size="sm" onClick={() => { setStage("form"); setArrived(0); }}>
              Cambiar la solicitud
            </Button>
          </div>

          <div className="mt-8 space-y-px bg-line">
            {[0, 1, 2].map((i) => {
              const q = quotes[i];
              if (i >= arrived) {
                return (
                  <div key={i} className="bg-ink p-6">
                    <div className="flex items-center justify-between gap-6">
                      <div className="flex-1 space-y-3">
                        <Skeleton className="h-3 w-32" />
                        <Skeleton className="h-5 w-56" />
                        <Skeleton className="h-3 w-40" />
                      </div>
                      <Skeleton className="h-9 w-28" />
                    </div>
                    <p className="mt-4 text-2xs text-faint">
                      {i === 0 ? "Esperando respuesta de los operadores…" : `Oferta ${i + 1} en camino`}
                    </p>
                  </div>
                );
              }
              const op = operatorById(q.operatorId);
              return (
                <article key={q.id} className="rise bg-ink p-6">
                  <div className="flex flex-wrap items-start justify-between gap-6">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="grid h-8 w-8 place-items-center rounded-sm border border-line text-2xs tracking-[0.12em] text-champagne">
                          {op.monogram}
                        </span>
                        <span className="text-sm text-primary">{op.name}</span>
                        <span className="num flex items-center gap-1 text-2xs text-faint">
                          <Star size={11} strokeWidth={1.5} className="text-champagne" /> {op.rating}
                        </span>
                        {q.badge && <Badge tone="gold">{q.badge}</Badge>}
                      </div>
                      <p className="mt-3 font-display text-display3">
                        {q.model} <span className="num text-base text-muted">· {q.year}</span>
                      </p>
                      <p className="num mt-2 text-2xs text-faint">
                        {q.registration} · {q.seats} plazas · {minutesToHm(q.flightMin)} de vuelo · respondió en {q.responseMin} min
                      </p>
                      <p className="mt-3 text-xs text-muted">Incluye: {q.included.join(" · ")}</p>
                    </div>

                    <div className="flex flex-col items-end gap-3">
                      <Price value={eur(q.price)} size="lg" />
                      <span className="num text-2xs text-faint">{eur(Math.round(q.price / pax))} € por pasajero</span>
                      <Button size="sm" onClick={() => setSelected(q)}>
                        Ver detalle
                        <ArrowRight size={14} strokeWidth={1.5} />
                      </Button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {arrived === 3 && (
            <div className="mt-10 grid gap-10 border-t border-line pt-10 lg:grid-cols-2">
              <div>
                <p className="eyebrow">Comparativa</p>
                <div className="mt-5">
                  <SavingsBar
                    rows={[
                      { label: "Charter a medida (mejor oferta)", value: quotes[0].price },
                      { label: "Empty leg equivalente, si aparece", value: Math.round(quotes[0].price * 0.55) },
                      { label: `Pooling entre ${Math.max(pax, 6)} personas`, value: Math.round(quotes[0].price / Math.max(pax, 6)), accent: true, unit: "€/plaza" },
                    ]}
                    caption="Las dos últimas cifras son orientativas: dependen de que exista un vuelo vacío en tu ventana o de que se llene un pool."
                  />
                </div>
              </div>
              <div className="text-sm leading-relaxed text-muted">
                <p className="eyebrow">Qué pasa ahora</p>
                <p className="mt-5">
                  Las ofertas quedan bloqueadas 24 horas. Cuando eliges una, el operador confirma el slot y recibes la
                  documentación del vuelo. Si prefieres esperar a un empty leg en esta ruta, crea una alerta y te avisamos
                  en cuanto se publique.
                </p>
                <Button href={`/empty-legs?from=${from}&to=${to}`} variant="ghost" size="sm" className="mt-5">
                  Ver empty legs de esta ruta
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Paso 3: detalle de la oferta */}
      {selected && (
        <QuoteDetail
          quote={selected}
          from={from}
          to={to}
          pax={pax}
          date={date}
          time={time}
          chosenExtras={chosenExtras}
          extrasTotal={extrasTotal}
          onBack={() => setSelected(null)}
          onBook={() => setCheckout(true)}
        />
      )}

      {selected && (
        <Checkout
          open={checkout}
          onClose={() => setCheckout(false)}
          title="Confirmar charter"
          lines={[
            { label: `${selected.model} · ${selected.registration}`, value: selected.price },
            ...chosenExtras.map((id) => {
              const e = extraList.find((x) => x.id === id)!;
              return { label: e.label, value: e.price };
            }),
          ]}
          total={selected.price + extrasTotal}
          booking={{
            type: "Charter",
            route: routeLabel(from, to),
            date: date ? `${date} · ${time}` : "Fecha por confirmar",
            aircraft: `${selected.model} · ${selected.registration}`,
            total: selected.price + extrasTotal,
            status: "Confirmado",
          }}
        />
      )}
    </div>
  );
}

function QuoteDetail({
  quote,
  from,
  to,
  pax,
  date,
  time,
  chosenExtras,
  extrasTotal,
  onBack,
  onBook,
}: any) {
  const op = operatorById(quote.operatorId);
  return (
    <div className="mt-12 grid gap-14 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-16">
      <div>
        <Button variant="quiet" size="sm" onClick={onBack} className="mb-6 -ml-2">
          ← Volver a las tres ofertas
        </Button>

        <div className="border border-line bg-surface p-8">
          <Silhouette variant={quote.seats > 10 ? "heavy" : "jet"} accent className="w-full max-w-lg" />
        </div>

        <div className="mt-8">
          <p className="eyebrow">{op.name}</p>
          <h2 className="mt-3 font-display text-display2">
            {quote.model} <span className="num text-xl text-muted">{quote.year}</span>
          </h2>
          <p className="num mt-3 text-sm text-faint">
            {quote.registration} · {quote.seats} plazas · {minutesToHm(quote.flightMin)} de vuelo
          </p>
        </div>

        <RouteArc from={from} to={to} durationMin={quote.flightMin} className="mt-8 max-w-lg" />

        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          <div>
            <p className="eyebrow">Incluido en el precio</p>
            <ul className="mt-4 space-y-2">
              {quote.included.map((i: string) => (
                <li key={i} className="flex items-center gap-2 text-sm text-muted">
                  <Check size={13} strokeWidth={1.5} className="text-champagne" />
                  {i}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow">Política del operador</p>
            <p className="mt-4 text-sm leading-relaxed text-muted">{op.cancellationPolicy}</p>
            <p className="num mt-4 text-2xs text-faint">
              {op.aoc} · base en {op.base}
            </p>
          </div>
        </div>
      </div>

      <aside className="lg:sticky lg:top-24 lg:h-fit">
        <Card className="p-6">
          <p className="eyebrow">Desglose</p>
          <dl className="mt-5 space-y-2.5 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Vuelo, tripulación y tasas</dt>
              <dd className="num">{eur(quote.price)} €</dd>
            </div>
            {chosenExtras.map((id: string) => {
              const e = extraList.find((x) => x.id === id)!;
              return (
                <div key={id} className="flex justify-between gap-4">
                  <dt className="text-muted">{e.label}</dt>
                  <dd className="num">{eur(e.price)} €</dd>
                </div>
              );
            })}
          </dl>
          <div className="rule mt-5 flex items-baseline justify-between pt-5">
            <span className="text-sm text-muted">Total</span>
            <Price value={eur(quote.price + extrasTotal)} size="lg" />
          </div>
          <p className="num mt-2 text-right text-2xs text-faint">
            {eur(Math.round((quote.price + extrasTotal) / pax))} € por pasajero
          </p>
          <Button size="lg" className="mt-6 w-full" onClick={onBook}>
            Reservar este avión
          </Button>
          <p className="mt-3 text-center text-2xs text-faint">
            {date ? `Salida prevista el ${date} a las ${time}.` : "Confirmarás fecha y hora con el operador."}
          </p>
        </Card>
      </aside>
    </div>
  );
}
