import React from "react";
import MaxWidthWrapper from "./max-width-wrapper";

const AboutUs = () => {
  return (
    <div className="w-full mt-16">
      <MaxWidthWrapper>
        <div className="flex flex-col items-center w-full gap-[40px]">
          <h2 className="text-[40px]">About us</h2>

          <div className="max-w-[29rem] relative p-4">
            <img
              src="/quote-up.png"
              alt="Top left quote"
              className="absolute top-0 left-0 w-8 h-8 -translate-x-3 -translate-y-3 scale-x-[-1]"
            />
            <div className="">
              <p className="text-center">
                Novel Care Services provides a wide range of supports and
                services to people living with disability. We are committed to
                fulfilling our responsibilities to the people we support and
                their communities.
              </p>
            </div>
            <img
              src="/quote-up.png"
              alt="Bottom right quote"
              className="absolute bottom-0 right-0 w-8 h-8 translate-x-1 translate-y-1"
            />
          </div>

          <div className="grid grid-cols-2 items-center gap-[108px]">
            <div className="flex flex-col gap-[24px]">
              <p className="leading-[28px]">
                Novel Care Services is a support service organization which was
                established out of the desire to consistently provide
                high-quality support to people living with disability and their
                families.
              </p>
              <p className="leading-[28px]">
                Our aim is to support our clients well enough to participate
                effectively in society and achieve their goals. We are
                enthusiastic about providing support which is tailored
                specifically for you and your loved ones. We are here to help
                people with physical and mental disabilities live life to its
                fullest. We also believe that people with disability deserve to
                participate in the community as much as they desire.
              </p>
            </div>

            {/* 2 images */}
            {/* Added relative positioning and dimensions to contain both images */}
            <div className="relative  h-full">
              {/* Bottom image with inverted D-shape */}
              <img
                src="/about1.png"
                alt="Bottom background image"
                className="absolute top-0 left-[-50px] w-[300px] h-[325px]"
              />
              <img
                src="/about2.png"
                alt="Top background image"
                className="absolute top-[-40px] right-[0px] w-[300px] h-[325px]"
              />
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default AboutUs;
