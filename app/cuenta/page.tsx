import type { Metadata } from "next";
import Account from "./Account";

export const metadata: Metadata = { title: "Mi cuenta", description: "Tus cotizaciones, reservas, pools, alertas y wallet." };

export default function Page() {
  return <Account />;
}
