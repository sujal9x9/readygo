import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Ready Go Trips India | Travel More. Worry Less.",
  description:
    "Discover handpicked travel destinations across India with Ready Go Trips. From Himalayan treks to Goa beaches — curated itineraries, comfortable stays, and unforgettable experiences. Book your next adventure today!",
  keywords: [
    "travel",
    "India travel",
    "adventure trips",
    "Manali",
    "Kedarnath",
    "Ladakh",
    "Goa",
    "Spiti Valley",
    "group tours",
    "Ready Go Trips",
    "budget travel India",
    "trekking",
    "Himalayan trips",
  ],
  authors: [{ name: "Ready Go Trips India" }],
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    title: "Ready Go Trips India | Travel More. Worry Less.",
    description:
      "Handpicked destinations. Best experiences. Your adventure starts here.",
    type: "website",
    locale: "en_IN",
    siteName: "Ready Go Trips India",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ready Go Trips India | Travel More. Worry Less.",
    description:
      "Handpicked destinations. Best experiences. Your adventure starts here.",
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
  return (
    <html lang="en" className={`${cormorantGaramond.variable} ${inter.variable}`}>
      <body className="bg-background text-secondary antialiased">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
