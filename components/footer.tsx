import React from "react";
import MaxWidthWrapper from "./max-width-wrapper";
import Image from "next/image";

const socialIcons = [
  {
    src: "/facebook.png",
    alt: "Facebook",
    href: "https://www.facebook.com/your-page",
  },
  {
    src: "/x.png",
    alt: "Twitter",
    href: "https://www.twitter.com/your-page",
  },
  {
    src: "/instagram.png",
    alt: "Instagram",
    href: "https://www.instagram.com/your-page",
  },
  {
    src: "/linkedin.png",
    alt: "LinkedIn",
    href: "https://www.linkedin.com/your-page",
  },
  {
    src: "/youtube.png",
    alt: "Youtube",
    href: "https://www.linkedin.com/your-page",
  },
  {
    src: "/pinterest.png",
    alt: "Pinterest",
    href: "https://www.linkedin.com/your-page",
  },
];

const Footer = () => {
  return (
    <div className="h-[424px] w-full bg-[#FAE4D180] mt-16">
      <MaxWidthWrapper className="h-full">
        <div className=" w-full h-full grid grid-cols-3 items-center">
          <div className="flex flex-col gap-[15px] ">
            <div className="relative w-[164.5px] h-[64px]">
              <Image src={"/logo.png"} alt="logo" fill className="" />
            </div>

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
                  <p className="text-[#4E4D4D]">
                    info@novelcareservices.com.au
                  </p>
                </div>
                <div className="flex items-center gap-[4px]">
                  <Image
                    src={"/phone.png"}
                    alt={"map"}
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                  <p className="text-[#4E4D4D]">0426414430</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div
              className="h-[100px] w-[150px] bg-cover bg-center"
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
                className="h-[100px] w-[150px] bg-cover bg-center"
                style={{
                  backgroundImage: `url("/flag1.png")`, // Corrected syntax with quotes
                }}
                role="img"
                aria-label="Aboriginal and Torres Strait Islander flag"
              />
              <div
                className="h-[100px] w-[150px] bg-cover bg-center"
                style={{
                  backgroundImage: `url("/flag2.png")`, // Corrected syntax with quotes
                }}
                role="img"
                aria-label="Aboriginal and Torres Strait Islander flag"
              />
              <div
                className="h-[100px] w-[150px] bg-cover bg-center"
                style={{
                  backgroundImage: `url("/flag3.png")`, // Corrected syntax with quotes
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
