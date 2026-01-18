import { Asset } from 'contentful';

/**
 * Safely extract image URL from Contentful Asset
 */
// export function getImageUrl(
//   asset: Asset | undefined,
//   fallback: string = '/hero.webp',
// ): string {
//   if (!asset?.fields?.file?.url) {
//     return fallback;
//   }

//   const url = asset.fields.file.url;
//   return url.startsWith('//') ? `https:${url}` : url;
// }

// export function getImageUrl(
//   asset: Asset | undefined,
//   fallback: string = '/hero.webp',
// ): string {
//   const url = asset?.fields?.file?.url as string | undefined;
//   if (!url) return fallback;

//   return url.startsWith('//') ? `https:${url}` : url;
// }

// /**
//  * Get image dimensions from Contentful Asset
//  */
// // export function getImageDimensions(
// //   asset: Asset | undefined,
// // ): { width: number; height: number } | null {
// //   if (!asset?.fields?.file?.details?.image) {
// //     return null;
// //   }

// //   return {
// //     width: asset.fields.file.details.image.width,
// //     height: asset.fields.file.details.image.height,
// //   };
// // }

// export function getImageDimensions(
//   asset: Asset | undefined,
// ): { width: number; height: number } | null {
//   const img = (asset?.fields?.file?.details as any)?.image;
//   if (!img) return null;

//   return { width: img.width, height: img.height };
// }

interface PartialAsset {
  fields?: {
    file?: {
      url?: string;
      details?: { image?: { width: number; height: number } };
    };
  };
}

export function getImageUrl(
  asset: PartialAsset | undefined,
  fallback = '/hero.webp',
) {
  const url = asset?.fields?.file?.url;
  if (!url) return fallback;
  return url.startsWith('//') ? `https:${url}` : url;
}

export function getImageDimensions(asset: PartialAsset | undefined) {
  const img = asset?.fields?.file?.details?.image;
  if (!img) return null;
  return { width: img.width, height: img.height };
}
