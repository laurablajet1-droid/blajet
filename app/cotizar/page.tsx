import { Suspense } from "react";
import { Metadata } from "next";
import QuoteFlow from "./QuoteFlow";
import { Skeleton } from "@/components/ui";

export const metadata: Metadata = {
  title: "Cotizar un charter",
  description: "Dinos tu ruta y recibe tres ofertas comparables de operadores certificados.",
};

export default function CotizarPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-shell px-5 py-20 md:px-8">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="mt-6 h-64 w-full" />
        </div>
      }
    >
      <QuoteFlow />
    </Suspense>
  );
}
