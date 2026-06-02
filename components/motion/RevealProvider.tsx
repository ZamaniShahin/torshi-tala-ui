'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Scroll-reveal — the exact behavior from the original tala.js, but mounted
 * once in the layout. Finds every [data-reveal], applies the staggered
 * --reveal-delay (group × 90ms), then reveals via one IntersectionObserver.
 * Re-runs on route change so each page's nodes get observed. Respects
 * prefers-reduced-motion. Content is always in the DOM (server-rendered), so
 * this only animates; the .no-js CSS fallback covers the JS-off case.
 */
export function RevealProvider() {
  const pathname = usePathname();

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));

    els.forEach((el) => {
      if (!el.style.getPropertyValue('--reveal-delay')) {
        const grp = el.getAttribute('data-reveal-group');
        if (grp) el.style.setProperty('--reveal-delay', `${parseInt(grp, 10) * 90}ms`);
      }
    });

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      els.forEach((el) => el.classList.add('in'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
