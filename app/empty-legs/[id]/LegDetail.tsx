"use client";

import { useState } from "react";
import Link from "next/link";
import { AlertTriangle, ArrowLeft, Check, Info, Star, Users } from "lucide-react";
import { emptyLegById } from "@/data/emptyLegs";
import { operatorById } from "@/data/operators";
import { aircraftById, categoryById } from "@/data/aircraft";
import { airportByCode } from "@/data/airports";
import { Badge, Button, Card, Empty, Price } from "@/components/ui";
import { Countdown } from "@/components/Countdown";
import { ClientOnly } from "@/components/ClientOnly";
import { RouteArc } from "@/components/RouteArc";
import { Silhouette } from "@/components/Silhouette";
import { SavingsBar } from "@/components/SavingsBar";
import { Checkout } from "@/components/Checkout";
import { ShareButton } from "@/components/ShareButton";
import { useStore } from "@/lib/store";
import { dateFromNow, eur, formatDate, formatDateTime, minutesToHm } from "@/lib/format";

export default function LegDetail({ id }: { id: string }) {
  const leg = emptyLegById(id);
  const { placeOffer, offers } = useStore();
  const [mode, setMode] = useState<"seat" | "whole">("seat");
  const [seats, setSeats] = useState(1);
  const [offerAmount, setOfferAmount] = useState<number | "">("");
  const [offerState, setOfferState] = useState<"idle" | "pending" | "accepted" | "rejected">("idle");
  const [checkout, setCheckout] = useState(false);

  if (!leg) {
    return (
      <div className="mx-auto max-w-shell px-5 py-24 md:px-8">
        <Empty
          title="Este vuelo ya no está disponible"
          body="Los empty legs se retiran en cuanto el operador los vende o cambia su itinerario. Mira los que hay ahora mismo."
          action={<Button href="/empty-legs">Ver empty legs disponibles</Button>}
        />
      </div>
    );
  }

  const op = operatorById(leg.operatorId);
  const ac = aircraftById(leg.aircraftId);
  const cat = categoryById(leg.category);
  const a = airportByCode(leg.from);
  const b = airportByCode(leg.to);
  const departure = dateFromNow(leg.hoursFromNow);
  const effectiveMode = leg.seatEligible ? mode : "whole";
  const total = effectiveMode === "seat" ? (leg.priceSeat ?? 0) * seats : leg.priceWhole;
  const saved = leg.charterReference - leg.priceWhole;

  const sendOffer = async () => {
    if (typeof offerAmount !== "number" || offerAmount <= 0) return;
    setOfferState("pending");
    const result = await placeOffer(leg.id, offerAmount, leg.offerFloor);
    setOfferState(result);
  };

  return (
    <div className="mx-auto max-w-shell px-5 py-12 md:px-8 md:py-16">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link href="/empty-legs" className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-primary">
          <ArrowLeft size={15} strokeWidth={1.5} />
          Todos los empty legs
        </Link>
        <ShareButton
          title={`${airportByCode(leg.from).city} → ${airportByCode(leg.to).city} · BlaJet`}
          text={`Empty leg ${airportByCode(leg.from).city} → ${airportByCode(leg.to).city} desde ${eur(leg.priceSeat ?? leg.priceWhole)} €`}
          label={{ es: "Compartir vuelo", en: "Share flight" }}
        />
      </div>

      <div className="mt-8 grid gap-14 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-16">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <ClientOnly fallback={<span className="skeleton inline-block h-5 w-28" />}>
              <Countdown target={departure} />
            </ClientOnly>
            {leg.seatEligible ? <Badge tone="gold">Venta por asiento</Badge> : <Badge tone="neutral">Solo vuelo completo</Badge>}
            {leg.acceptsOffers && <Badge tone="neutral">Admite ofertas</Badge>}
          </div>

          <h1 className="mt-5 font-display text-display1">
            {a.city}
            <br />
            <span className="text-muted">→</span> {b.city}
          </h1>

          <p className="num mt-5 text-sm text-muted">
            <ClientOnly fallback={<span className="skeleton inline-block h-4 w-52 align-middle" />}>
              {formatDate(departure)} · {formatDateTime(departure).split(", ").pop()}
            </ClientOnly>{" "}
            · {minutesToHm(leg.durationMin)} de vuelo
          </p>

          <div className="mt-10 border border-line bg-surface p-8">
            <Silhouette variant={leg.category === "turboprop" ? "turboprop" : leg.category === "heavy" ? "heavy" : "jet"} accent className="w-full max-w-xl" />
          </div>

          <RouteArc from={leg.from} to={leg.to} durationMin={leg.durationMin} className="mt-8 max-w-xl" />

          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            <div>
              <p className="eyebrow">La aeronave</p>
              <p className="mt-3 font-display text-display3">{ac.model}</p>
              <p className="num mt-2 text-2xs text-faint">
                {ac.registration} · {ac.year} · {cat.name}
              </p>
              <p className="num mt-1 text-2xs text-faint">{ac.cabin}</p>
              <ul className="mt-4 space-y-1.5">
                {ac.amenities.map((am) => (
                  <li key={am} className="flex items-center gap-2 text-sm text-muted">
                    <Check size={13} strokeWidth={1.5} className="text-champagne" /> {am}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="eyebrow">El operador</p>
              <div className="mt-3 flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-sm border border-line text-2xs tracking-[0.14em] text-champagne">
                  {op.monogram}
                </span>
                <div>
                  <p className="text-sm text-primary">{op.name}</p>
                  <p className="num flex items-center gap-1 text-2xs text-faint">
                    <Star size={11} strokeWidth={1.5} className="text-champagne" /> {op.rating} · {op.aoc}
                  </p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted">{op.cancellationPolicy}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{op.emptyLegPolicy}</p>
            </div>
          </div>

          <div className="mt-10 flex items-start gap-3 border border-line bg-surface p-5">
            <Info size={15} strokeWidth={1.5} className="mt-0.5 shrink-0 text-champagne" />
            <p className="text-sm leading-relaxed text-muted">
              {leg.seatEligible
                ? "La venta por asiento se ofrece únicamente donde el marco regulatorio lo permite. En esta ruta está autorizada, y el operador exige identificar a cada pasajero antes de emitir el billete."
                : "Este vuelo se comercializa solo como avión completo: la licencia del operador no ampara la venta de asientos sueltos en esta jurisdicción."}
            </p>
          </div>

          <p className="mt-6 text-sm leading-relaxed text-muted">{leg.note}</p>

          <div className="mt-12 max-w-md">
            <p className="eyebrow">Lo que te ahorras</p>
            <div className="mt-5">
              <SavingsBar
                rows={[
                  { label: "Mismo trayecto como charter", value: leg.charterReference },
                  { label: "Este empty leg, avión completo", value: leg.priceWhole, accent: true },
                  ...(leg.priceSeat ? [{ label: "Una plaza suelta", value: leg.priceSeat, unit: "€/plaza" }] : []),
                ]}
                caption={`Diferencia de ${eur(saved)} € frente a contratar este mismo avión a medida.`}
              />
            </div>
          </div>
        </div>

        {/* Panel de reserva */}
        <aside className="lg:sticky lg:top-24 lg:h-fit">
          <Card className="p-6">
            {leg.seatEligible && (
              <div className="mb-5 flex gap-1 rounded-sm border border-line p-1">
                {[
                  { id: "seat", label: "Por plaza" },
                  { id: "whole", label: "Avión entero" },
                ].map((o) => (
                  <button
                    key={o.id}
                    onClick={() => setMode(o.id as any)}
                    className={`flex-1 rounded-sm px-3 py-2 text-sm transition-colors ${
                      effectiveMode === o.id ? "bg-raised text-champagne" : "text-muted hover:text-primary"
                    }`}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            )}

            {effectiveMode === "seat" ? (
              <>
                <Price value={eur(leg.priceSeat ?? 0)} unit="€/plaza" size="lg" />
                <div className="mt-5 flex items-center justify-between rounded border border-line bg-raised px-3 py-2.5">
                  <span className="flex items-center gap-2 text-sm text-muted">
                    <Users size={14} strokeWidth={1.5} /> Plazas
                  </span>
                  <span className="flex items-center gap-4">
                    <button onClick={() => setSeats((s) => Math.max(1, s - 1))} className="text-muted hover:text-champagne" aria-label="Quitar plaza">−</button>
                    <span className="num text-sm">{seats}</span>
                    <button onClick={() => setSeats((s) => Math.min(leg.seatsLeft, s + 1))} className="text-muted hover:text-champagne" aria-label="Añadir plaza">+</button>
                  </span>
                </div>
                <p className="num mt-2 text-2xs text-faint">Quedan {leg.seatsLeft} plazas de {leg.seatsTotal}.</p>
              </>
            ) : (
              <>
                <Price value={eur(leg.priceWhole)} unit="€/avión" size="lg" />
                <p className="num mt-2 text-2xs text-faint">
                  <span className="line-through opacity-60">{eur(leg.charterReference)} €</span> como charter a medida
                </p>
              </>
            )}

            <div className="rule mt-5 flex items-baseline justify-between pt-5">
              <span className="text-sm text-muted">Total</span>
              <Price value={eur(total)} size="md" />
            </div>

            <Button size="lg" className="mt-5 w-full" onClick={() => setCheckout(true)}>
              Reservar ahora
            </Button>

            {leg.acceptsOffers && effectiveMode === "whole" && (
              <div className="mt-6 border-t border-line pt-5">
                <p className="eyebrow">O haz tu oferta</p>
                <p className="mt-2 text-xs leading-relaxed text-muted">
                  Propón un precio por el avión entero. {op.name} responde en el momento.
                </p>

                {offerState === "accepted" ? (
                  <div className="mt-4 rounded border border-good/40 p-4">
                    <p className="flex items-center gap-2 text-sm text-good">
                      <Check size={14} strokeWidth={1.5} /> Oferta aceptada
                    </p>
                    <p className="num mt-2 text-2xl">{eur(offers[leg.id]?.amount ?? 0)} €</p>
                    <Button size="sm" className="mt-4 w-full" onClick={() => setCheckout(true)}>
                      Pagar y confirmar
                    </Button>
                  </div>
                ) : offerState === "rejected" ? (
                  <div className="mt-4 rounded border border-warn/40 p-4">
                    <p className="flex items-center gap-2 text-sm text-warn">
                      <AlertTriangle size={14} strokeWidth={1.5} /> El operador no acepta ese precio
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-muted">
                      Por debajo de {eur(leg.offerFloor)} € no le sale a cuenta operar este vuelo. Puedes subir tu oferta o
                      reservarlo al precio publicado.
                    </p>
                    <div className="mt-4 flex gap-2">
                      <Button size="sm" variant="ghost" onClick={() => { setOfferAmount(leg.offerFloor); setOfferState("idle"); }}>
                        Ofrecer {eur(leg.offerFloor)} €
                      </Button>
                      <Button size="sm" onClick={() => setCheckout(true)}>
                        Reservar
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="mt-4">
                    <div className="flex gap-2">
                      <input
                        type="number"
                        inputMode="numeric"
                        placeholder={String(leg.offerFloor)}
                        value={offerAmount}
                        onChange={(e) => setOfferAmount(e.target.value === "" ? "" : Number(e.target.value))}
                        className="num h-11 w-full rounded border border-line bg-raised px-3 text-sm outline-none transition-colors focus:border-champagne"
                        aria-label="Importe de tu oferta en euros"
                      />
                      <Button variant="ghost" onClick={sendOffer} disabled={offerState === "pending" || offerAmount === ""}>
                        {offerState === "pending" ? "Enviando…" : "Ofertar"}
                      </Button>
                    </div>
                    {offerState === "pending" && (
                      <p className="mt-3 flex items-center gap-2 text-2xs text-faint">
                        <span className="skeleton inline-block h-2 w-2 rounded-full" />
                        {op.name} está revisando tu oferta…
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}

            <p className="mt-5 text-2xs leading-relaxed text-faint">
              Operado por {op.name} bajo {op.aoc}. {op.seatSalePolicy}
            </p>
          </Card>
        </aside>
      </div>

      <Checkout
        open={checkout}
        onClose={() => setCheckout(false)}
        title="Confirmar empty leg"
        lines={[
          {
            label: effectiveMode === "seat" ? `${seats} ${seats === 1 ? "plaza" : "plazas"} · ${ac.model}` : `Avión completo · ${ac.model}`,
            value: offerState === "accepted" ? (offers[leg.id]?.amount ?? total) : total,
          },
          { label: "Tasas y handling", value: "Incluidas" },
        ]}
        total={offerState === "accepted" ? offers[leg.id]?.amount ?? total : total}
        booking={{
          type: "Empty leg",
          route: `${a.city} → ${b.city}`,
          date: formatDate(departure),
          aircraft: `${ac.model} · ${ac.registration}`,
          total,
          status: "Confirmado",
        }}
      />
    </div>
  );
}
