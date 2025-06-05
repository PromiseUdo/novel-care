import React from "react";
import MaxWidthWrapper from "./max-width-wrapper";

const OurVideo = () => {
  return (
    <div className="w-full mt-16">
      <MaxWidthWrapper>
        <div className="flex flex-col items-center w-full gap-[40px]">
          {/* Uncomment if you want to keep the heading */}
          {/* <h2 className="text-[40px] text-[#4E4D4D]">Our Team</h2> */}

          {/* Video player */}
          <div className="flex items-center justify-center min-h-[400px] pb-[40px] w-full">
            <div className="relative w-full max-w-4xl rounded-2xl overflow-hidden shadow-lg bg-gray-900">
              {/* Video element */}
              <video
                className="w-full h-auto"
                controls
                // poster="/videos/sample-video-poster.jpg" // Optional: Add a poster image in public/videos
                src="/novel-care-video.mp4" // Adjust the path to your video file
              >
                <source src="/videos/sample-video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* Custom overlay for additional styling */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {/* Optional: Add a subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>

              {/* Custom controls container (optional for further customization) */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 flex items-center justify-between pointer-events-auto">
                {/* You can add custom control buttons here if needed */}
                {/* Example: <button className="text-white">Play/Pause</button> */}
              </div>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default OurVideo;
