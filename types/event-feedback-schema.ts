// import { z } from 'zod';

// export const eventFeedbackSchema = z.object({
//   eventSlug: z.string().min(1, 'Event slug is required'),

//   // Event Experience
//   presentationRating: z.string().optional(),
//   gainedFromEvent: z.string().optional(),
//   venueRating: z.string().optional(),
//   activitiesRating: z.string().optional(),

//   // Event Awareness
//   heardAboutEvent: z.string().optional(),
//   heardAboutEventOther: z.string().optional(),

//   // Brand Awareness
//   knewAboutNovelCare: z.string().optional(),
//   knewAboutCarersWA: z.string().optional(),
//   improvedUnderstanding: z.string().optional(),

//   // Participant Information
//   onNDIS: z.string().optional(),
//   takingCareOf: z.string().optional(),
//   takingCareOfOther: z.string().optional(),

//   // Additional Comments
//   additionalComments: z.string().optional(),
// });

// export type EventFeedbackFormData = z.infer<typeof eventFeedbackSchema>;

import { z } from 'zod';

export const eventFeedbackSchema = z.object({
  eventId: z.string().min(1, 'Event ID is required'), // Changed from eventSlug to eventId

  // Event Experience
  presentationRating: z.string().optional(),
  gainedFromEvent: z.string().optional(),
  venueRating: z.string().optional(),
  activitiesRating: z.string().optional(),

  // Event Awareness
  heardAboutEvent: z.string().optional(),
  heardAboutEventOther: z.string().optional(),

  // Brand Awareness
  knewAboutNovelCare: z.string().optional(),
  knewAboutCarersWA: z.string().optional(),
  improvedUnderstanding: z.string().optional(),

  // Participant Information
  onNDIS: z.string().optional(),
  takingCareOf: z.string().optional(),
  takingCareOfOther: z.string().optional(),

  // Additional Comments
  additionalComments: z.string().optional(),
});

export type EventFeedbackFormData = z.infer<typeof eventFeedbackSchema>;
