import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { FeedbackSchema, FeedbackSchemaType } from "@/types/feedback-schema";
import { sendFeedbackEmailData } from "@/server/actions/email";

// POST endpoint for feedback submissions
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate feedback data
    const validatedData = FeedbackSchema.parse(body);

    // Send feedback email
    const result = await sendFeedbackEmailData(validatedData);

    if (result.error) {
      return NextResponse.json(
        { error: result.error, details: result.details },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Feedback submitted successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error processing feedback:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to process feedback" },
      { status: 500 }
    );
  }
}
