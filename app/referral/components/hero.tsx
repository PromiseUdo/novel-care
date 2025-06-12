"use client";

import React from "react";

const Hero = () => {
  return (
    <div className="relative h-[400px] w-full overflow-hidden">
      {/* Single Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/hero1-bg.png')`,
        }}
      ></div>

      {/* Full Rectangle Overlay for Mobile (below md) */}
      <svg
        className="absolute inset-0 z-20 w-full md:hidden" // Visible below md
        height="100%"
        viewBox="0 0 960 400" // Matches original viewBox
        preserveAspectRatio="none"
      >
        <path
          d="M0 0H960V400H0V0Z" // Simple rectangle covering entire area
          fill="url(#gradient-mobile)"
        />
        <defs>
          <linearGradient
            id="gradient-mobile"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" style={{ stopColor: "rgba(27, 15, 74, 1)" }} />
            <stop
              offset="100%"
              style={{ stopColor: "rgba(64, 36, 176, 0.2)" }}
            />
          </linearGradient>
        </defs>
      </svg>

      {/* D-Shaped Overlay for Desktop (md and above) */}
      <svg
        className="absolute inset-0 z-20 hidden md:block md:w-[52%]" // Visible at md and above
        height="100%"
        viewBox="0 0 960 400" // Matches original viewBox
        preserveAspectRatio="none"
      >
        <path
          d="M0 0H480C720 0 960 80 960 200C960 320 720 400 480 400H0V0Z"
          fill="url(#gradient-desktop)"
        />
        <defs>
          <linearGradient
            id="gradient-desktop"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" style={{ stopColor: "rgba(27, 15, 74, 1)" }} />
            <stop
              offset="100%"
              style={{ stopColor: "rgba(64, 36, 176, 0.2)" }}
            />
          </linearGradient>
        </defs>
      </svg>

      {/* Text Content (Title Only) */}
      <div className="relative z-30 flex h-full items-center px-2.5 md:px-8 lg:px-[80px]">
        <div className="text-white w-full md:w-[18rem]">
          <h1 className="text-[64px] text-center leading-[100%] font-normal">
            Referral
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Hero;
