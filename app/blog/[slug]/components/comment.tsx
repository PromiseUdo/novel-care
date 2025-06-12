import Image from "next/image";
import React from "react";

interface CommentProps {
  author: string;
  comment: string;
  timestamp: string;
}

const Comment: React.FC<CommentProps> = ({ author, comment, timestamp }) => {
  const date = new Date(timestamp);
  const isValidDate = !isNaN(date.getTime());

  const formattedDate = isValidDate
    ? date.toLocaleDateString("en-AU", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "Africa/Lagos",
      })
    : "Date unavailable";

  if (!isValidDate) {
    console.warn(`Invalid timestamp received: ${timestamp}`);
  }

  return (
    <div className="w-full flex flex-col gap-[6px]">
      <div className="flex items-center gap-[11px]">
        <Image
          src="/commenter1.png"
          height={64}
          width={64}
          alt="Commenter profile picture"
          className="rounded-full"
        />
        <div className="flex flex-col gap-[5px]">
          <p className="font-bold text-[#1E1E1E]">{author}</p>
          <p className="text-[14px] text-[#4E4D4D]">{formattedDate}</p>
        </div>
      </div>
      <p className="ml-2.5 text-[#1E1E1E] leading-[28px]">{comment}</p>
    </div>
  );
};

export default Comment;
