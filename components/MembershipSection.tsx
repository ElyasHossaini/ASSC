"use client";

import Image from "next/image";
import {
  Download,
  FileText,
  Mail,
  Phone,
  ScrollText,
  Send,
  Users,
} from "lucide-react";
import { SITE } from "@/lib/site";
import { useLanguage } from "./LanguageProvider";

const FORM_PATH = "/memberform/ASAC_Membership%20Application%20Form_v4.pdf";

export default function MembershipSection() {
  const { t } = useLanguage();

  const steps = [
    {
      title: t.membership.step1Title,
      text: t.membership.step1Text,
      icon: Download,
    },
    {
      title: t.membership.step2Title,
      text: t.membership.step2Text,
      icon: ScrollText,
    },
    {
      title: t.membership.step3Title,
      text: t.membership.step3Text,
      icon: Send,
    },
  ];

  return (
    <section
      id="membership"
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
            {t.membership.eyebrow}
          </p>
          <h2 className="section-heading">
            {t.membership.headingA}{" "}
            <span className="text-gold-600">{t.membership.headingB}</span>.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-gray-600 sm:text-lg">
            {t.membership.intro}
          </p>
          <div className="divider-pattern mt-8">
            <Users className="h-4 w-4" aria-hidden />
          </div>
        </div>

        <div className="mt-14 grid items-stretch gap-8 lg:grid-cols-5 lg:gap-10">
          {/* Community photo */}
          <div className="lg:col-span-2">
            <div className="relative h-full min-h-[20rem] overflow-hidden rounded-3xl shadow-elegant ring-1 ring-emeraldDark-900/10">
              <Image
                src="/images/PHOTO-2026-05-14-09-08-30.jpg"
                alt="Community members gathered at the Afghanistan Shia Society of Calgary"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emeraldDark-950/70 via-emeraldDark-950/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <p className="font-arabic text-lg text-gold-300">
                  أَهْلًا وَسَهْلًا
                </p>
                <p className="mt-1 font-display text-xl font-semibold">
                  {t.membership.closing}
                </p>
              </div>
            </div>
          </div>

          {/* Steps + download card */}
          <div className="lg:col-span-3">
            <div className="rounded-3xl bg-white p-6 shadow-elegant ring-1 ring-emeraldDark-900/5 sm:p-8">
              <p className="text-sm leading-relaxed text-gray-700 sm:text-base">
                {t.membership.description}
              </p>

              <ol className="mt-7 space-y-4">
                {steps.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <li
                      key={s.title}
                      className="flex items-start gap-4 rounded-2xl bg-emeraldDark-50/50 p-4 ring-1 ring-emeraldDark-900/5"
                    >
                      <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-gold-400 to-gold-600 text-white shadow-soft">
                        <Icon className="h-5 w-5" aria-hidden />
                        <span className="absolute -end-1.5 -top-1.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-emeraldDark-900 text-[11px] font-bold text-gold-300 ring-2 ring-white">
                          {i + 1}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <p className="font-display text-base font-semibold text-emeraldDark-900 sm:text-lg">
                          {s.title}
                        </p>
                        <p className="mt-1 text-sm leading-relaxed text-gray-600">
                          {s.text}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ol>

              <div className="mt-7 rounded-2xl border-2 border-dashed border-gold-300 bg-gold-50/60 p-5 sm:p-6">
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-gold-600 ring-1 ring-gold-200">
                    <FileText className="h-5 w-5" aria-hidden />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold uppercase tracking-widest text-gold-700">
                      {t.membership.fileLabel}
                    </p>
                    <p className="mt-1 break-all text-sm font-medium text-emeraldDark-900">
                      ASAC_Membership Application Form_v4.pdf
                    </p>
                  </div>
                </div>

                <a
                  href={FORM_PATH}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary mt-5 w-full"
                >
                  <Download className="h-4 w-4" aria-hidden />
                  {t.membership.downloadButton}
                </a>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <a
                  href={SITE.emailHref}
                  className="group flex items-start gap-3 rounded-2xl bg-emeraldDark-50/60 p-4 ring-1 ring-emeraldDark-900/5 transition hover:bg-emeraldDark-50 hover:shadow-soft"
                >
                  <Mail
                    className="mt-0.5 h-5 w-5 shrink-0 text-emeraldDark-700 transition group-hover:text-gold-600"
                    aria-hidden
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gold-700">
                      {t.membership.sendTo}
                    </p>
                    <p
                      className="mt-1 break-all text-sm font-semibold text-emeraldDark-900"
                      dir="ltr"
                    >
                      {SITE.email}
                    </p>
                  </div>
                </a>
                <a
                  href={SITE.phoneHref}
                  className="group flex items-start gap-3 rounded-2xl bg-emeraldDark-50/60 p-4 ring-1 ring-emeraldDark-900/5 transition hover:bg-emeraldDark-50 hover:shadow-soft"
                >
                  <Phone
                    className="mt-0.5 h-5 w-5 shrink-0 text-emeraldDark-700 transition group-hover:text-gold-600"
                    aria-hidden
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gold-700">
                      {t.membership.questionsPre}
                    </p>
                    <p
                      className="mt-1 text-sm font-semibold text-emeraldDark-900"
                      dir="ltr"
                    >
                      {SITE.phone}
                    </p>
                  </div>
                </a>
              </div>

              <p className="mt-5 text-xs leading-relaxed text-gray-500">
                {t.membership.questionsPost}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
