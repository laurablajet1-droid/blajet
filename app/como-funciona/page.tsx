import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button, Card, SectionHead } from "@/components/ui";
import { Silhouette } from "@/components/Silhouette";
import { SavingsCalculator } from "@/components/SavingsCalculator";

export const metadata: Metadata = {
  title: "Cómo funciona",
  description: "Las tres formas de volar en BlaJet y qué ocurre en cada paso, desde la solicitud hasta el despegue.",
};

const flows = [
  {
    tag: "Charter a medida",
    variant: "heavy" as const,
    steps: [
      "Dices ruta, fecha, número de pasajeros y categoría de avión.",
      "La solicitud sale a la vez a todos los operadores con flota disponible en esa ventana.",
      "En minutos tienes tres ofertas comparables: avión concreto, año, precio y lo que incluye.",
      "Eliges una, pagas y el operador confirma el slot y la tripulación.",
    ],
    note: "Tú marcas el horario. Es la opción más flexible y la más cara.",
    href: "/cotizar",
    cta: "Pedir cotización",
  },
  {
    tag: "Empty leg",
    variant: "jet" as const,
    steps: [
      "Un avión termina un servicio y tiene que volver vacío a su base.",
      "El operador publica ese trayecto con la hora ya fijada y un precio muy por debajo del charter.",
      "Lo compras entero o, donde la normativa lo permite, plaza a plaza.",
      "Si te parece caro, haces tu oferta y el operador la acepta o la rechaza en el momento.",
    ],
    note: "El precio baja porque el vuelo existe igual. A cambio, la hora no se negocia.",
    href: "/empty-legs",
    cta: "Ver empty legs",
  },
  {
    tag: "Pooling",
    variant: "turboprop" as const,
    steps: [
      "Alguien abre un vuelo: ruta, fecha, categoría y mínimo de plazas para que salga.",
      "Otros miembros se suman y el precio por plaza baja para todos con cada entrada.",
      "Al alcanzar el mínimo, el vuelo se confirma y se cobra. Si no se llena, no pagas nada.",
      "También puedes entrar en las plazas libres de quien ya tiene el avión contratado.",
    ],
    note: "Compartición de gastos: quien organiza no gana dinero, reparte el coste.",
    href: "/pools",
    cta: "Ver pools abiertos",
  },
];

export default function Page() {
  return (
    <div className="mx-auto max-w-shell px-5 py-14 md:px-8 md:py-20">
      <div className="border-b border-line pb-10">
        <p className="eyebrow">Cómo funciona</p>
        <h1 className="mt-3 max-w-3xl font-display text-display1">Tres caminos hacia el mismo avión.</h1>
        <p className="mt-6 max-w-xl leading-relaxed text-muted">
          BlaJet no opera aeronaves: conecta a quien quiere volar con operadores certificados. Lo que cambia de una
          modalidad a otra es quién decide el horario y entre cuántos se reparte el coste.
        </p>
      </div>

      <div className="mt-16 space-y-16">
        {flows.map((f) => (
          <section key={f.tag} className="grid gap-10 border-b border-line pb-16 last:border-0 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
            <div>
              <p className="eyebrow text-champagne">{f.tag}</p>
              <Silhouette variant={f.variant} className="mt-6 w-full max-w-[340px]" />
              <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted">{f.note}</p>
              <Button href={f.href} variant="ghost" size="sm" className="mt-6">
                {f.cta}
                <ArrowRight size={14} strokeWidth={1.5} />
              </Button>
            </div>

            <ol className="space-y-6">
              {f.steps.map((s, i) => (
                <li key={s} className="flex gap-5 border-b border-line pb-6 last:border-0">
                  <span className="num shrink-0 text-2xs tracking-[0.18em] text-champagne">{String(i + 1).padStart(2, "0")}</span>
                  <p className="max-w-lg leading-relaxed text-muted">{s}</p>
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>

      <section className="mt-6">
        <SectionHead
          eyebrow="Compara"
          title="La misma ruta, tres precios."
          intro="Cambia el trayecto y mira qué diferencia hay entre contratar el avión entero, pillar un vuelo vacío o repartir el coste."
        />
        <div className="mt-12">
          <SavingsCalculator />
        </div>
      </section>

      <Card className="mt-20 p-8">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="font-display text-display3">¿Sigues con dudas?</p>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted">
              En las preguntas frecuentes explicamos la verificación de operadores, el equipaje, las mascotas, las
              cancelaciones y el marco legal de la venta por asiento.
            </p>
          </div>
          <Button href="/faq" variant="ghost">
            Preguntas frecuentes
          </Button>
        </div>
      </Card>
    </div>
  );
}
