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
      // 1. Insert registration
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

      // 2. Insert participants linked to that registration
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

      // 3. Redirect to confirmation
      router.push('/confirmation');
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
      setSubmitting(false);
    }
  };

  if (!pricing.isOpen) {
    return (
      <div className="card">
        <h2>Registration Closed</h2>
        <p>
          Online registration is closed. Please contact the event organizers
          for assistance.
        </p>
      </div>
    );
  }

  return (
    <form className="card" onSubmit={handleSubmit}>
      <section>
        <h2>Your Info</h2>
        <div className="field-grid">
          <label>
            Full Name
            <input
              type="text"
              required
              value={buyer.buyer_name}
              onChange={(e) => handleBuyerChange('buyer_name', e.target.value)}
            />
          </label>

          <label>
            Email
            <input
              type="email"
              required
              value={buyer.buyer_email}
              onChange={(e) => handleBuyerChange('buyer_email', e.target.value)}
            />
          </label>

          <label>
            Phone
            <input
              type="tel"
              required
              value={buyer.buyer_phone}
              onChange={(e) => handleBuyerChange('buyer_phone', e.target.value)}
            />
          </label>

          <label>
            Group Name (optional)
            <input
              type="text"
              value={buyer.group_name}
              onChange={(e) => handleBuyerChange('group_name', e.target.value)}
            />
          </label>
        </div>
      </section>

      <section>
        <h2>Participants</h2>
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
        <button type="button" className="btn-secondary" onClick={addParticipant}>
          + Add Participant
        </button>
      </section>

      <section className="summary">
        <h2>Summary</h2>
        <p className="phase-label">{phaseLabel(pricing.phase)}</p>
        <div className="summary-row">
          <span>
            Adults ({pricing.adultCount}) &times; ${pricing.adultPrice}
          </span>
          <span>${pricing.adultCount * pricing.adultPrice}</span>
        </div>
        <div className="summary-row">
          <span>
            Children ({pricing.childCount}) &times; ${pricing.childPrice}
          </span>
          <span>${pricing.childCount * pricing.childPrice}</span>
        </div>
        <div className="summary-row total">
          <strong>Total</strong>
          <strong>${pricing.total}</strong>
        </div>
      </section>

      {error && <p className="error">{error}</p>}

      <button type="submit" className="btn-primary" disabled={submitting}>
        {submitting ? 'Submitting…' : 'Complete Registration'}
      </button>
    </form>
  );
}
