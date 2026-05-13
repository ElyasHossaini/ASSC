"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Clock,
  MapPin,
  MoonStar,
  Sun,
  Sunrise,
  Sunset,
  Star,
  RefreshCw,
  type LucideIcon,
} from "lucide-react";

type PrayerKey = "Fajr" | "Sunrise" | "Dhuhr" | "Asr" | "Maghrib" | "Isha";

type AladhanResponse = {
  code: number;
  data?: {
    timings: Record<PrayerKey | string, string>;
    date: {
      readable: string;
      gregorian: {
        weekday: { en: string };
        date: string;
      };
      hijri: {
        date: string;
        day: string;
        weekday: { en: string };
        month: { en: string };
        year: string;
      };
    };
    meta: {
      timezone: string;
    };
  };
};

type PrayerInfo = {
  key: PrayerKey;
  label: string;
  description: string;
  icon: LucideIcon;
  /** Counts toward "next prayer" countdown (Sunrise is informational only). */
  isObligatory: boolean;
};

const PRAYERS: PrayerInfo[] = [
  {
    key: "Fajr",
    label: "Fajr",
    description: "Dawn",
    icon: MoonStar,
    isObligatory: true,
  },
  {
    key: "Sunrise",
    label: "Sunrise",
    description: "Fajr ends",
    icon: Sunrise,
    isObligatory: false,
  },
  {
    key: "Dhuhr",
    label: "Dhuhr",
    description: "Midday",
    icon: Sun,
    isObligatory: true,
  },
  {
    key: "Asr",
    label: "Asr",
    description: "Afternoon",
    icon: Sun,
    isObligatory: true,
  },
  {
    key: "Maghrib",
    label: "Maghrib",
    description: "Evening",
    icon: Sunset,
    isObligatory: true,
  },
  {
    key: "Isha",
    label: "Isha",
    description: "Night",
    icon: Star,
    isObligatory: true,
  },
];

function cleanTime(t: string | undefined): string | null {
  if (!t) return null;
  // AlAdhan sometimes returns "05:31 (MDT)" — strip anything after a space.
  const match = t.match(/(\d{1,2}):(\d{2})/);
  if (!match) return null;
  return `${match[1].padStart(2, "0")}:${match[2]}`;
}

function format12h(t: string | null): string {
  if (!t) return "—";
  const [hStr, mStr] = t.split(":");
  const h = Number(hStr);
  const m = Number(mStr);
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 || 12;
  return `${hour12}:${m.toString().padStart(2, "0")} ${period}`;
}

function parseToToday(t: string, base: Date): Date {
  const [h, m] = t.split(":").map(Number);
  const d = new Date(base);
  d.setHours(h, m, 0, 0);
  return d;
}

function cacheKey(): string {
  const d = new Date();
  return `assc-prayers-${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

export default function PrayerTimesSection() {
  const [data, setData] = useState<AladhanResponse["data"] | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [now, setNow] = useState<Date>(new Date());

  // Fetch (with a per-day localStorage cache to avoid hammering the API)
  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        if (typeof window !== "undefined") {
          const cached = window.localStorage.getItem(cacheKey());
          if (cached) {
            const parsed = JSON.parse(cached) as AladhanResponse["data"];
            if (!cancelled) {
              setData(parsed);
              setStatus("ready");
            }
            return;
          }
        }

        // method=0 → Shia Ithna-Ashari, Leva Research Institute, Qum
        const res = await fetch(
          "https://api.aladhan.com/v1/timingsByCity?city=Calgary&country=Canada&method=0",
          { cache: "no-store" }
        );
        const json: AladhanResponse = await res.json();
        if (json.code === 200 && json.data) {
          if (!cancelled) {
            setData(json.data);
            setStatus("ready");
          }
          try {
            window.localStorage.setItem(cacheKey(), JSON.stringify(json.data));
          } catch {
            // ignore quota errors
          }
        } else if (!cancelled) {
          setStatus("error");
        }
      } catch {
        if (!cancelled) setStatus("error");
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  // Tick once per minute for the countdown
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 60_000);
    return () => window.clearInterval(id);
  }, []);

  const computed = useMemo(() => {
    if (!data) return null;

    const today = new Date(now);
    today.setHours(0, 0, 0, 0);

    const obligatory = PRAYERS.filter((p) => p.isObligatory)
      .map((p) => {
        const t = cleanTime(data.timings[p.key]);
        return t ? { ...p, time24: t, date: parseToToday(t, today) } : null;
      })
      .filter((x): x is NonNullable<typeof x> => x !== null);

    let nextIdx = obligatory.findIndex((p) => p.date > now);

    let nextPrayer: (typeof obligatory)[number] & { isTomorrow?: boolean };
    let currentPrayer: (typeof obligatory)[number] | null;

    if (nextIdx === -1) {
      // All today's prayers passed → next is tomorrow's Fajr.
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const fajr = obligatory[0];
      nextPrayer = {
        ...fajr,
        date: parseToToday(fajr.time24, tomorrow),
        isTomorrow: true,
      };
      currentPrayer = obligatory[obligatory.length - 1];
    } else {
      nextPrayer = obligatory[nextIdx];
      currentPrayer = nextIdx > 0 ? obligatory[nextIdx - 1] : null;
    }

    const diffMs = nextPrayer.date.getTime() - now.getTime();
    const totalMin = Math.max(0, Math.floor(diffMs / 60000));
    const hours = Math.floor(totalMin / 60);
    const minutes = totalMin % 60;

    return { nextPrayer, currentPrayer, hours, minutes };
  }, [data, now]);

  return (
    <section
      id="prayer-times"
      className="relative overflow-hidden py-20 sm:py-28"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-emeraldDark-950 via-emeraldDark-900 to-royal-950" />
      <div
        aria-hidden
        className="absolute inset-0 bg-islamic-pattern-gold opacity-20"
      />
      <div
        aria-hidden
        className="absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-gold-500/10 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-royal-500/15 blur-3xl"
      />

      <div className="container-wide relative">
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-gold-400/40 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gold-300 backdrop-blur">
            <Clock className="h-3.5 w-3.5" aria-hidden />
            Prayer Times
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-white text-balance sm:text-4xl lg:text-5xl">
            Today&apos;s Prayer{" "}
            <span className="bg-gradient-to-r from-gold-300 to-gold-500 bg-clip-text text-transparent">
              Schedule
            </span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-emeraldDark-100 sm:text-lg">
            Live prayer times for Calgary using the Shia Ithna-Ashari (Jafari)
            calculation method.
          </p>

          {status === "ready" && data && (
            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-emeraldDark-100/90">
              <span className="inline-flex items-center gap-2">
                <MapPin
                  className="h-4 w-4 text-gold-400"
                  aria-hidden
                />
                Calgary, Alberta
              </span>
              <span className="hidden h-4 w-px bg-white/20 sm:block" />
              <span>
                <span className="text-emeraldDark-200">Gregorian:</span>{" "}
                <span className="font-medium text-white">
                  {data.date.gregorian.weekday.en},{" "}
                  {data.date.readable}
                </span>
              </span>
              <span className="hidden h-4 w-px bg-white/20 sm:block" />
              <span>
                <span className="text-emeraldDark-200">Hijri:</span>{" "}
                <span className="font-medium text-gold-300">
                  {data.date.hijri.day} {data.date.hijri.month.en}{" "}
                  {data.date.hijri.year} AH
                </span>
              </span>
            </div>
          )}
        </div>

        {/* Next prayer hero card */}
        <div className="mx-auto mt-12 max-w-3xl">
          {status === "loading" && <LoadingHero />}
          {status === "error" && <ErrorHero />}
          {status === "ready" && computed && (
            <div className="relative overflow-hidden rounded-3xl border border-gold-400/40 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-8 backdrop-blur-md shadow-elegant">
              <div
                aria-hidden
                className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gold-400/20 blur-3xl"
              />
              <div className="relative flex flex-col items-center justify-between gap-6 sm:flex-row sm:gap-8 sm:text-left">
                <div className="text-center sm:text-left">
                  <p className="text-xs font-semibold uppercase tracking-widest text-gold-300">
                    Up Next
                    {computed.nextPrayer.isTomorrow && " · Tomorrow"}
                  </p>
                  <div className="mt-2 flex items-center justify-center gap-3 sm:justify-start">
                    <computed.nextPrayer.icon
                      className="h-8 w-8 text-gold-400"
                      aria-hidden
                    />
                    <p className="font-display text-3xl font-bold text-white sm:text-4xl">
                      {computed.nextPrayer.label}
                    </p>
                  </div>
                  <p className="mt-1 text-sm text-emeraldDark-100/85">
                    at{" "}
                    <span className="font-semibold text-white">
                      {format12h(computed.nextPrayer.time24)}
                    </span>
                  </p>
                </div>

                <div className="text-center sm:text-right">
                  <p className="text-xs font-semibold uppercase tracking-widest text-gold-300">
                    In
                  </p>
                  <p className="mt-1 font-display text-4xl font-bold tabular-nums text-white sm:text-5xl">
                    {computed.hours > 0 && (
                      <>
                        {computed.hours}
                        <span className="ml-1 text-xl font-medium text-emeraldDark-100">
                          hr
                        </span>{" "}
                      </>
                    )}
                    {computed.minutes}
                    <span className="ml-1 text-xl font-medium text-emeraldDark-100">
                      min
                    </span>
                  </p>
                  {computed.currentPrayer && (
                    <p className="mt-1 text-xs text-emeraldDark-100/80">
                      Current: {computed.currentPrayer.label} ·{" "}
                      {format12h(computed.currentPrayer.time24)}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Prayer grid */}
        <ul className="mx-auto mt-8 grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
          {PRAYERS.map((p) => {
            const time = cleanTime(data?.timings[p.key]);
            const isNext =
              computed?.nextPrayer.key === p.key &&
              !computed.nextPrayer.isTomorrow;
            const isCurrent =
              computed?.currentPrayer?.key === p.key;
            const Icon = p.icon;

            return (
              <li
                key={p.key}
                className={`group relative overflow-hidden rounded-2xl border p-5 text-center backdrop-blur transition-all duration-300 ${
                  isNext
                    ? "border-gold-400/70 bg-gradient-to-br from-gold-500/20 to-gold-600/10 shadow-glow"
                    : isCurrent
                      ? "border-emeraldDark-400/60 bg-white/10"
                      : "border-white/10 bg-white/5 hover:border-gold-400/40 hover:bg-white/10"
                }`}
              >
                {isNext && (
                  <span className="absolute right-2 top-2 rounded-full bg-gold-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white shadow-soft">
                    Next
                  </span>
                )}
                {isCurrent && !isNext && (
                  <span className="absolute right-2 top-2 rounded-full bg-emeraldDark-400/30 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-gold-200">
                    Now
                  </span>
                )}
                <Icon
                  className={`mx-auto h-6 w-6 ${
                    isNext ? "text-gold-300" : "text-gold-400/80"
                  }`}
                  aria-hidden
                />
                <p className="mt-3 font-display text-base font-semibold text-white sm:text-lg">
                  {p.label}
                </p>
                <p className="mt-0.5 text-[11px] uppercase tracking-wider text-emeraldDark-200/80">
                  {p.description}
                </p>
                <p
                  className={`mt-3 font-display text-lg font-bold tabular-nums sm:text-xl ${
                    isNext ? "text-gold-200" : "text-white"
                  }`}
                >
                  {status === "loading" ? (
                    <span className="inline-block h-5 w-16 animate-pulse rounded bg-white/10" />
                  ) : (
                    format12h(time)
                  )}
                </p>
              </li>
            );
          })}
        </ul>

        <div className="mx-auto mt-8 flex max-w-3xl flex-col items-center gap-2 text-center text-xs text-emeraldDark-200/80 sm:flex-row sm:justify-center sm:gap-6">
          <p>
            Times calculated using the{" "}
            <span className="font-semibold text-gold-300">
              Shia Ithna-Ashari (Jafari)
            </span>{" "}
            method.
          </p>
          <span className="hidden h-3 w-px bg-white/15 sm:block" />
          <p className="inline-flex items-center gap-1.5">
            <RefreshCw className="h-3 w-3" aria-hidden />
            Auto-updates daily · Live countdown
          </p>
        </div>
      </div>
    </section>
  );
}

function LoadingHero() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md">
      <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="space-y-3">
          <div className="h-3 w-20 animate-pulse rounded bg-white/10" />
          <div className="h-8 w-40 animate-pulse rounded bg-white/10" />
          <div className="h-3 w-28 animate-pulse rounded bg-white/10" />
        </div>
        <div className="space-y-3">
          <div className="h-3 w-12 animate-pulse rounded bg-white/10" />
          <div className="h-10 w-32 animate-pulse rounded bg-white/10" />
        </div>
      </div>
    </div>
  );
}

function ErrorHero() {
  return (
    <div className="rounded-3xl border border-gold-400/30 bg-gold-400/10 p-6 text-center text-sm text-gold-100">
      <p className="font-semibold text-gold-200">
        Couldn&apos;t load live prayer times right now.
      </p>
      <p className="mt-1 text-gold-100/80">
        Please refresh the page in a moment, or contact the centre for
        today&apos;s schedule.
      </p>
    </div>
  );
}
