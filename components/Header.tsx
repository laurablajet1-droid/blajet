"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, Sun, Moon, User } from "lucide-react";
import { Wordmark } from "./Logo";
import { useStore } from "@/lib/store";
import { ui } from "@/i18n/es";
import { useT } from "@/lib/lang";
import { LangSwitch } from "./LangSwitch";

// Se enciende cuando el inglés cubra todas las pantallas.
const SHOW_LANG_SWITCH = false;

const nav = [
  { href: "/cotizar", label: ui.nav.quote },
  { href: "/empty-legs", label: ui.nav.emptyLegs },
  { href: "/pools", label: ui.nav.pooling },
  { href: "/como-funciona", label: ui.nav.howItWorks },
  { href: "/black", label: ui.nav.black },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [scrolled, setScrolled] = useState(false);
  const { signedIn, demoMode } = useStore();
  const t = useT();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-ink/92 backdrop-blur-md border-b border-line" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-[68px] max-w-shell items-center justify-between px-5 md:px-8">
        <Link href="/" aria-label="BlaJet, inicio">
          <Wordmark />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={`text-[0.8125rem] tracking-wide transition-colors duration-200 hover:text-primary ${
                pathname.startsWith(n.href) ? "text-champagne" : "text-muted"
              }`}
            >
              {t(n.label)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          {SHOW_LANG_SWITCH && <LangSwitch className="mr-1" />}
          {demoMode && (
            <span className="hidden md:inline-flex items-center rounded-sm border border-champagne/45 px-2 py-1 text-2xs uppercase tracking-[0.14em] text-champagne">
              {t(ui.common.demoMode)}
            </span>
          )}
          <button
            onClick={toggleTheme}
            aria-label={theme === "dark" ? t(ui.common.toLight) : t(ui.common.toDark)}
            className="grid h-9 w-9 place-items-center rounded text-muted transition-colors hover:text-primary"
          >
            {theme === "dark" ? <Sun size={16} strokeWidth={1.5} /> : <Moon size={16} strokeWidth={1.5} />}
          </button>
          <Link
            href="/cuenta"
            aria-label={t(ui.common.account)}
            className="grid h-9 w-9 place-items-center rounded text-muted transition-colors hover:text-primary"
          >
            <User size={16} strokeWidth={1.5} />
          </Link>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? t(ui.common.closeMenu) : t(ui.common.openMenu)}
            aria-expanded={open}
            className="grid h-9 w-9 place-items-center rounded text-muted transition-colors hover:text-primary lg:hidden"
          >
            {open ? <X size={18} strokeWidth={1.5} /> : <Menu size={18} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-line bg-ink lg:hidden">
          <nav className="mx-auto max-w-shell px-5 py-3">
            {nav.concat([{ href: "/cuenta", label: ui.nav.account }, { href: "/faq", label: ui.nav.faq }]).map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="block border-b border-line/60 py-3.5 text-sm text-muted last:border-0 hover:text-primary"
              >
                {t(n.label)}
              </Link>
            ))}
          </nav>
        </div>
      )}
      {signedIn && !demoMode ? null : null}
    </header>
  );
}
