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

          {/* Added min-h-[400px] to ensure flex container has enough height for items-center */}
          <div className="flex items-center justify-between min-h-[400px] pb-[40px] gap-[108px] ">
            <div className="w-full flex flex-col gap-[48px]">
              <p className="leading-[28px]">
                Novel Care Services is a support service organization which was
                established out of the desire to consistently provide
                high-quality support to people living with disability and their
                families.
              </p>
              <p className="leading-[28px]">
                Our aim is to support our clients well enough to participate
                effectively in society and achieve their goals. We are
                enthusiastic about providing support tailored specifically for
                you and your loved ones. We are here to help people with
                physical and mental disabilities live life to its fullest. We
                also believe that people with disability deserve to participate
                in the community as much as they desire.
              </p>
            </div>

            {/* Added h-full to ensure image column matches flex container height */}
            <div className="relative w-full h-full self-stretch">
              <img
                src="/about1.png"
                alt="Bottom background image"
                className="absolute top-[40px] left-[-50px] w-[300px] h-[325px]"
              />
              <img
                src="/about2.png"
                alt="Top background image"
                className="absolute top-0 right-0 w-[300px] h-[325px]"
              />
            </div>
          </div>

          {/* Added min-h-[400px] to ensure flex container has enough height for items-center */}
          <div className="flex items-center justify-between min-h-[400px] gap-[108px] ">
            <div className="relative w-full h-full self-stretch">
              <img
                src="/about3.png"
                alt="Bottom background image"
                className="absolute top-[40px] left-0 w-[300px] h-[325px]"
              />
              <img
                src="/about2.png"
                alt="Top background image"
                className="absolute top-0 right-[-40px] w-[300px] h-[325px] scale-x-[-1]"
              />
            </div>

            <div className="w-full flex flex-col gap-[24px]">
              <p className="leading-[28px]">
                Our holistic approach prioritises the involvement of all
                stakeholders in the delivery of our services. This means that
                listening to your opinions and concerns is a priority for us at
                Novel Care Services. For us, excellent care means we always take
                care to listen to you and your family and ensure that we deliver
                the services you need exactly the way you want it. We always aim
                to build and maintain a strong relationship with our clients and
                their families. We, therefore, support and care for our
                participants like family.
              </p>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default AboutUs;
