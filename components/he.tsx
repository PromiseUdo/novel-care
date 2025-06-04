import React from "react";
import { Button } from "./ui/button";

const Hero = () => {
  return (
    <div className="relative h-[810px] w-full overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/hero-bg.png')`,
        }}
      ></div>

      {/* D-Shaped Overlay with Linear Gradient */}
      <svg
        className="absolute inset-0"
        width="50%"
        height="100%"
        viewBox="0 0 960 810"
        preserveAspectRatio="none"
      >
        <path
          d="M0 0H480C720 0 960 180 960 405C960 630 720 810 480 810H0V0Z"
          fill="url(#gradient)"
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: "rgba(27, 15, 74, 1)" }} />
            <stop
              offset="100%"
              style={{ stopColor: "rgba(64, 36, 176, 0.2)" }}
            />
          </linearGradient>
        </defs>
      </svg>

      {/* Text Content */}
      <div className="relative z-10 flex h-full items-center px-2.5 md:px-8 lg:px-[100px]">
        <div className="text-white max-w-lg">
          <h1 className="text-4xl md:text-6xl leading-[100%] font-normal mb-4">
            High quality care support service is what we do
          </h1>
          <p className="text-base leading-[28px]">
            Novel Care Services aligns with ideals of the National Disability
            Insurance Scheme (NDIS) and performs the function of supporting
            people with disability
          </p>

          <Button className=" px-[16px] rounded-[64px] bg-[#E67817FF] text-black font-semibold">
            Learn more
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
