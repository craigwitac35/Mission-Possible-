import Head from 'next/head';
import Link from 'next/link';

export default function ConfirmationPage() {
  return (
    <>
      <Head>
        <title>Registration Received | Mission Possible</title>
      </Head>

      <main>
        <header className="page-header">
          <div className="container">
            <h1>Registration Received</h1>
            <p className="page-header-tagline">
              Thank you for joining us.
            </p>
          </div>
        </header>

        <section className="confirmation-section">
          <div className="container">
            <div className="confirmation-card">
              <p className="confirmation-message">
                Your registration has been recorded. You&apos;ll receive a
                confirmation email shortly with all the details.
              </p>

              <p className="confirmation-next">
                Next step: complete your payment to secure your spot.
              </p>

              <button
                type="button"
                className="btn-primary disabled-btn"
                disabled
                title="Payment integration coming soon"
              >
                Continue to Payment
              </button>

              <p className="muted">
                (Payment integration coming soon. For now, your spot is being
                held — we&apos;ll be in touch with payment instructions.)
              </p>

              <div className="confirmation-thanks">
                <p className="emphasis">
                  Together, We Heal. Together, We Thrive.
                </p>
              </div>

              <Link href="/" className="back-link">
                Return to Home
              </Link>
            </div>
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
