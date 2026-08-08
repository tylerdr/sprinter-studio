import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteHeader } from "@/app/components/SiteHeader";
import { Footer } from "@/app/components/Footer";
import { POSITIONING_STATEMENT } from "@/app/data/positioning";
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
    default: "Sprinter Studio | Truth-Labeled Venture Portfolio",
    template: "%s | Sprinter Studio",
  },
  description: POSITIONING_STATEMENT,
  metadataBase: new URL("https://sprinter.studio"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Sprinter Studio | Truth-Labeled Venture Portfolio",
    description: POSITIONING_STATEMENT,
    url: "https://sprinter.studio",
    siteName: "Sprinter Studio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sprinter Studio | Truth-Labeled Venture Portfolio",
    description: POSITIONING_STATEMENT,
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
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Sprinter Studio",
      url: "https://sprinter.studio",
      description: POSITIONING_STATEMENT,
      founder: {
        "@type": "Person",
        name: "Tyler Dreher",
        url: "https://github.com/tylerdr",
      },
      sameAs: [
        "https://github.com/tylerdr/sprinter-studio",
      ],
      knowsAbout: [
        "AI product development",
        "Venture building",
        "SaaS",
        "Software development",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Sprinter Studio",
      url: "https://sprinter.studio",
      description: POSITIONING_STATEMENT,
      publisher: {
        "@type": "Organization",
        name: "Sprinter Studio",
      },
    },
  ];

  return (
    <html lang="en" className={`dark ${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-md focus:bg-accent-green focus:px-4 focus:py-2 focus:text-background focus:font-medium"
        >
          Skip to content
        </a>
        <SiteHeader />
        {children}
        <Footer />
      </body>
    </html>
  );
}
