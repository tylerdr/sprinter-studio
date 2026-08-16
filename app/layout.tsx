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

const description =
  "Sprinter Studio is the public build log and R&D surface for Sprinter: a transparent ledger of product experiments, prototypes, live properties, reusable patterns, and the evidence used to continue or stop them.";

export const metadata: Metadata = {
  title: {
    default: "Sprinter Studio | Public AI Product Build Log",
    template: "%s | Sprinter Studio",
  },
  description,
  metadataBase: new URL("https://sprinter.studio"),
  alternates: { canonical: "/" },
  keywords: [
    "AI product build log",
    "agent-assisted software development",
    "AI product experiments",
    "venture studio playbook",
    "AI product validation",
    "Amble Sprint Sail",
  ],
  openGraph: {
    title: "Sprinter Studio | Public AI Product Build Log",
    description,
    url: "https://sprinter.studio",
    siteName: "Sprinter Studio",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sprinter Studio | Public AI Product Build Log",
    description,
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
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://sprinter.ai/#organization",
        name: "Sprinter",
        url: "https://sprinter.ai",
        founder: {
          "@type": "Person",
          name: "Tyler Dreher",
          url: "https://tylerdreher.com",
        },
        sameAs: [
          "https://sprinterconsulting.com",
          "https://sprinter.studio",
          "https://github.com/tylerdr/sprinter-studio",
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://sprinter.studio/#website",
        name: "Sprinter Studio",
        url: "https://sprinter.studio",
        description,
        publisher: { "@id": "https://sprinter.ai/#organization" },
        about: [
          "AI product experiments",
          "Agent-assisted software development",
          "Product validation",
          "Reusable software patterns",
        ],
      },
    ],
  };

  return (
    <html lang="en" className={`dark ${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body className="antialiased">
        <SiteHeader />
        {children}
        <Chat />
        <Analytics />
      </body>
    </html>
  );
}
