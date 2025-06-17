"use client";
import React, { useState } from "react";
import MaxWidthWrapper from "./max-width-wrapper";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

const navLinks = [
  { url: "/", label: "Home" },
  { url: "/ndis", label: "NDIS" },
  { url: "/sil", label: "SIL" },
  { url: "/referral", label: "Referral" },
  { url: "/employment", label: "Employment" },
  { url: "/blog", label: "Blog" },
  { url: "/covid-19", label: "COVID-19" },
  { url: "/feedback", label: "Feedback" },
];

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="shadow w-full h-[96px] bg-white py-[16px] sticky top-0 z-50">
      <MaxWidthWrapper>
        <div className="w-full flex items-center justify-between">
          {/* <Link href="/" className="relative w-[164.5px] h-[64px]">
            <Image src="/logo.png" alt="logo" fill className="" />
          </Link> */}

          <Link href="/" className="relative w-[164.5px] h-[64px]">
            <img
              src="/logo.webp"
              alt="NDIS Services - Novel Care Services Logo"
              className="object-contain w-full h-full"
            />
          </Link>

          <div className="ml-auto flex items-center">
            <div className="hidden md:flex items-center gap-[25px]">
              {navLinks.map((link) => {
                const isActive = link.url ? pathname === link.url : false;

                return (
                  <Link
                    key={link.label}
                    className={`transition-all duration-200 font-montserrat border-b-2 font-medium hover:text-[#E67817FF] hover:border-[#E67817FF] ${
                      isActive
                        ? "text-[#E67817FF] border-[#E67817FF]"
                        : "border-white"
                    }`}
                    href={link.url}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* mobile nav */}

            <div className="md:hidden">
              <button
                className={cn(
                  "relative z-50 flex flex-col items-center justify-center w-10 h-10 group",
                  isOpen === true && "hidden"
                )}
                onClick={toggleMenu}
                aria-label="Toggle menu"
              >
                {/* Line 1 */}
                <motion.span
                  className="block w-6 h-0.5 bg-[#1e1e1e] transition-transform"
                  animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.1 }}
                />
                {/* Line 2 */}
                <motion.span
                  className="block w-6 h-0.5 bg-[#1e1e1e] mt-1.5 transition-transform"
                  animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: 0.4 }}
                />
                {/* Line 3 */}
                <motion.span
                  className="block w-6 h-0.5 bg-[#1e1e1e] mt-1.5 transition-transform"
                  animate={
                    isOpen ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }
                  }
                  transition={{ duration: 0.1 }}
                />
              </button>
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: isOpen ? "100vh" : 0 }}
                transition={{ duration: 0.3 }}
                className="fixed top-0 left-0 w-full h-screen bg-white  z-40 overflow-hidden"
              >
                <div className="flex flex-col items-center justify-center h-full gap-[25px] text-[#1e1e1e]">
                  <Link
                    href="/"
                    onClick={() => setIsOpen(false)}
                    className="font-medium text-lg"
                  >
                    Home
                  </Link>
                  <Link
                    href="/ndis"
                    onClick={() => setIsOpen(false)}
                    className="font-medium text-lg"
                  >
                    NDIS
                  </Link>
                  <Link
                    href="/sil"
                    onClick={() => setIsOpen(false)}
                    className="font-medium text-lg"
                  >
                    SIL
                  </Link>
                  <Link
                    href="/referral"
                    onClick={() => setIsOpen(false)}
                    className="font-medium text-lg"
                  >
                    Referral
                  </Link>
                  <Link
                    href="/employment"
                    onClick={() => setIsOpen(false)}
                    className="font-medium text-lg"
                  >
                    Employment
                  </Link>
                  <Link
                    href="/blog"
                    onClick={() => setIsOpen(false)}
                    className="font-medium text-lg"
                  >
                    Blog
                  </Link>
                  <Link
                    href="/covid-19"
                    onClick={() => setIsOpen(false)}
                    className="font-medium text-lg"
                  >
                    COVID-19
                  </Link>
                  <Link
                    href="/feedback"
                    onClick={() => setIsOpen(false)}
                    className="font-medium text-lg"
                  >
                    Feedback
                  </Link>

                  <button
                    onClick={() => setIsOpen(false)}
                    className=" text-[#1e1e1e] z-50"
                    aria-label="Close menu"
                  >
                    <X size={28} />
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Navbar;
