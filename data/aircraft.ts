export type Category = "turboprop" | "light" | "midsize" | "supermid" | "heavy" | "ultra";

export type CategorySpec = {
  id: Category;
  name: string;
  seats: string;
  range: string;
  speed: string;
  baggage: string;
  note: string;
  eurPerKm: number;
  minPrice: number;
  co2PerKm: number;
};

export const categories: CategorySpec[] = [
  { id: "turboprop", name: "Turbohélice", seats: "6–8", range: "1.900 km", speed: "540 km/h", baggage: "5 maletas", note: "Pistas cortas y aeródromos que un jet no alcanza.", eurPerKm: 3.1, minPrice: 3200, co2PerKm: 0.42 },
  { id: "light", name: "Light jet", seats: "6–7", range: "3.000 km", speed: "780 km/h", baggage: "6 maletas", note: "El caballo de batalla del vuelo doméstico y las Baleares.", eurPerKm: 4.4, minPrice: 5400, co2PerKm: 0.61 },
  { id: "midsize", name: "Midsize", seats: "8–9", range: "4.400 km", speed: "830 km/h", baggage: "9 maletas", note: "Cabina de pie parcial. Europa entera sin escalas.", eurPerKm: 6.2, minPrice: 8900, co2PerKm: 0.86 },
  { id: "supermid", name: "Super midsize", seats: "9–10", range: "6.000 km", speed: "870 km/h", baggage: "11 maletas", note: "Cabina de pie y baño completo. Atlántico corto.", eurPerKm: 7.8, minPrice: 12500, co2PerKm: 1.05 },
  { id: "heavy", name: "Heavy", seats: "12–14", range: "7.400 km", speed: "890 km/h", baggage: "16 maletas", note: "Salón, dormitorio y tripulación de cabina.", eurPerKm: 10.4, minPrice: 21000, co2PerKm: 1.48 },
  { id: "ultra", name: "Ultra long range", seats: "14–16", range: "12.000 km", speed: "920 km/h", baggage: "20 maletas", note: "Sin escalas de Madrid a Dubái o a la costa oeste.", eurPerKm: 13.6, minPrice: 34000, co2PerKm: 1.92 },
];

export const categoryById = (id: Category) => categories.find((c) => c.id === id)!;

export type AircraftModel = {
  id: string;
  model: string;
  category: Category;
  year: number;
  registration: string;
  operatorId: string;
  seats: number;
  cabin: string;
  amenities: string[];
};

export const fleet: AircraftModel[] = [
  { id: "ac-1", model: "Cessna Citation CJ4", category: "light", year: 2019, registration: "EC-MZT", operatorId: "op-boreal", seats: 7, cabin: "1,45 m de altura · 5,10 m de largo", amenities: ["Wifi", "Catering frío", "Enchufes 220V"] },
  { id: "ac-2", model: "Embraer Phenom 300E", category: "light", year: 2021, registration: "EC-NKQ", operatorId: "op-boreal", seats: 7, cabin: "1,50 m de altura · 5,20 m de largo", amenities: ["Wifi", "Baño privado", "Catering frío"] },
  { id: "ac-3", model: "Bombardier Challenger 350", category: "supermid", year: 2020, registration: "HB-JXK", operatorId: "op-meridien", seats: 9, cabin: "1,83 m de altura · 7,68 m de largo", amenities: ["Wifi de banda ancha", "Baño completo", "Azafata", "Catering caliente"] },
  { id: "ac-4", model: "Gulfstream G450", category: "heavy", year: 2016, registration: "HB-JGV", operatorId: "op-meridien", seats: 13, cabin: "1,88 m de altura · 12,2 m de largo", amenities: ["Wifi", "Zona de descanso", "Azafata", "Dos baños"] },
  { id: "ac-5", model: "Cessna Citation XLS+", category: "midsize", year: 2018, registration: "XA-BLJ", operatorId: "op-aerocruz", seats: 9, cabin: "1,73 m de altura · 5,66 m de largo", amenities: ["Wifi", "Baño privado", "Catering"] },
  { id: "ac-6", model: "Bombardier Global 6000", category: "ultra", year: 2019, registration: "XA-GLB", operatorId: "op-aerocruz", seats: 14, cabin: "1,88 m de altura · 13,2 m de largo", amenities: ["Wifi satelital", "Dormitorio", "Azafata", "Cocina completa"] },
  { id: "ac-7", model: "Pilatus PC-12 NGX", category: "turboprop", year: 2022, registration: "EC-OPL", operatorId: "op-boreal", seats: 8, cabin: "1,47 m de altura · 5,16 m de largo", amenities: ["Enchufes 220V", "Catering frío", "Mascotas en cabina"] },
  { id: "ac-8", model: "Embraer Praetor 600", category: "supermid", year: 2022, registration: "XA-PRT", operatorId: "op-aerocruz", seats: 10, cabin: "1,83 m de altura · 8,14 m de largo", amenities: ["Wifi", "Baño completo", "Azafata"] },
  { id: "ac-9", model: "Dassault Falcon 2000LXS", category: "heavy", year: 2017, registration: "HB-JFX", operatorId: "op-meridien", seats: 12, cabin: "1,88 m de altura · 8,03 m de largo", amenities: ["Wifi", "Azafata", "Catering caliente"] },
];

export const aircraftById = (id: string) => fleet.find((a) => a.id === id)!;