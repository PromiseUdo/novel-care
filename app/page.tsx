// app/page.tsx
"use client"; // Mark as client component for useEffect
import { useEffect } from "react";
import AboutUs from "@/components/about-us";
import Hero from "@/components/hero";
import HomePageNav from "@/components/home-page-nav";
import OurServices from "@/components/our-services";
import OurTeam from "@/components/our-team";
import OurValues from "@/components/our-values";
import OurVideo from "@/components/our-video";
import Image from "next/image";

export default function Home() {
  useEffect(() => {
    // Dynamically add <link rel="preload"> to <head>
    const link = document.createElement("link");
    link.rel = "preload";
    link.href = "/hero1-bg.webp";
    link.as = "image";
    document.head.appendChild(link);

    // Cleanup on unmount
    return () => {
      document.head.removeChild(link);
    };
  }, []);

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
