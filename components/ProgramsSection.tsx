"use client";

import {
  BookOpen,
  CalendarHeart,
  GraduationCap,
  Moon,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react";
import { useLanguage } from "./LanguageProvider";

type Accent = "emerald" | "royal" | "gold";

const ICONS: LucideIcon[] = [
  CalendarHeart,
  BookOpen,
  GraduationCap,
  Users,
  Moon,
  Sparkles,
];

const ACCENTS: Accent[] = ["emerald", "gold", "royal", "emerald", "gold", "royal"];

const ACCENT_STYLES: Record<Accent, string> = {
  emerald:
    "from-emeraldDark-50 to-emeraldDark-100 text-emeraldDark-800 ring-emeraldDark-200",
  royal: "from-royal-50 to-royal-100 text-royal-800 ring-royal-200",
  gold: "from-gold-50 to-gold-100 text-gold-700 ring-gold-200",
};

export default function ProgramsSection() {
  const { t } = useLanguage();

  return (
    <section
      id="programs"
      className="relative overflow-hidden bg-white py-20 sm:py-28"
    >
      <div className="container-wide">
        <div className="mx-auto max-w-3xl text-center">
          <p className="section-eyebrow mx-auto">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
            {t.programs.eyebrow}
          </p>
          <h2 className="section-heading">
            {t.programs.headingA}{" "}
            <span className="text-gold-600">{t.programs.headingB}</span>.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-gray-600 sm:text-lg">
            {t.programs.intro}
          </p>
          <div className="divider-pattern mt-8">
            <Sparkles className="h-4 w-4" aria-hidden />
          </div>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {t.programs.items.map((p, i) => {
            const Icon = ICONS[i] ?? Sparkles;
            const accent = ACCENTS[i] ?? "emerald";
            return (
              <article key={p.title} className="card group relative">
                <div
                  className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${ACCENT_STYLES[accent]} ring-1 transition-transform duration-300 group-hover:scale-110`}
                >
                  <Icon className="h-7 w-7" aria-hidden />
                </div>
                <h3 className="font-display text-lg font-semibold text-emeraldDark-900 sm:text-xl">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">
                  {p.description}
                </p>
                <div
                  aria-hidden
                  className="absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-gold-300 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
