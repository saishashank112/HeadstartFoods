import type { Metadata, Viewport } from "next";
import { DM_Sans, Inter } from "next/font/google";
import "./globals.css";
import ConditionalWrapper from "@/components/layout/ConditionalWrapper";
import { Toaster } from "react-hot-toast";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Headstart Foods | Canada's Premium Mango Importer",
    template: "%s | Headstart Foods",
  },
  description: "Canada's most trusted importer of Grade A Indian mangoes and curated South Asian grocery products. Weekly air-imported freshness from Indian orchards.",
  keywords: ["Mangoes", "Indian Mangoes", "Alphonso", "Kesar", "South Asian Grocery", "Canada", "Headstart Foods"],
  authors: [{ name: "Headstart Foods Inc." }],
  creator: "Headstart Foods Inc.",
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: "https://headstartfoods.ca",
    siteName: "Headstart Foods",
    title: "Headstart Foods | Canada's Premium Mango Importer",
    description: "Canada's most trusted importer of Grade A Indian mangoes and curated South Asian grocery products.",
    images: ["/og-image.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#FF8C00",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} ${inter.variable} font-body bg-white text-navy antialiased`}
      >
        <Toaster position="bottom-right" />
        <ConditionalWrapper>{children}</ConditionalWrapper>
      </body>
    </html>
  );
}
