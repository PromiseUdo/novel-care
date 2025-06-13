import React from "react";
import MaxWidthWrapper from "./max-width-wrapper";

const OurVideo = () => {
  return (
    <div className="w-full mt-16">
      <MaxWidthWrapper>
        <div className="flex flex-col items-center w-full gap-[40px]">
          <div className="flex items-center justify-center min-h-[400px] pb-[40px] w-full">
            <div className="w-full max-w-4xl mx-auto aspect-video rounded-xl overflow-hidden shadow">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/4yR1cVwWC4Q"
                title="Novel Care Services"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default OurVideo;
