import React from "react";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import PostsReel from "./components/post-reel";
import { createClient } from "contentful";
import { Suspense } from "react";
import { LoaderCircle } from "lucide-react";
import Hero from "./components/hero";

async function getData(searchQuery: string = "") {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID!,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY!,
  });

  const query: any = {
    content_type: "blogPost",
  };

  // Add search filter if query exists
  if (searchQuery.trim()) {
    query["query"] = searchQuery.trim();
  }

  // Fetch posts from Contentful
  const blogPosts = await client.getEntries(query);

  // Sort posts by createdAt (newest first)
  blogPosts.items.sort(
    (a, b) => Date.parse(b.sys.createdAt) - Date.parse(a.sys.createdAt)
  );

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const postIds = blogPosts.items.map((post: any) => post.sys.id);
  let commentCounts: Record<string, number> = {};
  if (postIds.length > 0) {
    try {
      const response = await fetch(`${baseUrl}/api/comments/count`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postIds }),
        cache: "no-store", // Ensure fresh data
      });
      if (response.ok) {
        commentCounts = await response.json();
      } else {
        console.error("Failed to fetch comment counts:", await response.json());
      }
    } catch (error) {
      console.error("Error fetching comment counts:", error);
    }
  }

  // Merge comment counts with posts
  const enrichedPosts = {
    ...blogPosts,
    items: blogPosts.items.map((post: any) => ({
      ...post,
      commentCount: commentCounts[post.sys.id] || 0, // Add commentCount to post
    })),
  };

  return [enrichedPosts];
}

const PostsRenderer = ({
  blogPosts,
  searchQuery,
}: {
  blogPosts: any;
  searchQuery: string;
}) => {
  return (
    <div className="mt-16">
      <PostsReel
        title="All Posts"
        posts={blogPosts.items}
        emptyTitle="No Posts Found"
        emptyDescription={
          searchQuery
            ? `No posts match your search for "${searchQuery}". Try a different term!`
            : "It looks like there are no posts to display right now. Check back later for new content!"
        }
      />
    </div>
  );
};

const Page = async ({
  searchParams,
}: {
  searchParams: { search?: string };
}) => {
  const searchQuery = searchParams.search || "";
  const [blogPosts] = await getData(searchQuery);

  // console.dir(blogPosts, { depth: null });

  return (
    <div className="w-full">
      <Hero />
      <Suspense
        fallback={
          <MaxWidthWrapper>
            <div className="py-8 flex flex-col items-center gap-4">
              <LoaderCircle
                className="h-8 w-8 animate-spin text-primary"
                aria-hidden="true"
              />
              <p className="text-lg font-medium text-foreground">
                Loading posts...
              </p>
              <p className="text-sm text-muted-foreground">
                Please wait while we fetch the latest posts.
              </p>
            </div>
          </MaxWidthWrapper>
        }
      >
        <PostsRenderer blogPosts={blogPosts} searchQuery={searchQuery} />
      </Suspense>
    </div>
  );
};

export const revalidate = 60;
export default Page;
