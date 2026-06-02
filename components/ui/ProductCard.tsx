/**
 * One product card. The "سفارش" button deep-links to WhatsApp with the product
 * name prefilled (no cart/backend). Used by the Home featured grid and the
 * Products page.
 */
import type { Product } from '@/config/products';
import { formatToman } from '@/lib/format';
import { whatsappOrderUrl } from '@/lib/links';
import { ImageFrame } from './ImageFrame';

const SIZES = '(max-width: 540px) 100vw, (max-width: 860px) 50vw, 33vw';

export function ProductCard({ product, group }: { product: Product; group: number }) {
  return (
    <article className="prod card" data-reveal data-reveal-group={group}>
      <ImageFrame className="prod__img" src={product.image} alt={product.alt} sizes={SIZES} />
      <div className="prod__body">
        <h3 className="h3">{product.name}</h3>
        <p className="muted small">{product.description}</p>
        <div className="prod__foot">
          <span className="prod__price">
            {formatToman(product.priceToman)} <span>تومان</span>
          </span>
          <a
            className="btn btn-primary prod__btn"
            href={whatsappOrderUrl(product.name)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`سفارش ${product.name} از واتساپ`}
          >
            سفارش
          </a>
        </div>
      </div>
    </article>
  );
}
