import { ArrowUpRight } from "lucide-react";
import { regions, services } from "@/lib/content";
import { regionGuides, regionalPlanning } from "@/lib/region-guides";
import { absoluteUrl, pageGraph, pageMetadata } from "@/lib/seo";
import { CTA, Eyebrow, FAQ } from "@/components/site-sections";
import { StructuredData } from "@/components/structured-data";

const title = "Arcade Hire & Placement Areas — Sydney & NSW";
const description = "Arcade and claw hire, placement, sales and installation enquiries across Sydney, Wollongong, Illawarra, the Central Coast and greater NSW.";
export const metadata = pageMetadata(title, description, "/service-areas");
const areaFaqs = [
  { question: "Does the service area list guarantee delivery to my suburb?", answer: "Send your exact suburb or postcode so availability, the delivery route and travel costs can be checked. The seven regions describe our enquiry areas; a booking is confirmed only after the equipment and practical arrangements are agreed." },
  { question: "Can I enquire about all five services in these regions?", answer: "Yes. Tell us whether you need arcade machine hire, claw machine hire, commercial venue placement, arcade machine sales, or amusement machine supply and installation. Feasibility and availability depend on the specific equipment, location and timing." },
  { question: "What details help with a regional quote?", answer: "Include the town or suburb, postcode, dates, hire duration or project timing, loading access and any venue delivery restrictions. If equipment needs to be collected after an event, include that timing as well." },
];

export default function Areas() {
  return <>
    <section className="simple-hero"><div className="container">
      <nav className="breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span>/</span><span aria-current="page">Service areas</span></nav>
      <Eyebrow>Good times, closer to you</Eyebrow>
      <h1>ARCADE HIRE & PLACEMENT.<br />SYDNEY & BEYOND.</h1>
      <p>Explore arcade and claw machine hire, commercial venue placement, arcade machine sales, supply and installation across Sydney and NSW. Equipment availability, delivery and installation arrangements are confirmed for your exact location.</p>
    </div></section>
    <nav className="container region-jump-links" aria-label="Choose your service area">{regions.map(region => <a href={"#" + region.slug} key={region.slug}>{region.name}</a>)}</nav>
    <section className="section container area-grid">{regions.map((region, i) => <article className="area-card" key={region.slug} id={region.slug}>
      <Eyebrow>0{i + 1} / New South Wales</Eyebrow><h2>{region.name.toUpperCase()}</h2>
      <p>{regionGuides[region.slug]}</p><p>{region.description}</p>
      <div className="region-planning"><h3>{regionalPlanning[region.slug].heading}</h3><ul>{regionalPlanning[region.slug].questions.map(question => <li key={question}>{question}</li>)}</ul><a className="text-link" href={"/guides/" + regionalPlanning[region.slug].guideSlug}>{regionalPlanning[region.slug].guideLabel}<ArrowUpRight size={16}/></a></div>
      <a href={"/contact?area=" + encodeURIComponent(region.name)} className="text-link">Enquire for {region.name}<ArrowUpRight size={16} /></a>
    </article>)}</section>
    <section className="preparation"><div className="container content-split">
      <div><Eyebrow>Choose the service for your location</Eyebrow><h2>A LOCATION.<br />AN IDEA.<br />LET’S START THERE.</h2></div>
      <div className="prose"><p>Explore the service you need for details on equipment, costs to discuss and planning your setup.</p>
        <div className="area-service-links">{services.map(service => <a href={"/" + service.slug} key={service.slug}>{service.shortTitle}<ArrowUpRight size={16} /></a>)}</div>
        <p>For a useful quote, include your suburb or postcode, service, preferred dates and access details. A service area listing does not mean every machine is available at every location or that delivery is included in the equipment price.</p>
      </div>
    </div></section>
    <section className="section container faq-layout"><div><Eyebrow>Before you book</Eyebrow><h2>YOUR LOCATION.<br />YOUR QUESTIONS.</h2></div><FAQ items={areaFaqs} /></section>
    <CTA />
    <StructuredData graph={[
      ...pageGraph("/service-areas", title, description, "CollectionPage"),
      { "@type": "ItemList", "@id": absoluteUrl("/service-areas#regions"), name: "Sydney and NSW service enquiry areas", itemListElement: regions.map((region, index) => ({ "@type": "ListItem", position: index + 1, name: region.name, url: absoluteUrl("/service-areas#" + region.slug) })) },
    ]} />
  </>;
}
