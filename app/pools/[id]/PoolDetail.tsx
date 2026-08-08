"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, MessageCircle, Send, ShieldCheck, Star, Users } from "lucide-react";
import { poolById, seatsTaken } from "@/data/pools";
import { airportByCode } from "@/data/airports";
import { aircraftById } from "@/data/aircraft";
import { operatorById } from "@/data/operators";
import { Badge, Button, Card, Empty, Price } from "@/components/ui";
import { Counter } from "@/components/Counter";
import { ClientOnly } from "@/components/ClientOnly";
import { RouteArc } from "@/components/RouteArc";
import { Silhouette } from "@/components/Silhouette";
import { Checkout } from "@/components/Checkout";
import { ShareButton } from "@/components/ShareButton";
import { useStore } from "@/lib/store";
import { dateFromNow, eur, formatDate, formatDateTime, minutesToHm } from "@/lib/format";

export default function PoolDetail({ id }: { id: string }) {
  const pool = poolById(id);
  const { joinedPools, joinPool, leavePool } = useStore();
  const [seats, setSeats] = useState(1);
  const [checkout, setCheckout] = useState(false);
  const [pulse, setPulse] = useState(false);
  const [ambient, setAmbient] = useState(0);
  const [ambientName, setAmbientName] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState<string[]>([]);

  const mine = pool ? joinedPools[pool.id] ?? 0 : 0;

  // Un miembro real se suma mientras miras el pool: el precio baja en directo.
  useEffect(() => {
    if (!pool) return;
    const t = setTimeout(() => {
      setAmbient(1);
      setAmbientName("Nadia B.");
      setPulse(true);
      setTimeout(() => setPulse(false), 1200);
    }, 9000);
    return () => clearTimeout(t);
  }, [pool]);

  const taken = useMemo(() => (pool ? seatsTaken(pool) + mine + ambient : 0), [pool, mine, ambient]);

  if (!pool) {
    return (
      <div className="mx-auto max-w-shell px-5 py-24 md:px-8">
        <Empty
          title="Este pool ya no existe"
          body="Puede que haya salido o que su creador lo haya cerrado. Mira los pools abiertos ahora mismo."
          action={<Button href="/pools">Ver pools abiertos</Button>}
        />
      </div>
    );
  }

  const a = airportByCode(pool.from);
  const b = airportByCode(pool.to);
  const ac = aircraftById(pool.aircraftId);
  const op = operatorById(pool.operatorId);
  const departure = dateFromNow(pool.hoursFromNow);

  const divisor = Math.max(taken, pool.kind === "charter" ? pool.seatsMin : 1);
  const price = Math.round(pool.totalPrice / divisor);
  const priceIfJoin = Math.round(pool.totalPrice / Math.max(taken + seats, pool.kind === "charter" ? pool.seatsMin : 1));
  const progress = Math.min(100, (taken / pool.seatsTotal) * 100);
  const confirmed = taken >= pool.seatsMin;
  const seatsFree = pool.seatsTotal - taken;

  const join = () => {
    joinPool(pool.id, seats);
    setPulse(true);
    setTimeout(() => setPulse(false), 1200);
    setCheckout(true);
  };

  return (
    <div className="mx-auto max-w-shell px-5 py-12 md:px-8 md:py-16">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link href="/pools" className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-primary">
          <ArrowLeft size={15} strokeWidth={1.5} />
          Todos los pools
        </Link>
        <ShareButton
          title={`${airportByCode(pool.from).city} → ${airportByCode(pool.to).city} · BlaJet`}
          text={`Comparte este vuelo: ${airportByCode(pool.from).city} → ${airportByCode(pool.to).city}. Cada plaza que entra baja el precio de todos.`}
          label={{ es: "Invitar al pool", en: "Invite to pool" }}
        />
      </div>

      <div className="mt-8 grid gap-14 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-16">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone={pool.kind === "owner" ? "gold" : "neutral"}>
              {pool.kind === "owner" ? "Plazas de un vuelo ya contratado" : "Pool sobre un charter"}
            </Badge>
            {confirmed ? <Badge tone="good">Vuelo confirmado</Badge> : <Badge tone="neutral">Faltan {pool.seatsMin - taken} plazas</Badge>}
          </div>

          <h1 className="mt-5 font-display text-display1">
            {a.city}
            <br />
            <span className="text-muted">→</span> {b.city}
          </h1>

          <p className="num mt-5 text-sm text-muted">
            <ClientOnly fallback={<span className="skeleton inline-block h-4 w-48 align-middle" />}>
              {formatDate(departure)} · {formatDateTime(departure).split(", ").pop()}
            </ClientOnly>{" "}
            · {minutesToHm(pool.durationMin)} · {ac.model}
          </p>

          <div className="mt-10 border border-line bg-surface p-8">
            <Silhouette variant={pool.category === "turboprop" ? "turboprop" : "jet"} accent className="w-full max-w-xl" />
          </div>

          <RouteArc from={pool.from} to={pool.to} durationMin={pool.durationMin} className="mt-8 max-w-xl" />

          {/* Quién va */}
          <div className="mt-12">
            <p className="eyebrow">Quién va a bordo</p>
            <div className="mt-5 flex flex-wrap gap-3">
              {pool.passengers.map((p) => (
                <div key={p.name} className="flex items-center gap-2.5 rounded-sm border border-line px-3 py-2">
                  <span className="grid h-8 w-8 place-items-center rounded-full border border-line text-2xs text-muted">
                    {p.initials}
                  </span>
                  <span>
                    <span className="block text-sm text-primary">{p.name}</span>
                    <span className="num block text-2xs text-faint">
                      {p.seats} {p.seats === 1 ? "plaza" : "plazas"}
                      {p.verified ? " · verificado" : " · pendiente"}
                    </span>
                  </span>
                </div>
              ))}
              {ambientName && (
                <div className="rise flex items-center gap-2.5 rounded-sm border border-champagne/50 px-3 py-2">
                  <span className="grid h-8 w-8 place-items-center rounded-full border border-champagne/50 text-2xs text-champagne">NB</span>
                  <span>
                    <span className="block text-sm text-champagne">{ambientName}</span>
                    <span className="num block text-2xs text-faint">acaba de entrar</span>
                  </span>
                </div>
              )}
              {mine > 0 && (
                <div className="flex items-center gap-2.5 rounded-sm border border-champagne/50 px-3 py-2">
                  <span className="grid h-8 w-8 place-items-center rounded-full border border-champagne/50 text-2xs text-champagne">TÚ</span>
                  <span>
                    <span className="block text-sm text-champagne">Tu plaza</span>
                    <span className="num block text-2xs text-faint">{mine} {mine === 1 ? "plaza" : "plazas"}</span>
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Anfitrión */}
          <div className="mt-12 border-t border-line pt-8">
            <p className="eyebrow">{pool.kind === "owner" ? "Quién cede las plazas" : "Quién organiza"}</p>
            <div className="mt-4 flex items-start gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-line text-sm text-champagne">
                {pool.host.initials}
              </span>
              <div>
                <p className="flex flex-wrap items-center gap-2 text-sm text-primary">
                  {pool.host.name}
                  {pool.host.verified && (
                    <span className="inline-flex items-center gap-1 text-2xs text-champagne">
                      <ShieldCheck size={12} strokeWidth={1.5} /> Identidad verificada
                    </span>
                  )}
                </p>
                <p className="num mt-1 flex items-center gap-1 text-2xs text-faint">
                  <Star size={11} strokeWidth={1.5} className="text-champagne" /> {pool.host.rating} · {pool.host.flights} vuelos compartidos
                </p>
                <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted">{pool.host.bio}</p>
              </div>
            </div>
          </div>

          {/* Reglas */}
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            <div>
              <p className="eyebrow">Reglas del pool</p>
              <ul className="mt-4 space-y-2">
                {pool.rules.map((r) => (
                  <li key={r} className="flex items-start gap-2 text-sm text-muted">
                    <Check size={13} strokeWidth={1.5} className="mt-1 shrink-0 text-champagne" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow">Cancelación</p>
              <p className="mt-4 text-sm leading-relaxed text-muted">{pool.cancellation}</p>
              <p className="num mt-4 text-2xs text-faint">
                Operado por {op.name} · {op.aoc}
              </p>
            </div>
          </div>

          {/* Chat */}
          <div className="mt-12 border-t border-line pt-8">
            <p className="eyebrow flex items-center gap-2">
              <MessageCircle size={12} strokeWidth={1.5} /> Conversación del pool
            </p>
            <div className="mt-5 space-y-4">
              {pool.messages.map((m, i) => (
                <div key={i} className="flex gap-3">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line text-2xs text-muted">
                    {m.author.split(" ")[0][0]}
                    {m.author.split(" ")[1]?.[0] ?? ""}
                  </span>
                  <div>
                    <p className="text-2xs text-faint">
                      {m.author} · {m.ago}
                    </p>
                    <p className="mt-1 max-w-lg text-sm leading-relaxed text-muted">{m.text}</p>
                  </div>
                </div>
              ))}
              {sent.map((s, i) => (
                <div key={`s-${i}`} className="flex gap-3">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-champagne/50 text-2xs text-champagne">TÚ</span>
                  <div>
                    <p className="text-2xs text-faint">Tú · ahora</p>
                    <p className="mt-1 max-w-lg text-sm leading-relaxed text-primary">{s}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 flex max-w-lg gap-2">
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && message.trim()) {
                    setSent((s) => [...s, message.trim()]);
                    setMessage("");
                  }
                }}
                placeholder="Escribe al grupo…"
                className="h-11 w-full rounded border border-line bg-raised px-3 text-sm outline-none transition-colors focus:border-champagne"
                aria-label="Mensaje para el pool"
              />
              <Button
                variant="ghost"
                onClick={() => {
                  if (!message.trim()) return;
                  setSent((s) => [...s, message.trim()]);
                  setMessage("");
                }}
              >
                <Send size={14} strokeWidth={1.5} />
              </Button>
            </div>
          </div>
        </div>

        {/* Panel */}
        <aside className="lg:sticky lg:top-24 lg:h-fit">
          <Card className={`p-6 ${pulse ? "pulse-once" : ""}`}>
            <p className="eyebrow">Precio por plaza ahora</p>
            <p className="num mt-3 text-[3rem] leading-none text-champagne">
              <Counter to={price} startOnView={false} />
              <span className="ml-2 text-sm text-muted">€</span>
            </p>
            {ambientName && (
              <p className="rise mt-2 text-2xs text-champagne">{ambientName} acaba de entrar: el precio ha bajado.</p>
            )}

            <div className="mt-6">
              <div className="flex items-baseline justify-between">
                <span className="num text-sm text-muted">
                  {taken}/{pool.seatsTotal} plazas ocupadas
                </span>
                <span className="num text-2xs text-faint">
                  {pool.kind === "charter" ? `confirma en ${pool.seatsMin}` : "sale seguro"}
                </span>
              </div>
              <div className="mt-2 h-1 w-full overflow-hidden rounded-sm bg-line">
                <div className="h-full rounded-sm bg-champagne transition-[width] duration-700 ease-calm" style={{ width: `${progress}%` }} />
              </div>
              <p className="mt-2 text-2xs text-faint">
                {confirmed
                  ? "El vuelo está confirmado. Cada plaza nueva sigue bajando el precio de todos."
                  : `El vuelo se confirma al llegar a ${pool.seatsMin} plazas.`}
              </p>
            </div>

            {seatsFree > 0 ? (
              <>
                <div className="mt-6 flex items-center justify-between rounded border border-line bg-raised px-3 py-2.5">
                  <span className="flex items-center gap-2 text-sm text-muted">
                    <Users size={14} strokeWidth={1.5} /> Tus plazas
                  </span>
                  <span className="flex items-center gap-4">
                    <button onClick={() => setSeats((s) => Math.max(1, s - 1))} className="text-muted hover:text-champagne" aria-label="Quitar plaza">−</button>
                    <span className="num text-sm">{seats}</span>
                    <button onClick={() => setSeats((s) => Math.min(seatsFree, s + 1))} className="text-muted hover:text-champagne" aria-label="Añadir plaza">+</button>
                  </span>
                </div>

                <div className="rule mt-5 space-y-2 pt-5 text-sm">
                  <div className="flex justify-between gap-4">
                    <span className="text-muted">Si entras con {seats}</span>
                    <span className="num text-champagne">{eur(priceIfJoin)} €/plaza</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-muted">Total que pagas</span>
                    <span className="num">{eur(priceIfJoin * seats)} €</span>
                  </div>
                </div>

                {mine > 0 ? (
                  <div className="mt-5 space-y-2">
                    <p className="flex items-center gap-2 text-sm text-good">
                      <Check size={14} strokeWidth={1.5} /> Ya estás en este pool con {mine} {mine === 1 ? "plaza" : "plazas"}
                    </p>
                    <Button variant="ghost" size="sm" className="w-full" onClick={() => leavePool(pool.id)}>
                      Salir del pool
                    </Button>
                  </div>
                ) : (
                  <Button size="lg" className="mt-5 w-full" onClick={join}>
                    Unirme al pool
                  </Button>
                )}

                <p className="mt-3 text-center text-2xs text-faint">
                  {pool.kind === "charter"
                    ? "Solo se cobra cuando el pool alcanza su mínimo."
                    : "El vuelo está confirmado: el cargo es inmediato."}
                </p>
              </>
            ) : (
              <div className="mt-6">
                <p className="text-sm text-muted">Este pool está completo.</p>
                <Button href="/pools" variant="ghost" size="sm" className="mt-4 w-full">
                  Ver otros pools
                </Button>
              </div>
            )}
          </Card>
        </aside>
      </div>

      <Checkout
        open={checkout}
        onClose={() => setCheckout(false)}
        title="Confirmar plaza en el pool"
        lines={[
          { label: `${seats} ${seats === 1 ? "plaza" : "plazas"} · ${ac.model}`, value: priceIfJoin * seats },
          { label: "Compartición de gastos", value: "Sin comisión de salida" },
        ]}
        total={priceIfJoin * seats}
        booking={{
          type: "Pool",
          route: `${a.city} → ${b.city}`,
          date: formatDate(departure),
          aircraft: `${ac.model} · ${ac.registration}`,
          total: priceIfJoin * seats,
          status: confirmed ? "Confirmado" : "Pendiente de completar",
        }}
      />
    </div>
  );
}
