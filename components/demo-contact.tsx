import { Phone, Mail, Globe } from "lucide-react";
import { demoContact } from "@/lib/demo-contact";

export function DemoContact({compact=false}:{compact?:boolean}) {
  return <div className={`demo-contact${compact?" demo-contact-compact":""}`} aria-label="Demo contact details">
    <span className="demo-contact-label">Demo contact details</span>
    <div className="demo-contact-items">
      <div><Phone size={16} aria-hidden="true"/><span><small>Phone</small>{demoContact.phone}</span></div>
      <div><Mail size={16} aria-hidden="true"/><span><small>Email</small>{demoContact.email}</span></div>
      <div><Globe size={16} aria-hidden="true"/><span><small>Demo domain</small>{demoContact.domain}</span></div>
    </div>
    {!compact&&<p className="demo-contact-note">Placeholder details for this website preview.</p>}
  </div>;
}
