import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PrayerTimesSection from "@/components/PrayerTimesSection";
import AboutSection from "@/components/AboutSection";
import ProgramsSection from "@/components/ProgramsSection";
import UpcomingEventsSection from "@/components/UpcomingEventsSection";
import EventsSection from "@/components/EventsSection";
import AnnouncementsSection from "@/components/AnnouncementsSection";
import GallerySection from "@/components/GallerySection";
import DonationSection from "@/components/DonationSection";
import NewsletterSection from "@/components/NewsletterSection";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Hero />
        <PrayerTimesSection />
        <AboutSection />
        <ProgramsSection />
        <UpcomingEventsSection />
        <EventsSection />
        <AnnouncementsSection />
        <GallerySection />
        <DonationSection />
        <NewsletterSection />
      </main>
      <Footer />
    </>
  );
}
