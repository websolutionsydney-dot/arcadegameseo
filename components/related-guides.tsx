import { ArrowUpRight } from "lucide-react";
import { articles } from "@/lib/articles";
import { Eyebrow } from "@/components/site-sections";

export function RelatedGuides({ serviceSlug }: { serviceSlug?: string }) {
  const selected = (serviceSlug ? articles.filter(article => article.serviceSlugs.includes(serviceSlug)) : articles).slice(0, 3);
  return <section className="section container related-guide-section">
    <div className="section-heading"><div><Eyebrow>Useful before you decide</Eyebrow><h2>A LITTLE KNOW-HOW.</h2></div><a className="text-link" href="/guides">All planning guides<ArrowUpRight size={17}/></a></div>
    <div className="related-guide-grid">{selected.map(article => <article key={article.slug}><span className="guide-category">{article.category}</span><h3><a href={"/guides/" + article.slug}>{article.title}</a></h3><p>{article.description}</p><a href={"/guides/" + article.slug} className="text-link">Read the guide<ArrowUpRight size={16}/></a></article>)}</div>
  </section>;
}
