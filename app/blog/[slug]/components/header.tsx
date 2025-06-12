"use client";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import React from "react";
import Image from "next/image";
import { extractTextFromPostBody } from "../../components/post-reel";
import { format } from "date-fns";

const Header = ({
  title,
  date,
  featuredImage,
  post,
  commentCount,
}: {
  title: string;
  date: string;
  featuredImage: string;
  post: any;
  commentCount: number;
}) => {
  const postBodyText = extractTextFromPostBody(post?.fields?.postBody);

  // console.log("featuredImage:", featuredImage);
  // console.log("post:", post);

  return (
    <div className="w-full flex flex-col gap-[32px]">
      <div className="bg-[#FAE4D1] z-40 sticky top-[96px] py-6 flex flex-col items-center justify-center text-center">
        <h1 className="text-[32px] font-bold text-[#1E1E1E]">{title}</h1>
      </div>

      <div className="mx-auto w-full max-w-5xl">
        <div className=" w-full h-[279px] relative">
          <Image
            src={featuredImage}
            alt={`${title} featured image`}
            fill
            style={{ objectFit: "cover" }}
            priority
            quality={85}
          />
        </div>
        <div className="mx-auto mt-2 flex flex-col md:flex-row justify-center items-center gap-[8px] md:gap-[5px]">
          <p className="text-[#E67817] font-medium">
            {format(post?.sys?.createdAt, "d MMM yyyy")}
          </p>

          <div className="text-[14px] flex items-center gap-[8px]">
            <p className="text-[#8E8E8E]">In Causes</p>
            <div className="text-[#8E8E8E] bg-[#8E8E8E] h-[1rem] w-px" />
            <p className="text-[#8E8E8E]">by Admin </p>
            <div className="text-[#8E8E8E] bg-[#8E8E8E] h-[1rem] w-px" />
            <p className="text-[#8E8E8E]">
              {commentCount} Comment{commentCount !== 1 ? "s" : ""}{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
