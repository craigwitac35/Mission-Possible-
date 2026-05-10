import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import { useAdminAuth } from '@/lib/useAdminAuth';

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
        <header className="mp-admin-header">
          <div className="mp-container">
            <div className="mp-admin-header-row">
              <div>
                <p className="mp-eyebrow mp-admin-eyebrow">Mission Possible &middot; Admin</p>
                <h1 className="mp-admin-title">Registration Detail</h1>
              </div>
              <div className="mp-admin-user">
                <span className="mp-admin-email">{userEmail}</span>
                <button type="button" className="mp-admin-signout" onClick={signOut}>
                  Sign out
                </button>
              </div>
            </div>

            <nav className="mp-admin-nav">
              <Link href="/admin/dashboard" className="mp-admin-nav-link">
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
            <Link href="/admin/registrations" className="mp-admin-back">
              &larr; Back to all registrations
            </Link>

            {error && <p className="mp-form-error mp-admin-error">{error}</p>}

            {!registration ? (
              <p className="mp-admin-loading">Loading…</p>
            ) : (
              <>
                <section className="mp-admin-detail-card">
                  <div className="mp-admin-detail-header">
                    <div>
                      <p className="mp-admin-section-label">Buyer Information</p>
                      <h2 className="mp-admin-detail-name">{registration.buyer_name}</h2>
                    </div>
                    <span
                      className={`mp-recent-badge mp-recent-badge-${registration.payment_status} mp-detail-badge`}
                    >
                      {registration.payment_status}
                    </span>
                  </div>

                  <div className="mp-admin-detail-grid">
                    <div className="mp-admin-detail-row">
                      <span className="mp-admin-detail-label">Email</span>
                      <a
                        href={`mailto:${registration.buyer_email}`}
                        className="mp-admin-detail-value mp-admin-detail-link"
                      >
                        {registration.buyer_email}
                      </a>
                    </div>
                    <div className="mp-admin-detail-row">
                      <span className="mp-admin-detail-label">Phone</span>
                      <a
                        href={`tel:${registration.buyer_phone}`}
                        className="mp-admin-detail-value mp-admin-detail-link"
                      >
                        {registration.buyer_phone}
                      </a>
                    </div>
                    <div className="mp-admin-detail-row">
                      <span className="mp-admin-detail-label">Group</span>
                      <span className="mp-admin-detail-value">
                        {registration.group_name || '—'}
                      </span>
                    </div>
                    <div className="mp-admin-detail-row">
                      <span className="mp-admin-detail-label">Total</span>
                      <span className="mp-admin-detail-value mp-admin-detail-amount">
                        ${registration.total_amount}
                      </span>
                    </div>
                    <div className="mp-admin-detail-row">
                      <span className="mp-admin-detail-label">Submitted</span>
                      <span className="mp-admin-detail-value">
                        {new Date(registration.created_at).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </section>

                <section className="mp-admin-detail-card">
                  <p className="mp-admin-section-label">Payment Status</p>
                  <h2 className="mp-admin-detail-name mp-admin-payment-status">
                    Currently <em>{registration.payment_status}</em>
                  </h2>

                  {registration.payment_status === 'pending' ? (
                    <button
                      type="button"
                      className="mp-btn mp-btn-primary"
                      onClick={markAsPaid}
                      disabled={updating}
                    >
                      {updating ? 'Updating…' : 'Mark as Paid'}
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="mp-btn mp-btn-secondary"
                      onClick={markAsPending}
                      disabled={updating}
                    >
                      {updating ? 'Updating…' : 'Revert to Pending'}
                    </button>
                  )}
                </section>

                <section className="mp-admin-detail-card">
                  <p className="mp-admin-section-label">
                    Participants ({participants.length})
                  </p>
                  <h2 className="mp-admin-detail-name">
                    Who&apos;s <em>showing up.</em>
                  </h2>

                  {participants.length === 0 ? (
                    <p className="mp-admin-empty">No participants found.</p>
                  ) : (
                    <div className="mp-admin-table-wrap">
                      <table className="mp-admin-table">
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
                              <td className="mp-admin-td-name">{p.name}</td>
                              <td>{p.age}</td>
                              <td>{p.age > 13 ? 'Adult' : 'Child'}</td>
                              <td className="mp-admin-td-shirt">
                                {p.shirt_size
                                  ? SHIRT_LABELS[p.shirt_size] || p.shirt_size
                                  : '—'}
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
