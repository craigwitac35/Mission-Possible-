import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import { useAdminAuth } from '@/lib/useAdminAuth';
import AdminSiteHeader from '@/components/AdminSiteHeader';
import SignOutIcon from '@/components/SignOutIcon';

const PAID_TOLERANCE = 5; // dollars

type Registration = {
  id: string;
  buyer_name: string;
  buyer_email: string;
  buyer_phone: string;
  group_name: string | null;
  total_amount: number;
  amount_paid: number;
  payment_status: 'pending' | 'paid';
  reference_code: string | null;
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

type DerivedStatus = 'unpaid' | 'partial' | 'paid';

function deriveStatus(total: number, paid: number): DerivedStatus {
  if (paid <= 0) return 'unpaid';
  if (paid >= total - PAID_TOLERANCE) return 'paid';
  return 'partial';
}

export default function AdminRegistrationDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { ready, userEmail, signOut } = useAdminAuth();

  const [registration, setRegistration] = useState<Registration | null>(null);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [paidInput, setPaidInput] = useState<string>('');

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
      setPaidInput(String(reg?.amount_paid ?? 0));
    };

    load();
  }, [ready, id]);

  const saveAmountPaid = async () => {
    if (!registration) return;

    const parsed = parseFloat(paidInput);
    if (Number.isNaN(parsed) || parsed < 0) {
      setError('Amount paid must be a number greater than or equal to 0.');
      return;
    }

    setUpdating(true);
    setError(null);
    setSaveSuccess(false);

    const newStatus =
      deriveStatus(registration.total_amount, parsed) === 'paid'
        ? 'paid'
        : 'pending';

    const { error: updateErr } = await supabase
      .from('registrations')
      .update({
        amount_paid: parsed,
        payment_status: newStatus,
      })
      .eq('id', registration.id);

    setUpdating(false);

    if (updateErr) {
      setError(updateErr.message);
      return;
    }

    setRegistration({
      ...registration,
      amount_paid: parsed,
      payment_status: newStatus,
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const markAsFullPaid = async () => {
    if (!registration) return;
    setPaidInput(String(registration.total_amount));
    // small delay so input reflects first, then save
    setTimeout(saveAmountPaid, 0);
  };

  if (!ready) return null;

  const derivedStatus = registration
    ? deriveStatus(registration.total_amount, registration.amount_paid)
    : 'unpaid';

  const remaining = registration
    ? Math.max(0, registration.total_amount - registration.amount_paid)
    : 0;

  return (
    <>
      <Head>
        <title>Registration Detail | Mission Possible Admin</title>
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
              Buyer info, payment status, and participants.
            </p>
            <p className="mp-admin-intro-email-v5">
              Signed in as <strong>{userEmail}</strong>
            </p>
          </div>
        </section>

        <div className="mp-admin-body-v3">
          <div className="mp-container-v2">
            <Link href="/admin/registrations" className="mp-admin-back-v3">
              &larr; Back to all registrations
            </Link>

            {error && <p className="mp-form-error mp-admin-error">{error}</p>}

            {!registration ? (
              <p className="mp-admin-loading-v3">Loading&hellip;</p>
            ) : (
              <>
                <section className="mp-admin-detail-card-v3">
                  <div className="mp-admin-detail-header-v3">
                    <div>
                      <p className="mp-admin-block-label-v3">Buyer Information</p>
                      <h2 className="mp-admin-detail-name-v3">
                        {registration.buyer_name}
                      </h2>
                    </div>
                    <span
                      className={`mp-admin-badge-v3 mp-admin-badge-${derivedStatus}-v3 mp-admin-detail-badge-v3`}
                    >
                      {derivedStatus}
                    </span>
                  </div>

                  <div className="mp-admin-detail-grid-v3">
                    <div className="mp-admin-detail-row-v3">
                      <span className="mp-admin-detail-label-v3">Reference</span>
                      <span className="mp-admin-detail-value-v3 mp-admin-detail-ref-v3">
                        {registration.reference_code || '—'}
                      </span>
                    </div>
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
                      <span className="mp-admin-detail-label-v3">Total Due</span>
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
                  <p className="mp-admin-block-label-v3">Payment Tracking</p>
                  <h2 className="mp-admin-detail-name-v3 mp-admin-payment-status-v3">
                    Currently <em>{derivedStatus}</em>
                  </h2>

                  <div className="mp-admin-pay-grid-v3">
                    <div className="mp-admin-pay-stat-v3">
                      <p className="mp-admin-pay-stat-label-v3">Total Due</p>
                      <p className="mp-admin-pay-stat-value-v3">
                        ${registration.total_amount}
                      </p>
                    </div>
                    <div className="mp-admin-pay-stat-v3">
                      <p className="mp-admin-pay-stat-label-v3">Paid</p>
                      <p className="mp-admin-pay-stat-value-v3">
                        ${registration.amount_paid}
                      </p>
                    </div>
                    <div className="mp-admin-pay-stat-v3">
                      <p className="mp-admin-pay-stat-label-v3">Remaining</p>
                      <p className="mp-admin-pay-stat-value-v3">${remaining}</p>
                    </div>
                  </div>

                  <div className="mp-admin-pay-edit-v3">
                    <label className="mp-admin-pay-label-v3" htmlFor="amount_paid">
                      Update amount paid
                    </label>
                    <div className="mp-admin-pay-row-v3">
                      <span className="mp-admin-pay-dollar-v3">$</span>
                      <input
                        id="amount_paid"
                        type="number"
                        step="0.01"
                        min="0"
                        className="mp-admin-pay-input-v3"
                        value={paidInput}
                        onChange={(e) => setPaidInput(e.target.value)}
                      />
                      <button
                        type="button"
                        className="mp-btn mp-btn-primary"
                        onClick={saveAmountPaid}
                        disabled={updating}
                      >
                        {updating ? 'Saving…' : 'Save'}
                      </button>
                    </div>

                    <button
                      type="button"
                      className="mp-admin-pay-full-link-v3"
                      onClick={markAsFullPaid}
                      disabled={updating}
                    >
                      Mark as paid in full (${registration.total_amount})
                    </button>

                    {saveSuccess && (
                      <p className="mp-admin-pay-success-v3">
                        Payment updated.
                      </p>
                    )}

                    <p className="mp-admin-pay-help-v3">
                      Payments within ${PAID_TOLERANCE} of the total are
                      automatically considered paid.
                    </p>
                  </div>
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
