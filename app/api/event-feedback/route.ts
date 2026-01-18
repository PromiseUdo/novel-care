// import { NextRequest, NextResponse } from 'next/server';
// import prismadb from '@/lib/prismadb';
// import { eventFeedbackSchema } from '@/types/event-feedback-schema';

// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();

//     // Validate the input
//     const validatedData = eventFeedbackSchema.parse(body);

//     // Save to database
//     const feedback = await prismadb.eventFeedback.create({
//       data: validatedData,
//     });

//     return NextResponse.json(
//       {
//         success: true,
//         message: 'Feedback submitted successfully',
//         data: feedback,
//       },
//       { status: 201 },
//     );
//   } catch (error) {
//     console.error('Error submitting event feedback:', error);

//     if (error instanceof Error && error.name === 'ZodError') {
//       return NextResponse.json(
//         { success: false, message: 'Invalid form data', error },
//         { status: 400 },
//       );
//     }

//     return NextResponse.json(
//       { success: false, message: 'Failed to submit feedback' },
//       { status: 500 },
//     );
//   }
// }

// export async function GET(req: NextRequest) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const eventSlug = searchParams.get('eventSlug');

//     if (!eventSlug) {
//       return NextResponse.json(
//         { success: false, message: 'Event slug is required' },
//         { status: 400 },
//       );
//     }

//     const feedbacks = await prismadb.eventFeedback.findMany({
//       where: { eventSlug },
//       orderBy: { createdAt: 'desc' },
//     });

//     return NextResponse.json(
//       { success: true, data: feedbacks },
//       { status: 200 },
//     );
//   } catch (error) {
//     console.error('Error fetching event feedbacks:', error);
//     return NextResponse.json(
//       { success: false, message: 'Failed to fetch feedbacks' },
//       { status: 500 },
//     );
//   }
// }

import { NextRequest, NextResponse } from 'next/server';
import { eventFeedbackSchema } from '@/types/event-feedback-schema';
import {
  createEventFeedback,
  getApprovedFeedbacksForEvent,
} from '@/lib/contentful-management';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate the input
    const validatedData = eventFeedbackSchema.parse(body);

    // Create feedback entry in Contentful (as draft, unapproved)
    const result = await createEventFeedback(validatedData);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: result.error || 'Failed to submit feedback',
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message:
          'Thank you! Your feedback has been submitted and is pending review.',
        entryId: result.entryId,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error('Error submitting event feedback:', error);

    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { success: false, message: 'Invalid form data', error },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { success: false, message: 'Failed to submit feedback' },
      { status: 500 },
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const eventId = searchParams.get('eventId');

    if (!eventId) {
      return NextResponse.json(
        { success: false, message: 'Event ID is required' },
        { status: 400 },
      );
    }

    // Get only approved and published feedbacks
    const feedbacks = await getApprovedFeedbacksForEvent(eventId);

    return NextResponse.json(
      { success: true, data: feedbacks },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error fetching event feedbacks:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch feedbacks' },
      { status: 500 },
    );
  }
}
