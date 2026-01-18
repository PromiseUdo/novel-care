import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getEventBySlug, getAllEvents } from '@/lib/contentful-events';
import EventDetailContent from './components/event-detail-content';
import { normalizeEvent } from '@/lib/normalize-event';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const event = await getEventBySlug(params.slug);

  if (!event) {
    return {
      title: 'Event Not Found | Novel Care Services',
    };
  }

  const title = String(event.fields.title || '');
  const description = String(event.fields.description || '');
  const metaDescription = String(event.fields.metaDescription || '');

  const featuredImage: any = event.fields.featuredImage;

  const imageUrl = featuredImage?.fields?.file?.url
    ? `https:${featuredImage.fields.file.url}`
    : undefined;

  const finalDescription = metaDescription || description.substring(0, 160);

  return {
    title: `${title} | Novel Care Services Events`,
    description: finalDescription,
    openGraph: {
      title,
      description: finalDescription,
      images: imageUrl ? [imageUrl] : [],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: finalDescription,
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

export async function generateStaticParams() {
  const events = await getAllEvents();

  return events.map((event: any) => ({
    slug: event.fields.slug,
  }));
}

export const revalidate = 3600;

export default async function EventDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const rawEvent = await getEventBySlug(params.slug);

  if (!rawEvent) notFound();

  const event = normalizeEvent(rawEvent);

  if (!event) {
    notFound();
  }

  return <EventDetailContent event={event} />;
}
