import type { ReactNode } from 'react';
import { Eyebrow } from './Eyebrow';

/** Centered section header (eyebrow + h2 title + optional lede). */
export function SectionHead({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: ReactNode;
  title: ReactNode;
  lede?: ReactNode;
}) {
  return (
    <div className="section-head center" data-reveal>
      <Eyebrow center>{eyebrow}</Eyebrow>
      <h2 className="h1 mt-16">{title}</h2>
      {lede ? (
        <p className="lede mt-16" style={{ marginInline: 'auto' }}>
          {lede}
        </p>
      ) : null}
    </div>
  );
}
