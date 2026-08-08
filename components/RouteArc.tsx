import { airportByCode } from "@/data/airports";
import { minutesToHm } from "@/lib/format";

export function RouteArc({
  from,
  to,
  durationMin,
  className = "",
}: {
  from: string;
  to: string;
  durationMin: number;
  className?: string;
}) {
  const a = airportByCode(from);
  const b = airportByCode(to);
  return (
    <div className={className}>
      <svg viewBox="0 0 320 74" className="w-full" role="img" aria-label={`Ruta ${a.city} a ${b.city}`}>
        <path d="M18 56 Q160 2 302 56" fill="none" stroke="var(--c-line)" strokeWidth="1" strokeDasharray="3 4" />
        <path d="M18 56 Q160 2 302 56" fill="none" stroke="var(--c-champagne)" strokeWidth="1.2" strokeDasharray="420" strokeDashoffset="420">
          <animate attributeName="stroke-dashoffset" from="420" to="0" dur="1.6s" fill="freeze" />
        </path>
        <circle cx="18" cy="56" r="3.5" fill="var(--c-champagne)" />
        <circle cx="302" cy="56" r="3.5" fill="none" stroke="var(--c-champagne)" strokeWidth="1.2" />
        <text x="18" y="72" fill="var(--c-muted)" fontSize="10" textAnchor="start" letterSpacing="1.4">{a.code}</text>
        <text x="302" y="72" fill="var(--c-muted)" fontSize="10" textAnchor="end" letterSpacing="1.4">{b.code}</text>
        <text x="160" y="22" fill="var(--c-faint)" fontSize="9.5" textAnchor="middle" letterSpacing="1.2">
          {minutesToHm(durationMin).toUpperCase()}
        </text>
      </svg>
    </div>
  );
}
