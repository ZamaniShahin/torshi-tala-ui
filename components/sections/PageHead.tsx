import type { ReactNode } from 'react';

/** Inner-page header — holds the page <h1>. */
export function PageHead({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: ReactNode;
  title: ReactNode;
  lede: ReactNode;
}) {
  return (
    <header className="page-head">
      <div className="container">
        <span className="eyebrow" data-reveal>
          {eyebrow}
        </span>
        <h1 className="display page-head__title" data-reveal data-reveal-group="1">
          {title}
        </h1>
        <p className="lede page-head__lede" data-reveal data-reveal-group="2">
          {lede}
        </p>
      </div>
    </header>
  );
}
