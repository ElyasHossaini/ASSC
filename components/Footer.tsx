import Image from "next/image";
import Link from "next/link";
import {
  Facebook,
  Instagram,
  Youtube,
  Send as TelegramIcon,
  MessageCircle,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/site";

const SOCIALS = [
  { name: "Facebook", href: "#", icon: Facebook },
  { name: "Instagram", href: "#", icon: Instagram },
  { name: "WhatsApp", href: "#", icon: MessageCircle },
  { name: "YouTube", href: "#", icon: Youtube },
  { name: "Telegram", href: "#", icon: TelegramIcon },
];

export default function Footer() {
  return (
    <footer
      id="contact"
      className="relative overflow-hidden bg-emeraldDark-950 text-emeraldDark-100"
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-islamic-pattern-gold opacity-15"
      />
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500" />

      <div className="container-wide relative py-16">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-5">
            <Link href="#home" className="flex items-center gap-3">
              <div className="relative h-14 w-14 overflow-hidden rounded-full ring-2 ring-gold-400/60 ring-offset-2 ring-offset-emeraldDark-950">
                <Image
                  src="/images/shialogo.jpeg"
                  alt={`${SITE.name} logo`}
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-display text-lg font-bold leading-tight text-white">
                  Afghanistan Shia Society
                </p>
                <p className="text-xs font-medium uppercase tracking-widest text-gold-300">
                  of Calgary
                </p>
              </div>
            </Link>

            <p className="mt-5 max-w-md text-sm leading-relaxed text-emeraldDark-200">
              A welcoming Afghan Shia Muslim community in Calgary — serving
              through worship, education, culture, and community support.
            </p>

            <p className="mt-5 font-arabic text-base text-gold-300">
              وَأَنَّ ٱلْمَسَٰجِدَ لِلَّهِ فَلَا تَدْعُوا۟ مَعَ ٱللَّهِ أَحَدًا
            </p>

            <div className="mt-6 flex items-center gap-3">
              {SOCIALS.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.name}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-emeraldDark-100 transition-all duration-300 hover:border-gold-400/60 hover:bg-gold-500 hover:text-white"
                  >
                    <Icon className="h-4 w-4" aria-hidden />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick links */}
          <div className="lg:col-span-3">
            <h3 className="font-display text-base font-semibold uppercase tracking-widest text-gold-300">
              Quick Links
            </h3>
            <ul className="mt-5 grid grid-cols-2 gap-y-2.5 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-emeraldDark-200 transition-colors hover:text-gold-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-4">
            <h3 className="font-display text-base font-semibold uppercase tracking-widest text-gold-300">
              Get in Touch
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin
                  className="mt-0.5 h-4 w-4 shrink-0 text-gold-400"
                  aria-hidden
                />
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${SITE.mapsQuery}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emeraldDark-100 transition hover:text-gold-300"
                >
                  {SITE.address}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone
                  className="mt-0.5 h-4 w-4 shrink-0 text-gold-400"
                  aria-hidden
                />
                <a
                  href={SITE.phoneHref}
                  className="text-emeraldDark-100 transition hover:text-gold-300"
                >
                  {SITE.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail
                  className="mt-0.5 h-4 w-4 shrink-0 text-gold-400"
                  aria-hidden
                />
                <a
                  href={SITE.emailHref}
                  className="break-all text-emeraldDark-100 transition hover:text-gold-300"
                >
                  {SITE.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-emeraldDark-200 sm:flex-row">
          <p>
            &copy; 2026 {SITE.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-emeraldDark-300">
            <p>Built with care for the community.</p>
            <span aria-hidden className="text-emeraldDark-400">·</span>
            <a
              href="/?admin#upcoming"
              className="text-emeraldDark-300 transition hover:text-gold-300"
            >
              Organizer
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
