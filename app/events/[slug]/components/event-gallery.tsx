// 'use client';

// import { useState, useEffect } from 'react';
// import Image from 'next/image';
// import { X, Play, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
// import { Asset } from 'contentful';
// import { createPortal } from 'react-dom';

// interface EventGalleryProps {
//   gallery: Asset[];
// }

// interface GalleryItem {
//   id: string;
//   title: string;
//   description: string;
//   imageUrl: string;
//   isVideo: boolean;
//   videoUrl?: string;
//   width: number;
//   height: number;
// }

// function getLocalizedString(
//   field: string | { [key: string]: string | undefined } | undefined,
//   fallback = '',
// ): string {
//   if (!field) return fallback;
//   if (typeof field === 'string') return field;
//   return Object.values(field)[0] ?? fallback;
// }

// function hasImageDetails(asset: Asset): asset is Asset & {
//   fields: {
//     file: {
//       details: {
//         image: {
//           width: number;
//           height: number;
//         };
//       };
//     };
//   };
// } {
//   return Boolean(
//     asset.fields.file?.details && 'image' in asset.fields.file.details,
//   );
// }

// export default function EventGallery({ gallery }: EventGalleryProps) {
//   const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

//   const galleryItems: GalleryItem[] = gallery.map((asset) => {
//     const title = getLocalizedString(asset.fields.title, 'Event Photo');
//     const description = getLocalizedString(asset.fields.description, '');

//     const imageUrl = asset.fields.file?.url
//       ? `https:${asset.fields.file.url}`
//       : '';

//     const youtubeRegex =
//       /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

//     const match = description.match(youtubeRegex);
//     const isVideo = !!match;
//     const videoId = match?.[1];

//     const dimensions = hasImageDetails(asset)
//       ? asset.fields.file.details.image
//       : { width: 800, height: 600 };

//     return {
//       id: asset.sys.id,
//       title,
//       description,
//       imageUrl,
//       isVideo,
//       videoUrl: videoId
//         ? `https://www.youtube.com/embed/${videoId}`
//         : undefined,
//       width: dimensions.width,
//       height: dimensions.height,
//     };
//   });

//   if (galleryItems.length === 0) return null;

//   const selectedItem =
//     selectedIndex !== null ? galleryItems[selectedIndex] : null;

//   const openLightbox = (index: number) => {
//     setSelectedIndex(index);
//     document.body.style.overflow = 'hidden';
//   };

//   const closeLightbox = () => {
//     setSelectedIndex(null);
//     document.body.style.overflow = 'unset';
//   };

//   const showPrev = () => {
//     setSelectedIndex((prev) =>
//       prev === null
//         ? null
//         : (prev - 1 + galleryItems.length) % galleryItems.length,
//     );
//   };

//   const showNext = () => {
//     setSelectedIndex((prev) =>
//       prev === null ? null : (prev + 1) % galleryItems.length,
//     );
//   };

//   useEffect(() => {
//     if (selectedIndex === null) return;

//     const handleKeyDown = (e: KeyboardEvent) => {
//       if (e.key === 'Escape') closeLightbox();
//       if (e.key === 'ArrowLeft') showPrev();
//       if (e.key === 'ArrowRight') showNext();
//     };

//     window.addEventListener('keydown', handleKeyDown);
//     return () => window.removeEventListener('keydown', handleKeyDown);
//   }, [selectedIndex]);

//   return (
//     <>
//       <div className="bg-white rounded-lg p-6 sm:p-8 shadow-sm border border-gray-100">
//         <h2 className="text-2xl font-bold text-[#4E4D4D] mb-6">
//           Event Gallery
//         </h2>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//           {galleryItems.map((item, index) => (
//             <div
//               key={item.id}
//               className="group relative aspect-video overflow-hidden rounded-lg cursor-pointer border border-gray-200 hover:border-[#E67817] transition-all"
//               onClick={() => openLightbox(index)}
//             >
//               <Image
//                 src={item.imageUrl}
//                 alt={item.title}
//                 fill
//                 className="object-cover group-hover:scale-105 transition-transform duration-300"
//                 sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
//               />

//               <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
//                 <div className="absolute bottom-0 left-0 right-0 p-4">
//                   <p className="text-white font-semibold text-sm line-clamp-2">
//                     {item.title}
//                   </p>
//                 </div>
//               </div>

//               {item.isVideo && (
//                 <div className="absolute inset-0 flex items-center justify-center">
//                   <div className="w-12 h-12 bg-[#E67817] rounded-full flex items-center justify-center shadow-lg">
//                     <Play className="w-6 h-6 text-white fill-white ml-1" />
//                   </div>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>

//       {selectedItem &&
//         createPortal(
//           <div
//             className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
//             onClick={closeLightbox}
//           >
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 showPrev();
//               }}
//               className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center"
//             >
//               <ChevronLeft />
//             </button>

//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 showNext();
//               }}
//               className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center"
//             >
//               <ChevronRight />
//             </button>

//             <button
//               onClick={closeLightbox}
//               className="absolute top-4 right-4 text-white hover:text-[#E67817]"
//             >
//               <X className="w-8 h-8" />
//             </button>

//             <div
//               className="relative max-w-6xl w-full"
//               onClick={(e) => e.stopPropagation()}
//             >
//               {selectedItem.isVideo ? (
//                 <div
//                   className="relative w-full"
//                   style={{ paddingBottom: '56.25%' }}
//                 >
//                   <iframe
//                     src={selectedItem.videoUrl}
//                     className="absolute inset-0 w-full h-full rounded-lg"
//                     allowFullScreen
//                   />
//                 </div>
//               ) : (
//                 <Image
//                   src={selectedItem.imageUrl}
//                   alt={selectedItem.title}
//                   width={selectedItem.width}
//                   height={selectedItem.height}
//                   className="w-full h-auto max-h-[85vh] object-contain rounded-lg"
//                   priority
//                 />
//               )}

//               <div className="mt-4 text-center">
//                 <h3 className="text-white text-xl font-semibold mb-2">
//                   {selectedItem.title}
//                 </h3>
//                 {selectedItem.isVideo && (
//                   <a
//                     href={selectedItem.description}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="inline-flex items-center gap-2 text-[#E67817]"
//                   >
//                     <ExternalLink className="w-4 h-4" />
//                     Watch on YouTube
//                   </a>
//                 )}
//               </div>
//             </div>
//           </div>,
//           document.getElementById('modal-root')!,
//         )}
//     </>
//   );
// }

'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, Play, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { Asset } from 'contentful';
import { createPortal } from 'react-dom';

interface EventGalleryProps {
  gallery: Asset[];
  itemsPerPage?: number;
}

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  isVideo: boolean;
  videoUrl?: string;
  width: number;
  height: number;
}

function getLocalizedString(
  field: string | { [key: string]: string | undefined } | undefined,
  fallback = '',
): string {
  if (!field) return fallback;
  if (typeof field === 'string') return field;
  return Object.values(field)[0] ?? fallback;
}

function hasImageDetails(asset: Asset): asset is Asset & {
  fields: {
    file: {
      details: {
        image: {
          width: number;
          height: number;
        };
      };
    };
  };
} {
  return Boolean(
    asset.fields.file?.details && 'image' in asset.fields.file.details,
  );
}

export default function EventGallery({
  gallery,
  itemsPerPage = 9,
}: EventGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const galleryItems: GalleryItem[] = gallery.map((asset) => {
    const title = getLocalizedString(asset.fields.title, 'Event Photo');
    const description = getLocalizedString(asset.fields.description, '');

    const imageUrl = asset.fields.file?.url
      ? `https:${asset.fields.file.url}`
      : '';

    const youtubeRegex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

    const match = description.match(youtubeRegex);
    const isVideo = !!match;
    const videoId = match?.[1];

    const dimensions = hasImageDetails(asset)
      ? asset.fields.file.details.image
      : { width: 800, height: 600 };

    return {
      id: asset.sys.id,
      title,
      description,
      imageUrl,
      isVideo,
      videoUrl: videoId
        ? `https://www.youtube.com/embed/${videoId}`
        : undefined,
      width: dimensions.width,
      height: dimensions.height,
    };
  });

  if (galleryItems.length === 0) return null;

  // Pagination calculations
  const totalPages = Math.ceil(galleryItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = galleryItems.slice(startIndex, endIndex);

  const selectedItem =
    selectedIndex !== null ? galleryItems[selectedIndex] : null;

  const openLightbox = (index: number) => {
    // Calculate the actual index in the full gallery
    const actualIndex = startIndex + index;
    setSelectedIndex(actualIndex);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
    document.body.style.overflow = 'unset';
  };

  const showPrev = () => {
    setSelectedIndex((prev) =>
      prev === null
        ? null
        : (prev - 1 + galleryItems.length) % galleryItems.length,
    );
  };

  const showNext = () => {
    setSelectedIndex((prev) =>
      prev === null ? null : (prev + 1) % galleryItems.length,
    );
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
    // Scroll to gallery section
    document.getElementById('event-gallery')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex]);

  return (
    <>
      <div
        id="event-gallery"
        className="bg-white rounded-lg p-6 sm:p-8 shadow-sm border border-gray-100"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-[#4E4D4D]">Event Gallery</h2>
          <span className="text-sm text-gray-500">
            {galleryItems.length} {galleryItems.length === 1 ? 'item' : 'items'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentItems.map((item, index) => (
            <div
              key={item.id}
              className="group relative aspect-video overflow-hidden rounded-lg cursor-pointer border border-gray-200 hover:border-[#E67817] transition-all"
              onClick={() => openLightbox(index)}
            >
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white font-semibold text-sm line-clamp-2">
                    {item.title}
                  </p>
                </div>
              </div>

              {item.isVideo && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-[#E67817] rounded-full flex items-center justify-center shadow-lg">
                    <Play className="w-6 h-6 text-white fill-white ml-1" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-gray-300 hover:border-[#E67817] hover:bg-[#E67817]/10 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-gray-300 disabled:hover:bg-transparent transition-colors"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>

            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => {
                  // Show first page, last page, current page, and pages around current
                  const showPage =
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1);

                  // Show ellipsis
                  const showEllipsisBefore =
                    page === currentPage - 2 && currentPage > 3;
                  const showEllipsisAfter =
                    page === currentPage + 2 && currentPage < totalPages - 2;

                  if (!showPage && !showEllipsisBefore && !showEllipsisAfter) {
                    return null;
                  }

                  if (showEllipsisBefore || showEllipsisAfter) {
                    return (
                      <span
                        key={`ellipsis-${page}`}
                        className="px-3 py-2 text-gray-400"
                      >
                        ...
                      </span>
                    );
                  }

                  return (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      className={`min-w-[40px] px-3 py-2 rounded-lg font-medium transition-colors ${
                        currentPage === page
                          ? 'bg-[#E67817] text-white'
                          : 'border border-gray-300 hover:border-[#E67817] hover:bg-[#E67817]/10 text-gray-700'
                      }`}
                    >
                      {page}
                    </button>
                  );
                },
              )}
            </div>

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-gray-300 hover:border-[#E67817] hover:bg-[#E67817]/10 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-gray-300 disabled:hover:bg-transparent transition-colors"
              aria-label="Next page"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        )}

        {/* Page info */}
        {totalPages > 1 && (
          <p className="text-center text-sm text-gray-500 mt-4">
            Showing {startIndex + 1}-{Math.min(endIndex, galleryItems.length)}{' '}
            of {galleryItems.length}
          </p>
        )}
      </div>

      {selectedItem &&
        createPortal(
          <div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                showPrev();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center"
            >
              <ChevronLeft />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                showNext();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center"
            >
              <ChevronRight />
            </button>

            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:text-[#E67817]"
            >
              <X className="w-8 h-8" />
            </button>

            <div
              className="relative max-w-6xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {selectedItem.isVideo ? (
                <div
                  className="relative w-full"
                  style={{ paddingBottom: '56.25%' }}
                >
                  <iframe
                    src={selectedItem.videoUrl}
                    className="absolute inset-0 w-full h-full rounded-lg"
                    allowFullScreen
                  />
                </div>
              ) : (
                <Image
                  src={selectedItem.imageUrl}
                  alt={selectedItem.title}
                  width={selectedItem.width}
                  height={selectedItem.height}
                  className="w-full h-auto max-h-[85vh] object-contain rounded-lg"
                  priority
                />
              )}

              <div className="mt-4 text-center">
                <h3 className="text-white text-xl font-semibold mb-2">
                  {selectedItem.title}
                </h3>
                {selectedItem.isVideo && (
                  <a
                    href={selectedItem.description}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#E67817]"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Watch on YouTube
                  </a>
                )}
              </div>
            </div>
          </div>,
          document.getElementById('modal-root')!,
        )}
    </>
  );
}
