import type { Metadata } from 'next';
import { PageHead } from '@/components/sections/PageHead';
import { StoryBody } from '@/components/sections/StoryBody';
import { ProcessStrip } from '@/components/sections/ProcessStrip';
import { CtaBand } from '@/components/sections/CtaBand';
import { ImageFrame } from '@/components/ui/ImageFrame';
import { Button } from '@/components/ui/Button';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumb } from '@/lib/jsonld';

export const metadata: Metadata = {
  title: 'داستان ما',
  description:
    'داستان ترشی طلا؛ بیش از سی سال ترشی‌اندازیِ خانگی و دست‌ساز، همان‌طور که مادران و مادربزرگ‌ها می‌ساختند. بدون کارخانه، بدون مواد نگهدارنده، با حوصله.',
  alternates: { canonical: '/story/' },
};

export default function StoryPage() {
  return (
    <>
      <PageHead
        eyebrow="داستان ما"
        title={
          <>
            سی سال،
            <br />
            یک شیشه ترشی
          </>
        }
        lede="ترشی همان چیز کوچکی است که سفرهٔ ایرانی را کامل می‌کند. این داستانِ همان شیشه است."
      />

      <section className="container" data-reveal>
        <ImageFrame
          className="story-hero"
          src="/images/story-hero.webp"
          alt="میز چوبی با شیشه‌های ترشیِ خانگی و سبزیجات تازه"
          sizes="100vw"
        />
      </section>

      <StoryBody />
      <ProcessStrip />

      <CtaBand
        title="طعمی که می‌ماند"
        lede="ترشی‌های خانگی ترشی طلا را ببینید و سفارش دهید."
        actions={
          <>
            <Button href="/products/" large>
              مشاهده محصولات
            </Button>
            <Button href="/order/" variant="secondary" large>
              سفارش
            </Button>
          </>
        }
      />

      <JsonLd data={breadcrumb('داستان ما', '/story/')} />
    </>
  );
}
