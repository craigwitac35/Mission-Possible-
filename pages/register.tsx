import Link from 'next/link';
import Head from 'next/head';
import PublicSiteHeader from '@/components/PublicSiteHeader';
import RegistrationForm from '@/components/registration/RegistrationForm';

export default function RegisterPage() {
  return (
    <>
      <Head>
        <title>Register | Mission Possible</title>
        <meta
          name="description"
          content="Register for the Mission Possible: Hooves and Paws Mud Run supporting Guardian 4 Heroes and Heroes K9 Odyssey Academy."
        />
      </Head>

      <main className="mp-site">
        <PublicSiteHeader />

        <section className="mp-page-hero-art-v2">
          <img
            src="/images/registration-image.png"
            alt="Mission Possible registration hero artwork"
            className="mp-hero-art-image-v2"
          />
        </section>

        <section className="mp-section-v2 mp-section-cream-v2">
          <div className="mp-container-v2">
            <div className="mp-events-intro-v2">
              <Link href="/events" className="mp-back-link-v2 mp-back-link-dark-v2">
                &larr; Back to Events
              </Link>

              <p className="mp-label-v2">Sign Up</p>

              <h1 className="mp-title-v2">
                Claim Your <em>Spot</em>
              </h1>

              <p className="mp-prose-center-v2">
                Fill it out, lock it in, and we&apos;ll see you at the starting
                line.
              </p>
            </div>

            <div className="mp-register-form-wrap-v2">
              <RegistrationForm />
            </div>
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
                Built by{' '}
                <a href="https://web-ops-studio.com" target="_blank" rel="noopener noreferrer">
                  WebOps Studio
                </a>
              </p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
