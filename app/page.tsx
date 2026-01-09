import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SearchSection from "@/components/SearchSection";
import WhyUs from "@/components/WhyUs";
import Stats from "@/components/Stats";
import CourseCarousel from "@/components/CourseCarousel";
import PopularByCategory from "@/components/PopularByCategory";
import Testimonials from "@/components/Testimonials";
import Placements from "@/components/Placements";
import Partnerships from "@/components/Partnerships";
import ForUniversities from "@/components/ForUniversities";
import ForBusiness from "@/components/ForBusiness";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <SearchSection />
      <WhyUs />
      <Stats />
      <CourseCarousel />
      <PopularByCategory />
      <Testimonials />
      <Placements />
      <Partnerships />
      <ForUniversities />
      <ForBusiness />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}

