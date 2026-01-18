import { Entry, EntrySkeletonType, EntryFieldTypes } from 'contentful';
import { EventSkeleton } from './event-types';

// Define the Contentful skeleton for Event Feedback
export interface EventFeedbackSkeleton extends EntrySkeletonType {
  contentTypeId: 'eventFeedback';
  fields: {
    entryTitle: EntryFieldTypes.Symbol;
    event: EntryFieldTypes.EntryLink<EventSkeleton>;
    submissionDate: EntryFieldTypes.Date;
    approved: EntryFieldTypes.Boolean;

    // Event Experience
    presentationRating?: EntryFieldTypes.Symbol;
    gainedFromEvent?: EntryFieldTypes.Text;
    venueRating?: EntryFieldTypes.Symbol;
    activitiesRating?: EntryFieldTypes.Symbol;

    // Event Awareness
    heardAboutEvent?: EntryFieldTypes.Symbol;
    heardAboutEventOther?: EntryFieldTypes.Symbol;

    // Brand Awareness
    knewAboutNovelCare?: EntryFieldTypes.Symbol;
    knewAboutCarersWA?: EntryFieldTypes.Symbol;
    improvedUnderstanding?: EntryFieldTypes.Symbol;

    // Participant Information
    onNDIS?: EntryFieldTypes.Symbol;
    takingCareOf?: EntryFieldTypes.Symbol;
    takingCareOfOther?: EntryFieldTypes.Symbol;

    // Additional Comments
    additionalComments?: EntryFieldTypes.Text;
  };
}

// The actual EventFeedback type
export type EventFeedback = Entry<EventFeedbackSkeleton, undefined, string>;

// Helper type for just the fields (for easier access)
export type EventFeedbackFields = EventFeedbackSkeleton['fields'];

// Form data type for submission (before it becomes a Contentful entry)
export interface EventFeedbackSubmissionData {
  eventId: string; // Contentful Event entry ID
  presentationRating?: string;
  gainedFromEvent?: string;
  venueRating?: string;
  activitiesRating?: string;
  heardAboutEvent?: string;
  heardAboutEventOther?: string;
  knewAboutNovelCare?: string;
  knewAboutCarersWA?: string;
  improvedUnderstanding?: string;
  onNDIS?: string;
  takingCareOf?: string;
  takingCareOfOther?: string;
  additionalComments?: string;
}
