import type { Metadata } from "next";
import { faq } from "@/data/faq";
import { Button } from "@/components/ui";

export const metadata: Metadata = {
  title: "Preguntas frecuentes",
  description: "Modalidades, seguridad, marco legal, equipaje, cancelaciones, pagos y membresía.",
};

export default function Page() {
  return (
    <div className="mx-auto max-w-shell px-5 py-14 md:px-8 md:py-20">
      <div className="border-b border-line pb-10">
        <p className="eyebrow">Preguntas frecuentes</p>
        <h1 className="mt-3 max-w-2xl font-display text-display1">Todo lo que suelen preguntarnos.</h1>
      </div>

      <div className="mt-14 space-y-16">
        {faq.map((section) => (
          <section key={section.category} className="grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
            <h2 className="font-display text-display3 lg:sticky lg:top-24 lg:h-fit">{section.category}</h2>
            <div className="space-y-px bg-line">
              {section.items.map((item) => (
                <details key={item.q} className="group bg-ink px-1 py-5 md:px-5">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-primary marker:hidden">
                    <span className="text-[0.9375rem]">{item.q}</span>
                    <span className="mt-1 shrink-0 text-champagne transition-transform duration-200 group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">{item.a}</p>
                </details>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-20 flex flex-wrap items-center justify-between gap-6 border-t border-line pt-10">
        <p className="max-w-lg leading-relaxed text-muted">
          Si tu duda no está aquí, el concierge responde en minutos, también por teléfono.
        </p>
        <Button href="/contacto" variant="ghost">
          Hablar con el concierge
        </Button>
      </div>
    </div>
  );
}
