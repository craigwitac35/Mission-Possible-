import Head from 'next/head';
import Link from 'next/link';
import { HorseshoePawDivider } from '@/components/svg/Ornaments';
import RegistrationForm from '@/components/registration/RegistrationForm';

export default function RegisterPage() {
  return (
    <>
      <Head>
        <title>Register | Mission Possible: Hooves and Paws</title>
        <meta
          name="description"
          content="Register for the Mission Possible Hooves and Paws Mud Run — supporting Guardian 4 Heroes and Heroes K9 Odyssey Academy."
        />
      </Head>

      <main className="mp-site">
        <section className="mp-page-hero">
          <div className="mp-hero-frame">
            <Link href="/events" className="mp-back-link">
              &larr; Back to Events
            </Link>

            <p className="mp-eyebrow">Mission Possible &middot; Aug. 29</p>

            <h1 className="mp-page-title">
              Event <em>Registration</em>
            </h1>

            <div className="mp-hero-divider">
              <HorseshoePawDivider className="mp-svg-divider" />
            </div>

            <p className="mp-tagline">
              Hooves, Paws &amp; Combat Boots
            </p>
          </div>
        </section>

        <section className="mp-section mp-section-cream mp-register-section">
          <div className="mp-container mp-container-narrow">
            <p className="mp-register-intro">
              Your registration directly supports equine therapy and K9 training
              programs for veterans and first responders.
            </p>
            <RegistrationForm />
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
