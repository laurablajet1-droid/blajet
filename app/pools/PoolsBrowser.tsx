"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Check, Plus } from "lucide-react";
import { pools } from "@/data/pools";
import { airports, airportByCode } from "@/data/airports";
import { PoolCard } from "@/components/PoolCard";
import { Button, Card, Empty, inputCls } from "@/components/ui";
import { categories, categoryById, Category } from "@/data/aircraft";
import { distanceKm } from "@/data/airports";
import { eur } from "@/lib/format";
import { useStore } from "@/lib/store";

const kinds = [
  { id: "all", label: "Todos" },
  { id: "charter", label: "Pools sobre charter" },
  { id: "owner", label: "Plazas cedidas" },
];

export default function PoolsBrowser() {
  const params = useSearchParams();
  const { addAlert } = useStore();
  const [from, setFrom] = useState(params.get("from") ?? "");
  const [to, setTo] = useState(params.get("to") ?? "");
  const [kind, setKind] = useState("all");

  // Crear pool
  const [openForm, setOpenForm] = useState(false);
  const [nFrom, setNFrom] = useState(params.get("from") ?? "MAD");
  const [nTo, setNTo] = useState(params.get("to") ?? "PMI");
  const [nCat, setNCat] = useState<Category>("light");
  const [nSeats, setNSeats] = useState(6);
  const [created, setCreated] = useState(false);

  const results = useMemo(
    () =>
      pools
        .filter((p) => (from ? p.from === from : true))
        .filter((p) => (to ? p.to === to : true))
        .filter((p) => (kind === "all" ? true : p.kind === kind))
        .sort((a, b) => a.hoursFromNow - b.hoursFromNow),
    [from, to, kind]
  );

  const estimate = useMemo(() => {
    const spec = categoryById(nCat);
    const total = Math.max(spec.minPrice, Math.round((distanceKm(nFrom, nTo) * spec.eurPerKm) / 100) * 100);
    return { total, perSeat: Math.round(total / nSeats / 10) * 10 };
  }, [nFrom, nTo, nCat, nSeats]);

  const createPool = () => {
    addAlert({
      route: `${airportByCode(nFrom).city} → ${airportByCode(nTo).city}`,
      window: "Pool propuesto",
      maxPrice: estimate.perSeat,
    });
    setCreated(true);
  };

  return (
    <div className="mx-auto max-w-shell px-5 py-14 md:px-8 md:py-20">
      <div className="border-b border-line pb-10">
        <p className="eyebrow">Pooling</p>
        <h1 className="mt-3 max-w-2xl font-display text-display2">Comparte jet, comparte gastos.</h1>
        <p className="mt-5 max-w-xl leading-relaxed text-muted">
          Abre un vuelo y deja que otros se sumen: cada persona que entra baja el precio de todos. O súmate a las plazas
          libres de quien ya tiene el avión contratado.
        </p>
        <p className="mt-4 max-w-xl text-xs leading-relaxed text-faint">
          El pooling se ofrece bajo la modalidad de compartición de gastos conforme a la normativa aplicable en cada
          jurisdicción. Quien abre el pool no obtiene beneficio: reparte el coste.
        </p>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-14">
        <aside className="lg:sticky lg:top-24 lg:h-fit">
          <p className="eyebrow">Filtros</p>
          <div className="mt-5 space-y-5">
            <label className="block">
              <span className="eyebrow mb-2 block">Origen</span>
              <select className={inputCls} value={from} onChange={(e) => setFrom(e.target.value)}>
                <option value="">Cualquiera</option>
                {airports.map((a) => (
                  <option key={a.code} value={a.code}>{a.city} ({a.code})</option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="eyebrow mb-2 block">Destino</span>
              <select className={inputCls} value={to} onChange={(e) => setTo(e.target.value)}>
                <option value="">Cualquiera</option>
                {airports.map((a) => (
                  <option key={a.code} value={a.code}>{a.city} ({a.code})</option>
                ))}
              </select>
            </label>
            <div>
              <span className="eyebrow mb-2 block">Tipo de pool</span>
              <div className="flex flex-wrap gap-1.5">
                {kinds.map((k) => (
                  <button
                    key={k.id}
                    onClick={() => setKind(k.id)}
                    className={`rounded-sm border px-2.5 py-1.5 text-2xs uppercase tracking-[0.1em] transition-colors ${
                      kind === k.id ? "border-champagne text-champagne" : "border-line text-muted hover:border-faint"
                    }`}
                  >
                    {k.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <Card className="mt-8 p-5">
            <p className="text-sm text-primary">¿No encuentras tu ruta?</p>
            <p className="mt-2 text-xs leading-relaxed text-muted">
              Propón el vuelo tú y publicamos la ruta para que otros se sumen. Solo se cobra si se alcanza el mínimo de
              plazas.
            </p>
            <Button variant="ghost" size="sm" className="mt-4 w-full" onClick={() => setOpenForm((o) => !o)}>
              <Plus size={14} strokeWidth={1.5} />
              Crear un pool
            </Button>
          </Card>
        </aside>

        <div>
          {openForm && (
            <Card className="mb-8 p-6">
              {created ? (
                <div className="py-4 text-center">
                  <span className="mx-auto grid h-10 w-10 place-items-center rounded-full border border-champagne/50 text-champagne">
                    <Check size={16} strokeWidth={1.5} />
                  </span>
                  <p className="mt-4 font-display text-display3">Pool publicado</p>
                  <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted">
                    {airportByCode(nFrom).city} → {airportByCode(nTo).city}, {categoryById(nCat).name}, mínimo {Math.max(3, nSeats - 2)} plazas.
                    Avisaremos a los miembros que buscan esta ruta y te escribiremos en cuanto alguien entre.
                  </p>
                  <Button variant="ghost" size="sm" className="mt-5" onClick={() => { setCreated(false); setOpenForm(false); }}>
                    Volver al listado
                  </Button>
                </div>
              ) : (
                <>
                  <p className="eyebrow">Nuevo pool</p>
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className="eyebrow mb-2 block">Origen</span>
                      <select className={inputCls} value={nFrom} onChange={(e) => setNFrom(e.target.value)}>
                        {airports.map((a) => <option key={a.code} value={a.code}>{a.city}</option>)}
                      </select>
                    </label>
                    <label className="block">
                      <span className="eyebrow mb-2 block">Destino</span>
                      <select className={inputCls} value={nTo} onChange={(e) => setNTo(e.target.value)}>
                        {airports.map((a) => <option key={a.code} value={a.code}>{a.city}</option>)}
                      </select>
                    </label>
                  </div>
                  <div className="mt-4">
                    <span className="eyebrow mb-2 block">Categoría</span>
                    <div className="flex flex-wrap gap-1.5">
                      {categories.map((c) => (
                        <button
                          key={c.id}
                          onClick={() => setNCat(c.id)}
                          className={`rounded-sm border px-2.5 py-1.5 text-2xs uppercase tracking-[0.1em] transition-colors ${
                            nCat === c.id ? "border-champagne text-champagne" : "border-line text-muted hover:border-faint"
                          }`}
                        >
                          {c.name}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="mt-5">
                    <div className="flex items-baseline justify-between">
                      <span className="eyebrow">Plazas que quieres llenar</span>
                      <span className="num text-xs text-champagne">{nSeats}</span>
                    </div>
                    <input
                      type="range" min={2} max={12} value={nSeats}
                      onChange={(e) => setNSeats(Number(e.target.value))}
                      className="mt-3 w-full accent-[var(--c-champagne)]"
                      aria-label="Plazas del pool"
                    />
                  </div>
                  <div className="rule mt-6 flex flex-wrap items-baseline justify-between gap-3 pt-5">
                    <span className="text-sm text-muted">Coste estimado del avión</span>
                    <span className="num text-sm">{eur(estimate.total)} €</span>
                  </div>
                  <div className="mt-2 flex flex-wrap items-baseline justify-between gap-3">
                    <span className="text-sm text-muted">Por plaza si entráis {nSeats}</span>
                    <span className="num text-2xl text-champagne">{eur(estimate.perSeat)} <span className="text-xs text-muted">€</span></span>
                  </div>
                  <Button size="lg" className="mt-5 w-full" onClick={createPool} disabled={nFrom === nTo}>
                    Publicar el pool
                  </Button>
                  <p className="mt-3 text-center text-2xs text-faint">
                    No se cobra nada hasta que el pool alcanza su mínimo de plazas.
                  </p>
                </>
              )}
            </Card>
          )}

          <div className="flex items-baseline justify-between border-b border-line pb-4">
            <p className="num text-sm text-muted">
              {results.length} {results.length === 1 ? "pool abierto" : "pools abiertos"}
            </p>
            <p className="text-2xs text-faint">Ordenados por salida más próxima</p>
          </div>

          {results.length === 0 ? (
            <div className="mt-10">
              <Empty
                title="Aún no hay pools en esta ruta"
                body="Sé el primero en abrirlo: fija la fecha y el mínimo de plazas, y avisaremos a los miembros que buscan ese trayecto. Si no se llena, no pagas nada."
                action={<Button onClick={() => setOpenForm(true)}>Crear el primer pool</Button>}
              />
            </div>
          ) : (
            <div className="mt-6 space-y-px bg-line">
              {results.map((p) => (
                <PoolCard key={p.id} pool={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
