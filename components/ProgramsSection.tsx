import {
  BookOpen,
  CalendarHeart,
  GraduationCap,
  Moon,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react";

type Program = {
  icon: LucideIcon;
  title: string;
  description: string;
  accent: "emerald" | "royal" | "gold";
};

const PROGRAMS: Program[] = [
  {
    icon: CalendarHeart,
    title: "Daily & Weekly Religious Programs",
    description:
      "Regular prayer programs, Dua sessions, and majalis held throughout the week to keep our community connected to worship and remembrance.",
    accent: "emerald",
  },
  {
    icon: BookOpen,
    title: "Quran & Islamic Education",
    description:
      "Quran recitation, Tajweed, and Islamic studies classes for children, youth, and adults — taught by knowledgeable community members.",
    accent: "gold",
  },
  {
    icon: GraduationCap,
    title: "Youth Programs",
    description:
      "Activities, mentorship, and Islamic learning designed to engage the next generation and help our youth grow rooted in their faith.",
    accent: "royal",
  },
  {
    icon: Users,
    title: "Community Gatherings",
    description:
      "Family nights, dinners, and social events that strengthen friendships and bring families together in a welcoming environment.",
    accent: "emerald",
  },
  {
    icon: Moon,
    title: "Muharram & Ramadan Programs",
    description:
      "Nightly majalis during Muharram and Safar, communal iftars in Ramadan, and special programs marking the holy months and Islamic occasions.",
    accent: "gold",
  },
  {
    icon: Sparkles,
    title: "Family & Cultural Events",
    description:
      "Eid celebrations, Afghan cultural evenings, and family-friendly gatherings that honor our heritage and bring joy to all ages.",
    accent: "royal",
  },
];

const ACCENT_STYLES: Record<Program["accent"], string> = {
  emerald:
    "from-emeraldDark-50 to-emeraldDark-100 text-emeraldDark-800 ring-emeraldDark-200",
  royal: "from-royal-50 to-royal-100 text-royal-800 ring-royal-200",
  gold: "from-gold-50 to-gold-100 text-gold-700 ring-gold-200",
};

export default function ProgramsSection() {
  return (
    <section
      id="programs"
      className="relative overflow-hidden bg-white py-20 sm:py-28"
    >
      <div className="container-wide">
        <div className="mx-auto max-w-3xl text-center">
          <p className="section-eyebrow mx-auto">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
            Our Programs
          </p>
          <h2 className="section-heading">
            Programs that nurture{" "}
            <span className="text-gold-600">faith and community</span>.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-gray-600 sm:text-lg">
            From weekly prayers and Quran classes to youth activities and
            cultural gatherings, our programs are designed to serve every
            member of the Afghan Shia community in Calgary.
          </p>
          <div className="divider-pattern mt-8">
            <Sparkles className="h-4 w-4" aria-hidden />
          </div>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROGRAMS.map((p) => {
            const Icon = p.icon;
            return (
              <article key={p.title} className="card group relative">
                <div
                  className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${ACCENT_STYLES[p.accent]} ring-1 transition-transform duration-300 group-hover:scale-110`}
                >
                  <Icon className="h-7 w-7" aria-hidden />
                </div>
                <h3 className="font-display text-lg font-semibold text-emeraldDark-900 sm:text-xl">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">
                  {p.description}
                </p>
                <div
                  aria-hidden
                  className="absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-gold-300 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
