import React from "react";
import MaxWidthWrapper from "./max-width-wrapper";

const AboutUs = () => {
  return (
    <div id="about-us" className="w-full mt-16">
      <MaxWidthWrapper>
        <div className="flex flex-col items-center w-full gap-[40px]">
          <h2 className="text-[40px] text-[#4E4D4D]">About us</h2>

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

          {/* First Section */}
          <div className="flex flex-col-reverse md:flex-row items-center justify-between min-h-[400px]  pb-[40px] gap-[40px] md:gap-[108px]">
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

            <div className="relative w-full h-[280px] md:h-full self-stretch">
              <img
                src="/about1.webp"
                alt="Bottom background image"
                className="absolute top-[20px] left-[40px] w-[200px] h-[217px] md:top-[40px] md:left-[-50px] md:w-[300px] md:h-[325px]"
              />
              <img
                src="/about2.webp"
                alt="Top background image"
                className="absolute top-0 right-[40px] w-[200px] h-[217px] md:top-0 md:right-0 md:w-[300px] md:h-[325px]"
              />
            </div>
          </div>

          {/* Second Section */}
          <div className="flex flex-col md:flex-row items-center justify-between min-h-[400px] gap-[40px] md:gap-[108px]">
            <div className="relative w-full h-[280px] md:h-full self-stretch">
              <img
                src="/about3.webp"
                alt="Bottom background image"
                className="absolute top-[20px] left-[40px] w-[200px] h-[217px] md:top-[40px] md:left-0 md:w-[300px] md:h-[325px]"
              />
              <img
                src="/about2.webp"
                alt="Top background image"
                className="absolute top-0 right-[40px] w-[200px] h-[217px] md:top-0 md:right-[-40px] md:w-[300px] md:h-[325px] scale-x-[-1]"
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

          {/* Third Section */}
          <div className="flex flex-col md:flex-row items-center gap-[78px] xl:mt-[-85px]">
            <div className="relative flex-none w-[200px] h-[217px] md:w-[300px] md:h-[325px]">
              <img
                src="/about4.webp"
                alt="Bottom background image"
                className="absolute top-0 left-[19px] w-[200px] h-[217px] md:top-0 md:left-[28px] md:w-[300px] md:h-[325px]"
              />
            </div>

            <div className="flex-1 flex flex-col gap-[24px]">
              <p className="leading-[28px]">
                The range of services available at Novel Care Services includes
                support for community participation, provision of residential
                respite care, skill-building for improved employment
                opportunities, provision of home care, supported independent
                living, to mention a few. We also support our participants to
                make the most of their NDIS funding and opportunities that life
                presents. Our services are provided in an atmosphere of
                acceptance and inclusivity. All of our staff are highly
                qualified and are thoroughly vetted to ensure that we deliver
                the best care. Our accommodations are fully equipped and well
                furnished.
              </p>
              <p className="leading-[28px]">
                We understand disability support as it is meant to be delivered.
                Get in touch with us for more information. We are here to help
                you and your loved ones!
              </p>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default AboutUs;
