import React from "react";
import MaxWidthWrapper from "./max-width-wrapper";

const OurTeam = () => {
  return (
    <div id="our-team" className="w-full mt-16">
      <MaxWidthWrapper>
        <div className="flex flex-col items-center w-full gap-[40px]">
          <h2 className="text-[40px] text-[#4E4D4D]">Our Team</h2>

          <div className="flex flex-col-reverse md:flex-row items-center justify-between min-h-[400px] pb-[40px] gap-[40px] md:gap-[108px] ">
            <div className="w-full flex flex-col gap-[48px]">
              <p className="leading-[28px]">
                At Novel Care Services, we pride ourselves with our friendly,
                motivated and enthusiastic staff. Our staff are from diverse
                backgrounds and have in-depth knowledge and vast experience of
                caring for people with disability. Everyone at Novel Care
                Services is passionate about person-centred care, reflecting the
                individuality of our clients. In fact, our staff treat each
                other and participants, like a part of our extended family, with
                care dignity respect and understanding.
              </p>
              <p className="leading-[28px]">
                Our team is highly trained to provide ethical care to our wide
                range of participants. We always adhere to industry standards in
                providing care to our clients. Novel Care Services constantly
                advocates for participants’ independence, and together, our team
                works to help integrate people living with disabilities into the
                community.
              </p>
            </div>

            <div className="relative w-full h-[280px] md:h-full self-stretch">
              <img
                src="/our-team1.png"
                alt="Bottom background image"
                className="absolute top-[40px] left-[40px] md:left-[-50px] w-[200px] h-[217px]  md:w-[300px] md:h-[325px]"
              />
              <img
                src="/our-team2.png"
                alt="Top background image"
                className="absolute top-0 right-[40px] md:right-0  w-[200px] h-[217px]  md:w-[300px] md:h-[325px]"
              />
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default OurTeam;
