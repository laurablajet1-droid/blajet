export function Stepper({ steps, current }: { steps: string[]; current: number }) {
  return (
    <ol className="flex flex-wrap items-center gap-x-5 gap-y-2">
      {steps.map((s, i) => (
        <li key={s} className="flex items-center gap-2">
          <span
            className={`num text-2xs tracking-[0.16em] ${
              i === current ? "text-champagne" : i < current ? "text-muted" : "text-faint"
            }`}
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className={`text-2xs uppercase tracking-[0.14em] ${i === current ? "text-primary" : "text-faint"}`}>{s}</span>
          {i < steps.length - 1 && <span className="ml-3 h-px w-6 bg-line" />}
        </li>
      ))}
    </ol>
  );
}