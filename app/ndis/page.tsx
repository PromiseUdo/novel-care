import React from "react";
import Hero from "./components/hero";
import WhatIs from "./components/what-is";
import SpreadLove from "./components/spread-love";
import SupportCoordination from "./components/support-coordination";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "NDIS Services Perth, Blackwood, and Southwest WA | Novel Care Services",
  description:
    "Discover NDIS provider services in Perth, Blackwood WA, and Southwest WA, including personal care, psychosocial support, and community access.",
};

const page = () => {
  return (
    <div>
      <Hero />
      <WhatIs />
      <SupportCoordination />
      <SpreadLove />
    </div>
  );
};

export default page;
