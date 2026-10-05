export function StructuredData({ graph }: { graph: Record<string, unknown>[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{
    __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c"),
  }} />;
}
