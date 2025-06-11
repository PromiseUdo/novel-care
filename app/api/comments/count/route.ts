import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function POST(request: Request) {
  try {
    const { postIds } = await request.json();
    if (!Array.isArray(postIds) || postIds.length === 0) {
      return NextResponse.json(
        { error: "Invalid or empty postIds array" },
        { status: 400 }
      );
    }

    // Fetch count of approved comments for each postId
    const commentCounts = await prisma.comment.groupBy({
      by: ["postId"],
      where: {
        postId: { in: postIds },
        // status: "approved", // Only approved comments
      },
      _count: {
        id: true, // Count comment IDs
      },
    });

    // Map counts to { [postId]: count }
    const countsMap = commentCounts.reduce(
      (acc, { postId, _count }) => {
        acc[postId] = _count.id;
        return acc;
      },
      {} as Record<string, number>
    );

    // Include 0 for postIds with no comments
    const result = postIds.reduce(
      (acc, postId) => {
        acc[postId] = countsMap[postId] || 0;
        return acc;
      },
      {} as Record<string, number>
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching comment counts:", error);
    return NextResponse.json(
      { error: "Failed to fetch comment counts" },
      { status: 500 }
    );
  }
}
