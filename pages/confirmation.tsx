import Head from 'next/head';
import Link from 'next/link';
import StaffLoginIcon from '@/components/StaffLoginIcon';

export default function ConfirmationPage() {
  return (
    <>
      <Head>
        <title>You&apos;re In | Mission Possible</title>
      </Head>

      <main className="mp-site">
        <StaffLoginIcon />

        <section className="mp-page-hero-v2">
          <div
            className="mp-page-hero-bg"
            style={{ backgroundImage: 'url(/images/mission-hero.png)' }}
            aria-hidden="true"
          />
          <div className="mp-page-hero-overlay" aria-hidden="true" />

          <div className="mp-page-hero-content">
            <p className="mp-cinematic-eyebrow">
              <span className="mp-divider-dot" />
              Confirmation &middot; Aug. 29
              <span className="mp-divider-dot" />
            </p>

            <h1 className="mp-cinematic-title">
              <span className="mp-cinematic-title-top">You&apos;re</span>
              <span className="mp-cinematic-title-bottom">In</span>
            </h1>

            <p className="mp-cinematic-tagline">
              Thank you for showing up.
            </p>
          </div>
        </section>

        <section className="mp-section-v2 mp-section-cream-v2">
          <div className="mp-container-v2 mp-container-narrow-v2">
            <p className="mp-label-v2">A Note From Us</p>

            <h2 className="mp-title-v2">
              Your Registration<br />
              <em>Matters.</em>
            </h2>

            <div className="mp-prose-v2">
              <p>
                You just signed up for more than a mud run. You signed up to
                stand alongside veterans, first responders, and the animals who
                walk beside them on the path to healing.
              </p>
              <p>
                Every dollar of your registration goes directly to Guardian 4
                Heroes and Heroes K9 Odyssey Academy, funding equine therapy,
                K9 training, and the kind of programs that change lives.
              </p>
            </div>

            <blockquote className="mp-pullquote-v2">
              &ldquo;Together, We Heal. Together, We Thrive.&rdquo;
            </blockquote>
          </div>
        </section>

        <section className="mp-section-v2 mp-section-dark-v2">
          <div className="mp-container-v2 mp-container-narrow-v2">
            <p className="mp-label-v2 mp-label-light-v2">What Happens Next</p>

            <h2 className="mp-title-v2 mp-title-light-v2">
              The Path <em>Forward</em>
            </h2>

            <ul className="mp-next-steps-v2">
              <li className="mp-next-step-v2">
                <span className="mp-step-number-v2">01</span>
                <div className="mp-step-body-v2">
                  <h3 className="mp-step-title-v2">Check Your Email</h3>
                  <p className="mp-step-text-v2">
                    A confirmation with your registration details is on its way.
                    Save it. You&rsquo;ll need it on event day.
                  </p>
                </div>
              </li>
              <li className="mp-next-step-v2">
                <span className="mp-step-number-v2">02</span>
                <div className="mp-step-body-v2">
                  <h3 className="mp-step-title-v2">Complete Your Payment</h3>
                  <p className="mp-step-text-v2">
                    Payment instructions are coming soon. For now, your spot is
                    held. We&rsquo;ll be in touch.
                  </p>
                </div>
              </li>
              <li className="mp-next-step-v2">
                <span className="mp-step-number-v2">03</span>
                <div className="mp-step-body-v2">
                  <h3 className="mp-step-title-v2">Show Up Ready</h3>
                  <p className="mp-step-text-v2">
                    Check-in opens at 7:00 AM on August 29th at The Eagles
                    Healing Nest. Bring water, a towel, and an open heart.
                  </p>
                </div>
              </li>
            </ul>

            <div className="mp-payment-cta-v2">
              <button
                type="button"
                className="mp-cinematic-cta"
                disabled
                title="Payment integration coming soon"
              >
                <span className="mp-cinematic-cta-star">&#9733;</span>
                Continue to Payment
                <span className="mp-cinematic-cta-star">&#9733;</span>
              </button>
              <p className="mp-payment-note-v2">
                Payment processing is coming soon. We&rsquo;ll email you
                with instructions.
              </p>
            </div>
          </div>
        </section>

        <section className="mp-section-v2 mp-section-cream-v2">
          <div className="mp-container-v2 mp-container-narrow-v2">
            <h2 className="mp-title-v2">
              Bring <em>Someone With You.</em>
            </h2>

            <p className="mp-prose-center-v2">
              The more boots in the mud, the more we can do. Share the event
              with someone who would show up.
            </p>

            <Link href="/" className="mp-cinematic-cta">
              <span className="mp-cinematic-cta-star">&#9733;</span>
              Return to Home
              <span className="mp-cinematic-cta-star">&#9733;</span>
            </Link>
          </div>
        </section>

        <footer className="mp-footer-v2">
          <div className="mp-container-v2">
            <div className="mp-footer-grid-v2">
              <div className="mp-footer-col-v2">
                <p className="mp-footer-brand-v2">Mission Possible</p>
                <p className="mp-footer-tagline-v2">Hooves &amp; Paws</p>
                <p className="mp-footer-text-v2">
                  Where Hooves, Paws, and Heroes Heal.
                </p>
              </div>

              <div className="mp-footer-col-v2">
                <p className="mp-footer-heading-v2">Guardian 4 Heroes</p>
                <a
                  href="https://www.guardian4heroes.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mp-footer-link-v2"
                >
                  guardian4heroes.org &rarr;
                </a>
              </div>

              <div className="mp-footer-col-v2">
                <p className="mp-footer-heading-v2">Heroes K9 Odyssey Academy</p>
                <a
                  href="https://heroesk9odysseyacademy.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mp-footer-link-v2"
                >
                  heroesk9odysseyacademy.org &rarr;
                </a>
              </div>
            </div>

            <div className="mp-footer-bottom-v2">
              <p>&copy; 2025 Mission Possible. All rights reserved.</p>
              <p className="mp-footer-credit-v2">
                Built by <a href="https://web-ops-studio.com" target="_blank" rel="noopener noreferrer">WebOps Studio</a>
              </p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
