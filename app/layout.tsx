import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

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

const title = "Sprinter Studio — the venture studio of Sprinter";

const description =
  "The venture studio of Sprinter: partner incubations and internal experiments, clearly labeled — a public record of what we test, ship, and stop.";

const longDescription =
  "Sprinter Studio is the venture studio inside the Sprinter ecosystem. It incubates new products in two clearly separated tracks — products built with partners, and experiments run on Sprinter's own bench — and publishes the record, including what gets stopped. It is not itself a fund or commercial offer: Sprinter.ai explains the wider build system, focused offers live on dedicated routes, and implementation-ready workflows move to Sprinter Consulting.";

// Matches --background so mobile browser chrome doesn't frame the near-black
// page in white.
export const viewport: Viewport = {
  themeColor: "#0a0a0a",
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
        "@type": "Organization",
        "@id": "https://sprinter.studio/#organization",
        name: "Sprinter Studio",
        url: "https://sprinter.studio",
        description: longDescription,
        parentOrganization: { "@id": "https://sprinter.ai/#organization" },
        founder: {
          "@type": "Person",
          name: "Tyler Dreher",
          url: "https://tylerdreher.com",
        },
        sameAs: ["https://github.com/tylerdr/sprinter-studio"],
      },
      {
        "@type": "WebSite",
        "@id": "https://sprinter.studio/#website",
        name: "Sprinter Studio",
        url: "https://sprinter.studio",
        description,
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
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}
