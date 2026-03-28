import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Chat } from "@/app/components/Chat";
import { SiteHeader } from "@/app/components/SiteHeader";
import "./globals.css";

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
    default: "Sprinter Studio | The AI Venture Factory",
    template: "%s | Sprinter Studio",
  },
  description:
    "One founder. An army of AI agents. A constellation of profitable software businesses. Watch us build in public.",
  metadataBase: new URL("https://sprinter.studio"),
  openGraph: {
    title: "Sprinter Studio | The AI Venture Factory",
    description:
      "One founder. An army of AI agents. A constellation of profitable software businesses.",
    url: "https://sprinter.studio",
    siteName: "Sprinter Studio",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sprinter Studio | The AI Venture Factory",
    description:
      "One founder. An army of AI agents. A constellation of profitable software businesses.",
    images: ["/og.png"],
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
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Sprinter Studio",
    url: "https://sprinter.studio",
    description:
      "AI-native venture studio building a constellation of profitable software businesses.",
    founder: {
      "@type": "Person",
      name: "Tyler Dreher",
    },
  };

  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SiteHeader />
        {children}
        <Chat />
        <Analytics />
      </body>
    </html>
  );
}
