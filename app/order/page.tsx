import type { Metadata } from 'next';
import { PageHead } from '@/components/sections/PageHead';
import { Channels } from '@/components/sections/Channels';
import { OrderSteps } from '@/components/sections/OrderSteps';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumb, faqPage } from '@/lib/jsonld';

export const metadata: Metadata = {
  title: 'سفارش | چطور ترشی خانگی سفارش بدهیم؟',
  description:
    'سفارش ترشی خانگی ترشی طلا از اینستاگرام، واتساپ، تماس تلفنی یا باسلام. در سه قدم ساده محصول را انتخاب و پیام دهید تا سفارش‌تان تازه آماده و ارسال شود.',
  alternates: { canonical: '/order/' },
};

// Mirrors the visible on-page content (channels + the three steps).
const FAQ = [
  {
    q: 'چطور از ترشی طلا سفارش بدهم؟',
    a: 'سفارش‌ها از طریق اینستاگرام (کانال اصلی)، واتساپ و تماس تلفنی پذیرفته می‌شوند. کافی است محصول موردنظرتان را انتخاب و از یکی از این راه‌ها برای ما پیام بفرستید.',
  },
  {
    q: 'مراحل ثبت سفارش چیست؟',
    a: 'در سه قدم: ۱) محصول موردنظر را از صفحهٔ محصولات انتخاب کنید. ۲) از اینستاگرام، واتساپ یا تلفن برای ما پیام بفرستید. ۳) سفارش‌تان تازه آماده و برایتان ارسال می‌شود.',
  },
];

export default function OrderPage() {
  return (
    <>
      <PageHead
        eyebrow="سفارش"
        title={
          <>
            چطور سفارش
            <br />
            بدهیم؟
          </>
        }
        lede="سفارش‌ها از طریق اینستاگرام، واتساپ یا تماس تلفنی پذیرفته می‌شوند. کانال مورد علاقه‌تان را انتخاب کنید."
      />

      <section className="section section--tight">
        <div className="container">
          <Channels />
          <OrderSteps />
        </div>
      </section>

      <JsonLd data={[faqPage(FAQ), breadcrumb('سفارش', '/order/')]} />
    </>
  );
}
