import React from "react";
import MaxWidthWrapper from "./max-width-wrapper";

const OurVideo = () => {
  return (
    <div className="w-full mt-16">
      <MaxWidthWrapper>
        <div className="flex flex-col items-center w-full gap-[40px]">
          <div className="flex items-center justify-center min-h-[400px] pb-[40px] w-full">
            <div className="relative w-full max-w-4xl rounded-2xl overflow-hidden shadow-lg bg-gray-900">
              <video
                className="w-full h-auto"
                controls
                src="/novel-care-video.mp4"
              >
                <source src="/videos/sample-video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 flex items-center justify-between pointer-events-auto"></div>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default OurVideo;
