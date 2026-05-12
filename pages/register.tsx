import Head from 'next/head';
import Link from 'next/link';
import RegistrationForm from '@/components/registration/RegistrationForm';
import StaffLoginIcon from '@/components/StaffLoginIcon';

export default function RegisterPage() {
  return (
    <>
      <Head>
        <title>Register | Mission Possible: Hooves and Paws</title>
        <meta
          name="description"
          content="Register for the Mission Possible Hooves and Paws Mud Run. Supporting Guardian 4 Heroes and Heroes K9 Odyssey Academy."
        />
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
            <Link href="/events" className="mp-back-link-v2">
              &larr; Back to Events
            </Link>

            <p className="mp-cinematic-eyebrow">
              <span className="mp-divider-dot" />
              Mission Possible &middot; Aug. 29
              <span className="mp-divider-dot" />
            </p>

            <h1 className="mp-cinematic-title">
              <span className="mp-cinematic-title-top">Event</span>
              <span className="mp-cinematic-title-bottom">Registration</span>
            </h1>

            <p className="mp-cinematic-tagline">
              Hooves, Paws &amp; Heroes
            </p>
          </div>
        </section>

        <section className="mp-section-v2 mp-section-cream-v2 mp-register-section-v2">
          <div className="mp-container-v2 mp-container-narrow-v2">
            <p className="mp-register-intro-v2">
              Your registration directly supports equine therapy and K9 training
              programs for veterans and first responders.
            </p>
            <RegistrationForm />
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
