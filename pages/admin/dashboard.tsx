import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import { useAdminAuth } from '@/lib/useAdminAuth';
import AdminSiteHeader from '@/components/AdminSiteHeader';
import SignOutIcon from '@/components/SignOutIcon';

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
            .select(
              'id, buyer_name, total_amount, payment_status, created_at, participants(count)'
            )
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
      const pendingCount = regsAll.filter(
        (r: any) => r.payment_status === 'pending'
      ).length;
      const paidCount = regsAll.filter(
        (r: any) => r.payment_status === 'paid'
      ).length;

      const totalRevenue = regsAll.reduce(
        (sum: number, r: any) => sum + (r.total_amount || 0),
        0
      );
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
        <meta
          name="description"
          content="Mission Possible admin dashboard for registrations, revenue, and shirt counts."
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
              Registrations, payments, and shirt counts.
            </p>
            <p className="mp-admin-intro-email-v5">
              Signed in as <strong>{userEmail}</strong>
            </p>
          </div>
        </section>

        <div className="mp-admin-body-v3">
          <div className="mp-container-v2">
            {error && <p className="mp-form-error mp-admin-error">{error}</p>}

            {!stats ? (
              <p className="mp-admin-loading-v3">Loading stats&hellip;</p>
            ) : (
              <>
                <section className="mp-admin-hero-stats-v3">
                  <div className="mp-admin-hero-stat-v3">
                    <p className="mp-admin-hero-label-v3">Registrations</p>
                    <p className="mp-admin-hero-value-v3">{stats.totalRegistrations}</p>
                    <p className="mp-admin-hero-meta-v3">Sign-ups received</p>
                  </div>

                  <div className="mp-admin-hero-divider-v3" />

                  <div className="mp-admin-hero-stat-v3">
                    <p className="mp-admin-hero-label-v3">People Coming</p>
                    <p className="mp-admin-hero-value-v3">{stats.totalParticipants}</p>
                    <p className="mp-admin-hero-meta-v3">
                      {stats.adultCount} adults &middot; {stats.childCount} kids
                    </p>
                  </div>

                  <div className="mp-admin-hero-divider-v3" />

                  <div className="mp-admin-hero-stat-v3 mp-admin-hero-stat-revenue-v3">
                    <p className="mp-admin-hero-label-v3">Total Revenue</p>
                    <p className="mp-admin-hero-value-v3">${stats.totalRevenue}</p>
                    <p className="mp-admin-hero-meta-v3">
                      ${stats.paidRevenue} paid &middot; ${stats.pendingRevenue} pending
                    </p>
                  </div>
                </section>

                <div className="mp-admin-tier-v3">
                  <section className="mp-admin-block-v3">
                    <p className="mp-admin-block-label-v3">Needs Attention</p>
                    <h2 className="mp-admin-block-title-v3">
                      Payment <em>Status</em>
                    </h2>

                    <div className="mp-admin-payment-grid-v3">
                      <div className="mp-admin-payment-card-v3 mp-admin-payment-pending-v3">
                        <p className="mp-admin-payment-label-v3">Pending</p>
                        <p className="mp-admin-payment-value-v3">{stats.pendingCount}</p>
                        <p className="mp-admin-payment-amount-v3">
                          ${stats.pendingRevenue}
                        </p>
                        <Link
                          href="/admin/registrations"
                          className="mp-admin-payment-link-v3"
                        >
                          View pending &rarr;
                        </Link>
                      </div>

                      <div className="mp-admin-payment-card-v3 mp-admin-payment-paid-v3">
                        <p className="mp-admin-payment-label-v3">Paid</p>
                        <p className="mp-admin-payment-value-v3">{stats.paidCount}</p>
                        <p className="mp-admin-payment-amount-v3">
                          ${stats.paidRevenue}
                        </p>
                        <Link
                          href="/admin/registrations"
                          className="mp-admin-payment-link-v3"
                        >
                          View paid &rarr;
                        </Link>
                      </div>
                    </div>
                  </section>

                  <section className="mp-admin-block-v3">
                    <p className="mp-admin-block-label-v3">Recent Activity</p>
                    <h2 className="mp-admin-block-title-v3">
                      Latest <em>Sign-ups</em>
                    </h2>

                    {stats.recent.length === 0 ? (
                      <p className="mp-admin-empty-v3">No registrations yet.</p>
                    ) : (
                      <div className="mp-admin-recent-list-v3">
                        {stats.recent.map((r) => (
                          <Link
                            key={r.id}
                            href={`/admin/registration/${r.id}`}
                            className="mp-admin-recent-item-v3"
                          >
                            <div className="mp-admin-recent-main-v3">
                              <span className="mp-admin-recent-name-v3">
                                {r.buyer_name}
                              </span>
                              <span className="mp-admin-recent-meta-v3">
                                {r.participantCount}{' '}
                                {r.participantCount === 1 ? 'person' : 'people'}{' '}
                                &middot;{' '}
                                {new Date(r.created_at).toLocaleDateString()}
                              </span>
                            </div>

                            <div className="mp-admin-recent-right-v3">
                              <span className="mp-admin-recent-total-v3">
                                ${r.total_amount}
                              </span>
                              <span
                                className={`mp-admin-badge-v3 mp-admin-badge-${r.payment_status}-v3`}
                              >
                                {r.payment_status}
                              </span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}

                    <div className="mp-admin-recent-footer-v3">
                      <Link
                        href="/admin/registrations"
                        className="mp-admin-text-link-v3"
                      >
                        View all registrations &rarr;
                      </Link>
                    </div>
                  </section>
                </div>

                <section className="mp-admin-block-v3 mp-admin-block-full-v3">
                  <p className="mp-admin-block-label-v3">Planning</p>
                  <h2 className="mp-admin-block-title-v3">
                    Shirt <em>Order Sheet</em>
                  </h2>

                  <div className="mp-admin-shirt-totals-v3">
                    <div className="mp-admin-shirt-total-v3">
                      <p className="mp-admin-shirt-total-label-v3">Youth Shirts</p>
                      <p className="mp-admin-shirt-total-value-v3">
                        {stats.youthTotal}
                      </p>
                    </div>

                    <div className="mp-admin-shirt-total-v3">
                      <p className="mp-admin-shirt-total-label-v3">Adult Shirts</p>
                      <p className="mp-admin-shirt-total-value-v3">
                        {stats.adultTotal}
                      </p>
                    </div>

                    <div className="mp-admin-shirt-total-v3 mp-admin-shirt-total-grand-v3">
                      <p className="mp-admin-shirt-total-label-v3">Total to Order</p>
                      <p className="mp-admin-shirt-total-value-v3">
                        {stats.youthTotal + stats.adultTotal}
                      </p>
                    </div>
                  </div>

                  <div className="mp-admin-shirt-breakdown-v3">
                    {stats.shirtTally.map((s) => (
                      <div key={s.size} className="mp-admin-shirt-row-v3">
                        <span className="mp-admin-shirt-row-label-v3">
                          {s.label}
                        </span>
                        <div className="mp-admin-shirt-row-bar-v3">
                          <div
                            className="mp-admin-shirt-row-fill-v3"
                            style={{
                              width: `${(s.count / maxShirtCount) * 100}%`,
                            }}
                          />
                        </div>
                        <span className="mp-admin-shirt-row-count-v3">
                          {s.count}
                        </span>
                      </div>
                    ))}
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
