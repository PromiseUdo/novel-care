"use client";
import PostCard from "./post-card";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { cn } from "@/lib/utils";
import { BookOpen, RefreshCw } from "lucide-react";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export function extractTextFromPostBody(postBody: any): string {
  let textContent = "";

  function extractContent(content: any[]) {
    content.forEach((node) => {
      if (node.nodeType === "text") {
        textContent += node.value + " ";
      } else if (node.content && Array.isArray(node.content)) {
        extractContent(node.content);
      }
    });
  }

  if (postBody && postBody.content) {
    extractContent(postBody.content);
  }

  return textContent.trim();
}

const PostsReel = ({
  posts,
  title,
  className,
  emptyTitle,
  emptyDescription,
}: {
  posts: any;
  title: string;
  className?: string;
  emptyTitle: string;
  emptyDescription: string;
}) => {
  return (
    <div className={cn("w-full pt-3 pb-10", className)}>
      <MaxWidthWrapper>
        <div className="border-white/20 relative backdrop-blur-lg">
          {/* Scrollable Container */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[32px] overflow-x-auto snap-x snap-mandatory scrollbar-thin scrollbar-thumb-[#04306e] scrollbar-track-gray-100 pb-4">
            {posts.length > 0 ? (
              posts?.map((post: any, idx: number) => {
                const postBodyText = extractTextFromPostBody(
                  post?.fields?.postBody
                );
                return (
                  <div key={idx} className="snap-center">
                    <PostCard
                      post={post}
                      commentCount={post.commentCount || 0} // Pass commentCount
                      className={cn("w-full")}
                    />
                  </div>
                );
              })
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12 border-b border-gray-300">
                <BookOpen className="w-12 h-12 text-[#04306e] mb-4" />
                <h3 className="text-lg font-semibold text-[#1e1e1e] mb-2">
                  {emptyTitle}
                </h3>
                <p className="text-sm text-gray-600 text-center max-w-md">
                  {emptyDescription}
                </p>
                <a
                  href="/blog"
                  className="mt-4 flex items-center text-sm text-[#04306e] hover:text-[#05418f] transition-colors"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Explore Other Posts
                </a>
              </div>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default PostsReel;
