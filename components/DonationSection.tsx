"use client";

import { useState } from "react";
import {
  Heart,
  HandCoins,
  BookOpenCheck,
  Users,
  Copy,
  Check,
  Mail,
  Phone,
  type LucideIcon,
} from "lucide-react";
import { SITE } from "@/lib/site";
import { useLanguage } from "./LanguageProvider";

const IMPACT_ICONS: LucideIcon[] = [BookOpenCheck, Users, HandCoins];

export default function DonationSection() {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(SITE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // ignore clipboard errors
    }
  };

  return (
    <section
      id="donations"
      className="relative overflow-hidden py-20 sm:py-28"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-emeraldDark-950 via-emeraldDark-900 to-royal-950" />
      <div
        aria-hidden
        className="absolute inset-0 bg-islamic-pattern-gold opacity-25"
      />
      <div
        aria-hidden
        className="absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-gold-500/10 blur-3xl"
      />

      <div className="container-wide relative">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <p className="inline-flex items-center gap-2 rounded-full border border-gold-400/40 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gold-300 backdrop-blur">
              <Heart className="h-3.5 w-3.5" aria-hidden />
              {t.donations.eyebrow}
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-white text-balance sm:text-4xl lg:text-5xl">
              {t.donations.headingA}{" "}
              <span className="bg-gradient-to-r from-gold-300 to-gold-500 bg-clip-text text-transparent">
                {t.donations.headingB}
              </span>
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-emeraldDark-100 sm:text-lg">
              {t.donations.intro}
            </p>

            <p className="mt-4 font-arabic text-lg text-gold-300" dir="rtl">
              مَن ذَا ٱلَّذِى يُقْرِضُ ٱللَّهَ قَرْضًا حَسَنًا
            </p>
            <p className="text-sm text-emeraldDark-200/80">
              {t.donations.quoteEn}
            </p>

            <div className="mt-10 space-y-4">
              {t.donations.items.map((item, i) => {
                const Icon = IMPACT_ICONS[i] ?? BookOpenCheck;
                return (
                  <div
                    key={item.title}
                    className="group flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur transition-all duration-300 hover:border-gold-400/40 hover:bg-white/10"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold-400/10 text-gold-300 ring-1 ring-gold-400/30 transition-transform duration-300 group-hover:scale-110">
                      <Icon className="h-5 w-5" aria-hidden />
                    </div>
                    <div>
                      <p className="font-display text-lg font-semibold text-white">
                        {item.title}
                      </p>
                      <p className="mt-1 text-sm text-emeraldDark-100/85">
                        {item.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* E-Transfer card */}
          <div className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-3xl border border-gold-400/30 bg-white p-8 shadow-elegant">
              <div
                aria-hidden
                className="absolute -end-12 -top-12 h-48 w-48 rounded-full bg-gold-400/20 blur-3xl"
              />
              <div className="relative">
                <div className="inline-flex items-center gap-2 rounded-full bg-emeraldDark-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-emeraldDark-800 ring-1 ring-emeraldDark-200">
                  <Heart className="h-3.5 w-3.5 text-gold-600" aria-hidden />
                  {t.donations.cardEyebrow}
                </div>

                <h3 className="mt-5 font-display text-2xl font-bold text-emeraldDark-900 sm:text-3xl">
                  {t.donations.cardTitle}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">
                  {t.donations.cardIntro}
                </p>

                <div className="mt-6 rounded-2xl border border-emeraldDark-900/10 bg-gradient-to-br from-emeraldDark-50/60 to-gold-50/40 p-5">
                  <p className="text-xs font-semibold uppercase tracking-widest text-gold-700">
                    {t.donations.sendTo}
                  </p>
                  <div className="mt-2 flex items-center justify-between gap-3">
                    <p
                      className="break-all font-display text-lg font-semibold text-emeraldDark-900 sm:text-xl"
                      dir="ltr"
                    >
                      {SITE.email}
                    </p>
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-emeraldDark-900 px-3 py-2 text-xs font-semibold text-white shadow-soft transition hover:bg-emeraldDark-800"
                      aria-label={t.donations.copyAria}
                    >
                      {copied ? (
                        <>
                          <Check className="h-3.5 w-3.5" aria-hidden />
                          {t.donations.copied}
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" aria-hidden />
                          {t.donations.copy}
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <ol className="mt-6 space-y-3 text-sm text-emeraldDark-900">
                  <Step n={1}>
                    {t.donations.step1Pre}{" "}
                    <span className="font-semibold">
                      {t.donations.step1Strong}
                    </span>
                    {t.donations.step1Post}
                  </Step>
                  <Step n={2}>
                    {t.donations.step2Pre}{" "}
                    <span
                      className="font-semibold break-all"
                      dir="ltr"
                    >
                      {SITE.email}
                    </span>
                    {t.donations.step2Post}
                  </Step>
                  <Step n={3}>
                    {t.donations.step3Pre}{" "}
                    <span className="italic">{t.donations.step3Italic}</span>
                    {t.donations.step3Post}
                  </Step>
                </ol>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <a
                    href={SITE.emailHref}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-br from-gold-500 to-gold-600 px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:shadow-glow"
                  >
                    <Mail className="h-4 w-4" aria-hidden />
                    {t.donations.emailUs}
                  </a>
                  <a
                    href={SITE.phoneHref}
                    className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-emeraldDark-800 px-5 py-3 text-sm font-semibold text-emeraldDark-900 transition hover:bg-emeraldDark-800 hover:text-white"
                  >
                    <Phone className="h-4 w-4" aria-hidden />
                    {t.donations.callUs}
                  </a>
                </div>

                <p className="mt-5 text-xs leading-relaxed text-gray-500">
                  {t.donations.closing}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Step({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emeraldDark-900 text-xs font-bold text-gold-300">
        {n}
      </span>
      <span className="leading-relaxed">{children}</span>
    </li>
  );
}
