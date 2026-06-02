/**
 * Renders structured data as a <script type="application/ld+json">. Data is
 * build-time only (from config), never user input, so JSON.stringify is safe.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
