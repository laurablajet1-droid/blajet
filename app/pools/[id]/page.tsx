import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { pools, poolById } from "@/data/pools";
import { airportByCode } from "@/data/airports";
import PoolDetail from "./PoolDetail";

export function generateStaticParams() {
  return pools.map((p) => ({ id: p.id }));
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const p = poolById(params.id);
  if (!p) return { title: "Pool no disponible" };
  return {
    title: `${airportByCode(p.from).city} → ${airportByCode(p.to).city} · Pool`,
    description: "Comparte el coste de este vuelo. Cada plaza que entra baja el precio de todos.",
  };
}

export default function Page({ params }: { params: { id: string } }) {
  if (!poolById(params.id)) notFound();
  return <PoolDetail id={params.id} />;
}
