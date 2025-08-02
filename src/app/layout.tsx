// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
 variable: "--font-geist-sans",
 subsets: ["latin"],
 display: "swap",
});

const geistMono = Geist_Mono({
 variable: "--font-geist-mono",
 subsets: ["latin"],
 display: "swap",
});

export const viewport: Viewport = {
 width: "device-width",
 initialScale: 1,
 maximumScale: 1,
 themeColor: [
  { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
 ],
 colorScheme: "light dark",
};

export const metadata: Metadata = {
 title: {
  default: "Emaar Villas | Luxury Properties in Dubai",
  template: "%s | Emaar Villas",
 },
 description:
  "Discover exclusive luxury villas in Dubai with Emaar Properties. Premium waterfront residences and golf community homes in Dubai's most prestigious locations.",
 keywords: [
  "Emaar Villas",
  "Luxury villas Dubai",
  "Premium properties UAE",
  "Waterfront residences",
  "Dubai Palm Jumeirah homes",
 ],
 authors: [{ name: "Emaar Properties", url: "https://www.emaar.com" }],
 creator: "Emaar Properties PJSC",
 publisher: "Emaar Properties PJSC",
 metadataBase: new URL("https://villas.emaar.com"),
 alternates: {
  canonical: "/",
  languages: {
   "en-US": "/en-US",
   "ar-AE": "/ar-AE",
  },
 },
 openGraph: {
  title: "Emaar Villas | Luxury Properties in Dubai",
  description:
   "Discover exclusive luxury villas in Dubai with Emaar Properties.",
  url: "https://villas.emaar.com",
  siteName: "Emaar Villas",
  images: [
   {
    url: "/og-image.jpg",
    width: 1200,
    height: 630,
    alt: "Emaar Villas Luxury Properties",
   },
  ],
  locale: "en_US",
  type: "website",
 },

 robots: {
  index: true,
  follow: true,
  googleBot: {
   index: true,
   follow: true,
   "max-video-preview": -1,
   "max-image-preview": "large",
   "max-snippet": -1,
  },
 },
 icons: {
  icon: {
   url: "/favicon-for-real-estate.png",
  },
  apple: [{ url: "/favicon-for-real-estate.png" }],
  other: [
   {
    rel: "mask-icon",
    url: "/safari-pinned-tab.svg",
    color: "#0a0a0a",
   },
  ],
 },
 manifest: "/site.webmanifest",
 verification: {
  google: "your-google-verification-code",
  yandex: "your-yandex-verification-code",
 },
 appleWebApp: {
  title: "Emaar Villas",
  statusBarStyle: "black-translucent",
  capable: true,
 },
 formatDetection: {
  telephone: true,
  email: true,
  address: true,
  date: true,
 },
 category: "real estate",
};

export default function RootLayout({
 children,
}: Readonly<{
 children: React.ReactNode;
}>) {
 return (
  <html lang="en" suppressHydrationWarning>
   <body
    className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
   >
    <Providers>
     <Header />
     <main className="flex-1 overflow-hidden">{children}</main>
     <Footer />
    </Providers>
   </body>
  </html>
 );
}
