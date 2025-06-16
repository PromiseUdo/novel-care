import MaxWidthWrapper from "@/components/max-width-wrapper";
import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const Main = () => {
  return (
    <div className="w-full py-16">
      <MaxWidthWrapper>
        <div className="flex flex-col md:flex-row gap-8 bg-white border rounded-[40px] px-[16px] py-[40px] md:p-[40px] h-full md:min-h-[500px]">
          {/* Left Column: Image */}

          <div className="md:w-1/2 relative h-64 md:h-auto md:min-h-full">
            <Image
              src="/care.jpg"
              alt="SIL Accommodation"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
              priority
            />
          </div>

          {/* Right Column: Text and Button */}
          <div className="md:w-1/2 flex flex-col justify-center gap-6">
            <h2 className="text-3xl md:text-4xl text-center font-titan-one text-[#4E4D4D]">
              SIL Accommodation
            </h2>
            <p className="text-base leading-[28px] text-[#1E1E1E]">
              Supported living accommodation in the Southwest, Black Wood Region
              to assist you to maintain your independence and participate in the
              community. With 24/7 support we can help you get out and about to
              social groups, shopping, visiting the cinema, sports center or
              library, having coffee with friends or even go on holiday. Let us
              help you regain your independence in the community.
            </p>
            <p className="text-base leading-[28px] text-[#1E1E1E]">
              The accommodation has 24/7 carer support who will help with
              assisting and performing essential house cleaning activities,
              laundry, meal preparation and fresh home cooked meals, medication
              management and personal care support.
            </p>
            <div className=" w-full flex items-center justify-center md:justify-start">
              <Link href="/contact">
                <Button className="bg-[#E67817] text-[#0F0E0E] font-semibold w-[300px] rounded-[64px] h-[52px]">
                  Get in touch
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Main;
