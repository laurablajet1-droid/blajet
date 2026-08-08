import type { Metadata } from "next";
import { Button } from "@/components/ui";
import { operators } from "@/data/operators";

export const metadata: Metadata = {
  title: "Sobre BlaJet",
  description: "Por qué construimos un marketplace de aviación privada con tres formas de volar.",
};

export default function Page() {
  return (
    <div className="mx-auto max-w-shell px-5 py-14 md:px-8 md:py-20">
      <div className="border-b border-line pb-10">
        <p className="eyebrow">Sobre nosotros</p>
        <h1 className="mt-3 max-w-3xl font-display text-display1">
          Cada día despegan aviones <span className="text-champagne">vacíos</span>.
        </h1>
      </div>

      <div className="mt-14 grid gap-14 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-20">
        <div className="max-w-2xl space-y-6 leading-relaxed text-muted">
          <p>
            Cerca de un tercio de los vuelos privados se hacen sin un solo pasajero a bordo: el avión termina un
            servicio y tiene que volver a su base o ir a recoger al siguiente cliente. Ese trayecto ya está pagado en
            combustible, tripulación y tasas. Simplemente no lo ocupa nadie.
          </p>
          <p>
            BlaJet nació de esa contradicción. Por un lado, un sector con capacidad ociosa constante. Por otro, mucha
            gente para quien un jet privado es inalcanzable solo porque el precio se calcula por avión y no por persona.
          </p>
          <p>
            Nuestra respuesta son tres formas de acceder a la misma red de operadores certificados: el charter clásico
            para quien necesita mandar sobre el horario, el empty leg para quien puede adaptarse a la agenda del avión, y
            el pooling para quien prefiere repartir el coste con otros que van al mismo sitio.
          </p>
          <p>
            No operamos aeronaves ni queremos hacerlo. Nuestro trabajo es verificar quién vuela, poner los precios en la
            misma pantalla y hacer que reservar un jet se parezca más a comprar un billete que a negociar un contrato.
          </p>
        </div>

        <aside>
          <p className="eyebrow">Principios</p>
          <div className="mt-6 space-y-6">
            {[
              ["Precio a la vista", "Nada de «consulte disponibilidad». Si un vuelo está publicado, su precio también."],
              ["Operador identificado", "Sabes qué compañía vuela, con qué AOC, qué avión y qué política de cancelación tiene antes de pagar."],
              ["Nada de letra pequeña", "Lo que incluye cada oferta está escrito en la oferta, no en un anexo."],
            ].map(([t, d]) => (
              <div key={t} className="border-t border-line pt-5">
                <p className="text-sm text-primary">{t}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{d}</p>
              </div>
            ))}
          </div>
        </aside>
      </div>

      <section className="mt-20 border-t border-line pt-14">
        <p className="eyebrow">Operadores asociados</p>
        <h2 className="mt-3 font-display text-display2">Con quién vuelas.</h2>
        <div className="mt-10 grid gap-px overflow-hidden rounded-md border border-line bg-line lg:grid-cols-3">
          {operators.map((o) => (
            <div key={o.id} className="bg-surface p-7">
              <span className="grid h-10 w-10 place-items-center rounded-sm border border-line text-2xs tracking-[0.14em] text-champagne">
                {o.monogram}
              </span>
              <p className="mt-5 text-sm text-primary">{o.name}</p>
              <p className="num mt-2 text-2xs text-faint">
                {o.aoc} · desde {o.founded} · {o.rating} ★
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted">{o.coverage}</p>
              <ul className="mt-5 space-y-1.5">
                {o.strengths.map((s) => (
                  <li key={s} className="text-2xs text-faint">· {s}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-16 flex flex-wrap items-center justify-between gap-6 border-t border-line pt-10">
        <p className="max-w-lg leading-relaxed text-muted">¿Operas aeronaves y quieres llenar tus trayectos vacíos?</p>
        <Button href="/operadores" variant="ghost">
          Ver el panel de operador
        </Button>
      </div>
    </div>
  );
}
