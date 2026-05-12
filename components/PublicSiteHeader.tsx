import Link from 'next/link';
import { useRouter } from 'next/router';

export default function PublicSiteHeader() {
  const router = useRouter();

  const isActive = (path: string) => router.pathname === path;

  return (
    <header className="mp-public-header-v2">
      <div className="mp-public-header-inner-v2">
        <Link href="/" className="mp-public-home-badge-v2">
          Home
        </Link>

        <nav className="mp-public-nav-v2" aria-label="Public site navigation">
          <Link
            href="/events"
            className={
              isActive('/events')
                ? 'mp-public-nav-btn-v2 mp-public-nav-btn-active-v2'
                : 'mp-public-nav-btn-v2'
            }
          >
            Events
          </Link>

          <Link
            href="/register"
            className={
              isActive('/register')
                ? 'mp-public-nav-btn-v2 mp-public-nav-btn-active-v2'
                : 'mp-public-nav-btn-v2'
            }
          >
            Register
          </Link>
        </nav>
      </div>
    </header>
  );
}
