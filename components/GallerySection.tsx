import Image from "next/image";
import { Camera } from "lucide-react";

type GalleryItem = {
  src: string;
  alt: string;
  caption: string;
  description: string;
  width: number;
  height: number;
};

const ITEMS: GalleryItem[] = [
  {
    src: "/images/shia1.jpeg",
    alt: "Community members gathered at an ASSC event",
    caption: "Community gathering",
    description:
      "Brothers and sisters coming together for worship and community.",
    width: 866,
    height: 2048,
  },
  {
    src: "/images/shiabanner.jpeg",
    alt: "Afghanistan Shia Society of Calgary banner",
    caption: "Society banner",
    description:
      "The official banner of the Afghanistan Shia Society of Calgary.",
    width: 1800,
    height: 900,
  },
  {
    src: "/images/shia2.jpeg",
    alt: "Event sponsors and contributors honored by the society",
    caption: "Event sponsors",
    description:
      "Honoring the generous sponsors and contributors who make our programs possible.",
    width: 676,
    height: 1600,
  },
];

export default function GallerySection() {
  return (
    <section
      id="gallery"
      className="relative overflow-hidden bg-[#fafaf7] py-20 sm:py-28"
    >
      <div className="container-wide">
        <div className="mx-auto max-w-3xl text-center">
          <p className="section-eyebrow mx-auto">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
            Our Gallery
          </p>
          <h2 className="section-heading">
            Moments from our{" "}
            <span className="text-gold-600">community</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-gray-600 sm:text-lg">
            A glimpse into our gatherings, events, and the people who make
            the Afghanistan Shia Society of Calgary a true community home.
          </p>
          <div className="divider-pattern mt-8">
            <Camera className="h-4 w-4" aria-hidden />
          </div>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {ITEMS.map((item) => (
            <figure
              key={item.src}
              className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-soft ring-1 ring-emeraldDark-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-elegant"
            >
              <div className="flex flex-1 items-center justify-center bg-gradient-to-br from-emeraldDark-50/60 via-white to-gold-50/40 p-4">
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="h-auto w-full rounded-xl object-contain shadow-soft transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                />
              </div>
              <figcaption className="border-t border-emeraldDark-900/5 bg-white p-5">
                <p className="font-display text-lg font-semibold text-emeraldDark-900">
                  {item.caption}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-gray-600">
                  {item.description}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
