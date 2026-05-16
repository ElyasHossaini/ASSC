"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  AlertTriangle,
  CalendarHeart,
  CheckCircle2,
  KeyRound,
  Loader2,
  Lock,
  LogOut,
  MapPin,
  RefreshCw,
  ShieldCheck,
  Trash2,
  Users,
  X,
} from "lucide-react";
import {
  addRsvp,
  clearAdminToken,
  clearMyRsvpId,
  getAdminToken,
  getDeviceId,
  getMyRsvpId,
  listRsvps,
  pingAdminToken,
  removeRsvp,
  setAdminToken,
  setMyRsvpId,
  RSVP_ENABLED,
  type Rsvp,
} from "@/lib/rsvp";
import { SITE } from "@/lib/site";

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

const REFRESH_INTERVAL_MS = 30_000;

export default function UpcomingEventsSection() {
  const [rsvps, setRsvps] = useState<Rsvp[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [listError, setListError] = useState<string | null>(null);

  const [deviceId, setDeviceId] = useState<string>("");
  const [myRsvpId, setMyRsvpIdState] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [count, setCount] = useState<number | "">(1);
  const [formOpen, setFormOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Organizer / admin state
  const [adminToken, setAdminTokenState] = useState<string | null>(null);
  const [adminPanelOpen, setAdminPanelOpen] = useState(false);
  const [adminInput, setAdminInput] = useState("");
  const [adminError, setAdminError] = useState<string | null>(null);
  const [adminVerifying, setAdminVerifying] = useState(false);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [adminFlash, setAdminFlash] = useState<string | null>(null);

  const justAddedRef = useRef<string | null>(null);
  const [justAdded, setJustAdded] = useState<string | null>(null);

  // Boot: load device id + saved RSVP id + admin token + URL param
  useEffect(() => {
    setDeviceId(getDeviceId());
    setMyRsvpIdState(getMyRsvpId(EVENT.id));
    setAdminTokenState(getAdminToken());
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.has("admin")) setAdminPanelOpen(true);
    }
  }, []);

  const refresh = useCallback(
    async (silent = false) => {
      if (!RSVP_ENABLED) {
        setLoading(false);
        return;
      }
      try {
        if (!silent) setRefreshing(true);
        const list = await listRsvps(EVENT.id);
        setRsvps(list);
        setListError(null);
      } catch (err) {
        setListError(
          err instanceof Error
            ? err.message
            : "Could not load RSVPs. Please try again."
        );
      } finally {
        setRefreshing(false);
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    refresh();
    const t = window.setInterval(() => refresh(true), REFRESH_INTERVAL_MS);
    const onVisible = () => {
      if (document.visibilityState === "visible") refresh(true);
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      window.clearInterval(t);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [refresh]);

  // If my saved RSVP id is no longer present in the server list (admin removed
  // it), clear local state so this device can RSVP again.
  useEffect(() => {
    if (!myRsvpId) return;
    if (loading) return;
    const stillThere = rsvps.some((r) => r.id === myRsvpId);
    if (!stillThere) {
      clearMyRsvpId(EVENT.id);
      setMyRsvpIdState(null);
    }
  }, [rsvps, myRsvpId, loading]);

  const myEntry = useMemo(
    () => (myRsvpId ? rsvps.find((r) => r.id === myRsvpId) || null : null),
    [rsvps, myRsvpId]
  );
  const hasRsvped = !!myEntry;
  const total = useMemo(
    () => rsvps.reduce((sum, r) => sum + r.count, 0),
    [rsvps]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    const n = typeof count === "number" ? count : Number(count);

    if (trimmed.length < 2) {
      setFormError("Please enter your name (at least 2 characters).");
      return;
    }
    if (!Number.isFinite(n) || n < 1 || n > 50) {
      setFormError("Please enter a valid number of people (1–50).");
      return;
    }

    setFormError(null);
    setSubmitting(true);
    try {
      const result = await addRsvp({
        eventId: EVENT.id,
        name: trimmed,
        count: Math.floor(n),
        deviceId,
      });

      if (result.ok) {
        setMyRsvpId(EVENT.id, result.rsvp.id);
        setMyRsvpIdState(result.rsvp.id);
        setRsvps((prev) => {
          if (prev.some((r) => r.id === result.rsvp.id)) return prev;
          return [...prev, result.rsvp];
        });
        justAddedRef.current = result.rsvp.id;
        setJustAdded(result.rsvp.id);
        window.setTimeout(() => {
          if (justAddedRef.current === result.rsvp.id) setJustAdded(null);
        }, 4000);
        setName("");
        setCount(1);
        setFormOpen(false);
        // Re-sync with server in the background.
        refresh(true);
      } else if (result.error === "already_rsvped") {
        setFormError(
          "This device has already RSVP'd for this event. Please contact the organizer if you need to change your reservation."
        );
        refresh(true);
      } else {
        setFormError(
          "Could not submit your RSVP. Please try again or call the organizer."
        );
      }
    } catch {
      setFormError(
        "Network error. Please check your connection and try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = adminInput.trim();
    if (token.length < 4) {
      setAdminError("Please enter your organizer password.");
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
        setAdminFlash("Organizer mode active. Delete buttons are now available.");
        window.setTimeout(() => setAdminFlash(null), 4000);
      } else {
        setAdminError("Incorrect password. Please try again.");
      }
    } catch {
      setAdminError("Could not reach the server. Please try again.");
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

  const handleRemove = async (rsvp: Rsvp) => {
    if (!adminToken) return;
    const ok = window.confirm(
      `Remove ${rsvp.name}'s RSVP (${rsvp.count} ${rsvp.count === 1 ? "person" : "people"})?\n\nTheir device will be able to RSVP again.`
    );
    if (!ok) return;
    setRemovingId(rsvp.id);
    try {
      const result = await removeRsvp({ id: rsvp.id, token: adminToken });
      if (result.ok) {
        setRsvps((prev) => prev.filter((r) => r.id !== rsvp.id));
        // If the removed RSVP belongs to this device, unlock it.
        if (rsvp.id === myRsvpId) {
          clearMyRsvpId(EVENT.id);
          setMyRsvpIdState(null);
        }
        refresh(true);
      } else if (result.error === "unauthorized") {
        clearAdminToken();
        setAdminTokenState(null);
        setAdminPanelOpen(true);
        setAdminError(
          "Your organizer session expired. Please log in again."
        );
      } else if (result.error === "not_found") {
        // Already removed elsewhere — sync.
        refresh(true);
      } else {
        setAdminError("Could not remove this RSVP. Please try again.");
        window.setTimeout(() => setAdminError(null), 4000);
      }
    } catch {
      setAdminError("Network error while removing RSVP.");
      window.setTimeout(() => setAdminError(null), 4000);
    } finally {
      setRemovingId(null);
    }
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
                    {loading ? "—" : total}
                  </p>
                </div>
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-gold-500 to-gold-600 text-white shadow-soft">
                  <Users className="h-7 w-7" aria-hidden />
                </span>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-gray-500">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emeraldDark-50 px-3 py-1 font-medium text-emeraldDark-800">
                  {loading ? "…" : rsvps.length}{" "}
                  {rsvps.length === 1 ? "family" : "families"} RSVP&apos;d
                </span>
                {RSVP_ENABLED && (
                  <button
                    type="button"
                    onClick={() => refresh()}
                    disabled={refreshing}
                    aria-label="Refresh RSVP list"
                    className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-emeraldDark-700 transition hover:bg-emeraldDark-50 disabled:opacity-50"
                  >
                    <RefreshCw
                      className={`h-3 w-3 ${refreshing ? "animate-spin" : ""}`}
                      aria-hidden
                    />
                    Refresh
                  </button>
                )}
                {isAdmin && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-50 px-3 py-1 font-semibold uppercase tracking-wider text-gold-700 ring-1 ring-gold-200">
                    <ShieldCheck className="h-3 w-3" aria-hidden />
                    Organizer
                  </span>
                )}
              </div>

              {/* Action area: configure / already RSVPed / form / button */}
              {!RSVP_ENABLED ? (
                <div className="mt-6 rounded-xl bg-gold-50 px-4 py-4 text-sm text-gold-900 ring-1 ring-gold-200">
                  <p className="font-semibold">RSVPs not yet enabled</p>
                  <p className="mt-1 text-gold-800">
                    Please call{" "}
                    <a
                      href={SITE.phoneHref}
                      className="font-semibold underline-offset-2 hover:underline"
                    >
                      {SITE.phone}
                    </a>{" "}
                    to reserve a spot.
                  </p>
                </div>
              ) : hasRsvped && myEntry ? (
                <div className="mt-6 rounded-xl bg-emeraldDark-50 px-4 py-4 ring-1 ring-emeraldDark-100">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emeraldDark-700" />
                    <div className="min-w-0">
                      <p className="font-semibold text-emeraldDark-900">
                        You&apos;re on the list!
                      </p>
                      <p className="mt-1 text-sm text-emeraldDark-800">
                        <span className="font-medium">{myEntry.name}</span> —{" "}
                        {myEntry.count}{" "}
                        {myEntry.count === 1 ? "person" : "people"} attending.
                      </p>
                      <p className="mt-2 text-xs text-emeraldDark-700">
                        Need to make a change? Call{" "}
                        <a
                          href={SITE.phoneHref}
                          className="font-semibold underline-offset-2 hover:underline"
                        >
                          {SITE.phone}
                        </a>
                        .
                      </p>
                    </div>
                  </div>
                </div>
              ) : !formOpen ? (
                <button
                  type="button"
                  onClick={() => {
                    setFormOpen(true);
                    setFormError(null);
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
                      Include yourself in the total. One RSVP per device.
                    </p>
                  </div>

                  {formError && (
                    <div className="flex items-start gap-2 rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-700 ring-1 ring-red-200">
                      <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                      <span>{formError}</span>
                    </div>
                  )}

                  <div className="flex flex-col gap-2 sm:flex-row">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="btn-primary w-full disabled:cursor-wait disabled:opacity-70"
                    >
                      {submitting ? (
                        <>
                          <Loader2
                            className="h-4 w-4 animate-spin"
                            aria-hidden
                          />
                          Submitting…
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="h-4 w-4" aria-hidden />
                          Confirm RSVP
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setFormOpen(false);
                        setFormError(null);
                      }}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-emeraldDark-900/10 bg-white px-6 py-3 text-sm font-semibold text-emeraldDark-900 transition hover:bg-emeraldDark-50 sm:w-auto"
                    >
                      <X className="h-4 w-4" aria-hidden />
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              {/* Families list */}
              <div className="mt-7 border-t border-emeraldDark-900/5 pt-5">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-emeraldDark-900">
                    Families attending
                  </p>
                  {listError && (
                    <button
                      type="button"
                      onClick={() => refresh()}
                      className="text-xs font-semibold text-red-600 underline-offset-2 hover:underline"
                    >
                      Retry
                    </button>
                  )}
                </div>

                {listError && (
                  <p className="mt-2 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700 ring-1 ring-red-200">
                    {listError}
                  </p>
                )}

                {!listError && loading && (
                  <div className="mt-3 space-y-2">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div
                        key={i}
                        className="h-12 animate-pulse rounded-xl bg-emeraldDark-50/60"
                      />
                    ))}
                  </div>
                )}

                {!listError && !loading && rsvps.length === 0 && (
                  <p className="mt-3 rounded-xl bg-emeraldDark-50/60 px-4 py-5 text-center text-sm text-emeraldDark-800">
                    No one has RSVP&apos;d yet — be the first!
                  </p>
                )}

                {!listError && !loading && rsvps.length > 0 && (
                  <ul className="mt-3 max-h-72 space-y-2 overflow-y-auto pr-1">
                    {rsvps.map((r) => {
                      const isMine = r.id === myRsvpId;
                      return (
                        <li
                          key={r.id}
                          className={`flex items-center justify-between gap-3 rounded-xl border px-4 py-2.5 transition-all ${
                            justAdded === r.id
                              ? "border-gold-300 bg-gold-50/70 ring-2 ring-gold-300"
                              : isMine
                                ? "border-emeraldDark-200 bg-emeraldDark-50/60"
                                : "border-emeraldDark-900/5 bg-emeraldDark-50/40"
                          }`}
                        >
                          <div className="min-w-0">
                            <p className="flex items-center gap-1.5 truncate text-sm font-semibold text-emeraldDark-900">
                              <span className="truncate">{r.name}</span>
                              {isMine && (
                                <span className="shrink-0 rounded-full bg-emeraldDark-700 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                                  You
                                </span>
                              )}
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
                            {isAdmin && (
                              <button
                                type="button"
                                onClick={() => handleRemove(r)}
                                disabled={removingId === r.id}
                                aria-label={`Remove ${r.name}'s RSVP`}
                                className="inline-flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition hover:bg-red-50 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 disabled:opacity-50"
                              >
                                {removingId === r.id ? (
                                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                ) : (
                                  <Trash2 className="h-3.5 w-3.5" />
                                )}
                              </button>
                            )}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                )}

                {!listError && !loading && rsvps.length > 0 && (
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

              {/* Organizer / admin panel */}
              {(adminPanelOpen || isAdmin) && RSVP_ENABLED && (
                <div className="mt-6 rounded-2xl border border-dashed border-emeraldDark-900/15 bg-emeraldDark-50/30 p-4">
                  <div className="flex items-center justify-between gap-2">
                    <p className="flex items-center gap-2 text-sm font-semibold text-emeraldDark-900">
                      <Lock className="h-4 w-4 text-emeraldDark-700" aria-hidden />
                      Organizer Tools
                    </p>
                    {!isAdmin && (
                      <button
                        type="button"
                        onClick={() => setAdminPanelOpen(false)}
                        aria-label="Close organizer panel"
                        className="rounded-full p-1 text-gray-400 hover:bg-emeraldDark-50 hover:text-emeraldDark-700"
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
                        Trash icons are visible next to each RSVP. Removing a
                        family also unlocks their device so they can RSVP again.
                      </p>
                      <button
                        type="button"
                        onClick={handleAdminLogout}
                        className="inline-flex items-center gap-2 rounded-full border border-emeraldDark-900/10 bg-white px-4 py-2 text-xs font-semibold text-emeraldDark-900 transition hover:bg-emeraldDark-50"
                      >
                        <LogOut className="h-3.5 w-3.5" aria-hidden />
                        Log out of organizer mode
                      </button>
                    </div>
                  ) : (
                    <form
                      onSubmit={handleAdminLogin}
                      className="mt-3 space-y-2"
                    >
                      <label
                        htmlFor="admin-pw"
                        className="block text-xs font-medium text-emeraldDark-800"
                      >
                        Enter organizer password
                      </label>
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <KeyRound
                            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                            aria-hidden
                          />
                          <input
                            id="admin-pw"
                            type="password"
                            value={adminInput}
                            onChange={(e) => setAdminInput(e.target.value)}
                            placeholder="Password"
                            className="w-full rounded-xl border border-emeraldDark-900/10 bg-white px-3 py-2 pl-9 text-sm text-emeraldDark-900 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/30"
                          />
                        </div>
                        <button
                          type="submit"
                          disabled={adminVerifying}
                          className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-emeraldDark-800 px-4 py-2 text-xs font-semibold text-white shadow-soft transition hover:bg-emeraldDark-900 disabled:cursor-wait disabled:opacity-70"
                        >
                          {adminVerifying ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          ) : (
                            <ShieldCheck className="h-3.5 w-3.5" />
                          )}
                          Log in
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

              <p className="mt-5 text-[11px] leading-relaxed text-gray-400">
                {RSVP_ENABLED
                  ? "Each device can RSVP once. Only the event organizer can remove an entry."
                  : "RSVPs are currently disabled. Please call to reserve."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
