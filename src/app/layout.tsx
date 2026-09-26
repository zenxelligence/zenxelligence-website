import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Inter_Tight } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SkipLink } from "@/components/skip-link";
import { HashJump } from "@/components/hash-jump";
import { SectionReveal } from "@/components/section-reveal";
import { CtaPanel } from "@/components/cta-panel";
import { JsonLd } from "@/components/json-ld";
import { DEFAULT_DESCRIPTION, SITE } from "@/content/site";
import { organizationJsonLd, websiteJsonLd } from "@/lib/schema";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Web, mobile, AI agents, IoT & VLSI`,
    template: `%s — ${SITE.name}`,
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  keywords: [
    "Zen xElligence",
    "web application development",
    "AI agent automation",
    "Flutter",
    "React Native",
    "FastAPI",
    "LangChain",
    "IoT",
    "VLSI",
    "ZX A3 Innovation",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — Web, mobile, AI agents, IoT & VLSI`,
    description: DEFAULT_DESCRIPTION,
    images: [{ url: "/og", width: 1200, height: 630, alt: SITE.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — Web, mobile, AI agents, IoT & VLSI`,
    description: DEFAULT_DESCRIPTION,
    images: ["/og"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${interTight.variable} h-full`}>
      <body className="flex min-h-full flex-col bg-bg text-fg antialiased">
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
        <div className="relative z-10 flex min-h-full flex-1 flex-col">
          <SectionReveal />
          <HashJump />
          <SkipLink />
          <SiteHeader />
          <main id="main" className="site-container flex-1">
            {children}
          </main>
          <CtaPanel />
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
