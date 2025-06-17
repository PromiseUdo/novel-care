"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Custom404 = () => {
  return (
    <div className="relative h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-[rgba(27,15,74,1)] to-[rgba(64,36,176,0.2)] text-white overflow-hidden">
      {/* Background Image (Optional) */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero1.webp" // Reuse your hero image or a custom 404 image
          alt="404 Background"
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}
          quality={75}
          priority
          className="opacity-50"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 md:px-8">
        <h1 className="font-titan-one text-[48px] md:text-[64px] leading-[100%] font-normal mb-4">
          Oops! Page Not Found
        </h1>
        <p className="text-base md:text-lg leading-[28px] mb-6 max-w-md mx-auto">
          It looks like the page you’re looking for doesn’t exist or has been moved. Let’s get you back on track!
        </p>
        <Link href="/">
          <Button
            className="px-[16px] rounded-[64px] bg-[#E67817] text-black font-semibold hover:bg-[#d16c14]"
            aria-label="Return to Home"
          >
            Back to Home
          </Button>
        </Link>
      </div>

      {/* Optional Decorative Element */}
      <div className="absolute bottom-10 z-10 flex justify-center space-x-2">
        <span className="w-3 h-3 rounded-full bg-[#E67817] animate-pulse"></span>
        <span className="w-3 h-3 rounded-full bg-white opacity-50 animate-pulse delay-200"></span>
        <span className="w-3 h-3 rounded-full bg-white opacity-50 animate-pulse delay-400"></span>
      </div>
    </div>
  );
};

export default Custom404;