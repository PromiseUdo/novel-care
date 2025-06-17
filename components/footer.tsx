import React from "react";
import MaxWidthWrapper from "./max-width-wrapper";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

const socialIcons = [
  {
    src: "/facebook.png",
    alt: "Facebook",
    href: "https://www.facebook.com/novelcareservices/",
  },
  {
    src: "/x.png",
    alt: "Twitter",
    href: "https://twitter.com/novel_care",
  },
  {
    src: "/instagram.png",
    alt: "Instagram",
    href: "https://www.instagram.com/novel_care_services/",
  },
  // {
  //   src: "/linkedin.png",
  //   alt: "LinkedIn",
  //   href: "https://www.linkedin.com",
  // },
  {
    src: "/youtube.png",
    alt: "Youtube",
    href: "https://www.youtube.com/channel/UCrSle1zQebem0XO-G_emGEQ/featured?view_as=subscriber",
  },
  {
    src: "/pinterest.png",
    alt: "Pinterest",
    href: "https://in.pinterest.com/novelcareservices/_saved/",
  },
];

const Footer = () => {
  return (
    <div className="h-full md:h-[424px] w-full bg-[#FAE4D180] mt-16">
      <MaxWidthWrapper className="h-full py-[50px] md:py-0">
        <div className=" w-full h-full grid grid-cols-1 md:grid-cols-3 items-start md:items-center md:gap-0 gap-[105px]">
          <div className="flex flex-col gap-[15px] ">
            <Link href="/" className="relative w-[164.5px] h-[64px]">
              <img
                src="/logo.webp"
                alt="Novel Care Services Logo"
                className="object-contain w-full h-full"
              />
            </Link>

            <div className="flex items-center gap-[9px]">
              {socialIcons.map((icon, idx) => (
                <a
                  key={idx}
                  href={icon.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit our ${icon.alt} page`}
                  className="hover:opacity-80 transition-opacity"
                >
                  <Image
                    src={icon.src}
                    alt={icon.alt}
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                </a>
              ))}
            </div>

            <div className="flex flex-col gap-[10px] ">
              <p className="text-[#E67817] font-bold ">Contact</p>
              <div className="flex flex-col gap-[8px]">
                <div className="flex items-center gap-[4px]">
                  <Image
                    src={"/map-pin.png"}
                    alt={"map"}
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                  <p className="text-[#4E4D4D]">
                    39 Monticello Meander,Landsdale WA 6065
                  </p>
                </div>
                <div className="flex items-center gap-[4px]">
                  <Image
                    src={"/mail.png"}
                    alt={"map"}
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                  <a
                    href="mailto:info@novelcareservices.com.au"
                    className="text-[#4E4D4D] hover:underline"
                  >
                    info@novelcareservices.com.au
                  </a>
                </div>
                <div className="flex items-center gap-[4px]">
                  <Image
                    src={"/phone.png"}
                    alt={"map"}
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                  <a
                    href="tel:0426414430"
                    className="text-[#4E4D4D] hover:underline"
                  >
                    0426414430
                  </a>{" "}
                </div>
              </div>
            </div>
            <Link target="_blank" href="https://be.contentful.com/login/">
              <Button
                className="border-[#E67817] bg-transparent font-semibold text-[#E67817] h-[52px] hover:bg-[#E67817] hover:text-[#1e1e1e] rounded-[64px] w-[300px]"
                variant={"outline"}
              >
                Staff Login
              </Button>
            </Link>
          </div>

          <div className="flex items-center justify-start md:justify-center">
            <div
              className="w-[189px] h-[100px] md:w-[150px] bg-cover bg-center"
              style={{
                backgroundImage: `url("/ndis.png")`, // Corrected syntax with quotes
              }}
              role="img"
              aria-label="Aboriginal and Torres Strait Islander flag"
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-[15px]">
              <div
                className="h-[72px] w-[107.22px] md:h-[100px] md:w-[150px] bg-cover bg-center"
                style={{
                  backgroundImage: `url("/flag1.png")`, // Corrected syntax with quotes
                }}
                role="img"
                aria-label="Aboriginal and Torres Strait Islander flag"
              />
              <div
                className="h-[72px] w-[107.22px] md:h-[100px] md:w-[150px] bg-cover bg-center"
                style={{
                  backgroundImage: `url("/flag2.png")`,
                }}
                role="img"
                aria-label="Aboriginal and Torres Strait Islander flag"
              />
              <div
                className="h-[72px] w-[107.22px] md:h-[100px] md:w-[150px] bg-cover bg-center"
                style={{
                  backgroundImage: `url("/flag3.png")`,
                }}
                role="img"
                aria-label="Aboriginal and Torres Strait Islander flag"
              />
            </div>

            <p className="text-[#4E4D4D] text-[14px]">
              We acknowledge Aboriginal and Torres Strait Islander peoples as
              the traditional owners of this country throughout Australia, and
              their connection to the land and community. We pay our respects to
              them and their cultures, and to the elders both past and present.
            </p>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Footer;
