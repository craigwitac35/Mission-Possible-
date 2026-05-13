import { useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import { useAdminAuth } from '@/lib/useAdminAuth';
import AdminSiteHeader from '@/components/AdminSiteHeader';
import SignOutIcon from '@/components/SignOutIcon';

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
        <SignOutIcon onClick={signOut} />

        <AdminSiteHeader />

        <section className="mp-hero-art-v2">
          <img
            src="/images/dashboard-image.png"
            alt="Mission Possible Admin"
            className="mp-hero-art-image-v2"
          />
        </section>

        <section className="mp-admin-intro-v5">
          <div className="mp-container-v2">
            <p className="mp-admin-intro-eyebrow-v5">
              <span className="mp-divider-dot" />
              Mission Possible &middot; Admin
              <span className="mp-divider-dot" />
            </p>
            <p className="mp-admin-intro-subtitle-v5">
              Search, filter, and review every sign-up.
            </p>
            <p className="mp-admin-intro-email-v5">
              Signed in as <strong>{userEmail}</strong>
            </p>
          </div>
        </section>

        <div className="mp-admin-body-v3">
          <div className="mp-container-v2">
            {error && <p className="mp-form-error mp-admin-error">{error}</p>}

            <div className="mp-admin-toolbar-v3">
              <input
                type="search"
                className="mp-admin-search-v3"
                placeholder="Search by name or email&hellip;"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <div className="mp-admin-filters-v3">
                <button
                  type="button"
                  className={`mp-admin-filter-v3 ${
                    filter === 'all' ? 'mp-admin-filter-active-v3' : ''
                  }`}
                  onClick={() => setFilter('all')}
                >
                  All{' '}
                  <span className="mp-admin-filter-count-v3">{counts.all}</span>
                </button>

                <button
                  type="button"
                  className={`mp-admin-filter-v3 ${
                    filter === 'pending' ? 'mp-admin-filter-active-v3' : ''
                  }`}
                  onClick={() => setFilter('pending')}
                >
                  Pending{' '}
                  <span className="mp-admin-filter-count-v3">
                    {counts.pending}
                  </span>
                </button>

                <button
                  type="button"
                  className={`mp-admin-filter-v3 ${
                    filter === 'paid' ? 'mp-admin-filter-active-v3' : ''
                  }`}
                  onClick={() => setFilter('paid')}
                >
                  Paid{' '}
                  <span className="mp-admin-filter-count-v3">{counts.paid}</span>
                </button>
              </div>
            </div>

            {!rows ? (
              <p className="mp-admin-loading-v3">Loading&hellip;</p>
            ) : filteredRows.length === 0 ? (
              <p className="mp-admin-empty-v3">
                {rows.length === 0
                  ? 'No registrations yet.'
                  : 'No registrations match your search.'}
              </p>
            ) : (
              <div className="mp-admin-table-wrap-v3">
                <table className="mp-admin-table-v3">
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
                          <td className="mp-admin-td-name-v3">{r.buyer_name}</td>

                          <td className="mp-admin-td-email-v3">
                            <a href={`mailto:${r.buyer_email}`}>{r.buyer_email}</a>
                          </td>

                          <td>{participantCount}</td>

                          <td className="mp-admin-td-amount-v3">
                            ${r.total_amount}
                          </td>

                          <td>
                            <span
                              className={`mp-admin-badge-v3 mp-admin-badge-${r.payment_status}-v3`}
                            >
                              {r.payment_status}
                            </span>
                          </td>

                          <td className="mp-admin-td-date-v3">
                            {new Date(r.created_at).toLocaleDateString()}
                          </td>

                          <td>
                            <Link
                              href={`/admin/registration/${r.id}`}
                              className="mp-admin-text-link-v3"
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
