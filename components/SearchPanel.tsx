"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight, ArrowLeftRight } from "lucide-react";
import { AirportPicker } from "./AirportPicker";
import { Button, inputCls } from "./ui";

const modes = [
  { id: "charter", label: "Charter a medida", hint: "Tu avión, tu horario" },
  { id: "empty", label: "Empty leg", hint: "Aviones que ya vuelan" },
  { id: "pool", label: "Pooling", hint: "Comparte el coste" },
] as const;

type Mode = (typeof modes)[number]["id"];

export function SearchPanel({ compact = false }: { compact?: boolean }) {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("charter");
  const [from, setFrom] = useState("MAD");
  const [to, setTo] = useState("IBZ");
  const [date, setDate] = useState("");
  const [pax, setPax] = useState(4);

  const swap = () => {
    setFrom(to);
    setTo(from);
  };

  const go = () => {
    const q = new URLSearchParams({ from, to });
    if (date) q.set("date", date);
    if (mode === "charter") {
      q.set("pax", String(pax));
      router.push(`/cotizar?${q.toString()}`);
    } else if (mode === "empty") {
      router.push(`/empty-legs?${q.toString()}`);
    } else {
      router.push(`/pools?${q.toString()}`);
    }
  };

  return (
    <div className={`border border-line bg-surface/80 backdrop-blur-sm rounded-md ${compact ? "p-5" : "p-6 md:p-7"}`}>
      <div className="flex gap-1 border-b border-line pb-4">
        {modes.map((m) => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            className={`flex-1 rounded-sm px-2 py-2 text-left transition-colors duration-200 ${
              mode === m.id ? "bg-raised" : "hover:bg-raised/50"
            }`}
          >
            <span className={`block text-[0.8125rem] ${mode === m.id ? "text-champagne" : "text-muted"}`}>{m.label}</span>
            <span className="mt-0.5 hidden text-2xs text-faint sm:block">{m.hint}</span>
          </button>
        ))}
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <AirportPicker label="Origen" value={from} onChange={setFrom} placeholder="Ciudad o código" exclude={to} />
        <div className="relative">
          <AirportPicker label="Destino" value={to} onChange={setTo} placeholder="Ciudad o código" exclude={from} />
          <button
            onClick={swap}
            aria-label="Invertir origen y destino"
            className="absolute -left-3 top-[34px] hidden h-7 w-7 place-items-center rounded-full border border-line bg-raised text-muted transition-colors hover:text-champagne sm:grid"
          >
            <ArrowLeftRight size={12} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="eyebrow mb-2 block">{mode === "charter" ? "Fecha de salida" : "Desde la fecha"}</span>
          <input type="date" className={inputCls} value={date} onChange={(e) => setDate(e.target.value)} />
        </label>
        <label className="block">
          <span className="eyebrow mb-2 block">Pasajeros</span>
          <div className="flex h-11 items-center justify-between rounded border border-line bg-raised px-3">
            <button
              onClick={() => setPax((p) => Math.max(1, p - 1))}
              aria-label="Quitar un pasajero"
              className="h-7 w-7 rounded-sm text-muted transition-colors hover:text-champagne"
            >
              −
            </button>
            <span className="num text-sm">{pax}</span>
            <button
              onClick={() => setPax((p) => Math.min(16, p + 1))}
              aria-label="Añadir un pasajero"
              className="h-7 w-7 rounded-sm text-muted transition-colors hover:text-champagne"
            >
              +
            </button>
          </div>
        </label>
      </div>

      <Button size="lg" className="mt-5 w-full" onClick={go}>
        {mode === "charter" ? "Pedir cotización" : mode === "empty" ? "Ver empty legs" : "Ver pools abiertos"}
        <ArrowRight size={16} strokeWidth={1.5} />
      </Button>
      <p className="mt-3 text-center text-2xs text-faint">
        {mode === "charter"
          ? "Sin compromiso. Las primeras ofertas llegan en unos minutos."
          : mode === "empty"
          ? "Precios ya publicados por los operadores. Plazas limitadas."
          : "Solo pagas si el pool alcanza su mínimo de plazas."}
      </p>
    </div>
  );
}
