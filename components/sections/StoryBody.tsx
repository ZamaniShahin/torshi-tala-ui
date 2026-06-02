import { site } from '@/config/site';

/** Story page — sticky stats aside + prose + pull-quote. */
export function StoryBody() {
  return (
    <section className="section">
      <div className="container story-body">
        <aside className="story-body__aside" data-reveal>
          <div className="story-stat">
            <span className="story-stat__n">۳۰+</span>
            <span className="story-stat__l">سال تجربه</span>
          </div>
          <div className="story-stat">
            <span className="story-stat__n">۰</span>
            <span className="story-stat__l">مادهٔ نگهدارنده</span>
          </div>
          <div className="story-stat">
            <span className="story-stat__n">دست‌ساز</span>
            <span className="story-stat__l">در مقدارهای کم</span>
          </div>
        </aside>
        <div className="story-body__prose" data-reveal data-reveal-group="1">
          <p className="story-lead">
            سی سال است که <span className="gold">{site.ownerName}</span> ترشی را همان‌طور می‌سازد که
            مادر و مادربزرگش می‌ساختند؛ با دست، در مقدارهای کم، و با حوصله‌ای که آشپزخانه‌های امروز
            کمتر سراغش را می‌گیرند.
          </p>
          <p>
            بدون هیچ میان‌بری و بدون کارخانه — فقط سبزیجاتِ خوب، زمان، و دستورهایی که در طول سه دهه
            آرام‌آرام کامل شده‌اند. هر شیشه، نتیجهٔ صبر است: شستن، خرد کردن، چشیدن، و انتظار کشیدن تا
            طعم همان شود که باید.
          </p>
          <p>
            در خانه‌های ایرانی، ترشی همان چیز کوچکی است که سفره را کامل می‌کند؛ و ترشی طلا همان
            شیشه‌ای است که همه اول سراغش می‌روند و طعمش مدت‌ها در خاطر می‌ماند.
          </p>
          <blockquote className="pull">ترشی طلا، طلای سر سفره است.</blockquote>
        </div>
      </div>
    </section>
  );
}
