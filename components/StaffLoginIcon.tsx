import Link from 'next/link';

export default function StaffLoginIcon() {
  return (
    <Link
      href="/admin/login"
      className="mp-staff-login"
      aria-label="Staff Login"
      title="Staff Login"
    >
      <svg
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="mp-staff-login-icon"
      >
        <circle cx="8" cy="14" r="4" />
        <line x1="11" y1="14" x2="22" y2="14" />
        <line x1="19" y1="14" x2="19" y2="18" />
        <line x1="22" y1="14" x2="22" y2="17" />
        <circle cx="8" cy="14" r="1.2" fill="currentColor" />
      </svg>
    </Link>
  );
}
