import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import { useAdminAuth } from '@/lib/useAdminAuth';
import SignOutIcon from '@/components/SignOutIcon';

type Registration = {
  id: string;
  buyer_name: string;
  buyer_email: string;
  buyer_phone: string;
  group_name: string | null;
  total_amount: number;
  payment_status: 'pending' | 'paid';
  created_at: string;
};

type Participant = {
  id: string;
  name: string;
  age: number;
  shirt_size: string | null;
};

const SHIRT_LABELS: Record<string, string> = {
  YS: 'Youth S',
  YM: 'Youth M',
  YL: 'Youth L',
  YXL: 'Youth XL',
  XS: 'Adult XS',
  S: 'Adult S',
  M: 'Adult M',
  L: 'Adult L',
  XL: 'Adult XL',
  XXL: 'Adult XXL',
  XXXL: 'Adult XXXL',
};

export default function AdminRegistrationDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { ready, userEmail, signOut } = useAdminAuth();

  const [registration, setRegistration] = useState<Registration | null>(null);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (!ready || !id || typeof id !== 'string') return;

    const load = async () => {
      const [{ data: reg, error: regErr }, { data: parts, error: partErr }] =
        await Promise.all([
          supabase.from('registrations').select('*').eq('id', id).single(),
          supabase
            .from('participants')
            .select('id, name, age, shirt_size')
            .eq('registration_id', id)
            .order('created_at', { ascending: true }),
        ]);

      if (regErr || partErr) {
        setError(regErr?.message || partErr?.message || 'Failed to load.');
        return;
      }

      setRegistration(reg as Registration);
      setParticipants((parts || []) as Participant[]);
    };

    load();
  }, [ready, id]);

  const markAsPaid = async () => {
    if (!registration) return;
    setUpdating(true);
    setError(null);

    const { error: updateErr } = await supabase
      .from('registrations')
      .update({ payment_status: 'paid' })
      .eq('id', registration.id);

    setUpdating(false);

    if (updateErr) {
      setError(updateErr.message);
      return;
    }

    setRegistration({ ...registration, payment_status: 'paid' });
  };

  const markAsPending = async () => {
    if (!registration) return;
    setUpdating(true);
    setError(null);

    const { error: updateErr } = await supabase
      .from('registrations')
      .update({ payment_status: 'pending' })
      .eq('id', registration.id);

    setUpdating(false);

    if (updateErr) {
      setError(updateErr.message);
      return;
    }

    setRegistration({ ...registration, payment_status: 'pending' });
  };

  if (!ready) return null;

  return (
    <>
      <Head>
        <title>Registration Detail | Mission Possible Admin</title>
      </Head>

      <main className="mp-site mp-admin">
        <SignOutIcon onClick={signOut} />

        <section className="mp-page-hero-v2">
          <div
            className="mp-page-hero-bg"
            style={{ backgroundImage: 'url(/images/dashboard-image.png)' }}
            aria-hidden="true"
          />
          <div className="mp-page-hero-overlay" aria-hidden="true" />

          <div className="mp-page-hero-content">
            <Link href="/admin/registrations" className="mp-back-link-v2">
              &larr; Back to all registrations
            </Link>

            <p className="mp-cinematic-eyebrow">
              <span className="mp-divider-dot" />
              Mission Possible &middot; Admin
              <span className="mp-divider-dot" />
            </p>

            <h1 className="mp-cinematic-title">
              <span className="mp-cinematic-title-top">Registration</span>
              <span className="mp-cinematic-title-bottom">Detail</span>
            </h1>

            <p className="mp-cinematic-tagline">
              Buyer info, payment status, and participants.
            </p>
          </div>
        </section>

        <nav className="mp-admin-nav-bar-v4">
          <div className="mp-container-v2">
            <div className="mp-admin-nav-inner-v4">
              <div className="mp-admin-nav-links-v4">
                <Link href="/admin/dashboard" className="mp-admin-nav-link-v4">
                  Dashboard
                </Link>

                <Link
                  href="/admin/registrations"
                  className="mp-admin-nav-link-v4 mp-admin-nav-link-active-v4"
                >
                  Registrations
                </Link>

                <Link
                  href="/"
                  className="mp-admin-nav-link-v4 mp-admin-nav-link-public-v4"
                >
                  Public Home &rarr;
                </Link>
              </div>

              <span className="mp-admin-nav-email-v4">{userEmail}</span>
            </div>
          </div>
        </nav>

        <div className="mp-admin-body-v3">
          <div className="mp-container-v2">
            {error && <p className="mp-form-error mp-admin-error">{error}</p>}

            {!registration ? (
              <p className="mp-admin-loading-v3">Loading&hellip;</p>
            ) : (
              <>
                <section className="mp-admin-detail-card-v3">
                  <div className="mp-admin-detail-header-v3">
                    <div>
                      <p className="mp-admin-block-label-v3">Buyer Information</p>
                      <h2 className="mp-admin-detail-name-v3">{registration.buyer_name}</h2>
                    </div>
                    <span
                      className={`mp-admin-badge-v3 mp-admin-badge-${registration.payment_status}-v3 mp-admin-detail-badge-v3`}
                    >
                      {registration.payment_status}
                    </span>
                  </div>

                  <div className="mp-admin-detail-grid-v3">
                    <div className="mp-admin-detail-row-v3">
                      <span className="mp-admin-detail-label-v3">Email</span>
                      <a
                        href={`mailto:${registration.buyer_email}`}
                        className="mp-admin-detail-value-v3 mp-admin-detail-link-v3"
                      >
                        {registration.buyer_email}
                      </a>
                    </div>
                    <div className="mp-admin-detail-row-v3">
                      <span className="mp-admin-detail-label-v3">Phone</span>
                      <a
                        href={`tel:${registration.buyer_phone}`}
                        className="mp-admin-detail-value-v3 mp-admin-detail-link-v3"
                      >
                        {registration.buyer_phone}
                      </a>
                    </div>
                    <div className="mp-admin-detail-row-v3">
                      <span className="mp-admin-detail-label-v3">Group</span>
                      <span className="mp-admin-detail-value-v3">
                        {registration.group_name || '–'}
                      </span>
                    </div>
                    <div className="mp-admin-detail-row-v3">
                      <span className="mp-admin-detail-label-v3">Total</span>
                      <span className="mp-admin-detail-value-v3 mp-admin-detail-amount-v3">
                        ${registration.total_amount}
                      </span>
                    </div>
                    <div className="mp-admin-detail-row-v3">
                      <span className="mp-admin-detail-label-v3">Submitted</span>
                      <span className="mp-admin-detail-value-v3">
                        {new Date(registration.created_at).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </section>

                <section className="mp-admin-detail-card-v3">
                  <p className="mp-admin-block-label-v3">Payment Status</p>
                  <h2 className="mp-admin-detail-name-v3 mp-admin-payment-status-v3">
                    Currently <em>{registration.payment_status}</em>
                  </h2>

                  {registration.payment_status === 'pending' ? (
                    <button
                      type="button"
                      className="mp-btn mp-btn-primary"
                      onClick={markAsPaid}
                      disabled={updating}
                    >
                      {updating ? 'Updating\u2026' : 'Mark as Paid'}
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="mp-btn mp-btn-secondary"
                      onClick={markAsPending}
                      disabled={updating}
                    >
                      {updating ? 'Updating\u2026' : 'Revert to Pending'}
                    </button>
                  )}
                </section>

                <section className="mp-admin-detail-card-v3">
                  <p className="mp-admin-block-label-v3">
                    Participants ({participants.length})
                  </p>
                  <h2 className="mp-admin-detail-name-v3">
                    Who&apos;s <em>showing up.</em>
                  </h2>

                  {participants.length === 0 ? (
                    <p className="mp-admin-empty-v3">No participants found.</p>
                  ) : (
                    <div className="mp-admin-table-wrap-v3">
                      <table className="mp-admin-table-v3">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Type</th>
                            <th>Shirt Size</th>
                          </tr>
                        </thead>
                        <tbody>
                          {participants.map((p) => (
                            <tr key={p.id}>
                              <td className="mp-admin-td-name-v3">{p.name}</td>
                              <td>{p.age}</td>
                              <td>{p.age > 13 ? 'Adult' : 'Child'}</td>
                              <td className="mp-admin-td-shirt-v3">
                                {p.shirt_size
                                  ? SHIRT_LABELS[p.shirt_size] || p.shirt_size
                                  : '–'}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </section>
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
