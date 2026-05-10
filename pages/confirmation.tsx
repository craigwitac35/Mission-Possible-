import Head from 'next/head';
import Link from 'next/link';
import { HorseshoePawDivider, CompassRose } from '@/components/svg/Ornaments';

export default function ConfirmationPage() {
  return (
    <>
      <Head>
        <title>You&apos;re In | Mission Possible</title>
      </Head>

      <main className="mp-site">
        <section className="mp-page-hero">
          <div className="mp-hero-frame">
            <p className="mp-eyebrow">Confirmation &middot; Aug. 29</p>

            <h1 className="mp-page-title">
              You&apos;re <em>In</em>
            </h1>

            <div className="mp-hero-divider">
              <HorseshoePawDivider className="mp-svg-divider" />
            </div>

            <p className="mp-tagline">
              Thank you for showing up.
            </p>
          </div>
        </section>

        <section className="mp-section mp-section-cream">
          <div className="mp-container mp-container-narrow">
            <div className="mp-compass-mark">
              <CompassRose className="mp-svg-compass" />
            </div>

            <p className="mp-section-label">No. 01 &mdash; A Note From Us</p>

            <h2 className="mp-section-title">
              Your Registration<br />
              <em>Matters.</em>
            </h2>

            <div className="mp-prose">
              <p>
                You just signed up for more than a mud run. You signed up to
                stand alongside veterans, first responders, and the animals who
                walk beside them on the path to healing.
              </p>
              <p>
                Every dollar of your registration goes directly to Guardian 4
                Heroes and Heroes K9 Odyssey Academy &mdash; funding equine
                therapy, K9 training, and the kind of programs that change
                lives.
              </p>
            </div>

            <blockquote className="mp-pullquote">
              &ldquo;Together, We Heal. Together, We Thrive.&rdquo;
            </blockquote>
          </div>
        </section>

        <div className="mp-section-bridge">
          <HorseshoePawDivider className="mp-svg-divider mp-svg-divider-bridge" />
        </div>

        <section className="mp-section mp-section-dark">
          <div className="mp-container mp-container-narrow">
            <div className="mp-compass-mark mp-compass-light">
              <CompassRose className="mp-svg-compass" />
            </div>

            <p className="mp-section-label mp-label-light">No. 02 &mdash; What Happens Next</p>

            <h2 className="mp-section-title mp-title-light">
              The Path <em>Forward</em>
            </h2>

            <ul className="mp-next-steps">
              <li className="mp-next-step">
                <span className="mp-step-number">01</span>
                <div className="mp-step-body">
                  <h3 className="mp-step-title">Check Your Email</h3>
                  <p className="mp-step-text">
                    A confirmation with your registration details is on its way.
                    Save it &mdash; you&rsquo;ll need it on event day.
                  </p>
                </div>
              </li>
              <li className="mp-next-step">
                <span className="mp-step-number">02</span>
                <div className="mp-step-body">
                  <h3 className="mp-step-title">Complete Your Payment</h3>
                  <p className="mp-step-text">
                    Payment instructions are coming soon. For now, your spot is
                    held. We&rsquo;ll be in touch.
                  </p>
                </div>
              </li>
              <li className="mp-next-step">
                <span className="mp-step-number">03</span>
                <div className="mp-step-body">
                  <h3 className="mp-step-title">Show Up Ready</h3>
                  <p className="mp-step-text">
                    Check-in opens at 7:00 AM on August 29th at The Eagles
                    Healing Nest. Bring water, a towel, and an open heart.
                  </p>
                </div>
              </li>
            </ul>

            <div className="mp-payment-cta">
              <button
                type="button"
                className="mp-btn mp-btn-primary"
                disabled
                title="Payment integration coming soon"
              >
                Continue to Payment
              </button>
              <p className="mp-payment-note">
                Payment processing is coming soon &mdash; we&rsquo;ll email you
                with instructions.
              </p>
            </div>
          </div>
        </section>

        <div className="mp-section-bridge mp-section-bridge-dark">
          <HorseshoePawDivider className="mp-svg-divider mp-svg-divider-bridge" />
        </div>

        <section className="mp-section mp-section-cream">
          <div className="mp-container mp-container-narrow">
            <h2 className="mp-section-title">
              Bring <em>Someone With You.</em>
            </h2>

            <p className="mp-prose-center">
              The more boots in the mud, the more we can do. Share the event
              with someone who would show up.
            </p>

            <Link href="/" className="mp-btn mp-btn-primary">
              Return to Home
            </Link>
          </div>
        </section>

        <footer className="mp-footer">
          <div className="mp-container">
            <div className="mp-footer-grid">
              <div className="mp-footer-col">
                <p className="mp-footer-brand">Mission Possible</p>
                <p className="mp-footer-tagline">Hooves &amp; Paws</p>
                <p className="mp-footer-text">
                  Where Hooves, Paws, and Combat Boots Meet.
                </p>
              </div>

              <div className="mp-footer-col">
                <p className="mp-footer-heading">Guardian 4 Heroes</p>
                <a
                  href="https://www.guardian4heroes.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mp-footer-link"
                >
                  guardian4heroes.org &rarr;
                </a>
              </div>

              <div className="mp-footer-col">
                <p className="mp-footer-heading">Heroes K9 Odyssey Academy</p>
                <a
                  href="https://heroesk9odysseyacademy.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mp-footer-link"
                >
                  heroesk9odysseyacademy.org &rarr;
                </a>
              </div>
            </div>

            <div className="mp-footer-bottom">
              <p>&copy; 2025 Mission Possible. All rights reserved.</p>
              <p className="mp-footer-credit">
                Built by <a href="https://web-ops-studio.com" target="_blank" rel="noopener noreferrer">WebOps Studio</a>
              </p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
