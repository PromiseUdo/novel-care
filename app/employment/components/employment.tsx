"use client";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

const Employment = () => {
  const router = useRouter();
  return (
    <MaxWidthWrapper>
      <div className="rounded-[40px] px-[16px] py-[40px] md:p-[40px] w-full md:max-w-[600px] mt-16 bg-[#FAE4D180] mx-auto">
        <div className="w-full flex items-center justify-center flex-col gap-[40px]">
          <h2 className="text-[40px] text-[#4E4D4D]">Employment</h2>
          <div className="flex flex-col gap-[40px]">
            <p className="leading-[28px]">
              Novel Care Services is constantly seeking enthusiastic and highly
              skilled staff to help support our clients.
            </p>

            <p className="leading-[28px]">
              We would love to hear from you if you are passionate about caring
              for people with disability and want to use your skills in making a
              positive difference in the community. Be rest assured that there
              is ample opportunity for regular training, career progression and
              motivation at Novel Care Services.
            </p>
          </div>
          <Button
            onClick={() => router.push("/contact")}
            className="bg-[#E67817] text-[#0F0E0E] font-semibold w-[300px] rounded-[64px] h-[52px]"
          >
            Contact us
          </Button>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Employment;
