"use client";

import { useEffect, useState } from "react";
import { Check, CreditCard, Lock, ShieldCheck, X } from "lucide-react";
import { Button, Badge } from "./ui";
import { eur } from "@/lib/format";
import { useStore } from "@/lib/store";
import type { Booking } from "@/lib/store";

export function Checkout({
  open,
  onClose,
  title,
  lines,
  total,
  booking,
  cta = "Confirmar y pagar",
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  lines: { label: string; value: number | string }[];
  total: number;
  booking: Omit<Booking, "id">;
  cta?: string;
}) {
  const { addBooking, wallet, spendWallet, demoMode } = useStore();
  const [stage, setStage] = useState<"form" | "processing" | "done">("form");
  const [useWallet, setUseWallet] = useState(false);
  const [name, setName] = useState(demoMode ? "Carlos M." : "");
  const [email, setEmail] = useState(demoMode ? "carlos.m@ejemplo.com" : "");
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setStage("form");
      setError("");
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const walletApplied = useWallet ? Math.min(wallet, total) : 0;
  const due = total - walletApplied;

  const pay = () => {
    if (!name.trim() || !email.includes("@")) {
      setError("Necesitamos un nombre y un email válido para emitir el billete.");
      return;
    }
    setError("");
    setStage("processing");
    setTimeout(() => {
      if (walletApplied > 0) spendWallet(walletApplied);
      addBooking({ ...booking, total });
      setStage("done");
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-6" role="dialog" aria-modal="true">
      <div className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-md border border-line bg-surface sm:rounded-md">
        <div className="flex items-center justify-between border-b border-line px-6 py-4">
          <p className="text-sm text-primary">{stage === "done" ? "Reserva confirmada" : title}</p>
          <button onClick={onClose} aria-label="Cerrar" className="text-muted transition-colors hover:text-primary">
            <X size={18} strokeWidth={1.5} />
          </button>
        </div>

        {stage === "done" ? (
          <div className="px-6 py-10 text-center">
            <span className="mx-auto grid h-12 w-12 place-items-center rounded-full border border-champagne/50 text-champagne">
              <Check size={20} strokeWidth={1.5} />
            </span>
            <h3 className="mt-5 font-display text-display3">Vuelo reservado</h3>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-muted">
              {booking.route} · {booking.date}. Te hemos enviado la confirmación y los datos de acceso a la terminal
              ejecutiva. Puedes verlo todo en tu cuenta.
            </p>
            <div className="mt-7 flex justify-center gap-3">
              <Button href="/cuenta">Ver en mi cuenta</Button>
              <Button variant="ghost" onClick={onClose}>
                Seguir mirando
              </Button>
            </div>
          </div>
        ) : (
          <div className="px-6 py-6">
            <div className="space-y-2.5">
              {lines.map((l) => (
                <div key={l.label} className="flex items-baseline justify-between gap-4 text-sm">
                  <span className="text-muted">{l.label}</span>
                  <span className="num text-primary">{typeof l.value === "number" ? `${eur(l.value)} €` : l.value}</span>
                </div>
              ))}
            </div>

            <div className="rule mt-4 flex items-baseline justify-between pt-4">
              <span className="text-sm text-muted">Total</span>
              <span className="num text-2xl">{eur(total)} <span className="text-xs text-muted">€</span></span>
            </div>

            {wallet > 0 && (
              <label className="mt-5 flex cursor-pointer items-start gap-3 rounded border border-line bg-raised px-4 py-3">
                <input
                  type="checkbox"
                  checked={useWallet}
                  onChange={(e) => setUseWallet(e.target.checked)}
                  className="mt-0.5 accent-[var(--c-champagne)]"
                />
                <span className="text-sm">
                  <span className="text-primary">Usar el crédito de mi wallet</span>
                  <span className="num mt-0.5 block text-2xs text-faint">Disponible: {eur(wallet)} €</span>
                </span>
              </label>
            )}

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <label className="block">
                <span className="eyebrow mb-2 block">Titular de la reserva</span>
                <input
                  className="h-11 w-full rounded border border-line bg-raised px-3 text-sm outline-none transition-colors focus:border-champagne"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nombre y apellido"
                />
              </label>
              <label className="block">
                <span className="eyebrow mb-2 block">Email</span>
                <input
                  className="h-11 w-full rounded border border-line bg-raised px-3 text-sm outline-none transition-colors focus:border-champagne"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                />
              </label>
            </div>

            <div className="mt-4 flex items-center gap-2.5 rounded border border-line bg-raised px-4 py-3">
              <CreditCard size={15} strokeWidth={1.5} className="text-muted" />
              <span className="num text-sm text-muted">•••• •••• •••• 4242</span>
              <Badge tone="neutral" className="ml-auto">Demo</Badge>
            </div>

            {error && <p className="mt-4 text-sm text-warn">{error}</p>}

            <Button size="lg" className="mt-5 w-full" onClick={pay} disabled={stage === "processing"}>
              {stage === "processing" ? "Procesando el pago…" : `${cta} · ${eur(due)} €`}
              {stage !== "processing" && <Lock size={14} strokeWidth={1.5} />}
            </Button>

            <p className="mt-3 flex items-center justify-center gap-1.5 text-2xs text-faint">
              <ShieldCheck size={12} strokeWidth={1.5} />
              Pago simulado. Ningún cargo real en esta demostración.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}