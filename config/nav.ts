/** Primary navigation — shared by the desktop nav and the mobile drawer. */

export interface NavItem {
  /** Full label (used in the mobile drawer). */
  label: string;
  /** Compact label (used in the desktop nav bar). */
  short: string;
  href: string;
  /** Persian-digit index shown in the mobile drawer (۰۱…۰۵). */
  index: string;
}

export const navItems: NavItem[] = [
  { label: 'صفحه اصلی', short: 'صفحه اصلی', href: '/', index: '۰۱' },
  { label: 'داستان ما', short: 'داستان ما', href: '/story/', index: '۰۲' },
  { label: 'محصولات', short: 'محصولات', href: '/products/', index: '۰۳' },
  { label: 'سفارش', short: 'سفارش', href: '/order/', index: '۰۴' },
  { label: 'تماس با ما', short: 'تماس', href: '/contact/', index: '۰۵' },
];
