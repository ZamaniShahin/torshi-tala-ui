/** Aubergine footer — brand, page links, contact channels, socials. Server. */
import Link from 'next/link';
import Image from 'next/image';
import { site } from '@/config/site';
import { navItems } from '@/config/nav';
import { instagramUrl, telegramUrl, telUrl, whatsappOrderUrl } from '@/lib/links';
import { Icon } from '@/components/ui/Icon';

export function Footer() {
  return (
    <footer className="footer">
      <Image
        className="footer__watermark"
        src="/images/logo-mark.png"
        alt=""
        width={360}
        height={336}
        aria-hidden
      />
      <div className="footer__inner">
        <div className="footer__grid">
          <div className="footer__brand">
            <Image src="/images/logo-mark.png" alt={site.brandName} width={64} height={64} />
            <div className="footer__name">{site.brandName}</div>
            <p style={{ color: '#D9C6B2', maxWidth: '34ch' }}>
              خانگی و اصیل — طلای سر سفره. دست‌ساز، در مقدارهای کم و بدون مواد نگهدارنده.
            </p>
          </div>

          <div>
            <h4>صفحه‌ها</h4>
            <div className="footer__links">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4>ارتباط با ما</h4>
            <div className="footer__links">
              <a href={instagramUrl} target="_blank" rel="noopener noreferrer">
                اینستاگرام: @{site.contact.instagramHandle}
              </a>
              <a href={whatsappOrderUrl()} target="_blank" rel="noopener noreferrer">
                واتساپ
              </a>
              <a href={telUrl}>تلفن: {site.contact.phoneDisplay}</a>
              <span style={{ color: '#E9D9C5' }}>شهر: {site.contact.city}</span>
            </div>
            <div className="footer__social">
              <a href={instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="اینستاگرام">
                <Icon name="instagram" />
              </a>
              <a href={whatsappOrderUrl()} target="_blank" rel="noopener noreferrer" aria-label="واتساپ">
                <Icon name="whatsapp" />
              </a>
              {telegramUrl ? (
                <a href={telegramUrl} target="_blank" rel="noopener noreferrer" aria-label="تلگرام">
                  <Icon name="telegram" />
                </a>
              ) : null}
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© ۱۴۰۵ ترشی طلا. تمامی حقوق محفوظ است.</span>
          <span>خانگی · بدون نگهدارنده · دست‌ساز</span>
        </div>
      </div>
    </footer>
  );
}
