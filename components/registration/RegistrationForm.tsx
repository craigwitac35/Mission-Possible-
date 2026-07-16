import { useMemo, useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/supabaseClient';
import {
  calculatePrice,
  phaseLabel,
  Participant,
} from '@/lib/pricing';
import ParticipantFields from './ParticipantFields';

type BuyerInfo = {
  name: string;
  email: string;
  phone: string;
  group_name: string;
};

const emptyParticipant = (): Participant => ({
  name: '',
  age: '',
  shirt_size: '',
});

// MP-XXXX where X is alphanumeric, easy-to-read characters only
const REF_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

function generateReferenceCode(): string {
  let code = 'MP-';
  for (let i = 0; i < 8; i++) {
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
    return calculatePrice(participants);
  }, [participants]);

  const handleBuyerChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setBuyer({ ...buyer, [e.target.name]: e.target.value });
  };

  const handleParticipantChange = (
    index: number,
    field: keyof Participant,
    value: string
  ) => {
    const next = [...participants];
    next[index] = { ...next[index], [field]: value };
    setParticipants(next);
  };

  const addParticipant = () => {
    setParticipants([...participants, emptyParticipant()]);
  };

  const removeParticipant = (index: number) => {
    if (participants.length > 1) {
      setParticipants(participants.filter((_, i) => i !== index));
    }
  };

  const validate = (): string | null => {
    if (!pricing.isOpen) return 'Registration is closed.';
    if (!buyer.name.trim()) return 'Buyer name is required.';
    if (!buyer.email.trim()) return 'Buyer email is required.';
    if (!buyer.phone.trim()) return 'Buyer phone is required.';
    if (participants.length === 0) return 'Add at least one participant.';

    for (let i = 0; i < participants.length; i++) {
      const p = participants[i];
      if (!p.name.trim()) {
        return `Participant ${i + 1} needs a name.`;
      }
      const age =
        typeof p.age === 'number' ? p.age : parseInt(String(p.age), 10);
      if (Number.isNaN(age) || age < 0 || age > 120) {
        return `Participant ${i + 1} needs a valid age (0–120).`;
      }
      if (!p.shirt_size) {
        return `Participant ${i + 1} needs a shirt size.`;
      }
    }

    return null;
  };

  const handleSubmit = async (e: FormEvent) => {
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
        const { data: reg, error: regErr } = await supabase
          .from('registrations')
          .insert({
            buyer_name: buyer.name.trim(),
            buyer_email: buyer.email.trim(),
            buyer_phone: buyer.phone.trim(),
            group_name: buyer.group_name.trim() || null,
            total_amount: pricing.total,
            amount_paid: 0,
            payment_status: 'pending',
            reference_code: referenceCode,
          })
          .select('id')
          .single();

        if (regErr) {
          if (regErr.code === '23505') {
            referenceCode = generateReferenceCode();
            attempts++;
            continue;
          }
          throw regErr;
        }

        registrationId = reg?.id;
      }

      if (!registrationId)
        throw new Error('Failed to generate unique reference code.');

      const participantRows = participants.map((p) => ({
        registration_id: registrationId,
        name: p.name.trim(),
        age: typeof p.age === 'number' ? p.age : parseInt(String(p.age), 10),
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
    <form className="mp-registration-form-v2" onSubmit={handleSubmit}>
      <section className="mp-form-section-v2">
        <div className="mp-form-section-header-v2">
          <span className="mp-form-step-v2">Step 1</span>
          <h3 className="mp-form-section-title-v2">Your Info</h3>
        </div>

        <div className="mp-form-grid-v2">
          <label className="mp-form-label">
            <span className="mp-label-text">Full Name</span>
            <input
              type="text"
              required
              className="mp-form-input"
              name="name"
              value={buyer.name}
              onChange={handleBuyerChange}
            />
          </label>

          <label className="mp-form-label">
            <span className="mp-label-text">Email</span>
            <input
              type="email"
              required
              className="mp-form-input"
              name="email"
              value={buyer.email}
              onChange={handleBuyerChange}
            />
          </label>

          <label className="mp-form-label">
            <span className="mp-label-text">Phone</span>
            <input
              type="tel"
              required
              className="mp-form-input"
              name="phone"
              value={buyer.phone}
              onChange={handleBuyerChange}
            />
          </label>

          <label className="mp-form-label">
            <span className="mp-label-text">Group / Team Name (optional)</span>
            <input
              type="text"
              className="mp-form-input"
              name="group_name"
              value={buyer.group_name}
              onChange={handleBuyerChange}
            />
          </label>
        </div>
      </section>

      <section className="mp-form-section-v2">
        <div className="mp-form-section-header-v2">
          <span className="mp-form-step-v2">Step 2</span>
          <h3 className="mp-form-section-title-v2">Participants</h3>
        </div>

        <div className="mp-form-participants-list-v2">
          {participants.map((p, i) => (
            <ParticipantFields
              key={i}
              index={i}
              participant={p}
              canRemove={participants.length > 1}
              onChange={(index, field, value) =>
                handleParticipantChange(index, field, value)
              }
              onRemove={() => removeParticipant(i)}
            />
          ))}
        </div>

        <button
          type="button"
          className="mp-form-add-participant-v2"
          onClick={addParticipant}
        >
          + Add Participant
        </button>
      </section>

      <section className="mp-form-section-v2">
        <div className="mp-form-section-header-v2">
          <span className="mp-form-step-v2">Step 3</span>
          <h3 className="mp-form-section-title-v2">Summary</h3>
        </div>

        <div className="mp-form-summary-v2">
          <div className="mp-form-summary-phase-v2">
            <span className="mp-form-summary-label-v2">Mission Possible</span>
            <span className="mp-form-summary-phase-name-v2">
              {phaseLabel(pricing.phase)}
            </span>
          </div>

          <div className="mp-form-summary-breakdown-v2">
            <div className="mp-form-summary-line-v2">
              <span className="mp-form-summary-line-label-v2">
                Adults × {pricing.adultCount}
                <span className="mp-form-summary-line-rate-v2">
                  @ ${pricing.adultPrice}
                </span>
              </span>
              <span className="mp-form-summary-line-amount-v2">
                ${pricing.adultCount * pricing.adultPrice}
              </span>
            </div>
            <div className="mp-form-summary-line-v2">
              <span className="mp-form-summary-line-label-v2">
                Children × {pricing.childCount}
                <span className="mp-form-summary-line-rate-v2">
                  @ ${pricing.childPrice}
                </span>
              </span>
              <span className="mp-form-summary-line-amount-v2">
                ${pricing.childCount * pricing.childPrice}
              </span>
            </div>
          </div>

          <div className="mp-form-summary-divider-v2" />

          <div className="mp-form-summary-total-v2">
            <span className="mp-form-summary-total-label-v2">Total Due</span>
            <span className="mp-form-summary-total-amount-v2">
              ${pricing.total}
            </span>
          </div>

          <p className="mp-form-summary-donate-note-v2">
            Both organizations are veteran-run nonprofits that keep going on
            donations. At payment you&apos;ll have the option to add a little
            extra if you&apos;d like to support the cause.
          </p>
        </div>

        {error && <p className="mp-form-error">{error}</p>}

        <button
          type="submit"
          className="mp-cinematic-cta mp-form-submit-v2"
          disabled={submitting}
        >
          {submitting ? 'Submitting…' : 'Complete Registration'}
        </button>
      </section>
    </form>
  );
}
