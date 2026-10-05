import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { articles, articlePublished } from "@/lib/articles";
import { services } from "@/lib/content";
import { absoluteUrl, organisationId, pageGraph, pageMetadata } from "@/lib/seo";
import { StructuredData } from "@/components/structured-data";
import { Eyebrow, CTA } from "@/components/site-sections";

export function generateStaticParams() { return articles.map(article => ({ slug: article.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find(item => item.slug === slug);
  return article ? { ...pageMetadata(article.seoTitle, article.description, "/guides/" + slug), openGraph: { ...pageMetadata(article.seoTitle, article.description, "/guides/" + slug).openGraph, type: "article", publishedTime: articlePublished } } : {};
}

export default async function Guide({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles.find(item => item.slug === slug);
  if (!article) notFound();
  const path = "/guides/" + slug;
  const matchingServices = services.filter(service => article.serviceSlugs.includes(service.slug));
  const related = articles.filter(item => item.slug !== slug && item.serviceSlugs.some(service => article.serviceSlugs.includes(service))).slice(0, 3);
  return <>
    <article>
      <header className="simple-hero article-hero"><div className="container">
        <nav className="breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span>/</span><a href="/guides">Guides</a><span>/</span><span aria-current="page">{article.shortTitle}</span></nav>
        <Eyebrow>{article.category}</Eyebrow>
        <h1>{article.title}</h1>
        <p className="article-intro">{article.intro}</p>
        <div className="article-byline">By Arcade Game Australia <span aria-hidden="true">·</span> <time dateTime={articlePublished}>27 September 2026</time></div>
      </div></header>
      <div className="section container article-layout">
        <aside className="article-sidebar">
          <nav aria-label="In this guide"><h2>IN THIS GUIDE</h2>{article.sections.map(section => <a key={section.id} href={"#" + section.id}>{section.heading}</a>)}</nav>
          <div className="article-service-box"><h2>PLAN YOUR NEXT STEP</h2>{matchingServices.map(service => <a href={"/" + service.slug} key={service.slug}>{service.shortTitle}<ArrowUpRight size={16}/></a>)}<a href="/service-areas">Sydney & NSW service areas<ArrowUpRight size={16}/></a></div>
        </aside>
        <div className="article-body">{article.sections.map(section => <section id={section.id} key={section.id}>
          <h2>{section.heading}</h2>
          {section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
          {section.bullets && <ul>{section.bullets.map(bullet => <li key={bullet}>{bullet}</li>)}</ul>}
          {section.table && <div className="article-table-wrap" tabIndex={0} role="region" aria-label={section.heading + " comparison"}><table><thead><tr>{section.table.headings.map(heading => <th scope="col" key={heading}>{heading}</th>)}</tr></thead><tbody>{section.table.rows.map(row => <tr key={row[0]}>{row.map((cell, i) => i === 0 ? <th scope="row" key={i}>{cell}</th> : <td key={i}>{cell}</td>)}</tr>)}</tbody></table></div>}
        </section>)}</div>
      </div>
    </article>
    {related.length > 0 && <section className="container related-reading"><Eyebrow>Keep planning</Eyebrow><h2>MORE USEFUL GUIDES.</h2><div className="related-links">{related.map(item => <a href={"/guides/" + item.slug} key={item.slug}>{item.shortTitle}<ArrowUpRight size={16}/></a>)}<a href="/guides">All guides<ArrowUpRight size={16}/></a></div></section>}
    <CTA />
    <StructuredData graph={[
      ...pageGraph(path, article.title, article.description).filter(item => item["@type"] !== "BreadcrumbList"),
      { "@type": "BreadcrumbList", "@id": absoluteUrl(path + "#breadcrumb"), itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl() },
        { "@type": "ListItem", position: 2, name: "Guides", item: absoluteUrl("/guides") },
        { "@type": "ListItem", position: 3, name: article.title, item: absoluteUrl(path) },
      ] },
      { "@type": "Article", "@id": absoluteUrl(path + "#article"), headline: article.title, description: article.description, datePublished: articlePublished, dateModified: articlePublished, author: { "@type": "Organization", "@id": organisationId, name: "Arcade Game Australia", url: absoluteUrl("/about") }, publisher: { "@id": organisationId }, mainEntityOfPage: { "@id": absoluteUrl(path + "#webpage") }, inLanguage: "en-AU" },
    ]} />
  </>;
}

export const dynamicParams = false;
