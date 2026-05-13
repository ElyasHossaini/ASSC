# Afghanistan Shia Society of Calgary — Website

A modern, responsive website for the **Afghanistan Shia Society of Calgary** built with Next.js, TypeScript, and Tailwind CSS.

## Tech Stack

- [Next.js 14](https://nextjs.org/) (App Router)
- [React 18](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [lucide-react](https://lucide.dev/) icons

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for production

```bash
npm run build
npm run start
```

## Project Structure

```
.
├── app/
│   ├── globals.css         # Tailwind + global styles
│   ├── layout.tsx          # Root layout, fonts, metadata
│   └── page.tsx            # Home page composition
├── components/
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── AboutSection.tsx
│   ├── ProgramsSection.tsx
│   ├── EventsSection.tsx
│   ├── AnnouncementsSection.tsx
│   ├── GallerySection.tsx
│   ├── DonationSection.tsx
│   ├── ContactSection.tsx
│   └── Footer.tsx
├── lib/
│   └── site.ts             # Site-wide constants (name, address, etc.)
├── public/
│   └── images/             # shialogo, shiabanner, shia1, shia2
├── tailwind.config.ts
├── next.config.mjs
└── package.json
```

## Design Notes

- **Color palette:** deep emerald green, royal blue, gold, and warm off-white.
- **Typography:** Playfair Display (headings), Inter (body), Amiri (Arabic).
- **Patterns:** subtle Islamic geometric SVG patterns layered into hero, donation, and notice-board backgrounds.
- **Accessibility:** semantic HTML, proper landmarks, keyboard-friendly nav, and labelled form fields.
- **Responsive:** mobile-first, with a hamburger nav on small screens and a polished top bar on desktop.

## Organization Info

- **Address:** 3003 10 St NW, Calgary, AB T2K 1H2
- **Phone:** 493-861-3835
- **Email:** Ghorban1976@yahoo.com

## Notes

- Donation links are placeholders — wire them up to a real provider (e.g., Stripe, PayPal, Zeffy) when ready.
- The contact form submits client-side; connect it to an email service (Resend, Formspree, EmailJS, etc.) for production.
- Social media links in the footer are placeholders (`href="#"`).
