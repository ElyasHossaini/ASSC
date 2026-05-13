"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, Heart, Phone } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/site";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 shadow-soft backdrop-blur-md"
          : "bg-white/80 backdrop-blur-sm"
      }`}
    >
      {/* Top utility bar */}
      <div className="hidden border-b border-emeraldDark-900/5 bg-emeraldDark-900 text-white lg:block">
        <div className="container-wide flex items-center justify-between py-2 text-xs">
          <div className="flex items-center gap-6 text-emeraldDark-100">
            <span className="flex items-center gap-2">
              <Phone className="h-3.5 w-3.5 text-gold-400" aria-hidden />
              <a
                href={SITE.phoneHref}
                className="transition hover:text-gold-300"
              >
                {SITE.phone}
              </a>
            </span>
            <span className="text-emeraldDark-200">|</span>
            <span className="text-emeraldDark-100">
              <a
                href={SITE.emailHref}
                className="transition hover:text-gold-300"
              >
                {SITE.email}
              </a>
            </span>
          </div>
          <p className="font-arabic text-sm text-gold-300">
            بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
          </p>
        </div>
      </div>

      <nav
        className="container-wide flex items-center justify-between py-3 lg:py-4"
        aria-label="Main navigation"
      >
        <Link
          href="#home"
          className="group flex items-center gap-3"
          aria-label={`${SITE.name} home`}
        >
          <div className="relative h-12 w-12 overflow-hidden rounded-full ring-2 ring-gold-400/60 ring-offset-2 ring-offset-white transition-all duration-300 group-hover:ring-gold-500 sm:h-14 sm:w-14">
            <Image
              src="/images/shialogo.jpeg"
              alt={`${SITE.name} logo`}
              fill
              sizes="64px"
              className="object-cover"
              priority
            />
          </div>
          <div className="hidden sm:block">
            <p className="font-display text-base font-bold leading-tight text-emeraldDark-900 sm:text-lg">
              Afghanistan Shia Society
            </p>
            <p className="text-xs font-medium uppercase tracking-widest text-gold-600">
              of Calgary
            </p>
          </div>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium text-emeraldDark-900 transition-colors duration-200 hover:text-gold-600 xl:px-4"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href="#donations"
            className="hidden items-center gap-2 rounded-full bg-gradient-to-br from-gold-500 to-gold-600 px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition-all duration-300 hover:shadow-glow md:inline-flex"
          >
            <Heart className="h-4 w-4" aria-hidden />
            Donate
          </a>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full p-2 text-emeraldDark-900 transition-colors hover:bg-emeraldDark-50 lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? (
              <X className="h-6 w-6" aria-hidden />
            ) : (
              <Menu className="h-6 w-6" aria-hidden />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`lg:hidden ${open ? "block" : "hidden"}`}
      >
        <div className="border-t border-emeraldDark-900/10 bg-white px-4 pb-6 pt-4 shadow-elegant">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-base font-medium text-emeraldDark-900 transition-colors hover:bg-emeraldDark-50 hover:text-gold-600"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="btn-primary w-full"
            >
              Contact Us
            </a>
            <a
              href="#donations"
              onClick={() => setOpen(false)}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-br from-gold-500 to-gold-600 px-5 py-3 text-sm font-semibold text-white shadow-soft"
            >
              <Heart className="h-4 w-4" aria-hidden />
              Donate
            </a>
          </div>
          <div className="mt-4 space-y-1 border-t border-emeraldDark-900/5 pt-4 text-sm text-emeraldDark-700">
            <a
              href={SITE.phoneHref}
              className="flex items-center gap-2 py-1 hover:text-gold-600"
            >
              <Phone className="h-4 w-4 text-gold-500" aria-hidden />
              {SITE.phone}
            </a>
            <a
              href={SITE.emailHref}
              className="block py-1 hover:text-gold-600"
            >
              {SITE.email}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
