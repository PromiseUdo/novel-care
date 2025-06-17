// app/page.tsx
import AboutUs from "@/components/about-us";
import Hero from "@/components/hero";
import HomePageNav from "@/components/home-page-nav";
import OurServices from "@/components/our-services";
import OurTeam from "@/components/our-team";
import OurValues from "@/components/our-values";
import OurVideo from "@/components/our-video";
import PreloadHeroImage from "@/components/preload-hero-image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Novel Care Services | NDIS Provider",
  description:
    "Leading NDIS provider Perth offering NDIS services Perth, NDIS support Southwest, and disability support Blackwood WA.",
};

export default function Home() {
  return (
    <main>
      <PreloadHeroImage />
      <Hero />
      <HomePageNav />
      <OurValues />
      <AboutUs />
      <OurServices />
      <OurTeam />
      <OurVideo />
    </main>
  );
}
