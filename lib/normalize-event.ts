import { Event } from '@/types/event-types';
const EMPTY_DATE = '1970-01-01T00:00:00Z' as const;

export function normalizeEvent(entry: any): Event {
  return {
    sys: entry.sys,
    metadata: entry.metadata,
    fields: {
      title: String(entry.fields.title || ''),
      slug: String(entry.fields.slug || ''),
      description: String(entry.fields.description || ''),
      startDate: entry.fields.startDate,
      endDate: entry.fields.endDate,
      location: String(entry.fields.location || ''),
      featuredImage: entry.fields.featuredImage ?? null,
      eventGallery: entry.fields.eventGallery ?? null,
      category: entry.fields.category || undefined,
      organizer: entry.fields.organizer || undefined,
      status: entry.fields.status || undefined,
      metaDescription: entry.fields.metaDescription || undefined,
    },
  };
}
