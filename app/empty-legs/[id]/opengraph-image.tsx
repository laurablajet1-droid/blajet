import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import path from "path";
import { emptyLegById, emptyLegs } from "@/data/emptyLegs";
import { airportByCode } from "@/data/airports";
import { aircraftById } from "@/data/aircraft";
import { ogFrame } from "@/components/OgFrame";
import { eur } from "@/lib/format";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Empty leg en BlaJet";

export function generateStaticParams() {
  return emptyLegs.map((l) => ({ id: l.id }));
}

export default async function Image({ params }: { params: { id: string } }) {
  const leg = emptyLegById(params.id);
  const fontData = await readFile(path.join(process.cwd(), "public/fonts/og-serif.ttf"));

  const frame = leg
    ? ogFrame({
        eyebrow: "Empty leg",
        route: [airportByCode(leg.from).city, airportByCode(leg.to).city] as [string, string],
        subtitle: `${aircraftById(leg.aircraftId).model} · ${leg.seatsLeft} de ${leg.seatsTotal} plazas libres`,
        stats: [
          { label: "Avión completo", value: `${eur(leg.priceWhole)} €` },
          ...(leg.priceSeat ? [{ label: "Por plaza", value: `${eur(leg.priceSeat)} €` }] : []),
          {
            label: "Frente al charter",
            value: `−${Math.round((1 - leg.priceWhole / leg.charterReference) * 100)} %`,
          },
        ],
      })
    : ogFrame({
        eyebrow: "Empty legs",
        title: "Aviones que ya tienen que volar.",
        stats: [{ label: "Ahorro", value: "hasta −60 %" }],
      });

  return new ImageResponse(frame, {
    ...size,
    fonts: [{ name: "OGSerif", data: fontData, style: "normal", weight: 400 }],
  });
}
