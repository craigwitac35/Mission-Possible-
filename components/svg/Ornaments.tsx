// Icon components for Mission Possible
// Used in the hero icon trio and decorative accents

export function HorseshoeIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M 8 6 C 4 10 4 18 8 24 L 10 26" />
      <path d="M 24 6 C 28 10 28 18 24 24 L 22 26" />
      <path d="M 8 6 Q 16 2 24 6" />
      <circle cx="8" cy="11" r="0.8" fill="currentColor" />
      <circle cx="8" cy="17" r="0.8" fill="currentColor" />
      <circle cx="24" cy="11" r="0.8" fill="currentColor" />
      <circle cx="24" cy="17" r="0.8" fill="currentColor" />
    </svg>
  );
}

export function PawIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <ellipse cx="9" cy="11" rx="2.5" ry="3.5" />
      <ellipse cx="16" cy="8" rx="2.8" ry="3.8" />
      <ellipse cx="23" cy="11" rx="2.5" ry="3.5" />
      <ellipse cx="5" cy="17" rx="2.2" ry="3" />
      <ellipse cx="27" cy="17" rx="2.2" ry="3" />
      <path d="M 10 21 Q 16 16 22 21 Q 24 26 16 28 Q 8 26 10 21 Z" />
    </svg>
  );
}

export function CaduceusIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M 16 3 L 26 6 L 26 17 Q 26 23 16 29 Q 6 23 6 17 L 6 6 Z"
        fill="currentColor"
        opacity="0.1"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <rect x="15" y="9" width="2" height="14" fill="currentColor" />
      <rect x="11" y="14" width="10" height="2" fill="currentColor" />
    </svg>
  );
}

export function HorseshoePawDivider({ className = '' }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 300 30"
      preserveAspectRatio="xMidYMid meet"
      className={className}
      aria-hidden="true"
    >
      <line x1="0" y1="15" x2="120" y2="15" stroke="currentColor" strokeOpacity="0.4" strokeWidth="0.6" />
      <line x1="180" y1="15" x2="300" y2="15" stroke="currentColor" strokeOpacity="0.4" strokeWidth="0.6" />

      <g fill="currentColor" transform="translate(130, 8)">
        <ellipse cx="6" cy="6" rx="1.6" ry="2.4" />
        <ellipse cx="10" cy="3" rx="1.6" ry="2.4" />
        <ellipse cx="14" cy="6" rx="1.6" ry="2.4" />
        <path d="M 5 13 Q 10 9 15 13 Q 16 17 10 18 Q 4 17 5 13 Z" />
      </g>

      <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" transform="translate(155, 8)">
        <path d="M 3 2 C 1 5 1 10 3 14 L 4 16" />
        <path d="M 13 2 C 15 5 15 10 13 14 L 12 16" />
        <path d="M 3 2 Q 8 -1 13 2" />
      </g>
    </svg>
  );
}
