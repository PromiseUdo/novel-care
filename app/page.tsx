// app/page.tsx
import AboutUs from "@/components/about-us";
import Hero from "@/components/hero";
import HomePageNav from "@/components/home-page-nav";
import OurServices from "@/components/our-services";
import OurTeam from "@/components/our-team";
import OurValues from "@/components/our-values";
import OurVideo from "@/components/our-video";
import Image from "next/image";

export default function Home() {
  return (
    <main>
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
