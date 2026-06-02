import type { Metadata } from 'next';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'صفحه پیدا نشد',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <header className="page-head">
      <div className="container">
        <span className="eyebrow">۴۰۴</span>
        <h1 className="display page-head__title">صفحه پیدا نشد</h1>
        <p className="lede page-head__lede">
          صفحه‌ای که دنبالش بودید پیدا نشد. شاید نشانی تغییر کرده باشد. از اینجا به صفحهٔ اصلی برگردید.
        </p>
        <div className="row gap-12 wrap mt-32">
          <Button href="/" large>
            بازگشت به صفحهٔ اصلی
          </Button>
          <Button href="/products/" variant="secondary" large>
            مشاهده محصولات
          </Button>
        </div>
      </div>
    </header>
  );
}
