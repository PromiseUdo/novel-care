// app/layout.tsx
import type { Metadata } from "next";
import { Montserrat, Titan_One } from "next/font/google";
import "./globals.css";
import Topbar from "@/components/topbar";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Toaster } from "sonner";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-montserrat",
});

const titanOne = Titan_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-titan-one",
});

export const metadata: Metadata = {
  title: "Novel Care Services",
  description: "High quality care support service",
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: "Novel Care Services",
    description: "High quality care support service",
    images: ["/hero1-bg.webp"],
    url: "https://novelcareservices.com.au/",
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
      </head>
      <body className={`${montserrat.variable} ${titanOne.variable}`}>
        <main className="flex flex-col min-h-screen relative text-foreground">
          <Topbar />
          <Navbar />
          <div className="flex-grow flex-1">{children}</div>
          <Toaster />

          <Footer />
        </main>
      </body>
    </html>
  );
}
