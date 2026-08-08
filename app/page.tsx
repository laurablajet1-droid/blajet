import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SearchPanel } from "@/components/SearchPanel";
import { NetworkMap } from "@/components/NetworkMap";
import { SavingsCalculator } from "@/components/SavingsCalculator";
import { Silhouette } from "@/components/Silhouette";
import { Counter } from "@/components/Counter";
import { Button, SectionHead } from "@/components/ui";
import { trust } from "@/data/metrics";
import { operators } from "@/data/operators";
import { eur } from "@/lib/format";

const ladder = [
  { label: "Charter a medida", price: 12400, unit: "€ / avión", note: "Tú eliges hora y aeronave" },
  { label: "Empty leg", price: 6900, unit: "€ / avión", note: "El avión ya tenía que volar" },
  { label: "Pooling", price: 1850, unit: "€ / plaza", note: "Entre ocho pasajeros" },
];

const modalities = [
  {
    tag: "A medida",
    title: "Tu jet a medida",
    body: "Dinos ruta, fecha y cuántos sois. La solicitud sale a la red de operadores y en minutos tienes tres ofertas comparables, con el avión concreto, su año y todo lo que incluye.",
    stat: "3 ofertas comparables",
    href: "/cotizar",
    cta: "Pedir cotización",
    variant: "heavy" as const,
  },
  {
    tag: "Oportunidad",
    title: "Empty legs",
    body: "Cuando un avión vuelve vacío a su base, ese vuelo existe igual. Lo compras entero con un descuento fuerte o, donde la normativa lo permite, plaza a plaza. Puedes incluso hacer tu oferta.",
    stat: "Hasta un 60 % menos",
    href: "/empty-legs",
    cta: "Ver vuelos disponibles",
    variant: "jet" as const,
  },
  {
    tag: "Compartido",
    title: "Pooling",
    body: "Abre un vuelo, fija el mínimo de plazas y deja que otros se sumen: cada persona que entra baja el precio de todos. O súmate a las plazas libres de quien ya tiene el avión contratado.",
    stat: "Desde 520 € por plaza",
    href: "/pools",
    cta: "Ver pools abiertos",
    variant: "turboprop" as const,
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative grain overflow-hidden border-b border-line">
        <div className="pointer-events-none absolute inset-0 opacity-[0.55]">
          <svg viewBox="0 0 1200 620" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <path d="M-40 520 Q420 300 1240 120" fill="none" stroke="var(--c-line)" strokeWidth="1" />
            <path d="M-40 580 Q500 380 1240 200" fill="none" stroke="var(--c-line)" strokeWidth="1" opacity="0.6" />
            <path d="M-40 460 Q360 240 1240 40" fill="none" stroke="var(--c-line)" strokeWidth="1" opacity="0.35" />
          </svg>
        </div>

        <div className="relative mx-auto grid max-w-shell gap-14 px-5 pb-20 pt-16 md:px-8 lg:grid-cols-[1.05fr_minmax(420px,0.95fr)] lg:gap-20 lg:pb-28 lg:pt-24">
          <div className="rise">
            <p className="eyebrow">Marketplace de aviación privada</p>
            <h1 className="mt-6 font-display text-display1">
              El jet privado,
              <br />
              por fin a <span className="text-champagne">tu alcance</span>.
            </h1>
            <p className="mt-7 max-w-md text-lg leading-relaxed text-muted">
              Cotiza un vuelo a medida, caza un avión que ya está en el aire o comparte el coste con quien va a tu mismo
              destino. Tres formas de volar, la misma red de operadores certificados.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Button href="/empty-legs" variant="ghost">
                Ver empty legs de hoy
                <ArrowRight size={15} strokeWidth={1.5} />
              </Button>
              <Link href="/como-funciona" className="text-sm text-muted underline-offset-4 transition-colors hover:text-primary hover:underline">
                Cómo funciona
              </Link>
            </div>

            <div className="mt-14 max-w-md">
              <Silhouette variant="jet" className="w-full" />
            </div>
          </div>

          <div className="rise lg:pt-8" style={{ animationDelay: "120ms" }}>
            <SearchPanel />
          </div>
        </div>
      </section>

      {/* Signature: la misma ruta, tres precios */}
      <section className="border-b border-line bg-surface">
        <div className="mx-auto max-w-shell px-5 py-14 md:px-8">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <p className="eyebrow">Madrid → Ibiza, el mismo jueves</p>
            <p className="text-2xs text-faint">Precios reales publicados en la plataforma</p>
          </div>

          <div className="mt-8 grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-3">
            {ladder.map((l, i) => (
              <div key={l.label} className="bg-surface px-6 py-7">
                <p className={`text-[0.8125rem] ${i === 2 ? "text-champagne" : "text-muted"}`}>{l.label}</p>
                <p className="num mt-4 text-[2.5rem] leading-none">
                  {eur(l.price)}
                  <span className="ml-2 text-xs text-faint">{l.unit}</span>
                </p>
                <p className="mt-3 text-xs text-faint">{l.note}</p>
                <div className="mt-5 h-[3px] w-full overflow-hidden rounded-sm bg-line">
                  <div
                    className={i === 2 ? "h-full bg-champagne" : "h-full bg-faint"}
                    style={{ width: `${(l.price / ladder[0].price) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tres modalidades */}
      <section className="mx-auto max-w-shell px-5 py-22 md:px-8">
        <SectionHead
          eyebrow="Tres formas de volar"
          title="De lo más exclusivo a lo más accesible, sin salir de la misma red."
        />

        <div className="mt-14 space-y-px bg-line">
          {modalities.map((m, i) => (
            <article
              key={m.title}
              className="grid items-center gap-8 bg-ink px-1 py-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)_auto] md:gap-12 md:px-6"
            >
              <div className={i % 2 === 1 ? "md:order-2" : ""}>
                <Silhouette variant={m.variant} accent={i === 2} className="w-full max-w-[300px]" />
              </div>

              <div className={i % 2 === 1 ? "md:order-1" : ""}>
                <p className="eyebrow text-champagne">{m.tag}</p>
                <h3 className="mt-3 font-display text-display3">{m.title}</h3>
                <p className="mt-4 max-w-lg leading-relaxed text-muted">{m.body}</p>
                <p className="num mt-5 text-sm text-primary">{m.stat}</p>
              </div>

              <Link
                href={m.href}
                className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-champagne md:order-3"
              >
                {m.cta}
                <ArrowUpRight size={15} strokeWidth={1.5} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* Mapa de red */}
      <section className="border-y border-line bg-surface">
        <div className="mx-auto max-w-shell px-5 py-22 md:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead
              eyebrow="La red, ahora mismo"
              title="Lo que está volando y lo que se está llenando."
              className="max-w-xl"
            />
            <Button href="/empty-legs" variant="ghost" size="sm">
              Abrir el listado completo
            </Button>
          </div>
          <div className="mt-12">
            <NetworkMap />
          </div>
        </div>
      </section>

      {/* Calculadora */}
      <section className="mx-auto max-w-shell px-5 py-22 md:px-8">
        <SectionHead
          eyebrow="Calculadora"
          title="Cuánto cuesta tu ruta de las tres maneras."
          intro="Elige un trayecto y mira la diferencia entre contratar el avión entero, pillar un empty leg o repartir el coste."
        />
        <div className="mt-12">
          <SavingsCalculator />
        </div>
      </section>

      {/* Confianza */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-shell px-5 py-22 md:px-8">
          <div className="grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {trust.map((t) => (
              <div key={t.label} className="bg-surface px-6 py-8">
                <p className="font-display text-[2.25rem] leading-none text-champagne">
                  <Counter to={t.value} decimals={(t as any).decimals ?? 0} />
                </p>
                <p className="mt-3 text-xs text-muted">{t.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {operators.map((o) => (
              <div key={o.id} className="border-t border-line pt-6">
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-sm border border-line text-2xs tracking-[0.14em] text-champagne">
                    {o.monogram}
                  </span>
                  <div>
                    <p className="text-sm text-primary">{o.name}</p>
                    <p className="num text-2xs text-faint">
                      {o.aoc} · {o.ownFleet + o.partnerFleet} aeronaves · {o.rating} ★
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-xs leading-relaxed text-muted">{o.focus}.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cierre */}
      <section className="border-t border-line bg-surface">
        <div className="mx-auto flex max-w-shell flex-col items-start gap-8 px-5 py-20 md:flex-row md:items-center md:justify-between md:px-8">
          <div>
            <h2 className="font-display text-display2 max-w-xl">Empieza por donde te encaje.</h2>
            <p className="mt-4 max-w-lg text-muted">
              Pide una cotización sin compromiso o mira qué hay volando esta semana. La primera oferta suele llegar en
              menos de diez minutos.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href="/cotizar" size="lg">
              Cotizar un vuelo
              <ArrowRight size={16} strokeWidth={1.5} />
            </Button>
            <Button href="/empty-legs" variant="ghost" size="lg">
              Ver empty legs
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
