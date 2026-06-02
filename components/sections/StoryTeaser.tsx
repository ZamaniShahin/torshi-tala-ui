import { site } from '@/config/site';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { ImageFrame } from '@/components/ui/ImageFrame';

/** Home story teaser — image + 30-year badge + copy. */
export function StoryTeaser() {
  return (
    <section className="section">
      <div className="container story-teaser">
        <div className="story-teaser__media" data-reveal>
          <ImageFrame
            className="story-slot"
            src="/images/home-hands.webp"
            alt="آماده‌سازی ترشی در آشپزخانه با دست"
            sizes="(max-width: 760px) 100vw, 45vw"
          />
          <div className="story-teaser__badge">
            ۳۰
            <span>
              سال
              <br />
              تجربه
            </span>
          </div>
        </div>
        <div className="story-teaser__copy" data-reveal data-reveal-group="1">
          <Eyebrow>داستان ما</Eyebrow>
          <h2 className="h1 mt-16">همان‌طور که مادر و مادربزرگش می‌ساختند</h2>
          <p className="lede mt-24">
            سی سال است که <span className="gold">{site.ownerName}</span> ترشی را با دست، در مقدارهای
            کم و با حوصله‌ای می‌سازد که آشپزخانه‌های امروز کمتر سراغش را می‌گیرند. بدون هیچ میان‌بری و
            بدون کارخانه — فقط سبزیجاتِ خوب، زمان، و دستورهایی که در طول سه دهه آرام‌آرام کامل شده‌اند.
          </p>
          <Button href="/story/" variant="secondary" className="mt-32">
            ادامهٔ داستان
          </Button>
        </div>
      </div>
    </section>
  );
}
