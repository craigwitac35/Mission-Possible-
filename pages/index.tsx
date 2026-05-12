import Link from 'next/link';
import Head from 'next/head';
import StaffLoginIcon from '@/components/StaffLoginIcon';

export default function Home() {
  return (
    <>
      <Head>
        <title>Mission Possible | Hooves and Paws</title>
        <meta
          name="description"
          content="Guardian 4 Heroes and Heroes K9 Odyssey Academy – serving veterans, first responders, and the animals who help them heal."
        />
      </Head>

      <main className="mp-site">
        <StaffLoginIcon />

        <section className="mp-hero-art-v2">
          <img
            src="/images/mission-hero.png"
            alt="Mission Possible Hooves and Paws hero artwork"
            className="mp-hero-art-image-v2"
          />
        </section>

        <section className="mp-hero-cta-band-v2">
          <div className="mp-container-v2 mp-container-narrow-v2">
            <p className="mp-label-v2">Upcoming Event</p>
            <h1 className="mp-title-v2">
              See What&apos;s <em>Coming Up</em>
            </h1>
            <p className="mp-prose-center-v2">
              Get the full event details, day-of schedule, and registration info.
            </p>

            <Link href="/events" className="mp-cinematic-cta">
              <span className="mp-cinematic-cta-star">&#9733;</span>
              See Upcoming Events
              <span className="mp-cinematic-cta-star">&#9733;</span>
            </Link>
          </div>
        </section>

        <section className="mp-section-v2 mp-section-cream-v2">
          <div className="mp-container-v2">
            <p className="mp-label-v2">Our Mission</p>
            <h2 className="mp-title-v2">
              Two Missions.<br />
              <em>One Day.</em>
            </h2>

            <div className="mp-prose-v2">
              <p>
                Mission Possible brings Guardian 4 Heroes and Heroes K9 Odyssey
                Academy together for one day. Two nonprofits working side by
                side to help veterans and first responders heal, grow, and
                thrive alongside the animals who walk with them.
              </p>
              <p>
                Through equine therapy, K9 training, and a community event
                built around them, we honor those who served and the rescue
                animals who serve right back.
              </p>
            </div>

            <blockquote className="mp-pullquote-v2">
              &ldquo;Together, We Heal. Together, We Thrive.&rdquo;
            </blockquote>
          </div>
        </section>

        <section className="mp-section-v2 mp-section-dark-v2">
          <div className="mp-container-v2">
            <p className="mp-label-v2 mp-label-light-v2">The Organizations</p>
            <h2 className="mp-title-v2 mp-title-light-v2">
              The <em>Hooves</em> &amp; The <em>Paws</em>
            </h2>
          </div>

          <div className="mp-partners-v2">
            <article className="mp-partner-v2">
              <div className="mp-partner-photo-slot">
                <img
                  src="/images/g4h-image.png"
                  alt="Sara with horse representing Guardian 4 Heroes"
                  className="mp-partner-photo-image"
                />
              </div>

              <div className="mp-partner-content">
                <div className="mp-partner-logo-v2">
                  <img src="/images/g4h-logo.png" alt="Guardian 4 Heroes" />
                </div>

                <p className="mp-partner-kicker">Hooves</p>

                <h3 className="mp-partner-name-v2">Guardian 4 Heroes</h3>

                <p className="mp-partner-tagline-v2">
                  The Power of the Connection with a Horse
                </p>

                <p className="mp-partner-text-v2">
                  Guardian 4 Heroes provides equine-facilitated psychotherapy
                  for veterans and first responders. Through the quiet
                  strength of horses, those who served find a path toward
                  healing. Physically, mentally, and emotionally.
                </p>

                <p className="mp-partner-quote-v2">
                  &ldquo;When the noise of war fades, the silence can be loud.
                  But here, with every hoofbeat and shared breath, healing
                  begins.&rdquo;
                </p>

                <p className="mp-partner-founder-v2">
                  Founded by <strong>Sara Peterson</strong>
                </p>

                <a
                  href="https://www.guardian4heroes.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mp-partner-link-v2"
                >
                  Visit Guardian 4 Heroes &rarr;
                </a>
              </div>
            </article>

            <article className="mp-partner-v2">
              <div className="mp-partner-photo-slot">
                <img
                  src="/images/k9-image.png"
                  alt="Amie with dogs representing Heroes K9 Odyssey Academy"
                  className="mp-partner-photo-image"
                />
              </div>

              <div className="mp-partner-content">
                <div className="mp-partner-logo-v2">
                  <img src="/images/hk9oa-logo.png" alt="Heroes K9 Odyssey Academy" />
                </div>

                <p className="mp-partner-kicker">Paws</p>

                <h3 className="mp-partner-name-v2">
                  Heroes K9 Odyssey Academy
                </h3>

                <p className="mp-partner-tagline-v2">
                  Where Purpose Meets Paws
                </p>

                <p className="mp-partner-text-v2">
                  Heroes K9 Odyssey Academy equips veterans and first
                  responders with skills in canine training and care, while
                  rehabilitating rescue dogs to serve as service animals or
                  companions. Creating a ripple effect of healing.
                </p>

                <p className="mp-partner-quote-v2">
                  &ldquo;Second chances for those who served, and the rescue
                  dogs who serve right back.&rdquo;
                </p>

                <p className="mp-partner-founder-v2">
                  Founded by <strong>Amie Schwinghammer</strong>
                </p>

                <a
                  href="https://heroesk9odysseyacademy.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mp-partner-link-v2"
                >
                  Visit Heroes K9 Odyssey Academy &rarr;
                </a>
              </div>
            </article>
          </div>
        </section>

        <section className="mp-section-v2 mp-section-cream-v2">
          <div className="mp-container-v2 mp-container-narrow-v2">
            <p className="mp-label-v2">Find Us At</p>
            <h2 className="mp-title-v2">
              Join Us at <em>Our Next Event</em>
            </h2>

            <p className="mp-prose-center-v2">
              Mud, music, food trucks, and the kind of community that only
              shows up when there&rsquo;s something worth showing up for.
            </p>

            <p className="mp-prose-center-v2 mp-next-event-note-v2">
              See the full event schedule, details, and registration on the events page.
            </p>
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
