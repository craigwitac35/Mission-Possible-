import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/supabaseClient';
import PublicSiteHeader from '@/components/PublicSiteHeader';

const GIVEBUTTER_URL = 'https://givebutter.com/z6eQeg';

// Optional donation add-ons offered at payment time. These do not change what
// the person owes for registration. They simply suggest a higher amount to
// type into Givebutter, since it is a type-your-own-amount donation form and
// everything lands in the same account.
const DONATION_OPTIONS = [0, 10, 25, 50, 100];

type Registration = {
  reference_code: string;
  total_amount: number;
  buyer_name: string;
};

export default function ConfirmationPage() {
  const router = useRouter();
  const refCode =
    typeof router.query.ref === 'string' ? router.query.ref : null;

  const [registration, setRegistration] = useState<Registration | null>(null);
  const [copied, setCopied] = useState(false);
  const [selectedAdd, setSelectedAdd] = useState<number | 'custom'>(0);
  const [customAmount, setCustomAmount] = useState('');

  useEffect(() => {
    if (!refCode) return;

    const load = async () => {
      const { data } = await supabase
        .from('registrations')
        .select('reference_code, total_amount, buyer_name')
        .eq('reference_code', refCode)
        .single();

      if (data) setRegistration(data as Registration);
    };

    load();
  }, [refCode]);

  const copyCode = async () => {
    if (!registration?.reference_code) return;
    try {
      await navigator.clipboard.writeText(registration.reference_code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked, fall back silently
    }
  };

  const parsedCustom = parseFloat(customAmount);
  const donationAdd =
    selectedAdd === 'custom'
      ? Number.isNaN(parsedCustom) || parsedCustom < 0
        ? 0
        : parsedCustom
      : selectedAdd;
  const payAmount = registration ? registration.total_amount + donationAdd : 0;

  return (
    <>
      <Head>
        <title>You&apos;re In | Mission Possible</title>
        <meta
          name="description"
          content="Your Mission Possible registration has been received. Complete your payment via Givebutter."
        />
      </Head>

      <main>
        <PublicSiteHeader />

        <section className="mp-page-hero-art-v2">
          <img
            src="/images/confirmation-image.png"
            alt="Mission Possible confirmation hero"
            className="mp-hero-art-image-v2"
          />
        </section>

        <section className="mp-section-v2 mp-section-cream-v2">
          <div className="mp-container-v2 mp-container-narrow-v2 mp-events-intro-v2">
            <Link href="/" className="mp-back-link-v2">
              ← Back to Home
            </Link>

            <p className="mp-label-v2">Registration Received</p>
            <h1 className="mp-title-v2">
              You&apos;re <em>In</em>
            </h1>
            <p className="mp-prose-center-v2">
              {registration
                ? `Thanks for registering, ${registration.buyer_name.split(' ')[0]}. One more step to lock in your spot.`
                : 'Thanks for registering. One more step to lock in your spot.'}
            </p>
          </div>
        </section>

        <section className="mp-section-v2 mp-section-cream-v2">
          <div className="mp-container-v2 mp-container-narrow-v2">
            <div className="mp-pay-card-v2">
              <p className="mp-pay-kicker-v2">Complete Your Payment</p>

              {registration ? (
                <>
                  <p className="mp-pay-total-label-v2">Your total</p>
                  <p className="mp-pay-total-v2">${payAmount}</p>

                  <div className="mp-pay-code-block-v2">
                    <p className="mp-pay-code-label-v2">Your reference code</p>
                    <div className="mp-pay-code-row-v2">
                      <span className="mp-pay-code-v2">
                        {registration.reference_code}
                      </span>
                      <button
                        type="button"
                        onClick={copyCode}
                        className="mp-pay-copy-btn-v2"
                        aria-label="Copy reference code"
                      >
                        {copied ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                  </div>

                  <div className="mp-pay-donate-v2">
                    <p className="mp-pay-donate-label-v2">
                      Add a little extra? (optional)
                    </p>
                    <p className="mp-pay-donate-sub-v2">
                      Guardian 4 Heroes and Heroes K9 Odyssey Academy are
                      veteran-run nonprofits that keep going on donations. If
                      you&apos;d like to chip in beyond your registration, add
                      it here and it goes straight to the cause.
                    </p>
                    <div className="mp-pay-donate-chips-v2">
                      {DONATION_OPTIONS.map((amt) => (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => setSelectedAdd(amt)}
                          className={`mp-pay-donate-chip-v2${
                            selectedAdd === amt ? ' is-active' : ''
                          }`}
                        >
                          {amt === 0 ? 'Just my total' : `+ $${amt}`}
                        </button>
                      ))}
                      <button
                        type="button"
                        onClick={() => setSelectedAdd('custom')}
                        className={`mp-pay-donate-chip-v2${
                          selectedAdd === 'custom' ? ' is-active' : ''
                        }`}
                      >
                        Custom
                      </button>
                    </div>

                    {selectedAdd === 'custom' && (
                      <div className="mp-pay-donate-custom-v2">
                        <label
                          className="mp-pay-donate-custom-label-v2"
                          htmlFor="custom-donation"
                        >
                          Enter your donation amount
                        </label>
                        <div className="mp-pay-donate-custom-row-v2">
                          <span className="mp-pay-donate-custom-dollar-v2">
                            $
                          </span>
                          <input
                            id="custom-donation"
                            type="number"
                            min="0"
                            step="1"
                            inputMode="decimal"
                            placeholder="0"
                            className="mp-pay-donate-custom-input-v2"
                            value={customAmount}
                            onChange={(e) => setCustomAmount(e.target.value)}
                          />
                        </div>
                      </div>
                    )}

                    {donationAdd > 0 && (
                      <p className="mp-pay-donate-hint-v2">
                        ${registration.total_amount} registration + $
                        {donationAdd} donation ={' '}
                        <strong>${payAmount}</strong>. Thank you.
                      </p>
                    )}
                  </div>

                  <ol className="mp-pay-steps-v2">
                    <li>
                      <strong>Click the Givebutter button below</strong> to open
                      the donation page.
                    </li>
                    <li>
                      <strong>Enter ${payAmount}</strong> as your amount.
                    </li>
                    <li>
                      <strong>Paste your reference code</strong> (
                      <code>{registration.reference_code}</code>) into the
                      &ldquo;Add a note&rdquo; field.
                    </li>
                    <li>
                      <strong>Submit your payment.</strong>
                    </li>
                  </ol>

                  <a
                    href={GIVEBUTTER_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="mp-cinematic-cta mp-pay-cta-v2"
                  >
                    Pay ${payAmount} via Givebutter
                  </a>

                  <p className="mp-pay-note-v2">
                    Once we receive your payment, we&apos;ll mark your
                    registration as paid. If you can&apos;t paste the code, no
                    problem, we&apos;ll match you by name.
                  </p>
                </>
              ) : (
                <p className="mp-pay-loading-v2">
                  Loading your registration details…
                </p>
              )}
            </div>
          </div>
        </section>

        <section className="mp-section-v2 mp-section-cream-v2">
          <div className="mp-container-v2 mp-container-narrow-v2">
            <div className="mp-confirm-card-v2">
              <p className="mp-confirm-kicker-v2">What Happens Next</p>

              <div className="mp-confirm-steps-v2">
                <div className="mp-confirm-step-v2">
                  <span className="mp-confirm-step-number-v2">1</span>
                  <div>
                    <h3>Complete your Givebutter donation</h3>
                    <p>
                      Use the button above. Don&apos;t forget the reference
                      code in the note field.
                    </p>
                  </div>
                </div>

                <div className="mp-confirm-step-v2">
                  <span className="mp-confirm-step-number-v2">2</span>
                  <div>
                    <h3>We confirm your payment</h3>
                    <p>
                      We&apos;ll review and mark your registration as paid,
                      usually within a day or two.
                    </p>
                  </div>
                </div>

                <div className="mp-confirm-step-v2">
                  <span className="mp-confirm-step-number-v2">3</span>
                  <div>
                    <h3>Show up ready</h3>
                    <p>
                      Bring your grit, your people, and your game face. We&apos;ll
                      take care of the mud.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mp-confirm-actions-v2">
                <Link href="/events" className="mp-cinematic-cta">
                  View Event Details
                </Link>
                <Link href="/" className="mp-secondary-link-btn-v2">
                  Return Home
                </Link>
              </div>
            </div>
          </div>
        </section>

        <footer className="mp-section-v2 mp-section-dark-v2 mp-footer-v2">
          <div className="mp-container-v2">
            <div className="mp-footer-grid-v2">
              <div>
                <p className="mp-footer-brand-v2">MISSION POSSIBLE</p>
                <p className="mp-footer-note-v2">
                  Hooves, paws, purpose, and people.
                </p>
              </div>

              <div>
                <p className="mp-footer-heading-v2">Partner Organizations</p>
                <div className="mp-footer-links-v2">
                  <a
                    href="https://www.guardian4heroes.org"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Guardian 4 Heroes
                  </a>
                  <a
                    href="https://heroesk9odysseyacademy.org"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Heroes K9 Odyssey Academy
                  </a>
                </div>
              </div>

              <div>
                <p className="mp-footer-heading-v2">Built By</p>
                <a
                  href="https://web-ops-studio.com"
                  target="_blank"
                  rel="noreferrer"
                  className="mp-footer-credit-v2"
                >
                  WebOps Studio
                </a>
              </div>
            </div>

            <div className="mp-footer-bottom-v2">
              © 2025 Mission Possible. All rights reserved.
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
