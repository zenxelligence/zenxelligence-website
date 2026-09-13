import type { Metadata } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SkipLink } from "@/components/skip-link";
import { SiteField } from "@/components/site-field";
import { JSON_LD, SITE } from "@/lib/site-data";

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
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s — ${SITE.name}`,
  },
  description:
    "Zen xElligence builds end-to-end web applications and APIs, AI agent automation, Android/iOS apps, IoT electronics, and VLSI.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${archivo.variable} ${jetbrainsMono.variable} h-full`}>
      <body className="grain flex min-h-full flex-col bg-bg text-fg antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
        <SiteField />
        <div className="relative z-10 flex min-h-full flex-1 flex-col">
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
