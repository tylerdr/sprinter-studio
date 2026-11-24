import type { Metadata, Viewport } from "next";
import { Fraunces, Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

import { OutboundTracker } from "@/app/components/OutboundTracker";
import { SiteFooter } from "@/app/components/SiteFooter";
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

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz"],
});

const title = "Sprinter Studio — venture studio and public AI ledger";

const description =
  "Sprinter Studio is the venture studio of Sprinter: partner incubations and internal AI experiments, published with their stage, status and stop decisions.";

const longDescription =
  "Sprinter Studio is the venture studio of Sprinter, the applied AI firm founded by Tyler Dreher in 2018. It incubates new products in two clearly separated tracks — products built with partners, and experiments run on Sprinter's own bench — and publishes the record, including what gets stopped. It is not a fund or a commercial offer: leaders work with Sprinter Consulting, vertical product builds start at Sprinter AI, and business data work lives at Sprinter Dataworks.";

const founderId = "https://sprinter.ai/#founder";
const parentId = "https://sprinter.ai/#organization";

// Matches --background so mobile browser chrome doesn't frame the board-black
// page in white.
export const viewport: Viewport = {
  themeColor: "#0e0d0b",
};

export const metadata: Metadata = {
  title: {
    default: title,
    template: "%s | Sprinter Studio",
  },
  description,
  metadataBase: new URL("https://sprinter.studio"),
  alternates: { canonical: "/" },
  keywords: [
    "venture studio",
    "partner incubations",
    "internal experiments",
    "agent-assisted software development",
    "AI product experiments",
    "venture studio playbook",
    "AI product validation",
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
  // Shared Sprinter entity graph (web family brief, 2026-11-23). The parent
  // and founder are thin references; sprinter.ai owns their full description.
  // Sibling sites are separate organizations under the same parent, never sameAs.
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": founderId,
        name: "Tyler Dreher",
        url: "https://tylerdreher.com",
      },
      {
        "@type": "Organization",
        "@id": parentId,
        name: "Sprinter",
        url: "https://sprinter.ai",
        founder: { "@id": founderId },
      },
      {
        "@type": "Organization",
        "@id": "https://sprinter.studio/#organization",
        name: "Sprinter Studio",
        alternateName: "sprinter.studio",
        url: "https://sprinter.studio",
        description: longDescription,
        parentOrganization: { "@id": parentId },
        founder: { "@id": founderId },
        sameAs: ["https://github.com/tylerdr/sprinter-studio"],
      },
      {
        "@type": "Organization",
        "@id": "https://sprinterconsulting.com/#organization",
        name: "Sprinter Consulting",
        url: "https://sprinterconsulting.com",
        description:
          "Hands-on AI enablement and workflow implementation for leaders and operating teams.",
        parentOrganization: { "@id": parentId },
      },
      {
        "@type": "Organization",
        "@id": "https://sprinterdataworks.com/#organization",
        name: "Sprinter Dataworks",
        url: "https://sprinterdataworks.com",
        description:
          "Understand, prepare and license your business data to help fund your AI work.",
        parentOrganization: { "@id": parentId },
      },
      {
        "@type": "WebSite",
        "@id": "https://sprinter.studio/#website",
        name: "Sprinter Studio",
        url: "https://sprinter.studio",
        description,
        inLanguage: "en",
        publisher: { "@id": "https://sprinter.studio/#organization" },
        about: [
          "Partner incubations",
          "Internal experiments",
          "AI product experiments",
          "Product validation",
        ],
      },
    ],
  };

  return (
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${geistMono.variable} ${fraunces.variable}`}
    >
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
        <SiteFooter />
        <Analytics />
        <OutboundTracker />
      </body>
    </html>
  );
}
