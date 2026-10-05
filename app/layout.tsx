import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header } from "@/components/site-header";
import { Footer } from "@/components/site-sections";
import { organisationGraph, pageMetadata, siteOrigin } from "@/lib/seo";
import { StructuredData } from "@/components/structured-data";
export const metadata: Metadata = {
  ...pageMetadata("Arcade Hire, Placement & Sales Sydney", "Arcade Game Australia: arcade and claw machine hire, commercial venue placement, sales, supply and installation across Sydney and NSW. Request a quote.", "/"),
  metadataBase: new URL(siteOrigin),
  icons: {
    icon: [
      { url: "/arcade-icon.svg", type: "image/svg+xml" },
      { url: "/arcade-icon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/arcade-icon-192.png", type: "image/png", sizes: "192x192" },
    ],
    shortcut: "/arcade-icon.svg",
    apple: { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
  },
};
export const viewport: Viewport = { themeColor: "#e31c21" };
export default function RootLayout({children}:{children:React.ReactNode}) {return <html lang="en-AU"><head><link rel="preload" href="/fonts/barlow-condensed-700.woff" as="font" type="font/woff" crossOrigin="anonymous"/><link rel="preload" href="/fonts/dm-sans-400.woff" as="font" type="font/woff" crossOrigin="anonymous"/></head><body><a className="skip-link" href="#main">Skip to content</a><Header/><main id="main">{children}</main><Footer/><StructuredData graph={organisationGraph}/></body></html>}
