import type { Metadata } from "next";
import { Check } from "lucide-react";
import { Button, Card } from "@/components/ui";
import { Silhouette } from "@/components/Silhouette";

export const metadata: Metadata = {
  title: "BlaJet Black",
  description: "Acceso anticipado a los empty legs, comisión reducida y concierge 24/7.",
};

const plans = [
  {
    name: "Miembro",
    price: "0",
    unit: "€/año",
    intro: "Todo lo necesario para volar cuando lo necesites.",
    features: [
      "Cotizaciones ilimitadas con tres ofertas comparables",
      "Acceso al listado de empty legs",
      "Pools abiertos y creación de pools",
      "Alertas de ruta",
    ],
    cta: "Empezar gratis",
    href: "/cotizar",
  },
  {
    name: "BlaJet Black",
    price: "2.400",
    unit: "€/año",
    intro: "Para quien vuela más de cuatro veces al año y no quiere perder oportunidades.",
    features: [
      "Empty legs 24 h antes que el resto de miembros",
      "Comisión reducida en las tres modalidades",
      "Concierge disponible las veinticuatro horas",
      "Prioridad de plaza en los pools que se llenan",
      "Crédito de bienvenida de 1.620 € en el wallet",
      "Cancelación flexible en operadores asociados",
    ],
    cta: "Hacerme Black",
    href: "/contacto",
    featured: true,
  },
];

export default function Page() {
  return (
    <div className="mx-auto max-w-shell px-5 py-14 md:px-8 md:py-20">
      <div className="border-b border-line pb-10">
        <p className="eyebrow">Membresía</p>
        <h1 className="mt-3 max-w-2xl font-display text-display1">
          Los mejores vuelos duran <span className="text-champagne">horas</span>.
        </h1>
        <p className="mt-6 max-w-xl leading-relaxed text-muted">
          Un empty leg bueno se vende el mismo día que se publica. Black te da esas veinticuatro horas de ventaja, y
          alguien al teléfono cuando el plan cambia a última hora.
        </p>
      </div>

      <div className="mt-14 grid gap-px overflow-hidden rounded-md border border-line bg-line lg:grid-cols-2">
        {plans.map((p) => (
          <div key={p.name} className={`bg-surface p-8 ${p.featured ? "ring-1 ring-inset ring-champagne/40" : ""}`}>
            <p className={`text-sm ${p.featured ? "text-champagne" : "text-muted"}`}>{p.name}</p>
            <p className="num mt-5 text-[3rem] leading-none">
              {p.price} <span className="text-sm text-muted">{p.unit}</span>
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">{p.intro}</p>
            <ul className="mt-7 space-y-2.5">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-muted">
                  <Check size={14} strokeWidth={1.5} className="mt-0.5 shrink-0 text-champagne" />
                  {f}
                </li>
              ))}
            </ul>
            <Button href={p.href} variant={p.featured ? "primary" : "ghost"} size="lg" className="mt-8 w-full">
              {p.cta}
            </Button>
          </div>
        ))}
      </div>

      <Card className="mt-16 overflow-hidden">
        <div className="grid gap-10 p-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow">Concierge</p>
            <h2 className="mt-3 font-display text-display3">Una persona, no un formulario.</h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
              Cambios de última hora, catering imposible, un traslado en tierra a las tres de la mañana o una mascota que
              se suma al viaje. El concierge de Black lo resuelve con el operador directamente.
            </p>
          </div>
          <Silhouette variant="heavy" accent className="w-full" />
        </div>
      </Card>
    </div>
  );
}
