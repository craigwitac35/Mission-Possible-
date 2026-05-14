import { useMemo, useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/supabaseClient';
import {
  calculatePrice,
  phaseLabel,
  ShirtSize,
} from '@/lib/pricing';
import ParticipantFields from './ParticipantFields';

type BuyerInfo = {
  name: string;
  email: string;
  phone: string;
  group_name: string;
};

type Participant = {
  name: string;
  age: number;
  shirt_size: ShirtSize | '';
};

const emptyParticipant = (): Participant => ({
  name: '',
  age: 0,
  shirt_size: '',
});

const REF_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

function generateReferenceCode(): string {
  let code = 'MP-';

  for (let i = 0; i < 4; i++) {
    code += REF_CHARS[Math.floor(Math.random() * REF_CHARS.length)];
  }

  return code;
}

export default function RegistrationForm() {
  const router = useRouter();

  const [buyer, setBuyer] = useState<BuyerInfo>({
    name: '',
    email: '',
    phone: '',
    group_name: '',
  });

  const [participants, setParticipants] = useState<Participant[]>([
    emptyParticipant(),
  ]);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pricing = useMemo(() => {
    const parsed = participants.map((p) => ({
      name: p.name,
      age: Number(p.age) || 0,
      shirt_size: (p.shirt_size || 'M') as ShirtSize,
    }));

    return calculatePrice(parsed);
  }, [participants]);

  const handleBuyerChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setBuyer({
      ...buyer,
      [e.target.name]: e.target.value,
    });
  };

  const handleParticipantChange = (
    index: number,
    field: keyof Participant,
    value: string | number
  ) => {
    const next = [...participants];

    next[index] = {
      ...next[index],
      [field]: field === 'age' ? Number(value) : value,
    };

    setParticipants(next);
  };

  const addParticipant = () => {
    setParticipants([...participants, emptyParticipant()]);
  };

  const removeParticipant = (index: number) => {
    if (participants.length <= 1) return;

    setParticipants(participants.filter((_, i) => i !== index));
  };

  const validate = (): string | null => {
    if (!buyer.name.trim()) return 'Buyer name is required.';
    if (!buyer.email.trim()) return 'Buyer email is required.';
    if (!buyer.phone.trim()) return 'Buyer phone is required.';
    if (participants.length === 0) return 'Add at least one participant.';

    for (let i = 0; i < participants.length; i++) {
      const p = participants[i];

      if (!p.name.trim()) {
        return `Participant ${i + 1} needs a name.`;
      }

      const age = Number(p.age);

      if (Number.isNaN(age) || age < 0 || age > 120) {
        return `Participant ${i + 1} needs a valid age (0–120).`;
      }

      if (!p.shirt_size) {
        return `Participant ${i + 1} needs a shirt size.`;
      }
    }

    return null;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const validationError = validate();

    if (validationError) {
      setError(validationError);
      return;
    }

    setSubmitting(true);

    try {
      let referenceCode = generateReferenceCode();
      let attempts = 0;
      let registrationId: string | null = null;

      while (attempts < 5 && !registrationId) {
        const { data, error: insertErr } = await supabase
          .from('registrations')
          .insert({
            buyer_name: buyer.name.trim(),
            buyer_email: buyer.email.trim(),
            buyer_phone: buyer.phone.trim(),
            group_name: buyer.group_name.trim() || null,
            total_amount: pricing.total,
            payment_status: 'pending',
            amount_paid: 0,
            reference_code: referenceCode,
          })
          .select('id, reference_code')
          .single();

        if (insertErr) {
          if (
            insertErr.code === '23505' &&
            insertErr.message.includes('reference_code')
          ) {
            attempts += 1;
            referenceCode = generateReferenceCode();
            continue;
          }

          throw insertErr;
        }

        registrationId = data.id;
        referenceCode = data.reference_code;
      }

      if (!registrationId) {
        throw new Error('Could not generate a unique reference code.');
      }

      const participantRows = participants.map((p) => ({
        registration_id: registrationId,
        name: p.name.trim(),
        age: Number(p.age),
        shirt_size: p.shirt_size,
      }));

      const { error: partErr } = await supabase
        .from('participants')
        .insert(participantRows);

      if (partErr) throw partErr;

      router.push(`/confirmation?ref=${encodeURIComponent(referenceCode)}`);
    } catch (err: any) {
      setError(err?.message || 'Something went wrong. Please try again.');
      setSubmitting(false);
    }
  };

  return (
    <form className="mp-form" onSubmit={handleSubmit} noValidate>
      <section className="mp-form-step">
        <p className="mp-form-step-label">Step 1</p>
        <h2 className="mp-form-step-title">Your Info</h2>

        <div className="mp-form-grid">
          <label className="mp-form-field">
            <span className="mp-form-label">Full Name</span>
            <input
              type="text"
              name="name"
              value={buyer.name}
              onChange={handleBuyerChange}
              required
            />
          </label>

          <label className="mp-form-field">
            <span className="mp-form-label">Email</span>
            <input
              type="email"
              name="email"
              value={buyer.email}
              onChange={handleBuyerChange}
              required
            />
          </label>

          <label className="mp-form-field">
            <span className="mp-form-label">Phone</span>
            <input
              type="tel"
              name="phone"
              value={buyer.phone}
              onChange={handleBuyerChange}
              required
            />
          </label>

          <label className="mp-form-field">
            <span className="mp-form-label">Group / Team Name (optional)</span>
            <input
              type="text"
              name="group_name"
              value={buyer.group_name}
              onChange={handleBuyerChange}
            />
          </label>
        </div>
      </section>

      <section className="mp-form-step">
        <p className="mp-form-step-label">Step 2</p>
        <h2 className="mp-form-step-title">Participants</h2>

        {participants.map((p, i) => (
          <ParticipantFields
            key={i}
            index={i}
            participant={p}
            onChange={(field, value) => handleParticipantChange(i, field, value)}
            onRemove={
              participants.length > 1 ? () => removeParticipant(i) : undefined
            }
          />
        ))}

        <button
          type="button"
          className="mp-btn mp-btn-secondary"
          onClick={addParticipant}
        >
          + Add Participant
        </button>
      </section>

      <section className="mp-form-step">
        <p className="mp-form-step-label">Step 3</p>
        <h2 className="mp-form-step-title">Summary</h2>

        <div className="mp-summary-ticket">
          <div className="mp-ticket-header">
            <span className="mp-ticket-event">Mission Possible</span>
            <span className="mp-ticket-phase">{phaseLabel(pricing.phase)}</span>
          </div>

          <div className="mp-ticket-body">
            <div className="mp-ticket-row">
              <span>
                Adults × {pricing.adultCount}
                <span className="mp-ticket-rate"> @ ${pricing.adultPrice}</span>
              </span>
              <span>${pricing.adultCount * pricing.adultPrice}</span>
            </div>

            <div className="mp-ticket-row">
              <span>
                Children × {pricing.childCount}
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

        {error && <p className="mp-form-error">{error}</p>}

        <button
          type="submit"
          className="mp-btn mp-btn-primary mp-btn-submit"
          disabled={submitting}
        >
          {submitting ? 'Submitting…' : 'Complete Registration'}
        </button>
      </section>
    </form>
  );
}
