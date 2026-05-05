import { useEffect, useState } from 'react';
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

export default function AdminRegistrationsList() {
  const { ready, signOut } = useAdminAuth();
  const [rows, setRows] = useState<RegistrationRow[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!ready) return;

    const load = async () => {
      // Use Supabase relational select to get participant counts in one query.
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

  if (!ready) return null;

  return (
    <>
      <Head>
        <title>Registrations | Admin</title>
      </Head>
      <main className="container">
        <header className="admin-header">
          <h1>Registrations</h1>
          <button type="button" className="btn-link" onClick={signOut}>
            Sign out
          </button>
        </header>

        <nav className="admin-nav">
          <Link href="/admin/dashboard">Dashboard</Link>
          <Link href="/admin/registrations">Registrations</Link>
        </nav>

        {error && <p className="error">{error}</p>}

        {!rows ? (
          <p>Loading…</p>
        ) : rows.length === 0 ? (
          <p>No registrations yet.</p>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Buyer</th>
                <th>Email</th>
                <th>Participants</th>
                <th>Total</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => {
                const participantCount = r.participants?.[0]?.count ?? 0;
                return (
                  <tr key={r.id}>
                    <td>{r.buyer_name}</td>
                    <td>{r.buyer_email}</td>
                    <td>{participantCount}</td>
                    <td>${r.total_amount}</td>
                    <td>
                      <span className={`badge badge-${r.payment_status}`}>
                        {r.payment_status}
                      </span>
                    </td>
                    <td>
                      <Link href={`/admin/registration/${r.id}`}>View</Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </main>
    </>
  );
}
