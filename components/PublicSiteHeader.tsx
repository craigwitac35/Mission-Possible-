import Link from 'next/link';
import { useRouter } from 'next/router';

export default function PublicSiteHeader() {
  const router = useRouter();

  return (
    <header className="mp-public-header-v2">
      <div className="mp-public-header-inner-v2">
        <Link href="/" className="mp-public-brand-v2">
          Mission Possible
        </Link>

        <nav className="mp-public-nav-v2" aria-label="Public site navigation">
          <Link
            href="/"
            className={
              router.pathname === '/'
                ? 'mp-public-nav-link-v2 mp-public-nav-active-v2'
                : 'mp-public-nav-link-v2'
            }
          >
            Home
          </Link>

          <Link
            href="/events"
            className={
              router.pathname === '/events'
                ? 'mp-public-nav-link-v2 mp-public-nav-active-v2'
                : 'mp-public-nav-link-v2'
            }
          >
            Events
          </Link>

          <Link
            href="/register"
            className={
              router.pathname === '/register'
                ? 'mp-public-nav-link-v2 mp-public-nav-active-v2'
                : 'mp-public-nav-link-v2'
            }
          >
            Register
          </Link>
        </nav>
      </div>
    </header>
  );
}
