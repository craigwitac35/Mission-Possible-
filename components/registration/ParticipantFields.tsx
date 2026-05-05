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
    <div className="participant-row">
      <div className="participant-header">
        <strong>Participant {index + 1}</strong>
        {canRemove && (
          <button
            type="button"
            className="btn-link"
            onClick={() => onRemove(index)}
          >
            Remove
          </button>
        )}
      </div>

      <div className="field-grid">
        <label>
          Name
          <input
            type="text"
            required
            value={participant.name}
            onChange={(e) => onChange(index, 'name', e.target.value)}
          />
        </label>

        <label>
          Age
          <input
            type="number"
            min={0}
            max={120}
            required
            value={participant.age}
            onChange={(e) => onChange(index, 'age', e.target.value)}
          />
        </label>
      </div>
    </div>
  );
}
