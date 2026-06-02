import { site } from '@/config/site';
import { instagramUrl, telUrl, whatsappOrderUrl } from '@/lib/links';
import { Icon } from '@/components/ui/Icon';

/** Contact page — channel rows (Instagram / WhatsApp / phone) + city. */
export function ContactList() {
  return (
    <div className="contact-list" data-reveal>
      <a className="contact-row" href={instagramUrl} target="_blank" rel="noopener noreferrer">
        <span className="contact-row__ic">
          <Icon name="instagram" />
        </span>
        <span>
          <span className="contact-row__k">اینستاگرام</span>
          <br />
          <span className="contact-row__v">@{site.contact.instagramHandle}</span>
        </span>
      </a>
      <a className="contact-row" href={whatsappOrderUrl()} target="_blank" rel="noopener noreferrer">
        <span className="contact-row__ic">
          <Icon name="whatsapp" />
        </span>
        <span>
          <span className="contact-row__k">واتساپ</span>
          <br />
          <span className="contact-row__v">{site.contact.phoneDisplay}</span>
        </span>
      </a>
      <a className="contact-row" href={telUrl}>
        <span className="contact-row__ic">
          <Icon name="phone" />
        </span>
        <span>
          <span className="contact-row__k">تلفن</span>
          <br />
          <span className="contact-row__v">{site.contact.phoneDisplay}</span>
        </span>
      </a>
      <div className="contact-row" style={{ borderBottom: 0 }}>
        <span className="contact-row__ic">
          <Icon name="pin" />
        </span>
        <span>
          <span className="contact-row__k">شهر</span>
          <br />
          <span className="contact-row__v">{site.contact.city}</span>
        </span>
      </div>
    </div>
  );
}
