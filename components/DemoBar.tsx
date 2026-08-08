"use client";

import { useRouter } from "next/navigation";
import { RotateCcw } from "lucide-react";
import { useStore } from "@/lib/store";
import { ui } from "@/i18n/es";
import { useT } from "@/lib/lang";

// Control flotante para rearrancar la demostración sin salir de la pantalla.
export function DemoBar() {
  const { demoMode, enableDemo } = useStore();
  const router = useRouter();
  const t = useT();

  if (!demoMode) return null;

  const restart = () => {
    enableDemo();
    router.push("/");
    window.scrollTo({ top: 0 });
  };

  return (
    <div className="fixed bottom-4 right-4 z-[55] flex items-center gap-2 rounded-md border border-line bg-surface/95 px-3 py-2 shadow-lift backdrop-blur-sm">
      <span className="hidden text-2xs uppercase tracking-[0.14em] text-champagne sm:inline">{t(ui.common.demoMode)}</span>
      <button
        onClick={restart}
        className="inline-flex items-center gap-1.5 rounded-sm border border-line px-2.5 py-1.5 text-2xs text-muted transition-colors hover:border-champagne hover:text-champagne"
      >
        <RotateCcw size={12} strokeWidth={1.5} />
        {t(ui.common.restartDemo)}
      </button>
    </div>
  );
}
