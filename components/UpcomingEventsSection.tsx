"use client";

import { useEffect, useState } from "react";
import {
  CalendarHeart,
  KeyRound,
  Loader2,
  Lock,
  LogOut,
  ShieldCheck,
  X,
} from "lucide-react";
import {
  clearAdminToken,
  getAdminToken,
  pingAdminToken,
  setAdminToken,
} from "@/lib/rsvp";
import { useLanguage } from "./LanguageProvider";
import UpcomingEventCard, {
  type UpcomingEventMeta,
} from "./UpcomingEventCard";

// Event metadata is NOT translated — id (used for RSVP backend) and image
// stay stable across languages. Translated copy lives in t.upcoming.events.
const EVENTS: UpcomingEventMeta[] = [
  {
    id: "event-may-2026",
    image: "/upcoming/WhatsApp%20Image%202026-05-14%20at%209.22.22%20AM.jpeg",
    imageAlt: "Upcoming Afghanistan Shia Society of Calgary community event",
  },
  {
    id: "event-imam-hassan-mar-14",
    image: null,
    imageAlt: "Birth anniversary of Imam Hassan al-Mujtaba (a.s.)",
  },
];

export default function UpcomingEventsSection() {
  const { t } = useLanguage();

  // Organizer / admin state — shared across all event cards.
  const [adminToken, setAdminTokenState] = useState<string | null>(null);
  const [adminPanelOpen, setAdminPanelOpen] = useState(false);
  const [adminInput, setAdminInput] = useState("");
  const [adminError, setAdminError] = useState<string | null>(null);
  const [adminVerifying, setAdminVerifying] = useState(false);
  const [adminFlash, setAdminFlash] = useState<string | null>(null);

  useEffect(() => {
    setAdminTokenState(getAdminToken());
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.has("admin")) setAdminPanelOpen(true);
    }
  }, []);

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = adminInput.trim();
    if (token.length < 4) {
      setAdminError(t.upcoming.errors.adminMinPass);
      return;
    }
    setAdminVerifying(true);
    setAdminError(null);
    try {
      const ok = await pingAdminToken(token);
      if (ok) {
        setAdminToken(token);
        setAdminTokenState(token);
        setAdminInput("");
        setAdminFlash(t.upcoming.errors.flashLoggedIn);
        window.setTimeout(() => setAdminFlash(null), 4000);
      } else {
        setAdminError(t.upcoming.errors.adminWrong);
      }
    } catch {
      setAdminError(t.upcoming.errors.adminReach);
    } finally {
      setAdminVerifying(false);
    }
  };

  const handleAdminLogout = () => {
    clearAdminToken();
    setAdminTokenState(null);
    setAdminPanelOpen(false);
    setAdminFlash(null);
  };

  const handleAdminSessionExpired = () => {
    clearAdminToken();
    setAdminTokenState(null);
    setAdminPanelOpen(true);
    setAdminError(t.upcoming.errors.adminExpired);
  };

  const isAdmin = !!adminToken;

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
            {t.upcoming.eyebrow}
          </p>
          <h2 className="section-heading">
            {t.upcoming.headingA}{" "}
            <span className="text-gold-600">{t.upcoming.headingB}</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-gray-600 sm:text-lg">
            {t.upcoming.intro}
          </p>
          <div className="divider-pattern mt-8">
            <CalendarHeart className="h-4 w-4" aria-hidden />
          </div>

          {isAdmin && (
            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-gold-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-gold-700 ring-1 ring-gold-200">
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
              {t.upcoming.organizerBadge}
            </div>
          )}
        </div>

        <div className="mt-14 space-y-10">
          {EVENTS.map((event, i) => (
            <UpcomingEventCard
              key={event.id}
              event={event}
              content={t.upcoming.events[i]}
              adminToken={adminToken}
              onAdminSessionExpired={handleAdminSessionExpired}
            />
          ))}
        </div>

        {/* Shared organizer / admin panel */}
        {(adminPanelOpen || isAdmin) && (
          <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-dashed border-emeraldDark-900/15 bg-white/80 p-5 shadow-soft backdrop-blur">
            <div className="flex items-center justify-between gap-2">
              <p className="flex items-center gap-2 text-sm font-semibold text-emeraldDark-900">
                <Lock className="h-4 w-4 text-emeraldDark-700" aria-hidden />
                {t.upcoming.organizerToolsTitle}
              </p>
              {!isAdmin && (
                <button
                  type="button"
                  onClick={() => setAdminPanelOpen(false)}
                  aria-label={t.upcoming.closeOrganizer}
                  className="rounded-full p-1 text-gray-400 hover:bg-emeraldDark-50 hover:text-emeraldDark-700"
                  suppressHydrationWarning
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {isAdmin ? (
              <div className="mt-3 space-y-2">
                {adminFlash && (
                  <p className="rounded-lg bg-emeraldDark-100/80 px-3 py-2 text-xs text-emeraldDark-900">
                    {adminFlash}
                  </p>
                )}
                {adminError && (
                  <p className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700 ring-1 ring-red-200">
                    {adminError}
                  </p>
                )}
                <p className="text-xs text-emeraldDark-800">
                  {t.upcoming.organizerLoggedInText}
                </p>
                <button
                  type="button"
                  onClick={handleAdminLogout}
                  className="inline-flex items-center gap-2 rounded-full border border-emeraldDark-900/10 bg-white px-4 py-2 text-xs font-semibold text-emeraldDark-900 transition hover:bg-emeraldDark-50"
                  suppressHydrationWarning
                >
                  <LogOut className="h-3.5 w-3.5" aria-hidden />
                  {t.upcoming.organizerLogout}
                </button>
              </div>
            ) : (
              <form onSubmit={handleAdminLogin} className="mt-3 space-y-2">
                <label
                  htmlFor="admin-pw"
                  className="block text-xs font-medium text-emeraldDark-800"
                >
                  {t.upcoming.organizerPasswordLabel}
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <KeyRound
                      className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                      aria-hidden
                    />
                    <input
                      id="admin-pw"
                      type="password"
                      value={adminInput}
                      onChange={(e) => setAdminInput(e.target.value)}
                      placeholder={t.upcoming.organizerPasswordPlaceholder}
                      className="w-full rounded-xl border border-emeraldDark-900/10 bg-white px-3 py-2 ps-9 text-sm text-emeraldDark-900 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/30"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={adminVerifying}
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-emeraldDark-800 px-4 py-2 text-xs font-semibold text-white shadow-soft transition hover:bg-emeraldDark-900 disabled:cursor-wait disabled:opacity-70"
                    suppressHydrationWarning
                  >
                    {adminVerifying ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <ShieldCheck className="h-3.5 w-3.5" />
                    )}
                    {t.upcoming.organizerLogin}
                  </button>
                </div>
                {adminError && (
                  <p className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700 ring-1 ring-red-200">
                    {adminError}
                  </p>
                )}
              </form>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
