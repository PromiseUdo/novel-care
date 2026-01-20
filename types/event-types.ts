import { Entry, EntrySkeletonType, EntryFieldTypes } from 'contentful';

// Define the Contentful skeleton for Event
export interface EventSkeleton extends EntrySkeletonType {
  contentTypeId: 'event';
  fields: {
    title: EntryFieldTypes.Symbol;
    slug: EntryFieldTypes.Symbol;
    description: EntryFieldTypes.Text;
    startDate: EntryFieldTypes.Date;
    endDate: EntryFieldTypes.Date;
    location: EntryFieldTypes.Symbol;
    featuredImage: EntryFieldTypes.AssetLink;
    eventGallery?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
    category?: EntryFieldTypes.Symbol;
    organizer?: EntryFieldTypes.Symbol;
    status?: EntryFieldTypes.Symbol<'upcoming' | 'ongoing' | 'completed'>;
    metaDescription?: EntryFieldTypes.Symbol;
  };
}

// Use Contentful's Entry type with your skeleton
export type Event = Entry<EventSkeleton, undefined, string>;

// Helper type for just the fields
export type EventFields = EventSkeleton['fields'];
