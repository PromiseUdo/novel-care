import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getEventBySlug } from '@/lib/contentful-events';
import MaxWidthWrapper from '@/components/max-width-wrapper';
import EventFeedbackForm from '../../components/event-feedback-form';
import { format } from 'date-fns';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { normalizeEvent } from '@/lib/normalize-event';
import { Calendar, MapPin } from 'lucide-react';
import { MessageCircle } from 'lucide-react';

interface FeedbackPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: FeedbackPageProps): Promise<Metadata> {
  const event = await getEventBySlug(params.slug);

  if (!event) {
    return {
      title: 'Event Not Found | Novel Care Services',
    };
  }

  return {
    title: `Feedback - ${event.fields.title} | Novel Care Services`,
    description: `Share your feedback about ${event.fields.title}`,
  };
}

export const revalidate = 3600;

export default async function EventFeedbackPage({ params }: FeedbackPageProps) {
  const rawEvent = await getEventBySlug(params.slug);

  if (!rawEvent) notFound();

  const event = normalizeEvent(rawEvent);

  if (!event) {
    notFound();
  }

  const { title, startDate, location } = event.fields;
  const eventId = event.sys.id;

  return (
    <main className="min-h-screen  py-8 sm:py-12">
      <MaxWidthWrapper>
        {/* Back Button */}
        <Link
          href={`/events/${params.slug}`}
          className="inline-flex items-center gap-2 text-[#E67817] hover:text-[#d16c14] mb-6 font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Event
        </Link>

        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-lg p-6 sm:p-8 mb-8 shadow-sm border border-gray-100">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-[#E67817]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-[#E67817]" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#4E4D4D] mb-2">
                Event Feedback
              </h1>
              <p className="text-gray-600">
                We&apos;d love to hear about your experience
              </p>
            </div>

            <div className="bg-[#E67817]/10 rounded-lg p-4 border border-[#E67817]/10">
              <h2 className="font-bold text-[#E67817] mb-2 text-lg">{title}</h2>
              <div className="text-sm text-gray-600 space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#E67817] flex-shrink-0" />
                  <span>{format(new Date(startDate), 'MMMM dd, yyyy')}</span>
                </div>

                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#E67817] flex-shrink-0" />
                  <span>{location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Feedback Form */}
          <div className="bg-white rounded-lg p-6 sm:p-8 shadow-sm border border-gray-100">
            <EventFeedbackForm eventId={eventId} />
          </div>

          {/* Footer Note */}
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>
              Thank you for taking the time to share your feedback. Your input
              helps us create better events for our community.
            </p>
          </div>
        </div>
      </MaxWidthWrapper>
    </main>
  );
}
