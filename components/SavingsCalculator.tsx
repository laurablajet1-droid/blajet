"use client";

import { useMemo, useState } from "react";
import { categories, categoryById, Category } from "@/data/aircraft";
import { distanceKm, airports } from "@/data/airports";
import { SavingsBar } from "./SavingsBar";
import { AirportPicker } from "./AirportPicker";
import { Counter } from "./Counter";
import { Leaf } from "lucide-react";

export function SavingsCalculator() {
  const [from, setFrom] = useState("MAD");
  const [to, setTo] = useState("IBZ");
  const [cat, setCat] = useState<Category>("light");
  const [seats, setSeats] = useState(6);

  const model = useMemo(() => {
    const km = distanceKm(from, to);
    const spec = categoryById(cat);
    const charter = Math.max(spec.minPrice, Math.round((km * spec.eurPerKm) / 100) * 100);
    const empty = Math.round((charter * 0.54) / 100) * 100;
    const pool = Math.round(charter / Math.max(seats, 1) / 10) * 10;
    const co2Total = Math.round(km * spec.co2PerKm);
    return { km, charter, empty, pool, co2Total, co2Share: Math.round(co2Total / Math.max(seats, 1)) };
  }, [from, to, cat, seats]);

  const sameAirport = from === to;

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <AirportPicker label="Origen" value={from} onChange={setFrom} placeholder="Ciudad" exclude={to} />
          <AirportPicker label="Destino" value={to} onChange={setTo} placeholder="Ciudad" exclude={from} />
        </div>

        <div>
          <span className="eyebrow mb-2 block">Categoría</span>
          <div className="flex flex-wrap gap-1.5">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setCat(c.id)}
                className={`rounded-sm border px-2.5 py-1.5 text-2xs uppercase tracking-[0.1em] transition-colors duration-200 ${
                  cat === c.id ? "border-champagne text-champagne" : "border-line text-muted hover:border-faint"
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-baseline justify-between">
            <span className="eyebrow">Personas que comparten</span>
            <span className="num text-sm text-champagne">{seats}</span>
          </div>
          <input
            type="range"
            min={2}
            max={12}
            value={seats}
            onChange={(e) => setSeats(Number(e.target.value))}
            className="mt-3 w-full accent-[var(--c-champagne)]"
            aria-label="Personas que comparten el vuelo"
          />
        </div>
      </div>

      <div>
        {sameAirport ? (
          <p className="text-sm text-muted">Elige dos aeropuertos distintos para ver la comparación.</p>
        ) : (
          <>
            <div className="mb-6 flex items-end justify-between gap-4 border-b border-line pb-5">
              <div>
                <p className="eyebrow">Ahorro frente al charter</p>
                <p className="mt-2 font-display text-[2.75rem] leading-none text-champagne">
                  <Counter to={Math.round((1 - model.pool / model.charter) * 100)} startOnView={false} />
                  <span className="ml-1 text-lg text-muted">%</span>
                </p>
              </div>
              <p className="num text-right text-2xs text-faint">
                {model.km} km<br />
                {categoryById(cat).name}
              </p>
            </div>

            <SavingsBar
              rows={[
                { label: "Charter a medida · avión completo", value: model.charter },
                { label: "Empty leg · avión completo", value: model.empty },
                { label: `Pooling · por plaza entre ${seats}`, value: model.pool, accent: true, unit: "€/plaza" },
              ]}
              caption="Estimación orientativa a partir de la distancia real y del coste por kilómetro de cada categoría. El precio en firme lo pone siempre el operador."
            />

            <div className="mt-6 flex items-start gap-3 border-t border-line pt-5">
              <Leaf size={15} strokeWidth={1.5} className="mt-0.5 shrink-0 text-muted" />
              <p className="text-xs leading-relaxed text-muted">
                Huella estimada del vuelo: <span className="num text-primary">{model.co2Total} kg</span> de CO₂, es decir{" "}
                <span className="num text-primary">{model.co2Share} kg</span> por pasajero si van {seats}. Puedes
                compensarla al reservar.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
