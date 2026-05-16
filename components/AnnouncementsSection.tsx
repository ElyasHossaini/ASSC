"use client";

import Image from "next/image";
import { Bell, Clock, Megaphone, Star, type LucideIcon } from "lucide-react";
import { useLanguage } from "./LanguageProvider";

const ANNOUNCEMENT_ICONS: LucideIcon[] = [Megaphone, Star, Bell];

export default function AnnouncementsSection() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-28">
      <div className="container-wide">
        <div className="grid gap-10 lg:grid-cols-3">
          {/* Announcements column */}
          <div className="lg:col-span-2">
            <p className="section-eyebrow">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
              {t.announcements.eyebrow}
            </p>
            <h2 className="section-heading">
              {t.announcements.headingA}{" "}
              <span className="text-gold-600">
                {t.announcements.headingB}
              </span>
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg">
              {t.announcements.intro}
            </p>

            {/* Featured community photo */}
            <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-3xl shadow-elegant ring-1 ring-emeraldDark-900/10">
              <Image
                src="/images/PHOTO-2026-05-14-09-08-20.jpg"
                alt="ASSC community gathering"
                fill
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-emeraldDark-950/70 via-emeraldDark-950/10 to-transparent"
              />
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                <p className="font-arabic text-sm text-gold-300 sm:text-base">
                  بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
                </p>
                <p className="mt-1 font-display text-lg font-semibold text-white sm:text-xl">
                  {t.nav.siteFullName} · {t.nav.siteSubName}
                </p>
              </div>
            </div>

            <ul className="mt-10 space-y-5">
              {t.announcements.items.map((a, i) => {
                const Icon = ANNOUNCEMENT_ICONS[i] ?? Megaphone;
                return (
                  <li
                    key={a.title}
                    className="group flex gap-5 rounded-2xl bg-[#fafaf7] p-6 ring-1 ring-emeraldDark-900/5 transition-all duration-300 hover:bg-white hover:shadow-soft"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emeraldDark-800 to-emeraldDark-900 text-gold-300 shadow-soft transition-transform duration-300 group-hover:scale-110">
                      <Icon className="h-5 w-5" aria-hidden />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="inline-flex items-center rounded-full bg-gold-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gold-700 ring-1 ring-gold-200">
                          {a.tag}
                        </span>
                      </div>
                      <h3 className="mt-2 font-display text-lg font-semibold text-emeraldDark-900">
                        {a.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-gray-600">
                        {a.text}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Schedule card */}
          <aside className="relative">
            <div className="sticky top-28 overflow-hidden rounded-3xl bg-gradient-to-br from-emeraldDark-900 via-emeraldDark-800 to-royal-900 p-8 text-white shadow-elegant">
              <div
                aria-hidden
                className="absolute inset-0 bg-islamic-pattern-gold opacity-25"
              />
              <div className="relative">
                <div className="inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gold-300 backdrop-blur">
                  <Clock className="h-3.5 w-3.5" aria-hidden />
                  {t.announcements.scheduleEyebrow}
                </div>
                <h3 className="mt-4 font-display text-2xl font-bold text-white">
                  {t.announcements.scheduleTitle}
                </h3>
                <p className="mt-2 text-sm text-emeraldDark-100/90">
                  {t.announcements.scheduleIntro}
                </p>

                <ul className="mt-6 space-y-3">
                  {t.announcements.schedule.map((s) => (
                    <li
                      key={s.label}
                      className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur transition hover:border-gold-400/40 hover:bg-white/10"
                    >
                      <span className="font-medium">{s.label}</span>
                      <span className="text-xs font-semibold text-gold-300 sm:text-sm">
                        {s.time}
                      </span>
                    </li>
                  ))}
                </ul>

                <p className="mt-6 rounded-xl border border-gold-400/30 bg-gold-400/10 px-4 py-3 text-xs leading-relaxed text-gold-100">
                  {t.announcements.scheduleNote}
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
