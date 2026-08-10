import type { Metadata, Viewport } from "next";
import { invitationConfig as config } from "./invitation-config";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(config.site.url),
  title: config.site.title,
  description: config.site.description,
  applicationName: "Convite Roblox",
  authors: [{ name: "Anderson Jhonatan — K2 Tech" }],
  creator: "K2 Tech",
  keywords: ["convite digital", "convite interativo", "aniversário infantil", "Roblox", "K2 Tech"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: config.site.locale,
    url: "/",
    siteName: "Convite Roblox",
    title: config.site.title,
    description: config.site.description,
    images: [{ url: config.site.ogImage, width: 768, height: 432, alt: "Aventura pelas ilhas do convite Roblox" }],
  },
  twitter: {
    card: "summary_large_image",
    title: config.site.title,
    description: config.site.description,
    images: [config.site.ogImage],
  },
  icons: {
    icon: [{ url: "/favicon.svg?v=2", type: "image/svg+xml" }],
    shortcut: "/favicon.svg?v=2",
  },
  other: { "codex-preview": "development" },
};

export const viewport: Viewport = {
  themeColor: config.site.themeColor,
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
