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

const title = "Sprinter Studio | Public AI Product R&D and Experiment Ledger";

const description =
  "Sprinter Studio is the public R&D and experiment ledger behind Sprinter: hypotheses, prototypes, live properties, reusable patterns, and the evidence used to continue, pause, or stop them.";

const longDescription =
  "Sprinter Studio records product and operating experiments under human accountability. It is not another commercial offer. The Sprinter commercial front door is the Executive AI Accelerator at sprinter.ai; implementation-ready workflows move to Sprinter Consulting.";

export const metadata: Metadata = {
  title: {
    default: title,
    template: "%s | Sprinter Studio",
  },
  description,
  metadataBase: new URL("https://sprinter.studio"),
  alternates: { canonical: "/" },
  keywords: [
    "AI product R&D",
    "AI experiment ledger",
    "agent-assisted software development",
    "AI product experiments",
    "product validation",
    "evidence-gated product development",
    "Amble Sprint Sail",
  ],
  openGraph: {
    title,
    description,
    url: "https://sprinter.studio",
    siteName: "Sprinter Studio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
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
        "@type": "CreativeWork",
        "@id": "https://sprinter.studio/#rd-ledger",
        name: "Sprinter Studio",
        url: "https://sprinter.studio",
        description: longDescription,
        creator: { "@id": "https://sprinter.ai/#organization" },
        about: [
          "AI product experiments",
          "Agent-assisted software development",
          "Product validation",
          "Reusable software patterns",
          "Evidence-gated product decisions",
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://sprinter.studio/#website",
        name: "Sprinter Studio",
        url: "https://sprinter.studio",
        description,
        publisher: { "@id": "https://sprinter.ai/#organization" },
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
