import type { Metadata } from "next";
import { regions } from "@/lib/content";

// Keep canonical, social, sitemap and structured-data URLs in sync.
export const siteOrigin = "https://arcadegameaustralia.com.au";
export const siteName = "Arcade Game Australia";
export const absoluteUrl = (path = "/") => new URL(path, `${siteOrigin}/`).href;
export const organisationId = absoluteUrl("/#organisation");
export const websiteId = absoluteUrl("/#website");
export const serviceAreas = regions.map(region => ({ "@type": "Place", name: region.name }));

export function pageMetadata(title: string, description: string, path: string): Metadata {
  const fullTitle = `${title} | ${siteName}`;
  const image = {
    url: absoluteUrl("/images/arcade-hero.webp"),
    width: 1672,
    height: 941,
    alt: "Arcade Game Australia — bring more play to your space",
  };
  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: absoluteUrl(path) },
    openGraph: {
      title: fullTitle,
      description,
      url: absoluteUrl(path),
      type: "website",
      siteName,
      locale: "en_AU",
      images: [image],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [image.url] },
  };
}

export const organisationGraph = [
  {
    "@type": "Organization",
    "@id": organisationId,
    name: siteName,
    url: absoluteUrl(),
    logo: { "@type": "ImageObject", url: absoluteUrl("/images/arcade-game-australia-logo.png"), width: 635, height: 200 },
    description: "Arcade and claw machine hire, commercial venue placement, arcade machine sales, amusement machine supply and installation enquiries across Sydney and NSW.",
    areaServed: serviceAreas,
  },
  {
    "@type": "WebSite",
    "@id": websiteId,
    name: siteName,
    url: absoluteUrl(),
    inLanguage: "en-AU",
    publisher: { "@id": organisationId },
  },
];

export function pageGraph(path: string, name: string, description: string, type = "WebPage") {
  const url = absoluteUrl(path);
  return [
    {
      "@type": type,
      "@id": `${url}#webpage`,
      url,
      name,
      description,
      inLanguage: "en-AU",
      isPartOf: { "@id": websiteId },
      about: { "@id": organisationId },
      ...(path !== "/" && { breadcrumb: { "@id": `${url}#breadcrumb` } }),
    },
    ...(path === "/" ? [] : [{
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl() },
        { "@type": "ListItem", position: 2, name, item: url },
      ],
    }]),
  ];
}
