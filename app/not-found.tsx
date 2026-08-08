import { Button } from "@/components/ui";
import { Silhouette } from "@/components/Silhouette";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-shell flex-col items-center px-5 py-30 text-center md:px-8">
      <Silhouette variant="jet" className="w-full max-w-sm opacity-60" />
      <p className="eyebrow mt-10">Error 404</p>
      <h1 className="mt-4 font-display text-display2">Esta ruta no existe.</h1>
      <p className="mt-4 max-w-md leading-relaxed text-muted">
        La página que buscas no está aquí, pero seguro que hay un avión que sí. Empieza por lo que hay volando esta
        semana.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button href="/empty-legs">Ver empty legs</Button>
        <Button href="/" variant="ghost">
          Volver al inicio
        </Button>
      </div>
    </div>
  );
}
