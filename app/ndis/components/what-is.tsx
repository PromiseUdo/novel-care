import MaxWidthWrapper from "@/components/max-width-wrapper";
import React from "react";

const WhatIs = () => {
  return (
    <div id="our-team" className="w-full mt-16">
      <MaxWidthWrapper>
        <div className="flex flex-col items-center w-full gap-[40px]">
          <h2 className="text-[40px] text-[#4E4D4D]">Our Team</h2>

          {/* Added min-h-[400px] to ensure flex container has enough height for items-center */}
          <div className="flex items-center justify-between min-h-[400px] pb-[40px] gap-[108px] ">
            <div className="w-full flex flex-col gap-[48px]">
              <p className="leading-[28px]">
                The National Disability Insurance Scheme (NDIS) is an Australian
                Government scheme which was established to fund access to
                disability support services. It helps improve access of people
                with disability to the facilities and services that can improve
                their quality of life. The core function of the NDIS is ensure
                that people with disability participate in society as much as
                possible without being financially disadvantaged. The sceme also
                ensures that by providing choice, control, and flexibility.
              </p>
              <p className="leading-[28px]">
                Several services and purchase of equipment may be funded by the
                NDIS. The funding for supporting you is provided to you directly
                by the NDIS. This includes funding for the services that we
                provide you at Novel Care Services. For more information about
                the NDIS, please contact us or visit:  {" "}
                <a
                  className="text-[#E67817]"
                  href=" https://www.ndis.gov.au/understanding/how-ndis-works"
                >
                  https://www.ndis.gov.au/understanding/how-ndis-works
                </a>
              </p>
            </div>

            {/* Added h-full to ensure image column matches flex container height */}
            <div className="relative w-full h-full self-stretch">
              <img
                src="/what-is1.png"
                alt="Bottom background image"
                className="absolute top-[40px] left-[-50px] w-[300px] h-[325px]"
              />
              <img
                src="/what-is2.png"
                alt="Top background image"
                className="absolute top-0 right-0 w-[300px] h-[325px]"
              />
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default WhatIs;
