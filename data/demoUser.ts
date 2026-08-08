export const demoUser = {
  name: "Carlos M.",
  initials: "CM",
  tier: "BlaJet Black",
  memberSince: "marzo de 2024",
  wallet: 4820,
  miles: 18400,
  kyc: { passport: true, selfie: true, verifiedOn: "12 de marzo de 2024" },
  bookings: [
    { id: "bk-201", type: "Charter", route: "Madrid → Ginebra", date: "18 de junio de 2026", aircraft: "Challenger 350 · HB-JXK", total: 21400, status: "Completado" },
    { id: "bk-188", type: "Empty leg", route: "Niza → Ibiza", date: "2 de mayo de 2026", aircraft: "Phenom 300E · EC-NKQ", total: 5900, status: "Completado" },
  ],
  alerts: [
    { id: "al-1", route: "Madrid → Ibiza", window: "Cualquier fecha", maxPrice: 1500 },
    { id: "al-2", route: "Ginebra → Niza", window: "Fines de semana", maxPrice: 9000 },
  ],
};

export const milesTiers = [
  { name: "Miembro", threshold: 0, perk: "Acceso al marketplace y a los pools abiertos" },
  { name: "Miembro Plus", threshold: 10000, perk: "Empty legs 6 h antes que el resto" },
  { name: "BlaJet Black", threshold: 15000, perk: "Concierge 24/7, comisión reducida y acceso anticipado de 24 h" },
];
