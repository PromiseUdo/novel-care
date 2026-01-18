'use client';

import { Event } from '@/types/event-types';
import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, MapPin, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { generateQRCode } from '@/lib/qr-code';
import { generateEventPDF } from '@/lib/pdf-generator';
import { getImageUrl } from '@/lib/contentful-helpers';
import { Loader2 } from 'lucide-react';

interface EventCardProps {
  event: Event;
}

import { Asset, UnresolvedLink } from 'contentful';

function isResolvedAsset(
  asset: Asset | UnresolvedLink<'Asset'> | undefined,
): asset is Asset {
  return !!(asset as Asset)?.fields?.file;
}

export default function EventCard({ event }: EventCardProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const {
    title,
    slug,
    description,
    startDate,
    endDate,
    location,
    featuredImage,
    category,
  } = event.fields;

  // const imageUrl = getImageUrl(featuredImage);

  const imageUrl = isResolvedAsset(featuredImage)
    ? getImageUrl(featuredImage)
    : getImageUrl(undefined);

  const handleDownloadPDF = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

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
        organizer: event.fields.organizer || 'Novel Care Services',
        qrCodeDataUrl,
        feedbackUrl,
        imageUrl,
      });

      // Create download link
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
    <div className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
      <Link href={`/events/${slug}`}>
        <div className="relative h-48 sm:h-56 overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {category && (
            <div className="absolute top-4 left-4 bg-[#E67817] text-white px-3 py-1 rounded-full text-xs font-semibold">
              {category}
            </div>
          )}
        </div>
      </Link>

      <div className="p-5 sm:p-6">
        <Link href={`/events/${slug}`}>
          <h3 className="text-xl font-bold text-[#4E4D4D] mb-3 hover:text-[#E67817] transition-colors line-clamp-2">
            {title}
          </h3>
        </Link>

        <div className="space-y-2 mb-4">
          <div className="flex items-start gap-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium">
                {format(new Date(startDate), 'MMMM dd, yyyy')}
              </p>
              <p className="text-xs text-gray-500">
                {format(new Date(startDate), 'h:mm a')} -{' '}
                {format(new Date(endDate), 'h:mm a')}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <p className="line-clamp-1">{location}</p>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{description}</p>

        <div className="flex flex-col sm:flex-row gap-2">
          <Link href={`/events/${slug}`} className="flex-1">
            <Button className="w-full bg-[#E67817]  hover:bg-[#d16c14] text-white">
              View Details
            </Button>
          </Link>

          <Button
            variant="outline"
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className="flex items-center gap-2 border-[#E67817] text-[#E67817]  hover:text-[#d16c14] w-20 hover:[#E67817]/10"
          >
            {/* {isDownloading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Download className="w-4 h-4" />
            )}
            {isDownloading ? 'Generating' : 'PDF'} */}

            <Download className="w-4 h-4" />
            <p>PDF</p>
          </Button>
        </div>
      </div>
    </div>
  );
}
