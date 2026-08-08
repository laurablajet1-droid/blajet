import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import path from "path";
import { poolById, pools, seatsTaken } from "@/data/pools";
import { airportByCode } from "@/data/airports";
import { aircraftById } from "@/data/aircraft";
import { ogFrame } from "@/components/OgFrame";
import { eur } from "@/lib/format";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Pool en BlaJet";

export function generateStaticParams() {
  return pools.map((p) => ({ id: p.id }));
}

export default async function Image({ params }: { params: { id: string } }) {
  const pool = poolById(params.id);
  const fontData = await readFile(path.join(process.cwd(), "public/fonts/og-serif.ttf"));

  const frame = pool
    ? (() => {
        const taken = seatsTaken(pool);
        const price = Math.round(pool.totalPrice / Math.max(taken, pool.kind === "charter" ? pool.seatsMin : 1));
        return ogFrame({
          eyebrow: "Pool abierto",
          route: [airportByCode(pool.from).city, airportByCode(pool.to).city] as [string, string],
          subtitle: `${aircraftById(pool.aircraftId).model} · ${taken} de ${pool.seatsTotal} plazas ocupadas`,
          stats: [
            { label: "Por plaza ahora", value: `${eur(price)} €` },
            { label: "Avión completo", value: `${eur(pool.totalPrice)} €` },
            {
              label: pool.kind === "charter" ? "Se confirma en" : "Estado",
              value: pool.kind === "charter" ? `${pool.seatsMin} plazas` : "Vuelo confirmado",
            },
          ],
        });
      })()
    : ogFrame({
        eyebrow: "Pooling",
        title: "Comparte jet, comparte gastos.",
        stats: [{ label: "Cada plaza que entra", value: "baja el precio de todos" }],
      });

  return new ImageResponse(frame, {
    ...size,
    fonts: [{ name: "OGSerif", data: fontData, style: "normal", weight: 400 }],
  });
}
