/**
 * Inline SVG icon set — copied verbatim from the original design so every glyph
 * stays pixel-identical. Centralized here to dedupe the markup that repeated
 * across the static pages. `color: currentColor` lets callers tint via CSS.
 */
import type { SVGProps } from 'react';

export type IconName =
  | 'instagram'
  | 'whatsapp'
  | 'telegram'
  | 'phone'
  | 'pin'
  | 'basalam'
  | 'info'
  | 'home'
  | 'leaf'
  | 'sprout'
  | 'clock'
  | 'shield';

const base = { viewBox: '0 0 24 24', 'aria-hidden': true, focusable: false } as const;

export function Icon({ name, ...props }: { name: IconName } & SVGProps<SVGSVGElement>) {
  switch (name) {
    case 'instagram':
      return (
        <svg {...base} fill="none" stroke="currentColor" strokeWidth={1.7} {...props}>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
        </svg>
      );
    case 'whatsapp':
      return (
        <svg {...base} fill="currentColor" {...props}>
          <path d="M12 2a10 10 0 00-8.6 15l-1.3 4.8 4.9-1.3A10 10 0 1012 2zm0 2a8 8 0 016.8 12.2l-.3.5.7 2.5-2.6-.7-.5.3A8 8 0 1112 4zm-3.2 4c-.2 0-.5 0-.7.4-.3.4-1 1-1 2.4s1 2.8 1.2 3c.2.2 2 3.2 5 4.4 2.5 1 3 .8 3.5.7.6 0 1.7-.7 2-1.4.2-.6.2-1.2.2-1.3-.1-.2-.3-.2-.6-.4l-2-1c-.3-.1-.5-.1-.7.1l-.7.9c-.2.2-.3.2-.6.1-.3-.2-1.3-.5-2.5-1.5-.9-.8-1.5-1.8-1.7-2.1-.1-.3 0-.4.2-.6l.4-.5.3-.5v-.5l-.9-2.1c-.2-.5-.4-.4-.6-.4z" />
        </svg>
      );
    case 'telegram':
      return (
        <svg {...base} fill="currentColor" {...props}>
          <path d="M21.9 4.3l-3.3 15.4c-.2 1-.9 1.3-1.8.8l-4.9-3.6-2.4 2.3c-.3.3-.5.5-1 .5l.3-4.9 9-8.1c.4-.3-.1-.5-.6-.2L6 13.7l-4.7-1.5c-1-.3-1-1 .2-1.5L20.6 2.8c.9-.3 1.6.2 1.3 1.5z" />
        </svg>
      );
    case 'phone':
      return (
        <svg {...base} fill="none" stroke="currentColor" strokeWidth={1.6} {...props}>
          <path d="M5 4h3l2 5-2 1c1 2 2 3 4 4l1-2 5 2v3c0 1-1 2-2 2A15 15 0 013 6c0-1 1-2 2-2z" />
        </svg>
      );
    case 'pin':
      return (
        <svg {...base} fill="none" stroke="currentColor" strokeWidth={1.6} {...props}>
          <path d="M12 21s-7-5.2-7-11a7 7 0 0114 0c0 5.8-7 11-7 11z" />
          <circle cx="12" cy="10" r="2.6" />
        </svg>
      );
    case 'basalam':
      return (
        <svg {...base} fill="none" stroke="currentColor" strokeWidth={1.6} {...props}>
          <path d="M5 7h14l-1 13H6z" />
          <path d="M9 7a3 3 0 016 0" />
        </svg>
      );
    case 'info':
      return (
        <svg {...base} fill="none" stroke="currentColor" strokeWidth={1.6} {...props}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 8h.01M11 12h1v4h1" />
        </svg>
      );
    case 'home':
      return (
        <svg {...base} fill="none" stroke="currentColor" strokeWidth={1.6} {...props}>
          <path d="M3 11l9-7 9 7" />
          <path d="M5 10v9h14v-9" />
          <path d="M9 19v-5h6v5" />
        </svg>
      );
    case 'leaf':
      return (
        <svg {...base} fill="none" stroke="currentColor" strokeWidth={1.6} {...props}>
          <path d="M11 20C6 20 4 16 4 12c5 0 7 1 8 4" />
          <path d="M11 20c0-7 3-12 9-13 0 6-2 13-9 13z" />
        </svg>
      );
    case 'sprout':
      return (
        <svg {...base} fill="none" stroke="currentColor" strokeWidth={1.6} {...props}>
          <path d="M5 13a4 4 0 014-4h6a4 4 0 014 4v0a4 4 0 01-4 4H9" />
          <path d="M5 13l-2 5h6" />
          <circle cx="9" cy="6" r="2" />
        </svg>
      );
    case 'clock':
      return (
        <svg {...base} fill="none" stroke="currentColor" strokeWidth={1.6} {...props}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      );
    case 'shield':
      return (
        <svg {...base} fill="none" stroke="currentColor" strokeWidth={1.6} {...props}>
          <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      );
  }
}
