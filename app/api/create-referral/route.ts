import { sendReferralFormDataEmail } from "@/server/actions/email";
import { ReferralSchema, ReferralSchemaType } from "@/types/referal-schema";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Transform date strings to Date objects
    const transformedBody = {
      ...body,
      apply_date: body.apply_date ? new Date(body.apply_date) : undefined,
      client_dateOfBirth: body.client_dateOfBirth
        ? new Date(body.client_dateOfBirth)
        : undefined,
      client_planStartDate: body.client_planStartDate
        ? new Date(body.client_planStartDate)
        : undefined,
      client_planEndDate: body.client_planEndDate
        ? new Date(body.client_planEndDate)
        : undefined,
    };

    const validatedData = ReferralSchema.parse(transformedBody); // Validate data
    const result = await sendReferralFormDataEmail(validatedData);

    if (result.error) {
      return NextResponse.json(
        { error: result.error, details: result.details },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Referral submitted successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error processing referral:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to process referral" },
      { status: 500 }
    );
  }
}
