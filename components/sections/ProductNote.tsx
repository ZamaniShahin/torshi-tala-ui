import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';

/** Products page — note card directing to the order channels. */
export function ProductNote() {
  return (
    <div className="prod-note card mt-40" data-reveal>
      <span className="prod-note__ic">
        <Icon name="info" />
      </span>
      <p>
        سفارش‌ها از طریق اینستاگرام، واتساپ یا تماس تلفنی پذیرفته می‌شوند. برای تعدادِ بیشتر یا سفارشِ
        خاص، با ما در ارتباط باشید.
      </p>
      <Button href="/order/">چطور سفارش بدهیم؟</Button>
    </div>
  );
}
