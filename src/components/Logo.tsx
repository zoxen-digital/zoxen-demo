/** The Zoxen "OX + orbit" mark and wordmark, same as the portal. Dark strokes follow the theme. */
export function Logo() {
  return (
    <span className="flex items-center gap-2.5">
      <svg viewBox="0 0 140 92" className="h-9 w-auto shrink-0" aria-hidden="true">
        <defs>
          <linearGradient id="zx-g" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#2639E8" />
            <stop offset="100%" stopColor="#6C3BF5" />
          </linearGradient>
          <clipPath id="zx-front">
            <rect x="-40" y="50" width="240" height="80" transform="rotate(-16 70 50)" />
          </clipPath>
        </defs>
        <ellipse cx="70" cy="50" rx="64" ry="15" transform="rotate(-16 70 50)" fill="none" stroke="url(#zx-g)" strokeWidth="5" />
        <circle cx="44" cy="48" r="25" fill="none" stroke="var(--mark)" strokeWidth="13" />
        <polygon points="72,20 90,20 124,76 106,76" fill="var(--mark)" />
        <polygon points="112,20 132,20 110,46 98,38" fill="url(#zx-g)" />
        <ellipse cx="70" cy="50" rx="64" ry="15" transform="rotate(-16 70 50)" fill="none" stroke="url(#zx-g)" strokeWidth="5" clipPath="url(#zx-front)" />
        <line x1="72" y1="13" x2="84" y2="9" stroke="var(--mark)" strokeWidth="2" strokeLinecap="round" />
        <circle cx="93" cy="7" r="6" fill="url(#zx-g)" />
      </svg>
      <span className="leading-none">
        <span className="font-display block text-[17px] font-extrabold tracking-[0.12em] text-heading">ZOXEN</span>
        <span className="mt-1 block text-[8.5px] font-bold tracking-[0.42em] text-accent">DIGITAL</span>
      </span>
    </span>
  );
}
