"use client";

import Link from "next/link";
import { ArrowRight, Users } from "lucide-react";
import { EmptyLeg } from "@/data/emptyLegs";
import { operatorById, } from "@/data/operators";
import { aircraftById } from "@/data/aircraft";
import { airportByCode } from "@/data/airports";
import { Badge, Price } from "./ui";
import { Countdown } from "./Countdown";
import { ClientOnly } from "./ClientOnly";
import { dateFromNow, eur, formatDateTime, minutesToHm } from "@/lib/format";

export function EmptyLegCard({ leg }: { leg: EmptyLeg }) {
  const op = operatorById(leg.operatorId);
  const ac = aircraftById(leg.aircraftId);
  const a = airportByCode(leg.from);
  const b = airportByCode(leg.to);
  const saving = Math.round((1 - leg.priceWhole / leg.charterReference) * 100);

  return (
    <article className="group bg-ink p-6 transition-colors duration-200 hover:bg-surface">
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <ClientOnly fallback={<span className="skeleton inline-block h-4 w-28" />}>
              <Countdown target={dateFromNow(leg.hoursFromNow)} />
            </ClientOnly>
            {leg.seatEligible ? (
              <Badge tone="gold">Venta por asiento</Badge>
            ) : (
              <Badge tone="neutral">Solo vuelo completo</Badge>
            )}
            {leg.acceptsOffers && <Badge tone="neutral">Admite ofertas</Badge>}
          </div>

          <h3 className="mt-4 font-display text-display3">
            {a.city} <span className="text-muted">→</span> {b.city}
          </h3>

          <p className="num mt-2 text-2xs text-faint">
            {a.code} · {b.code} · {minutesToHm(leg.durationMin)} ·{" "}
            <ClientOnly fallback={<span className="skeleton inline-block h-3 w-24 align-middle" />}>
              {formatDateTime(dateFromNow(leg.hoursFromNow))}
            </ClientOnly>
          </p>

          <p className="mt-3 text-sm text-muted">
            {ac.model} · {op.name}
          </p>
          <p className="num mt-1.5 flex items-center gap-1.5 text-2xs text-faint">
            <Users size={11} strokeWidth={1.5} />
            {leg.seatsLeft} de {leg.seatsTotal} plazas libres
          </p>
        </div>

        <div className="flex flex-col items-end gap-1.5">
          {leg.priceSeat ? (
            <>
              <Price value={eur(leg.priceSeat)} unit="€/plaza" size="lg" />
              <span className="num text-2xs text-faint">Vuelo completo: {eur(leg.priceWhole)} €</span>
            </>
          ) : (
            <>
              <Price value={eur(leg.priceWhole)} unit="€/avión" size="lg" />
              <span className="num text-2xs text-faint">
                <span className="line-through opacity-60">{eur(leg.charterReference)} €</span> como charter
              </span>
            </>
          )}
          <span className="num mt-1 text-2xs text-champagne">−{saving} % frente al charter</span>
          <Link
            href={`/empty-legs/${leg.id}`}
            className="mt-3 inline-flex items-center gap-1.5 text-sm text-muted transition-colors group-hover:text-champagne"
          >
            Ver vuelo
            <ArrowRight size={14} strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </article>
  );
}
