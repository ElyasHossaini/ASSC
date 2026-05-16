import type { Metadata } from "next";
import { Inter, Playfair_Display, Amiri, Vazirmatn } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageProvider";

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

const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  variable: "--font-vazirmatn",
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
    "انجمن شیعیان افغانستان کلگری",
  ],
  openGraph: {
    title: "Afghanistan Shia Society of Calgary",
    description:
      "A welcoming Afghan Shia Muslim community in Calgary — programs, education, and gatherings for all ages.",
    type: "website",
    locale: "en_CA",
  },
};

// This script runs synchronously before React hydrates so the <html lang/dir>
// is correct on first paint (prevents a flash of wrong layout direction for
// Farsi-default users). React's LanguageProvider then takes over.
const langInitScript = `(function(){try{var s=localStorage.getItem("assc:lang");var l=s;if(l!=="en"&&l!=="fa"){var n=(navigator.language||"").toLowerCase();l=(n.indexOf("fa")===0||n.indexOf("prs")===0||n.indexOf("ps")===0)?"fa":"en";}var h=document.documentElement;h.lang=l;h.dir=(l==="fa")?"rtl":"ltr";}catch(e){}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${inter.variable} ${playfair.variable} ${amiri.variable} ${vazirmatn.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: langInitScript }} />
      </head>
      <body className="font-sans" suppressHydrationWarning>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
