"use client";

import Link from "next/link";
import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "ghost" | "quiet";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit";
};

const sizes = {
  sm: "h-9 px-3.5 text-[0.8125rem]",
  md: "h-11 px-5 text-sm",
  lg: "h-[52px] px-7 text-[0.9375rem]",
};

export function Button({ children, variant = "primary", size = "md", href, onClick, disabled, className = "", type = "button" }: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded font-medium transition-all duration-200 ease-calm disabled:opacity-40 disabled:cursor-not-allowed select-none";
  const styles = {
    primary:
      "bg-champagne text-[#0A0B0F] hover:bg-champagne-soft active:translate-y-px shadow-soft",
    ghost:
      "border border-line text-primary hover:border-champagne hover:text-champagne active:translate-y-px",
    quiet: "text-muted hover:text-primary",
  }[variant];
  const cls = `${base} ${sizes[size]} ${styles} ${className}`;

  if (href && !disabled) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls}>
      {children}
    </button>
  );
}

export function Badge({
  children,
  tone = "neutral",
  className = "",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "gold" | "good" | "warn";
  className?: string;
}) {
  const tones = {
    neutral: "border-line text-muted",
    gold: "border-champagne/45 text-champagne",
    good: "border-good/45 text-good",
    warn: "border-warn/50 text-warn",
  }[tone];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-sm border px-2 py-[3px] text-2xs uppercase tracking-[0.12em] ${tones} ${className}`}
    >
      {children}
    </span>
  );
}

export function Card({
  children,
  className = "",
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "article";
}) {
  const Tag = as as any;
  return (
    <Tag className={`border border-line bg-surface rounded-md transition-colors duration-200 ${className}`}>
      {children}
    </Tag>
  );
}

export function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="eyebrow block mb-2">{label}</span>
      {children}
      {hint && <span className="mt-1.5 block text-xs text-faint">{hint}</span>}
    </label>
  );
}

export const inputCls =
  "w-full h-11 rounded bg-raised border border-line px-3 text-sm text-primary placeholder:text-faint outline-none transition-colors duration-200 hover:border-faint focus:border-champagne";

export function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`skeleton ${className}`} />;
}

export function SectionHead({
  eyebrow,
  title,
  intro,
  className = "",
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="font-display text-display2 mt-3 max-w-2xl">{title}</h2>
      {intro && <p className="mt-4 max-w-xl text-muted leading-relaxed">{intro}</p>}
    </div>
  );
}

export function Empty({
  title,
  body,
  action,
}: {
  title: string;
  body: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="border border-dashed border-line rounded-md px-6 py-14 text-center">
      <h3 className="font-display text-display3">{title}</h3>
      <p className="mx-auto mt-3 max-w-md text-sm text-muted leading-relaxed">{body}</p>
      {action && <div className="mt-6 flex justify-center">{action}</div>}
    </div>
  );
}

export function Price({
  value,
  unit = "€",
  size = "md",
  strike,
  className = "",
}: {
  value: number | string;
  unit?: string;
  size?: "sm" | "md" | "lg" | "xl";
  strike?: boolean;
  className?: string;
}) {
  const s = {
    sm: "text-base",
    md: "text-2xl",
    lg: "text-[2.25rem]",
    xl: "text-[3rem]",
  }[size];
  return (
    <span className={`num inline-flex items-baseline gap-1.5 ${strike ? "line-through opacity-45" : ""} ${className}`}>
      <span className={`${s} leading-none font-medium`}>{value}</span>
      <span className="text-xs text-muted">{unit}</span>
    </span>
  );
}