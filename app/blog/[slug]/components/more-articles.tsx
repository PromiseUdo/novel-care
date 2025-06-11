import React from "react";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { createClient } from "contentful";
import { Suspense } from "react";
import { LoaderCircle } from "lucide-react";
import PostsReel from "../../components/post-reel";

// Client component to render posts
const PostsRenderer = ({
  blogPosts,
  postId,
}: {
  blogPosts: any;
  postId: string;
}) => {
  // Filter featured posts (server-side filtering already applied)
  const morePosts = blogPosts.items
    .filter((post: any) => post?.sys?.id !== postId)
    .slice(0, 3);

  return (
    <div className="flex flex-col gap-[16px]">
      <p className=" text-center text-[24px] font-medium">More Articles</p>
      <PostsReel
        title="Featured Posts"
        posts={morePosts}
        emptyTitle="No Featured Posts Found"
        emptyDescription={
          "It looks like there are no featured posts to display right now. Check back later for new content!"
        }
      />
      {/* <PostsReel
        title="Recent Posts"
        posts={blogPosts.items}
        className="bg-gray-50"
        emptyTitle="No Recent Posts Found"
        emptyDescription={
          searchQuery
            ? `No recent posts match your search for "${searchQuery}". Try a different term!`
            : "It looks like there are no recent posts to display right now. Check back later for new content!"
        }
      /> */}
    </div>
  );
};

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

  const blogPosts = await client.getEntries(query);

  // Sort all posts by createdAt (newest first)
  blogPosts.items.sort(
    (a, b) => Date.parse(b.sys.createdAt) - Date.parse(a.sys.createdAt)
  );

  return [blogPosts];
}

const MoreArticles = async ({ postId }: { postId: string }) => {
  const [blogPosts] = await getData();

  // const morePost = blogPosts.items
  // .filter((post: any) => post.fields.featuredPost === true)
  // .slice(0, 3);

  return (
    <div className="w-full  mt-16">
      <Suspense
        fallback={
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
        }
      >
        <PostsRenderer blogPosts={blogPosts} postId={postId} />
      </Suspense>
    </div>
  );
};

export const revalidate = 60;
export default MoreArticles;
