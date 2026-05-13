type SignOutIconProps = {
  onClick: () => void;
};

export default function SignOutIcon({ onClick }: SignOutIconProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mp-staff-login"
      aria-label="Sign out"
      title="Sign out"
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
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" y1="12" x2="9" y2="12" />
      </svg>
    </button>
  );
}
