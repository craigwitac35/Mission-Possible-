import Link from 'next/link';
import { useRouter } from 'next/router';

export default function PublicSiteHeader() {
  const router = useRouter();

  const isActive = (path: string) => router.pathname === path;

  return (
    <header className="mp-public-header-v5">
      <div className="mp-public-header-inner-v5">
        <nav className="mp-public-nav-v5" aria-label="Public site navigation">
          <Link
            href="/"
            className={
              isActive('/')
                ? 'mp-public-nav-pill-v5 mp-public-nav-pill-active-v5'
                : 'mp-public-nav-pill-v5'
            }
          >
            Home
          </Link>

          <Link
            href="/events"
            className={
              isActive('/events')
                ? 'mp-public-nav-pill-v5 mp-public-nav-pill-active-v5'
                : 'mp-public-nav-pill-v5'
            }
          >
            Events
          </Link>

          <Link
            href="/register"
            className={
              isActive('/register')
                ? 'mp-public-nav-pill-v5 mp-public-nav-pill-active-v5'
                : 'mp-public-nav-pill-v5'
            }
          >
            Register
          </Link>

          <Link
            href="/contact"
            className={
              isActive('/contact')
                ? 'mp-public-nav-pill-v5 mp-public-nav-pill-active-v5'
                : 'mp-public-nav-pill-v5'
            }
          >
            Contact
          </Link>
        </nav>

        <Link
          href="/admin/login"
          className="mp-public-staff-key-v5"
          aria-label="Staff login"
          title="Staff login"
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
            className="mp-public-staff-key-icon-v5"
          >
            <circle cx="7.5" cy="15.5" r="3.5" />
            <line x1="10" y1="13" x2="20" y2="3" />
            <line x1="17" y1="6" x2="20" y2="9" />
            <line x1="14" y1="9" x2="17" y2="12" />
          </svg>
        </Link>
      </div>
    </header>
  );
}
