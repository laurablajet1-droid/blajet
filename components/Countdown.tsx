"use client";

import { useEffect, useState } from "react";
import { countdownParts } from "@/lib/format";
import { useMounted } from "@/lib/useMounted";
import { Timer } from "lucide-react";

export function Countdown({ target, compact = false }: { target: Date; compact?: boolean }) {
  const mounted = useMounted();
  const [, force] = useState(0);

  useEffect(() => {
    const i = setInterval(() => force((n) => n + 1), 30000);
    return () => clearInterval(i);
  }, []);

  if (!mounted) return <span className="skeleton inline-block h-4 w-24 align-middle" />;

  const { days, hours, minutes, totalHours } = countdownParts(target);
  const tone =
    totalHours <= 6 ? "text-warn border-warn/50" : totalHours <= 24 ? "text-champagne border-champagne/45" : "text-muted border-line";

  const label = days > 0 ? `${days} d ${hours} h` : hours > 0 ? `${hours} h ${minutes} min` : `${minutes} min`;

  if (compact) return <span className={`num text-sm ${tone.split(" ")[0]}`}>{label}</span>;

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-sm border px-2 py-[3px] text-2xs uppercase tracking-[0.12em] ${tone}`}>
      <Timer size={12} strokeWidth={1.5} />
      <span className="num">sale en {label}</span>
    </span>
  );
}
