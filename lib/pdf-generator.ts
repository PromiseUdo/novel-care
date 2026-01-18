// import jsPDF from 'jspdf';
// import { format } from 'date-fns';

// interface EventPDFParams {
//   title: string;
//   description: string;
//   startDate: string;
//   endDate: string;
//   location: string;
//   organizer: string;
//   qrCodeDataUrl: string;
//   feedbackUrl: string;
//   eventUrl: string;
//   imageUrl: string;
// }

// async function getImageData(
//   url: string,
// ): Promise<{ dataUrl: string; width: number; height: number }> {
//   const response = await fetch(url, { mode: 'cors' });
//   if (!response.ok) throw new Error(`Failed to fetch image`);
//   const blob = await response.blob();
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.onload = () => {
//       const dataUrl = reader.result as string;
//       const img = new Image();
//       img.onload = () =>
//         resolve({ dataUrl, width: img.width, height: img.height });
//       img.onerror = reject;
//       img.src = dataUrl;
//     };
//     reader.readAsDataURL(blob);
//   });
// }

// export async function generateEventPDF(params: EventPDFParams): Promise<Blob> {
//   const {
//     title,
//     description,
//     startDate,
//     endDate,
//     location,
//     organizer,
//     qrCodeDataUrl,
//     feedbackUrl,
//     eventUrl,
//     imageUrl,
//   } = params;

//   const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
//   const pageWidth = 210;
//   const pageHeight = 297;
//   const margin = 15;
//   const contentWidth = pageWidth - margin * 2;

//   const primaryColor = [230, 120, 23] as const;
//   const darkText = [30, 30, 30] as const;
//   const secondaryGray = [120, 120, 120] as const;

//   // --- 1. HERO HEADER (CENTER-CROP) ---
//   const headerHeight = 85;
//   try {
//     const img = await getImageData(imageUrl);
//     const canvasRatio = pageWidth / headerHeight;
//     const imgRatio = img.width / img.height;

//     let sx, sy, sw, sh;
//     if (imgRatio > canvasRatio) {
//       sh = img.height;
//       sw = img.height * canvasRatio;
//       sx = (img.width - sw) / 2;
//       sy = 0;
//     } else {
//       sw = img.width;
//       sh = img.width / canvasRatio;
//       sx = 0;
//       sy = (img.height - sh) / 2;
//     }

//     const canvas = document.createElement('canvas');
//     canvas.width = sw;
//     canvas.height = sh;
//     const ctx = canvas.getContext('2d');
//     const tempImg = new Image();
//     tempImg.src = img.dataUrl;
//     await new Promise((r) => (tempImg.onload = r));
//     ctx?.drawImage(tempImg, sx, sy, sw, sh, 0, 0, sw, sh);
//     doc.addImage(
//       canvas.toDataURL('image/jpeg'),
//       'JPEG',
//       0,
//       0,
//       pageWidth,
//       headerHeight,
//     );

//     // Gradient overlay
//     doc.setFillColor(0, 0, 0);
//     doc.setGState(new (doc as any).GState({ opacity: 0.75 }));
//     doc.rect(0, 0, pageWidth, headerHeight, 'F');
//     doc.setGState(new (doc as any).GState({ opacity: 1.0 }));
//   } catch (e) {
//     doc.setFillColor(...primaryColor);
//     doc.rect(0, 0, pageWidth, headerHeight, 'F');
//   }

//   // --- 2. LOGO & TITLE ---
//   try {
//     // Logo Placement (Top Left)
//     const logoData = await getImageData('/logo.png');
//     const logoWidth = 25;
//     const logoHeight = (logoData.height * logoWidth) / logoData.width;
//     doc.addImage(logoData.dataUrl, 'PNG', margin, 10, logoWidth, logoHeight);
//   } catch (e) {
//     console.warn('Logo not found at /logo.png');
//   }

//   doc.setTextColor(255, 255, 255);
//   doc.setFont('helvetica', 'bold');
//   doc.setFontSize(26);
//   const titleLines = doc.splitTextToSize(title.toUpperCase(), contentWidth);
//   doc.text(titleLines, margin, headerHeight - 20);

//   // --- 2. IMPROVED INFO BAR (NO TRUNCATION) ---
//   let currentY = headerHeight + 10;

//   // Dynamic height calculation for Location
//   const colWidth = (contentWidth - 10) / 3;
//   doc.setFontSize(9);
//   const locLines = doc.splitTextToSize(location, colWidth);
//   const infoBarHeight = Math.max(22, 12 + locLines.length * 5);

//   doc.setFillColor(245, 245, 245);
//   doc.roundedRect(margin, currentY, contentWidth, infoBarHeight, 1, 1, 'F');

//   // Date
//   doc.setTextColor(...primaryColor);
//   doc.setFont('helvetica', 'bold');
//   doc.text('DATE', margin + 5, currentY + 7);
//   doc.setTextColor(...darkText);
//   doc.setFont('helvetica', 'normal');
//   doc.text(
//     format(new Date(startDate), 'MMM dd, yyyy'),
//     margin + 5,
//     currentY + 13,
//   );

//   // Time
//   doc.setTextColor(...primaryColor);
//   doc.setFont('helvetica', 'bold');
//   doc.text('TIME', margin + colWidth + 5, currentY + 7);
//   doc.setTextColor(...darkText);
//   doc.setFont('helvetica', 'normal');
//   doc.text(
//     `${format(new Date(startDate), 'h:mm a')} - ${format(new Date(endDate), 'h:mm a')}`,
//     margin + colWidth + 5,
//     currentY + 13,
//   );

//   // Location (Multi-line)
//   doc.setTextColor(...primaryColor);
//   doc.setFont('helvetica', 'bold');
//   doc.text('LOCATION', margin + colWidth * 2 + 5, currentY + 7);
//   doc.setTextColor(...darkText);
//   doc.setFont('helvetica', 'normal');
//   doc.text(locLines, margin + colWidth * 2 + 5, currentY + 13);

//   currentY += infoBarHeight + 15;

//   // --- 4. DESCRIPTION ---
//   doc.setFontSize(14);
//   doc.setFont('helvetica', 'bold');
//   doc.setTextColor(...primaryColor);
//   doc.text('ABOUT THIS EVENT', margin, currentY);

//   currentY += 8;
//   doc.setFont('helvetica', 'normal');
//   doc.setFontSize(10.5);
//   doc.setTextColor(60, 60, 60);
//   const descLines = doc.splitTextToSize(description, contentWidth);
//   doc.text(descLines, margin, currentY, { lineHeightFactor: 1.6 });

//   // --- 5. PREMIUM LIGHT FOOTER (Restored) ---
//   const footerHeight = 45;
//   const footerY = pageHeight - footerHeight;

//   // Light gray background & top border
//   doc.setFillColor(250, 250, 250);
//   doc.rect(0, footerY, pageWidth, footerHeight, 'F');
//   doc.setFillColor(...primaryColor);
//   doc.rect(0, footerY, pageWidth, 0.8, 'F');

//   // Organizer Info
//   doc.setFontSize(8);
//   doc.setTextColor(...secondaryGray);
//   doc.text('ORGANIZED BY', margin, footerY + 12);
//   doc.setFontSize(11);
//   doc.setFont('helvetica', 'bold');
//   doc.setTextColor(...darkText);
//   doc.text(organizer, margin, footerY + 18);

//   // Feedback Text
//   doc.setFontSize(10);
//   doc.text('SHARE YOUR FEEDBACK', margin, footerY + 30);
//   doc.setFont('helvetica', 'normal');
//   doc.setFontSize(8);
//   doc.setTextColor(...primaryColor);
//   doc.text(feedbackUrl, margin, footerY + 36);

//   // QR Code on right
//   const qrSize = 28;
//   const qrX = pageWidth - margin - qrSize;
//   doc.setFillColor(255, 255, 255);
//   doc.roundedRect(qrX - 2, footerY + 8, qrSize + 4, qrSize + 4, 1, 1, 'F');
//   doc.addImage(qrCodeDataUrl, 'PNG', qrX, footerY + 10, qrSize, qrSize);

//   doc.setFontSize(7);
//   doc.setTextColor(...secondaryGray);
//   doc.text('SCAN TO GIVE FEEDBACK', qrX + qrSize / 2, footerY + 42, {
//     align: 'center',
//   });

//   return doc.output('blob');
// }

import jsPDF from 'jspdf';
import { format } from 'date-fns';

interface EventPDFParams {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  organizer: string;
  qrCodeDataUrl: string;
  feedbackUrl: string;
  eventUrl: string;
  imageUrl: string;
}

async function getImageData(
  url: string,
): Promise<{ dataUrl: string; width: number; height: number }> {
  const response = await fetch(url, { mode: 'cors' });
  if (!response.ok) throw new Error(`Failed to fetch image`);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      const img = new Image();
      img.onload = () =>
        resolve({ dataUrl, width: img.width, height: img.height });
      img.onerror = reject;
      img.src = dataUrl;
    };
    reader.readAsDataURL(blob);
  });
}

export async function generateEventPDF(params: EventPDFParams): Promise<Blob> {
  const {
    title,
    startDate,
    endDate,
    location,
    organizer,
    qrCodeDataUrl,
    feedbackUrl,
    eventUrl,
  } = params;

  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 15;
  const contentWidth = pageWidth - margin * 2;

  const primaryColor = [230, 120, 23] as const;
  const headerBackground = [245, 239, 234] as const;
  const darkText = [30, 30, 30] as const;
  const whiteText = [255, 255, 255] as const;
  const secondaryGray = [120, 120, 120] as const;

  // --- 1. MINIMAL SOLID HEADER ---
  const headerHeight = 50; // Reduced height
  doc.setFillColor(...headerBackground);
  doc.rect(0, 0, pageWidth, headerHeight, 'F');

  // Logo
  try {
    const logoData = await getImageData('/logo.png');
    const logoWidth = 25;
    const logoHeight = (logoData.height * logoWidth) / logoData.width;
    doc.addImage(logoData.dataUrl, 'PNG', margin, 10, logoWidth, logoHeight);
  } catch (e) {
    console.warn('Logo not found');
  }

  // Title
  doc.setTextColor(78, 77, 77);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  const titleLines = doc.splitTextToSize(title.toUpperCase(), contentWidth);
  doc.text(titleLines, margin, 38);

  // --- 2. QUICK INFO BAR ---
  // let currentY = headerHeight + 10;
  // const colWidth = (contentWidth - 10) / 3;
  // const locLines = doc.splitTextToSize(location, colWidth);
  // const infoBarHeight = Math.max(22, 12 + locLines.length * 5);

  // doc.setFillColor(245, 245, 245);
  // doc.roundedRect(margin, currentY, contentWidth, infoBarHeight, 1, 1, 'F');

  // const drawCol = (label: string, value: string | string[], x: number) => {
  //   doc.setFont('helvetica', 'bold');
  //   doc.setFontSize(8);
  //   doc.setTextColor(...primaryColor);
  //   doc.text(label, x, currentY + 7);
  //   doc.setFont('helvetica', 'normal');
  //   doc.setFontSize(9);
  //   doc.setTextColor(...darkText);
  //   doc.text(value, x, currentY + 13);
  // };

  // drawCol('DATE', format(new Date(startDate), 'MMM dd, yyyy'), margin + 5);
  // drawCol(
  //   'TIME',
  //   `${format(new Date(startDate), 'h:mm a')} - ${format(new Date(endDate), 'h:mm a')}`,
  //   margin + colWidth + 5,
  // );
  // drawCol('LOCATION', locLines, margin + colWidth * 2 + 5);

  // // --- 3. THE HIGHLIGHT: CENTRAL QR CODE ---
  // currentY += infoBarHeight + 25;

  let currentY = headerHeight + 10;

  // Dynamic height calculation for Location
  const colWidth = (contentWidth - 10) / 3;
  doc.setFontSize(9);
  const locLines = doc.splitTextToSize(location, colWidth);
  const infoBarHeight = Math.max(22, 12 + locLines.length * 5);

  doc.setFillColor(245, 245, 245);
  doc.roundedRect(margin, currentY, contentWidth, infoBarHeight, 1, 1, 'F');

  // Date
  doc.setTextColor(...primaryColor);
  doc.setFont('helvetica', 'bold');
  doc.text('DATE', margin + 5, currentY + 7);
  doc.setTextColor(...darkText);
  doc.setFont('helvetica', 'normal');
  doc.text(
    format(new Date(startDate), 'MMM dd, yyyy'),
    margin + 5,
    currentY + 13,
  );

  // Time
  doc.setTextColor(...primaryColor);
  doc.setFont('helvetica', 'bold');
  doc.text('TIME', margin + colWidth + 5, currentY + 7);
  doc.setTextColor(...darkText);
  doc.setFont('helvetica', 'normal');
  doc.text(
    `${format(new Date(startDate), 'h:mm a')} - ${format(new Date(endDate), 'h:mm a')}`,
    margin + colWidth + 5,
    currentY + 13,
  );

  // Location (Multi-line)
  doc.setTextColor(...primaryColor);
  doc.setFont('helvetica', 'bold');
  doc.text('LOCATION', margin + colWidth * 2 + 5, currentY + 7);
  doc.setTextColor(...darkText);
  doc.setFont('helvetica', 'normal');
  doc.text(locLines, margin + colWidth * 2 + 5, currentY + 13);

  currentY += infoBarHeight + 25;

  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...darkText);
  doc.text('WE VALUE YOUR FEEDBACK', pageWidth / 2, currentY, {
    align: 'center',
  });

  currentY += 10;
  const centralQRSize = 80; // Large size for highlight
  const qrX = (pageWidth - centralQRSize) / 2;

  // Subtle border/frame for QR
  doc.setDrawColor(230, 230, 230);
  doc.setLineWidth(0.5);
  doc.roundedRect(
    qrX - 5,
    currentY - 5,
    centralQRSize + 10,
    centralQRSize + 10,
    2,
    2,
    'S',
  );

  doc.addImage(
    qrCodeDataUrl,
    'PNG',
    qrX,
    currentY,
    centralQRSize,
    centralQRSize,
  );

  currentY += centralQRSize + 15;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...secondaryGray);
  doc.text(
    'Scan the code above to share your thoughts about the event',
    pageWidth / 2,
    currentY,
    { align: 'center' },
  );

  // --- 4. EVENT LINK SECTION ---
  currentY += 15;
  doc.setFillColor(230, 120, 23, 0.1); // Very light orange tint
  doc.rect(margin, currentY, contentWidth, 15, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...whiteText);
  doc.text('View Full Event Details:', margin + 5, currentY + 9);

  doc.setTextColor(...primaryColor);
  doc.textWithLink(eventUrl, margin + 55, currentY + 9, { url: eventUrl });

  // --- 5. FOOTER (UNTOUCHED) ---
  const footerHeight = 45;
  const footerY = pageHeight - footerHeight;
  doc.setFillColor(250, 250, 250);
  doc.rect(0, footerY, pageWidth, footerHeight, 'F');
  doc.setFillColor(...primaryColor);
  doc.rect(0, footerY, pageWidth, 0.8, 'F');
  doc.setFontSize(8);
  doc.setTextColor(...secondaryGray);
  doc.text('ORGANIZED BY', margin, footerY + 12);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...darkText);
  doc.text(organizer, margin, footerY + 18);
  doc.setFontSize(10);
  doc.text('SHARE YOUR FEEDBACK', margin, footerY + 30);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...primaryColor);
  doc.text(feedbackUrl, margin, footerY + 36);
  const footerQrSize = 28;
  const footerQrX = pageWidth - margin - footerQrSize;
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(
    footerQrX - 2,
    footerY + 8,
    footerQrSize + 4,
    footerQrSize + 4,
    1,
    1,
    'F',
  );
  doc.addImage(
    qrCodeDataUrl,
    'PNG',
    footerQrX,
    footerY + 10,
    footerQrSize,
    footerQrSize,
  );
  doc.setFontSize(7);
  doc.setTextColor(...secondaryGray);
  doc.text(
    'SCAN TO GIVE FEEDBACK',
    footerQrX + footerQrSize / 2,
    footerY + 42,
    { align: 'center' },
  );

  return doc.output('blob');
}
