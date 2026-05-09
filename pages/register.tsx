import Head from 'next/head';
import Link from 'next/link';
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

      <main>
        <header className="page-header">
          <div className="container">
            <Link href="/events" className="back-link">
              ← Back to Events
            </Link>
            <h1>Register</h1>
            <p className="page-header-tagline">
              Mission Possible: Hooves and Paws Mud Run
            </p>
          </div>
        </header>

        <section className="register-section">
          <div className="container">
            <p className="register-intro">
              Register yourself or your group below. Your registration directly
              supports equine therapy and K9 training programs for veterans
              and first responders.
            </p>
            <RegistrationForm />
          </div>
        </section>

        <footer className="site-footer">
          <div className="container">
            <p className="footer-brand">Mission Possible | Hooves and Paws</p>
            <p className="footer-orgs">
              Guardian 4 Heroes &nbsp;|&nbsp; Heroes K9 Odyssey Academy
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
