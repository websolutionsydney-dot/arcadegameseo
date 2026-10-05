"use client";

import { useEffect, useState } from "react";
import { QuoteForm } from "./quote-form";

// Keep the complete form in the exported HTML. Query-string defaults are applied
// after hydration so every contact URL shares the existing /contact canonical.
export function ContactForm() {
  const [defaults, setDefaults] = useState({ service: "", area: "" });
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    setDefaults({ service: query.get("service") || "", area: query.get("area") || "" });
  }, []);
  return <QuoteForm key={JSON.stringify(defaults)} initialService={defaults.service} initialArea={defaults.area}/>;
}
