"use client";

import { useState } from "react";
import { Check, Mail, MessageCircle, Phone } from "lucide-react";
import { Button, Card, inputCls } from "@/components/ui";

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [error, setError] = useState("");

  const send = () => {
    if (!form.name.trim() || !form.email.includes("@") || form.message.trim().length < 5) {
      setError("Necesitamos tu nombre, un email válido y un par de líneas sobre lo que buscas.");
      return;
    }
    setError("");
    setSent(true);
  };

  return (
    <div className="mx-auto max-w-shell px-5 py-14 md:px-8 md:py-20">
      <div className="border-b border-line pb-10">
        <p className="eyebrow">Contacto</p>
        <h1 className="mt-3 max-w-2xl font-display text-display1">Cuéntanos qué necesitas.</h1>
      </div>

      <div className="mt-14 grid gap-14 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-20">
        <Card className="p-8">
          {sent ? (
            <div className="py-10 text-center">
              <span className="mx-auto grid h-12 w-12 place-items-center rounded-full border border-champagne/50 text-champagne">
                <Check size={20} strokeWidth={1.5} />
              </span>
              <h2 className="mt-5 font-display text-display3">Mensaje enviado</h2>
              <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-muted">
                Te responderemos en menos de dos horas en horario peninsular. Si es urgente, el teléfono del concierge
                está siempre abierto.
              </p>
              <Button variant="ghost" className="mt-6" onClick={() => { setSent(false); setForm({ name: "", email: "", message: "" }); }}>
                Escribir otro mensaje
              </Button>
            </div>
          ) : (
            <>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="eyebrow mb-2 block">Nombre</span>
                  <input className={inputCls} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Nombre y apellido" />
                </label>
                <label className="block">
                  <span className="eyebrow mb-2 block">Email</span>
                  <input className={inputCls} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="tu@email.com" />
                </label>
              </div>
              <label className="mt-5 block">
                <span className="eyebrow mb-2 block">Qué necesitas</span>
                <textarea
                  className={`${inputCls} h-32 resize-none py-3`}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Ruta, fechas aproximadas, cuántos sois y cualquier detalle que nos ayude."
                />
              </label>
              {error && <p className="mt-4 text-sm text-warn">{error}</p>}
              <Button size="lg" className="mt-6" onClick={send}>
                Enviar mensaje
              </Button>
            </>
          )}
        </Card>

        <aside className="space-y-8">
          {[
            { icon: Phone, title: "Concierge 24/7", body: "+34 900 000 000", note: "Prioridad para miembros Black." },
            { icon: Mail, title: "Correo", body: "hola@blajet.com", note: "Respuesta en menos de 2 h." },
            { icon: MessageCircle, title: "Operadores", body: "operadores@blajet.com", note: "Alta en la red sin coste ni exclusividad." },
          ].map((c) => (
            <div key={c.title} className="border-t border-line pt-5">
              <c.icon size={15} strokeWidth={1.5} className="text-muted" />
              <p className="mt-3 text-sm text-primary">{c.title}</p>
              <p className="num mt-1 text-sm text-champagne">{c.body}</p>
              <p className="mt-2 text-2xs text-faint">{c.note}</p>
            </div>
          ))}
        </aside>
      </div>
    </div>
  );
}
