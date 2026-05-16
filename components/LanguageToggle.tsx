"use client";

import { Languages } from "lucide-react";
import { useLanguage } from "./LanguageProvider";

type Props = {
  /** Visual variant. "light" suits white-ish backgrounds, "dark" suits dark sections (header top bar). */
  variant?: "light" | "dark";
  className?: string;
};

export function LanguageToggle({ variant = "light", className = "" }: Props) {
  const { lang, toggle, t } = useLanguage();

  const base =
    "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition focus:outline-none focus:ring-2 focus:ring-gold-500/40";
  const skin =
    variant === "dark"
      ? "border border-white/15 bg-white/5 text-emeraldDark-100 hover:bg-white/10"
      : "border border-emeraldDark-900/10 bg-white/70 text-emeraldDark-900 hover:bg-emeraldDark-50";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={t.meta.switchToOther}
      title={t.meta.switchToOther}
      className={`${base} ${skin} ${className}`}
    >
      <Languages className="h-3.5 w-3.5" aria-hidden />
      <span className={lang === "en" ? "" : "opacity-50"}>EN</span>
      <span aria-hidden className="opacity-30">
        |
      </span>
      <span
        className={lang === "fa" ? "font-farsi" : "font-farsi opacity-50"}
      >
        فا
      </span>
    </button>
  );
}
