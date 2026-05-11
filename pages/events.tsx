import Link from 'next/link';
import Head from 'next/head';
import { HorseshoePawDivider, CompassRose } from '@/components/svg/Ornaments';

export default function Events() {
  return (
    <>
      <Head>
        <title>Upcoming Events | Mission Possible</title>
        <meta
          name="description"
          content="Mission Possible: Hooves and Paws Mud Run, August 29th. Register now to support Guardian 4 Heroes and Heroes K9 Odyssey Academy."
        />
      </Head>

      <main className="mp-site">
        <section className="mp-page-hero">
          <div className="mp-hero-frame">
            <Link href="/" className="mp-back-link">
              &larr; Mission Possible Home
            </Link>

            <p className="mp-eyebrow">Aug. 29 &middot; The Eagles Healing Nest</p>

            <h1 className="mp-page-title">
              Upcoming <em>Events</em>
            </h1>

            <div className="mp-hero-divider">
              <HorseshoePawDivider className="mp-svg-divider" />
            </div>

            <p className="mp-tagline">
              Mud, music, and meaning. One day a year.
            </p>
          </div>
        </section>

        <section className="mp-section mp-section-cream">
          <div className="mp-container">
            <div className="mp-compass-mark">
              <CompassRose className="mp-svg-compass" />
            </div>

            <p className="mp-section-label">No. 01 &ndash; The Featured Event</p>

            <div className="mp-event-card">
              <div className="mp-event-stamp">
                <span className="mp-stamp-month">AUG</span>
                <span className="mp-stamp-day">29</span>
                <span className="mp-stamp-year">2025</span>
              </div>

              <div className="mp-event-body">
                <p className="mp-event-tag">Inaugural Year</p>

                <h2 className="mp-event-name">
                  Mission Possible:<br />
                  <em>Hooves &amp; Paws Mud Run</em>
                </h2>

                <p className="mp-event-subtitle">
                  A Mud Run for Veterans, First Responders,
                  and the Animals Who Heal Them
                </p>

                <div className="mp-event-meta">
                  <div className="mp-event-meta-row">
                    <span className="mp-meta-label">When</span>
                    <span className="mp-meta-value">Saturday, August 29th</span>
                  </div>
                  <div className="mp-event-meta-row">
                    <span className="mp-meta-label">Where</span>
                    <span className="mp-meta-value">The Eagles Healing Nest, MN</span>
                  </div>
                  <div className="mp-event-meta-row">
                    <span className="mp-meta-label">Check-in</span>
                    <span className="mp-meta-value">7:00 AM</span>
                  </div>
                  <div className="mp-event-meta-row">
                    <span className="mp-meta-label">Start</span>
                    <span className="mp-meta-value">8:00 AM</span>
                  </div>
                </div>

                <Link href="/register" className="mp-btn mp-btn-primary">
                  Register Now
                </Link>
              </div>
            </div>
          </div>
        </section>

        <div className="mp-section-bridge">
          <HorseshoePawDivider className="mp-svg-divider mp-svg-divider-bridge" />
        </div>

        <section className="mp-section mp-section-dark">
          <div className="mp-container mp-container-narrow">
            <div className="mp-compass-mark mp-compass-light">
              <CompassRose className="mp-svg-compass" />
            </div>

            <p className="mp-section-label mp-label-light">No. 02 &ndash; About the Day</p>

            <h2 className="mp-section-title mp-title-light">
              Get Muddy.<br />
              <em>Make it Matter.</em>
            </h2>

            <p className="mp-prose-light">
              Get muddy alongside veterans, first responders, rescue dogs, and
              the community that supports them. Every step you take, every
              obstacle you cross, helps fund equine therapy and K9 training
              programs that change lives.
            </p>

            <blockquote className="mp-pullquote-light">
              &ldquo;Together, We Heal. Together, We Thrive.&rdquo;
            </blockquote>
          </div>
        </section>

        <div className="mp-section-bridge mp-section-bridge-dark">
          <HorseshoePawDivider className="mp-svg-divider mp-svg-divider-bridge" />
        </div>

        <section className="mp-section mp-section-cream">
          <div className="mp-container">
            <div className="mp-compass-mark">
              <CompassRose className="mp-svg-compass" />
            </div>

            <p className="mp-section-label">No. 03 &ndash; What&rsquo;s Included</p>

            <h2 className="mp-section-title">
              Your Registration <em>Includes</em>
            </h2>

            <div className="mp-included-grid">
              <div className="mp-included-card">
                <p className="mp-included-label">Event T-Shirt</p>
                <p className="mp-included-text">
                  An official Mission Possible event shirt in your size.
                </p>
              </div>

              <div className="mp-included-card">
                <p className="mp-included-label">Finisher&rsquo;s Medal</p>
                <p className="mp-included-text">
                  Cross the finish line and earn a custom medal.
                </p>
              </div>

              <div className="mp-included-card">
                <p className="mp-included-label">Drinks &amp; Snacks</p>
                <p className="mp-included-text">
                  Sports drinks, water, protein bars, and bananas throughout
                  the day.
                </p>
              </div>

              <div className="mp-included-card">
                <p className="mp-included-label">All Day Access</p>
                <p className="mp-included-text">
                  Live music, dog talks, contests, food trucks, and silent
                  auction, all included.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="mp-section-bridge">
          <HorseshoePawDivider className="mp-svg-divider mp-svg-divider-bridge" />
        </div>

        <section className="mp-section mp-section-cream">
          <div className="mp-container">
            <div className="mp-compass-mark">
              <CompassRose className="mp-svg-compass" />
            </div>

            <p className="mp-section-label">No. 04 &ndash; Rates</p>

            <h2 className="mp-section-title">
              Pricing &amp; <em>Registration</em>
            </h2>

            <div className="mp-rate-card">
              <div className="mp-rate-tier">
                <p className="mp-rate-label">Early Bird</p>
                <p className="mp-rate-window">Until July 30</p>
                <div className="mp-rate-amounts">
                  <div>
                    <span className="mp-rate-price">$25</span>
                    <span className="mp-rate-type">Adults</span>
                  </div>
                  <div className="mp-rate-divider" />
                  <div>
                    <span className="mp-rate-price">$10</span>
                    <span className="mp-rate-type">Children</span>
                  </div>
                </div>
              </div>

              <div className="mp-rate-tier">
                <p className="mp-rate-label">Regular</p>
                <p className="mp-rate-window">July 31 &ndash; August 10</p>
                <div className="mp-rate-amounts">
                  <div>
                    <span className="mp-rate-price">$35</span>
                    <span className="mp-rate-type">Adults</span>
                  </div>
                  <div className="mp-rate-divider" />
                  <div>
                    <span className="mp-rate-price">$15</span>
                    <span className="mp-rate-type">Children</span>
                  </div>
                </div>
              </div>

              <p className="mp-rate-note">
                Children = age 13 and under &middot; Registration closes August 10
              </p>
            </div>
          </div>
        </section>

        <div className="mp-section-bridge">
          <HorseshoePawDivider className="mp-svg-divider mp-svg-divider-bridge" />
        </div>

        <section className="mp-section mp-section-dark">
          <div className="mp-container">
            <div className="mp-compass-mark mp-compass-light">
              <CompassRose className="mp-svg-compass" />
            </div>

            <p className="mp-section-label mp-label-light">No. 05 &ndash; Schedule</p>

            <h2 className="mp-section-title mp-title-light">
              A Full Day of <em>Community</em>
            </h2>

            <ul className="mp-schedule-list">
              <li className="mp-schedule-item">
                <span className="mp-schedule-time">Fri. 4:00 PM</span>
                <span className="mp-schedule-event">Pre-Registration &amp; Packet Pickup</span>
              </li>
              <li className="mp-schedule-item">
                <span className="mp-schedule-time">7:00 AM</span>
                <span className="mp-schedule-event">Check-In Opens</span>
              </li>
              <li className="mp-schedule-item">
                <span className="mp-schedule-time">8:00 AM</span>
                <span className="mp-schedule-event">Mud Run Begins</span>
              </li>
              <li className="mp-schedule-item">
                <span className="mp-schedule-time">All Day</span>
                <span className="mp-schedule-event">Bean Bag Tournament</span>
              </li>
              <li className="mp-schedule-item">
                <span className="mp-schedule-time">All Day</span>
                <span className="mp-schedule-event">Axe Throwing Contest</span>
              </li>
              <li className="mp-schedule-item">
                <span className="mp-schedule-time">All Day</span>
                <span className="mp-schedule-event">Roping Contest</span>
              </li>
              <li className="mp-schedule-item">
                <span className="mp-schedule-time">All Day</span>
                <span className="mp-schedule-event">Dog Talks: Body Language BINGO &amp; Breed Q&amp;A</span>
              </li>
              <li className="mp-schedule-item">
                <span className="mp-schedule-time">All Day</span>
                <span className="mp-schedule-event">Live Music</span>
              </li>
              <li className="mp-schedule-item">
                <span className="mp-schedule-time">All Day</span>
                <span className="mp-schedule-event">Food Trucks</span>
              </li>
              <li className="mp-schedule-item">
                <span className="mp-schedule-time">All Day</span>
                <span className="mp-schedule-event">Silent Auction</span>
              </li>
              <li className="mp-schedule-item">
                <span className="mp-schedule-time">All Day</span>
                <span className="mp-schedule-event">Face Painting &amp; Coloring Contest</span>
              </li>
            </ul>
          </div>
        </section>

        <section className="mp-section mp-section-cream">
          <div className="mp-container mp-container-narrow">
            <h2 className="mp-section-title">
              Ready to <em>Take the Leap?</em>
            </h2>

            <p className="mp-prose-center">
              Lock yours in.
            </p>

            <Link href="/register" className="mp-btn mp-btn-primary">
              Register Now
            </Link>
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
