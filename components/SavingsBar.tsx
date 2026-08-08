import { eur } from "@/lib/format";

type Row = { label: string; value: number; unit?: string; accent?: boolean; note?: string };

export function SavingsBar({ rows, caption }: { rows: Row[]; caption?: string }) {
  const max = Math.max(...rows.map((r) => r.value));
  return (
    <div>
      <div className="space-y-3.5">
        {rows.map((r) => (
          <div key={r.label}>
            <div className="flex items-baseline justify-between gap-4">
              <span className="text-[0.8125rem] text-muted">{r.label}</span>
              <span className={`num text-[0.9375rem] ${r.accent ? "text-champagne" : "text-primary"}`}>
                {eur(r.value)} <span className="text-2xs text-faint">{r.unit ?? "€"}</span>
              </span>
            </div>
            <div className="mt-1.5 h-[3px] w-full bg-line/60 rounded-sm overflow-hidden">
              <div
                className={`h-full rounded-sm transition-[width] duration-700 ease-calm ${r.accent ? "bg-champagne" : "bg-faint"}`}
                style={{ width: `${Math.max(4, (r.value / max) * 100)}%` }}
              />
            </div>
            {r.note && <p className="mt-1 text-2xs text-faint">{r.note}</p>}
          </div>
        ))}
      </div>
      {caption && <p className="mt-4 text-2xs text-faint leading-relaxed">{caption}</p>}
    </div>
  );
}