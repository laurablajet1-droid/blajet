"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Pool, seatsTaken, pricePerSeat } from "@/data/pools";
import { airportByCode } from "@/data/airports";
import { aircraftById } from "@/data/aircraft";
import { Badge, Price } from "./ui";
import { ClientOnly } from "./ClientOnly";
import { dateFromNow, eur, formatDateTime, minutesToHm } from "@/lib/format";
import { useStore } from "@/lib/store";

export function PoolCard({ pool }: { pool: Pool }) {
  const { joinedPools } = useStore();
  const mine = joinedPools[pool.id] ?? 0;
  const taken = seatsTaken(pool) + mine;
  const price = pricePerSeat(pool, Math.max(taken, pool.kind === "charter" ? pool.seatsMin : 1));
  const a = airportByCode(pool.from);
  const b = airportByCode(pool.to);
  const ac = aircraftById(pool.aircraftId);
  const progress = Math.min(100, (taken / pool.seatsTotal) * 100);
  const confirmed = taken >= pool.seatsMin;

  return (
    <article className="group bg-ink p-6 transition-colors duration-200 hover:bg-surface">
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone={pool.kind === "owner" ? "gold" : "neutral"}>
              {pool.kind === "owner" ? "Plazas de un vuelo ya contratado" : "Pool sobre un charter"}
            </Badge>
            {confirmed ? <Badge tone="good">Vuelo confirmado</Badge> : <Badge tone="neutral">Faltan {pool.seatsMin - taken} para confirmar</Badge>}
            {mine > 0 && <Badge tone="gold">Estás dentro</Badge>}
          </div>

          <h3 className="mt-4 font-display text-display3">
            {a.city} <span className="text-muted">→</span> {b.city}
          </h3>

          <p className="num mt-2 text-2xs text-faint">
            <ClientOnly fallback={<span className="skeleton inline-block h-3 w-28 align-middle" />}>
              {formatDateTime(dateFromNow(pool.hoursFromNow))}
            </ClientOnly>{" "}
            · {minutesToHm(pool.durationMin)} · {ac.model}
          </p>

          <p className="mt-4 flex items-center gap-1.5 text-sm text-muted">
            <ShieldCheck size={13} strokeWidth={1.5} className="text-champagne" />
            {pool.host.name} · {pool.host.flights} vuelos · {pool.host.rating} ★
          </p>

          <div className="mt-4 max-w-xs">
            <div className="flex items-baseline justify-between">
              <span className="num text-2xs text-muted">
                {taken}/{pool.seatsTotal} plazas
              </span>
              <span className="num text-2xs text-faint">
                {pool.kind === "charter" ? `confirma en ${pool.seatsMin}` : "sale seguro"}
              </span>
            </div>
            <div className="mt-1.5 h-[3px] w-full overflow-hidden rounded-sm bg-line">
              <div
                className="h-full rounded-sm bg-champagne transition-[width] duration-700 ease-calm"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-1.5">
          <Price value={eur(price)} unit="€/plaza" size="lg" />
          <span className="num text-2xs text-faint">Avión completo: {eur(pool.totalPrice)} €</span>
          <Link
            href={`/pools/${pool.id}`}
            className="mt-3 inline-flex items-center gap-1.5 text-sm text-muted transition-colors group-hover:text-champagne"
          >
            Ver pool
            <ArrowRight size={14} strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </article>
  );
}
