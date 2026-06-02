import Link from 'next/link';
import { Icon, type IconName } from '@/components/ui/Icon';

const REASONS: { icon: IconName; title: string; desc: string }[] = [
  { icon: 'home', title: 'خانگی و دست‌ساز', desc: 'هر شیشه با دست و در خانه تهیه می‌شود، نه در کارخانه.' },
  {
    icon: 'leaf',
    title: 'بدون مواد نگهدارنده',
    desc: 'هیچ ماده‌ی نگهدارنده یا افزودنیِ شیمیایی در کار نیست.',
  },
  { icon: 'sprout', title: 'موادِ اولیه‌ی تازه', desc: 'از بهترین و تازه‌ترین سبزیجاتِ فصل.' },
  { icon: 'clock', title: 'سی سال تجربه', desc: 'دستوری که در طول سه دهه کامل شده است.' },
  { icon: 'shield', title: 'تهیه‌ی بهداشتی', desc: 'با رعایتِ کاملِ بهداشت و کیفیت.' },
];

/** Home "چرا ترشی طلا؟" — 5 reasons + a CTA tile. */
export function WhyGrid() {
  return (
    <section className="section rule-top why">
      <div className="container">
        <div className="why__head" data-reveal>
          <span className="eyebrow">چرا ترشی طلا؟</span>
          <h2 className="h1 mt-16 max-46">آنچه هر شیشه را خاص می‌کند</h2>
        </div>
        <div className="why__grid mt-40">
          {REASONS.map((r, i) => (
            <div className="why__item" data-reveal data-reveal-group={i} key={r.title}>
              <span className="why__ic">
                <Icon name={r.icon} />
              </span>
              <h3 className="h3">{r.title}</h3>
              <p className="muted">{r.desc}</p>
            </div>
          ))}
          <Link className="why__item why__item--cta" href="/order/" data-reveal data-reveal-group="5">
            <h3 className="h3">طعمش را امتحان کنید</h3>
            <p>سفارش از اینستاگرام، واتساپ یا تلفن.</p>
            <span className="why__arrow">←</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
