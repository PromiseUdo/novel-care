import React from "react";
import MaxWidthWrapper from "./max-width-wrapper";

const OurValues = () => {
  return (
    <div className="w-full">
      <MaxWidthWrapper>
        <div className="flex flex-col items-center w-full gap-[40px]">
          <h2 className="text-[40px]">Our Values</h2>

          <div className="flex items-start gap-[52px]">
            <div className="w-full">
              <p className="leading-[28px]">
                Being disabled is not by choice. At Novel Care Services we
                believe that everyone has a right to participate in the
                community as much as they desire. In keeping with the ideals of
                the NDIS, we work hard to ensure that people with disability are
                included in society. We provide our services in a safe and
                comfortable atmosphere, ensuring that voices of people with
                disability are heard. We also advocate for improved access to
                services and facilities on behalf of our clients.
              </p>
            </div>
            <div className="w-full grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-[#FAE4D180] ">
                <div className="flex flex-col gap-[16px]">
                  <p className="font-medium text-[22px]">Respect</p>
                  <p className="leading-[28px]">
                    We treat every client, family and staff with utmost respect.
                  </p>
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-[#FAE4D180] ">
                <div className="flex flex-col gap-[16px]">
                  <p className="font-medium text-[22px]">Dignity</p>
                  <p className="leading-[28px]">
                    At Novel Care Services, we value the dignity of every
                    individual. People living with disability are not exempted.{" "}
                  </p>
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-[#FAE4D180] ">
                <div className="flex flex-col gap-[16px]">
                  <p className="font-medium text-[22px]">Independence</p>
                  <p className="leading-[28px]">
                    We treat every client, family and staff with utmost respect.{" "}
                  </p>
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-[#FAE4D180] ">
                <div className="flex flex-col gap-[16px]">
                  <p className="font-medium text-[22px]">
                    Development of life skills
                  </p>
                  <p className="leading-[28px]">
                    We have well trained staff who can act as your mentor in
                    developing life skills that you want to acquire in a
                    friendly and supportive environment.{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default OurValues;
