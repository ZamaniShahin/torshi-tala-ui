/** Looping trust strip (CSS animation). Values duplicated so the loop is seamless. */
const VALUES = ['خانگی', 'بدون مواد نگهدارنده', 'دست‌ساز', 'موادِ تازه', 'تهیهٔ بهداشتی'];

export function TrustMarquee() {
  const items = [...VALUES, ...VALUES];
  return (
    <div className="marquee" aria-label="ارزش‌ها">
      <div className="marquee__track">
        {items.map((v, i) => (
          <span className="marquee__item" key={i}>
            <span className="gem" />
            {v}
          </span>
        ))}
      </div>
    </div>
  );
}
