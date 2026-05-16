export const SITE = {
  name: "Afghanistan Shia Society of Calgary",
  shortName: "ASSC",
  tagline:
    "Serving the Afghan Shia Muslim community in Calgary through worship, education, culture, and community support.",
  address: "3003 10 St NW, Calgary, AB T2K 1H2",
  phone: "403-861-3835",
  phoneHref: "tel:4038613835",
  email: "Ghorban1976@yahoo.com",
  emailHref: "mailto:Ghorban1976@yahoo.com",
  mapsQuery: "3003+10+St+NW,+Calgary,+AB+T2K+1H2",
} as const;

export const NAV_LINKS = [
  { key: "home", href: "#home" },
  { key: "prayerTimes", href: "#prayer-times" },
  { key: "about", href: "#about" },
  { key: "programs", href: "#programs" },
  { key: "upcoming", href: "#upcoming" },
  { key: "weeklyEvents", href: "#events" },
  { key: "gallery", href: "#gallery" },
  { key: "donations", href: "#donations" },
  { key: "contact", href: "#contact" },
] as const;

export type NavKey = (typeof NAV_LINKS)[number]["key"];
