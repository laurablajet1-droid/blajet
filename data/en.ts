// Traducción al inglés de los textos que viven en /data.
// Se aplica con los ayudantes de data/localize.ts, así el resto del código no cambia.

export const enCategories: Record<string, { name: string; baggage: string; note: string }> = {
  turboprop: { name: "Turboprop", baggage: "5 bags", note: "Short runways and airfields a jet cannot reach." },
  light: { name: "Light jet", baggage: "6 bags", note: "The workhorse of domestic hops and the Balearics." },
  midsize: { name: "Midsize", baggage: "9 bags", note: "Partial stand-up cabin. All of Europe non-stop." },
  supermid: { name: "Super midsize", baggage: "11 bags", note: "Stand-up cabin and full washroom. Short Atlantic." },
  heavy: { name: "Heavy", baggage: "16 bags", note: "Lounge, bedroom and cabin crew." },
  ultra: { name: "Ultra long range", baggage: "20 bags", note: "Madrid to Dubai or the west coast without stopping." },
};

export const enOperators: Record<
  string,
  { focus: string; emptyLegPolicy: string; cancellationPolicy: string; seatSalePolicy: string; coverage: string; strengths: string[] }
> = {
  "op-aerocruz": {
    focus: "Long haul and international routes out of Mexico",
    emptyLegPolicy: "Publishes its empty flights 72 hours ahead and refreshes availability every 15 minutes.",
    cancellationPolicy:
      "Passengers can cancel up to 2 hours before departure. If the operator cancels, the full amount becomes wallet credit.",
    seatSalePolicy: "Seat sales with passport and selfie verification for every passenger before the ticket is issued.",
    coverage: "Flies internationally out of Mexico — Latin America and the United States — but no domestic US flights.",
    strengths: ["Own and partner fleet", "Instant wallet credit", "Per-passenger identity checks"],
  },
  "op-meridien": {
    focus: "Midsize and heavy jets across the Alps, the French Riviera and the Balearics",
    emptyLegPolicy: "Repositions daily between Geneva, Nice, Ibiza and Olbia; publishes empty legs 48 hours ahead.",
    cancellationPolicy: "Free cancellation up to 24 hours before. Between 24 and 4 hours, 30 % is retained. After that, 100 %.",
    seatSalePolicy: "Whole aircraft only. It does not sell individual seats under its Swiss AOC.",
    coverage: "Continental Europe, the UK, North Africa and the Middle East.",
    strengths: ["Stand-up cabin across the fleet", "Cabin crew on flights over 2 h", "Priority slots at Geneva"],
  },
  "op-boreal": {
    focus: "Light jets and turboprops on domestic routes in Spain and Portugal",
    emptyLegPolicy: "Publishes empty legs as soon as the outbound flight is confirmed, usually 5 to 10 days ahead.",
    cancellationPolicy: "Full refund up to 48 hours before. After that, 70 % as credit valid for 12 months.",
    seatSalePolicy: "Seat sales on routes where local regulation allows it, with prior passenger identification.",
    coverage: "Mainland Spain, the Balearics, the Canaries, Portugal and southern France.",
    strengths: ["Access to small airfields", "Pets in the cabin", "Wheels up 4 h after confirmation"],
  },
};

export const enLegNotes: Record<string, string> = {
  "el-madrid-ibiza": "Repositioning after dropping passengers in Madrid. Departure flexible by ±90 min.",
  "el-ginebra-niza": "Whole aircraft only. Méridien does not sell individual seats under its Swiss AOC.",
  "el-palma-barcelona": "Leaving shortly. Check-in closes 20 minutes before take-off.",
  "el-cancun-miami": "International route. Passport and selfie verification required for every passenger.",
  "el-lebourget-madrid": "Returning to base after a corporate transfer. Hot catering included.",
  "el-olbia-milan": "End of season on the Costa Smeralda. Ground transfer at Linate included.",
  "el-mexico-cancun": "AeroCruz refreshes availability on this route every 15 minutes.",
  "el-farnborough-gva": "Whole aircraft with two washrooms and a rest area. Slot confirmed in Geneva.",
  "el-lisboa-madrid": "Turboprop with pets allowed in the cabin.",
};

export const enPools: Record<
  string,
  { rules: string[]; cancellation: string; bio: string; messages: { text: string; ago: string }[] }
> = {
  "pool-mad-ibz": {
    rules: ["One checked bag and one carry-on each", "No pets on this flight", "Meet at the executive terminal 45 min before"],
    cancellation:
      "Full refund up to 72 h before. If the pool does not reach 6 seats it is cancelled and everything is refunded automatically.",
    bio: "Organises the team transfer every August. Punctual and travels light.",
    messages: [
      { text: "We leave at 18:40 to land in daylight. Does anyone need a transfer to the port?", ago: "3 h ago" },
      { text: "We do, two of us. We'll sort it out there.", ago: "2 h ago" },
    ],
  },
  "pool-bcn-nce": {
    rules: ["Carry-on plus one checked bag", "We leave on the dot: the slot allows no delay"],
    cancellation: "Full refund up to 48 h before. After that, 70 % as wallet credit.",
    bio: "Flies to Nice for work twice a month and opens the flight when he can.",
    messages: [{ text: "Two seats left to confirm the flight. With five of us it works out at €2,380 each.", ago: "1 day ago" }],
  },
  "pool-gva-olb": {
    rules: ["Flight already confirmed: it departs with or without a full cabin", "No bulky luggage: the hold is loaded", "Cabin crew on board"],
    cancellation: "The flight is confirmed. Cancellation with refund up to 24 h before.",
    bio: "Leases the Challenger 350 for the season and shares the cost of the spare seats.",
    messages: [{ text: "Four seats left. The aircraft flies anyway, so whoever joins lowers everyone's cost.", ago: "5 h ago" }],
  },
  "pool-mex-mia": {
    rules: ["Passport verification required (international route)", "One checked bag per person"],
    cancellation:
      "If the pool does not reach 7 seats it is cancelled at no cost. If AeroCruz cancels, the amount becomes wallet credit.",
    bio: "Coordinates the sales team's transfer to the Miami trade show.",
    messages: [{ text: "We're at 5 of 10. Three more and the seat drops below €3,500.", ago: "8 h ago" }],
  },
};

export const enExtras: Record<string, { label: string; detail: string }> = {
  catering: { label: "Catering on board", detail: "Seasonal cold menu, or hot on flights over 2 h" },
  transfer: { label: "Ground transfer", detail: "Chauffeured saloon car at both ends" },
  pet: { label: "Pet in the cabin", detail: "Up to 20 kg, in an approved carrier" },
  wifi: { label: "Broadband wifi", detail: "Satellite connection for the whole cabin" },
  crew: { label: "Cabin crew", detail: "Full service throughout the flight" },
};

// Lo que incluye cada oferta y otros textos sueltos que se repiten.
export const enPhrases: Record<string, string> = {
  "Tasas y handling": "Taxes and handling",
  "Catering frío": "Cold catering",
  "Catering caliente": "Hot catering",
  "Transfer en destino": "Transfer on arrival",
  Wifi: "Wifi",
  Azafata: "Cabin crew",
  "Mejor precio": "Best price",
  "Avión más reciente": "Newest aircraft",
  "Wifi de banda ancha": "Broadband wifi",
  "Baño privado": "Private washroom",
  "Baño completo": "Full washroom",
  "Dos baños": "Two washrooms",
  "Zona de descanso": "Rest area",
  "Enchufes 220V": "220V power outlets",
  "Mascotas en cabina": "Pets in the cabin",
  "Wifi satelital": "Satellite wifi",
  Dormitorio: "Bedroom",
  "Cocina completa": "Full galley",
  Catering: "Catering",
  Completado: "Completed",
  Confirmado: "Confirmed",
  "Pendiente de completar": "Waiting to fill",
  Charter: "Charter",
  "Empty leg": "Empty leg",
  Pool: "Pool",
};

export const enMetrics = {
  takeRate: {
    "Charter a medida": "Bespoke charter",
    "Empty legs": "Empty legs",
    Pooling: "Pooling",
  } as Record<string, string>,
  funnel: {
    Visitas: { step: "Visits", note: "Last 30 days" },
    Registros: { step: "Sign-ups", note: "8.0 % of visits" },
    "KYC completado": { step: "KYC completed", note: "52.6 % of sign-ups" },
    "Solicitud o cotización": { step: "Request or quote", note: "46.4 % of verified users" },
    "Reserva pagada": { step: "Paid booking", note: "22.1 % of requests" },
  } as Record<string, { step: string; note: string }>,
  channels: {
    "Búsqueda de marca": "Brand search",
    "Paid social": "Paid social",
    "Referidos de miembros": "Member referrals",
    "Alianzas con operadores": "Operator partnerships",
  } as Record<string, string>,
  segments: {
    "Viajero premium": { segment: "Premium traveller", freq: "3.1 flights/year" },
    "Viajero aspiracional": { segment: "Aspirational traveller", freq: "2.4 flights/year" },
  } as Record<string, { segment: string; freq: string }>,
  marketplace: {
    "Operadores activos": "Active operators",
    "Empty legs publicados al mes": "Empty legs published per month",
    "Pools que se completan": "Pools that fill up",
    "Minutos hasta la primera cotización": "Minutes to the first quote",
  } as Record<string, string>,
  trust: {
    "Operadores en red": "Operators in the network",
    "Aeronaves disponibles": "Aircraft available",
    "Rutas cubiertas": "Routes covered",
    "Valoración media de vuelo": "Average flight rating",
  } as Record<string, string>,
};

export const enTiers: Record<string, { name: string; perk: string }> = {
  Miembro: { name: "Member", perk: "Access to the marketplace and open pools" },
  "Miembro Plus": { name: "Member Plus", perk: "Empty legs 6 h before everyone else" },
  "BlaJet Black": { name: "BlaJet Black", perk: "24/7 concierge, reduced commission and 24 h early access" },
};

export const enUser = {
  memberSince: "March 2024",
  verifiedOn: "12 March 2024",
  bookingDates: {
    "18 de junio de 2026": "18 June 2026",
    "2 de mayo de 2026": "2 May 2026",
  } as Record<string, string>,
  routes: {
    "Madrid → Ginebra": "Madrid → Geneva",
    "Niza → Ibiza": "Nice → Ibiza",
  } as Record<string, string>,
  alerts: {
    "Cualquier fecha": "Any date",
    "Fines de semana": "Weekends",
  } as Record<string, string>,
};

export const enCities: Record<string, string> = {
  "Ciudad de México": "Mexico City",
  Ginebra: "Geneva",
  Londres: "London",
  Milán: "Milan",
  Niza: "Nice",
  París: "Paris",
  Lisboa: "Lisbon",
  "Palma de Mallorca": "Palma de Mallorca",
  Dubái: "Dubai",
  Cancún: "Cancún",
  Málaga: "Málaga",
};
