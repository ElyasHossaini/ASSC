"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import {
  CalendarHeart,
  CheckCircle2,
  MapPin,
  Trash2,
  Users,
  X,
} from "lucide-react";

// Edit these values to update the featured upcoming event.
const EVENT = {
  id: "event-may-2026",
  title: "Upcoming Community Event",
  date: "Coming Soon",
  location: "ASSC Centre",
  description:
    "Join us for our next community gathering. Reserve your spot below so we can prepare enough food and seating for your family.",
  image: "/upcoming/WhatsApp%20Image%202026-05-14%20at%209.22.22%20AM.jpeg",
  imageAlt: "Upcoming Afghanistan Shia Society of Calgary community event",
};

type Rsvp = {
  id: string;
  name: string;
  count: number;
  createdAt: number;
};

const STORAGE_KEY = `assc:rsvps:${EVENT.id}`;

function loadRsvps(): Rsvp[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Rsvp[];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (r) =>
        r &&
        typeof r.id === "string" &&
        typeof r.name === "string" &&
        typeof r.count === "number" &&
        r.count > 0
    );
  } catch {
    return [];
  }
}

function saveRsvps(list: Rsvp[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {
    // ignore quota errors
  }
}

export default function UpcomingEventsSection() {
  const [rsvps, setRsvps] = useState<Rsvp[]>([]);
  const [name, setName] = useState("");
  const [count, setCount] = useState<number | "">(1);
  const [formOpen, setFormOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [justAdded, setJustAdded] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setRsvps(loadRsvps());
    setHydrated(true);
  }, []);

  const total = useMemo(
    () => rsvps.reduce((sum, r) => sum + r.count, 0),
    [rsvps]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    const n = typeof count === "number" ? count : Number(count);

    if (trimmed.length < 2) {
      setError("Please enter your name (at least 2 characters).");
      return;
    }
    if (!Number.isFinite(n) || n < 1 || n > 50) {
      setError("Please enter a valid number of people (1–50).");
      return;
    }

    const entry: Rsvp = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name: trimmed,
      count: Math.floor(n),
      createdAt: Date.now(),
    };

    const next = [...rsvps, entry];
    setRsvps(next);
    saveRsvps(next);
    setName("");
    setCount(1);
    setError(null);
    setFormOpen(false);
    setJustAdded(entry.id);
    window.setTimeout(() => setJustAdded(null), 3500);
  };

  const handleRemove = (id: string) => {
    const next = rsvps.filter((r) => r.id !== id);
    setRsvps(next);
    saveRsvps(next);
  };

  return (
    <section
      id="upcoming"
      className="relative overflow-hidden bg-gradient-to-b from-[#fafaf7] via-emeraldDark-50/30 to-[#fafaf7] py-20 sm:py-28"
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-islamic-pattern-gold opacity-[0.06]"
      />

      <div className="container-wide relative">
        <div className="mx-auto max-w-3xl text-center">
          <p className="section-eyebrow mx-auto">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
            Upcoming Event
          </p>
          <h2 className="section-heading">
            Reserve your seat for our{" "}
            <span className="text-gold-600">next gathering</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-gray-600 sm:text-lg">
            Let us know how many family members will be joining so we can
            prepare a warm welcome for everyone.
          </p>
          <div className="divider-pattern mt-8">
            <CalendarHeart className="h-4 w-4" aria-hidden />
          </div>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-5 lg:gap-10">
          {/* Event poster */}
          <div className="lg:col-span-3">
            <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-emeraldDark-50 via-white to-gold-50/40 shadow-elegant ring-1 ring-emeraldDark-900/5">
              <div className="flex items-center justify-center p-3 sm:p-4">
                <Image
                  src={EVENT.image}
                  alt={EVENT.imageAlt}
                  width={1141}
                  height={1600}
                  sizes="(max-width: 1024px) 95vw, 55vw"
                  className="h-auto w-full max-w-[560px] rounded-2xl object-contain shadow-soft"
                  priority
                />
              </div>
              <div className="flex flex-col gap-3 border-t border-emeraldDark-900/5 bg-white p-5 sm:p-7">
                <div className="flex flex-wrap items-center gap-2.5 text-sm">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-500 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
                    <CalendarHeart className="h-3.5 w-3.5" aria-hidden />
                    {EVENT.date}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emeraldDark-50 px-3 py-1 text-xs font-medium text-emeraldDark-800 ring-1 ring-emeraldDark-200">
                    <MapPin className="h-3.5 w-3.5 text-gold-600" aria-hidden />
                    {EVENT.location}
                  </span>
                </div>
                <h3 className="font-display text-2xl font-semibold leading-tight text-emeraldDark-900 sm:text-3xl">
                  {EVENT.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-600 sm:text-base">
                  {EVENT.description}
                </p>
              </div>
            </div>
          </div>

          {/* RSVP panel */}
          <div className="lg:col-span-2">
            <div className="sticky top-24 rounded-3xl bg-white p-6 shadow-elegant ring-1 ring-emeraldDark-900/5 sm:p-8">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-gold-600">
                    Total Attending
                  </p>
                  <p className="mt-1 font-display text-4xl font-bold text-emeraldDark-900 sm:text-5xl">
                    {hydrated ? total : 0}
                  </p>
                </div>
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-gold-500 to-gold-600 text-white shadow-soft">
                  <Users className="h-7 w-7" aria-hidden />
                </span>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-gray-500">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emeraldDark-50 px-3 py-1 font-medium text-emeraldDark-800">
                  {hydrated ? rsvps.length : 0}{" "}
                  {rsvps.length === 1 ? "family" : "families"} RSVP&apos;d
                </span>
              </div>

              {!formOpen ? (
                <button
                  type="button"
                  onClick={() => {
                    setFormOpen(true);
                    setError(null);
                  }}
                  className="btn-primary mt-6 w-full"
                >
                  <CalendarHeart className="h-4 w-4" aria-hidden />
                  Join Event / RSVP
                </button>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div>
                    <label
                      htmlFor="rsvp-name"
                      className="mb-1.5 block text-sm font-semibold text-emeraldDark-900"
                    >
                      Your Name / Family Name
                    </label>
                    <input
                      id="rsvp-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Ahmadi Family"
                      maxLength={80}
                      autoFocus
                      className="w-full rounded-xl border border-emeraldDark-900/10 bg-white px-4 py-2.5 text-sm text-emeraldDark-900 placeholder:text-gray-400 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/30"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="rsvp-count"
                      className="mb-1.5 block text-sm font-semibold text-emeraldDark-900"
                    >
                      Number of people attending
                    </label>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        aria-label="Decrease"
                        onClick={() =>
                          setCount((c) =>
                            Math.max(1, (typeof c === "number" ? c : 1) - 1)
                          )
                        }
                        className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emeraldDark-900/10 text-lg font-semibold text-emeraldDark-900 transition hover:bg-emeraldDark-50 focus:outline-none focus:ring-2 focus:ring-gold-500/30"
                      >
                        −
                      </button>
                      <input
                        id="rsvp-count"
                        type="number"
                        inputMode="numeric"
                        min={1}
                        max={50}
                        value={count}
                        onChange={(e) => {
                          const v = e.target.value;
                          if (v === "") return setCount("");
                          const n = Number(v);
                          if (Number.isFinite(n)) setCount(n);
                        }}
                        className="w-full rounded-xl border border-emeraldDark-900/10 bg-white px-4 py-2.5 text-center text-sm font-semibold text-emeraldDark-900 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/30"
                      />
                      <button
                        type="button"
                        aria-label="Increase"
                        onClick={() =>
                          setCount((c) =>
                            Math.min(50, (typeof c === "number" ? c : 1) + 1)
                          )
                        }
                        className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emeraldDark-900/10 text-lg font-semibold text-emeraldDark-900 transition hover:bg-emeraldDark-50 focus:outline-none focus:ring-2 focus:ring-gold-500/30"
                      >
                        +
                      </button>
                    </div>
                    <p className="mt-1.5 text-xs text-gray-500">
                      Include yourself in the total.
                    </p>
                  </div>

                  {error && (
                    <p className="rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-700 ring-1 ring-red-200">
                      {error}
                    </p>
                  )}

                  <div className="flex flex-col gap-2 sm:flex-row">
                    <button type="submit" className="btn-primary w-full">
                      <CheckCircle2 className="h-4 w-4" aria-hidden />
                      Confirm RSVP
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setFormOpen(false);
                        setError(null);
                      }}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-emeraldDark-900/10 bg-white px-6 py-3 text-sm font-semibold text-emeraldDark-900 transition hover:bg-emeraldDark-50 sm:w-auto"
                    >
                      <X className="h-4 w-4" aria-hidden />
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              <div className="mt-7 border-t border-emeraldDark-900/5 pt-5">
                <p className="text-sm font-semibold text-emeraldDark-900">
                  Families attending
                </p>

                {hydrated && rsvps.length === 0 && (
                  <p className="mt-3 rounded-xl bg-emeraldDark-50/60 px-4 py-5 text-center text-sm text-emeraldDark-800">
                    No one has RSVP&apos;d yet — be the first!
                  </p>
                )}

                {hydrated && rsvps.length > 0 && (
                  <ul className="mt-3 max-h-64 space-y-2 overflow-y-auto pr-1">
                    {rsvps.map((r) => (
                      <li
                        key={r.id}
                        className={`flex items-center justify-between gap-3 rounded-xl border border-emeraldDark-900/5 bg-emeraldDark-50/40 px-4 py-2.5 transition-all ${
                          justAdded === r.id
                            ? "ring-2 ring-gold-400 bg-gold-50/70"
                            : ""
                        }`}
                      >
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-emeraldDark-900">
                            {r.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {r.count}{" "}
                            {r.count === 1 ? "person" : "people"}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="inline-flex h-8 min-w-[2rem] items-center justify-center rounded-full bg-gold-500/95 px-2 text-xs font-bold text-white">
                            {r.count}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleRemove(r.id)}
                            aria-label={`Remove ${r.name}'s RSVP`}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition hover:bg-red-50 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}

                {hydrated && rsvps.length > 0 && (
                  <div className="mt-4 flex items-center justify-between rounded-xl bg-gradient-to-br from-emeraldDark-900 to-emeraldDark-800 px-4 py-3 text-white">
                    <span className="text-xs font-semibold uppercase tracking-widest text-gold-300">
                      Total people coming
                    </span>
                    <span className="font-display text-xl font-bold text-white">
                      {total}
                    </span>
                  </div>
                )}
              </div>

              <p className="mt-5 text-[11px] leading-relaxed text-gray-400">
                RSVPs are saved on this device. To confirm your reservation
                with the organizers, please also call{" "}
                <a
                  href="tel:4038613835"
                  className="font-semibold text-emeraldDark-700 hover:text-gold-600"
                >
                  403-861-3835
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
