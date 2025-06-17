declare module "lite-youtube-embed";
// types/react-lite-yt-embed.d.ts
declare module "react-lite-yt-embed" {
  import { FC } from "react";

  interface LiteYoutubeEmbedProps {
    id: string;
    title?: string; // Optional, as per documentation
    defaultPlay?: boolean;
    isPlaylist?: boolean;
    noCookie?: boolean;
    mute?: boolean;
    params?: Record<string, string>;
    isMobile?: boolean;
    mobileResolution?: "hqdefault" | "sddefault" | "maxresdefault";
    desktopResolution?: "hqdefault" | "sddefault" | "maxresdefault";
    lazyImage?: boolean;
    imageAltText?: string;
    iframeTitle?: string;
  }

  export const LiteYoutubeEmbed: FC<LiteYoutubeEmbedProps>;
}
