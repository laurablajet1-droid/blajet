import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import path from "path";
import { ogFrame } from "@/components/OgFrame";

export const runtime = "nodejs";
export const alt = "BlaJet · El jet privado, por fin a tu alcance";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  // La fuente se lee del propio proyecto: la generación no depende de la red.
  const fontData = await readFile(path.join(process.cwd(), "public/fonts/og-serif.ttf"));

  return new ImageResponse(
    ogFrame({
      eyebrow: "Aviación privada",
      title: "El jet privado, por fin a tu alcance.",
      subtitle: "Cotiza · Caza un empty leg · Comparte vuelo",
      stats: [
        { label: "Charter", value: "12.400 €" },
        { label: "Empty leg", value: "6.900 €" },
        { label: "Por plaza", value: "1.850 €" },
      ],
    }),
    {
      ...size,
      fonts: [{ name: "OGSerif", data: fontData, style: "normal", weight: 400 }],
    }
  );
}