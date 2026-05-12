import { useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import { useAdminAuth } from '@/lib/useAdminAuth';

type RegistrationRow = {
  id: string;
  buyer_name: string;
  buyer_email: string;
  total_amount: number;
  payment_status: 'pending' | 'paid';
  created_at: string;
  participants: { count: number }[];
};

type FilterMode = 'all' | 'pending' | 'paid';

export default function AdminRegistrationsList() {
  const { ready, userEmail, signOut } = useAdminAuth();
  const [rows, setRows] = useState<RegistrationRow[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<FilterMode>('all');

  useEffect(() => {
    if (!ready) return;

    const load = async () => {
      const { data, error: err } = await supabase
        .from('registrations')
        .select(
          'id, buyer_name, buyer_email, total_amount, payment_status, created_at, participants(count)'
        )
        .order('created_at', { ascending: false });

      if (err) {
        setError(err.message);
        return;
      }

      setRows(data as any);
    };

    load();
  }, [ready]);

  const filteredRows = useMemo(() => {
    if (!rows) return [];
    let result = rows;

    if (filter !== 'all') {
      result = result.filter((r) => r.payment_status === filter);
    }

    if (search.trim()) {
      const q = search.toLowerCase().trim();
      result = result.filter(
        (r) =>
          r.buyer_name.toLowerCase().includes(q) ||
          r.buyer_email.toLowerCase().includes(q)
      );
    }

    return result;
  }, [rows, filter, search]);

  const counts = useMemo(() => {
    if (!rows) return { all: 0, pending: 0, paid: 0 };

    return {
      all: rows.length,
      pending: rows.filter((r) => r.payment_status === 'pending').length,
      paid: rows.filter((r) => r.payment_status === 'paid').length,
    };
  }, [rows]);

  if (!ready) return null;

  return (
    <>
      <Head>
        <title>Registrations | Mission Possible Admin</title>
        <meta
          name="description"
          content="Mission Possible admin registration list with search and payment filters."
        />
      </Head>

      <main className="mp-site mp-admin">
        <header className="mp-admin-header mp-admin-header-v2">
          <div className="mp-container-v2 mp-admin-shell-v2">
            <div className="mp-admin-header-row mp-admin-header-row-v2">
              <div className="mp-admin-heading-v2">
                <p className="mp-admin-eyebrow">Mission Possible · Admin</p>
                <h1 className="mp-admin-title">Registrations</h1>
                <p className="mp-admin-subtitle-v2">
                  Search sign-ups, review payment status, and open each
                  registration for details.
                </p>
              </div>

              <div className="mp-admin-user mp-admin-user-v2">
                <span className="mp-admin-email">{userEmail}</span>
                <button
                  type="button"
                  className="mp-admin-signout"
                  onClick={signOut}
                >
                  Sign out
                </button>
              </div>
            </div>

            <nav className="mp-admin-nav mp-admin-nav-v2">
              <Link
                href="/admin/dashboard"
                className="mp-admin-nav-link mp-admin-nav-btn-v2"
              >
                Dashboard
              </Link>

              <Link
                href="/admin/registrations"
                className="mp-admin-nav-link mp-admin-nav-btn-v2 mp-admin-nav-active"
              >
                Registrations
              </Link>

              <Link
                href="/"
                className="mp-admin-nav-link mp-admin-nav-btn-v2 mp-admin-nav-btn-secondary-v2"
              >
                Public Home
              </Link>
            </nav>
          </div>
        </header>

        <div className="mp-admin-body">
          <div className="mp-container-v2 mp-admin-shell-v2">
            <section className="mp-admin-welcome-v2">
              <p className="mp-admin-welcome-kicker-v2">Registration Queue</p>
              <h2 className="mp-admin-welcome-title-v2">
                Find what you need <em>fast</em>.
              </h2>
              <p className="mp-admin-welcome-text-v2">
                Filter by payment status, search by buyer name or email, and
                jump straight into each registration record without digging
                through the dashboard first.
              </p>
            </section>

            {error && <p className="mp-form-error mp-admin-error">{error}</p>}

            <div className="mp-admin-toolbar">
              <input
                type="search"
                className="mp-admin-search"
                placeholder="Search by name or email…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <div className="mp-admin-filters">
                <button
                  type="button"
                  className={`mp-admin-filter ${
                    filter === 'all' ? 'mp-admin-filter-active' : ''
                  }`}
                  onClick={() => setFilter('all')}
                >
                  All <span className="mp-admin-filter-count">{counts.all}</span>
                </button>

                <button
                  type="button"
                  className={`mp-admin-filter ${
                    filter === 'pending' ? 'mp-admin-filter-active' : ''
                  }`}
                  onClick={() => setFilter('pending')}
                >
                  Pending{' '}
                  <span className="mp-admin-filter-count">{counts.pending}</span>
                </button>

                <button
                  type="button"
                  className={`mp-admin-filter ${
                    filter === 'paid' ? 'mp-admin-filter-active' : ''
                  }`}
                  onClick={() => setFilter('paid')}
                >
                  Paid <span className="mp-admin-filter-count">{counts.paid}</span>
                </button>
              </div>
            </div>

            {!rows ? (
              <p className="mp-admin-loading">Loading…</p>
            ) : filteredRows.length === 0 ? (
              <p className="mp-admin-empty">
                {rows.length === 0
                  ? 'No registrations yet.'
                  : 'No registrations match your search.'}
              </p>
            ) : (
              <div className="mp-admin-table-wrap">
                <table className="mp-admin-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>People</th>
                      <th>Total</th>
                      <th>Status</th>
                      <th>Date</th>
                      <th></th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredRows.map((r) => {
                      const participantCount = r.participants?.[0]?.count ?? 0;

                      return (
                        <tr key={r.id}>
                          <td className="mp-admin-td-name">{r.buyer_name}</td>

                          <td className="mp-admin-td-email">
                            <a href={`mailto:${r.buyer_email}`}>{r.buyer_email}</a>
                          </td>

                          <td>{participantCount}</td>

                          <td className="mp-admin-td-amount">
                            ${r.total_amount}
                          </td>

                          <td>
                            <span
                              className={`mp-recent-badge mp-recent-badge-${r.payment_status}`}
                            >
                              {r.payment_status}
                            </span>
                          </td>

                          <td className="mp-admin-td-date">
                            {new Date(r.created_at).toLocaleDateString()}
                          </td>

                          <td>
                            <Link
                              href={`/admin/registration/${r.id}`}
                              className="mp-admin-link"
                            >
                              View &rarr;
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
