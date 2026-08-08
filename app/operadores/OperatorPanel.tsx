"use client";

import { useState } from "react";
import { Check, Plane, Plus, TrendingUp } from "lucide-react";
import { Badge, Button, Card, inputCls } from "@/components/ui";
import { airports, airportByCode } from "@/data/airports";
import { emptyLegs } from "@/data/emptyLegs";
import { operators } from "@/data/operators";
import { ClientOnly } from "@/components/ClientOnly";
import { dateFromNow, eur, formatDateTime } from "@/lib/format";

const requests = [
  { route: "Madrid → Ginebra", pax: 6, cat: "Midsize", when: "12 sep, 09:00", ago: "hace 4 min", value: 18400 },
  { route: "Ibiza → Niza", pax: 4, cat: "Light", when: "18 sep, 17:30", ago: "hace 22 min", value: 9600 },
  { route: "Cancún → Miami", pax: 9, cat: "Super midsize", when: "2 oct, 11:00", ago: "hace 1 h", value: 27500 },
];

export default function OperatorPanel() {
  const op = operators[0];
  const mine = emptyLegs.filter((l) => l.operatorId === op.id);
  const [published, setPublished] = useState(false);
  const [form, setForm] = useState({ from: "MEX", to: "MIA", price: "13500", seats: "9" });

  return (
    <div className="mx-auto max-w-shell px-5 py-14 md:px-8 md:py-20">
      <div className="border-b border-line pb-10">
        <p className="eyebrow">Para operadores</p>
        <h1 className="mt-3 max-w-2xl font-display text-display1">Tus aviones vacíos, con pasaje.</h1>
        <p className="mt-6 max-w-xl leading-relaxed text-muted">
          Publica los trayectos de reposicionamiento, recibe solicitudes de cotización de toda la red y decide en un
          clic. Sin exclusividad y sin coste de alta: solo comisión sobre lo que vendes.
        </p>
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-3">
        <Badge tone="gold">Vista de demostración</Badge>
        <span className="num text-2xs text-faint">
          Sesión de {op.name} · {op.aoc} · {op.ownFleet} aeronaves propias y {op.partnerFleet} aliadas
        </span>
      </div>

      <div className="mt-10 grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-3">
        {[
          { label: "Empty legs publicados", value: mine.length, icon: Plane },
          { label: "Solicitudes sin responder", value: requests.length, icon: TrendingUp },
          { label: "Plazas vendidas este mes", value: 47, icon: Check },
        ].map((k) => (
          <div key={k.label} className="bg-surface px-6 py-6">
            <k.icon size={15} strokeWidth={1.5} className="text-muted" />
            <p className="num mt-4 text-[2rem] leading-none text-champagne">{k.value}</p>
            <p className="mt-2 text-xs text-muted">{k.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-16">
        <div>
          <p className="eyebrow">Solicitudes de cotización entrantes</p>
          <div className="mt-5 space-y-px bg-line">
            {requests.map((r) => (
              <div key={r.route} className="flex flex-wrap items-center justify-between gap-5 bg-ink px-5 py-4">
                <div>
                  <p className="text-sm text-primary">{r.route}</p>
                  <p className="num mt-1 text-2xs text-faint">
                    {r.pax} pasajeros · {r.cat} · {r.when} · {r.ago}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="num text-sm text-muted">~{eur(r.value)} €</span>
                  <Button size="sm" variant="ghost">
                    Enviar oferta
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <p className="eyebrow mt-14">Mis empty legs publicados</p>
          <div className="mt-5 space-y-px bg-line">
            {mine.map((l) => (
              <div key={l.id} className="flex flex-wrap items-center justify-between gap-5 bg-ink px-5 py-4">
                <div>
                  <p className="text-sm text-primary">
                    {airportByCode(l.from).city} → {airportByCode(l.to).city}
                  </p>
                  <p className="num mt-1 text-2xs text-faint">
                    <ClientOnly fallback={<span className="skeleton inline-block h-3 w-24 align-middle" />}>
                      {formatDateTime(dateFromNow(l.hoursFromNow))}
                    </ClientOnly>{" "}
                    · {l.seatsLeft}/{l.seatsTotal} plazas libres
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  {l.seatEligible ? <Badge tone="gold">Por asiento</Badge> : <Badge tone="neutral">Completo</Badge>}
                  <span className="num text-sm">{eur(l.priceWhole)} €</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="lg:sticky lg:top-24 lg:h-fit">
          <Card className="p-6">
            {published ? (
              <div className="py-6 text-center">
                <span className="mx-auto grid h-10 w-10 place-items-center rounded-full border border-champagne/50 text-champagne">
                  <Check size={16} strokeWidth={1.5} />
                </span>
                <p className="mt-4 font-display text-display3">Vuelo publicado</p>
                <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-muted">
                  Ya es visible para los miembros. Los Black lo verán durante 24 h antes que el resto.
                </p>
                <Button size="sm" variant="ghost" className="mt-5" onClick={() => setPublished(false)}>
                  Publicar otro
                </Button>
              </div>
            ) : (
              <>
                <p className="eyebrow">Publicar un empty leg</p>
                <div className="mt-5 space-y-4">
                  <label className="block">
                    <span className="eyebrow mb-2 block">Origen</span>
                    <select className={inputCls} value={form.from} onChange={(e) => setForm({ ...form, from: e.target.value })}>
                      {airports.map((a) => <option key={a.code} value={a.code}>{a.city}</option>)}
                    </select>
                  </label>
                  <label className="block">
                    <span className="eyebrow mb-2 block">Destino</span>
                    <select className={inputCls} value={form.to} onChange={(e) => setForm({ ...form, to: e.target.value })}>
                      {airports.map((a) => <option key={a.code} value={a.code}>{a.city}</option>)}
                    </select>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="block">
                      <span className="eyebrow mb-2 block">Precio del avión</span>
                      <input className={`${inputCls} num`} value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
                    </label>
                    <label className="block">
                      <span className="eyebrow mb-2 block">Plazas</span>
                      <input className={`${inputCls} num`} value={form.seats} onChange={(e) => setForm({ ...form, seats: e.target.value })} />
                    </label>
                  </div>
                </div>
                <Button size="lg" className="mt-6 w-full" onClick={() => setPublished(true)} disabled={form.from === form.to}>
                  <Plus size={15} strokeWidth={1.5} />
                  Publicar vuelo
                </Button>
                <p className="mt-3 text-center text-2xs text-faint">
                  Puedes retirarlo en cualquier momento mientras no haya venta.
                </p>
              </>
            )}
          </Card>
        </aside>
      </div>
    </div>
  );
}
