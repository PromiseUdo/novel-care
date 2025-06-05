"use client";
import React from "react";
import MaxWidthWrapper from "./max-width-wrapper";
import Link from "next/link";

const HomePageNav = () => {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault(); // Prevent default anchor behavior
    const element = document.getElementById(id);
    if (element) {
      const navHeight = 108 + 96; // Sticky nav height (108px) + top offset (96px)
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - navHeight,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full z-40  bg-white py-[10px] flex items-center h-[108px] sticky top-[96px]">
      <MaxWidthWrapper>
        <div className="flex items-center justify-center gap-[35px]">
          <Link
            className=" transition-all duration-200 font-semibold leading-[28px] hover:text-[#E67817] border-b border-white hover:border-[#E67817]"
            href="#our-values"
            onClick={(e) => handleScroll(e, "our-values")}
          >
            Our Values
          </Link>
          <Link
            className=" transition-all duration-200 font-semibold leading-[28px] hover:text-[#E67817] border-b border-white hover:border-[#E67817]"
            href="#about-us"
            onClick={(e) => handleScroll(e, "about-us")}
          >
            About Us
          </Link>
          <Link
            className=" transition-all duration-200 font-semibold leading-[28px] hover:text-[#E67817] border-b border-white hover:border-[#E67817]"
            href="#services"
            onClick={(e) => handleScroll(e, "services")}
          >
            Services
          </Link>
          <Link
            className=" transition-all duration-200 font-semibold leading-[28px] hover:text-[#E67817] border-b border-white hover:border-[#E67817]"
            href="#our-team"
            onClick={(e) => handleScroll(e, "our-team")}
          >
            Our Team
          </Link>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default HomePageNav;
