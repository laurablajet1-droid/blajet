export type Airport = {
  code: string;      // IATA
  icao: string;
  name: string;      // nombre del aeropuerto / FBO
  city: string;
  country: string;
  lat: number;       // usados por el mapa SVG (proyección simplificada)
  lng: number;
};

export const airports: Airport[] = [
  { code: "MAD", icao: "LEMD", name: "Adolfo Suárez Barajas · Terminal Ejecutiva", city: "Madrid", country: "España", lat: 40.47, lng: -3.56 },
  { code: "BCN", icao: "LEBL", name: "El Prat · Terminal Corporativa", city: "Barcelona", country: "España", lat: 41.29, lng: 2.08 },
  { code: "IBZ", icao: "LEIB", name: "Ibiza", city: "Ibiza", country: "España", lat: 38.87, lng: 1.37 },
  { code: "PMI", icao: "LEPA", name: "Son Sant Joan", city: "Palma de Mallorca", country: "España", lat: 39.55, lng: 2.73 },
  { code: "AGP", icao: "LEMG", name: "Costa del Sol", city: "Málaga", country: "España", lat: 36.67, lng: -4.49 },
  { code: "LIS", icao: "LPPT", name: "Humberto Delgado", city: "Lisboa", country: "Portugal", lat: 38.77, lng: -9.13 },
  { code: "LBG", icao: "LFPB", name: "Paris Le Bourget", city: "París", country: "Francia", lat: 48.97, lng: 2.44 },
  { code: "GVA", icao: "LSGG", name: "Ginebra · Área Ejecutiva", city: "Ginebra", country: "Suiza", lat: 46.24, lng: 6.11 },
  { code: "NCE", icao: "LFMN", name: "Niza Costa Azul", city: "Niza", country: "Francia", lat: 43.66, lng: 7.22 },
  { code: "FAB", icao: "EGLF", name: "London Farnborough", city: "Londres", country: "Reino Unido", lat: 51.28, lng: -0.78 },
  { code: "LIN", icao: "LIML", name: "Milán Linate Prime", city: "Milán", country: "Italia", lat: 45.45, lng: 9.28 },
  { code: "OLB", icao: "LIEO", name: "Olbia Costa Smeralda", city: "Olbia", country: "Italia", lat: 40.9, lng: 9.52 },
  { code: "MEX", icao: "MMMX", name: "Ciudad de México · FBO", city: "Ciudad de México", country: "México", lat: 19.44, lng: -99.07 },
  { code: "CUN", icao: "MMUN", name: "Cancún", city: "Cancún", country: "México", lat: 21.04, lng: -86.87 },
  { code: "MIA", icao: "KMIA", name: "Miami Opa-locka Executive", city: "Miami", country: "EE. UU.", lat: 25.79, lng: -80.29 },
  { code: "DXB", icao: "OMDW", name: "Dubái Al Maktoum · Terminal VIP", city: "Dubái", country: "EAU", lat: 24.9, lng: 55.16 },
];

export const airportByCode = (code: string) => airports.find((a) => a.code === code)!;

export const routeLabel = (from: string, to: string) =>
  `${airportByCode(from).city} → ${airportByCode(to).city}`;

// Distancia aproximada en km (haversine) — se usa para precios y CO2 coherentes.
export function distanceKm(from: string, to: string) {
  const a = airportByCode(from);
  const b = airportByCode(to);
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const la1 = (a.lat * Math.PI) / 180;
  const la2 = (b.lat * Math.PI) / 180;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(la1) * Math.cos(la2) * Math.sin(dLng / 2) ** 2;
  return Math.round(2 * R * Math.asin(Math.sqrt(h)));
}
