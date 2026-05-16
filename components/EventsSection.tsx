import { Calendar, Clock, MapPin, ArrowRight } from "lucide-react";
import { SITE } from "@/lib/site";

type EventItem = {
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  tag: string;
  tagColor: "gold" | "emerald" | "royal";
};

const EVENTS: EventItem[] = [
  {
    title: "Friday Program",
    date: "Every Friday",
    time: "7:30 PM",
    location: "ASSC Centre",
    description:
      "Weekly Friday evening program featuring prayer, Quran recitation, and a community lecture.",
    tag: "Weekly",
    tagColor: "emerald",
  },
  {
    title: "Dua Kumayl Night",
    date: "Thursday Nights",
    time: "After Isha Prayer",
    location: "ASSC Centre",
    description:
      "Recitation of the beloved Dua Kumayl followed by reflection and community fellowship.",
    tag: "Spiritual",
    tagColor: "gold",
  },
  {
    title: "Ramadan Community Iftar",
    date: "During Holy Ramadan",
    time: "Sunset (Maghrib)",
    location: "ASSC Centre",
    description:
      "Open community iftars during the blessed month of Ramadan — all families and visitors are welcome.",
    tag: "Seasonal",
    tagColor: "royal",
  },
  {
    title: "Muharram Majlis",
    date: "Muharram & Safar",
    time: "Nightly After Maghrib",
    location: "ASSC Centre",
    description:
      "Nightly majalis remembering Imam Hussain (a.s.) and the martyrs of Karbala, with recitation and reflection.",
    tag: "Annual",
    tagColor: "emerald",
  },
  {
    title: "Youth Quran Class",
    date: "Weekends",
    time: "TBA",
    location: "ASSC Centre",
    description:
      "Quran recitation, Tajweed, and Islamic studies for children and youth in a fun, supportive environment.",
    tag: "Education",
    tagColor: "gold",
  },
];

const TAG_STYLES: Record<EventItem["tagColor"], string> = {
  emerald: "bg-emeraldDark-50 text-emeraldDark-800 ring-emeraldDark-200",
  gold: "bg-gold-50 text-gold-700 ring-gold-200",
  royal: "bg-royal-50 text-royal-700 ring-royal-200",
};

export default function EventsSection() {
  return (
    <section
      id="events"
      className="relative overflow-hidden bg-gradient-to-b from-emeraldDark-50/40 via-[#fafaf7] to-[#fafaf7] py-20 sm:py-28"
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-islamic-pattern opacity-[0.08]"
      />
      <div className="container-wide relative">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <p className="section-eyebrow">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
              Weekly &amp; Seasonal Events
            </p>
            <h2 className="section-heading">
              Our regular{" "}
              <span className="text-gold-600">community gatherings</span>.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-gray-600 sm:text-lg">
              These are the recurring programs you can count on throughout the
              week and during the holy months — open to all families and visitors.
            </p>
          </div>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${SITE.mapsQuery}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-emeraldDark-800 transition hover:text-gold-600"
          >
            <MapPin className="h-4 w-4" aria-hidden />
            Find Our Centre
            <ArrowRight className="h-4 w-4" aria-hidden />
          </a>
        </div>

        <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {EVENTS.map((event) => (
            <li
              key={event.title}
              className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-soft ring-1 ring-emeraldDark-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-elegant"
            >
              {/* Top accent bar */}
              <div className="h-1.5 w-full bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600" />
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-xl font-semibold text-emeraldDark-900">
                    {event.title}
                  </h3>
                  <span
                    className={`inline-flex shrink-0 items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 ${TAG_STYLES[event.tagColor]}`}
                  >
                    {event.tag}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">
                  {event.description}
                </p>

                <dl className="mt-5 space-y-2 border-t border-emeraldDark-900/5 pt-4 text-sm text-emeraldDark-900">
                  <div className="flex items-center gap-2">
                    <dt className="sr-only">Date</dt>
                    <Calendar
                      className="h-4 w-4 shrink-0 text-gold-500"
                      aria-hidden
                    />
                    <dd>{event.date}</dd>
                  </div>
                  <div className="flex items-center gap-2">
                    <dt className="sr-only">Time</dt>
                    <Clock
                      className="h-4 w-4 shrink-0 text-gold-500"
                      aria-hidden
                    />
                    <dd>{event.time}</dd>
                  </div>
                  <div className="flex items-center gap-2">
                    <dt className="sr-only">Location</dt>
                    <MapPin
                      className="h-4 w-4 shrink-0 text-gold-500"
                      aria-hidden
                    />
                    <dd>{event.location}</dd>
                  </div>
                </dl>
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-10 text-center text-sm text-gray-500">
          Exact dates and times may change. Please contact us at{" "}
          <a
            href={SITE.phoneHref}
            className="font-semibold text-emeraldDark-800 hover:text-gold-600"
          >
            {SITE.phone}
          </a>{" "}
          to confirm program schedules.
        </p>
      </div>
    </section>
  );
}
