// Pricing rules for the mud run.
// - Early Bird (until July 30): Adult $25, Child $10
// - Regular (July 31 - August 10): Adult $35, Child $15
// - After August 10: registration CLOSED
//
// Adult = age > 13, Child = age <= 13.
// Year is taken from the date passed in (defaults to "now") so this stays
// correct year-over-year without code changes.

export type ShirtSize =
  | ''
  | 'YS'
  | 'YM'
  | 'YL'
  | 'YXL'
  | 'XS'
  | 'S'
  | 'M'
  | 'L'
  | 'XL'
  | 'XXL'
  | 'XXXL';

export type Participant = {
  name: string;
  age: number | '';
  shirt_size: ShirtSize | '';
};

export type PricingPhase = 'early_bird' | 'regular' | 'closed';

export type PriceBreakdown = {
  phase: PricingPhase;
  adultPrice: number;
  childPrice: number;
  adultCount: number;
  childCount: number;
  total: number;
  isOpen: boolean;
};

const PRICING = {
  early_bird: { adult: 25, child: 10 },
  regular: { adult: 35, child: 15 },
};

export function getPricingPhase(now: Date = new Date()): PricingPhase {
  const year = now.getFullYear();
  // Month is 0-indexed in JS Date.
  const earlyBirdEnd = new Date(year, 6, 30, 23, 59, 59); // July 30
  const regularEnd = new Date(year, 7, 10, 23, 59, 59); // Aug 10

  if (now <= earlyBirdEnd) return 'early_bird';
  if (now <= regularEnd) return 'regular';
  return 'closed';
}

export function isAdult(age: number): boolean {
  return age > 13;
}

export function calculatePrice(
  participants: Participant[],
  now: Date = new Date()
): PriceBreakdown {
  const phase = getPricingPhase(now);
  const isOpen = phase !== 'closed';

  // When closed, still report counts but use $0 so UI doesn't show stale pricing.
  const rates = phase === 'closed' ? { adult: 0, child: 0 } : PRICING[phase];

  let adultCount = 0;
  let childCount = 0;

  for (const p of participants) {
    const age = typeof p.age === 'number' ? p.age : parseInt(String(p.age), 10);
    if (Number.isNaN(age) || age < 0) continue;
    if (isAdult(age)) adultCount++;
    else childCount++;
  }

  const total = adultCount * rates.adult + childCount * rates.child;

  return {
    phase,
    adultPrice: rates.adult,
    childPrice: rates.child,
    adultCount,
    childCount,
    total,
    isOpen,
  };
}

export function phaseLabel(phase: PricingPhase): string {
  switch (phase) {
    case 'early_bird':
      return 'Early Bird Pricing';
    case 'regular':
      return 'Regular Pricing';
    case 'closed':
      return 'Registration Closed';
  }
}
