'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  eventFeedbackSchema,
  EventFeedbackFormData,
} from '@/types/event-feedback-schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface EventFeedbackFormProps {
  eventId: string;
  onSuccess?: () => void;
}

export default function EventFeedbackForm({
  eventId,
  onSuccess,
}: EventFeedbackFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<EventFeedbackFormData>({
    resolver: zodResolver(eventFeedbackSchema),
    defaultValues: {
      eventId,
    },
  });

  const heardAboutEvent = watch('heardAboutEvent');
  const takingCareOf = watch('takingCareOf');

  const onSubmit = async (data: EventFeedbackFormData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/event-feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('Thank you for your feedback!');
        // reset();
        // onSuccess?.();

        reset({
          eventId,
        });

        onSuccess?.();

        // Redirect to home after a short delay (optional)
        setTimeout(() => {
          router.push('/');
        }, 800);
      } else {
        toast.error(result.message || 'Failed to submit feedback');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Event Experience Section */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-[#4E4D4D] border-b pb-2">
          Event Experience
        </h3>

        {/* Presentations Rating */}
        <div className="space-y-3">
          <Label className="text-base font-semibold">
            How did you find the presentations during the seminar?
          </Label>
          <RadioGroup
            onValueChange={(value) => setValue('presentationRating', value)}
            className="space-y-2"
          >
            {['Excellent', 'Very Good', 'Good', 'Fair', 'Poor'].map(
              (rating) => (
                <div key={rating} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={rating}
                    id={`presentation-${rating}`}
                    className="
    border-gray-300
    data-[state=checked]:border-[#E67817]
    data-[state=checked]:bg-[#E67817]
    text-[#E67817]
  "
                  />
                  <Label
                    htmlFor={`presentation-${rating}`}
                    className="font-normal cursor-pointer"
                  >
                    {rating}
                  </Label>
                </div>
              ),
            )}
          </RadioGroup>
          {errors.presentationRating && (
            <p className="text-sm text-red-600">
              {errors.presentationRating.message}
            </p>
          )}
        </div>

        {/* What did you gain */}
        <div className="space-y-3">
          <Label htmlFor="gainedFromEvent" className="text-base font-semibold">
            What did you gain from attending the event?
          </Label>
          <Textarea
            id="gainedFromEvent"
            {...register('gainedFromEvent')}
            placeholder="Share what you learned or experienced..."
            className="min-h-[100px] resize-none "
          />
          {errors.gainedFromEvent && (
            <p className="text-sm text-red-600">
              {errors.gainedFromEvent.message}
            </p>
          )}
        </div>

        {/* Venue Rating */}
        <div className="space-y-3">
          <Label className="text-base font-semibold">
            How easy was it to locate the venue?
          </Label>
          <RadioGroup
            onValueChange={(value) => setValue('venueRating', value)}
            className="space-y-2"
          >
            {[
              'Very Easy',
              'Easy',
              'Moderate',
              'Difficult',
              'Very Difficult',
            ].map((rating) => (
              <div key={rating} className="flex items-center space-x-2">
                <RadioGroupItem
                  className="
    border-gray-300
    data-[state=checked]:border-[#E67817]
    data-[state=checked]:bg-[#E67817]
    text-[#E67817]
  "
                  value={rating}
                  id={`venue-${rating}`}
                />
                <Label
                  htmlFor={`venue-${rating}`}
                  className="font-normal cursor-pointer"
                >
                  {rating}
                </Label>
              </div>
            ))}
          </RadioGroup>
          {errors.venueRating && (
            <p className="text-sm text-red-600">{errors.venueRating.message}</p>
          )}
        </div>

        {/* Activities Rating */}
        <div className="space-y-3">
          <Label className="text-base font-semibold">
            How would you rate the games or interactive activities?
          </Label>
          <RadioGroup
            onValueChange={(value) => setValue('activitiesRating', value)}
            className="space-y-2"
          >
            {[
              'Excellent',
              'Very Good',
              'Good',
              'Fair',
              'Poor',
              'No activities',
            ].map((rating) => (
              <div key={rating} className="flex items-center space-x-2">
                <RadioGroupItem
                  className="
    border-gray-300
    data-[state=checked]:border-[#E67817]
    data-[state=checked]:bg-[#E67817]
    text-[#E67817]
  "
                  value={rating}
                  id={`activities-${rating}`}
                />
                <Label
                  htmlFor={`activities-${rating}`}
                  className="font-normal cursor-pointer"
                >
                  {rating}
                </Label>
              </div>
            ))}
          </RadioGroup>
          {errors.activitiesRating && (
            <p className="text-sm text-red-600">
              {errors.activitiesRating.message}
            </p>
          )}
        </div>
      </div>

      {/* Event Awareness Section */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-[#4E4D4D] border-b pb-2">
          Event Awareness
        </h3>

        <div className="space-y-3">
          <Label className="text-base font-semibold">
            How did you hear about the event?
          </Label>
          <RadioGroup
            onValueChange={(value) => setValue('heardAboutEvent', value)}
            className="space-y-2"
          >
            {[
              'Social media',
              'Friend or referral',
              'Novel Care website',
              'Community outreach',
              'Other',
            ].map((source) => (
              <div key={source} className="flex items-center space-x-2">
                <RadioGroupItem
                  className="
    border-gray-300
    data-[state=checked]:border-[#E67817]
    data-[state=checked]:bg-[#E67817]
    text-[#E67817]
  "
                  value={source}
                  id={`heard-${source}`}
                />
                <Label
                  htmlFor={`heard-${source}`}
                  className="font-normal cursor-pointer"
                >
                  {source}
                </Label>
              </div>
            ))}
          </RadioGroup>
          {errors.heardAboutEvent && (
            <p className="text-sm text-red-600">
              {errors.heardAboutEvent.message}
            </p>
          )}
        </div>

        {heardAboutEvent === 'Other' && (
          <div className="space-y-3">
            <Label htmlFor="heardAboutEventOther">Please specify:</Label>
            <Input
              id="heardAboutEventOther"
              {...register('heardAboutEventOther')}
              placeholder="Tell us how you heard about this event..."
            />
          </div>
        )}
      </div>

      {/* Brand Awareness Section */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-[#4E4D4D] border-b pb-2">
          Brand Awareness
        </h3>

        <div className="space-y-3">
          <Label className="text-base font-semibold">
            Before this event, what did you know about Novel Care?
          </Label>
          <RadioGroup
            onValueChange={(value) => setValue('knewAboutNovelCare', value)}
            className="space-y-2"
          >
            {['A lot', 'Some', 'A little', 'Nothing'].map((level) => (
              <div key={level} className="flex items-center space-x-2">
                <RadioGroupItem
                  className="
    border-gray-300
    data-[state=checked]:border-[#E67817]
    data-[state=checked]:bg-[#E67817]
    text-[#E67817]
  "
                  value={level}
                  id={`novel-${level}`}
                />
                <Label
                  htmlFor={`novel-${level}`}
                  className="font-normal cursor-pointer"
                >
                  {level}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="space-y-3">
          <Label className="text-base font-semibold">
            Before this event, what did you know about Carers WA?
          </Label>
          <RadioGroup
            onValueChange={(value) => setValue('knewAboutCarersWA', value)}
            className="space-y-2"
          >
            {['A lot', 'Some', 'A little', 'Nothing'].map((level) => (
              <div key={level} className="flex items-center space-x-2">
                <RadioGroupItem
                  className="
    border-gray-300
    data-[state=checked]:border-[#E67817]
    data-[state=checked]:bg-[#E67817]
    text-[#E67817]
  "
                  value={level}
                  id={`carers-${level}`}
                />
                <Label
                  htmlFor={`carers-${level}`}
                  className="font-normal cursor-pointer"
                >
                  {level}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="space-y-3">
          <Label className="text-base font-semibold">
            Did the event improve your understanding of Novel Care services?
          </Label>
          <RadioGroup
            onValueChange={(value) => setValue('improvedUnderstanding', value)}
            className="space-y-2"
          >
            {['Significantly', 'Moderately', 'Slightly', 'Not at all'].map(
              (level) => (
                <div key={level} className="flex items-center space-x-2">
                  <RadioGroupItem
                    className="
    border-gray-300
    data-[state=checked]:border-[#E67817]
    data-[state=checked]:bg-[#E67817]
    text-[#E67817]
  "
                    value={level}
                    id={`improved-${level}`}
                  />
                  <Label
                    htmlFor={`improved-${level}`}
                    className="font-normal cursor-pointer"
                  >
                    {level}
                  </Label>
                </div>
              ),
            )}
          </RadioGroup>
        </div>
      </div>

      {/* Participant Information Section */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-[#4E4D4D] border-b pb-2">
          Participant Information
        </h3>

        <div className="space-y-3">
          <Label className="text-base font-semibold">
            Are you currently on the NDIS?
          </Label>
          <RadioGroup
            onValueChange={(value) => setValue('onNDIS', value)}
            className="flex gap-6"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                className="
    border-gray-300
    data-[state=checked]:border-[#E67817]
    data-[state=checked]:bg-[#E67817]
    text-[#E67817]
  "
                value="Yes"
                id="ndis-yes"
              />
              <Label htmlFor="ndis-yes" className="font-normal cursor-pointer">
                Yes
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                className="
    border-gray-300
    data-[state=checked]:border-[#E67817]
    data-[state=checked]:bg-[#E67817]
    text-[#E67817]
  "
                value="No"
                id="ndis-no"
              />
              <Label htmlFor="ndis-no" className="font-normal cursor-pointer">
                No
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-3">
          <Label className="text-base font-semibold">
            Who are you taking care of?
          </Label>
          <RadioGroup
            onValueChange={(value) => setValue('takingCareOf', value)}
            className="space-y-2"
          >
            {['Child', 'Adult', 'Family member', 'Client', 'Other'].map(
              (type) => (
                <div key={type} className="flex items-center space-x-2">
                  <RadioGroupItem
                    className="
    border-gray-300
    data-[state=checked]:border-[#E67817]
    data-[state=checked]:bg-[#E67817]
    text-[#E67817]
  "
                    value={type}
                    id={`care-${type}`}
                  />
                  <Label
                    htmlFor={`care-${type}`}
                    className="font-normal cursor-pointer"
                  >
                    {type}
                  </Label>
                </div>
              ),
            )}
          </RadioGroup>
        </div>

        {takingCareOf === 'Other' && (
          <div className="space-y-3">
            <Label htmlFor="takingCareOfOther">Please specify:</Label>
            <Input
              id="takingCareOfOther"
              {...register('takingCareOfOther')}
              placeholder="Please specify..."
            />
          </div>
        )}
      </div>

      {/* Additional Comments Section */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-[#4E4D4D] border-b pb-2">
          Additional Comments
        </h3>

        <div className="space-y-3">
          <Label
            htmlFor="additionalComments"
            className="text-base font-semibold"
          >
            Do you have any other feedback or suggestions?
          </Label>
          <Textarea
            id="additionalComments"
            {...register('additionalComments')}
            placeholder="Share your thoughts, suggestions, or any other comments..."
            className="min-h-[120px] resize-none"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#E67817]  hover:bg-[#d16c14] text-white py-6 text-lg font-semibold"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Submitting...
            </>
          ) : (
            'Submit Feedback'
          )}
        </Button>
      </div>
    </form>
  );
}
