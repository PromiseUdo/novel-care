import React from "react";
import Hero from "./components/hero";
import WhatIs from "./components/what-is";
import SpreadLove from "./components/spread-love";
import SupportCoordination from "./components/support-coordination";

const page = () => {
  return (
    <div>
      <Hero />
      <WhatIs />
<SupportCoordination/>
      <SpreadLove />
    </div>
  );
};

export default page;
