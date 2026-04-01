import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ChatWidget } from "./components/chat/ChatWidget";
import { companies } from "@/data/companies";

const FALLBACK_SLUG = "alamo-air";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Alamo Air Solutions | HVAC Repair & Installation in San Antonio",
    template: "%s | Alamo Air Solutions",
  },
  description:
    "Trusted HVAC repair, installation, and maintenance in San Antonio, TX. Licensed & insured technicians. 24/7 emergency service. Call (210) 730-6232.",
  keywords: [
    "HVAC San Antonio",
    "AC repair San Antonio",
    "furnace repair San Antonio",
    "air conditioning installation",
    "HVAC maintenance",
    "emergency HVAC",
    "San Antonio heating and cooling",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Alamo Air Solutions",
    title: "Alamo Air Solutions | HVAC Repair & Installation in San Antonio",
    description:
      "Fast, honest, and professional HVAC services in San Antonio, TX. Licensed & insured. 24/7 emergency service available.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Alamo Air Solutions – HVAC Repair & Installation in San Antonio",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const company = companies[FALLBACK_SLUG];
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <ChatWidget company={company} />
      </body>
    </html>
  );
}
