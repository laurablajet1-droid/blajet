import { Category } from "./aircraft";

export type EmptyLeg = {
  id: string;
  from: string;
  to: string;
  operatorId: string;
  aircraftId: string;
  category: Category;
  hoursFromNow: number;
  durationMin: number;
  seatsTotal: number;
  seatsLeft: number;
  seatEligible: boolean;
  priceWhole: number;
  priceSeat: number | null;
  charterReference: number;
  acceptsOffers: boolean;
  offerFloor: number;
  note: string;
};

export const emptyLegs: EmptyLeg[] = [
  {
    id: "el-madrid-ibiza", from: "MAD", to: "IBZ", operatorId: "op-boreal", aircraftId: "ac-2",
    category: "light", hoursFromNow: 31, durationMin: 65, seatsTotal: 7, seatsLeft: 5,
    seatEligible: true, priceWhole: 6900, priceSeat: 1180, charterReference: 12400,
    acceptsOffers: true, offerFloor: 5900,
    note: "Reposiciona tras dejar pasaje en Madrid. Salida flexible ±90 min.",
  },
  {
    id: "el-ginebra-niza", from: "GVA", to: "NCE", operatorId: "op-meridien", aircraftId: "ac-3",
    category: "supermid", hoursFromNow: 9, durationMin: 55, seatsTotal: 9, seatsLeft: 9,
    seatEligible: false, priceWhole: 8400, priceSeat: null, charterReference: 17600,
    acceptsOffers: true, offerFloor: 7400,
    note: "Vuelo completo. Méridien no comercializa asientos sueltos en su AOC suizo.",
  },
  {
    id: "el-palma-barcelona", from: "PMI", to: "BCN", operatorId: "op-boreal", aircraftId: "ac-1",
    category: "light", hoursFromNow: 4, durationMin: 45, seatsTotal: 7, seatsLeft: 3,
    seatEligible: true, priceWhole: 4200, priceSeat: 690, charterReference: 8900,
    acceptsOffers: false, offerFloor: 0,
    note: "Salida inminente. Facturación cerrada 20 minutos antes del despegue.",
  },
  {
    id: "el-cancun-miami", from: "CUN", to: "MIA", operatorId: "op-aerocruz", aircraftId: "ac-8",
    category: "supermid", hoursFromNow: 52, durationMin: 105, seatsTotal: 10, seatsLeft: 6,
    seatEligible: true, priceWhole: 14800, priceSeat: 1950, charterReference: 27500,
    acceptsOffers: true, offerFloor: 12900,
    note: "Ruta internacional. Verificación de pasaporte y selfie obligatoria por pasajero.",
  },
  {
    id: "el-lebourget-madrid", from: "LBG", to: "MAD", operatorId: "op-meridien", aircraftId: "ac-9",
    category: "heavy", hoursFromNow: 76, durationMin: 130, seatsTotal: 12, seatsLeft: 12,
    seatEligible: false, priceWhole: 16900, priceSeat: null, charterReference: 33400,
    acceptsOffers: true, offerFloor: 14900,
    note: "Regreso de base tras traslado corporativo. Catering caliente incluido.",
  },
  {
    id: "el-olbia-milan", from: "OLB", to: "LIN", operatorId: "op-meridien", aircraftId: "ac-3",
    category: "supermid", hoursFromNow: 20, durationMin: 70, seatsTotal: 9, seatsLeft: 4,
    seatEligible: true, priceWhole: 7600, priceSeat: 1290, charterReference: 15900,
    acceptsOffers: true, offerFloor: 6600,
    note: "Fin de temporada en Costa Esmeralda. Traslado en tierra incluido en Linate.",
  },
  {
    id: "el-mexico-cancun", from: "MEX", to: "CUN", operatorId: "op-aerocruz", aircraftId: "ac-5",
    category: "midsize", hoursFromNow: 40, durationMin: 130, seatsTotal: 9, seatsLeft: 7,
    seatEligible: true, priceWhole: 11200, priceSeat: 1580, charterReference: 20800,
    acceptsOffers: true, offerFloor: 9800,
    note: "AeroCruz actualiza la disponibilidad de esta ruta cada 15 minutos.",
  },
  {
    id: "el-farnborough-gva", from: "FAB", to: "GVA", operatorId: "op-meridien", aircraftId: "ac-4",
    category: "heavy", hoursFromNow: 14, durationMin: 95, seatsTotal: 13, seatsLeft: 13,
    seatEligible: false, priceWhole: 15400, priceSeat: null, charterReference: 29800,
    acceptsOffers: false, offerFloor: 0,
    note: "Vuelo completo con dos baños y zona de descanso. Slot confirmado en Ginebra.",
  },
  {
    id: "el-lisboa-madrid", from: "LIS", to: "MAD", operatorId: "op-boreal", aircraftId: "ac-7",
    category: "turboprop", hoursFromNow: 62, durationMin: 90, seatsTotal: 8, seatsLeft: 6,
    seatEligible: true, priceWhole: 3400, priceSeat: 520, charterReference: 6400,
    acceptsOffers: true, offerFloor: 2900,
    note: "Turbohélice con mascotas admitidas en cabina.",
  },
];

export const emptyLegById = (id: string) => emptyLegs.find((e) => e.id === id);