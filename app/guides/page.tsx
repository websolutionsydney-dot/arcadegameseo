import { ArrowUpRight } from "lucide-react";
import { articles } from "@/lib/articles";
import { absoluteUrl, pageGraph, pageMetadata } from "@/lib/seo";
import { Eyebrow, CTA } from "@/components/site-sections";
import { StructuredData } from "@/components/structured-data";

const title = "Arcade Machine Guides — Hire, Buying & Venue Planning";
const description = "Practical guides to arcade hire costs, claw-machine prizes, commercial placement, buying and delivery. Plan an event or games area in Sydney and NSW.";
export const metadata = pageMetadata(title, description, "/guides");

export default function Guides() {
  return <>
    <section className="simple-hero guides-hero"><div className="container">
      <nav className="breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span>/</span><span aria-current="page">Guides</span></nav>
      <Eyebrow>A little planning goes a long way</Eyebrow>
      <h1>GOOD QUESTIONS.<br />BETTER GAME PLANS.</h1>
      <p>Before you book, buy or make room for a machine, get the practical details clear. These guides help you compare options and prepare a useful brief.</p>
    </div></section>
    <section className="section container article-grid" aria-label="Arcade planning guides">
      {articles.map((article, index) => <article className="article-card" key={article.slug}>
        <div className="article-card-top"><span>0{index + 1}</span><span>{article.category}</span></div>
        <h2><a href={"/guides/" + article.slug}>{article.title}</a></h2>
        <p>{article.description}</p>
        <a className="text-link" href={"/guides/" + article.slug}>Read the guide <ArrowUpRight size={17} /></a>
      </article>)}
    </section>
    <CTA />
    <StructuredData graph={[
      ...pageGraph("/guides", title, description, "CollectionPage"),
      { "@type": "ItemList", "@id": absoluteUrl("/guides#articles"), name: "Arcade machine planning guides", itemListElement: articles.map((article, index) => ({ "@type": "ListItem", position: index + 1, name: article.title, url: absoluteUrl("/guides/" + article.slug) })) },
    ]} />
  </>;
}
