export const eur = (n: number) =>
  new Intl.NumberFormat("es-ES", { maximumFractionDigits: 0 }).format(Math.round(n));

/** Los importes se dejan siempre en formato europeo: la moneda es el euro. */

export const eurFull = (n: number) => `${eur(n)} €`;

export const num = (n: number, decimals = 0) =>
  new Intl.NumberFormat("es-ES", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(n);

export const minutesToHm = (m: number) => {
  const h = Math.floor(m / 60);
  const mm = m % 60;
  return h > 0 ? `${h} h ${mm.toString().padStart(2, "0")} min` : `${mm} min`;
};

export const dateFromNow = (hours: number) => new Date(Date.now() + hours * 3600 * 1000);

const loc = (lang?: string) => (lang === "en" ? "en-GB" : "es-ES");

export const formatDateTime = (d: Date, lang?: string) =>
  new Intl.DateTimeFormat(loc(lang), { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }).format(d);

export const formatDate = (d: Date, lang?: string) =>
  new Intl.DateTimeFormat(loc(lang), { weekday: "short", day: "numeric", month: "long" }).format(d);

export function countdownParts(target: Date) {
  const diff = Math.max(0, target.getTime() - Date.now());
  const totalMin = Math.floor(diff / 60000);
  return {
    days: Math.floor(totalMin / 1440),
    hours: Math.floor((totalMin % 1440) / 60),
    minutes: totalMin % 60,
    totalHours: diff / 3600000,
  };
}