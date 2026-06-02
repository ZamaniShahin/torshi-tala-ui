import { SectionHead } from '@/components/ui/SectionHead';

const STEPS = [
  { n: '۰۱', title: 'انتخاب مواد', desc: 'تازه‌ترین سبزیجاتِ فصل، دانه‌به‌دانه دست‌چین.' },
  { n: '۰۲', title: 'آماده‌سازی', desc: 'شستن و خرد کردن با دست، بدون عجله.' },
  { n: '۰۳', title: 'دستورِ خانگی', desc: 'ترکیبی که در طول سی سال کامل شده است.' },
  { n: '۰۴', title: 'زمان و صبر', desc: 'انتظار تا طعم به اوج خودش برسد.' },
];

/** Story page — "از سبزی تا سفره" 4-step process. */
export function ProcessStrip() {
  return (
    <section className="section rule-top">
      <div className="container">
        <SectionHead eyebrow="از سبزی تا سفره" title="با همان دقتِ سه دهه پیش" />
        <div className="process mt-40">
          {STEPS.map((s, i) => (
            <div className="process__step" data-reveal data-reveal-group={i} key={s.n}>
              <span className="process__n">{s.n}</span>
              <h3 className="h3">{s.title}</h3>
              <p className="muted">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
