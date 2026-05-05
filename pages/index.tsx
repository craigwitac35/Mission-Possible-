import Link from 'next/link';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Mud Run | Register Now</title>
        <meta name="description" content="Nonprofit mud run event" />
      </Head>

      <main className="container">
        <section className="hero">
          <h1>Mud Run [Event Name]</h1>
          <p className="tagline">
            Get muddy, have fun, support a great cause.
          </p>
          <Link href="/register" className="btn-primary cta">
            Register Now
          </Link>
        </section>

        <section className="info">
          <h2>About the Event</h2>
          <p>[Placeholder — event description goes here.]</p>
        </section>

        <section className="info">
          <h2>Date &amp; Location</h2>
          <p>[Placeholder — date, time, address.]</p>
        </section>

        <section className="info">
          <h2>Pricing</h2>
          <ul>
            <li>Early Bird (until July 30): Adults $25, Children $10</li>
            <li>Regular (July 31 – Aug 10): Adults $35, Children $15</li>
            <li>Children = age 13 and under</li>
          </ul>
          <Link href="/register" className="btn-primary cta">
            Register Now
          </Link>
        </section>
      </main>
    </>
  );
}
