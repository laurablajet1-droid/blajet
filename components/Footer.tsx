"use client";

import Link from "next/link";
import { Monogram } from "./Logo";
import { ui } from "@/i18n/es";
import { useT } from "@/lib/lang";

const groups = [
  {
    title: ui.footer.fly,
    links: [
      { href: "/cotizar", label: ui.nav.charter },
      { href: "/empty-legs", label: ui.nav.emptyLegs },
      { href: "/pools", label: ui.nav.pooling },
      { href: "/black", label: ui.nav.membership },
    ],
  },
  {
    title: ui.footer.platform,
    links: [
      { href: "/como-funciona", label: ui.nav.howItWorks },
      { href: "/operadores", label: ui.nav.operators },
      { href: "/faq", label: ui.nav.faq },
      { href: "/investors", label: ui.nav.investors },
    ],
  },
  {
    title: ui.footer.company,
    links: [
      { href: "/nosotros", label: ui.nav.about },
      { href: "/contacto", label: ui.nav.contact },
      { href: "/legal", label: ui.nav.legal },
      { href: "/legal#privacidad", label: ui.nav.privacy },
    ],
  },
];

export function Footer() {
  const t = useT();
  return (
    <footer className="mt-30 border-t border-line">
      <div className="mx-auto max-w-shell px-5 py-16 md:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Monogram size={32} />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
              {t(ui.footer.blurb)}
            </p>
          </div>
          {groups.map((g) => (
            <div key={g.title.es}>
              <p className="eyebrow">{t(g.title)}</p>
              <ul className="mt-4 space-y-2.5">
                {g.links.map((l) => (
                  <li key={l.href + l.label.es}>
                    <Link href={l.href} className="text-sm text-muted transition-colors hover:text-primary">
                      {t(l.label)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="rule mt-14 pt-6 flex flex-col gap-3 text-xs text-faint md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} BlaJet. {t(ui.footer.rights)} blajet.com</p>
          <p className="max-w-xl md:text-right">
            {t(ui.footer.disclaimer)}
          </p>
        </div>
      </div>
    </footer>
  );
}