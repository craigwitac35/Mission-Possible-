import Link from 'next/link';
import Head from 'next/head';

export default function Events() {
  return (
    <>
      <Head>
        <title>Upcoming Events | Mission Possible</title>
        <meta
          name="description"
          content="Mission Possible: Hooves and Paws Mud Run — August 29th. Register now to support Guardian 4 Heroes and Heroes K9 Odyssey Academy."
        />
      </Head>

      <main>
        <header className="page-header">
          <div className="container">
            <Link href="/" className="back-link">
              ← Mission Possible Home
            </Link>
            <h1>Upcoming Events</h1>
          </div>
        </header>

        <section className="featured-event">
          <div className="container">
            <div className="event-card">
              <h2>Mission Possible: Hooves and Paws Mud Run</h2>
              <p className="event-subtitle">
                A Mud Run for Veterans, First Responders,
                and the Animals Who Heal Them
              </p>

              <div className="event-meta">
                <p>📅 Saturday, August 29th</p>
                <p>📍 The Eagles Healing Nest, Minnesota</p>
              </div>

              <Link href="/register" className="btn-primary cta">
                Register Now
              </Link>
            </div>
          </div>
        </section>

        <section className="event-details">
          <div className="container">
            <h2>About the Day</h2>
            <p>
              Get muddy alongside veterans, first responders, rescue dogs, and
              the community that supports them. Every step you take, every
              obstacle you cross, helps fund equine therapy and K9 training
              programs that change lives.
            </p>

            <div className="schedule-block">
              <p>🕖 7:00 AM — Registration & Check-in</p>
              <p>🏁 8:00 AM — Mud Run Begins</p>
              <p>🎉 All Day — Activities, Music, Food</p>
            </div>
          </div>
        </section>

        <section className="pricing-section">
          <div className="container">
            <h2>Pricing</h2>

            <div className="price-tier">
              <h3>Early Bird (until July 30)</h3>
              <p>Adults: $25 &nbsp;•&nbsp; Children: $10</p>
            </div>

            <div className="price-tier">
              <h3>Regular (July 31 – August 10)</h3>
              <p>Adults: $35 &nbsp;•&nbsp; Children: $15</p>
            </div>

            <p className="muted">
              Children = age 13 and under. Registration closes August 10.
            </p>
          </div>
        </section>

        <section className="full-schedule">
          <div className="container">
            <h2>A Full Day of Community</h2>
            <ul className="schedule-list">
              <li>🏃 Mud Run — 8:00 AM</li>
              <li>🌽 Bean Bag Tournament</li>
              <li>🪓 Axe Throwing Contest</li>
              <li>🤠 Roping Contest</li>
              <li>🐕 Dog Talks & Q&amp;A</li>
              <li>🎵 Live Music</li>
              <li>🚚 Food Trucks</li>
              <li>🎨 Face Painting & Coloring Contest</li>
              <li>🏷️ Silent Auction</li>
            </ul>
          </div>
        </section>

        <section className="cta-section">
          <div className="container">
            <h2>Ready to take the leap?</h2>
            <Link href="/register" className="btn-primary cta">
              Register Now
            </Link>
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
