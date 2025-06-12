import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { z } from "zod";

const CommentInputSchema = z.object({
  postId: z.string().min(1, "Post ID is required"),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required").optional(),
  comment: z.string().min(1, "Comment is required"),
  timestamp: z.string().datetime().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = CommentInputSchema.parse(body);

    const comment = await prisma.comment.create({
      data: {
        postId: validatedData.postId,
        author: validatedData.name,
        email: validatedData.email,
        comment: validatedData.comment,
        timestamp: validatedData.timestamp
          ? new Date(validatedData.timestamp)
          : new Date(),
      },
    });

    return NextResponse.json(
      {
        message: "Comment submitted successfully",
        comment: {
          id: comment.id,
          author: comment.author,
          comment: comment.comment,
          timestamp: comment.timestamp.toISOString(),
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error submitting comment:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to submit comment" },
      { status: 500 }
    );
  }
}
