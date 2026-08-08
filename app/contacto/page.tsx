import type { Metadata } from "next";
import ContactForm from "./ContactForm";

export const metadata: Metadata = { title: "Contacto", description: "Escríbenos o habla con el concierge." };

export default function Page() {
  return <ContactForm />;
}
