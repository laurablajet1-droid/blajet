import type { Lang } from "@/lib/lang";
import { enCategories, enCities, enExtras, enLegNotes, enOperators, enPhrases, enPools, enTiers, enUser } from "./en";
import type { CategorySpec } from "./aircraft";
import type { Operator } from "./operators";
import type { EmptyLeg } from "./emptyLegs";
import type { Pool } from "./pools";
import type { Extra } from "./quotes";

export const isEn = (lang: Lang) => lang === "en";

export const city = (name: string, lang: Lang) => (isEn(lang) ? enCities[name] ?? name : name);

/** Frases sueltas que se repiten en fichas y listados (amenidades, estados, distintivos). */
export const ph = (text: string, lang: Lang) => (isEn(lang) ? enPhrases[text] ?? text : text);

export function locCategory(c: CategorySpec, lang: Lang): CategorySpec {
  const en = enCategories[c.id];
  return isEn(lang) && en ? { ...c, ...en } : c;
}

export function locOperator(o: Operator, lang: Lang): Operator {
  const en = enOperators[o.id];
  return isEn(lang) && en ? { ...o, ...en } : o;
}

export function locLeg(l: EmptyLeg, lang: Lang): EmptyLeg {
  const note = enLegNotes[l.id];
  return isEn(lang) && note ? { ...l, note } : l;
}

export function locPool(p: Pool, lang: Lang): Pool {
  const en = enPools[p.id];
  if (!isEn(lang) || !en) return p;
  return {
    ...p,
    rules: en.rules,
    cancellation: en.cancellation,
    host: { ...p.host, bio: en.bio },
    messages: p.messages.map((m, i) => ({ ...m, text: en.messages[i]?.text ?? m.text, ago: en.messages[i]?.ago ?? m.ago })),
  };
}

export function locExtra(e: Extra, lang: Lang): Extra {
  const en = enExtras[e.id];
  return isEn(lang) && en ? { ...e, ...en } : e;
}

export function locTier(name: string, lang: Lang) {
  return isEn(lang) ? enTiers[name]?.name ?? name : name;
}

export function locPerk(name: string, perk: string, lang: Lang) {
  return isEn(lang) ? enTiers[name]?.perk ?? perk : perk;
}

export function locUserDate(d: string, lang: Lang) {
  return isEn(lang) ? enUser.bookingDates[d] ?? d : d;
}

export function locUserRoute(r: string, lang: Lang) {
  return isEn(lang) ? enUser.routes[r] ?? r : r;
}

export function locAlertWindow(w: string, lang: Lang) {
  return isEn(lang) ? enUser.alerts[w] ?? w : w;
}

export const memberSince = (lang: Lang, es: string) => (isEn(lang) ? enUser.memberSince : es);
export const verifiedOn = (lang: Lang, es: string) => (isEn(lang) ? enUser.verifiedOn : es);