'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { navItems } from '@/config/nav';
import { site } from '@/config/site';
import { Icon } from '@/components/ui/Icon';
import { Divider } from '@/components/ui/Divider';

const normalize = (p: string) => (p !== '/' && p.endsWith('/') ? p.slice(0, -1) : p);

/**
 * Sticky nav + mobile drawer (the interactive chrome from tala.js). Adds
 * `.scrolled` past 8px, toggles the drawer with body-scroll-lock, Esc-to-close,
 * focus management and aria-expanded — a small a11y upgrade over the original.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const active = normalize(pathname);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  // scrolled state
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // body scroll lock + focus management + Esc + simple focus trap
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        return;
      }
      if (e.key === 'Tab' && drawerRef.current) {
        const f = drawerRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])',
        );
        if (f.length === 0) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    burgerRef.current?.focus();
  };

  return (
    <>
      <nav className={scrolled ? 'nav scrolled' : 'nav'}>
        <div className="nav__inner">
          <Link className="brand" href="/" aria-label={site.brandName}>
            <Image src="/images/logo-mark.png" alt={site.brandName} width={42} height={42} priority />
            <span className="brand__txt">
              <span className="brand__name">{site.brandName}</span>
              <span className="brand__tag">{site.tagline}</span>
            </span>
          </Link>
          <div className="nav__links">
            {navItems.map((item) => (
              <Link
                key={item.href}
                className={active === normalize(item.href) ? 'nav__link active' : 'nav__link'}
                href={item.href}
                aria-current={active === normalize(item.href) ? 'page' : undefined}
              >
                {item.short}
              </Link>
            ))}
            <Link className="btn btn-primary nav__cta" href="/order/">
              <Icon name="instagram" />
              سفارش
            </Link>
          </div>
          <button
            ref={burgerRef}
            className="nav__burger"
            aria-label="منو"
            aria-expanded={open}
            aria-controls="mobile-drawer"
            onClick={() => setOpen(true)}
          >
            <span />
          </button>
        </div>
      </nav>

      <div
        ref={drawerRef}
        id="mobile-drawer"
        className={open ? 'drawer open' : 'drawer'}
        role="dialog"
        aria-modal="true"
        aria-label="منوی موبایل"
      >
        <div className="drawer__top">
          <Link className="brand" href="/" onClick={close}>
            <Image
              src="/images/logo-mark.png"
              alt={site.brandName}
              width={40}
              height={40}
              style={{ width: 40, height: 40 }}
            />
            <span className="brand__name">{site.brandName}</span>
          </Link>
          <button ref={closeRef} className="drawer__close" aria-label="بستن" onClick={close}>
            ×
          </button>
        </div>
        <nav className="drawer__links">
          {navItems.map((item) => (
            <Link
              key={item.href}
              className={active === normalize(item.href) ? 'active' : undefined}
              href={item.href}
              onClick={close}
            >
              <span className="idx">{item.index}</span> {item.label}
            </Link>
          ))}
        </nav>
        <div className="drawer__foot">
          <Divider />
          <Link className="btn btn-primary btn--block" href="/order/" onClick={close}>
            سفارش از اینستاگرام
          </Link>
        </div>
      </div>
    </>
  );
}
