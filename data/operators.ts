export type Operator = {
  id: string;
  name: string;
  base: string;
  country: string;
  aoc: string;
  ownFleet: number;
  partnerFleet: number;
  rating: number;
  flightsYear: number;
  founded: number;
  monogram: string;
  focus: string;
  emptyLegPolicy: string;
  cancellationPolicy: string;
  seatSalePolicy: string;
  coverage: string;
  strengths: string[];
};

export const operators: Operator[] = [
  {
    id: "op-aerocruz",
    name: "AeroCruz Charter",
    base: "Ciudad de México (MMMX)",
    country: "México",
    aoc: "AOC MX-118-A",
    ownFleet: 13,
    partnerFleet: 26,
    rating: 4.8,
    flightsYear: 2140,
    founded: 2011,
    monogram: "AC",
    focus: "Larga distancia y rutas internacionales desde México",
    emptyLegPolicy: "Publica sus vuelos vacíos con 72 h de antelación y actualiza disponibilidad cada 15 minutos.",
    cancellationPolicy: "El pasajero puede cancelar hasta 2 h antes de la salida. Si cancela el operador, el importe pasa íntegro a crédito en el wallet.",
    seatSalePolicy: "Venta por asiento con verificación de pasaporte y selfie de cada pasajero antes de emitir el billete.",
    coverage: "Opera internacional desde México —LatAm y Estados Unidos— pero no vuelos domésticos dentro de EE. UU.",
    strengths: ["Flota propia + aliada", "Wallet con crédito inmediato", "Verificación KYC por pasajero"],
  },
  {
    id: "op-meridien",
    name: "Méridien Aviation",
    base: "Ginebra (LSGG) · Base de verano en Niza (LFMN)",
    country: "Suiza",
    aoc: "AOC CH-042",
    ownFleet: 9,
    partnerFleet: 14,
    rating: 4.9,
    flightsYear: 1680,
    founded: 2006,
    monogram: "MA",
    focus: "Midsize y heavy en el eje alpino, Costa Azul y Baleares",
    emptyLegPolicy: "Reposiciona diariamente entre Ginebra, Niza, Ibiza y Olbia; publica los vacíos con 48 h de antelación.",
    cancellationPolicy: "Cancelación gratuita hasta 24 h antes. Entre 24 h y 4 h, retiene el 30 %. Después, el 100 %.",
    seatSalePolicy: "Solo vuelo completo. No comercializa asientos sueltos en su AOC suizo.",
    coverage: "Europa continental, Reino Unido, Norte de África y Oriente Medio.",
    strengths: ["Cabina de pie en toda la flota", "Azafata en vuelos de más de 2 h", "Slots preferentes en LSGG"],
  },
  {
    id: "op-boreal",
    name: "Boreal Air Iberia",
    base: "Madrid (LEMD)",
    country: "España",
    aoc: "AOC ES-227",
    ownFleet: 6,
    partnerFleet: 8,
    rating: 4.7,
    flightsYear: 1290,
    founded: 2015,
    monogram: "BA",
    focus: "Light jets y turbohélice en rutas domésticas de España y Portugal",
    emptyLegPolicy: "Publica los vacíos en cuanto se confirma el vuelo de ida, normalmente con 5 a 10 días de antelación.",
    cancellationPolicy: "Cancelación con reembolso íntegro hasta 48 h antes. Después, crédito por el 70 % válido 12 meses.",
    seatSalePolicy: "Venta por asiento en rutas donde el marco regulatorio local lo permite, con identificación previa del pasajero.",
    coverage: "Península, Baleares, Canarias, Portugal y sur de Francia.",
    strengths: ["Acceso a aeródromos pequeños", "Mascotas en cabina", "Salida en 4 h desde la confirmación"],
  },
];

export const operatorById = (id: string) => operators.find((o) => o.id === id)!;