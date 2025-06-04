import React from "react";
import MaxWidthWrapper from "./max-width-wrapper";
import Link from "next/link";

const HomePageNav = () => {
  return (
    <div className="w-full z-40  bg-white py-[10px] flex items-center h-[108px] sticky top-[96px]">
      <MaxWidthWrapper>
        <div className="flex items-center justify-center gap-[35px]">
          <Link
            className=" transition-all duration-200 font-semibold leading-[28px] hover:text-[#E67817] border-b border-white hover:border-[#E67817]"
            href={""}
          >
            Our Values
          </Link>
          <Link
            className=" transition-all duration-200 font-semibold leading-[28px] hover:text-[#E67817] border-b border-white hover:border-[#E67817]"
            href={""}
          >
            About Us
          </Link>
          <Link
            className=" transition-all duration-200 font-semibold leading-[28px] hover:text-[#E67817] border-b border-white hover:border-[#E67817]"
            href={""}
          >
            Services
          </Link>
          <Link
            className=" transition-all duration-200 font-semibold leading-[28px] hover:text-[#E67817] border-b border-white hover:border-[#E67817]"
            href={""}
          >
            Our Team
          </Link>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default HomePageNav;
