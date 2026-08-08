import { Category, categoryById, fleet } from "./aircraft";
import { distanceKm } from "./airports";
import { operators } from "./operators";

export type Extra = { id: string; label: string; detail: string; price: number };

export const extras: Extra[] = [
  { id: "catering", label: "Catering a bordo", detail: "Menú frío de temporada o caliente en vuelos de más de 2 h", price: 340 },
  { id: "transfer", label: "Transfer en tierra", detail: "Berlina con conductor en origen y destino", price: 280 },
  { id: "pet", label: "Mascota en cabina", detail: "Hasta 20 kg, con transportín homologado", price: 190 },
  { id: "wifi", label: "Wifi de banda ancha", detail: "Conexión satelital para toda la cabina", price: 220 },
  { id: "crew", label: "Azafata de cabina", detail: "Servicio completo durante el vuelo", price: 620 },
];

export type Quote = {
  id: string;
  operatorId: string;
  aircraftId: string;
  model: string;
  year: number;
  registration: string;
  price: number;
  flightMin: number;
  seats: number;
  included: string[];
  responseMin: number;
  badge?: string;
};

// Genera tres cotizaciones comparables y deterministas para una misma solicitud.
export function buildQuotes(from: string, to: string, category: Category, pax: number, roundTrip: boolean): Quote[] {
  const km = distanceKm(from, to);
  const spec = categoryById(category);
  const base = Math.max(spec.minPrice, Math.round(km * spec.eurPerKm));
  const multiplier = roundTrip ? 1.86 : 1;

  const candidates = fleet.filter((a) => a.category === category);
  const pool = candidates.length >= 3 ? candidates : fleet.slice();

  const variants = [
    { delta: 0.94, responseMin: 4, badge: "Mejor precio", included: ["Tasas y handling", "Catering frío", "Wifi"] },
    { delta: 1.0, responseMin: 7, badge: undefined, included: ["Tasas y handling", "Catering frío", "Transfer en destino"] },
    { delta: 1.13, responseMin: 11, badge: "Avión más reciente", included: ["Tasas y handling", "Catering caliente", "Wifi", "Azafata"] },
  ];

  return variants.map((v, i) => {
    const ac = pool[(i + km) % pool.length];
    const op = operators.find((o) => o.id === ac.operatorId) ?? operators[i % operators.length];
    return {
      id: `q-${i + 1}`,
      operatorId: op.id,
      aircraftId: ac.id,
      model: ac.model,
      year: ac.year,
      registration: ac.registration,
      price: Math.round((base * v.delta * multiplier) / 100) * 100,
      flightMin: Math.round((km / (parseInt(spec.speed) || 800)) * 60 + 18) * (roundTrip ? 2 : 1),
      seats: ac.seats,
      included: v.included,
      responseMin: v.responseMin,
      badge: v.badge,
    };
  });
}

export function co2Kg(from: string, to: string, category: Category) {
  return Math.round(distanceKm(from, to) * categoryById(category).co2PerKm);
}