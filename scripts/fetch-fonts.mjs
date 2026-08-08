// Descarga las tipografías del proyecto antes de compilar.
// Se ejecuta en el build (local y en Vercel) para no versionar binarios.
import { mkdir, writeFile, access } from "node:fs/promises";
import path from "node:path";

const DIR = path.join(process.cwd(), "public", "fonts");

const FONTS = [
  {
    file: "Fraunces.ttf",
    url: "https://raw.githubusercontent.com/undercasetype/Fraunces/master/fonts/variable/Fraunces%5BSOFT%2CWONK%2Copsz%2Cwght%5D.ttf",
  },
  {
    file: "InterVariable.woff2",
    url: "https://raw.githubusercontent.com/rsms/inter/master/docs/font-files/InterVariable.woff2",
  },
  {
    // Serif estática para la imagen Open Graph: satori no digiere fuentes variables.
    file: "og-serif.ttf",
    url: "https://raw.githubusercontent.com/google/fonts/main/ofl/ptserif/PT_Serif-Web-Regular.ttf",
  },
];

const exists = async (p) => {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
};

await mkdir(DIR, { recursive: true });

for (const f of FONTS) {
  const dest = path.join(DIR, f.file);
  if (await exists(dest)) {
    console.log(`· ${f.file} ya está descargada`);
    continue;
  }
  const res = await fetch(f.url);
  if (!res.ok) throw new Error(`No se pudo descargar ${f.file}: HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 10000) throw new Error(`${f.file} llegó vacía o corrupta`);
  await writeFile(dest, buf);
  console.log(`✓ ${f.file} (${Math.round(buf.length / 1024)} KB)`);
}
