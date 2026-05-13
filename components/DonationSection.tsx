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
} from "lucide-react";
import { SITE } from "@/lib/site";

const IMPACT = [
  {
    icon: BookOpenCheck,
    title: "Religious Programs",
    text: "Support daily worship, lectures, and majalis at our centre.",
  },
  {
    icon: Users,
    title: "Youth Education",
    text: "Fund Quran classes, mentorship, and youth activities.",
  },
  {
    icon: HandCoins,
    title: "Community Services",
    text: "Help with events, iftars, and ongoing community support.",
  },
];

export default function DonationSection() {
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
              Support Our Community
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-white text-balance sm:text-4xl lg:text-5xl">
              Support the Afghanistan{" "}
              <span className="bg-gradient-to-r from-gold-300 to-gold-500 bg-clip-text text-transparent">
                Shia Society of Calgary
              </span>
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-emeraldDark-100 sm:text-lg">
              Your donations help support religious programs, youth education,
              community events, and ongoing services for the community.
              Together, we keep the doors of our centre open for prayer,
              learning, and gathering.
            </p>

            <p className="mt-4 font-arabic text-lg text-gold-300">
              مَن ذَا ٱلَّذِى يُقْرِضُ ٱللَّهَ قَرْضًا حَسَنًا
            </p>
            <p className="text-sm text-emeraldDark-200/80">
              &ldquo;Who is it that will lend to Allah a goodly loan?&rdquo;
              — Holy Quran 2:245
            </p>

            <div className="mt-10 space-y-4">
              {IMPACT.map((item) => {
                const Icon = item.icon;
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
                className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-gold-400/20 blur-3xl"
              />
              <div className="relative">
                <div className="inline-flex items-center gap-2 rounded-full bg-emeraldDark-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-emeraldDark-800 ring-1 ring-emeraldDark-200">
                  <Heart className="h-3.5 w-3.5 text-gold-600" aria-hidden />
                  Donate by Interac e-Transfer
                </div>

                <h3 className="mt-5 font-display text-2xl font-bold text-emeraldDark-900 sm:text-3xl">
                  Send your donation via e-Transfer
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">
                  We accept donations through Interac e-Transfer. Please send
                  your contribution to the email address below from your
                  online banking.
                </p>

                <div className="mt-6 rounded-2xl border border-emeraldDark-900/10 bg-gradient-to-br from-emeraldDark-50/60 to-gold-50/40 p-5">
                  <p className="text-xs font-semibold uppercase tracking-widest text-gold-700">
                    Send e-Transfer to
                  </p>
                  <div className="mt-2 flex items-center justify-between gap-3">
                    <p className="break-all font-display text-lg font-semibold text-emeraldDark-900 sm:text-xl">
                      {SITE.email}
                    </p>
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-emeraldDark-900 px-3 py-2 text-xs font-semibold text-white shadow-soft transition hover:bg-emeraldDark-800"
                      aria-label="Copy e-Transfer email address"
                    >
                      {copied ? (
                        <>
                          <Check className="h-3.5 w-3.5" aria-hidden />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" aria-hidden />
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <ol className="mt-6 space-y-3 text-sm text-emeraldDark-900">
                  <Step n={1}>
                    Sign in to your online banking and select{" "}
                    <span className="font-semibold">Interac e-Transfer</span>.
                  </Step>
                  <Step n={2}>
                    Send your donation to{" "}
                    <span className="font-semibold break-all">
                      {SITE.email}
                    </span>
                    .
                  </Step>
                  <Step n={3}>
                    Add a note like{" "}
                    <span className="italic">&ldquo;Donation – ASSC&rdquo;</span>{" "}
                    so we can track your contribution.
                  </Step>
                </ol>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <a
                    href={SITE.emailHref}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-br from-gold-500 to-gold-600 px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:shadow-glow"
                  >
                    <Mail className="h-4 w-4" aria-hidden />
                    Email Us
                  </a>
                  <a
                    href={SITE.phoneHref}
                    className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-emeraldDark-800 px-5 py-3 text-sm font-semibold text-emeraldDark-900 transition hover:bg-emeraldDark-800 hover:text-white"
                  >
                    <Phone className="h-4 w-4" aria-hidden />
                    Call Us
                  </a>
                </div>

                <p className="mt-5 text-xs leading-relaxed text-gray-500">
                  May Allah (s.w.t.) accept your generosity and reward you
                  abundantly. Jazak Allahu Khairan.
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
