export function HorseshoePawDivider({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 40"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden="true"
    >
      <line x1="0" y1="20" x2="120" y2="20" strokeOpacity="0.5" />

      <g transform="translate(140, 12)">
        <path
          d="M 4 0 Q 0 0 0 6 L 0 14 Q 0 20 4 20 L 6 20 L 6 16 L 4 16 Q 3 16 3 14 L 3 6 Q 3 4 4 4 L 16 4 Q 17 4 17 6 L 17 14 Q 17 16 16 16 L 14 16 L 14 20 L 16 20 Q 20 20 20 14 L 20 6 Q 20 0 16 0 Z"
          strokeWidth="0.8"
        />
        <circle cx="3.5" cy="6" r="0.6" fill="currentColor" stroke="none" />
        <circle cx="3.5" cy="14" r="0.6" fill="currentColor" stroke="none" />
        <circle cx="16.5" cy="6" r="0.6" fill="currentColor" stroke="none" />
        <circle cx="16.5" cy="14" r="0.6" fill="currentColor" stroke="none" />
      </g>

      <g transform="translate(195, 12)">
        <path
          d="M 5 0 L 5 4 M 0 8 L 0 4 M 5 16 L 0 16 L 0 12 L 5 8 L 10 12 L 10 16 Z"
          strokeWidth="0.8"
        />
        <ellipse cx="2" cy="3" rx="1.2" ry="2" fill="currentColor" stroke="none" />
        <ellipse cx="5" cy="1.5" rx="1.2" ry="2" fill="currentColor" stroke="none" />
        <ellipse cx="8" cy="3" rx="1.2" ry="2" fill="currentColor" stroke="none" />
        <ellipse cx="0.5" cy="6.5" rx="1" ry="1.5" fill="currentColor" stroke="none" />
        <ellipse cx="9.5" cy="6.5" rx="1" ry="1.5" fill="currentColor" stroke="none" />
        <path d="M 1.5 14 Q 5 9 8.5 14 Q 8.5 17 5 17 Q 1.5 17 1.5 14 Z" fill="currentColor" stroke="none" />
      </g>

      <g transform="translate(245, 14)">
        <path
          d="M 6 0 L 7.5 4.5 L 12 4.5 L 8.25 7.25 L 9.75 12 L 6 9.25 L 2.25 12 L 3.75 7.25 L 0 4.5 L 4.5 4.5 Z"
          fill="currentColor"
          stroke="none"
        />
      </g>

      <line x1="280" y1="20" x2="400" y2="20" strokeOpacity="0.5" />
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

      <path
        d="M 30 8 L 33 28 L 30 30 L 27 28 Z"
        fill="currentColor"
        stroke="none"
      />
      <path
        d="M 30 52 L 27 32 L 30 30 L 33 32 Z"
        fill="currentColor"
        fillOpacity="0.5"
        stroke="none"
      />
      <path
        d="M 8 30 L 28 27 L 30 30 L 28 33 Z"
        fill="currentColor"
        fillOpacity="0.7"
        stroke="none"
      />
      <path
        d="M 52 30 L 32 33 L 30 30 L 32 27 Z"
        fill="currentColor"
        fillOpacity="0.7"
        stroke="none"
      />

      <path
        d="M 14 14 L 28 28 L 30 30 L 28 28 Z"
        fill="currentColor"
        fillOpacity="0.4"
        stroke="none"
      />
      <path
        d="M 46 14 L 32 28 L 30 30 L 32 28 Z"
        fill="currentColor"
        fillOpacity="0.4"
        stroke="none"
      />
      <path
        d="M 14 46 L 28 32 L 30 30 L 28 32 Z"
        fill="currentColor"
        fillOpacity="0.4"
        stroke="none"
      />
      <path
        d="M 46 46 L 32 32 L 30 30 L 32 32 Z"
        fill="currentColor"
        fillOpacity="0.4"
        stroke="none"
      />

      <circle cx="30" cy="30" r="2" fill="currentColor" stroke="none" />

      <text
        x="30"
        y="6"
        textAnchor="middle"
        fontSize="5"
        fill="currentColor"
        fontFamily="serif"
        fontStyle="italic"
      >
        N
      </text>
    </svg>
  );
}
