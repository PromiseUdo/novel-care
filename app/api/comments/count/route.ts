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

    const commentCounts = await prisma.comment.groupBy({
      by: ["postId"],
      where: {
        postId: { in: postIds },
      },
      _count: {
        id: true,
      },
    });

    const countsMap = commentCounts.reduce(
      (acc, { postId, _count }) => {
        acc[postId] = _count.id;
        return acc;
      },
      {} as Record<string, number>
    );

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
