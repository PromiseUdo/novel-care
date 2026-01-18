import { Metadata } from 'next';
import { getAllEvents } from '@/lib/contentful-events';
import EventsHero from './components/hero';
import EventCard from './components/event-card';
import MaxWidthWrapper from '@/components/max-width-wrapper';

export const metadata: Metadata = {
  title: 'Community Events | Novel Care Services',
  description:
    'Join us for upcoming community events and activities. Connect with others and experience meaningful engagement at Novel Care Services.',
  openGraph: {
    title: 'Community Events | Novel Care Services',
    description: 'Join us for upcoming community events and activities.',
  },
};

export const revalidate = 3600;

export default async function EventsPage() {
  const events = await getAllEvents();

  console.dir(events, { depth: null });

  // Separate upcoming and past events
  const now = new Date();

  const upcomingEvents = events.filter(
    (event: any) => new Date(event.fields.endDate) >= now,
  );

  const pastEvents = events.filter(
    (event: any) => new Date(event.fields.endDate) < now,
  );

  return (
    <main className="min-h-screen ">
      <EventsHero />

      <MaxWidthWrapper className="py-12 sm:py-16">
        {/* Upcoming Events */}
        <section className="mb-16">
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#E67817] mb-2">
              Upcoming Events
            </h2>
            <p className="text-gray-600">
              Don&apos;t miss out on our exciting upcoming activities
            </p>
          </div>

          {upcomingEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {upcomingEvents.map((event: any) => (
                <EventCard key={event.sys.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg p-8 sm:p-12 text-center shadow-sm border border-gray-100">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 bg-[#E67817]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-[#E67817]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[#4E4D4D] mb-2">
                  No Upcoming Events
                </h3>
                <p className="text-gray-600">
                  Check back soon for new community events and activities.
                </p>
              </div>
            </div>
          )}
        </section>

        {/* Past Events */}
        {pastEvents.length > 0 && (
          <section>
            <div className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#4E4D4D] mb-2">
                Past Events
              </h2>
              <p className="text-gray-600">
                Take a look at our previous community gatherings
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {pastEvents.map((event: any) => (
                <EventCard key={event.sys.id} event={event} />
              ))}
            </div>
          </section>
        )}
      </MaxWidthWrapper>
    </main>
  );
}
