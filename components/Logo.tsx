export function Monogram({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect width="32" height="32" rx="4" fill="currentColor" opacity="0.08" />
      <path d="M8 22.5 L24 9.5" stroke="var(--c-champagne)" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M8 22.5 L13.5 22.5 L18.5 15 L13 15 Z" fill="currentColor" />
      <path d="M17 12.6 L24 9.5 L20.9 16.5 Z" fill="var(--c-champagne)" />
    </svg>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <Monogram />
      <span className="font-display text-[1.35rem] leading-none tracking-tight">
        Bla<span className="text-champagne">Jet</span>
      </span>
    </span>
  );
}