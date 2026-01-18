'use client';

import { Event } from '@/types/event-types';
import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import {
  Calendar,
  MapPin,
  User,
  Download,
  Share2,
  ArrowLeft,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import MaxWidthWrapper from '@/components/max-width-wrapper';
import { useState } from 'react';
import { generateQRCode } from '@/lib/qr-code';
import { generateEventPDF } from '@/lib/pdf-generator';
import { getImageUrl } from '@/lib/contentful-helpers';
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon,
} from 'react-share';

interface EventDetailContentProps {
  event: Event;
}

import { Asset, UnresolvedLink } from 'contentful';
import FeedbackDisplay from './feedback-display';

function isResolvedAsset(
  asset: Asset | UnresolvedLink<'Asset'> | undefined,
): asset is Asset {
  return !!(asset as Asset)?.fields?.file;
}

export default function EventDetailContent({ event }: EventDetailContentProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const {
    title,
    slug,
    description,
    startDate,
    endDate,
    location,
    featuredImage,
    category,
    organizer,
  } = event.fields;

  const eventId = event.sys.id;

  const imageUrl = isResolvedAsset(featuredImage)
    ? getImageUrl(featuredImage)
    : getImageUrl(undefined);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareTitle = `${title} - Novel Care Services`;

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    try {
      const feedbackUrl = `${window.location.origin}/events/${slug}/feedback`;
      const qrCodeDataUrl = await generateQRCode(feedbackUrl);

      const pdfBlob = await generateEventPDF({
        title,
        description,
        startDate,
        endDate,
        location,
        organizer: organizer || 'Novel Care Services',
        qrCodeDataUrl,
        feedbackUrl,
        imageUrl,
      });

      const url = URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${slug}-event-details.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading PDF:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <main className="min-h-screen ">
      {/* Hero Image Section */}
      <div className="relative h-64 sm:h-80 md:h-96 bg-gray-900">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover opacity-90"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {category && (
          <div className="absolute top-6 left-6 bg-[#E67817] text-white px-4 py-2 rounded-full text-sm font-semibold">
            {category}
          </div>
        )}
      </div>

      <MaxWidthWrapper className="py-8 sm:py-12">
        <Link
          href="/events"
          className="inline-flex items-center gap-2 text-[#E67817] hover:text-[#d16c14] mb-6 font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Events
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title and Description */}
            <div className="bg-white rounded-lg p-6 sm:p-8 shadow-sm border border-gray-100">
              <h1 className="text-3xl sm:text-4xl font-bold text-[#4E4D4D] mb-6">
                {title}
              </h1>

              <div className="prose prose-lg max-w-none text-gray-700 whitespace-pre-wrap">
                {description}
              </div>
            </div>

            {/* Feedbacks */}
            <FeedbackDisplay eventId={eventId} />

            {/* Feedback CTA */}
            <div className=" bg-[#E67817]/10 backdrop-blur-md border border-white/20   rounded-lg p-6 sm:p-8  ">
              <h2 className="text-2xl font-bold text-[#4E4D4D] mb-3">
                Share Your Experience
              </h2>
              <p className="text-gray-700 mb-6">
                We value your feedback! Help us improve future events by sharing
                your thoughts and experiences.
              </p>
              <Link href={`/events/${slug}/feedback`}>
                <Button className="bg-[#E67817]  hover:bg-[#d16c14] text-white">
                  Provide Feedback
                </Button>
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6 ">
            {/* Event Details Card */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 sticky top-[6.5rem]">
              <h2 className="text-xl font-bold text-[#4E4D4D] mb-6">
                Event Details
              </h2>

              <div className="space-y-5">
                {/* Date and Time */}
                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-[#E67817]/10 backdrop-blur-md border border-white/20 rounded-lg flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-[#E67817]" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-500 mb-1">Date & Time</p>
                    <p className="font-semibold text-gray-900">
                      {format(new Date(startDate), 'MMMM dd, yyyy')}
                    </p>
                    <p className="text-sm text-gray-600">
                      {format(new Date(startDate), 'h:mm a')} -{' '}
                      {format(new Date(endDate), 'h:mm a')}
                    </p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-[#E67817]/10 backdrop-blur-md border border-white/20 rounded-lg flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-[#E67817]" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-500 mb-1">Location</p>
                    <p className="font-semibold text-gray-900 break-words">
                      {location}
                    </p>
                  </div>
                </div>

                {/* Organizer */}
                {organizer && (
                  <div className="flex gap-3">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-[#E67817]/10 backdrop-blur-md border border-white/20 rounded-lg flex items-center justify-center">
                        <User className="w-5 h-5 text-[#E67817]" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-500 mb-1">Organizer</p>
                      <p className="font-semibold text-gray-900">{organizer}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-6 space-y-3">
                <Button
                  onClick={handleDownloadPDF}
                  disabled={isDownloading}
                  className="w-full bg-[#E67817]  hover:bg-[#d16c14] text-white"
                >
                  <Download className="w-4 h-4 mr-2" />
                  {isDownloading
                    ? 'Generating PDF...'
                    : 'Download Event Details'}
                </Button>

                <div className="relative">
                  <Button
                    variant="outline"
                    onClick={() => setShowShareMenu(!showShareMenu)}
                    className="w-full border-[#E67817] text-[#E67817] hover:text-[#d16c14] hover:[#E67817]/10"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Share Event
                  </Button>

                  {showShareMenu && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-10">
                      <p className="text-sm font-semibold text-gray-700 mb-3">
                        Share on:
                      </p>
                      <div className="flex gap-2 justify-center">
                        <FacebookShareButton url={shareUrl} title={shareTitle}>
                          <FacebookIcon size={40} round />
                        </FacebookShareButton>

                        <TwitterShareButton url={shareUrl} title={shareTitle}>
                          <TwitterIcon size={40} round />
                        </TwitterShareButton>

                        <LinkedinShareButton url={shareUrl} title={shareTitle}>
                          <LinkedinIcon size={40} round />
                        </LinkedinShareButton>

                        <WhatsappShareButton url={shareUrl} title={shareTitle}>
                          <WhatsappIcon size={40} round />
                        </WhatsappShareButton>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </main>
  );
}
