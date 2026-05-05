import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import { useAdminAuth } from '@/lib/useAdminAuth';

type Stats = {
  totalRegistrations: number;
  totalParticipants: number;
  adultCount: number;
  childCount: number;
  pendingCount: number;
  paidCount: number;
};

export default function AdminDashboard() {
  const { ready, userEmail, signOut } = useAdminAuth();
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!ready) return;

    const load = async () => {
      // Pull registrations + participants. For a small event this is fine.
      const [{ data: regs, error: regErr }, { data: parts, error: partErr }] =
        await Promise.all([
          supabase.from('registrations').select('id, payment_status'),
          supabase.from('participants').select('id, age'),
        ]);

      if (regErr || partErr) {
        setError(regErr?.message || partErr?.message || 'Failed to load stats.');
        return;
      }

      const adultCount = (parts || []).filter((p: any) => p.age > 13).length;
      const childCount = (parts || []).filter((p: any) => p.age <= 13).length;
      const pendingCount = (regs || []).filter(
        (r: any) => r.payment_status === 'pending'
      ).length;
      const paidCount = (regs || []).filter(
        (r: any) => r.payment_status === 'paid'
      ).length;

      setStats({
        totalRegistrations: regs?.length || 0,
        totalParticipants: parts?.length || 0,
        adultCount,
        childCount,
        pendingCount,
        paidCount,
      });
    };

    load();
  }, [ready]);

  if (!ready) return null;

  return (
    <>
      <Head>
        <title>Admin Dashboard</title>
      </Head>
      <main className="container">
        <header className="admin-header">
          <h1>Admin Dashboard</h1>
          <div>
            <span className="muted">{userEmail}</span>
            <button type="button" className="btn-link" onClick={signOut}>
              Sign out
            </button>
          </div>
        </header>

        <nav className="admin-nav">
          <Link href="/admin/dashboard">Dashboard</Link>
          <Link href="/admin/registrations">Registrations</Link>
        </nav>

        {error && <p className="error">{error}</p>}

        {!stats ? (
          <p>Loading stats…</p>
        ) : (
          <div className="stats-grid">
            <StatCard label="Total Registrations" value={stats.totalRegistrations} />
            <StatCard label="Total Participants" value={stats.totalParticipants} />
            <StatCard label="Adults" value={stats.adultCount} />
            <StatCard label="Children" value={stats.childCount} />
            <StatCard label="Pending" value={stats.pendingCount} />
            <StatCard label="Paid" value={stats.paidCount} />
          </div>
        )}
      </main>
    </>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="stat-card">
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
    </div>
  );
}
