import type { Metadata } from 'next';
import { PageHead } from '@/components/sections/PageHead';
import { ContactList } from '@/components/sections/ContactList';
import { ContactForm } from '@/components/forms/ContactForm';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumb } from '@/lib/jsonld';

export const metadata: Metadata = {
  title: 'تماس با ما',
  description:
    'راه‌های ارتباط با ترشی طلا برای سفارش، پرسش یا همکاری: اینستاگرام، واتساپ و تماس تلفنی. خوشحال می‌شویم صدای شما را بشنویم.',
  alternates: { canonical: '/contact/' },
};

export default function ContactPage() {
  return (
    <>
      <PageHead
        eyebrow="تماس با ما"
        title={
          <>
            با ما
            <br />
            در ارتباط باشید
          </>
        }
        lede="برای سفارش، پرسش یا همکاری، از راه‌های زیر به ما پیام دهید. خوشحال می‌شویم بشنویم."
      />

      <section className="section section--tight">
        <div className="container contact-grid">
          <ContactList />
          <ContactForm />
        </div>
      </section>

      <JsonLd data={breadcrumb('تماس با ما', '/contact/')} />
    </>
  );
}
