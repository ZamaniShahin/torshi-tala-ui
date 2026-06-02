import type { ReactNode } from 'react';

/** Gold diamond + label used above section titles. */
export function Eyebrow({ children, center = false }: { children: ReactNode; center?: boolean }) {
  return (
    <span className="eyebrow" style={center ? { justifyContent: 'center' } : undefined}>
      {children}
    </span>
  );
}
