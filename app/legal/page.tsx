import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aviso legal, privacidad y cookies",
  description: "Condiciones de uso de la plataforma, tratamiento de datos y política de cookies.",
};

const sections = [
  {
    id: "aviso",
    title: "Aviso legal",
    blocks: [
      ["Qué es BlaJet", "BlaJet es una plataforma de intermediación que pone en contacto a personas que quieren volar con operadores aéreos certificados. BlaJet no explota aeronaves, no dispone de AOC y no asume la condición de transportista. El contrato de transporte se celebra siempre entre el pasajero y el operador titular del certificado."],
      ["Responsabilidad del vuelo", "La operación, la seguridad, la tripulación, el mantenimiento y el cumplimiento normativo corresponden al operador. BlaJet verifica su certificación y su cobertura de seguro antes de admitirlo en la red y revisa esa documentación periódicamente."],
      ["Precios y disponibilidad", "Los precios publicados los fija cada operador y pueden variar hasta el momento de la confirmación, especialmente en vuelos vacíos, cuya disponibilidad cambia por hora. Una oferta aceptada queda bloqueada durante el plazo indicado en la propia oferta."],
      ["Venta por asiento", "La comercialización de asientos individuales solo se ofrece en los vuelos expresamente marcados como elegibles, y únicamente en las jurisdicciones donde el marco regulatorio y la licencia del operador lo permiten."],
      ["Pooling", "El pooling se ofrece bajo la modalidad de compartición de gastos conforme a la normativa aplicable en cada jurisdicción. La persona que abre un pool no obtiene beneficio económico: reparte el coste del vuelo entre los pasajeros que se suman."],
    ],
  },
  {
    id: "privacidad",
    title: "Privacidad",
    blocks: [
      ["Qué datos tratamos", "Datos de identificación y contacto, documentación de identidad cuando la ruta o la modalidad lo exigen, historial de reservas y datos de pago procesados por nuestro proveedor certificado. No almacenamos números completos de tarjeta."],
      ["Para qué los usamos", "Para gestionar reservas, transmitir al operador la información que necesita para emitir el billete, cumplir obligaciones de verificación de pasajeros y mejorar el servicio. No vendemos datos a terceros."],
      ["Con quién los compartimos", "Únicamente con el operador que realiza tu vuelo, con las autoridades cuando la normativa lo exige y con los proveedores tecnológicos necesarios para prestar el servicio, sujetos a contrato de encargo."],
      ["Tus derechos", "Puedes acceder, rectificar, suprimir, limitar y portar tus datos, así como oponerte a determinados tratamientos, escribiendo a privacidad@blajet.com. También puedes reclamar ante la autoridad de control competente."],
    ],
  },
  {
    id: "cookies",
    title: "Cookies",
    blocks: [
      ["Cookies necesarias", "Mantienen tu sesión, tus filtros de búsqueda y el contenido de una reserva en curso. Sin ellas la plataforma no funciona, y por eso no requieren consentimiento."],
      ["Cookies de medición", "Nos dicen qué páginas se usan y dónde se abandona una reserva, siempre de forma agregada. Puedes rechazarlas sin perder ninguna funcionalidad."],
      ["Cómo gestionarlas", "Puedes cambiar tu elección en cualquier momento desde el pie de página o borrarlas desde tu navegador."],
    ],
  },
];

export default function Page() {
  return (
    <div className="mx-auto max-w-shell px-5 py-14 md:px-8 md:py-20">
      <div className="border-b border-line pb-10">
        <p className="eyebrow">Legal</p>
        <h1 className="mt-3 max-w-2xl font-display text-display1">Las reglas, en claro.</h1>
      </div>

      <div className="mt-14 space-y-16">
        {sections.map((s) => (
          <section key={s.id} id={s.id} className="grid gap-8 scroll-mt-24 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
            <h2 className="font-display text-display3 lg:sticky lg:top-24 lg:h-fit">{s.title}</h2>
            <div className="max-w-2xl space-y-8">
              {s.blocks.map(([t, b]) => (
                <div key={t} className="border-b border-line pb-8 last:border-0">
                  <h3 className="text-sm text-primary">{t}</h3>
                  <p className="mt-3 leading-relaxed text-muted">{b}</p>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
