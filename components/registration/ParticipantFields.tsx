import { Participant } from '@/lib/pricing';

type Props = {
  index: number;
  participant: Participant;
  canRemove: boolean;
  onChange: (index: number, field: keyof Participant, value: string) => void;
  onRemove: (index: number) => void;
};

export default function ParticipantFields({
  index,
  participant,
  canRemove,
  onChange,
  onRemove,
}: Props) {
  return (
    <div className="mp-participant-card">
      <div className="mp-participant-header">
        <span className="mp-participant-number">No. {String(index + 1).padStart(2, '0')}</span>
        {canRemove && (
          <button
            type="button"
            className="mp-participant-remove"
            onClick={() => onRemove(index)}
          >
            Remove
          </button>
        )}
      </div>

      <div className="mp-participant-fields">
        <label className="mp-form-label">
          <span className="mp-label-text">Name</span>
          <input
            type="text"
            required
            className="mp-form-input"
            value={participant.name}
            onChange={(e) => onChange(index, 'name', e.target.value)}
          />
        </label>

        <label className="mp-form-label mp-form-label-narrow">
          <span className="mp-label-text">Age</span>
          <input
            type="number"
            min={0}
            max={120}
            required
            className="mp-form-input"
            value={participant.age}
            onChange={(e) => onChange(index, 'age', e.target.value)}
          />
        </label>
      </div>
    </div>
  );
}
