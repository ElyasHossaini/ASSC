import type { Metadata } from "next";
import { Inter, Playfair_Display, Amiri } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const amiri = Amiri({
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  variable: "--font-amiri",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Afghanistan Shia Society of Calgary",
    template: "%s | Afghanistan Shia Society of Calgary",
  },
  description:
    "Serving the Afghan Shia Muslim community in Calgary through worship, education, culture, and community support.",
  keywords: [
    "Afghanistan Shia Society",
    "Calgary",
    "Afghan Shia",
    "Muslim community Calgary",
    "Hussainiya Calgary",
    "Shia mosque Calgary",
    "Afghan community Calgary",
  ],
  openGraph: {
    title: "Afghanistan Shia Society of Calgary",
    description:
      "A welcoming Afghan Shia Muslim community in Calgary — programs, education, and gatherings for all ages.",
    type: "website",
    locale: "en_CA",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${amiri.variable}`}
    >
      <body className="font-sans">{children}</body>
    </html>
  );
}
