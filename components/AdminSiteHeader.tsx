import Link from 'next/link';
import { useRouter } from 'next/router';

export default function AdminSiteHeader() {
  const router = useRouter();

  const isDashboardActive = router.pathname === '/admin/dashboard';
  const isRegistrationsActive =
    router.pathname === '/admin/registrations' ||
    router.pathname.startsWith('/admin/registration/');

  return (
    <header className="mp-admin-header-v5">
      <div className="mp-admin-header-inner-v5">
        <nav className="mp-admin-nav-v5" aria-label="Admin navigation">
          <Link
            href="/admin/dashboard"
            className={
              isDashboardActive
                ? 'mp-admin-nav-pill-v5 mp-admin-nav-pill-active-v5'
                : 'mp-admin-nav-pill-v5'
            }
          >
            Dashboard
          </Link>

          <Link
            href="/admin/registrations"
            className={
              isRegistrationsActive
                ? 'mp-admin-nav-pill-v5 mp-admin-nav-pill-active-v5'
                : 'mp-admin-nav-pill-v5'
            }
          >
            Registrations
          </Link>

          <Link
            href="/"
            className="mp-admin-nav-pill-v5 mp-admin-nav-pill-public-v5"
          >
            Public Home &rarr;
          </Link>
        </nav>
      </div>
    </header>
  );
}
