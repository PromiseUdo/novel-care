import { createClient } from 'contentful';
import { EventSkeleton } from '@/types/event-types';
import { EventFeedbackSubmissionData } from '@/types/event-feedback-contenful-types';

const CONTENTFUL_SPACE_ID = process.env.CONTENTFUL_SPACE_ID!;
const CONTENTFUL_MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN!;
const CONTENTFUL_ENVIRONMENT = process.env.CONTENTFUL_ENVIRONMENT || 'master';

// Create a Contentful client for fetching event details
const contentfulClient = createClient({
  space: CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY!,
});

/**
 * Create a new Event Feedback entry in Contentful
 * The entry will be created in DRAFT state and unapproved by default
 */
export async function createEventFeedback(
  data: EventFeedbackSubmissionData,
): Promise<{ success: boolean; entryId?: string; error?: string }> {
  try {
    // Fetch the event details to get the event title for our entry title
    const event = await contentfulClient.getEntry<EventSkeleton>(data.eventId);
    const eventTitle = event.fields.title || 'Unknown Event';

    // Generate entry title: "Feedback: [Event Title] - [Date]"
    const submissionDate = new Date();
    const formattedDate = submissionDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
    const entryTitle = `Feedback: ${eventTitle} - ${formattedDate}`;

    // Prepare the entry data in Contentful format
    const entryData = {
      fields: {
        entryTitle: {
          'en-US': entryTitle,
        },
        event: {
          'en-US': {
            sys: {
              type: 'Link',
              linkType: 'Entry',
              id: data.eventId,
            },
          },
        },
        submissionDate: {
          'en-US': submissionDate.toISOString(),
        },
        approved: {
          'en-US': false, // Default to unapproved
        },
        ...(data.presentationRating && {
          presentationRating: { 'en-US': data.presentationRating },
        }),
        ...(data.gainedFromEvent && {
          gainedFromEvent: { 'en-US': data.gainedFromEvent },
        }),
        ...(data.venueRating && {
          venueRating: { 'en-US': data.venueRating },
        }),
        ...(data.activitiesRating && {
          activitiesRating: { 'en-US': data.activitiesRating },
        }),
        ...(data.heardAboutEvent && {
          heardAboutEvent: { 'en-US': data.heardAboutEvent },
        }),
        ...(data.heardAboutEventOther && {
          heardAboutEventOther: { 'en-US': data.heardAboutEventOther },
        }),
        ...(data.knewAboutNovelCare && {
          knewAboutNovelCare: { 'en-US': data.knewAboutNovelCare },
        }),
        ...(data.knewAboutCarersWA && {
          knewAboutCarersWA: { 'en-US': data.knewAboutCarersWA },
        }),
        ...(data.improvedUnderstanding && {
          improvedUnderstanding: { 'en-US': data.improvedUnderstanding },
        }),
        ...(data.onNDIS && {
          onNDIS: { 'en-US': data.onNDIS },
        }),
        ...(data.takingCareOf && {
          takingCareOf: { 'en-US': data.takingCareOf },
        }),
        ...(data.takingCareOfOther && {
          takingCareOfOther: { 'en-US': data.takingCareOfOther },
        }),
        ...(data.additionalComments && {
          additionalComments: { 'en-US': data.additionalComments },
        }),
      },
    };

    // Create entry using Contentful Management API
    const createUrl = `https://api.contentful.com/spaces/${CONTENTFUL_SPACE_ID}/environments/${CONTENTFUL_ENVIRONMENT}/entries`;

    const response = await fetch(createUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${CONTENTFUL_MANAGEMENT_TOKEN}`,
        'Content-Type': 'application/vnd.contentful.management.v1+json',
        'X-Contentful-Content-Type': 'eventFeedback',
      },
      body: JSON.stringify(entryData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Contentful API Error:', errorData);
      throw new Error(
        `Failed to create feedback entry: ${response.statusText}`,
      );
    }

    const createdEntry = await response.json();

    return {
      success: true,
      entryId: createdEntry.sys.id,
    };
  } catch (error) {
    console.error('Error creating event feedback in Contentful:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

/**
 * Get all approved feedbacks for a specific event
 */
export async function getApprovedFeedbacksForEvent(
  eventId: string,
): Promise<any[]> {
  try {
    // Use the Contentful client with proper typing
    const response = await contentfulClient.getEntries({
      content_type: 'eventFeedback',
      'fields.event.sys.id': eventId,
      'fields.approved': true, // Only approved feedbacks
      order: ['-fields.submissionDate'], // Newest first
    });

    return response.items || [];
  } catch (error) {
    console.error('Error fetching approved feedbacks:', error);
    return [];
  }
}
