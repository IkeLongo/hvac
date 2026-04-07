import type { Metadata } from "next";
import { headers } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ChatWidget } from "./components/chat/ChatWidget";
import { Navbar } from "./components/layout/navbar/Navbar";
import { Footer } from "./components/layout/Footer";
import { companies } from "@/data/companies";

const FALLBACK_SLUG = "alamo-air";

async function getCompany() {
  const headersList = await headers();
  const slug = headersList.get("x-company-slug") ?? FALLBACK_SLUG;
  return companies[slug] ?? companies[FALLBACK_SLUG];
}

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const company = await getCompany();
  return {
    title: {
      default: `${company.name} | HVAC Repair & Installation in ${company.city}`,
      template: `%s | ${company.name}`,
    },
    description: `Trusted HVAC repair, installation, and maintenance in ${company.city}, TX. Licensed & insured technicians. 24/7 emergency service. Call ${company.phone}.`,
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: company.name,
      title: `${company.name} | HVAC Repair & Installation in ${company.city}`,
      description: `Fast, honest, and professional HVAC services in ${company.city}, TX. Licensed & insured. 24/7 emergency service available.`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const company = await getCompany();
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar company={company} />
        {children}
        <Footer company={company} />
        <ChatWidget company={company} />
      </body>
    </html>
  );
}
