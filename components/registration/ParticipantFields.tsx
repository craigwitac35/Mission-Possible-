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

      <label className="mp-form-label mp-form-label-shirt">
        <span className="mp-label-text">T-Shirt Size</span>
        <select
          required
          className="mp-form-input"
          value={participant.shirt_size}
          onChange={(e) => onChange(index, 'shirt_size', e.target.value)}
        >
          <option value="" disabled>
            Select a size…
          </option>
          <optgroup label="Youth">
            <option value="YS">Youth S</option>
            <option value="YM">Youth M</option>
            <option value="YL">Youth L</option>
            <option value="YXL">Youth XL</option>
          </optgroup>
          <optgroup label="Adult">
            <option value="XS">Adult XS</option>
            <option value="S">Adult S</option>
            <option value="M">Adult M</option>
            <option value="L">Adult L</option>
            <option value="XL">Adult XL</option>
            <option value="XXL">Adult XXL</option>
            <option value="XXXL">Adult XXXL</option>
          </optgroup>
        </select>
      </label>
    </div>
  );
}
