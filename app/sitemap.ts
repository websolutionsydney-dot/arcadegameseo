import type { MetadataRoute } from "next";
import { services } from "@/lib/content";
import { absoluteUrl } from "@/lib/seo";
import { articles, articlePublished } from "@/lib/articles";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...["", ...services.map(service => service.slug), "service-areas", "about", "contact", "privacy", "guides"].map(slug => ({ url: absoluteUrl(`/${slug}`), changeFrequency: "monthly" as const, priority: slug === "" ? 1 : slug === "privacy" ? .2 : .8 })),
    ...articles.map(article => ({ url: absoluteUrl("/guides/" + article.slug), lastModified: articlePublished, changeFrequency: "yearly" as const, priority: .6 })),
  ];
}

export const dynamic = "force-static";
