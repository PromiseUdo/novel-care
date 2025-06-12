import MaxWidthWrapper from "@/components/max-width-wrapper";
import React from "react";

const Main = () => {
  return (
    <div id="our-team" className="w-full mt-16">
      <MaxWidthWrapper>
        <div className="flex flex-col items-center w-full gap-[40px]">
          <h2 className="text-center text-[40px] text-[#4E4D4D]">
            COVID-19: OUR RESPONSE
          </h2>

          {/* Added min-h-[400px] to ensure flex container has enough height for items-center */}
          <div className="flex flex-col-reverse md:flex-row items-center justify-between min-h-[400px] pb-[40px] gap-[40px] md:gap-[108px] ">
            <div className="w-full flex flex-col gap-[24px]">
              <p className="leading-[28px] text-[#1E1E1E]">
                The safety of our clients, team members and their families
                guides everything we do. Here are some of the ways we’re working
                to protect our Novel Care family during the coronavirus
                pandemic:
              </p>
              <ul className="leading-[28px] list-disc pl-[20px] text-[#1E1E1E]">
                <li>
                  <strong>Regular communication:</strong> We keep our clients
                  and staff up-to-date through video briefings, emails, and SMS
                  updates (and, of course, regular contact with coordinators,
                  case managers, and key workers). In this fast-moving
                  situation, we don’t want anyone to be left wondering the
                  impact of what the latest government announcements mean for
                  them and their families.
                </li>
                <li>
                  <strong>Infective Control Strategies:</strong> We ensure that
                  all our staff have access to personal protective equipment
                  (PPE). And all our staff are trained to maintain strict
                  hygiene practices in order to minimize the risk of
                  transmission of the Covid–19 virus.
                </li>
              </ul>

              <p className="leading-[28px] list-disc pl-[20px] text-[#1E1E1E]">
                We have an obligation as a service provider to constantly
                monitor the risks to our staff and clients. In the event of
                changes in circumstances associated with COVID 19, we promptly
                inform our clients about changes in our ability to provide the
                support we owe them and make suitable alternatives available to
                ensure that there is minimal disruption (if any), to the
                services we provide to our clients.
              </p>
            </div>

            {/* Added h-full to ensure image column matches flex container height */}
            <div className="relative w-full h-[280px] md:h-full self-stretch">
              <img
                src="/covid1.png"
                alt="Bottom background image"
                className="absolute top-[40px] left-[40px] md:left-[-50px] w-[200px] h-[217px] md:w-[300px] md:h-[325px]"
              />
              <img
                src="/covid2.png"
                alt="Top background image"
                className="absolute top-0  right-[40px] md:right-0 w-[200px] h-[217px] md:w-[300px] md:h-[325px]"
              />
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Main;
