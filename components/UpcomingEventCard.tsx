"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  AlertTriangle,
  CalendarHeart,
  CheckCircle2,
  Clock,
  Loader2,
  MapPin,
  RefreshCw,
  Sparkles,
  Trash2,
  Users,
  X,
} from "lucide-react";
import {
  addRsvp,
  clearMyRsvpId,
  getDeviceId,
  getMyRsvpId,
  listRsvps,
  removeRsvp,
  setMyRsvpId,
  RSVP_ENABLED,
  type Rsvp,
} from "@/lib/rsvp";
import { SITE } from "@/lib/site";
import { useLanguage } from "./LanguageProvider";

export type UpcomingEventMeta = {
  id: string;
  image: string | null;
  imageAlt: string;
};

type EventContent = {
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  poem: string[];
  programTitle: string;
  programItems: string[];
  fromOrganizer: string;
};

type Props = {
  event: UpcomingEventMeta;
  content: EventContent;
  adminToken: string | null;
  onAdminSessionExpired: () => void;
};

function tpl(str: string, vars: Record<string, string | number>) {
  return str.replace(/\{\{(\w+)\}\}/g, (_, k) =>
    vars[k] !== undefined ? String(vars[k]) : `{{${k}}}`
  );
}

const REFRESH_INTERVAL_MS = 30_000;

export default function UpcomingEventCard({
  event,
  content,
  adminToken,
  onAdminSessionExpired,
}: Props) {
  const { t } = useLanguage();
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

  const [removingId, setRemovingId] = useState<string | null>(null);
  const [removeError, setRemoveError] = useState<string | null>(null);

  const justAddedRef = useRef<string | null>(null);
  const [justAdded, setJustAdded] = useState<string | null>(null);

  // Boot: load device id + saved RSVP id for THIS event
  useEffect(() => {
    setDeviceId(getDeviceId());
    setMyRsvpIdState(getMyRsvpId(event.id));
  }, [event.id]);

  const refresh = useCallback(
    async (silent = false) => {
      if (!RSVP_ENABLED) {
        setLoading(false);
        return;
      }
      try {
        if (!silent) setRefreshing(true);
        const list = await listRsvps(event.id);
        setRsvps(list);
        setListError(null);
      } catch (err) {
        setListError(
          err instanceof Error ? err.message : t.upcoming.errors.network
        );
      } finally {
        setRefreshing(false);
        setLoading(false);
      }
    },
    [event.id, t]
  );

  useEffect(() => {
    refresh();
    const timer = window.setInterval(
      () => refresh(true),
      REFRESH_INTERVAL_MS
    );
    const onVisible = () => {
      if (document.visibilityState === "visible") refresh(true);
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [refresh]);

  // If my saved RSVP id is no longer present (admin removed it), clear local state.
  useEffect(() => {
    if (!myRsvpId) return;
    if (loading) return;
    const stillThere = rsvps.some((r) => r.id === myRsvpId);
    if (!stillThere) {
      clearMyRsvpId(event.id);
      setMyRsvpIdState(null);
    }
  }, [rsvps, myRsvpId, loading, event.id]);

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
      setFormError(t.upcoming.errors.nameMin);
      return;
    }
    if (!Number.isFinite(n) || n < 1 || n > 50) {
      setFormError(t.upcoming.errors.countInvalid);
      return;
    }

    setFormError(null);
    setSubmitting(true);
    try {
      const result = await addRsvp({
        eventId: event.id,
        name: trimmed,
        count: Math.floor(n),
        deviceId,
      });

      if (result.ok) {
        setMyRsvpId(event.id, result.rsvp.id);
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
        refresh(true);
      } else if (result.error === "already_rsvped") {
        setFormError(t.upcoming.errors.alreadyRsvped);
        refresh(true);
      } else {
        setFormError(t.upcoming.errors.submitFailed);
      }
    } catch {
      setFormError(t.upcoming.errors.network);
    } finally {
      setSubmitting(false);
    }
  };

  const handleRemove = async (rsvp: Rsvp) => {
    if (!adminToken) return;
    const unit =
      rsvp.count === 1 ? t.upcoming.personOne : t.upcoming.personMany;
    const ok = window.confirm(
      tpl(t.upcoming.removeConfirm, {
        name: rsvp.name,
        count: rsvp.count,
        unit,
      })
    );
    if (!ok) return;
    setRemovingId(rsvp.id);
    setRemoveError(null);
    try {
      const result = await removeRsvp({ id: rsvp.id, token: adminToken });
      if (result.ok) {
        setRsvps((prev) => prev.filter((r) => r.id !== rsvp.id));
        if (rsvp.id === myRsvpId) {
          clearMyRsvpId(event.id);
          setMyRsvpIdState(null);
        }
        refresh(true);
      } else if (result.error === "unauthorized") {
        onAdminSessionExpired();
      } else if (result.error === "not_found") {
        refresh(true);
      } else {
        setRemoveError(t.upcoming.errors.removeFailed);
        window.setTimeout(() => setRemoveError(null), 4000);
      }
    } catch {
      setRemoveError(t.upcoming.errors.removeNetwork);
      window.setTimeout(() => setRemoveError(null), 4000);
    } finally {
      setRemovingId(null);
    }
  };

  const isAdmin = !!adminToken;
  const hasPoem = content.poem.length > 0;
  const hasProgram = content.programItems.length > 0;
  const hasImage = !!event.image;

  return (
    <article className="overflow-hidden rounded-3xl bg-white shadow-elegant ring-1 ring-emeraldDark-900/5">
      <div className="grid gap-0 lg:grid-cols-5">
        {/* Event poster / content */}
        <div className={hasImage ? "lg:col-span-3" : "lg:col-span-3"}>
          <div className="bg-gradient-to-br from-emeraldDark-50 via-white to-gold-50/40">
            {hasImage && (
              <div className="flex items-center justify-center p-3 sm:p-4">
                <Image
                  src={event.image as string}
                  alt={event.imageAlt}
                  width={1141}
                  height={1600}
                  sizes="(max-width: 1024px) 95vw, 55vw"
                  className="h-auto w-full max-w-[560px] rounded-2xl object-contain shadow-soft"
                />
              </div>
            )}
            <div className="flex flex-col gap-4 border-t border-emeraldDark-900/5 bg-white p-5 sm:p-7">
              <div className="flex flex-wrap items-center gap-2.5 text-sm">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-500 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
                  <CalendarHeart className="h-3.5 w-3.5" aria-hidden />
                  {content.date}
                </span>
                {content.time && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emeraldDark-50 px-3 py-1 text-xs font-medium text-emeraldDark-800 ring-1 ring-emeraldDark-200">
                    <Clock className="h-3.5 w-3.5 text-gold-600" aria-hidden />
                    {content.time}
                  </span>
                )}
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emeraldDark-50 px-3 py-1 text-xs font-medium text-emeraldDark-800 ring-1 ring-emeraldDark-200">
                  <MapPin className="h-3.5 w-3.5 text-gold-600" aria-hidden />
                  {content.location}
                </span>
              </div>
              <h3 className="font-display text-2xl font-semibold leading-tight text-emeraldDark-900 sm:text-3xl">
                {content.title}
              </h3>

              {hasPoem && (
                <blockquote className="relative rounded-2xl border border-gold-200 bg-gradient-to-br from-gold-50 to-white p-5 text-emeraldDark-900 shadow-soft">
                  <Sparkles
                    className="absolute -top-3 start-5 h-6 w-6 rounded-full bg-white p-1 text-gold-500 ring-1 ring-gold-200"
                    aria-hidden
                  />
                  <p className="text-sm italic leading-relaxed sm:text-base">
                    {content.poem.map((line, i) => (
                      <span key={i}>
                        {line}
                        {i < content.poem.length - 1 && <br />}
                      </span>
                    ))}
                  </p>
                </blockquote>
              )}

              <p className="text-sm leading-relaxed text-gray-700 sm:text-base">
                {content.description}
              </p>

              {hasProgram && (
                <div className="rounded-2xl bg-emeraldDark-50/60 p-5 ring-1 ring-emeraldDark-900/5">
                  <p className="text-xs font-semibold uppercase tracking-widest text-gold-700">
                    {content.programTitle}
                  </p>
                  <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                    {content.programItems.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm leading-relaxed text-emeraldDark-900"
                      >
                        <span
                          aria-hidden
                          className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {content.fromOrganizer && (
                <p className="text-xs font-medium uppercase tracking-widest text-gray-400">
                  {content.fromOrganizer}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* RSVP panel */}
        <div className="lg:col-span-2">
          <div className="h-full border-t border-emeraldDark-900/5 bg-[#fafaf7] p-6 sm:p-8 lg:border-t-0 lg:border-s">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gold-600">
                  {t.upcoming.totalAttending}
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
                {rsvps.length === 1
                  ? t.upcoming.familyOne
                  : t.upcoming.familyMany}{" "}
                {t.upcoming.rsvped}
              </span>
              {RSVP_ENABLED && (
                <button
                  type="button"
                  onClick={() => refresh()}
                  disabled={refreshing}
                  aria-label={t.upcoming.refresh}
                  className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-emeraldDark-700 transition hover:bg-emeraldDark-50 disabled:opacity-50"
                  suppressHydrationWarning
                >
                  <RefreshCw
                    className={`h-3 w-3 ${refreshing ? "animate-spin" : ""}`}
                    aria-hidden
                  />
                  {t.upcoming.refresh}
                </button>
              )}
            </div>

            {!RSVP_ENABLED ? (
              <div className="mt-6 rounded-xl bg-gold-50 px-4 py-4 text-sm text-gold-900 ring-1 ring-gold-200">
                <p className="font-semibold">{t.upcoming.disabledTitle}</p>
                <p className="mt-1 text-gold-800">
                  {t.upcoming.disabledBodyA}{" "}
                  <a
                    href={SITE.phoneHref}
                    className="font-semibold underline-offset-2 hover:underline"
                    dir="ltr"
                  >
                    {SITE.phone}
                  </a>{" "}
                  {t.upcoming.disabledBodyB}
                </p>
              </div>
            ) : hasRsvped && myEntry ? (
              <div className="mt-6 rounded-xl bg-emeraldDark-50 px-4 py-4 ring-1 ring-emeraldDark-100">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emeraldDark-700" />
                  <div className="min-w-0">
                    <p className="font-semibold text-emeraldDark-900">
                      {t.upcoming.onTheListTitle}
                    </p>
                    <p className="mt-1 text-sm text-emeraldDark-800">
                      <span className="font-medium">{myEntry.name}</span> —{" "}
                      {myEntry.count}{" "}
                      {myEntry.count === 1
                        ? t.upcoming.onTheListPersonOne
                        : t.upcoming.onTheListPersonMany}
                    </p>
                    <p className="mt-2 text-xs text-emeraldDark-700">
                      {t.upcoming.onTheListChangeA}{" "}
                      <a
                        href={SITE.phoneHref}
                        className="font-semibold underline-offset-2 hover:underline"
                        dir="ltr"
                      >
                        {SITE.phone}
                      </a>
                      {t.upcoming.onTheListChangeB}
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
                suppressHydrationWarning
              >
                <CalendarHeart className="h-4 w-4" aria-hidden />
                {t.upcoming.rsvpButton}
              </button>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <label
                    htmlFor={`rsvp-name-${event.id}`}
                    className="mb-1.5 block text-sm font-semibold text-emeraldDark-900"
                  >
                    {t.upcoming.nameLabel}
                  </label>
                  <input
                    id={`rsvp-name-${event.id}`}
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t.upcoming.namePlaceholder}
                    maxLength={80}
                    autoFocus
                    className="w-full rounded-xl border border-emeraldDark-900/10 bg-white px-4 py-2.5 text-sm text-emeraldDark-900 placeholder:text-gray-400 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/30"
                  />
                </div>

                <div>
                  <label
                    htmlFor={`rsvp-count-${event.id}`}
                    className="mb-1.5 block text-sm font-semibold text-emeraldDark-900"
                  >
                    {t.upcoming.countLabel}
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      aria-label={t.upcoming.decrease}
                      onClick={() =>
                        setCount((c) =>
                          Math.max(1, (typeof c === "number" ? c : 1) - 1)
                        )
                      }
                      className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emeraldDark-900/10 text-lg font-semibold text-emeraldDark-900 transition hover:bg-emeraldDark-50 focus:outline-none focus:ring-2 focus:ring-gold-500/30"
                      suppressHydrationWarning
                    >
                      −
                    </button>
                    <input
                      id={`rsvp-count-${event.id}`}
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
                      aria-label={t.upcoming.increase}
                      onClick={() =>
                        setCount((c) =>
                          Math.min(50, (typeof c === "number" ? c : 1) + 1)
                        )
                      }
                      className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emeraldDark-900/10 text-lg font-semibold text-emeraldDark-900 transition hover:bg-emeraldDark-50 focus:outline-none focus:ring-2 focus:ring-gold-500/30"
                      suppressHydrationWarning
                    >
                      +
                    </button>
                  </div>
                  <p className="mt-1.5 text-xs text-gray-500">
                    {t.upcoming.countHelp}
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
                    suppressHydrationWarning
                  >
                    {submitting ? (
                      <>
                        <Loader2
                          className="h-4 w-4 animate-spin"
                          aria-hidden
                        />
                        {t.upcoming.submitting}
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="h-4 w-4" aria-hidden />
                        {t.upcoming.confirm}
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
                    suppressHydrationWarning
                  >
                    <X className="h-4 w-4" aria-hidden />
                    {t.upcoming.cancel}
                  </button>
                </div>
              </form>
            )}

            {/* Families list */}
            <div className="mt-7 border-t border-emeraldDark-900/5 pt-5">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-emeraldDark-900">
                  {t.upcoming.familiesHeading}
                </p>
                {listError && (
                  <button
                    type="button"
                    onClick={() => refresh()}
                    className="text-xs font-semibold text-red-600 underline-offset-2 hover:underline"
                    suppressHydrationWarning
                  >
                    {t.upcoming.retry}
                  </button>
                )}
              </div>

              {listError && (
                <p className="mt-2 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700 ring-1 ring-red-200">
                  {listError}
                </p>
              )}

              {removeError && (
                <p className="mt-2 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700 ring-1 ring-red-200">
                  {removeError}
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
                  {t.upcoming.emptyList}
                </p>
              )}

              {!listError && !loading && rsvps.length > 0 && (
                <ul className="mt-3 max-h-72 space-y-2 overflow-y-auto pe-1">
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
                                {t.upcoming.youBadge}
                              </span>
                            )}
                          </p>
                          <p className="text-xs text-gray-500">
                            {r.count}{" "}
                            {r.count === 1
                              ? t.upcoming.personOne
                              : t.upcoming.personMany}
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
                              aria-label={tpl(t.upcoming.removeAria, {
                                name: r.name,
                              })}
                              className="inline-flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition hover:bg-red-50 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 disabled:opacity-50"
                              suppressHydrationWarning
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
                    {t.upcoming.grandTotal}
                  </span>
                  <span className="font-display text-xl font-bold text-white">
                    {total}
                  </span>
                </div>
              )}
            </div>

            <p className="mt-5 text-[11px] leading-relaxed text-gray-400">
              {RSVP_ENABLED
                ? t.upcoming.footerEnabled
                : t.upcoming.footerDisabled}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
