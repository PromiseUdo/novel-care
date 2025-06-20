import React from "react";
import { createClient } from "contentful";
import { format } from "date-fns";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import Header from "./components/header";
import PostContent from "./components/post-content";
import CommentsAndShare from "./components/comments-and-share";
import MoreArticles from "./components/more-articles";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY!,
});

interface IParams {
  slug?: string;
}

const page = async ({ params }: { params: IParams }) => {
  const { items } = await client.getEntries({
    content_type: "blogPost",
    "fields.slug": params.slug,
  });

  const blogPost = items[0] as any;

  if (!blogPost) {
    return <div>Post not found</div>;
  }
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  let commentCount = 0;
  try {
    const response = await fetch(`${baseUrl}/api/comments//count`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postIds: [blogPost.sys.id] }),
      cache: "no-store",
    });
    if (response.ok) {
      const counts = await response.json();
      commentCount = counts[blogPost.sys.id] || 0;
    } else {
      console.error("Failed to fetch comment count:", await response.json());
    }
  } catch (error) {
    console.error("Error fetching comment count:", error);
  }

  const imageUrl = blogPost?.fields?.featuredImage?.fields?.file?.url
    ? `https:${blogPost.fields.featuredImage.fields.file.url}`
    : "/default-image.jpg";

  return (
    <div className="w-full mt-8 md:mt-16">
      <MaxWidthWrapper>
        <Header
          title={String(blogPost?.fields?.title ?? "")}
          date={format(blogPost?.sys?.createdAt, "d MMM yyyy")}
          featuredImage={imageUrl}
          post={blogPost}
          commentCount={commentCount}
        />
        <PostContent items={items} />
        <CommentsAndShare postId={blogPost?.sys?.id} />
        <MoreArticles postId={blogPost?.sys?.id} />
      </MaxWidthWrapper>
    </div>
  );
};

export const revalidate = 60;

export default page;
