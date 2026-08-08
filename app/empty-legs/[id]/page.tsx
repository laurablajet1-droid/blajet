import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { emptyLegs, emptyLegById } from "@/data/emptyLegs";
import { airportByCode } from "@/data/airports";
import LegDetail from "./LegDetail";

export function generateStaticParams() {
  return emptyLegs.map((l) => ({ id: l.id }));
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const leg = emptyLegById(params.id);
  if (!leg) return { title: "Vuelo no disponible" };
  return {
    title: `${airportByCode(leg.from).city} → ${airportByCode(leg.to).city} · Empty leg`,
    description: `Empty leg operado por un socio certificado. Vuelo completo o plaza suelta donde la normativa lo permite.`,
  };
}

export default function Page({ params }: { params: { id: string } }) {
  const leg = emptyLegById(params.id);
  if (!leg) notFound();
  return <LegDetail id={params.id} />;
}
