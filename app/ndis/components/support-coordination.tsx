import React from "react";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import Link from "next/link";

const SupportCoordination = () => {
  return (
    <div className="w-full">
      <MaxWidthWrapper>
        <div className="w-full flex flex-col gap-[24px]">
          <h2 className="text-[40px] text-center text-[#4E4D4D]">
            Support Coordination
          </h2>
          <p className="leading-[28px] text-[#1E1E1E]">
            Support Coordination assists you to build the skills you need to
            understand, implement and use your NDIS plan. A Support Coordinator
            works with you to ensure a mix of supports are used to increase your
            capacity to maintain relationships, manage service delivery tasks,
            live more independently, and be included in your community.
          </p>
          <p>Support Coordination helps you to:</p>
          <ul className="leading-[28px] list-disc pl-[20px] text-[#1E1E1E]">
            <li>Understand your NDIS plan</li>
            <li>Find out what supports are included in your plan</li>
            <li>Find the right service providers for you to choose from</li>
            <li>Keep your NDIS plan on track</li>
            <li>Ensure reports and evidence are provided to the NDIS</li>
          </ul>

          <p className="leading-[28px] list-disc  text-[#1E1E1E]">
            NovelCare Support Coordination provides person-centred and
            individualised support coordination. We understand that you need
            choice and control in how you spend the NDIS funding available to
            you, and how important it is to seek the most value out of your
            plan. We'll work alongside you and your support network to
            understand the possibilities of your plan and connect you with the
            supports that meet your identified needs.
          </p>
          <p className="leading-[28px] list-disc  text-[#1E1E1E]">
            Our NDIS Support Coordinator can also work with you on future
            planning, ILO designs, and SIL/ SDA exploration. Whether it is
            collaborating with a team, your family or other people in your life,
            we will help you understand what options are available, or help you
            design your own option to ensure that you are able to break down
            barriers to empower you to live your life, your way.
          </p>

          <div className="w-full max-w-4xl mx-auto aspect-video rounded-xl overflow-hidden shadow">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/VSbHanbKlAs"
              title="How To - What is support coordination?"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            ></iframe>
          </div>

          <p className="text-[#E67817FF] font-semibold text-[20px]">
            If you are interested in our Support Coordination services, complete
            our{" "}
            <Link
              href="/referral"
              className="text-[#E67817] underline hover:text-[#d16c14] transition-colors"
            >
              e-referral form
            </Link>{" "}
            and we will get back to you as soon as possible to schedule an
            introductory meeting.
          </p>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default SupportCoordination;
