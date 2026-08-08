import type { Metadata } from "next";
import OperatorPanel from "./OperatorPanel";

export const metadata: Metadata = {
  title: "Para operadores",
  description: "Publica tus empty legs, recibe solicitudes de cotización y llena las plazas que ibas a volar vacías.",
};

export default function Page() {
  return <OperatorPanel />;
}
