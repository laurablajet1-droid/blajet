"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { demoUser } from "@/data/demoUser";

export type Booking = {
  id: string;
  type: "Charter" | "Empty leg" | "Pool";
  route: string;
  date: string;
  aircraft: string;
  total: number;
  status: string;
};

export type Alert = { id: string; route: string; window: string; maxPrice: number };

type State = {
  demoMode: boolean;
  signedIn: boolean;
  wallet: number;
  miles: number;
  bookings: Booking[];
  alerts: Alert[];
  joinedPools: Record<string, number>;   // poolId -> plazas que ha tomado el usuario
  offers: Record<string, { amount: number; status: "pending" | "accepted" | "rejected" }>;
};

const initial: State = {
  demoMode: false,
  signedIn: false,
  wallet: 0,
  miles: 0,
  bookings: [],
  alerts: [],
  joinedPools: {},
  offers: {},
};

const demoState: State = {
  demoMode: true,
  signedIn: true,
  wallet: demoUser.wallet,
  miles: demoUser.miles,
  bookings: demoUser.bookings as Booking[],
  alerts: demoUser.alerts,
  joinedPools: { "pool-mad-ibz": 1 },
  offers: {},
};

type Ctx = State & {
  enableDemo: () => void;
  reset: () => void;
  addBooking: (b: Omit<Booking, "id">) => void;
  addAlert: (a: Omit<Alert, "id">) => void;
  removeAlert: (id: string) => void;
  joinPool: (poolId: string, seats: number) => void;
  leavePool: (poolId: string) => void;
  placeOffer: (legId: string, amount: number, floor: number) => Promise<"accepted" | "rejected">;
  spendWallet: (amount: number) => void;
};

const StoreContext = createContext<Ctx>(null as any);
const KEY = "blajet.state.v1";

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<State>(initial);

  useEffect(() => {
    try {
      // ?demo=1 siempre gana: es la puerta de entrada de la demostración en directo.
      const params = new URLSearchParams(window.location.search);
      if (params.get("demo") === "1") {
        setState(demoState);
        return;
      }
      const raw = window.localStorage.getItem(KEY);
      if (raw) setState({ ...initial, ...JSON.parse(raw) });
    } catch {
      /* almacenamiento no disponible: la demo sigue funcionando en memoria */
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      /* sin persistencia, sin drama */
    }
  }, [state]);

  const enableDemo = useCallback(() => setState({ ...demoState }), []);
  const reset = useCallback(() => {
    setState(initial);
    try { window.localStorage.removeItem(KEY); } catch {}
  }, []);

  const addBooking = useCallback((b: Omit<Booking, "id">) => {
    setState((s) => ({
      ...s,
      signedIn: true,
      miles: s.miles + Math.round(b.total),
      bookings: [{ ...b, id: `bk-${Math.random().toString(36).slice(2, 7)}` }, ...s.bookings],
    }));
  }, []);

  const addAlert = useCallback((a: Omit<Alert, "id">) => {
    setState((s) => ({ ...s, alerts: [{ ...a, id: `al-${Math.random().toString(36).slice(2, 7)}` }, ...s.alerts] }));
  }, []);

  const removeAlert = useCallback((id: string) => {
    setState((s) => ({ ...s, alerts: s.alerts.filter((a) => a.id !== id) }));
  }, []);

  const joinPool = useCallback((poolId: string, seats: number) => {
    setState((s) => ({ ...s, signedIn: true, joinedPools: { ...s.joinedPools, [poolId]: seats } }));
  }, []);

  const leavePool = useCallback((poolId: string) => {
    setState((s) => {
      const next = { ...s.joinedPools };
      delete next[poolId];
      return { ...s, joinedPools: next };
    });
  }, []);

  const placeOffer = useCallback((legId: string, amount: number, floor: number) => {
    setState((s) => ({ ...s, offers: { ...s.offers, [legId]: { amount, status: "pending" } } }));
    return new Promise<"accepted" | "rejected">((resolve) => {
      setTimeout(() => {
        const status = amount >= floor ? "accepted" : "rejected";
        setState((s) => ({ ...s, offers: { ...s.offers, [legId]: { amount, status } } }));
        resolve(status);
      }, 2600);
    });
  }, []);

  const spendWallet = useCallback((amount: number) => {
    setState((s) => ({ ...s, wallet: Math.max(0, s.wallet - amount) }));
  }, []);

  const value = useMemo(
    () => ({ ...state, enableDemo, reset, addBooking, addAlert, removeAlert, joinPool, leavePool, placeOffer, spendWallet }),
    [state, enableDemo, reset, addBooking, addAlert, removeAlert, joinPool, leavePool, placeOffer, spendWallet]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export const useStore = () => useContext(StoreContext);
