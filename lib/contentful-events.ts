import { createClient } from 'contentful';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY!,
});

/**
 * Get all events
 */
export async function getAllEvents() {
  try {
    const response = await client.getEntries({
      content_type: 'event',
      order: ['-fields.startDate'],
    });

    return response.items;
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
}

/**
 * Get single event by slug
 */
export async function getEventBySlug(slug: string) {
  try {
    const response = await client.getEntries({
      content_type: 'event',
      'fields.slug': slug,
      limit: 1,
    });

    return response.items[0] ?? null;
  } catch (error) {
    console.error('Error fetching event by slug:', error);
    return null;
  }
}

/**
 * Get upcoming events (startDate >= now)
 */
export async function getUpcomingEvents() {
  try {
    const now = new Date().toISOString();

    const response = await client.getEntries({
      content_type: 'event',
      order: ['fields.startDate'],
      'fields.startDate[gte]': now,
    });

    return response.items;
  } catch (error) {
    console.error('Error fetching upcoming events:', error);
    return [];
  }
}

/**
 * Get past events (endDate < now)
 */
export async function getPastEvents() {
  try {
    const now = new Date();

    const response = await client.getEntries({
      content_type: 'event',
    });

    const pastEvents = response.items
      .filter((event: any) => new Date(event.fields.endDate) < now)
      .sort(
        (a: any, b: any) =>
          new Date(b.fields.endDate).getTime() -
          new Date(a.fields.endDate).getTime(),
      );

    return pastEvents;
  } catch (error) {
    console.error('Error fetching past events:', error);
    return [];
  }
}
