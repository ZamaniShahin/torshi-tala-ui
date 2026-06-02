import Image from 'next/image';
import type { ReactNode } from 'react';

/** Reusable closing CTA band (used on Home and Story). */
export function CtaBand({
  title,
  lede,
  actions,
}: {
  title: ReactNode;
  lede: ReactNode;
  actions: ReactNode;
}) {
  return (
    <section className="cta-band">
      <div className="container cta-band__inner" data-reveal>
        <Image
          className="cta-band__mark"
          src="/images/logo-mark.png"
          alt=""
          width={76}
          height={76}
          aria-hidden
        />
        <h2 className="display cta-band__title">{title}</h2>
        <p className="cta-band__lede">{lede}</p>
        <div className="row gap-12 wrap" style={{ justifyContent: 'center' }}>
          {actions}
        </div>
      </div>
    </section>
  );
}
