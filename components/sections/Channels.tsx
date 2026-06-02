import { site } from '@/config/site';
import { instagramUrl, telUrl, whatsappOrderUrl, basalamUrl } from '@/lib/links';
import { Icon, type IconName } from '@/components/ui/Icon';

interface Channel {
  variant: 'ig' | 'wa' | 'tel' | 'ba';
  icon: IconName;
  label: string;
  optional?: boolean;
  value: string;
  href: string;
  external: boolean;
}

/** Order page — channel cards (each opens the maker's real channel). */
export function Channels() {
  const channels: Channel[] = [
    {
      variant: 'ig',
      icon: 'instagram',
      label: 'اینستاگرام — کانالِ اصلی',
      value: `@${site.contact.instagramHandle}`,
      href: instagramUrl,
      external: true,
    },
    {
      variant: 'wa',
      icon: 'whatsapp',
      label: 'واتساپ',
      value: site.contact.phoneDisplay,
      href: whatsappOrderUrl(),
      external: true,
    },
    {
      variant: 'tel',
      icon: 'phone',
      label: 'تماس تلفنی',
      value: site.contact.phoneDisplay,
      href: telUrl,
      external: false,
    },
  ];

  if (basalamUrl) {
    channels.push({
      variant: 'ba',
      icon: 'basalam',
      label: 'خرید از باسلام',
      optional: true,
      value: 'فروشگاه باسلام',
      href: basalamUrl,
      external: true,
    });
  }

  return (
    <div className="channels">
      {channels.map((c, i) => (
        <a
          key={c.variant}
          className={`channel card channel--${c.variant}`}
          href={c.href}
          data-reveal
          data-reveal-group={i}
          {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          <span className="channel__ic">
            <Icon name={c.icon} />
          </span>
          <div className="channel__txt">
            <span className="channel__k">
              {c.label} {c.optional ? <span className="channel__opt">(اختیاری)</span> : null}
            </span>
            <span className="channel__v">{c.value}</span>
          </div>
          <span className="channel__go">←</span>
        </a>
      ))}
    </div>
  );
}
