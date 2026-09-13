import type { Metadata } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SkipLink } from "@/components/skip-link";
import { SiteField } from "@/components/site-field";
import { HashJump } from "@/components/hash-jump";
import { ORGANIZATION_JSON_LD, SITE, WEBSITE_JSON_LD } from "@/lib/site-data";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Web, mobile, AI agents, IoT & VLSI`,
    template: `%s — ${SITE.name}`,
  },
  description:
    "Zen xElligence is a two-engineer studio that builds end-to-end web apps & APIs, AI agent automation, Android/iOS apps, IoT electronics, and VLSI — brief to handover.",
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
  alternates: {
    canonical: SITE.url,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — Web, mobile, AI agents, IoT & VLSI`,
    description:
      "Two-engineer studio. End-to-end web, mobile, AI agents, IoT, and VLSI. You own what ships.",
    images: [{ url: "/og", width: 1200, height: 630, alt: SITE.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — Web, mobile, AI agents, IoT & VLSI`,
    description:
      "Two-engineer studio. End-to-end web, mobile, AI agents, IoT, and VLSI. You own what ships.",
    images: ["/og"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${archivo.variable} ${jetbrainsMono.variable} h-full`}>
      <body className="grain flex min-h-full flex-col bg-bg text-fg antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_JSON_LD) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_JSON_LD) }}
        />
        <SiteField />
        <div className="relative z-10 flex min-h-full flex-1 flex-col">
          <HashJump />
          <SkipLink />
          <SiteHeader />
          <main id="main" className="mx-auto w-full max-w-[1280px] flex-1 px-4 sm:px-6.5">
            {children}
          </main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
