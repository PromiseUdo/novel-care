"use client";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { extractTextFromPostBody } from "./post-reel";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";

interface PostCardProps {
  post: any;
  readTime?: string;
  className?: string;
  commentCount: number;
}

const PostCard = ({
  post,
  className,
  readTime,
  commentCount,
}: PostCardProps) => {
  // Normalize image URL
  const imageUrl = post?.fields?.featuredImage?.fields?.file?.url
    ? `https:${post.fields.featuredImage.fields.file.url}`
    : "/default-image.jpg"; // Fallback image

  // Extract snippet from post body
  const postBodyText =
    extractTextFromPostBody(post?.fields?.postBody) || "No content available";

  // Safely access slug, fallback to a default or disable link
  const slug = post?.fields?.slug || null;
  const href = slug ? `/blog/${slug}` : "#"; // Fallback to "#" if no slug
  // console.dir(post, { depth: null });
  return (
    <div>
      <Link
        href={href}
        aria-disabled={!slug}
        className={cn(!slug && "pointer-events-none")}
      >
        <Card
          className={cn(
            "w-56 h-[620px] flex-shrink-0 bg-white hover:shadow-md transition-shadow duration-300 rounded overflow-hidden border border-gray-100",
            className
          )}
        >
          <CardContent className="p-0 flex flex-col h-full">
            {/* Post Image */}
            <div className="relative w-full h-[279px]">
              <Image
                src={imageUrl}
                alt={
                  post?.fields?.title
                    ? `${post.fields.title} thumbnail`
                    : "Post thumbnail"
                }
                fill
                className="object-cover"
                sizes="224px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
            </div>

            <div className="px-4 py-1 mt-3 flex flex-col gap-[8px] flex-1">
              <div className="flex flex-col gap-[5px]">
                <p className="text-[#E67817] font-medium">
                  {format(post?.sys?.createdAt, "d MMM yyy")}
                </p>
                <h3 className="text-[#1E1E1E] text-2xl line-clamp-2">
                  {post?.fields?.title}
                </h3>
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

              <div className="flex-1">
                <p className="leading-[28px] text-sm text-gray-600 line-clamp-4">
                  {postBodyText}
                </p>
              </div>

              <div className="px-4  flex items-center justify-center py-3 mt-auto">
                <Button className="font-semibold w-[300px] bg-[#E67817] h-[52px] rounded-[64px] text-[#0F0E0E]">
                  Read more
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
};

export default PostCard;
