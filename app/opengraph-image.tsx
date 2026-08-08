import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import path from "path";

export const runtime = "nodejs";
export const alt = "BlaJet · El jet privado, por fin a tu alcance";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  // La fuente se lee del propio proyecto: la generación no depende de la red.
  const fontData = await readFile(path.join(process.cwd(), "public/fonts/og-serif.ttf"));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0A0B0F",
          color: "#F2F1ED",
          padding: 72,
          fontFamily: "OGSerif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 44, height: 44, borderRadius: 8, background: "#C9A961" }} />
          <div style={{ fontSize: 34, letterSpacing: -1 }}>BlaJet</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 82, lineHeight: 1.02, letterSpacing: -2, maxWidth: 940 }}>
            El jet privado, por fin a tu alcance.
          </div>
          <div style={{ marginTop: 28, fontSize: 30, color: "#9A9DA6" }}>
            Cotiza · Caza un empty leg · Comparte vuelo
          </div>
        </div>

        <div style={{ display: "flex", gap: 56, fontSize: 24, color: "#C9A961" }}>
          <div style={{ display: "flex" }}>12.400 € charter</div>
          <div style={{ display: "flex" }}>6.900 € empty leg</div>
          <div style={{ display: "flex" }}>1.850 € por plaza</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "OGSerif", data: fontData, style: "normal", weight: 400 }],
    }
  );
}
