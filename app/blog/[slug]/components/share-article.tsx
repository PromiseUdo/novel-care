import Image from "next/image";
import React from "react";

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
];

const ShareArticle = () => {
  return (
    <div className="text-[#1E1E1E]">
      <p className="text-[24px]  font-medium">Share this article</p>

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
    </div>
  );
};

export default ShareArticle;
