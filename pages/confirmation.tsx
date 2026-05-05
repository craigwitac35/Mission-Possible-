import Head from 'next/head';
import Link from 'next/link';

export default function ConfirmationPage() {
  return (
    <>
      <Head>
        <title>Registration Received | Mud Run</title>
      </Head>
      <main className="container">
        <div className="card center">
          <h1>Registration Received</h1>
          <p>
            Thanks! Your registration has been recorded. You&apos;ll receive a
            confirmation email shortly.
          </p>
          <p>
            Next step: complete your payment to secure your spot.
          </p>
          <button
            type="button"
            className="btn-primary"
            disabled
            title="Payment integration coming soon"
          >
            Continue to Payment
          </button>
          <p className="muted">
            (Payment integration coming soon.)
          </p>
          <Link href="/" className="back-link">
            Return to home
          </Link>
        </div>
      </main>
    </>
  );
}
