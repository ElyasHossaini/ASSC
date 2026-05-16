"use client";

import Image from "next/image";
import {
  BookOpenText,
  HeartHandshake,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react";
import { useLanguage } from "./LanguageProvider";

const VALUE_ICONS: LucideIcon[] = [BookOpenText, Users, HeartHandshake, Sparkles];

export default function AboutSection() {
  const { t } = useLanguage();

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#fafaf7] py-20 sm:py-28"
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-islamic-pattern opacity-[0.07]"
      />
      <div className="container-wide relative">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-elegant ring-1 ring-emeraldDark-900/10">
              <Image
                src="/images/shia1.jpeg"
                alt="Members of the Afghanistan Shia Society of Calgary gathered in community"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emeraldDark-950/40 via-transparent to-transparent" />
            </div>

            {/* Floating accent card */}
            <div className="absolute -bottom-8 end-[-1.5rem] hidden max-w-xs rounded-2xl bg-white p-6 shadow-elegant ring-1 ring-gold-200 sm:block">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold-50 text-gold-600 ring-1 ring-gold-200">
                  <Sparkles className="h-6 w-6" aria-hidden />
                </div>
                <div>
                  <p className="font-display text-lg font-semibold text-emeraldDark-900">
                    {t.about.rootedTitle}
                  </p>
                  <p className="mt-1 text-sm text-gray-600">
                    {t.about.rootedText}
                  </p>
                </div>
              </div>
            </div>

            <div
              aria-hidden
              className="absolute -start-6 -top-6 -z-10 h-40 w-40 rounded-2xl bg-gold-100 ring-1 ring-gold-200"
            />
          </div>

          <div>
            <p className="section-eyebrow">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
              {t.about.eyebrow}
            </p>
            <h2 className="section-heading">
              {t.about.headingA}{" "}
              <span className="text-gold-600">{t.about.headingB}</span>.
            </h2>

            <div className="mt-6 space-y-4 text-base leading-relaxed text-gray-700 sm:text-lg">
              <p>
                {t.about.p1Pre}{" "}
                <strong>{t.about.p1Strong}</strong>
                {t.about.p1Post}
              </p>
              <p>{t.about.p2}</p>
              <p>{t.about.p3}</p>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {t.about.values.map((v, i) => {
                const Icon = VALUE_ICONS[i] ?? Sparkles;
                return (
                  <div
                    key={v.title}
                    className="group rounded-2xl bg-white/70 p-5 ring-1 ring-emeraldDark-900/5 transition-all duration-300 hover:bg-white hover:shadow-soft"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emeraldDark-50 text-emeraldDark-800 ring-1 ring-emeraldDark-100 transition-colors group-hover:bg-emeraldDark-800 group-hover:text-gold-300">
                        <Icon className="h-5 w-5" aria-hidden />
                      </div>
                      <p className="font-display text-base font-semibold text-emeraldDark-900">
                        {v.title}
                      </p>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-gray-600">
                      {v.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
