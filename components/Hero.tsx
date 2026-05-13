import Image from "next/image";
import { ArrowRight, MapPin, MoonStar } from "lucide-react";
import { SITE } from "@/lib/site";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative isolate overflow-hidden bg-emeraldDark-950 text-white"
    >
      {/* Background banner image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/shiabanner.jpeg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-40"
        />
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="absolute inset-0 bg-islamic-pattern opacity-30" />
      </div>

      {/* Decorative gold orb */}
      <div
        aria-hidden
        className="absolute -right-32 top-1/4 -z-10 h-96 w-96 rounded-full bg-gold-500/10 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -left-24 bottom-0 -z-10 h-80 w-80 rounded-full bg-royal-500/15 blur-3xl"
      />

      <div className="container-wide relative pb-24 pt-32 sm:pb-32 sm:pt-40 lg:pt-48">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold-400/40 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gold-300 backdrop-blur">
              <MoonStar className="h-3.5 w-3.5" aria-hidden />
              Welcome to ASSC
            </div>

            <h1 className="font-display text-4xl font-bold leading-tight text-balance sm:text-5xl lg:text-6xl xl:text-7xl">
              Afghanistan{" "}
              <span className="bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 bg-clip-text text-transparent">
                Shia Society
              </span>{" "}
              of Calgary
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-emeraldDark-100 sm:text-xl">
              {SITE.tagline}
            </p>

            <p className="mt-3 max-w-2xl text-base text-emeraldDark-200/80">
              A place to pray, learn, and connect — rooted in faith, family,
              and the rich Afghan Islamic tradition.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a href="#programs" className="btn-secondary">
                View Programs
                <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
              <a href="#contact" className="btn-outline-white">
                Contact Us
              </a>
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-emeraldDark-100">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gold-400" aria-hidden />
                <span>{SITE.address}</span>
              </div>
              <div className="hidden h-4 w-px bg-emeraldDark-100/30 sm:block" />
              <a
                href={SITE.phoneHref}
                className="font-medium transition hover:text-gold-300"
              >
                {SITE.phone}
              </a>
            </div>
          </div>

          {/* Logo card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md">
              <div
                aria-hidden
                className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-gold-400/30 via-transparent to-royal-500/20 blur-2xl"
              />
              <div className="relative overflow-hidden rounded-[2rem] border border-white/20 bg-white/5 p-8 backdrop-blur-lg shadow-elegant">
                <div className="absolute inset-0 bg-islamic-pattern-gold opacity-40" />
                <div className="relative flex flex-col items-center text-center">
                  <div className="relative h-44 w-44 overflow-hidden rounded-full ring-4 ring-gold-400/60 ring-offset-4 ring-offset-emeraldDark-950 sm:h-52 sm:w-52">
                    <Image
                      src="/images/shialogo.jpeg"
                      alt={`${SITE.name} official logo`}
                      fill
                      sizes="(max-width: 640px) 176px, 208px"
                      className="object-cover"
                      priority
                    />
                  </div>
                  <p className="mt-6 font-arabic text-2xl text-gold-300">
                    أَهْلًا وَسَهْلًا
                  </p>
                  <p className="mt-2 font-display text-xl font-semibold text-white">
                    Welcome, Brothers &amp; Sisters
                  </p>
                  <p className="mt-1 text-sm text-emeraldDark-100/80">
                    A community built on faith, knowledge &amp; service.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom curve */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-b from-transparent to-[#fafaf7]"
      />
    </section>
  );
}
