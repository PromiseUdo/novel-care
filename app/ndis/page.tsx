import React from "react";
import Hero from "./components/hero";
import WhatIs from "./components/what-is";
import SpreadLove from "./components/spread-love";

const page = () => {
  return (
    <div>
      <Hero />
      <WhatIs />
      <SpreadLove />
    </div>
  );
};

export default page;
