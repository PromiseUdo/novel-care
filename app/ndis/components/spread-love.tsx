import MaxWidthWrapper from "@/components/max-width-wrapper";
import Image from "next/image";
import React from "react";

const socialIcons = [
  {
    src: "/facebook-filled.png",
    alt: "Facebook",
    href: "https://www.facebook.com/novelcareservices/",
  },

  {
    src: "/instagram-filled.png",
    alt: "Instagram",
    href: "https://www.instagram.com/novel_care_services/",
  },

  {
    src: "/youtube-filled.png",
    alt: "Youtube",
    href: "https://www.youtube.com/channel/UCrSle1zQebem0XO-G_emGEQ/featured?view_as=subscriber",
  },
];

const SpreadLove = () => {
  return (
    <div className="w-full mt-16">
      <MaxWidthWrapper>
        <div className="w-full flex items-center justify-center flex-col gap-[40px]">
          <h2 className="text-[40px] text-[#4E4D4D]">Spread the love</h2>

          <div className="flex items-center justify-center gap-[15px]">
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
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </a>
            ))}
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default SpreadLove;
