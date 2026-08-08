"use client";

import { useState } from "react";
import Link from "next/link";
import { BadgeCheck, Bell, Camera, CreditCard, Plane, ShieldCheck, Trash2, Users } from "lucide-react";
import { useStore } from "@/lib/store";
import { Badge, Button, Card, Empty } from "@/components/ui";
import { Counter } from "@/components/Counter";
import { ClientOnly } from "@/components/ClientOnly";
import { pools, seatsTaken } from "@/data/pools";
import { airportByCode } from "@/data/airports";
import { demoUser, milesTiers } from "@/data/demoUser";
import { eur } from "@/lib/format";

const tabs = ["Reservas", "Pools", "Alertas", "Wallet", "Verificación"];

export default function Account() {
  const { signedIn, demoMode, enableDemo, reset, bookings, alerts, removeAlert, joinedPools, wallet, miles } = useStore();
  const [tab, setTab] = useState("Reservas");

  const myPools = pools.filter((p) => joinedPools[p.id]);
  const tier = [...milesTiers].reverse().find((t) => miles >= t.threshold) ?? milesTiers[0];
  const next = milesTiers.find((t) => t.threshold > miles);

  if (!signedIn) {
    return (
      <div className="mx-auto max-w-shell px-5 py-24 md:px-8">
        <Empty
          title="Entra para ver tus vuelos"
          body="Aquí aparecerán tus cotizaciones, reservas, pools y alertas. Para enseñar la plataforma con datos ya cargados, activa el modo demo."
          action={
            <div className="flex flex-wrap justify-center gap-3">
              <Button onClick={enableDemo}>Activar modo demo</Button>
              <Button href="/cotizar" variant="ghost">
                Pedir una cotización
              </Button>
            </div>
          }
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-shell px-5 py-14 md:px-8 md:py-20">
      {/* Cabecera de cuenta */}
      <div className="flex flex-wrap items-start justify-between gap-8 border-b border-line pb-10">
        <div className="flex items-center gap-5">
          <span className="grid h-16 w-16 place-items-center rounded-full border border-champagne/40 font-display text-xl text-champagne">
            {demoMode ? demoUser.initials : "TÚ"}
          </span>
          <div>
            <h1 className="font-display text-display2">{demoMode ? demoUser.name : "Tu cuenta"}</h1>
            <p className="mt-2 flex flex-wrap items-center gap-2">
              <Badge tone="gold">{tier.name}</Badge>
              {demoMode && <span className="num text-2xs text-faint">Miembro desde {demoUser.memberSince}</span>}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div>
            <p className="eyebrow">Wallet</p>
            <p className="num mt-2 text-[1.75rem] leading-none">
              <Counter to={wallet} startOnView={false} /> <span className="text-xs text-muted">€</span>
            </p>
          </div>
          <div>
            <p className="eyebrow">BlaJet Miles</p>
            <p className="num mt-2 text-[1.75rem] leading-none text-champagne">
              <Counter to={miles} startOnView={false} />
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="no-scrollbar mt-8 flex gap-1 overflow-x-auto border-b border-line">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`shrink-0 border-b-2 px-4 py-3 text-sm transition-colors ${
              tab === t ? "border-champagne text-champagne" : "border-transparent text-muted hover:text-primary"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-10">
        {tab === "Reservas" &&
          (bookings.length === 0 ? (
            <Empty
              title="Todavía no has volado con nosotros"
              body="Cuando reserves un charter, un empty leg o una plaza en un pool, aparecerá aquí con su documentación."
              action={<Button href="/empty-legs">Ver qué hay volando</Button>}
            />
          ) : (
            <div className="space-y-px bg-line">
              {bookings.map((b) => (
                <div key={b.id} className="flex flex-wrap items-center justify-between gap-6 bg-ink px-6 py-5">
                  <div className="flex items-center gap-4">
                    <span className="grid h-10 w-10 place-items-center rounded-sm border border-line text-muted">
                      <Plane size={15} strokeWidth={1.5} />
                    </span>
                    <div>
                      <p className="text-sm text-primary">{b.route}</p>
                      <p className="num mt-1 text-2xs text-faint">
                        {b.type} · {b.date} · {b.aircraft}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <Badge tone={b.status === "Completado" ? "neutral" : "good"}>{b.status}</Badge>
                    <span className="num text-sm">{eur(b.total)} €</span>
                  </div>
                </div>
              ))}
            </div>
          ))}

        {tab === "Pools" &&
          (myPools.length === 0 ? (
            <Empty
              title="No estás en ningún pool"
              body="Únete a uno abierto o crea el tuyo: cada persona que entra baja el precio de todos."
              action={<Button href="/pools">Ver pools abiertos</Button>}
            />
          ) : (
            <div className="space-y-px bg-line">
              {myPools.map((p) => {
                const taken = seatsTaken(p) + (joinedPools[p.id] ?? 0);
                const price = Math.round(p.totalPrice / Math.max(taken, p.seatsMin));
                return (
                  <Link key={p.id} href={`/pools/${p.id}`} className="flex flex-wrap items-center justify-between gap-6 bg-ink px-6 py-5 transition-colors hover:bg-surface">
                    <div className="flex items-center gap-4">
                      <span className="grid h-10 w-10 place-items-center rounded-sm border border-line text-muted">
                        <Users size={15} strokeWidth={1.5} />
                      </span>
                      <div>
                        <p className="text-sm text-primary">
                          {airportByCode(p.from).city} → {airportByCode(p.to).city}
                        </p>
                        <p className="num mt-1 text-2xs text-faint">
                          {taken}/{p.seatsTotal} plazas · tus plazas: {joinedPools[p.id]}
                        </p>
                      </div>
                    </div>
                    <span className="num text-sm text-champagne">{eur(price)} €/plaza</span>
                  </Link>
                );
              })}
            </div>
          ))}

        {tab === "Alertas" &&
          (alerts.length === 0 ? (
            <Empty
              title="Sin alertas activas"
              body="Dinos una ruta y te avisamos en cuanto se publique un empty leg que encaje. Los miembros Black lo reciben 24 h antes."
              action={<Button href="/empty-legs">Crear una alerta</Button>}
            />
          ) : (
            <div className="space-y-px bg-line">
              {alerts.map((a) => (
                <div key={a.id} className="flex flex-wrap items-center justify-between gap-6 bg-ink px-6 py-5">
                  <div className="flex items-center gap-4">
                    <span className="grid h-10 w-10 place-items-center rounded-sm border border-line text-muted">
                      <Bell size={15} strokeWidth={1.5} />
                    </span>
                    <div>
                      <p className="text-sm text-primary">{a.route}</p>
                      <p className="num mt-1 text-2xs text-faint">
                        {a.window} · hasta {eur(a.maxPrice)} €
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeAlert(a.id)}
                    className="inline-flex items-center gap-1.5 text-2xs text-faint transition-colors hover:text-warn"
                  >
                    <Trash2 size={12} strokeWidth={1.5} /> Eliminar
                  </button>
                </div>
              ))}
            </div>
          ))}

        {tab === "Wallet" && (
          <div className="grid gap-10 lg:grid-cols-2">
            <Card className="p-6">
              <p className="eyebrow">Crédito disponible</p>
              <p className="num mt-3 text-[2.5rem] leading-none">
                {eur(wallet)} <span className="text-sm text-muted">€</span>
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                Cuando un operador cancela un vuelo, el importe pasa aquí de forma inmediata y puedes usarlo en cualquier
                reserva. No caduca.
              </p>
              <div className="rule mt-6 space-y-3 pt-5 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted">Cancelación de AeroCruz · MEX–CUN</span>
                  <span className="num text-good">+3.200 €</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Crédito de bienvenida Black</span>
                  <span className="num text-good">+1.620 €</span>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <p className="eyebrow">BlaJet Miles</p>
              <p className="num mt-3 text-[2.5rem] leading-none text-champagne">{eur(miles)}</p>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                Un punto por cada euro gastado. Se canjean como descuento directo y marcan tu nivel.
              </p>
              <div className="mt-6 space-y-4">
                {milesTiers.map((t) => (
                  <div key={t.name}>
                    <div className="flex items-baseline justify-between">
                      <span className={`text-sm ${miles >= t.threshold ? "text-champagne" : "text-muted"}`}>{t.name}</span>
                      <span className="num text-2xs text-faint">{eur(t.threshold)}</span>
                    </div>
                    <p className="mt-1 text-2xs text-faint">{t.perk}</p>
                  </div>
                ))}
              </div>
              {next && (
                <p className="num mt-6 text-2xs text-faint">
                  Te faltan {eur(next.threshold - miles)} puntos para {next.name}.
                </p>
              )}
            </Card>
          </div>
        )}

        {tab === "Verificación" && (
          <div className="grid gap-10 lg:grid-cols-2">
            <Card className="p-6">
              <p className="eyebrow">Identidad</p>
              <div className="mt-5 space-y-4">
                {[
                  { icon: CreditCard, label: "Pasaporte", done: demoMode },
                  { icon: Camera, label: "Selfie de verificación", done: demoMode },
                  { icon: ShieldCheck, label: "Comprobación antifraude", done: demoMode },
                ].map((s) => (
                  <div key={s.label} className="flex items-center justify-between gap-4 rounded border border-line px-4 py-3">
                    <span className="flex items-center gap-3 text-sm text-primary">
                      <s.icon size={15} strokeWidth={1.5} className="text-muted" />
                      {s.label}
                    </span>
                    {s.done ? (
                      <span className="inline-flex items-center gap-1.5 text-2xs text-good">
                        <BadgeCheck size={13} strokeWidth={1.5} /> Verificado
                      </span>
                    ) : (
                      <Button size="sm" variant="ghost">
                        Subir
                      </Button>
                    )}
                  </div>
                ))}
              </div>
              {demoMode && (
                <p className="num mt-5 text-2xs text-faint">Verificado el {demoUser.kyc.verifiedOn}.</p>
              )}
            </Card>

            <Card className="p-6">
              <p className="eyebrow">Por qué te lo pedimos</p>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                En rutas internacionales y en la venta por asiento, los operadores están obligados a identificar a cada
                pasajero antes de emitir el billete. AeroCruz, por ejemplo, exige pasaporte y selfie de todos los
                ocupantes. Con la verificación hecha una vez, reservas en un clic.
              </p>
              <div className="rule mt-6 pt-5">
                <p className="text-sm text-primary">Modo demostración</p>
                <p className="mt-2 text-xs leading-relaxed text-muted">
                  {demoMode
                    ? "Estás viendo una cuenta de ejemplo con historial cargado."
                    : "Carga una cuenta de ejemplo con reservas, pools y wallet para enseñar la plataforma."}
                </p>
                <div className="mt-4 flex gap-2">
                  <Button size="sm" variant="ghost" onClick={enableDemo}>
                    Cargar cuenta demo
                  </Button>
                  <Button size="sm" variant="quiet" onClick={reset}>
                    Reiniciar todo
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
