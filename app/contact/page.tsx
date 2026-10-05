import { pageGraph, pageMetadata } from "@/lib/seo";
import { StructuredData } from "@/components/structured-data";
import { MapPin, Gamepad2, CalendarDays, ArrowUpRight } from "lucide-react";
import { Eyebrow } from "@/components/site-sections";
import { ContactForm } from "@/components/contact-form";
import { DemoContact } from "@/components/demo-contact";
const title = "Arcade Machine Quotes — Sydney & NSW";
const description = "Request a quote for arcade machine hire, claw machine hire, venue placement, sales or installation. Send Arcade Game Australia your location and plans.";
export const metadata = pageMetadata(title, description, "/contact");
export default function Contact(){return <><section className="simple-hero"><div className="container"><nav className="breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span>/</span><span>Contact & quotes</span></nav><Eyebrow>Let’s get the ball rolling</Eyebrow><h1>GET AN ARCADE<br/>MACHINE QUOTE.</h1><p>Tell us which service you need and your suburb or postcode. Add your event date or project timing, and any machine preferences. These details help us prepare a quote for the job.</p></div></section><section className="section container contact-layout"><aside className="contact-aside"><Eyebrow>A few details are all it takes</Eyebrow><h2>LET’S FIND<br/>YOUR KIND<br/>OF FUN.</h2><p>For event hire, include guest numbers and the venue’s delivery window. For a purchase or venue setup, include the intended use, available space and access details.</p><ul><li><Gamepad2 size={18}/>Hire, placement, sales & installation</li><li><MapPin size={18}/>Sydney, surrounding regions & NSW</li><li><CalendarDays size={18}/>Availability confirmed for your enquiry</li></ul><DemoContact/><p>Not sure which service to choose?</p><a href="/#services" className="text-link">Explore your options <ArrowUpRight size={16}/></a></aside><ContactForm/></section><StructuredData graph={pageGraph("/contact", title, description, "ContactPage")}/></>}
