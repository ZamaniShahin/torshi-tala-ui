/**
 * Button/link. Internal hrefs ('/…') render a next/link; everything else
 * (wa.me, instagram, tel:) renders an <a>. External http(s) links open in a new
 * tab with rel="noopener noreferrer"; tel: links open in place.
 */
import Link from 'next/link';
import type { ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps {
  href: string;
  variant?: Variant;
  large?: boolean;
  block?: boolean;
  className?: string;
  ariaLabel?: string;
  children: ReactNode;
}

const variantClass: Record<Variant, string> = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  ghost: 'btn-ghost',
};

export function Button({
  href,
  variant = 'primary',
  large = false,
  block = false,
  className,
  ariaLabel,
  children,
}: ButtonProps) {
  const cls = ['btn', variantClass[variant], large && 'btn--lg', block && 'btn--block', className]
    .filter(Boolean)
    .join(' ');

  if (href.startsWith('/')) {
    return (
      <Link href={href} className={cls} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  const isTel = href.startsWith('tel:');
  return (
    <a
      href={href}
      className={cls}
      aria-label={ariaLabel}
      {...(isTel ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
    >
      {children}
    </a>
  );
}
