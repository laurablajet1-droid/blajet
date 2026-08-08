// Plantilla común de las imágenes de previsualización (WhatsApp, LinkedIn, X).
// Se usa desde los archivos opengraph-image.tsx, que corren en el servidor.
export function ogFrame({
  eyebrow,
  title,
  route,
  subtitle,
  stats,
}: {
  eyebrow: string;
  title?: string;
  // La flecha "→" no existe en la serif de las imágenes: la ruta se dibuja con una línea.
  route?: [string, string];
  subtitle?: string;
  stats: { label: string; value: string }[];
}) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#0A0B0F",
        color: "#F2F1ED",
        padding: 72,
        fontFamily: "OGSerif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 40, height: 40, borderRadius: 8, background: "#C9A961" }} />
          <div style={{ fontSize: 30, letterSpacing: -1 }}>BlaJet</div>
        </div>
        <div style={{ fontSize: 20, color: "#63666E", letterSpacing: 3, textTransform: "uppercase" }}>{eyebrow}</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        {route ? (
          <div style={{ display: "flex", alignItems: "center", gap: 28, fontSize: 78, letterSpacing: -2 }}>
            <div style={{ display: "flex" }}>{route[0]}</div>
            <div style={{ display: "flex", width: 68, height: 2, background: "#C9A961" }} />
            <div style={{ display: "flex" }}>{route[1]}</div>
          </div>
        ) : (
          <div style={{ fontSize: 78, lineHeight: 1.02, letterSpacing: -2, maxWidth: 980 }}>{title}</div>
        )}
        {subtitle && <div style={{ marginTop: 24, fontSize: 28, color: "#9A9DA6" }}>{subtitle}</div>}
      </div>

      <div style={{ display: "flex", gap: 64 }}>
        {stats.map((s) => (
          <div key={s.label} style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 18, color: "#63666E", letterSpacing: 2, textTransform: "uppercase" }}>{s.label}</div>
            <div style={{ marginTop: 8, fontSize: 34, color: "#C9A961" }}>{s.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}