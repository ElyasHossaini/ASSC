"use client";

import { Calendar, Clock, MapPin, ArrowRight } from "lucide-react";
import { SITE } from "@/lib/site";
import { useLanguage } from "./LanguageProvider";

type TagColor = "emerald" | "gold" | "royal";

const TAG_COLORS: TagColor[] = ["emerald", "gold", "royal", "emerald", "gold"];

const TAG_STYLES: Record<TagColor, string> = {
  emerald: "bg-emeraldDark-50 text-emeraldDark-800 ring-emeraldDark-200",
  gold: "bg-gold-50 text-gold-700 ring-gold-200",
  royal: "bg-royal-50 text-royal-700 ring-royal-200",
};

export default function EventsSection() {
  const { t } = useLanguage();

  return (
    <section
      id="events"
      className="relative overflow-hidden bg-gradient-to-b from-emeraldDark-50/40 via-[#fafaf7] to-[#fafaf7] py-20 sm:py-28"
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-islamic-pattern opacity-[0.08]"
      />
      <div className="container-wide relative">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <p className="section-eyebrow">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
              {t.events.eyebrow}
            </p>
            <h2 className="section-heading">
              {t.events.headingA}{" "}
              <span className="text-gold-600">{t.events.headingB}</span>.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-gray-600 sm:text-lg">
              {t.events.intro}
            </p>
          </div>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${SITE.mapsQuery}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-emeraldDark-800 transition hover:text-gold-600"
          >
            <MapPin className="h-4 w-4" aria-hidden />
            {t.events.findCentre}
            <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden />
          </a>
        </div>

        <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {t.events.items.map((event, i) => {
            const tagColor = TAG_COLORS[i] ?? "emerald";
            return (
              <li
                key={event.title}
                className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-soft ring-1 ring-emeraldDark-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-elegant"
              >
                <div className="h-1.5 w-full bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600" />
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-xl font-semibold text-emeraldDark-900">
                      {event.title}
                    </h3>
                    <span
                      className={`inline-flex shrink-0 items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 ${TAG_STYLES[tagColor]}`}
                    >
                      {event.tag}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-gray-600">
                    {event.description}
                  </p>

                  <dl className="mt-5 space-y-2 border-t border-emeraldDark-900/5 pt-4 text-sm text-emeraldDark-900">
                    <div className="flex items-center gap-2">
                      <Calendar
                        className="h-4 w-4 shrink-0 text-gold-500"
                        aria-hidden
                      />
                      <dd>{event.date}</dd>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock
                        className="h-4 w-4 shrink-0 text-gold-500"
                        aria-hidden
                      />
                      <dd>{event.time}</dd>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin
                        className="h-4 w-4 shrink-0 text-gold-500"
                        aria-hidden
                      />
                      <dd>{event.location}</dd>
                    </div>
                  </dl>
                </div>
              </li>
            );
          })}
        </ul>

        <p className="mt-10 text-center text-sm text-gray-500">
          {t.events.confirmPre}{" "}
          <a
            href={SITE.phoneHref}
            className="font-semibold text-emeraldDark-800 hover:text-gold-600"
            dir="ltr"
          >
            {SITE.phone}
          </a>{" "}
          {t.events.confirmPost}
        </p>
      </div>
    </section>
  );
}
