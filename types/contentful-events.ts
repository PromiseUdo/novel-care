// types/contentful/event.ts

import { Entry, EntrySkeletonType } from 'contentful';

/**
 * Fields as defined in Contentful
 */
export interface EventFields {
  title: string;
  slug: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;

  featuredImage: {
    fields: {
      file: {
        url: string;
        details: {
          image: {
            width: number;
            height: number;
          };
        };
      };
      title: string;
    };
  };

  category?: string;
  organizer?: string;
  status?: 'upcoming' | 'ongoing' | 'completed';
  metaDescription?: string;
}

/**
 * Contentful skeleton (ties fields → content type ID)
 */
export type EventSkeleton = EntrySkeletonType<
  EventFields,
  'event' // must match Contentful content type ID
>;

/**
 * Fully-typed Contentful Event entry
 */
export type Event = Entry<EventSkeleton>;
