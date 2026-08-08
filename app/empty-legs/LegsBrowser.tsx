"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { BellPlus, Check } from "lucide-react";
import { emptyLegs } from "@/data/emptyLegs";
import { airports, airportByCode } from "@/data/airports";
import { EmptyLegCard } from "@/components/EmptyLegCard";
import { Button, Card, Empty, inputCls } from "@/components/ui";
import { useStore } from "@/lib/store";
import { eur } from "@/lib/format";

const purchaseFilters = [
  { id: "all", label: "Todo" },
  { id: "seat", label: "Por asiento" },
  { id: "whole", label: "Vuelo completo" },
  { id: "offers", label: "Admite ofertas" },
];

export default function LegsBrowser() {
  const params = useSearchParams();
  const { addAlert, alerts } = useStore();
  const [from, setFrom] = useState(params.get("from") ?? "");
  const [to, setTo] = useState(params.get("to") ?? "");
  const [maxPrice, setMaxPrice] = useState(20000);
  const [window, setWindow] = useState(240);
  const [purchase, setPurchase] = useState("all");
  const [alertDone, setAlertDone] = useState(false);

  const results = useMemo(() => {
    return emptyLegs
      .filter((l) => (from ? l.from === from : true))
      .filter((l) => (to ? l.to === to : true))
      .filter((l) => l.priceWhole <= maxPrice)
      .filter((l) => l.hoursFromNow <= window)
      .filter((l) =>
        purchase === "seat" ? l.seatEligible : purchase === "whole" ? !l.seatEligible : purchase === "offers" ? l.acceptsOffers : true
      )
      .sort((a, b) => a.hoursFromNow - b.hoursFromNow);
  }, [from, to, maxPrice, window, purchase]);

  const clear = () => {
    setFrom("");
    setTo("");
    setMaxPrice(20000);
    setWindow(240);
    setPurchase("all");
  };

  const createAlert = () => {
    addAlert({
      route: `${from ? airportByCode(from).city : "Cualquier origen"} → ${to ? airportByCode(to).city : "Cualquier destino"}`,
      window: `Salidas en ${window} h`,
      maxPrice,
    });
    setAlertDone(true);
    setTimeout(() => setAlertDone(false), 3200);
  };

  return (
    <div className="mx-auto max-w-shell px-5 py-14 md:px-8 md:py-20">
      <div className="border-b border-line pb-10">
        <p className="eyebrow">Empty legs</p>
        <h1 className="mt-3 max-w-2xl font-display text-display2">Aviones que ya tienen que volar.</h1>
        <p className="mt-5 max-w-xl leading-relaxed text-muted">
          Cuando una aeronave vuelve vacía a su base, ese vuelo se hace igual. Comprarlo entero sale hasta un 60 % por
          debajo del charter y, donde la normativa lo permite, se vende plaza a plaza.
        </p>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-14">
        <aside className="lg:sticky lg:top-24 lg:h-fit">
          <div className="flex items-baseline justify-between">
            <p className="eyebrow">Filtros</p>
            <button onClick={clear} className="text-2xs text-faint underline-offset-4 hover:text-primary hover:underline">
              Limpiar
            </button>
          </div>

          <div className="mt-5 space-y-5">
            <label className="block">
              <span className="eyebrow mb-2 block">Origen</span>
              <select className={inputCls} value={from} onChange={(e) => setFrom(e.target.value)}>
                <option value="">Cualquiera</option>
                {airports.map((a) => (
                  <option key={a.code} value={a.code}>
                    {a.city} ({a.code})
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="eyebrow mb-2 block">Destino</span>
              <select className={inputCls} value={to} onChange={(e) => setTo(e.target.value)}>
                <option value="">Cualquiera</option>
                {airports.map((a) => (
                  <option key={a.code} value={a.code}>
                    {a.city} ({a.code})
                  </option>
                ))}
              </select>
            </label>

            <div>
              <div className="flex items-baseline justify-between">
                <span className="eyebrow">Sale en menos de</span>
                <span className="num text-xs text-champagne">{window} h</span>
              </div>
              <input
                type="range"
                min={6}
                max={240}
                step={6}
                value={window}
                onChange={(e) => setWindow(Number(e.target.value))}
                className="mt-3 w-full accent-[var(--c-champagne)]"
                aria-label="Ventana de salida en horas"
              />
            </div>

            <div>
              <div className="flex items-baseline justify-between">
                <span className="eyebrow">Precio del avión hasta</span>
                <span className="num text-xs text-champagne">{eur(maxPrice)} €</span>
              </div>
              <input
                type="range"
                min={3000}
                max={20000}
                step={500}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="mt-3 w-full accent-[var(--c-champagne)]"
                aria-label="Precio máximo del vuelo completo"
              />
            </div>

            <div>
              <span className="eyebrow mb-2 block">Tipo de compra</span>
              <div className="flex flex-wrap gap-1.5">
                {purchaseFilters.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setPurchase(p.id)}
                    className={`rounded-sm border px-2.5 py-1.5 text-2xs uppercase tracking-[0.1em] transition-colors ${
                      purchase === p.id ? "border-champagne text-champagne" : "border-line text-muted hover:border-faint"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <Card className="mt-8 p-5">
            <p className="text-sm text-primary">Crea una alerta</p>
            <p className="mt-2 text-xs leading-relaxed text-muted">
              Te avisamos en cuanto se publique un vuelo que encaje con estos filtros. Los miembros Black lo reciben 24 h
              antes.
            </p>
            <Button variant="ghost" size="sm" className="mt-4 w-full" onClick={createAlert}>
              {alertDone ? <><Check size={14} strokeWidth={1.5} /> Alerta creada</> : <><BellPlus size={14} strokeWidth={1.5} /> Avisarme</>}
            </Button>
            {alerts.length > 0 && (
              <p className="num mt-3 text-2xs text-faint">Tienes {alerts.length} alertas activas.</p>
            )}
          </Card>
        </aside>

        <div>
          <div className="flex items-baseline justify-between border-b border-line pb-4">
            <p className="num text-sm text-muted">
              {results.length} {results.length === 1 ? "vuelo" : "vuelos"} disponibles
            </p>
            <p className="text-2xs text-faint">Ordenados por salida más próxima</p>
          </div>

          {results.length === 0 ? (
            <div className="mt-10">
              <Empty
                title="No hay empty legs con esos filtros"
                body="Los vuelos vacíos aparecen y desaparecen en cuestión de horas. Crea una alerta con esta búsqueda y te avisamos en cuanto salga uno, o abre un pool en esta ruta para volar cuando tú quieras."
                action={
                  <div className="flex flex-wrap justify-center gap-3">
                    <Button onClick={createAlert}>Avisarme cuando salga</Button>
                    <Button href="/pools" variant="ghost">
                      Abrir un pool
                    </Button>
                  </div>
                }
              />
            </div>
          ) : (
            <div className="mt-6 space-y-px bg-line">
              {results.map((l) => (
                <EmptyLegCard key={l.id} leg={l} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
