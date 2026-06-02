import type { Metadata } from 'next';
import { Hero } from '@/components/sections/Hero';
import { TrustMarquee } from '@/components/sections/TrustMarquee';
import { StoryTeaser } from '@/components/sections/StoryTeaser';
import { FeaturedProducts } from '@/components/sections/FeaturedProducts';
import { WhyGrid } from '@/components/sections/WhyGrid';
import { CtaBand } from '@/components/sections/CtaBand';
import { Divider } from '@/components/ui/Divider';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  description:
    'ترشی خانگی و اصیل ایرانی، دست‌ساز و بدون مواد نگهدارنده با بیش از سی سال تجربه. لیته، مخلوط، بادمجان، سیر، خیارشور و فلفل؛ سفارش از اینستاگرام و واتساپ.',
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustMarquee />
      <StoryTeaser />
      <div className="container">
        <Divider />
      </div>
      <FeaturedProducts />
      <WhyGrid />
      <CtaBand
        title={
          <>
            ترشی طلا،
            <br />
            طلای سر سفره است.
          </>
        }
        lede="همان شیشه‌ای که همه اول سراغش می‌روند و طعمش مدت‌ها در خاطر می‌ماند."
        actions={
          <>
            <Button href="/order/" large>
              سفارش از اینستاگرام
            </Button>
            <Button href="/story/" variant="secondary" large>
              دربارهٔ ما
            </Button>
          </>
        }
      />
    </>
  );
}
