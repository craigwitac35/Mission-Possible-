import Link from 'next/link';
import Head from 'next/head';
import PublicSiteHeader from '@/components/PublicSiteHeader';

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
        <PublicSiteHeader />

        <section className="mp-page-hero-art-v2">
          <img
            src="/images/events-hero.png"
            alt="Mission Possible upcoming events artwork"
            className="mp-hero-art-image-v2"
          />
        </section>

        <section className="mp-section-v2 mp-section-cream-v2">
          <div className="mp-container-v2">
            <div className="mp-events-intro-v2">
              <Link href="/" className="mp-back-link-v2 mp-back-link-dark-v2">
                &larr; Mission Possible Home
              </Link>

              <p className="mp-label-v2">Featured Event</p>

              <h1 className="mp-title-v2">
                Upcoming <em>Events</em>
              </h1>

              <p className="mp-prose-center-v2">
                Mud, music, and meaning.
              </p>
            </div>

            <div className="mp-event-card-v2">
              <div className="mp-event-stamp-v2">
                <span className="mp-stamp-month-v2">AUG</span>
                <span className="mp-stamp-day-v2">29</span>
                <span className="mp-stamp-year-v2">2026</span>
              </div>

              <div className="mp-event-body-v2">
                <p className="mp-event-tag-v2">Inaugural Year</p>

                <h2 className="mp-event-name-v2">
                  Mission Possible:<br />
                  <em>Hooves &amp; Paws Mud Run</em>
                </h2>

                <p className="mp-event-subtitle-v2">
                  A Mud Run for Veterans, First Responders,
                  and the Animals Who Heal Them
                </p>

                <div className="mp-event-meta-v2">
                  <div className="mp-event-meta-row-v2">
                    <span className="mp-meta-label-v2">When</span>
                    <span className="mp-meta-value-v2">Saturday, August 29th</span>
                  </div>
                  <div className="mp-event-meta-row-v2">
                    <span className="mp-meta-label-v2">Where</span>
                    <span className="mp-meta-value-v2">The Eagles Healing Nest, MN</span>
                  </div>
                  <div className="mp-event-meta-row-v2">
                    <span className="mp-meta-label-v2">Check-in</span>
                    <span className="mp-meta-value-v2">7:00 AM</span>
                  </div>
                  <div className="mp-event-meta-row-v2">
                    <span className="mp-meta-label-v2">Start</span>
                    <span className="mp-meta-value-v2">8:00 AM</span>
                  </div>
                </div>

                <Link href="/register" className="mp-cinematic-cta">
                  <span className="mp-cinematic-cta-star">&#9733;</span>
                  Register Now
                  <span className="mp-cinematic-cta-star">&#9733;</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="mp-section-v2 mp-section-dark-v2">
          <div className="mp-container-v2 mp-container-narrow-v2">
            <p className="mp-label-v2 mp-label-light-v2">About the Day</p>

            <h2 className="mp-title-v2 mp-title-light-v2">
              Get Muddy.<br />
              <em>Make it Matter.</em>
            </h2>

            <p className="mp-prose-light-v2">
              Get muddy alongside veterans, first responders, rescue dogs, and
              the community that supports them. Every step you take, every
              obstacle you cross, helps fund equine therapy and K9 training
              programs that change lives.
            </p>

            <blockquote className="mp-pullquote-light-v2">
              &ldquo;Together, We Heal. Together, We Thrive.&rdquo;
            </blockquote>
          </div>
        </section>

        <section className="mp-section-v2 mp-section-cream-v2">
          <div className="mp-container-v2">
            <p className="mp-label-v2">What&rsquo;s Included</p>

            <h2 className="mp-title-v2">
              Your Registration <em>Includes</em>
            </h2>

            <div className="mp-included-grid-v2">
              <div className="mp-included-card-v2">
                <p className="mp-included-label-v2">Event T-Shirt</p>
                <p className="mp-included-text-v2">
                  An official Mission Possible event shirt in your size.
                </p>
              </div>

              <div className="mp-included-card-v2">
                <p className="mp-included-label-v2">Finisher&rsquo;s Medal</p>
                <p className="mp-included-text-v2">
                  Cross the finish line and earn a custom medal.
                </p>
              </div>

              <div className="mp-included-card-v2">
                <p className="mp-included-label-v2">Drinks &amp; Snacks</p>
                <p className="mp-included-text-v2">
                  Sports drinks, water, protein bars, and bananas throughout
                  the day.
                </p>
              </div>

              <div className="mp-included-card-v2">
                <p className="mp-included-label-v2">All Day Access</p>
                <p className="mp-included-text-v2">
                  Live music, dog talks, contests, food trucks, and silent
                  auction, all included.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mp-section-v2 mp-section-cream-v2 mp-rates-section">
          <div className="mp-container-v2">
            <p className="mp-label-v2">Rates</p>

            <h2 className="mp-title-v2">
              Pricing &amp; <em>Registration</em>
            </h2>

            <div className="mp-rate-card-v2">
              <div className="mp-rate-tier-v2">
                <p className="mp-rate-label-v2">Early Bird</p>
                <p className="mp-rate-window-v2">Until July 30</p>
                <div className="mp-rate-amounts-v2">
                  <div>
                    <span className="mp-rate-price-v2">$25</span>
                    <span className="mp-rate-type-v2">Adults</span>
                  </div>
                  <div className="mp-rate-divider-v2" />
                  <div>
                    <span className="mp-rate-price-v2">$10</span>
                    <span className="mp-rate-type-v2">Children</span>
                  </div>
                </div>
              </div>

              <div className="mp-rate-tier-v2">
                <p className="mp-rate-label-v2">Regular</p>
                <p className="mp-rate-window-v2">July 31 &ndash; August 10</p>
                <div className="mp-rate-amounts-v2">
                  <div>
                    <span className="mp-rate-price-v2">$35</span>
                    <span className="mp-rate-type-v2">Adults</span>
                  </div>
                  <div className="mp-rate-divider-v2" />
                  <div>
                    <span className="mp-rate-price-v2">$15</span>
                    <span className="mp-rate-type-v2">Children</span>
                  </div>
                </div>
              </div>

              <p className="mp-rate-note-v2">
                Children = age 13 and under &middot; Registration closes August 10
              </p>
            </div>
          </div>
        </section>

        <section className="mp-section-v2 mp-section-dark-v2">
          <div className="mp-container-v2">
            <p className="mp-label-v2 mp-label-light-v2">Schedule</p>

            <h2 className="mp-title-v2 mp-title-light-v2">
              A Full Day of <em>Community</em>
            </h2>

            <ul className="mp-schedule-list-v2">
              <li className="mp-schedule-item-v2">
                <span className="mp-schedule-time-v2">Fri. 4:00 PM</span>
                <span className="mp-schedule-event-v2">
                  Pre-Registration &amp; Packet Pickup
                </span>
              </li>

              <li className="mp-schedule-item-v2">
                <span className="mp-schedule-time-v2">6:00 &ndash; 10:00 AM</span>
                <span className="mp-schedule-event-v2">
                  B3 Pancake Breakfast
                </span>
              </li>

              <li className="mp-schedule-item-v2">
                <span className="mp-schedule-time-v2">7:00 AM</span>
                <span className="mp-schedule-event-v2">
                  Mud Run Check-In
                  <span className="mp-schedule-detail-v2">
                    Day-of registration also available
                  </span>
                </span>
              </li>

              <li className="mp-schedule-item-v2">
                <span className="mp-schedule-time-v2">8:00 AM</span>
                <span className="mp-schedule-event-v2">
                  Mud Run Starts
                  <span className="mp-schedule-detail-v2">At the Barnyard</span>
                </span>
              </li>

              <li className="mp-schedule-item-v2">
                <span className="mp-schedule-time-v2">8:00 &ndash; 10:30 AM</span>
                <span className="mp-schedule-event-v2">
                  Coffee at the Barn
                  <span className="mp-schedule-detail-v2">
                    Special HK9OA blends from Kinder Coffee Lab
                  </span>
                </span>
              </li>

              <li className="mp-schedule-item-v2">
                <span className="mp-schedule-time-v2">8:00 AM &ndash; 3:00 PM</span>
                <span className="mp-schedule-event-v2">
                  Cookies &amp; Refreshments
                  <span className="mp-schedule-detail-v2">At the Barnyard</span>
                </span>
              </li>

              <li className="mp-schedule-item-v2">
                <span className="mp-schedule-time-v2">8:00 AM &ndash; 3:00 PM</span>
                <span className="mp-schedule-event-v2">
                  Coloring Contest
                  <span className="mp-schedule-detail-v2">
                    At both The Academy and the Barnyard
                  </span>
                </span>
              </li>

              <li className="mp-schedule-item-v2">
                <span className="mp-schedule-time-v2">10:00 AM &ndash; 5:00 PM</span>
                <span className="mp-schedule-event-v2">
                  Nest Fest
                  <span className="mp-schedule-detail-v2">
                    At the Auditorium &middot; Vendors, silent auction, and new
                    Nest apparel
                  </span>
                </span>
              </li>

              <li className="mp-schedule-item-v2">
                <span className="mp-schedule-time-v2">10:00 AM &ndash; 5:00 PM</span>
                <span className="mp-schedule-event-v2">
                  Rock Climbing
                  <span className="mp-schedule-detail-v2">During Nest Fest</span>
                </span>
              </li>

              <li className="mp-schedule-item-v2">
                <span className="mp-schedule-time-v2">10:30 AM &ndash; 2:30 PM</span>
                <span className="mp-schedule-event-v2">
                  Face Painting
                  <span className="mp-schedule-detail-v2">At the Barn</span>
                </span>
              </li>

              <li className="mp-schedule-item-v2">
                <span className="mp-schedule-time-v2">11:00 AM &ndash; 1:00 PM</span>
                <span className="mp-schedule-event-v2">
                  Bean Bag Tournament
                  <span className="mp-schedule-detail-v2">
                    Hosted by HK9OA &middot; Pre-register at The Academy, behind
                    the auditorium
                  </span>
                </span>
              </li>

              <li className="mp-schedule-item-v2">
                <span className="mp-schedule-time-v2">11:00 AM &ndash; 1:00 PM</span>
                <span className="mp-schedule-event-v2">
                  Roping Contest
                  <span className="mp-schedule-detail-v2">
                    Youth and adult brackets &middot; At the Barnyard
                  </span>
                </span>
              </li>

              <li className="mp-schedule-item-v2">
                <span className="mp-schedule-time-v2">Top &amp; Bottom of the Hour</span>
                <span className="mp-schedule-event-v2">
                  Dog Body Language BINGO
                  <span className="mp-schedule-detail-v2">
                    Led by Matt Beisner &middot; A kids&rsquo; activity, but
                    adults are encouraged to join
                  </span>
                </span>
              </li>

              <li className="mp-schedule-item-v2">
                <span className="mp-schedule-time-v2">Throughout the Day</span>
                <span className="mp-schedule-event-v2">
                  Dog Breed Learning Activities
                  <span className="mp-schedule-detail-v2">
                    For kids and their adults
                  </span>
                </span>
              </li>

              <li className="mp-schedule-item-v2">
                <span className="mp-schedule-time-v2">2:00 PM</span>
                <span className="mp-schedule-event-v2">
                  Silent Auction &amp; Drawings Close
                  <span className="mp-schedule-detail-v2">
                    Silent auction at The Academy &middot; Drawings at the
                    Barnyard
                  </span>
                </span>
              </li>

              <li className="mp-schedule-item-v2">
                <span className="mp-schedule-time-v2">All Day</span>
                <span className="mp-schedule-event-v2">
                  Live Music, Food Trucks &amp; Axe Throwing
                </span>
              </li>
            </ul>
          </div>
        </section>

        <section className="mp-section-v2 mp-section-cream-v2">
          <div className="mp-container-v2 mp-container-narrow-v2">
            <h2 className="mp-title-v2">
              Ready to <em>Take the Leap?</em>
            </h2>

            <p className="mp-prose-center-v2">
              Lock yours in.
            </p>

            <Link href="/register" className="mp-cinematic-cta">
              <span className="mp-cinematic-cta-star">&#9733;</span>
              Register Now
              <span className="mp-cinematic-cta-star">&#9733;</span>
            </Link>
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
