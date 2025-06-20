"use client";

import React from "react";
import MaxWidthWrapper from "./max-width-wrapper";
import { LiteYoutubeEmbed } from "react-lite-yt-embed";

const OurVideo = () => {
  return (
    <div className="w-full mt-16">
      <MaxWidthWrapper>
        <div className="flex flex-col items-center w-full gap-[40px]">
          <div className="flex items-center justify-center min-h-[400px] pb-[40px] w-full">
            <div className="w-full max-w-4xl mx-auto aspect-video rounded-xl overflow-hidden shadow">
              <LiteYoutubeEmbed
                id="4yR1cVwWC4Q"
                noCookie={true}
                imageAltText="Novel Care Services thumbnail"
                iframeTitle="Novel Care Services video"
              />
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default OurVideo;
