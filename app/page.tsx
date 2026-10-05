import { ArrowDown, ArrowUpRight, Gamepad2, MoveUpRight, Sparkles, MapPin, Check, Plus } from "lucide-react";
import { CTA, Eyebrow, FAQ } from "@/components/site-sections";
import { regions, homeFaqs } from "@/lib/content";
import { pageGraph } from "@/lib/seo";
import { StructuredData } from "@/components/structured-data";
import { RelatedGuides } from "@/components/related-guides";

export default function Home() {
  return <>
    <section className="hero">
      <div className="hero-image"><img src="/images/arcade-hero.webp" width={1672} height={941} alt="Illustrative arcade cabinets and a claw machine with colourful lights" fetchPriority="high" /></div>
      <div className="container hero-content">
        <Eyebrow><span className="live-dot" /> Sydney & New South Wales</Eyebrow>
        <h1>ARCADE GAMES.<br /><span>SYDNEY & NSW.</span></h1>
        <p className="hero-intro">Arcade Game Australia brings more play to your space.<br className="desktop-break" /> Arcade and claw machine hire, commercial venue placement, machine sales, supply and installation.</p>
        <div className="button-row"><a href="/contact" className="button button-brand">Let’s get the ball rolling <ArrowUpRight size={19} /></a><a href="#services" className="text-link light">Explore our services <ArrowDown size={17} /></a></div>
        <div className="hero-footer"><span>FOR VENUES. FOR EVENTS. FOR THE FUN OF IT.</span><span className="image-note">Illustrative machines</span></div>
      </div>
      <div className="hero-side-label">PRESS START ON SOMETHING GOOD</div>
    </section>
    <div className="ticker" aria-label="Hire, placement, sales and installation"><div>MORE PLAY <Plus size={19}/><span>MORE CONNECTION</span><Plus size={19}/> MORE GOOD TIMES <Plus size={19}/><span>ARCADE GAME AUSTRALIA</span><Plus size={19}/></div></div>
    <section className="section container" id="services">
      <div className="section-heading"><div><Eyebrow>01 / Find your kind of fun</Eyebrow><h2>A LITTLE PLAY.<br />A LOT OF POSSIBILITIES.</h2></div><p>For a single event, start with arcade or claw machine hire. For an ongoing games area, explore venue placement or buying your own equipment. Supply and installation brings the equipment and the site plan together.</p></div>
      <div className="service-grid">
        <a className="service-card card-arcade" href="/arcade-machine-hire"><img src="/images/arcade-hero.webp" width={1672} height={941} alt="Colourfully lit arcade game cabinets" loading="lazy"/><div className="card-top"><span>01 / HIRE</span><span className="circle-arrow"><ArrowUpRight /></span></div><div className="card-copy"><h3>LEVEL UP<br />YOUR EVENT.</h3><p>Arcade machine hire for parties, corporate events and celebrations.</p><span className="card-link">Explore arcade hire <ArrowUpRight size={17}/></span></div></a>
        <a className="service-card card-claw" href="/claw-machine-hire"><img src="/images/claw-machine.webp" width={1000} height={1333} alt="An illuminated claw machine with colourful prizes" loading="lazy"/><div className="card-top"><span>02 / CLAW MACHINES</span><span className="circle-arrow"><ArrowUpRight /></span></div><div className="card-copy"><h3>ONE MORE<br />GO?</h3><p>Claw machine hire with a little suspense and a lot of personality.</p><span className="card-link">Explore claw hire <ArrowUpRight size={17}/></span></div></a>
        <a className="service-card card-placement" href="/arcade-machine-placement"><div className="card-top"><span>03 / VENUE PLACEMENT</span><span className="circle-arrow dark"><ArrowUpRight /></span></div><Gamepad2 className="placement-icon" strokeWidth={1}/><div className="card-copy"><h3>MAKE ROOM<br />FOR PLAY.</h3><p>Explore a permanent arcade or claw machine setup for your venue.</p><span className="card-link">Let’s talk placement <ArrowUpRight size={17}/></span></div></a>
      </div>
      <div className="secondary-services"><a href="/arcade-machines-for-sale"><span className="small-number">04</span><div><h3>MAKE IT YOURS.</h3><p>Arcade machines for sale</p></div><ArrowUpRight/></a><a href="/amusement-machine-supply-installation"><span className="small-number">05</span><div><h3>BRING IT ALL TOGETHER.</h3><p>Amusement machine supply & installation</p></div><ArrowUpRight/></a></div>
    </section>
    <section className="venue-section"><div className="container venue-layout"><div className="venue-visual"><img src="/images/claw-machine.webp" width={1000} height={1333} alt="Illustrative claw machine for a games area" loading="lazy"/><div className="image-stamp"><Sparkles size={23}/><span>SMALL SPACE.<br/>BIG PLAY ENERGY.</span></div></div><div className="venue-copy"><Eyebrow>For the places people come together</Eyebrow><h2>GIVE THEM<br />A REASON TO<br /><em>STAY & PLAY.</em></h2><p>A games area gives visitors another activity to enjoy while they are at your venue. Plan arcade and claw machine placement around your audience, the available space and how the area will operate.</p><div className="venue-types">{["Pubs & clubs", "RSLs", "Shopping centres", "Cinemas", "Play centres", "Entertainment venues"].map(t=><span key={t}><Check size={14}/>{t}</span>)}</div><a href="/arcade-machine-placement" className="button button-brand">Explore venue placement <ArrowUpRight size={18}/></a></div></div></section>
    <section className="section container"><div className="section-heading"><div><Eyebrow>02 / From idea to game on</Eyebrow><h2>LET’S MAKE IT HAPPEN.</h2></div><p>Start with the service and location. Dates, room dimensions and game preferences help, but you do not need a complete brief to get in touch.</p></div><div className="steps">{[["01","Tell us your idea","A party, a venue or your own games room? Share your location, timing and the kind of experience you want."],["02","Find the right fit","Match the available machines to your space and intended use, with the delivery requirements included in the quote."],["03","Get ready to play","Review the equipment, dates, price and delivery arrangements, then agree the booking or project details."]].map(([n,t,d])=><div className="step" key={n}><span className="step-number">{n}<MoveUpRight size={22}/></span><h3>{t}</h3><p>{d}</p></div>)}</div></section>
    <section className="areas-section"><div className="container areas-layout"><div><Eyebrow><MapPin size={14}/> Our neighbourhood, and beyond</Eyebrow><h2>SYDNEY.<br />THE COAST.<br /><span>YOUR NEXT EVENT.</span></h2><p>Our service enquiries cover metropolitan Sydney, the surrounding regions and greater NSW. Choose your area for the details to include in a delivery or installation enquiry.</p><a href="/service-areas" className="text-link">See our service areas <ArrowUpRight size={18}/></a></div><div className="region-list">{regions.map((r,i)=><a key={r.slug} href={`/service-areas#${r.slug}`}><span className="region-no">0{i+1}</span>{r.name}<ArrowUpRight size={19}/></a>)}</div></div></section>
    <section className="section container faq-layout"><div><Eyebrow>03 / Good questions</Eyebrow><h2>BEFORE YOU<br />PRESS START.</h2><p>Have something else in mind?</p><a className="text-link" href="/contact">Ask us a question <ArrowUpRight size={17}/></a></div><FAQ items={homeFaqs}/></section>
    <RelatedGuides />
    <CTA />
    <StructuredData graph={pageGraph("/", "Arcade Game Australia — Arcade Games Sydney & NSW", "Arcade and claw machine hire, commercial venue placement, arcade machine sales, amusement machine supply and installation across Sydney and NSW.")} />
  </>;
}
