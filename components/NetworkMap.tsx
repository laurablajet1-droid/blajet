"use client";

import { useState } from "react";
import { airports } from "@/data/airports";
import { emptyLegs } from "@/data/emptyLegs";
import { pools } from "@/data/pools";

// Proyección simple: no pretende ser un mapa geográfico, sino la red de la plataforma.
const W = 1000;
const H = 460;

const lngs = airports.map((a) => a.lng);
const lats = airports.map((a) => a.lat);
const minLng = Math.min(...lngs), maxLng = Math.max(...lngs);
const minLat = Math.min(...lats), maxLat = Math.max(...lats);

const px = (lng: number) => 60 + ((lng - minLng) / (maxLng - minLng)) * (W - 120);
const py = (lat: number) => H - 70 - ((lat - minLat) / (maxLat - minLat)) * (H - 150);

const legRoutes = emptyLegs.map((l) => ({ from: l.from, to: l.to, kind: "empty" as const, id: l.id }));
const poolRoutes = pools.map((p) => ({ from: p.from, to: p.to, kind: "pool" as const, id: p.id }));
const routes = [...legRoutes, ...poolRoutes];

export function NetworkMap() {
  const [hover, setHover] = useState<string | null>(null);

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Red de rutas activas de BlaJet">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M40 0 H0 V40" fill="none" stroke="var(--c-line)" strokeWidth="0.5" opacity="0.4" />
          </pattern>
        </defs>
        <rect width={W} height={H} fill="url(#grid)" />

        {routes.map((r, i) => {
          const x1 = px(airports.find((a) => a.code === r.from)!.lng);
          const y1 = py(airports.find((a) => a.code === r.from)!.lat);
          const x2 = px(airports.find((a) => a.code === r.to)!.lng);
          const y2 = py(airports.find((a) => a.code === r.to)!.lat);
          const cx = (x1 + x2) / 2;
          const cy = (y1 + y2) / 2 - Math.abs(x2 - x1) * 0.22 - 18;
          const active = hover === r.from || hover === r.to || hover === null;
          return (
            <path
              key={r.id}
              d={`M${x1} ${y1} Q${cx} ${cy} ${x2} ${y2}`}
              fill="none"
              stroke={r.kind === "pool" ? "var(--c-champagne)" : "var(--c-muted)"}
              strokeWidth={r.kind === "pool" ? 1.1 : 0.85}
              opacity={active ? (r.kind === "pool" ? 0.85 : 0.42) : 0.1}
              style={{ transition: "opacity 300ms ease" }}
              strokeDasharray="600"
              strokeDashoffset="600"
            >
              <animate attributeName="stroke-dashoffset" from="600" to="0" dur="2.2s" begin={`${i * 0.14}s`} fill="freeze" />
            </path>
          );
        })}

        {airports.map((a) => {
          const x = px(a.lng);
          const y = py(a.lat);
          const isHot = routes.some((r) => r.from === a.code || r.to === a.code);
          return (
            <g
              key={a.code}
              onMouseEnter={() => setHover(a.code)}
              onMouseLeave={() => setHover(null)}
              style={{ cursor: "default" }}
            >
              <circle cx={x} cy={y} r={isHot ? 3.4 : 2} fill={isHot ? "var(--c-champagne)" : "var(--c-faint)"} />
              {isHot && (
                <circle cx={x} cy={y} r="3.4" fill="none" stroke="var(--c-champagne)" strokeWidth="0.8" opacity="0.5">
                  <animate attributeName="r" values="3.4;11;3.4" dur="4s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.5;0;0.5" dur="4s" repeatCount="indefinite" />
                </circle>
              )}
              <text
                x={x}
                y={y - 10}
                fontSize="9.5"
                letterSpacing="1.3"
                textAnchor="middle"
                fill={hover === a.code ? "var(--c-text)" : "var(--c-faint)"}
              >
                {a.code}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-2xs uppercase tracking-[0.14em] text-faint">
        <span className="flex items-center gap-2">
          <span className="inline-block h-px w-6 bg-muted" /> Empty legs publicados
        </span>
        <span className="flex items-center gap-2">
          <span className="inline-block h-px w-6 bg-champagne" /> Pools abiertos
        </span>
      </div>
    </div>
  );
}