import Head from 'next/head';
import Link from 'next/link';
import StaffLoginIcon from '@/components/StaffLoginIcon';
import PublicSiteHeader from '@/components/PublicSiteHeader';

export default function ConfirmationPage() {
  return (
    <>
      <Head>
        <title>You&apos;re In | Mission Possible</title>
        <meta
          name="description"
          content="Your Mission Possible registration has been received. Review what happens next and get ready for event day."
        />
      </Head>

      <main>
        <StaffLoginIcon />
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
              Thanks for registering for Mission Possible: Hooves & Paws. Your
              support helps Guardian 4 Heroes and Heroes K9 Odyssey Academy
              continue their work for veterans, first responders, and the people
              who need them most.
            </p>
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
                    <h3>Check your registration details</h3>
                    <p>
                      Make sure everything you entered looks right and keep an
                      eye out for any event updates.
                    </p>
                  </div>
                </div>

                <div className="mp-confirm-step-v2">
                  <span className="mp-confirm-step-number-v2">2</span>
                  <div>
                    <h3>Payment info coming next</h3>
                    <p>
                      Once payment is connected, this page can direct people to
                      the next step automatically.
                    </p>
                  </div>
                </div>

                <div className="mp-confirm-step-v2">
                  <span className="mp-confirm-step-number-v2">3</span>
                  <div>
                    <h3>Get ready for event day</h3>
                    <p>
                      Bring your grit, your people, and your game face. We’ll
                      take care of the mud.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mp-confirm-note-v2">
                Payment integration is still being finalized, so this page is
                acting as your clean “you made it” checkpoint for now.
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
