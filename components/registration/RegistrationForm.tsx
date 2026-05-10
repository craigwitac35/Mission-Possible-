import { useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/supabaseClient';
import {
  calculatePrice,
  Participant,
  phaseLabel,
} from '@/lib/pricing';
import ParticipantFields from './ParticipantFields';

type BuyerInfo = {
  buyer_name: string;
  buyer_email: string;
  buyer_phone: string;
  group_name: string;
};

const emptyParticipant = (): Participant => ({ name: '', age: '' });

export default function RegistrationForm() {
  const router = useRouter();

  const [buyer, setBuyer] = useState<BuyerInfo>({
    buyer_name: '',
    buyer_email: '',
    buyer_phone: '',
    group_name: '',
  });

  const [participants, setParticipants] = useState<Participant[]>([
    emptyParticipant(),
  ]);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pricing = useMemo(() => calculatePrice(participants), [participants]);

  const handleBuyerChange = (field: keyof BuyerInfo, value: string) => {
    setBuyer((prev) => ({ ...prev, [field]: value }));
  };

  const handleParticipantChange = (
    index: number,
    field: keyof Participant,
    value: string
  ) => {
    setParticipants((prev) => {
      const next = [...prev];
      if (field === 'age') {
        next[index] = { ...next[index], age: value === '' ? '' : Number(value) };
      } else {
        next[index] = { ...next[index], [field]: value };
      }
      return next;
    });
  };

  const addParticipant = () => {
    setParticipants((prev) => [...prev, emptyParticipant()]);
  };

  const removeParticipant = (index: number) => {
    setParticipants((prev) => prev.filter((_, i) => i !== index));
  };

  const validate = (): string | null => {
    if (!pricing.isOpen) return 'Registration is closed.';
    if (!buyer.buyer_name.trim()) return 'Buyer name is required.';
    if (!buyer.buyer_email.trim()) return 'Buyer email is required.';
    if (!buyer.buyer_phone.trim()) return 'Buyer phone is required.';
    if (participants.length === 0) return 'At least one participant is required.';
    for (let i = 0; i < participants.length; i++) {
      const p = participants[i];
      if (!p.name.trim()) return `Participant ${i + 1}: name is required.`;
      if (p.age === '' || Number.isNaN(Number(p.age))) {
        return `Participant ${i + 1}: age is required.`;
      }
      const ageNum = Number(p.age);
      if (ageNum < 0 || ageNum > 120) {
        return `Participant ${i + 1}: age must be between 0 and 120.`;
      }
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setSubmitting(true);

    try {
      const { data: registration, error: regErr } = await supabase
        .from('registrations')
        .insert({
          buyer_name: buyer.buyer_name.trim(),
          buyer_email: buyer.buyer_email.trim().toLowerCase(),
          buyer_phone: buyer.buyer_phone.trim(),
          group_name: buyer.group_name.trim() || null,
          total_amount: pricing.total,
          payment_status: 'pending',
        })
        .select('id')
        .single();

      if (regErr || !registration) {
        throw new Error(regErr?.message || 'Failed to create registration.');
      }

      const participantRows = participants.map((p) => ({
        registration_id: registration.id,
        name: p.name.trim(),
        age: Number(p.age),
      }));

      const { error: partErr } = await supabase
        .from('participants')
        .insert(participantRows);

      if (partErr) {
        throw new Error(partErr.message);
      }

      router.push('/confirmation');
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
      setSubmitting(false);
    }
  };

  if (!pricing.isOpen) {
    return (
      <div className="mp-form-card mp-form-closed">
        <h2 className="mp-form-step-title">Registration Closed</h2>
        <p>
          Online registration is closed. Please contact the event organizers
          for assistance.
        </p>
      </div>
    );
  }

  return (
    <form className="mp-form-card" onSubmit={handleSubmit}>
      <section className="mp-form-step">
        <p className="mp-form-step-label">Step 01</p>
        <h2 className="mp-form-step-title">Your Information</h2>

        <div className="mp-form-fields">
          <label className="mp-form-label">
            <span className="mp-label-text">Full Name</span>
            <input
              type="text"
              required
              className="mp-form-input"
              value={buyer.buyer_name}
              onChange={(e) => handleBuyerChange('buyer_name', e.target.value)}
            />
          </label>

          <label className="mp-form-label">
            <span className="mp-label-text">Email</span>
            <input
              type="email"
              required
              className="mp-form-input"
              value={buyer.buyer_email}
              onChange={(e) => handleBuyerChange('buyer_email', e.target.value)}
            />
          </label>

          <label className="mp-form-label">
            <span className="mp-label-text">Phone</span>
            <input
              type="tel"
              required
              className="mp-form-input"
              value={buyer.buyer_phone}
              onChange={(e) => handleBuyerChange('buyer_phone', e.target.value)}
            />
          </label>

          <label className="mp-form-label">
            <span className="mp-label-text">
              Group Name <span className="mp-label-optional">(optional)</span>
            </span>
            <input
              type="text"
              className="mp-form-input"
              value={buyer.group_name}
              onChange={(e) => handleBuyerChange('group_name', e.target.value)}
            />
          </label>
        </div>
      </section>

      <section className="mp-form-step">
        <p className="mp-form-step-label">Step 02</p>
        <h2 className="mp-form-step-title">Participants</h2>

        <div className="mp-participants-list">
          {participants.map((p, i) => (
            <ParticipantFields
              key={i}
              index={i}
              participant={p}
              canRemove={participants.length > 1}
              onChange={handleParticipantChange}
              onRemove={removeParticipant}
            />
          ))}
        </div>

        <button
          type="button"
          className="mp-btn mp-btn-secondary"
          onClick={addParticipant}
        >
          + Add Participant
        </button>
      </section>

      <section className="mp-form-step">
        <p className="mp-form-step-label">Step 03</p>
        <h2 className="mp-form-step-title">Review &amp; Submit</h2>

        <div className="mp-summary-ticket">
          <div className="mp-ticket-header">
            <span className="mp-ticket-event">Mission Possible</span>
            <span className="mp-ticket-phase">{phaseLabel(pricing.phase)}</span>
          </div>

          <div className="mp-ticket-body">
            <div className="mp-ticket-row">
              <span>
                Adults &times; {pricing.adultCount}
                <span className="mp-ticket-rate"> @ ${pricing.adultPrice}</span>
              </span>
              <span>${pricing.adultCount * pricing.adultPrice}</span>
            </div>
            <div className="mp-ticket-row">
              <span>
                Children &times; {pricing.childCount}
                <span className="mp-ticket-rate"> @ ${pricing.childPrice}</span>
              </span>
              <span>${pricing.childCount * pricing.childPrice}</span>
            </div>
          </div>

          <div className="mp-ticket-perforation" />

          <div className="mp-ticket-total">
            <span>Total Due</span>
            <span className="mp-ticket-total-amount">${pricing.total}</span>
          </div>
        </div>
      </section>

      {error && <p className="mp-form-error">{error}</p>}

      <button
        type="submit"
        className="mp-btn mp-btn-primary mp-btn-submit"
        disabled={submitting}
      >
        {submitting ? 'Submitting…' : 'Complete Registration'}
      </button>
    </form>
  );
}
