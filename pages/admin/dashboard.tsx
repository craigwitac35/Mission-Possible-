import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import { useAdminAuth } from '@/lib/useAdminAuth';

type ShirtTally = {
  size: string;
  label: string;
  count: number;
};

type RecentRegistration = {
  id: string;
  buyer_name: string;
  total_amount: number;
  payment_status: 'pending' | 'paid';
  created_at: string;
  participantCount: number;
};

type Stats = {
  totalRegistrations: number;
  totalParticipants: number;
  adultCount: number;
  childCount: number;
  pendingCount: number;
  paidCount: number;
  totalRevenue: number;
  pendingRevenue: number;
  paidRevenue: number;
  shirtTally: ShirtTally[];
  youthTotal: number;
  adultTotal: number;
  recent: RecentRegistration[];
};

const SHIRT_ORDER: { size: string; label: string }[] = [
  { size: 'YS', label: 'Youth S' },
  { size: 'YM', label: 'Youth M' },
  { size: 'YL', label: 'Youth L' },
  { size: 'YXL', label: 'Youth XL' },
  { size: 'XS', label: 'Adult XS' },
  { size: 'S', label: 'Adult S' },
  { size: 'M', label: 'Adult M' },
  { size: 'L', label: 'Adult L' },
  { size: 'XL', label: 'Adult XL' },
  { size: 'XXL', label: 'Adult XXL' },
  { size: 'XXXL', label: 'Adult XXXL' },
];

const YOUTH_SIZES = ['YS', 'YM', 'YL', 'YXL'];

export default function AdminDashboard() {
  const { ready, userEmail, signOut } = useAdminAuth();
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!ready) return;

    const load = async () => {
      const [{ data: regs, error: regErr }, { data: parts, error: partErr }] =
        await Promise.all([
          supabase
            .from('registrations')
            .select('id, buyer_name, total_amount, payment_status, created_at, participants(count)')
            .order('created_at', { ascending: false }),
          supabase.from('participants').select('id, age, shirt_size'),
        ]);

      if (regErr || partErr) {
        setError(regErr?.message || partErr?.message || 'Failed to load stats.');
        return;
      }

      const regsAll = regs || [];
      const partsAll = parts || [];

      const adultCount = partsAll.filter((p: any) => p.age > 13).length;
      const childCount = partsAll.filter((p: any) => p.age <= 13).length;
      const pendingCount = regsAll.filter((r: any) => r.payment_status === 'pending').length;
      const paidCount = regsAll.filter((r: any) => r.payment_status === 'paid').length;

      const totalRevenue = regsAll.reduce((sum: number, r: any) => sum + (r.total_amount || 0), 0);
      const pendingRevenue = regsAll
        .filter((r: any) => r.payment_status === 'pending')
        .reduce((sum: number, r: any) => sum + (r.total_amount || 0), 0);
      const paidRevenue = regsAll
        .filter((r: any) => r.payment_status === 'paid')
        .reduce((sum: number, r: any) => sum + (r.total_amount || 0), 0);

      const shirtTally: ShirtTally[] = SHIRT_ORDER.map(({ size, label }) => ({
        size,
        label,
        count: partsAll.filter((p: any) => p.shirt_size === size).length,
      }));

      const youthTotal = partsAll.filter((p: any) =>
        YOUTH_SIZES.includes(p.shirt_size)
      ).length;
      const adultTotal = partsAll.filter(
        (p: any) => p.shirt_size && !YOUTH_SIZES.includes(p.shirt_size)
      ).length;

      const recent: RecentRegistration[] = regsAll.slice(0, 5).map((r: any) => ({
        id: r.id,
        buyer_name: r.buyer_name,
        total_amount: r.total_amount,
        payment_status: r.payment_status,
        created_at: r.created_at,
        participantCount: r.participants?.[0]?.count ?? 0,
      }));

      setStats({
        totalRegistrations: regsAll.length,
        totalParticipants: partsAll.length,
        adultCount,
        childCount,
        pendingCount,
        paidCount,
        totalRevenue,
        pendingRevenue,
        paidRevenue,
        shirtTally,
        youthTotal,
        adultTotal,
        recent,
      });
    };

    load();
  }, [ready]);

  if (!ready) return null;

  const maxShirtCount = stats
    ? Math.max(1, ...stats.shirtTally.map((s) => s.count))
    : 1;

  return (
    <>
      <Head>
        <title>Dashboard | Mission Possible Admin</title>
      </Head>

      <main className="mp-site mp-admin">
        <header className="mp-admin-header">
          <div className="mp-container">
            <div className="mp-admin-header-row">
              <div>
                <p className="mp-eyebrow mp-admin-eyebrow">Mission Possible &middot; Admin</p>
                <h1 className="mp-admin-title">Dashboard</h1>
              </div>
              <div className="mp-admin-user">
                <span className="mp-admin-email">{userEmail}</span>
                <button type="button" className="mp-admin-signout" onClick={signOut}>
                  Sign out
                </button>
              </div>
            </div>

            <nav className="mp-admin-nav">
              <Link href="/admin/dashboard" className="mp-admin-nav-link mp-admin-nav-active">
                Dashboard
              </Link>
              <Link href="/admin/registrations" className="mp-admin-nav-link">
                Registrations
              </Link>
            </nav>
          </div>
        </header>

        <div className="mp-admin-body">
          <div className="mp-container">
            {error && <p className="mp-form-error mp-admin-error">{error}</p>}

            {!stats ? (
              <p className="mp-admin-loading">Loading stats…</p>
            ) : (
              <>
                <section className="mp-admin-section">
                  <p className="mp-admin-section-label">At a Glance</p>

                  <div className="mp-stat-grid">
                    <div className="mp-stat-card mp-stat-primary">
                      <p className="mp-stat-label">Total Registrations</p>
                      <p className="mp-stat-value">{stats.totalRegistrations}</p>
                      <p className="mp-stat-meta">Sign-ups received</p>
                    </div>

                    <div className="mp-stat-card mp-stat-primary">
                      <p className="mp-stat-label">Total Participants</p>
                      <p className="mp-stat-value">{stats.totalParticipants}</p>
                      <p className="mp-stat-meta">
                        {stats.adultCount} adults &middot; {stats.childCount} kids
                      </p>
                    </div>

                    <div className="mp-stat-card mp-stat-revenue">
                      <p className="mp-stat-label">Total Revenue</p>
                      <p className="mp-stat-value">${stats.totalRevenue}</p>
                      <p className="mp-stat-meta">
                        ${stats.paidRevenue} paid &middot; ${stats.pendingRevenue} pending
                      </p>
                    </div>
                  </div>
                </section>

                <section className="mp-admin-section">
                  <p className="mp-admin-section-label">Shirt Order Sheet</p>
                  <h2 className="mp-admin-section-title">
                    What to <em>order</em>.
                  </h2>

                  <div className="mp-shirt-totals">
                    <div className="mp-shirt-total-card">
                      <p className="mp-shirt-total-label">Youth Shirts</p>
                      <p className="mp-shirt-total-value">{stats.youthTotal}</p>
                    </div>
                    <div className="mp-shirt-total-card">
                      <p className="mp-shirt-total-label">Adult Shirts</p>
                      <p className="mp-shirt-total-value">{stats.adultTotal}</p>
                    </div>
                    <div className="mp-shirt-total-card mp-shirt-total-grand">
                      <p className="mp-shirt-total-label">Total to Order</p>
                      <p className="mp-shirt-total-value">
                        {stats.youthTotal + stats.adultTotal}
                      </p>
                    </div>
                  </div>

                  <div className="mp-shirt-breakdown">
                    {stats.shirtTally.map((s) => (
                      <div key={s.size} className="mp-shirt-row">
                        <span className="mp-shirt-row-label">{s.label}</span>
                        <div className="mp-shirt-row-bar">
                          <div
                            className="mp-shirt-row-fill"
                            style={{
                              width: `${(s.count / maxShirtCount) * 100}%`,
                            }}
                          />
                        </div>
                        <span className="mp-shirt-row-count">{s.count}</span>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="mp-admin-section">
                  <p className="mp-admin-section-label">Payment Status</p>

                  <div className="mp-payment-grid">
                    <div className="mp-payment-card mp-payment-pending">
                      <p className="mp-payment-card-label">Pending Payment</p>
                      <p className="mp-payment-card-value">{stats.pendingCount}</p>
                      <p className="mp-payment-card-amount">${stats.pendingRevenue}</p>
                      <Link href="/admin/registrations" className="mp-payment-card-link">
                        View pending &rarr;
                      </Link>
                    </div>

                    <div className="mp-payment-card mp-payment-paid">
                      <p className="mp-payment-card-label">Paid</p>
                      <p className="mp-payment-card-value">{stats.paidCount}</p>
                      <p className="mp-payment-card-amount">${stats.paidRevenue}</p>
                      <Link href="/admin/registrations" className="mp-payment-card-link">
                        View paid &rarr;
                      </Link>
                    </div>
                  </div>
                </section>

                <section className="mp-admin-section">
                  <p className="mp-admin-section-label">Recent Activity</p>

                  {stats.recent.length === 0 ? (
                    <p className="mp-admin-empty">No registrations yet.</p>
                  ) : (
                    <div className="mp-recent-list">
                      {stats.recent.map((r) => (
                        <Link
                          key={r.id}
                          href={`/admin/registration/${r.id}`}
                          className="mp-recent-item"
                        >
                          <div className="mp-recent-main">
                            <span className="mp-recent-name">{r.buyer_name}</span>
                            <span className="mp-recent-meta">
                              {r.participantCount} {r.participantCount === 1 ? 'person' : 'people'} &middot;{' '}
                              {new Date(r.created_at).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="mp-recent-right">
                            <span className="mp-recent-total">${r.total_amount}</span>
                            <span className={`mp-recent-badge mp-recent-badge-${r.payment_status}`}>
                              {r.payment_status}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}

                  <div className="mp-recent-footer">
                    <Link href="/admin/registrations" className="mp-admin-link">
                      View all registrations &rarr;
                    </Link>
                  </div>
                </section>
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
