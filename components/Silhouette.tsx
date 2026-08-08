// Dibujo de línea propio para cada categoría de aeronave: evita fotografía de stock
// y mantiene la paleta del sistema en toda la app.

type Props = { variant?: "jet" | "heavy" | "turboprop"; className?: string; accent?: boolean };

export function Silhouette({ variant = "jet", className = "", accent = false }: Props) {
  const stroke = accent ? "var(--c-champagne)" : "var(--c-muted)";
  const faint = "var(--c-line)";

  return (
    <svg viewBox="0 0 420 150" className={className} role="img" aria-label="Ilustración de aeronave" fill="none">
      <line x1="0" y1="118" x2="420" y2="118" stroke={faint} strokeWidth="1" />
      {/* fuselaje */}
      <path
        d="M62 96 C96 84 150 78 214 78 C270 78 316 82 348 90 C366 94 372 99 358 103 C330 110 268 114 206 114 C150 114 98 108 70 102 C60 100 56 98 62 96 Z"
        stroke={stroke}
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      {/* morro y cabina */}
      <path d="M330 92 C344 94 352 97 356 99" stroke={stroke} strokeWidth="1" />
      <path d="M300 86 L318 84 L330 90 L306 91 Z" stroke={stroke} strokeWidth="1" strokeLinejoin="round" />
      {/* ventanillas */}
      {[196, 214, 232, 250, 268].map((x) => (
        <circle key={x} cx={x} cy="90" r="2.4" stroke={stroke} strokeWidth="0.9" />
      ))}
      {/* cola */}
      <path
        d={variant === "heavy" ? "M78 96 L58 46 L86 46 L112 92" : "M76 96 L60 52 L84 52 L108 92"}
        stroke={stroke}
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path d="M60 52 L30 44 M60 52 L34 58" stroke={stroke} strokeWidth="1" />
      {/* ala */}
      <path
        d="M188 100 L134 128 L176 128 L232 104 Z"
        stroke={stroke}
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      {/* propulsión */}
      {variant === "turboprop" ? (
        <>
          <ellipse cx="196" cy="104" rx="9" ry="5" stroke={stroke} strokeWidth="1.1" />
          <path d="M196 88 L196 120" stroke={stroke} strokeWidth="1" />
          <path d="M186 96 L206 112 M186 112 L206 96" stroke={stroke} strokeWidth="0.8" opacity="0.7" />
        </>
      ) : (
        <>
          <rect x="104" y="80" width="34" height="16" rx="8" stroke={stroke} strokeWidth="1.2" />
          {variant === "heavy" && <rect x="112" y="98" width="28" height="13" rx="6.5" stroke={stroke} strokeWidth="1" opacity="0.55" />}
        </>
      )}
      {/* tren */}
      <path d="M300 114 L300 122 M170 114 L170 122 M158 114 L158 122" stroke={stroke} strokeWidth="1" />
      <circle cx="300" cy="124" r="2.6" stroke={stroke} strokeWidth="0.9" />
      <circle cx="170" cy="124" r="2.6" stroke={stroke} strokeWidth="0.9" />
      <circle cx="158" cy="124" r="2.6" stroke={stroke} strokeWidth="0.9" />
    </svg>
  );
}