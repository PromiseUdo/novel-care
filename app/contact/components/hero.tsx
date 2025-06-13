"use client";

import React from "react";

const Hero = () => {
  return (
    <div className="relative h-[400px] w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/hero1-bg.png')`,
        }}
      ></div>
      <svg
        className="absolute inset-0 z-20 w-full md:hidden"
        height="100%"
        viewBox="0 0 960 400"
        preserveAspectRatio="none"
      >
        <path d="M0 0H960V400H0V0Z" fill="url(#gradient-mobile)" />
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

      <svg
        className="absolute inset-0 z-20 hidden md:block md:w-[52%]"
        height="100%"
        viewBox="0 0 960 400"
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

      <div className="relative z-30 flex h-full items-center px-2.5 md:px-8 lg:px-[80px]">
        <div className="text-white w-full md:w-[18rem]">
          <h1 className="text-[60px] md:text-[64px] text-center leading-[100%] font-normal">
            Contact
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Hero;
