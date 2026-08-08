import type { Metadata } from "next";
import Dashboard from "./Dashboard";

export const metadata: Metadata = {
  title: "Métricas de negocio",
  description: "GMV, take rate, funnel y unit economics del marketplace. Datos ilustrativos del modelo.",
  robots: { index: false },
};

export default function Page() {
  return <Dashboard />;
}
