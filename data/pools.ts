import { Category } from "./aircraft";

export type PoolPassenger = {
  name: string;
  initials: string;
  verified: boolean;
  seats: number;
};

export type Pool = {
  id: string;
  kind: "charter" | "owner";     // pool creado sobre un charter | plazas cedidas por quien ya vuela
  from: string;
  to: string;
  category: Category;
  aircraftId: string;
  operatorId: string;
  hoursFromNow: number;
  durationMin: number;
  seatsTotal: number;
  seatsMin: number;              // umbral de confirmación del vuelo
  totalPrice: number;            // coste total del avión, se reparte entre los apuntados
  passengers: PoolPassenger[];
  host: { name: string; initials: string; rating: number; flights: number; verified: boolean; bio: string };
  rules: string[];
  cancellation: string;
  messages: { from: "host" | "member"; author: string; text: string; ago: string }[];
};

export const pools: Pool[] = [
  {
    id: "pool-mad-ibz", kind: "charter", from: "MAD", to: "IBZ", category: "midsize",
    aircraftId: "ac-5", operatorId: "op-boreal", hoursFromNow: 96, durationMin: 65,
    seatsTotal: 8, seatsMin: 6, totalPrice: 14800,
    passengers: [
      { name: "Elena R.", initials: "ER", verified: true, seats: 1 },
      { name: "Marc T.", initials: "MT", verified: true, seats: 2 },
      { name: "Sofía L.", initials: "SL", verified: false, seats: 1 },
    ],
    host: { name: "Elena R.", initials: "ER", rating: 4.9, flights: 11, verified: true, bio: "Organiza el traslado del equipo cada agosto. Puntual y sin equipaje voluminoso." },
    rules: ["Una maleta de bodega y un bulto de mano por persona", "Sin mascotas en este vuelo", "Encuentro en la terminal ejecutiva 45 min antes"],
    cancellation: "Reembolso íntegro hasta 72 h antes. Si el pool no alcanza las 6 plazas, se cancela y se devuelve todo automáticamente.",
    messages: [
      { from: "host", author: "Elena R.", text: "Salimos a las 18:40 para llegar con luz. ¿Alguien necesita transfer al puerto?", ago: "hace 3 h" },
      { from: "member", author: "Marc T.", text: "Nosotros sí, dos personas. Lo cuadramos allí.", ago: "hace 2 h" },
    ],
  },
  {
    id: "pool-bcn-nce", kind: "charter", from: "BCN", to: "NCE", category: "light",
    aircraftId: "ac-2", operatorId: "op-boreal", hoursFromNow: 140, durationMin: 75,
    seatsTotal: 7, seatsMin: 5, totalPrice: 11900,
    passengers: [
      { name: "Iker A.", initials: "IA", verified: true, seats: 1 },
      { name: "Nadia B.", initials: "NB", verified: true, seats: 1 },
    ],
    host: { name: "Iker A.", initials: "IA", rating: 4.7, flights: 6, verified: true, bio: "Viaja a Niza por trabajo dos veces al mes y abre el vuelo cuando puede." },
    rules: ["Equipaje de mano y una maleta facturada", "Salida en punto: el slot no admite retrasos"],
    cancellation: "Reembolso íntegro hasta 48 h antes. Después, crédito en wallet por el 70 %.",
    messages: [
      { from: "host", author: "Iker A.", text: "Quedan dos plazas para confirmar el vuelo. Si entramos cinco, sale a 2.380 € por persona.", ago: "hace 1 día" },
    ],
  },
  {
    id: "pool-gva-olb", kind: "owner", from: "GVA", to: "OLB", category: "supermid",
    aircraftId: "ac-3", operatorId: "op-meridien", hoursFromNow: 58, durationMin: 95,
    seatsTotal: 9, seatsMin: 1, totalPrice: 18900,
    passengers: [
      { name: "Familia Duarte", initials: "FD", verified: true, seats: 4 },
      { name: "Tomás V.", initials: "TV", verified: true, seats: 1 },
    ],
    host: { name: "Tomás V.", initials: "TV", rating: 5.0, flights: 24, verified: true, bio: "Arrienda el Challenger 350 toda la temporada y comparte gastos de las plazas libres." },
    rules: ["Vuelo ya confirmado: sale con o sin plazas llenas", "Sin equipaje voluminoso: la bodega va cargada", "Azafata a bordo"],
    cancellation: "El vuelo está confirmado. Cancelación con reembolso hasta 24 h antes.",
    messages: [
      { from: "host", author: "Tomás V.", text: "Quedan 4 plazas. El avión sale igualmente, así que lo que entre reduce el gasto de todos.", ago: "hace 5 h" },
    ],
  },
  {
    id: "pool-mex-mia", kind: "charter", from: "MEX", to: "MIA", category: "supermid",
    aircraftId: "ac-8", operatorId: "op-aerocruz", hoursFromNow: 190, durationMin: 195,
    seatsTotal: 10, seatsMin: 7, totalPrice: 32400,
    passengers: [
      { name: "Grupo Alcázar", initials: "GA", verified: true, seats: 3 },
      { name: "Paula M.", initials: "PM", verified: true, seats: 1 },
      { name: "Diego S.", initials: "DS", verified: false, seats: 1 },
    ],
    host: { name: "Paula M.", initials: "PM", rating: 4.8, flights: 9, verified: true, bio: "Coordina el traslado del equipo comercial a la feria de Miami." },
    rules: ["Verificación de pasaporte obligatoria (ruta internacional)", "Una maleta facturada por persona"],
    cancellation: "Si el pool no llega a 7 plazas se cancela sin coste. Si cancela AeroCruz, el importe pasa a crédito en el wallet.",
    messages: [
      { from: "host", author: "Paula M.", text: "Vamos por 5 de 10. Con tres más el asiento baja de 3.500 €.", ago: "hace 8 h" },
    ],
  },
];

export const poolById = (id: string) => pools.find((p) => p.id === id);

export const seatsTaken = (p: Pool) => p.passengers.reduce((s, x) => s + x.seats, 0);
export const pricePerSeat = (p: Pool, taken: number) => Math.round(p.totalPrice / Math.max(taken, 1));
