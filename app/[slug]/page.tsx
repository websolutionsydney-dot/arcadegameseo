import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check } from "lucide-react";
import { regions, services } from "@/lib/content";
import { serviceGuides } from "@/lib/service-guides";
import { absoluteUrl, organisationId, pageGraph, pageMetadata, serviceAreas } from "@/lib/seo";
import { CTA, Eyebrow, FAQ } from "@/components/site-sections";
import { StructuredData } from "@/components/structured-data";
import { RelatedGuides } from "@/components/related-guides";

export function generateStaticParams() { return services.map(s => ({ slug: s.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find(s => s.slug === slug);
  return service ? pageMetadata(serviceGuides[slug].seoTitle, service.meta, "/" + slug) : {};
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = services.find(service => service.slug === slug);
  if (!s) notFound();
  const guide = serviceGuides[slug];
  return <>
    <section className={"inner-hero " + (s.image === "claw-machine" ? "claw" : "")}>
      <img src={"/images/" + s.image + ".webp"} alt={s.image === "claw-machine" ? "Illustrative illuminated claw machine with prizes" : "Illustrative arcade game cabinets"} width={s.image === "claw-machine" ? 1000 : 1672} height={s.image === "claw-machine" ? 1333 : 941} fetchPriority="high" />
      <div className="container">
        <nav className="breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span>/</span><span aria-current="page">{s.shortTitle}</span></nav>
        <Eyebrow>{s.kicker}</Eyebrow>
        <div className="display-heading" aria-hidden="true">{s.headline}</div>
        <h1 className="page-service-title">{s.title}</h1>
        <p>{s.intro}</p>
        <a href={"/contact?service=" + s.slug} className="button button-brand">{s.cta}<ArrowUpRight size={18} /></a>
      </div>
    </section>
    <nav className="container page-topics" aria-label="On this service page">
      <span>Explore this service</span>
      {guide.sections.map(section => <a href={"#" + section.id} key={section.id}>{section.heading}</a>)}
      <a href="#service-questions">Frequently asked questions</a>
    </nav>
    <section className="section container">
      <div className="content-split"><div><Eyebrow>Made for your kind of play</Eyebrow><h2>{s.overviewTitle}</h2></div><p>{s.overview}</p></div>
      <div className="steps detail-benefits">{s.benefits.map((benefit, i) => <div className="step" key={benefit.title}><span className="step-number">0{i + 1}<ArrowUpRight size={19} /></span><h3>{benefit.title}</h3><p>{benefit.text}</p></div>)}</div>
    </section>
    <div className="container service-guide">
      {guide.sections.map(section => <section className="guide-section" id={section.id} key={section.id}>
        <h2>{section.heading}</h2>
        <div className="guide-copy">{section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>
        {section.items && <div className="venue-guide-grid">{section.items.map(item => <article key={item.title}><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>}
      </section>)}
    </div>
    <section className="preparation"><div className="container preparation-inner"><div><Eyebrow>A few details make a difference</Eyebrow><h2>LET’S FIND<br />THE RIGHT FIT.</h2><p>Send what you know. These details help us understand your requirements and prepare a useful quote.</p></div><ul className="check-list">{s.checklist.map(item => <li key={item}><Check size={18} /><span>{item}</span></li>)}</ul></div></section>
    <section className="section container faq-layout" id="service-questions"><div><Eyebrow>Your questions, answered</Eyebrow><h2>GOOD TO KNOW.<br />BEFORE YOU GO.</h2><p>Need to talk through your requirements?</p><a href={"/contact?service=" + s.slug} className="text-link">Start an enquiry <ArrowUpRight size={17} /></a></div><FAQ items={[...s.faqs, ...guide.faqs]} /></section>
    <section className="container service-coverage"><h2>{s.shortTitle} across Sydney & NSW</h2><p>Choose your region for planning details. Include your exact suburb or postcode in your enquiry so equipment availability, delivery and any travel costs can be confirmed.</p><div className="related-links">{regions.map(region => <a key={region.slug} href={"/service-areas#" + region.slug}>{region.name}<ArrowUpRight size={15} /></a>)}</div></section>
    <section className="container related-services"><h2>MORE WAYS TO PLAY.</h2><div className="related-links">{services.filter(service => service.slug !== s.slug).map(service => <a href={"/" + service.slug} key={service.slug}>{service.shortTitle}<ArrowUpRight size={15} /></a>)}<a href="/service-areas">Sydney & NSW service areas<ArrowUpRight size={15} /></a></div></section>
    <RelatedGuides serviceSlug={slug} />
    <CTA />
    <StructuredData graph={[
      ...pageGraph("/" + slug, s.title, s.meta),
      {
        "@type": "Service",
        "@id": absoluteUrl("/" + slug + "#service"),
        name: s.title,
        serviceType: s.shortTitle,
        description: s.meta,
        url: absoluteUrl("/" + slug),
        mainEntityOfPage: { "@id": absoluteUrl("/" + slug + "#webpage") },
        provider: { "@id": organisationId },
        areaServed: serviceAreas,
      },
    ]} />
  </>;
}

export const dynamicParams = false;
