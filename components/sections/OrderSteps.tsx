import Link from 'next/link';
import { Divider } from '@/components/ui/Divider';

/** Order page — "سه قدم تا سفرهٔ شما". */
export function OrderSteps() {
  return (
    <div className="order-steps mt-40" data-reveal>
      <Divider />
      <h2 className="h2 center mt-32">سه قدم تا سفرهٔ شما</h2>
      <div className="order-steps__grid mt-32">
        <div className="order-step">
          <span className="order-step__n">۱</span>
          <p>
            محصولِ موردنظرتان را از{' '}
            <Link className="ulink" href="/products/">
              صفحهٔ محصولات
            </Link>{' '}
            انتخاب کنید.
          </p>
        </div>
        <div className="order-step">
          <span className="order-step__n">۲</span>
          <p>از یکی از کانال‌های بالا برای ما پیام بفرستید یا تماس بگیرید.</p>
        </div>
        <div className="order-step">
          <span className="order-step__n">۳</span>
          <p>سفارش‌تان تازه آماده و برایتان ارسال می‌شود.</p>
        </div>
      </div>
    </div>
  );
}
