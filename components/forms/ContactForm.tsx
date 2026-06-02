'use client';

import { useState, type FormEvent } from 'react';
import { whatsappContactUrl } from '@/lib/links';

/**
 * Contact form with no backend: on submit it composes a WhatsApp message from
 * the fields and opens wa.me. Mirrors the original markup (ids/classes) so the
 * design is unchanged. Name + phone are required.
 */
export function ContactForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url = whatsappContactUrl(name.trim(), phone.trim(), message.trim());
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <form className="contact-form" data-reveal data-reveal-group="1" onSubmit={onSubmit}>
      <h2 className="h3" style={{ marginBottom: 18 }}>
        برایمان پیام بگذارید
      </h2>
      <div className="field">
        <label htmlFor="cf-name">نام</label>
        <input
          id="cf-name"
          type="text"
          placeholder="نامِ شما"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="field">
        <label htmlFor="cf-phone">شماره تماس</label>
        <input
          id="cf-phone"
          type="tel"
          placeholder="۰۹۱۲ ۰۰۰ ۰۰۰۰"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <div className="field">
        <label htmlFor="cf-msg">پیام</label>
        <textarea
          id="cf-msg"
          rows={4}
          placeholder="سفارش یا پرسشِ خود را بنویسید…"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <button
        className="btn btn-primary btn--block btn--lg"
        type="submit"
        aria-label="ارسال پیام از طریق واتساپ"
      >
        ارسال
      </button>
      <p className="form-note">پاسخ‌گویی معمولاً از طریق اینستاگرام یا واتساپ انجام می‌شود.</p>
    </form>
  );
}
