import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { ContactSchema, ContactSchemaType } from "@/types/contact-schema";
import { sendContactFormDataEmail } from "@/server/actions/email";

// POST endpoint for contact form submissions
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate contact data
    const validatedData = ContactSchema.parse(body);

    // Send contact email
    const result = await sendContactFormDataEmail(validatedData);

    if (result.error) {
      return NextResponse.json(
        { error: result.error, details: result.details },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Message submitted successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error processing contact form:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to process contact form" },
      { status: 500 }
    );
  }
}
