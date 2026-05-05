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
};

export default function AdminRegistrationDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { ready, signOut } = useAdminAuth();

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
            .select('id, name, age')
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
        <title>Registration Detail | Admin</title>
      </Head>
      <main className="container">
        <header className="admin-header">
          <h1>Registration Detail</h1>
          <button type="button" className="btn-link" onClick={signOut}>
            Sign out
          </button>
        </header>

        <nav className="admin-nav">
          <Link href="/admin/dashboard">Dashboard</Link>
          <Link href="/admin/registrations">Registrations</Link>
        </nav>

        {error && <p className="error">{error}</p>}

        {!registration ? (
          <p>Loading…</p>
        ) : (
          <>
            <section className="card">
              <h2>Buyer</h2>
              <dl className="info-list">
                <dt>Name</dt>
                <dd>{registration.buyer_name}</dd>
                <dt>Email</dt>
                <dd>{registration.buyer_email}</dd>
                <dt>Phone</dt>
                <dd>{registration.buyer_phone}</dd>
                <dt>Group</dt>
                <dd>{registration.group_name || '—'}</dd>
                <dt>Total</dt>
                <dd>${registration.total_amount}</dd>
                <dt>Submitted</dt>
                <dd>{new Date(registration.created_at).toLocaleString()}</dd>
              </dl>
            </section>

            <section className="card">
              <h2>Payment Status</h2>
              <p>
                Current status:{' '}
                <span className={`badge badge-${registration.payment_status}`}>
                  {registration.payment_status}
                </span>
              </p>
              {registration.payment_status === 'pending' ? (
                <button
                  type="button"
                  className="btn-primary"
                  onClick={markAsPaid}
                  disabled={updating}
                >
                  {updating ? 'Updating…' : 'Mark as Paid'}
                </button>
              ) : (
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={markAsPending}
                  disabled={updating}
                >
                  {updating ? 'Updating…' : 'Revert to Pending'}
                </button>
              )}
            </section>

            <section className="card">
              <h2>Participants ({participants.length})</h2>
              {participants.length === 0 ? (
                <p>No participants found.</p>
              ) : (
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Age</th>
                      <th>Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {participants.map((p) => (
                      <tr key={p.id}>
                        <td>{p.name}</td>
                        <td>{p.age}</td>
                        <td>{p.age > 13 ? 'Adult' : 'Child'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </section>
          </>
        )}
      </main>
    </>
  );
}
