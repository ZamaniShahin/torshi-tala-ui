import type { Metadata } from 'next';
import { getProducts } from '@/lib/api';
import { PageHead } from '@/components/sections/PageHead';
import { ProductCard } from '@/components/ui/ProductCard';
import { ProductNote } from '@/components/sections/ProductNote';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumb, productsJsonLd } from '@/lib/jsonld';

export const metadata: Metadata = {
  title: 'محصولات | لیست قیمت ترشی خانگی',
  description:
    'لیست محصولات و قیمت ترشی خانگی ترشی طلا: ترشی لیته، مخلوط، بادمجان، سیر، خیارشور و فلفل. همه دست‌ساز، تازه و بدون مواد نگهدارنده. قیمت‌ها به تومان.',
  alternates: { canonical: '/products/' },
};

export default async function ProductsPage() {
  const products = await getProducts();
  return (
    <>
      <PageHead
        eyebrow="محصولات ما"
        title={
          <>
            از سفرهٔ ما
            <br />
            به سفرهٔ شما
          </>
        }
        lede="همهٔ ترشی‌ها خانگی، تازه و بدون مواد نگهدارنده تهیه می‌شوند. قیمت‌ها به تومان است."
      />

      <section className="section section--tight">
        <div className="container">
          <div className="prod-grid">
            {products.map((product, i) => (
              <ProductCard key={product.slug} product={product} group={i % 3} />
            ))}
          </div>
          <ProductNote />
        </div>
      </section>

      <JsonLd data={[...productsJsonLd(), breadcrumb('محصولات', '/products/')]} />
    </>
  );
}
