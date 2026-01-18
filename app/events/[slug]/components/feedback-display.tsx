'use client';

import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Star, MessageSquare } from 'lucide-react';

interface FeedbackDisplayProps {
  eventId: string;
}

interface Feedback {
  sys: {
    id: string;
    createdAt: string;
  };
  fields: {
    submissionDate: string;
    presentationRating?: string;
    gainedFromEvent?: string;
    venueRating?: string;
    activitiesRating?: string;
    improvedUnderstanding?: string;
    additionalComments?: string;
  };
}

export default function FeedbackDisplay({ eventId }: FeedbackDisplayProps) {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeedbacks() {
      try {
        const response = await fetch(`/api/event-feedback?eventId=${eventId}`);
        const data = await response.json();

        if (data.success) {
          setFeedbacks(data.data);
        }
      } catch (error) {
        console.error('Error fetching feedbacks:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchFeedbacks();
  }, [eventId]);

  if (loading) {
    return (
      <div className="bg-white rounded-lg p-6 sm:p-8 shadow-sm border border-gray-100">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-20 bg-gray-200 rounded"></div>
          <div className="h-20 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (feedbacks.length === 0) {
    return (
      <div className="bg-white rounded-lg p-6 sm:p-8 shadow-sm border border-gray-100 text-center">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <MessageSquare className="w-8 h-8 text-[#E67817]" />
        </div>
        <h3 className="text-lg font-semibold text-[#4E4D4D] mb-2">
          No Feedback Yet
        </h3>
        <p className="text-gray-600">
          Be the first to share your experience at this event!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-6 sm:p-8 shadow-sm border border-gray-100">
      <div className="flex items-center gap-2 mb-6">
        {/* <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" /> */}
        <h2 className="text-2xl font-bold text-[#4E4D4D]">
          Attendee Feedback ({feedbacks.length})
        </h2>
      </div>

      <div className="space-y-6">
        {feedbacks.map((feedback) => (
          <div
            key={feedback.sys.id}
            className="border-l-4 border-[#E67817] pl-4 py-3 bg-gray-50 rounded-r-lg"
          >
            {/* Submission Date */}
            <div className="text-xs text-gray-500 mb-3">
              {format(
                new Date(feedback.fields.submissionDate),
                'MMMM dd, yyyy',
              )}
            </div>

            {/* Ratings */}
            <div className="space-y-2 mb-3">
              {feedback.fields.presentationRating && (
                <div className="flex items-start gap-2">
                  <span className="text-sm font-semibold text-gray-700 min-w-[140px]">
                    Presentation:
                  </span>
                  <span className="text-sm text-gray-900">
                    {feedback.fields.presentationRating}
                  </span>
                </div>
              )}

              {feedback.fields.venueRating && (
                <div className="flex items-start gap-2">
                  <span className="text-sm font-semibold text-gray-700 min-w-[140px]">
                    Venue Access:
                  </span>
                  <span className="text-sm text-gray-900">
                    {feedback.fields.venueRating}
                  </span>
                </div>
              )}

              {feedback.fields.activitiesRating && (
                <div className="flex items-start gap-2">
                  <span className="text-sm font-semibold text-gray-700 min-w-[140px]">
                    Activities:
                  </span>
                  <span className="text-sm text-gray-900">
                    {feedback.fields.activitiesRating}
                  </span>
                </div>
              )}

              {feedback.fields.improvedUnderstanding && (
                <div className="flex items-start gap-2">
                  <span className="text-sm font-semibold text-gray-700 min-w-[140px]">
                    Understanding:
                  </span>
                  <span className="text-sm text-gray-900">
                    {feedback.fields.improvedUnderstanding}
                  </span>
                </div>
              )}
            </div>

            {/* What They Gained */}
            {feedback.fields.gainedFromEvent && (
              <div className="mb-3">
                <p className="text-sm font-semibold text-gray-700 mb-1">
                  What they gained:
                </p>
                <p className="text-sm text-gray-900 italic">
                  "{feedback.fields.gainedFromEvent}"
                </p>
              </div>
            )}

            {/* Additional Comments */}
            {feedback.fields.additionalComments && (
              <div className="mt-3 pt-3 border-t border-gray-200">
                <p className="text-sm font-semibold text-gray-700 mb-1">
                  Additional Comments:
                </p>
                <p className="text-sm text-gray-900 italic">
                  "{feedback.fields.additionalComments}"
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer Note */}
      {/* <div className="mt-6 pt-6 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          All feedback is reviewed and approved before being displayed
        </p>
      </div> */}
    </div>
  );
}
