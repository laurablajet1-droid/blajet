"use client";

import { useState } from "react";
import { Check, Share2 } from "lucide-react";
import { Button } from "./ui";
import { ui } from "@/i18n/es";
import { useT, type Str } from "@/lib/lang";

export function ShareButton({
  title,
  text,
  className = "",
  label,
}: {
  title: string;
  text: string;
  className?: string;
  label?: Str;
}) {
  const [done, setDone] = useState(false);
  const t = useT();

  const share = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      if (navigator.share) {
        await navigator.share({ title, text, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setDone(true);
      setTimeout(() => setDone(false), 2600);
    } catch {
      // El usuario ha cancelado el diálogo: no hay nada que resolver.
    }
  };

  return (
    <Button variant="ghost" size="sm" onClick={share} className={className}>
      {done ? (
        <>
          <Check size={14} strokeWidth={1.5} /> {t(ui.common.linkCopied)}
        </>
      ) : (
        <>
          <Share2 size={14} strokeWidth={1.5} /> {t(label ?? ui.common.share)}
        </>
      )}
    </Button>
  );
}
