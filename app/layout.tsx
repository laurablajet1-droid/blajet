import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { StoreProvider } from "@/lib/store";
import { LangProvider } from "@/lib/lang";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { DemoBar } from "@/components/DemoBar";

// Tipografías autoalojadas: el despliegue no depende de ningún servicio externo.
const display = localFont({
  src: "../public/fonts/Fraunces.ttf",
  variable: "--font-display",
  display: "swap",
  weight: "300 900",
  fallback: ["Georgia", "serif"],
});

const sans = localFont({
  src: "../public/fonts/InterVariable.woff2",
  variable: "--font-sans",
  display: "swap",
  weight: "100 900",
  fallback: ["system-ui", "sans-serif"],
});

// La URL base se toma del propio despliegue para que la imagen de las
// previsualizaciones (WhatsApp, LinkedIn) apunte siempre a un sitio que existe.
// El día que blajet.com sirva la app, basta con quitar la variable de entorno.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://blajet.com");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "BlaJet · El jet privado, por fin a tu alcance",
    template: "%s · BlaJet",
  },
  description:
    "Marketplace de aviación privada. Cotiza un charter a medida, caza un empty leg a precio de oportunidad o comparte vuelo con quien va a tu mismo destino.",
  openGraph: {
    title: "BlaJet · El jet privado, por fin a tu alcance",
    description:
      "Cotiza, caza un empty leg o comparte vuelo. Tres formas de volar en jet privado con operadores certificados.",
    url: siteUrl,
    siteName: "BlaJet",
    locale: "es_ES",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "BlaJet", description: "El jet privado, por fin a tu alcance." },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0B0F",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" data-theme="dark" className={`${display.variable} ${sans.variable}`}>
      <body className="font-sans antialiased">
        <LangProvider>
        <StoreProvider>
          <a
            href="#contenido"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-champagne focus:px-4 focus:py-2 focus:text-sm focus:text-[#0A0B0F]"
          >
            Saltar al contenido
          </a>
          <Header />
          <main id="contenido">{children}</main>
          <Footer />
          <DemoBar />
        </StoreProvider>
        </LangProvider>
      </body>
    </html>
  );
}