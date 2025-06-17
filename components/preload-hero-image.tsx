// components/PreloadHeroImage.tsx
"use client";

import { useEffect } from "react";

export default function PreloadHeroImage() {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.href = "/hero1-bg.webp";
    link.as = "image";
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return null; // Renders nothing, only runs side effect
}
