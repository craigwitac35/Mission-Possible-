import Head from 'next/head';
import Link from 'next/link';
import RegistrationForm from '@/components/registration/RegistrationForm';
import PublicSiteHeader from '@/components/PublicSiteHeader';

export default function RegisterPage() {
  return (
    <>
      <Head>
        <title>Register | Mission Possible: Hooves & Paws</title>
        <meta
          name="description"
          content="Register for Mission Possible: Hooves & Paws Mud Run and support Guardian 4 Heroes and Heroes K9 Odyssey Academy."
        />
      </Head>

      <main>
        <PublicSiteHeader />

        <section className="mp-page-hero-art-v2">
          <img
            src="/images/registration-image.png"
            alt="Mission Possible registration hero"
            className="mp-hero-art-image-v2"
          />
        </section>

        <section className="mp-section-v2 mp-section-cream-v2">
          <div className="mp-container-v2 mp-container-narrow-v2 mp-events-intro-v2">
            <Link href="/events" className="mp-back-link-v2">
              ← Back to Events
            </Link>

            <p className="mp-label-v2">Aug. 29 • The Eagles Healing Nest</p>
            <h1 className="mp-title-v2">
              Event <em>Registration</em>
            </h1>
            <p className="mp-prose-center-v2">
              Sign up for a day built around grit, purpose, and community while
              supporting equine therapy and K9 training for veterans and first
              responders.
            </p>
          </div>
        </section>

        <section className="mp-section-v2 mp-section-cream-v2 mp-register-form-wrap-v2">
          <div className="mp-container-v2 mp-container-narrow-v2">
            <RegistrationForm />
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
