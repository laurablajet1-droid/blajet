"use client";

import { useEffect, useRef, useState } from "react";
import { num } from "@/lib/format";

export function Counter({
  to,
  decimals = 0,
  duration = 1100,
  className = "",
  startOnView = true,
}: {
  to: number;
  decimals?: number;
  duration?: number;
  className?: string;
  startOnView?: boolean;
}) {
  const [value, setValue] = useState(to);
  const [armed, setArmed] = useState(!startOnView);
  const ref = useRef<HTMLSpanElement>(null);
  const from = useRef(to);
  const first = useRef(true);

  useEffect(() => {
    if (!startOnView || armed) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setArmed(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [startOnView, armed]);

  useEffect(() => {
    if (!armed) return;
    const start = first.current ? 0 : from.current;
    first.current = false;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || start === to) {
      setValue(to);
      from.current = to;
      return;
    }
    const t0 = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(start + (to - start) * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
      else from.current = to;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, armed, duration]);

  return (
    <span ref={ref} className={`num ${className}`}>
      {num(value, decimals)}
    </span>
  );
}
