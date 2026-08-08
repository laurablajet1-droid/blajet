// Diccionario de la interfaz. Cada entrada lleva las dos versiones juntas
// para que sea imposible traducir a medias: si falta el inglés, se ve al escribirlo.
import type { Str } from "@/lib/lang";

const s = (es: string, en: string): Str => ({ es, en });

export const ui = {
  nav: {
    quote: s("Cotizar", "Get a quote"),
    emptyLegs: s("Empty legs", "Empty legs"),
    pooling: s("Pooling", "Pooling"),
    howItWorks: s("Cómo funciona", "How it works"),
    black: s("Black", "Black"),
    account: s("Mi cuenta", "My account"),
    faq: s("Preguntas frecuentes", "FAQ"),
    investors: s("Inversores", "Investors"),
    operators: s("Para operadores", "For operators"),
    about: s("Sobre BlaJet", "About BlaJet"),
    contact: s("Contacto", "Contact"),
    legal: s("Aviso legal", "Legal notice"),
    privacy: s("Privacidad y cookies", "Privacy and cookies"),
    charter: s("Cotizar un charter", "Charter a jet"),
    membership: s("BlaJet Black", "BlaJet Black"),
  },
  common: {
    demoMode: s("Modo demo", "Demo mode"),
    restartDemo: s("Reiniciar demo", "Restart demo"),
    skip: s("Saltar al contenido", "Skip to content"),
    account: s("Mi cuenta", "My account"),
    openMenu: s("Abrir menú", "Open menu"),
    closeMenu: s("Cerrar menú", "Close menu"),
    toLight: s("Cambiar a modo claro", "Switch to light mode"),
    toDark: s("Cambiar a modo oscuro", "Switch to dark mode"),
    origin: s("Origen", "From"),
    destination: s("Destino", "To"),
    any: s("Cualquiera", "Any"),
    date: s("Fecha", "Date"),
    passengers: s("Pasajeros", "Passengers"),
    seats: s("Plazas", "Seats"),
    total: s("Total", "Total"),
    share: s("Compartir", "Share"),
    linkCopied: s("Enlace copiado", "Link copied"),
    filters: s("Filtros", "Filters"),
    clear: s("Limpiar", "Clear"),
    category: s("Categoría", "Category"),
    close: s("Cerrar", "Close"),
    back: s("Volver", "Back"),
    perSeat: s("€/plaza", "€/seat"),
    perAircraft: s("€/avión", "€/aircraft"),
    seatsWord: s("plazas", "seats"),
    seatWord: s("plaza", "seat"),
    of: s("de", "of"),
    operatedBy: s("Operado por", "Operated by"),
    cancellation: s("Cancelación", "Cancellation"),
    sortedByDeparture: s("Ordenados por salida más próxima", "Sorted by soonest departure"),
  },
  footer: {
    fly: s("Volar", "Fly"),
    platform: s("Plataforma", "Platform"),
    company: s("Compañía", "Company"),
    blurb: s(
      "Un marketplace de aviación privada. Tres formas de volar: contratar el avión entero, aprovechar un vuelo que ya está en el aire o compartir el coste con quien va a tu mismo destino.",
      "A private aviation marketplace. Three ways to fly: book the whole aircraft, catch a flight that is already going, or share the cost with someone heading to the same place."
    ),
    rights: s("Marketplace de aviación privada.", "Private aviation marketplace."),
    disclaimer: s(
      "BlaJet no explota aeronaves. Todos los vuelos los realizan operadores certificados con AOC en vigor. El pooling se ofrece bajo la modalidad de compartición de gastos conforme a la normativa aplicable en cada jurisdicción.",
      "BlaJet does not operate aircraft. All flights are performed by certified operators holding a current AOC. Pooling is offered as cost sharing in line with the regulation applicable in each jurisdiction."
    ),
  },
};

export type Ui = typeof ui;
