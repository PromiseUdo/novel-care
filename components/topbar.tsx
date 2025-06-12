import React from "react";
import MaxWidthWrapper from "./max-width-wrapper";
import Link from "next/link";
import Image from "next/image";

const Topbar = () => {
  return (
    <div className="w-full bg-[#FAE4D180] h-[60px] flex items-center">
      <MaxWidthWrapper>
        <div className="w-full flex items-center justify-end">
          <div className="flex items-center gap-[16px]">
            <Link
              href="/contact"
              className="font-montserrat font-medium text-base hover:text-[#1e1e1e]"
            >
              Contact Us
            </Link>
            <div className="h-6 w-px bg-[#E67817FF]" />
            <div className="relative">
              <button className="flex items-center gap-[6px] focus:outline-none">
                <Image
                  src={"/flag-uk.png"}
                  alt={`flag`}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
                <p className="font-medium">English (UK)</p>
                <svg
                  className="w-4 h-4 text-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>{" "}
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Topbar;
