// import { jsPDF } from 'jspdf';
// import { format } from 'date-fns';

// interface EventPDFData {
//   title: string;
//   description: string;
//   startDate: string;
//   endDate: string;
//   location: string;
//   organizer?: string;
//   qrCodeDataUrl: string;
//   feedbackUrl: string;
// }

// export async function generateEventPDF(eventData: EventPDFData): Promise<Blob> {
//   const doc = new jsPDF({
//     orientation: 'portrait',
//     unit: 'mm',
//     format: 'a4',
//   });

//   const pageWidth = doc.internal.pageSize.getWidth();
//   const pageHeight = doc.internal.pageSize.getHeight();
//   const margin = 20;
//   const contentWidth = pageWidth - margin * 2;

//   // Colors
//   const primaryColor = '#1e40af'; // Novel Care blue
//   const textColor = '#1f2937';
//   const lightGray = '#6b7280';

//   // Header background
//   doc.setFillColor(30, 64, 175);
//   doc.rect(0, 0, pageWidth, 50, 'F');

//   // Logo/Brand (you can add logo image here if needed)
//   doc.setTextColor(255, 255, 255);
//   doc.setFontSize(24);
//   doc.setFont('helvetica', 'bold');
//   doc.text('Novel Care Services', pageWidth / 2, 25, { align: 'center' });

//   doc.setFontSize(12);
//   doc.setFont('helvetica', 'normal');
//   doc.text('Community Event', pageWidth / 2, 35, { align: 'center' });

//   // Event Title
//   doc.setTextColor(textColor);
//   doc.setFontSize(20);
//   doc.setFont('helvetica', 'bold');
//   const titleLines = doc.splitTextToSize(eventData.title, contentWidth);
//   doc.text(titleLines, margin, 65);

//   let yPos = 65 + titleLines.length * 8;

//   // Event Details Section
//   doc.setFontSize(11);
//   doc.setFont('helvetica', 'normal');
//   doc.setTextColor(lightGray);

//   // Date and Time
//   yPos += 10;
//   doc.setFont('helvetica', 'bold');
//   doc.setTextColor(textColor);
//   doc.text('📅 Date & Time', margin, yPos);

//   yPos += 6;
//   doc.setFont('helvetica', 'normal');
//   doc.setTextColor(lightGray);
//   const startDate = format(
//     new Date(eventData.startDate),
//     'MMMM dd, yyyy • h:mm a',
//   );
//   const endDate = format(new Date(eventData.endDate), 'h:mm a');
//   doc.text(`${startDate} - ${endDate}`, margin + 5, yPos);

//   // Location
//   yPos += 10;
//   doc.setFont('helvetica', 'bold');
//   doc.setTextColor(textColor);
//   doc.text('📍 Location', margin, yPos);

//   yPos += 6;
//   doc.setFont('helvetica', 'normal');
//   doc.setTextColor(lightGray);
//   const locationLines = doc.splitTextToSize(
//     eventData.location,
//     contentWidth - 5,
//   );
//   doc.text(locationLines, margin + 5, yPos);
//   yPos += locationLines.length * 5;

//   // Organizer (if provided)
//   if (eventData.organizer) {
//     yPos += 10;
//     doc.setFont('helvetica', 'bold');
//     doc.setTextColor(textColor);
//     doc.text('👤 Organizer', margin, yPos);

//     yPos += 6;
//     doc.setFont('helvetica', 'normal');
//     doc.setTextColor(lightGray);
//     doc.text(eventData.organizer, margin + 5, yPos);
//   }

//   // Description
//   yPos += 15;
//   doc.setFont('helvetica', 'bold');
//   doc.setTextColor(textColor);
//   doc.text('About This Event', margin, yPos);

//   yPos += 6;
//   doc.setFont('helvetica', 'normal');
//   doc.setTextColor(lightGray);
//   doc.setFontSize(10);
//   const descLines = doc.splitTextToSize(eventData.description, contentWidth);
//   doc.text(descLines, margin, yPos);
//   yPos += descLines.length * 5;

//   // QR Code Section
//   yPos += 15;

//   // Draw a box around QR section
//   const qrBoxHeight = 80;
//   doc.setDrawColor(200, 200, 200);
//   doc.setLineWidth(0.5);
//   doc.roundedRect(margin, yPos, contentWidth, qrBoxHeight, 3, 3);

//   // QR Code Title
//   yPos += 10;
//   doc.setFontSize(14);
//   doc.setFont('helvetica', 'bold');
//   doc.setTextColor(primaryColor);
//   doc.text('Share Your Feedback', pageWidth / 2, yPos, { align: 'center' });

//   // QR Code Image
//   yPos += 8;
//   const qrSize = 50;
//   const qrX = (pageWidth - qrSize) / 2;
//   doc.addImage(eventData.qrCodeDataUrl, 'PNG', qrX, yPos, qrSize, qrSize);

//   yPos += qrSize + 5;
//   doc.setFontSize(9);
//   doc.setFont('helvetica', 'normal');
//   doc.setTextColor(lightGray);
//   doc.text('Scan this QR code to provide your feedback', pageWidth / 2, yPos, {
//     align: 'center',
//   });

//   // Footer
//   const footerY = pageHeight - 20;
//   doc.setDrawColor(200, 200, 200);
//   doc.setLineWidth(0.3);
//   doc.line(margin, footerY - 5, pageWidth - margin, footerY - 5);

//   doc.setFontSize(8);
//   doc.setTextColor(lightGray);
//   doc.text(
//     'Novel Care Services | www.novelcareservices.com.au',
//     pageWidth / 2,
//     footerY,
//     { align: 'center' },
//   );
//   doc.text(
//     '39 Monticello Meander, Landsdale WA 6065 | 0426414430',
//     pageWidth / 2,
//     footerY + 4,
//     { align: 'center' },
//   );

//   return doc.output('blob');
// }

// import { jsPDF } from 'jspdf';
// import { format } from 'date-fns';

// interface EventPDFData {
//   title: string;
//   description: string;
//   startDate: string;
//   endDate: string;
//   location: string;
//   organizer?: string;
//   qrCodeDataUrl: string;
//   feedbackUrl: string;
//   imageUrl?: string;
// }

// export async function generateEventPDF(eventData: EventPDFData): Promise<Blob> {
//   const doc = new jsPDF({
//     orientation: 'portrait',
//     unit: 'mm',
//     format: 'a4',
//   });

//   const pageWidth = doc.internal.pageSize.getWidth();
//   const pageHeight = doc.internal.pageSize.getHeight();
//   const margin = 15;
//   const contentWidth = pageWidth - margin * 2;

//   // Color palette (using tuples for TypeScript compatibility)
//   const brandBlue: [number, number, number] = [30, 64, 175]; // #1e40af
//   const darkGray: [number, number, number] = [31, 41, 55]; // #1f2937
//   const mediumGray: [number, number, number] = [107, 114, 128]; // #6b7280
//   const lightGray: [number, number, number] = [243, 244, 246]; // #f3f4f6
//   const accentBlue: [number, number, number] = [59, 130, 246]; // #3b82f6

//   let yPos = 0;

//   // ==========================================
//   // HEADER SECTION WITH GRADIENT EFFECT
//   // ==========================================

//   // Main header background
//   doc.setFillColor(...brandBlue);
//   doc.rect(0, 0, pageWidth, 65, 'F');

//   // Accent stripe
//   doc.setFillColor(...accentBlue);
//   doc.rect(0, 60, pageWidth, 5, 'F');

//   // Logo/Brand section
//   doc.setTextColor(255, 255, 255);
//   doc.setFontSize(28);
//   doc.setFont('helvetica', 'bold');
//   doc.text('NOVEL CARE SERVICES', margin, 20);

//   // Tagline
//   doc.setFontSize(11);
//   doc.setFont('helvetica', 'normal');
//   doc.setTextColor(220, 230, 255);
//   doc.text('Empowering Lives Through Quality Care', margin, 28);

//   // Event label with icon-like element
//   doc.setFillColor(255, 255, 255);
//   doc.roundedRect(margin, 38, 45, 14, 2, 2, 'F');
//   doc.setTextColor(...brandBlue);
//   doc.setFontSize(10);
//   doc.setFont('helvetica', 'bold');
//   doc.text('📅 COMMUNITY EVENT', margin + 4, 47);

//   yPos = 75;

//   // ==========================================
//   // EVENT TITLE SECTION
//   // ==========================================

//   doc.setTextColor(...darkGray);
//   doc.setFontSize(24);
//   doc.setFont('helvetica', 'bold');

//   const titleLines = doc.splitTextToSize(eventData.title, contentWidth);
//   titleLines.forEach((line: string, index: number) => {
//     doc.text(line, margin, yPos + index * 10);
//   });

//   yPos += titleLines.length * 10 + 8;

//   // Decorative line under title
//   doc.setDrawColor(...accentBlue);
//   doc.setLineWidth(1.5);
//   doc.line(margin, yPos, margin + 60, yPos);

//   yPos += 15;

//   // ==========================================
//   // FEATURED IMAGE (if provided)
//   // ==========================================

//   if (eventData.imageUrl) {
//     try {
//       // Add image with rounded corners effect (simulated with border)
//       const imgWidth = contentWidth;
//       const imgHeight = 100;

//       // Shadow effect
//       doc.setFillColor(200, 200, 200);
//       doc.roundedRect(margin + 1, yPos + 1, imgWidth, imgHeight, 3, 3, 'F');

//       // Image
//       doc.addImage(
//         eventData.imageUrl,
//         'JPEG',
//         margin,
//         yPos,
//         imgWidth,
//         imgHeight,
//       );

//       // Border
//       doc.setDrawColor(...mediumGray);
//       doc.setLineWidth(0.3);
//       doc.roundedRect(margin, yPos, imgWidth, imgHeight, 3, 3);

//       yPos += imgHeight + 15;
//     } catch (error) {
//       console.error('Error adding image to PDF:', error);
//       // Continue without image
//     }
//   }

//   // ==========================================
//   // EVENT DETAILS CARDS
//   // ==========================================

//   // Background for details section
//   doc.setFillColor(...lightGray);
//   doc.roundedRect(margin, yPos, contentWidth, 52, 3, 3, 'F');

//   // Date & Time Card
//   const cardYStart = yPos + 5;
//   doc.setFillColor(255, 255, 255);
//   doc.roundedRect(
//     margin + 5,
//     cardYStart,
//     (contentWidth - 15) / 2,
//     42,
//     2,
//     2,
//     'F',
//   );

//   // Icon background
//   doc.setFillColor(219, 234, 254); // blue-100
//   doc.circle(margin + 15, cardYStart + 10, 6, 'F');

//   // Calendar emoji/icon
//   doc.setFontSize(16);
//   doc.text('📅', margin + 11, cardYStart + 12);

//   // Date label
//   doc.setFontSize(9);
//   doc.setFont('helvetica', 'bold');
//   doc.setTextColor(...mediumGray);
//   doc.text('DATE & TIME', margin + 25, cardYStart + 8);

//   // Date value
//   doc.setFontSize(11);
//   doc.setFont('helvetica', 'bold');
//   doc.setTextColor(...darkGray);
//   const dateStr = format(new Date(eventData.startDate), 'MMM dd, yyyy');
//   doc.text(dateStr, margin + 25, cardYStart + 16);

//   // Time value
//   doc.setFontSize(9);
//   doc.setFont('helvetica', 'normal');
//   doc.setTextColor(...mediumGray);
//   const startTime = format(new Date(eventData.startDate), 'h:mm a');
//   const endTime = format(new Date(eventData.endDate), 'h:mm a');
//   doc.text(`${startTime} - ${endTime}`, margin + 25, cardYStart + 23);

//   // Duration
//   const duration = Math.round(
//     (new Date(eventData.endDate).getTime() -
//       new Date(eventData.startDate).getTime()) /
//       (1000 * 60 * 60),
//   );
//   doc.setFontSize(8);
//   doc.setTextColor(...mediumGray);
//   doc.text(
//     `Duration: ${duration} hour${duration !== 1 ? 's' : ''}`,
//     margin + 25,
//     cardYStart + 29,
//   );

//   // Location Card
//   const locationCardX = margin + 5 + (contentWidth - 15) / 2 + 5;
//   doc.setFillColor(255, 255, 255);
//   doc.roundedRect(
//     locationCardX,
//     cardYStart,
//     (contentWidth - 15) / 2,
//     42,
//     2,
//     2,
//     'F',
//   );

//   // Icon background
//   doc.setFillColor(219, 234, 254);
//   doc.circle(locationCardX + 10, cardYStart + 10, 6, 'F');

//   // Location emoji/icon
//   doc.setFontSize(16);
//   doc.text('📍', locationCardX + 6, cardYStart + 12);

//   // Location label
//   doc.setFontSize(9);
//   doc.setFont('helvetica', 'bold');
//   doc.setTextColor(...mediumGray);
//   doc.text('LOCATION', locationCardX + 20, cardYStart + 8);

//   // Location value
//   doc.setFontSize(9);
//   doc.setFont('helvetica', 'normal');
//   doc.setTextColor(...darkGray);
//   const locationLines = doc.splitTextToSize(
//     eventData.location,
//     (contentWidth - 15) / 2 - 25,
//   );
//   locationLines.forEach((line: string, index: number) => {
//     doc.text(line, locationCardX + 20, cardYStart + 16 + index * 5);
//   });

//   yPos += 60;

//   // Organizer (if provided)
//   if (eventData.organizer) {
//     doc.setFillColor(255, 255, 255);
//     doc.roundedRect(margin, yPos, contentWidth, 16, 2, 2, 'F');

//     doc.setFontSize(16);
//     doc.text('👤', margin + 8, yPos + 11);

//     doc.setFontSize(9);
//     doc.setFont('helvetica', 'bold');
//     doc.setTextColor(...mediumGray);
//     doc.text('ORGANIZED BY', margin + 22, yPos + 8);

//     doc.setFontSize(10);
//     doc.setFont('helvetica', 'bold');
//     doc.setTextColor(...darkGray);
//     doc.text(eventData.organizer, margin + 22, yPos + 13);

//     yPos += 22;
//   }

//   // ==========================================
//   // DESCRIPTION SECTION
//   // ==========================================

//   yPos += 5;

//   // Section header
//   doc.setFillColor(...brandBlue);
//   doc.roundedRect(margin, yPos, contentWidth, 10, 1, 1, 'F');

//   doc.setFontSize(11);
//   doc.setFont('helvetica', 'bold');
//   doc.setTextColor(255, 255, 255);
//   doc.text('ABOUT THIS EVENT', margin + 5, yPos + 7);

//   yPos += 15;

//   // Description content
//   doc.setFontSize(9.5);
//   doc.setFont('helvetica', 'normal');
//   doc.setTextColor(...darkGray);
//   doc.setLineHeightFactor(1.6);

//   const descLines = doc.splitTextToSize(eventData.description, contentWidth);
//   const maxDescLines = 25; // Limit description lines
//   const displayLines = descLines.slice(0, maxDescLines);

//   displayLines.forEach((line: string, index: number) => {
//     if (yPos + index * 5 > pageHeight - 100) return; // Stop if too close to QR section
//     doc.text(line, margin, yPos + index * 5);
//   });

//   if (descLines.length > maxDescLines) {
//     yPos += displayLines.length * 5;
//     doc.setFontSize(8);
//     doc.setTextColor(...mediumGray);
//     doc.text('...continued', margin, yPos + 3);
//   }

//   // ==========================================
//   // QR CODE SECTION (Bottom)
//   // ==========================================

//   const qrSectionY = pageHeight - 85;

//   // QR Section background with gradient effect
//   doc.setFillColor(248, 250, 252); // Very light blue-gray
//   doc.roundedRect(0, qrSectionY - 5, pageWidth, 90, 0, 0, 'F');

//   // Accent line
//   doc.setDrawColor(...accentBlue);
//   doc.setLineWidth(2);
//   doc.line(0, qrSectionY - 5, pageWidth, qrSectionY - 5);

//   // QR Card
//   const qrCardWidth = 140;
//   const qrCardX = (pageWidth - qrCardWidth) / 2;
//   const qrCardY = qrSectionY + 2;

//   // Card shadow
//   doc.setFillColor(200, 200, 200);
//   doc.roundedRect(qrCardX + 1, qrCardY + 1, qrCardWidth, 62, 3, 3, 'F');

//   // Card background
//   doc.setFillColor(255, 255, 255);
//   doc.roundedRect(qrCardX, qrCardY, qrCardWidth, 62, 3, 3, 'F');

//   // Card border
//   doc.setDrawColor(...accentBlue);
//   doc.setLineWidth(0.5);
//   doc.roundedRect(qrCardX, qrCardY, qrCardWidth, 62, 3, 3);

//   // QR Code title with icon
//   doc.setFontSize(12);
//   doc.setFont('helvetica', 'bold');
//   doc.setTextColor(...brandBlue);
//   doc.text('⭐ SHARE YOUR FEEDBACK', pageWidth / 2, qrCardY + 8, {
//     align: 'center',
//   });

//   doc.setFontSize(8);
//   doc.setFont('helvetica', 'normal');
//   doc.setTextColor(...mediumGray);
//   doc.text('Scan the QR code to help us improve', pageWidth / 2, qrCardY + 14, {
//     align: 'center',
//   });

//   // QR Code
//   const qrSize = 35;
//   const qrX = (pageWidth - qrSize) / 2;
//   const qrY = qrCardY + 18;

//   // QR background
//   doc.setFillColor(255, 255, 255);
//   doc.rect(qrX - 2, qrY - 2, qrSize + 4, qrSize + 4, 'F');

//   // Add QR code
//   doc.addImage(eventData.qrCodeDataUrl, 'PNG', qrX, qrY, qrSize, qrSize);

//   // QR border
//   doc.setDrawColor(...mediumGray);
//   doc.setLineWidth(0.3);
//   doc.rect(qrX - 2, qrY - 2, qrSize + 4, qrSize + 4);

//   // Call to action
//   doc.setFontSize(7);
//   doc.setFont('helvetica', 'normal');
//   doc.setTextColor(...mediumGray);
//   doc.text(
//     'Or visit: ' +
//       eventData.feedbackUrl.replace('https://', '').replace('http://', ''),
//     pageWidth / 2,
//     qrCardY + 58,
//     { align: 'center' },
//   );

//   // ==========================================
//   // FOOTER
//   // ==========================================

//   const footerY = pageHeight - 15;

//   // Footer separator
//   doc.setDrawColor(...mediumGray);
//   doc.setLineWidth(0.2);
//   doc.line(margin, footerY, pageWidth - margin, footerY);

//   // Footer content
//   doc.setFontSize(7.5);
//   doc.setTextColor(...mediumGray);
//   doc.setFont('helvetica', 'bold');
//   doc.text('Novel Care Services', pageWidth / 2, footerY + 4, {
//     align: 'center',
//   });

//   doc.setFont('helvetica', 'normal');
//   doc.setFontSize(7);
//   doc.text(
//     '39 Monticello Meander, Landsdale WA 6065',
//     pageWidth / 2,
//     footerY + 8,
//     { align: 'center' },
//   );
//   doc.text(
//     'Phone: 0426414430 | www.novelcareservices.com.au',
//     pageWidth / 2,
//     footerY + 11.5,
//     { align: 'center' },
//   );

//   return doc.output('blob');
// }

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
//   imageUrl: string;
// }

// async function getImageData(
//   url: string,
// ): Promise<{ dataUrl: string; width: number; height: number }> {
//   const response = await fetch(url, { mode: 'cors' });
//   if (!response.ok) {
//     throw new Error(`Failed to fetch image: ${response.statusText}`);
//   }
//   const blob = await response.blob();
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.onload = () => {
//       const dataUrl = reader.result as string;
//       const img = new Image();
//       img.onload = () => {
//         resolve({ dataUrl, width: img.width, height: img.height });
//       };
//       img.onerror = reject;
//       img.src = dataUrl;
//     };
//     reader.onerror = reject;
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
//     imageUrl,
//   } = params;

//   const doc = new jsPDF({
//     orientation: 'portrait',
//     unit: 'mm',
//     format: 'a4',
//   });

//   const pageWidth = 210;
//   const pageHeight = 297;
//   const margin = 20;
//   const contentWidth = pageWidth - 2 * margin;

//   let currentY = margin;

//   // Title
//   doc.setFont('helvetica', 'bold');
//   doc.setFontSize(24);
//   doc.setTextColor(0, 0, 0);
//   const titleLines = doc.splitTextToSize(title, contentWidth);
//   doc.text(titleLines, margin, currentY);
//   currentY += 10 * titleLines.length;

//   // Event Details Section
//   doc.setFont('helvetica', 'normal');
//   doc.setFontSize(12);
//   doc.setTextColor(100, 100, 100);
//   currentY += 10;

//   // Date
//   const formattedStartDate = format(
//     new Date(startDate),
//     'MMMM dd, yyyy h:mm a',
//   );
//   const formattedEndDate = format(new Date(endDate), 'h:mm a');
//   doc.text(
//     `Date: ${formattedStartDate} - ${formattedEndDate}`,
//     margin,
//     currentY,
//   );
//   currentY += 7;

//   // Location
//   doc.text(`Location: ${location}`, margin, currentY);
//   currentY += 7;

//   // Organizer
//   doc.text(`Organizer: ${organizer}`, margin, currentY);
//   currentY += 15;

//   // Featured Image
//   try {
//     const imageData = await getImageData(imageUrl);
//     let imgWidth = contentWidth;
//     let imgHeight = imageData.height * (imgWidth / imageData.width);

//     // Check if image would exceed remaining page height; add new page if needed
//     if (currentY + imgHeight + margin > pageHeight) {
//       doc.addPage();
//       currentY = margin;
//     }

//     doc.addImage(
//       imageData.dataUrl,
//       'JPEG',
//       margin,
//       currentY,
//       imgWidth,
//       imgHeight,
//       undefined,
//       'FAST',
//     );
//     currentY += imgHeight + 15;
//   } catch (error) {
//     console.error('Error adding featured image:', error);
//     doc.text('Featured image unavailable', margin, currentY);
//     currentY += 10;
//   }

//   // Description
//   doc.setFont('helvetica', 'bold');
//   doc.setFontSize(14);
//   doc.setTextColor(0, 0, 0);
//   doc.text('Description', margin, currentY);
//   currentY += 10;

//   doc.setFont('helvetica', 'normal');
//   doc.setFontSize(12);
//   doc.setTextColor(0, 0, 0);
//   const descriptionLines = doc.splitTextToSize(description, contentWidth);
//   descriptionLines.forEach((line: string) => {
//     if (currentY + 5 > pageHeight - margin) {
//       doc.addPage();
//       currentY = margin;
//     }
//     doc.text(line, margin, currentY);
//     currentY += 5;
//   });
//   currentY += 15;

//   // QR Code Section (at the bottom or new page if needed)
//   if (currentY + 80 > pageHeight - margin) {
//     doc.addPage();
//     currentY = margin;
//   }

//   doc.setFont('helvetica', 'bold');
//   doc.setFontSize(14);
//   doc.text('Submit Feedback', margin, currentY);
//   currentY += 10;

//   doc.setFont('helvetica', 'normal');
//   doc.setFontSize(12);
//   doc.text(
//     'Scan the QR code below to provide your feedback:',
//     margin,
//     currentY,
//   );
//   currentY += 10;

//   // Add QR Code
//   const qrSize = 50; // 50mm square
//   doc.addImage(qrCodeDataUrl, 'PNG', margin, currentY, qrSize, qrSize);
//   currentY += qrSize + 5;

//   // Feedback URL as text (for accessibility)
//   doc.setTextColor(0, 102, 204); // Blue for link-like
//   doc.text(feedbackUrl, margin, currentY);

//   return doc.output('blob');
// }

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
//   imageUrl: string;
// }

// async function getImageData(
//   url: string,
// ): Promise<{ dataUrl: string; width: number; height: number }> {
//   const response = await fetch(url, { mode: 'cors' });
//   if (!response.ok)
//     throw new Error(`Failed to fetch image: ${response.statusText}`);
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
//     reader.onerror = reject;
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
//     imageUrl,
//   } = params;

//   const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
//   const pageWidth = 210;
//   const pageHeight = 297;
//   const margin = 20;
//   const contentWidth = pageWidth - margin * 2;

//   const primaryColor = [230, 120, 23] as const; // Orange
//   const darkColor = [40, 40, 40] as const; // Near black for text
//   const secondaryColor = [100, 100, 100] as const; // Gray

//   // --- 1. HERO HEADER WITH BACKGROUND IMAGE ---
//   const headerHeight = 70;
//   try {
//     const imgData = await getImageData(imageUrl);
//     // Cover the header area (Aspect fill logic)
//     doc.addImage(
//       imgData.dataUrl,
//       'JPEG',
//       0,
//       0,
//       pageWidth,
//       headerHeight,
//       undefined,
//       'FAST',
//     );

//     // Add semi-transparent dark overlay for text legibility
//     doc.setFillColor(0, 0, 0);
//     doc.setGState(new (doc as any).GState({ opacity: 0.5 }));
//     doc.rect(0, 0, pageWidth, headerHeight, 'F');
//     doc.setGState(new (doc as any).GState({ opacity: 1.0 }));
//   } catch (e) {
//     // Fallback if image fails
//     doc.setFillColor(...primaryColor);
//     doc.rect(0, 0, pageWidth, headerHeight, 'F');
//   }

//   // Title on top of Hero
//   doc.setFont('helvetica', 'bold');
//   doc.setFontSize(28);
//   doc.setTextColor(255, 255, 255);
//   const titleLines = doc.splitTextToSize(title.toUpperCase(), contentWidth);
//   doc.text(titleLines, margin, headerHeight - 20);

//   let currentY = headerHeight + 15;

//   // --- 2. INFO GRID SECTION ---
//   // Left Accent Bar
//   doc.setFillColor(...primaryColor);
//   doc.rect(margin, currentY, 1.5, 35, 'F');

//   const infoX = margin + 5;
//   doc.setTextColor(...darkColor);
//   doc.setFontSize(10);
//   doc.setFont('helvetica', 'bold');

//   const formattedDate = format(new Date(startDate), 'EEEE, MMMM dd, yyyy');
//   const formattedTime = `${format(new Date(startDate), 'h:mm a')} - ${format(new Date(endDate), 'h:mm a')}`;

//   // Rows of Info
//   const drawInfoRow = (label: string, value: string, y: number) => {
//     doc.setFont('helvetica', 'bold');
//     doc.setTextColor(...primaryColor);
//     doc.text(label, infoX, y);
//     doc.setFont('helvetica', 'normal');
//     doc.setTextColor(...darkColor);
//     doc.text(value, infoX + 25, y);
//   };

//   drawInfoRow('WHEN', formattedDate, currentY + 5);
//   drawInfoRow('TIME', formattedTime, currentY + 13);
//   drawInfoRow('WHERE', location, currentY + 21);
//   drawInfoRow('WHO', organizer, currentY + 29);

//   currentY += 45;

//   // --- 3. DESCRIPTION SECTION ---
//   doc.setFont('helvetica', 'bold');
//   doc.setFontSize(14);
//   doc.setTextColor(...darkColor);
//   doc.text('ABOUT THE EVENT', margin, currentY);

//   currentY += 8;
//   doc.setFont('helvetica', 'normal');
//   doc.setFontSize(11);
//   doc.setTextColor(...secondaryColor);

//   const descLines = doc.splitTextToSize(description, contentWidth);
//   doc.text(descLines, margin, currentY, { lineHeightFactor: 1.5 });

//   // --- 4. MODERN FOOTER ---
//   const footerHeight = 50;
//   const footerY = pageHeight - footerHeight;

//   // Footer Background
//   doc.setFillColor(245, 245, 245); // Light gray background
//   doc.rect(0, footerY, pageWidth, footerHeight, 'F');

//   // Orange top border for footer
//   doc.setFillColor(...primaryColor);
//   doc.rect(0, footerY, pageWidth, 1, 'F');

//   // QR Code Styling
//   const qrSize = 30;
//   const qrX = pageWidth - margin - qrSize;
//   const qrY = footerY + 10;

//   // Draw a white background for the QR code to make it pop
//   doc.setFillColor(255, 255, 255);
//   doc.roundedRect(qrX - 2, qrY - 2, qrSize + 4, qrSize + 4, 1, 1, 'F');
//   doc.addImage(qrCodeDataUrl, 'PNG', qrX, qrY, qrSize, qrSize);

//   // Feedback Text
//   doc.setTextColor(...darkColor);
//   doc.setFont('helvetica', 'bold');
//   doc.setFontSize(12);
//   doc.text('JOIN THE CONVERSATION', margin, footerY + 15);

//   doc.setFont('helvetica', 'normal');
//   doc.setFontSize(9);
//   doc.setTextColor(...secondaryColor);
//   doc.text(
//     'Scan the QR code to provide feedback or visit:',
//     margin,
//     footerY + 22,
//   );

//   doc.setTextColor(...primaryColor);
//   doc.setFont('helvetica', 'bold');
//   doc.text(feedbackUrl, margin, footerY + 28);

//   return doc.output('blob');
// }

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
//     imageUrl,
//   } = params;

//   const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
//   const pageWidth = 210;
//   const pageHeight = 297;
//   const margin = 15;
//   const contentWidth = pageWidth - margin * 2;

//   const primaryColor = [230, 120, 23] as const;
//   const darkText = [30, 30, 30] as const;

//   // --- 1. HERO HEADER (CENTER-CROP LOGIC) ---
//   const headerHeight = 80;
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

//     // Gradient overlay for title contrast
//     doc.setFillColor(0, 0, 0);
//     doc.setGState(new (doc as any).GState({ opacity: 0.55 }));
//     doc.rect(0, 0, pageWidth, headerHeight, 'F');
//     doc.setGState(new (doc as any).GState({ opacity: 1.0 }));
//   } catch (e) {
//     doc.setFillColor(...primaryColor);
//     doc.rect(0, 0, pageWidth, headerHeight, 'F');
//   }

//   doc.setTextColor(255, 255, 255);
//   doc.setFont('helvetica', 'bold');
//   doc.setFontSize(24);
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

//   // --- 3. DESCRIPTION CONTENT ---
//   doc.setFontSize(14);
//   doc.setFont('helvetica', 'bold');
//   doc.setTextColor(...primaryColor);
//   doc.text('ABOUT THIS EVENT', margin, currentY);

//   currentY += 8;
//   doc.setFont('helvetica', 'normal');
//   doc.setFontSize(10.5);
//   doc.setTextColor(60, 60, 60);
//   const descLines = doc.splitTextToSize(description, contentWidth);
//   doc.text(descLines, margin, currentY, { lineHeightFactor: 1.5 });

//   // --- 4. PREFERRED SOLID FOOTER (REFINED) ---
//   const footerHeight = 45;
//   const footerY = pageHeight - footerHeight;

//   doc.setFillColor(...primaryColor);
//   doc.rect(0, footerY, pageWidth, footerHeight, 'F');

//   // Organizer info (White on Orange)
//   doc.setTextColor(255, 255, 255);
//   doc.setFontSize(9);
//   doc.setFont('helvetica', 'normal');
//   doc.text('ORGANIZED BY', margin, footerY + 12);
//   doc.setFontSize(12);
//   doc.setFont('helvetica', 'bold');
//   doc.text(organizer, margin, footerY + 18);

//   // Feedback Text
//   doc.setFontSize(9);
//   doc.setFont('helvetica', 'normal');
//   doc.text('SCAN TO SUBMIT FEEDBACK', margin, footerY + 30);
//   doc.setFontSize(8);
//   doc.text(feedbackUrl, margin, footerY + 35);

//   // QR Code (White background for scanning contrast)
//   const qrSize = 30;
//   doc.setFillColor(255, 255, 255);
//   doc.roundedRect(
//     pageWidth - margin - qrSize - 2,
//     footerY + 7,
//     qrSize + 4,
//     qrSize + 4,
//     1,
//     1,
//     'F',
//   );
//   doc.addImage(
//     qrCodeDataUrl,
//     'PNG',
//     pageWidth - margin - qrSize,
//     footerY + 9,
//     qrSize,
//     qrSize,
//   );

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
    description,
    startDate,
    endDate,
    location,
    organizer,
    qrCodeDataUrl,
    feedbackUrl,
    imageUrl,
  } = params;

  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 15;
  const contentWidth = pageWidth - margin * 2;

  const primaryColor = [230, 120, 23] as const;
  const darkText = [30, 30, 30] as const;
  const secondaryGray = [120, 120, 120] as const;

  // --- 1. HERO HEADER (CENTER-CROP) ---
  const headerHeight = 85;
  try {
    const img = await getImageData(imageUrl);
    const canvasRatio = pageWidth / headerHeight;
    const imgRatio = img.width / img.height;

    let sx, sy, sw, sh;
    if (imgRatio > canvasRatio) {
      sh = img.height;
      sw = img.height * canvasRatio;
      sx = (img.width - sw) / 2;
      sy = 0;
    } else {
      sw = img.width;
      sh = img.width / canvasRatio;
      sx = 0;
      sy = (img.height - sh) / 2;
    }

    const canvas = document.createElement('canvas');
    canvas.width = sw;
    canvas.height = sh;
    const ctx = canvas.getContext('2d');
    const tempImg = new Image();
    tempImg.src = img.dataUrl;
    await new Promise((r) => (tempImg.onload = r));
    ctx?.drawImage(tempImg, sx, sy, sw, sh, 0, 0, sw, sh);
    doc.addImage(
      canvas.toDataURL('image/jpeg'),
      'JPEG',
      0,
      0,
      pageWidth,
      headerHeight,
    );

    // Gradient overlay
    doc.setFillColor(0, 0, 0);
    doc.setGState(new (doc as any).GState({ opacity: 0.75 }));
    doc.rect(0, 0, pageWidth, headerHeight, 'F');
    doc.setGState(new (doc as any).GState({ opacity: 1.0 }));
  } catch (e) {
    doc.setFillColor(...primaryColor);
    doc.rect(0, 0, pageWidth, headerHeight, 'F');
  }

  // --- 2. LOGO & TITLE ---
  try {
    // Logo Placement (Top Left)
    const logoData = await getImageData('/logo.png');
    const logoWidth = 25;
    const logoHeight = (logoData.height * logoWidth) / logoData.width;
    doc.addImage(logoData.dataUrl, 'PNG', margin, 10, logoWidth, logoHeight);
  } catch (e) {
    console.warn('Logo not found at /logo.png');
  }

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(26);
  const titleLines = doc.splitTextToSize(title.toUpperCase(), contentWidth);
  doc.text(titleLines, margin, headerHeight - 20);

  // --- 3. DYNAMIC INFO BAR (No truncation) ---
  //   let currentY = headerHeight + 12;
  //   const colWidth = (contentWidth - 10) / 3;
  //   const locLines = doc.splitTextToSize(location, colWidth);
  //   const infoBarHeight = Math.max(22, 12 + locLines.length * 5);

  //   doc.setFillColor(248, 248, 248);
  //   doc.roundedRect(margin, currentY, contentWidth, infoBarHeight, 1, 1, 'F');

  //   const drawCol = (label: string, value: string | string[], x: number) => {
  //     doc.setFont('helvetica', 'bold');
  //     doc.setFontSize(8);
  //     doc.setTextColor(...primaryColor);
  //     doc.text(label, x, currentY + 7);
  //     doc.setFont('helvetica', 'normal');
  //     doc.setFontSize(9);
  //     doc.setTextColor(...darkText);
  //     doc.text(value, x, currentY + 13);
  //   };

  //   drawCol('DATE', format(new Date(startDate), 'MMM dd, yyyy'), margin + 5);
  //   drawCol(
  //     'TIME',
  //     `${format(new Date(startDate), 'h:mm a')} - ${format(new Date(endDate), 'h:mm a')}`,
  //     margin + colWidth + 5,
  //   );
  //   drawCol('LOCATION', locLines, margin + colWidth * 2 + 5);

  //   currentY += infoBarHeight + 15;

  // --- 2. IMPROVED INFO BAR (NO TRUNCATION) ---
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

  currentY += infoBarHeight + 15;

  // --- 4. DESCRIPTION ---
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...primaryColor);
  doc.text('ABOUT THIS EVENT', margin, currentY);

  currentY += 8;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10.5);
  doc.setTextColor(60, 60, 60);
  const descLines = doc.splitTextToSize(description, contentWidth);
  doc.text(descLines, margin, currentY, { lineHeightFactor: 1.6 });

  // --- 5. PREMIUM LIGHT FOOTER (Restored) ---
  const footerHeight = 45;
  const footerY = pageHeight - footerHeight;

  // Light gray background & top border
  doc.setFillColor(250, 250, 250);
  doc.rect(0, footerY, pageWidth, footerHeight, 'F');
  doc.setFillColor(...primaryColor);
  doc.rect(0, footerY, pageWidth, 0.8, 'F');

  // Organizer Info
  doc.setFontSize(8);
  doc.setTextColor(...secondaryGray);
  doc.text('ORGANIZED BY', margin, footerY + 12);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...darkText);
  doc.text(organizer, margin, footerY + 18);

  // Feedback Text
  doc.setFontSize(10);
  doc.text('SHARE YOUR FEEDBACK', margin, footerY + 30);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...primaryColor);
  doc.text(feedbackUrl, margin, footerY + 36);

  // QR Code on right
  const qrSize = 28;
  const qrX = pageWidth - margin - qrSize;
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(qrX - 2, footerY + 8, qrSize + 4, qrSize + 4, 1, 1, 'F');
  doc.addImage(qrCodeDataUrl, 'PNG', qrX, footerY + 10, qrSize, qrSize);

  doc.setFontSize(7);
  doc.setTextColor(...secondaryGray);
  doc.text('SCAN TO GIVE FEEDBACK', qrX + qrSize / 2, footerY + 42, {
    align: 'center',
  });

  return doc.output('blob');
}
