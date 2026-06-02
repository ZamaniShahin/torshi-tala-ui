import { site } from '@/config/site';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { ImageFrame } from '@/components/ui/ImageFrame';

/** Home hero — holds the page <h1>. */
export function Hero() {
  return (
    <header className="hero">
      <div className="hero__ornament" aria-hidden />
      <div className="container hero__inner">
        <div className="hero__copy">
          <span className="eyebrow" data-reveal>
            دست‌پختِ خانگی · بیش از سی سال تجربه
          </span>
          <h1 className="display hero__title" data-reveal data-reveal-group="1">
            طلای
            <br />
            سر سفره
          </h1>
          <p className="lede hero__lede" data-reveal data-reveal-group="2">
            ترشی خانگی و اصیل، دست‌پختِ <span className="gold">{site.ownerName}</span>، با بیش از سی
            سال تجربه — بدون مواد نگهدارنده، در مقدارهای کم و با حوصله.
          </p>
          <div className="hero__cta row gap-12 wrap" data-reveal data-reveal-group="3">
            <Button href="/products/" large>
              مشاهده محصولات
            </Button>
            <Button href="/order/" variant="secondary" large>
              <Icon name="instagram" />
              سفارش از اینستاگرام
            </Button>
          </div>
        </div>
        <div className="hero__media" data-reveal data-reveal-group="2">
          <div className="hero__frame" />
          <ImageFrame
            className="hero__slot"
            src="/images/hero-jar.webp"
            alt="شیشهٔ ترشیِ خانگیِ ترشی طلا در دستان سازنده"
            sizes="(max-width: 860px) 100vw, 45vw"
            priority
          />
          <div className="hero__chip card">
            <span className="hero__chip-k">از سال</span>
            <span className="hero__chip-v">{site.foundingYearFa}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
