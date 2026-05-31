"use client";

import Image from "next/image";
import {
  Camera,
  ChevronLeft,
  ChevronRight,
  X,
  Maximize2,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLanguage } from "./LanguageProvider";

type GalleryItem = {
  src: string;
  alt: string;
};

// Eid celebration photos (May 28, 2026). Shown as their own group first.
const EID_FILES: string[] = [
  "PHOTO-2026-05-28-22-53-16.jpg",
  "PHOTO-2026-05-28-22-53-17.jpg",
  "PHOTO-2026-05-28-22-53-17(1).jpg",
  "PHOTO-2026-05-28-22-53-17(2).jpg",
  "PHOTO-2026-05-28-22-53-17(3).jpg",
  "PHOTO-2026-05-28-22-53-17(4).jpg",
  "PHOTO-2026-05-28-22-53-17(5).jpg",
  "PHOTO-2026-05-28-22-53-18.jpg",
  "PHOTO-2026-05-28-22-53-18(1).jpg",
  "PHOTO-2026-05-28-22-53-18(2).jpg",
  "PHOTO-2026-05-28-22-53-18(3).jpg",
  "PHOTO-2026-05-28-22-53-18(4).jpg",
  "PHOTO-2026-05-28-22-53-18(5).jpg",
  "PHOTO-2026-05-28-22-53-18(6).jpg",
  "PHOTO-2026-05-28-22-53-19.jpg",
];

const EID: GalleryItem[] = EID_FILES.map((name, i) => ({
  src: `/images/2026-05-31/${encodeURIComponent(name)}`,
  alt: `Eid celebration photo ${i + 1}`,
}));

// Featured images shown first (preserved from original gallery)
const FEATURED: GalleryItem[] = [
  {
    src: "/images/shiabanner.jpeg",
    alt: "Afghanistan Shia Society of Calgary banner",
  },
  {
    src: "/images/shia1.jpeg",
    alt: "Community members gathered at an ASSC event",
  },
  {
    src: "/images/shia2.jpeg",
    alt: "Event sponsors and contributors honored by the society",
  },
];

// Recent event photos (May 14, 2026). Listed in chronological order.
const RECENT_FILES: string[] = [
  "PHOTO-2026-05-14-09-02-36.jpg",
  "PHOTO-2026-05-14-09-02-36(1).jpg",
  "PHOTO-2026-05-14-09-02-36(2).jpg",
  "PHOTO-2026-05-14-09-02-36(3).jpg",
  "PHOTO-2026-05-14-09-02-36(4).jpg",
  "PHOTO-2026-05-14-09-02-36(5).jpg",
  "PHOTO-2026-05-14-09-02-36(6).jpg",
  "PHOTO-2026-05-14-09-02-36(7).jpg",
  "PHOTO-2026-05-14-09-02-42.jpg",
  "PHOTO-2026-05-14-09-02-42(1).jpg",
  "PHOTO-2026-05-14-09-02-42(2).jpg",
  "PHOTO-2026-05-14-09-02-43.jpg",
  "PHOTO-2026-05-14-09-02-43(1).jpg",
  "PHOTO-2026-05-14-09-02-43(2).jpg",
  "PHOTO-2026-05-14-09-02-43(3).jpg",
  "PHOTO-2026-05-14-09-02-43(4).jpg",
  "PHOTO-2026-05-14-09-02-43(5).jpg",
  "PHOTO-2026-05-14-09-02-43(6).jpg",
  "PHOTO-2026-05-14-09-02-43(7).jpg",
  "PHOTO-2026-05-14-09-02-44.jpg",
  "PHOTO-2026-05-14-09-02-44(1).jpg",
  "PHOTO-2026-05-14-09-02-44(2).jpg",
  "PHOTO-2026-05-14-09-02-44(3).jpg",
  "PHOTO-2026-05-14-09-02-47.jpg",
  "PHOTO-2026-05-14-09-02-47(1).jpg",
  "PHOTO-2026-05-14-09-02-47(2).jpg",
  "PHOTO-2026-05-14-09-02-47(3).jpg",
  "PHOTO-2026-05-14-09-07-45.jpg",
  "PHOTO-2026-05-14-09-07-45(1).jpg",
  "PHOTO-2026-05-14-09-07-46.jpg",
  "PHOTO-2026-05-14-09-08-20.jpg",
  "PHOTO-2026-05-14-09-08-20(1).jpg",
  "PHOTO-2026-05-14-09-08-20(2).jpg",
  "PHOTO-2026-05-14-09-08-30.jpg",
  "PHOTO-2026-05-14-09-08-31.jpg",
  "PHOTO-2026-05-14-09-08-31(1).jpg",
  "PHOTO-2026-05-14-09-08-31(2).jpg",
  "PHOTO-2026-05-14-09-08-31(3).jpg",
  "PHOTO-2026-05-14-09-08-31(4).jpg",
  "PHOTO-2026-05-14-09-08-31(5).jpg",
  "PHOTO-2026-05-14-09-08-41.jpg",
  "PHOTO-2026-05-14-09-08-41(1).jpg",
  "PHOTO-2026-05-14-09-08-41(2).jpg",
  "PHOTO-2026-05-14-09-08-42.jpg",
  "PHOTO-2026-05-14-09-08-42(1).jpg",
  "PHOTO-2026-05-14-09-08-42(2).jpg",
  "PHOTO-2026-05-14-09-08-42(3).jpg",
  "PHOTO-2026-05-14-09-13-40.jpg",
  "PHOTO-2026-05-14-09-13-40(1).jpg",
  "PHOTO-2026-05-14-09-13-40(2).jpg",
  "PHOTO-2026-05-14-09-13-53.jpg",
  "PHOTO-2026-05-14-09-13-53(1).jpg",
  "PHOTO-2026-05-14-09-14-06.jpg",
  "PHOTO-2026-05-14-09-14-25.jpg",
  "PHOTO-2026-05-14-09-14-35.jpg",
  "PHOTO-2026-05-14-09-14-35(1).jpg",
  "PHOTO-2026-05-14-09-14-35(2).jpg",
  "PHOTO-2026-05-14-09-21-16.jpg",
  "PHOTO-2026-05-14-09-21-16(1).jpg",
  "PHOTO-2026-05-14-09-21-17.jpg",
  "PHOTO-2026-05-14-09-21-17(1).jpg",
  "PHOTO-2026-05-14-09-21-17(2).jpg",
  "PHOTO-2026-05-14-09-21-17(3).jpg",
  "PHOTO-2026-05-14-09-21-17(4).jpg",
  "PHOTO-2026-05-14-09-21-17(5).jpg",
  "PHOTO-2026-05-14-09-21-18.jpg",
  "PHOTO-2026-05-14-09-21-18(1).jpg",
];

// encodeURI handles the parentheses safely for the browser.
const RECENT: GalleryItem[] = RECENT_FILES.map((name, i) => ({
  src: `/images/${encodeURIComponent(name)}`,
  alt: `Community event photo ${i + 1}`,
}));

// Eid group is shown first (most recent), then the community gatherings.
// ITEMS is the single flat array the lightbox navigates by global index.
const COMMUNITY: GalleryItem[] = [...FEATURED, ...RECENT];
const ITEMS: GalleryItem[] = [...EID, ...COMMUNITY];

// Global index offset where the community group begins inside ITEMS.
const COMMUNITY_OFFSET = EID.length;

const INITIAL_COUNT = 12;

function tpl(str: string, vars: Record<string, string | number>) {
  return str.replace(/\{\{(\w+)\}\}/g, (_, k) =>
    vars[k] !== undefined ? String(vars[k]) : `{{${k}}}`
  );
}

export default function GallerySection() {
  const { t } = useLanguage();
  const [showAll, setShowAll] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const total = ITEMS.length;
  const communityVisible = showAll
    ? COMMUNITY
    : COMMUNITY.slice(0, INITIAL_COUNT);
  const open = openIndex !== null;

  const close = useCallback(() => setOpenIndex(null), []);
  const prev = useCallback(
    () => setOpenIndex((i) => (i === null ? null : (i - 1 + total) % total)),
    [total]
  );
  const next = useCallback(
    () => setOpenIndex((i) => (i === null ? null : (i + 1) % total)),
    [total]
  );

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };

    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close, prev, next]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchEndX.current = null;
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const distance = touchStartX.current - touchEndX.current;
    const threshold = 50;
    if (distance > threshold) next();
    else if (distance < -threshold) prev();
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Renders one gallery thumbnail. `globalIndex` is the item's position in the
  // flat ITEMS array so the lightbox can navigate across all groups.
  const renderThumb = (item: GalleryItem, globalIndex: number) => (
    <button
      key={item.src}
      type="button"
      onClick={() => setOpenIndex(globalIndex)}
      aria-label={tpl(t.gallery.openPhoto, { i: globalIndex + 1, total })}
      className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-emeraldDark-50/50 shadow-soft ring-1 ring-emeraldDark-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-elegant focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2"
      suppressHydrationWarning
    >
      <Image
        src={item.src}
        alt={item.alt}
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-emeraldDark-950/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-3 end-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-emeraldDark-900 opacity-0 shadow-soft backdrop-blur transition-all duration-300 group-hover:opacity-100"
      >
        <Maximize2 className="h-4 w-4" />
      </span>
    </button>
  );

  return (
    <section
      id="gallery"
      className="relative overflow-hidden bg-[#fafaf7] py-20 sm:py-28"
    >
      <div className="container-wide">
        <div className="mx-auto max-w-3xl text-center">
          <p className="section-eyebrow mx-auto">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
            {t.gallery.eyebrow}
          </p>
          <h2 className="section-heading">
            {t.gallery.headingA}{" "}
            <span className="text-gold-600">{t.gallery.headingB}</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-gray-600 sm:text-lg">
            {t.gallery.intro}
          </p>
          <div className="divider-pattern mt-8">
            <Camera className="h-4 w-4" aria-hidden />
          </div>
        </div>

        {/* Eid celebration group */}
        <div className="mt-12">
          <div className="mb-6 text-center">
            <h3 className="font-display text-2xl font-bold text-emeraldDark-900 sm:text-3xl">
              {t.gallery.eidTitle}
            </h3>
            <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-gray-600 sm:text-base">
              {t.gallery.eidIntro}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
            {EID.map((item, i) => renderThumb(item, i))}
          </div>
        </div>

        {/* Community gatherings group */}
        <div className="mt-16">
          <div className="mb-6 text-center">
            <h3 className="font-display text-2xl font-bold text-emeraldDark-900 sm:text-3xl">
              {t.gallery.communityTitle}
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
            {communityVisible.map((item, i) =>
              renderThumb(item, COMMUNITY_OFFSET + i)
            )}
          </div>
        </div>

        {COMMUNITY.length > INITIAL_COUNT && (
          <div className="mt-10 flex flex-col items-center gap-3">
            <button
              type="button"
              onClick={() => setShowAll((v) => !v)}
              className="btn-secondary"
              suppressHydrationWarning
            >
              {showAll
                ? t.gallery.showFewer
                : tpl(t.gallery.viewAll, { n: COMMUNITY.length })}
            </button>
            <p className="text-xs uppercase tracking-widest text-gray-500">
              {tpl(t.gallery.shownOf, {
                shown: showAll
                  ? COMMUNITY.length
                  : Math.min(INITIAL_COUNT, COMMUNITY.length),
                total: COMMUNITY.length,
              })}
            </p>
          </div>
        )}
      </div>

      {open && openIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t.gallery.photoViewer}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-emeraldDark-950/95 backdrop-blur-sm animate-fade-in"
          onClick={close}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          dir="ltr"
        >
          <button
            type="button"
            onClick={close}
            aria-label={t.gallery.closeViewer}
            className="absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20 backdrop-blur transition-all hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-gold-400 sm:right-6 sm:top-6"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="absolute left-1/2 top-4 z-10 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white ring-1 ring-white/20 backdrop-blur sm:top-6">
            {openIndex + 1} / {total}
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label={t.gallery.prev}
            className="absolute left-2 top-1/2 z-10 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20 backdrop-blur transition-all hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-gold-400 sm:left-6 sm:h-14 sm:w-14"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label={t.gallery.next}
            className="absolute right-2 top-1/2 z-10 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20 backdrop-blur transition-all hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-gold-400 sm:right-6 sm:h-14 sm:w-14"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <div
            className="relative mx-auto flex h-full w-full max-w-6xl items-center justify-center px-4 py-20 sm:px-20"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              key={ITEMS[openIndex].src}
              src={ITEMS[openIndex].src}
              alt={ITEMS[openIndex].alt}
              width={1600}
              height={1600}
              sizes="(max-width: 768px) 95vw, 80vw"
              priority
              className="h-auto max-h-[80vh] w-auto max-w-full rounded-xl object-contain shadow-elegant animate-fade-in"
            />
          </div>
        </div>
      )}
    </section>
  );
}
