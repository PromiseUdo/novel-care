import React from "react";
import MaxWidthWrapper from "./max-width-wrapper";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { url: "/", label: "Home" },
  { url: "/ndis", label: "NDIS" },
  { url: "/referral", label: "Referral" },
  { url: "", label: "Employment" },
  { url: "", label: "Blog" },
  { url: "", label: "COVID-19" },
  { url: "", label: "Feedback" },
];
const Navbar = () => {
  return (
    <div className="shadow w-full h-[96px] bg-white py-[16px] sticky top-0  z-50 ">
      <MaxWidthWrapper>
        <div className="w-full flex items-center justify-between">
          <div className="relative w-[164.5px] h-[64px]">
            <Image src={"/logo.png"} alt="logo" fill className="" />
          </div>

          <div className="flex items-center gap-[25px]">
            {navLinks.map((link) => (
              <Link
                className="transition-all duration-200 font-montserrat border-b-2 border-white font-medium hover:text-[#E67817FF] hover:border-[#E67817FF]"
                href={link.url}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Navbar;
