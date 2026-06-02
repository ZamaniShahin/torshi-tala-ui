/**
 * Replacement for the design-tool <image-slot>. A positioned frame (its class
 * supplies aspect-ratio + radius + overflow from the design system) holding a
 * next/image with `fill`. Pass a real `sizes` so the right resolution loads;
 * mark the hero `priority` (it's the LCP). Decorative images pass alt="".
 */
import Image from 'next/image';

interface ImageFrameProps {
  /** Design frame class: hero__slot | story-slot | story-hero | prod__img */
  className: string;
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
}

export function ImageFrame({ className, src, alt, sizes, priority = false }: ImageFrameProps) {
  return (
    <div className={className}>
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} style={{ objectFit: 'cover' }} />
    </div>
  );
}
