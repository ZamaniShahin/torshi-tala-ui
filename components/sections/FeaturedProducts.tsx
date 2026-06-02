import { featuredProducts } from '@/config/products';
import { Button } from '@/components/ui/Button';
import { SectionHead } from '@/components/ui/SectionHead';
import { ProductCard } from '@/components/ui/ProductCard';

/** Home featured grid — the three flagged products. */
export function FeaturedProducts() {
  return (
    <section className="section">
      <div className="container">
        <SectionHead
          eyebrow="محصولات ما"
          title="از سفرهٔ ما به سفرهٔ شما"
          lede="همهٔ ترشی‌ها خانگی، تازه و بدون مواد نگهدارنده تهیه می‌شوند."
        />
        <div className="prod-grid mt-40">
          {featuredProducts.map((product, i) => (
            <ProductCard key={product.slug} product={product} group={i} />
          ))}
        </div>
        <div className="center mt-40" data-reveal>
          <Button href="/products/" variant="secondary" large>
            همهٔ محصولات
          </Button>
        </div>
      </div>
    </section>
  );
}
