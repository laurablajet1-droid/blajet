// Datos ilustrativos del modelo de negocio. Coherentes con los precios y operadores de la app.

export const gmvMonthly = [
  { month: "sep 25", charter: 410, empty: 128, pooling: 22 },
  { month: "oct 25", charter: 438, empty: 141, pooling: 31 },
  { month: "nov 25", charter: 402, empty: 154, pooling: 44 },
  { month: "dic 25", charter: 512, empty: 186, pooling: 58 },
  { month: "ene 26", charter: 468, empty: 173, pooling: 67 },
  { month: "feb 26", charter: 495, empty: 191, pooling: 84 },
  { month: "mar 26", charter: 548, empty: 214, pooling: 103 },
  { month: "abr 26", charter: 601, empty: 246, pooling: 132 },
  { month: "may 26", charter: 664, empty: 283, pooling: 168 },
  { month: "jun 26", charter: 742, empty: 331, pooling: 214 },
  { month: "jul 26", charter: 868, empty: 402, pooling: 276 },
  { month: "ago 26", charter: 921, empty: 447, pooling: 318 },
];

export const takeRate = [
  { modality: "Charter a medida", rate: 8, ticket: 18400, revenueMonth: 73.7 },
  { modality: "Empty legs", rate: 12, ticket: 7900, revenueMonth: 53.6 },
  { modality: "Pooling", rate: 15, ticket: 2450, revenueMonth: 47.7 },
];

export const funnel = [
  { step: "Visitas", value: 148200, note: "Últimos 30 días" },
  { step: "Registros", value: 11856, note: "8,0 % de las visitas" },
  { step: "KYC completado", value: 6231, note: "52,6 % de los registros" },
  { step: "Solicitud o cotización", value: 2894, note: "46,4 % de los verificados" },
  { step: "Reserva pagada", value: 641, note: "22,1 % de las solicitudes" },
];

export const unitEconomics = [
  { channel: "Búsqueda de marca", cac: 82, share: "31 %" },
  { channel: "Paid social", cac: 214, share: "38 %" },
  { channel: "Referidos de miembros", cac: 46, share: "18 %" },
  { channel: "Alianzas con operadores", cac: 128, share: "13 %" },
];

export const segments = [
  { segment: "Viajero premium", ltv: 9840, cac: 186, ticket: 18400, freq: "3,1 vuelos/año" },
  { segment: "Viajero aspiracional", ltv: 1420, cac: 94, ticket: 2450, freq: "2,4 vuelos/año" },
];

export const marketplace = [
  { label: "Operadores activos", value: 38, suffix: "" },
  { label: "Empty legs publicados al mes", value: 412, suffix: "" },
  { label: "Pools que se completan", value: 63, suffix: " %" },
  { label: "Minutos hasta la primera cotización", value: 7, suffix: "" },
];

export const trust = [
  { label: "Operadores en red", value: 38 },
  { label: "Aeronaves disponibles", value: 214 },
  { label: "Rutas cubiertas", value: 690 },
  { label: "Valoración media de vuelo", value: 4.8, decimals: 1 },
];
