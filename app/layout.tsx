// app/layout.tsx
import type { Metadata } from 'next';
import { Montserrat, Titan_One } from 'next/font/google';
import './globals.css';
import Topbar from '@/components/topbar';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { Toaster } from 'sonner';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-montserrat',
});

const titanOne = Titan_One({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-titan-one',
});

export const metadata: Metadata = {
  title:
    'Novel Care Services | NDIS Provider Perth, Blackwood WA, Southwest WA',
  description:
    'Novel Care Services is a registered NDIS provider offering disability services Perth, NDIS services Blackwood WA, and NDIS support Southwest WA.',
  icons: {
    icon: '/favicon.png',
  },
  openGraph: {
    title: 'Novel Care Services | NDIS Provider Perth, Blackwood WA',

    description:
      'Novel Care Services is a registered NDIS provider offering disability services Perth, NDIS services Blackwood WA, and NDIS support Southwest WA.',
    images: ['/hero1-bg.webp'],
    url: 'https://novelcareservices.com.au/',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="preconnect" href="https://img.youtube.com" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'Novel Care Services',
              description:
                'Registered NDIS provider offering NDIS services Perth, Blackwood WA, and Southwest WA.',
              url: 'https://novelcareservices.com.au',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Perth',
                addressRegion: 'WA',
                addressCountry: 'AU',
              },
              areaServed: ['Perth', 'Blackwood WA', 'Southwest WA', 'Bunbury'],
              telephone: '0426414430', // Replace with actual phone
              serviceType: [
                'NDIS Personal Care',
                'Psychosocial Recovery Coach',
                'NDIS Community Access',
                'NDIS Transport Services',
              ],
            }),
          }}
        />
      </head>
      <body className={`${montserrat.variable} ${titanOne.variable}`}>
        <main className="flex flex-col min-h-screen relative text-foreground">
          <Topbar />
          <Navbar />
          <div className="flex-grow flex-1">{children}</div>
          <Toaster />

          <Footer />
        </main>
        <div id="modal-root" />
      </body>
    </html>
  );
}
