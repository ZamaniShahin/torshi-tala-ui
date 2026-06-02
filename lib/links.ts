/**
 * Order/contact deep-links. There is no backend or cart — every "order" action
 * opens the maker's own channel (WhatsApp with a prefilled Persian message,
 * Instagram, phone, Telegram, Basalam). All identifiers come from config/site.
 */
import { site } from '@/config/site';

const enc = encodeURIComponent;

/** WhatsApp order link; names the product in the prefilled message when given. */
export function whatsappOrderUrl(productName?: string): string {
  const text = productName
    ? `سلام! مایل به سفارش «${productName}» از ترشی طلا هستم.`
    : 'سلام! مایل به ثبت سفارش از ترشی طلا هستم.';
  return `https://wa.me/${site.contact.whatsappE164}?text=${enc(text)}`;
}

/** WhatsApp link carrying a contact-form submission (no server needed). */
export function whatsappContactUrl(name: string, phone: string, message: string): string {
  const text =
    `سلام! من ${name || '—'} هستم.\n` +
    `شمارهٔ تماس: ${phone || '—'}\n` +
    `پیام: ${message || '—'}\n` +
    '— ارسال‌شده از سایت ترشی طلا';
  return `https://wa.me/${site.contact.whatsappE164}?text=${enc(text)}`;
}

export const instagramUrl = `https://instagram.com/${site.contact.instagramHandle}`;
export const telUrl = `tel:${site.contact.phoneE164}`;
export const telegramUrl = site.contact.telegramHandle
  ? `https://t.me/${site.contact.telegramHandle}`
  : '';
export const basalamUrl = site.contact.basalamUrl;
