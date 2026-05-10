export function HorseshoePawDivider({ className = '' }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 300 30"
      preserveAspectRatio="xMidYMid meet"
      className={className}
      aria-hidden="true"
    >
      <line x1="0" y1="15" x2="85" y2="15" stroke="currentColor" strokeOpacity="0.4" strokeWidth="0.6" />
      <line x1="215" y1="15" x2="300" y2="15" stroke="currentColor" strokeOpacity="0.4" strokeWidth="0.6" />

      <g fill="currentColor" transform="translate(95, 7)">
        <path d="M 8 12 C 5 12 3 14 3 17 C 3 20 5 22 8 22 C 9 22 10 21.5 11 21 C 12 21.5 13 22 14 22 C 17 22 19 20 19 17 C 19 14 17 12 14 12 C 13 12 12 12.5 11 13 C 10 12.5 9 12 8 12 Z" />
        <ellipse cx="6" cy="6" rx="2" ry="3" />
        <ellipse cx="11" cy="3" rx="2" ry="3" />
        <ellipse cx="16" cy="6" rx="2" ry="3" />
        <ellipse cx="2" cy="10" rx="1.8" ry="2.5" />
        <ellipse cx="20" cy="10" rx="1.8" ry="2.5" />
      </g>

      <g fill="currentColor" transform="translate(133, 6)">
        <rect x="0" y="0" width="33" height="2.5" />
        <rect x="0" y="5" width="33" height="2.5" />
        <rect x="0" y="10" width="33" height="2.5" />
        <rect x="0" y="15" width="33" height="2.5" />
        <rect x="0" y="20" width="33" height="2.5" />
        <rect x="0" y="0" width="14" height="10" />
      </g>

      <g fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" transform="translate(178, 6)">
        <path d="M 3 2 C 1 5 1 11 3 16 L 5 18" />
        <path d="M 17 2 C 19 5 19 11 17 16 L 15 18" />
        <path d="M 3 2 Q 10 -1 17 2" />
        <circle cx="3" cy="6" r="0.6" fill="currentColor" stroke="none" />
        <circle cx="3" cy="11" r="0.6" fill="currentColor" stroke="none" />
        <circle cx="17" cy="6" r="0.6" fill="currentColor" stroke="none" />
        <circle cx="17" cy="11" r="0.6" fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

export function CompassRose({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 60 60"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden="true"
    >
      <circle cx="30" cy="30" r="28" strokeOpacity="0.3" strokeWidth="0.6" />
      <circle cx="30" cy="30" r="22" strokeOpacity="0.5" strokeWidth="0.6" />
      <path d="M 30 8 L 33 28 L 30 30 L 27 28 Z" fill="currentColor" stroke="none" />
      <path d="M 30 52 L 27 32 L 30 30 L 33 32 Z" fill="currentColor" fillOpacity="0.5" stroke="none" />
      <path d="M 8 30 L 28 27 L 30 30 L 28 33 Z" fill="currentColor" fillOpacity="0.7" stroke="none" />
      <path d="M 52 30 L 32 33 L 30 30 L 32 27 Z" fill="currentColor" fillOpacity="0.7" stroke="none" />
      <path d="M 14 14 L 28 28 L 30 30 L 28 28 Z" fill="currentColor" fillOpacity="0.4" stroke="none" />
      <path d="M 46 14 L 32 28 L 30 30 L 32 28 Z" fill="currentColor" fillOpacity="0.4" stroke="none" />
      <path d="M 14 46 L 28 32 L 30 30 L 28 32 Z" fill="currentColor" fillOpacity="0.4" stroke="none" />
      <path d="M 46 46 L 32 32 L 30 30 L 32 32 Z" fill="currentColor" fillOpacity="0.4" stroke="none" />
      <circle cx="30" cy="30" r="2" fill="currentColor" stroke="none" />
    </svg>
  );
}
