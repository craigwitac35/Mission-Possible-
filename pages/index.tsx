import Link from 'next/link';
import Head from 'next/head';
import { HorseshoePawDivider, CompassRose } from '@/components/svg/Ornaments';

export default function Home() {
  return (
    <>
      <Head>
        <title>Mission Possible | Hooves and Paws</title>
        <meta
          name="description"
          content="A partnership between Guardian 4 Heroes and Heroes K9 Odyssey Academy — serving veterans and first responders alongside the animals who help them heal."
        />
      </Head>

      <main className="mp-site">
        <section className="mp-hero">
          <div className="mp-hero-frame">
            <p className="mp-eyebrow">Est. 2025 &middot; Minnesota</p>

            <div className="mp-logo-slot">
              {/* IMAGE PLACEHOLDER: Joint logo goes here */}
              <span className="mp-logo-placeholder">[ Joint Logo ]</span>
            </div>

            <h1 className="mp-title">
              <span className="mp-title-line">Mission</span>
              <span className="mp-title-line mp-title-italic">Possible</span>
            </h1>

            <div className="mp-hero-divider">
              <HorseshoePawDivider className="mp-svg-divider" />
            </div>

            <p className="mp-tagline">
              Where Hooves, Paws, and Combat Boots Meet.
            </p>

            <p className="mp-subtagline">
              Serving Those Who Serve.<br />
              Together, We Heal. Together, We Thrive.
            </p>

            <Link href="/events" className="mp-btn mp-btn-primary">
              See Upcoming Events
            </Link>
          </div>
        </section>

        <section className="mp-section mp-section-cream">
          <div className="mp-container">
            <div className="mp-compass-mark">
              <CompassRose className="mp-svg-compass" />
            </div>

            <p className="mp-section-label">No. 01 &mdash; A Note From Us</p>
            <h2 className="mp-section-title">
              Two Missions.<br />
              <em>One Purpose.</em>
            </h2>

            <div className="mp-prose">
              <p>
                Mission Possible is a partnership between Guardian 4 Heroes and
                Heroes K9 Odyssey Academy &mdash; two nonprofits dedicated to
                helping veterans and first responders heal, grow, and thrive
                alongside the animals who walk beside them.
              </p>
              <p>
                Through equine therapy, K9 training, and community events, we
                honor those who served and the rescue animals who serve right
                back.
              </p>
            </div>

            <blockquote className="mp-pullquote">
              &ldquo;Together, We Heal. Together, We Thrive.&rdquo;
            </blockquote>
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

            <p className="mp-section-label mp-label-light">
              No. 02 &mdash; Our Partners
            </p>
            <h2 className="mp-section-title mp-title-light">
              The <em>Hooves</em> &amp; The <em>Paws</em>
            </h2>
          </div>

          <div className="mp-partners">
            <article className="mp-partner-card">
              <div className="mp-partner-image-slot">
                {/* IMAGE PLACEHOLDER: Photo of horses (G4H) */}
                <span className="mp-image-placeholder">[ Horse Photo ]</span>
              </div>

              <div className="mp-partner-body">
                <p className="mp-partner-tag">Hooves</p>

                <div className="mp-partner-logo-slot">
                  {/* IMAGE PLACEHOLDER: G4H logo */}
                  <span className="mp-logo-placeholder-sm">[ G4H Logo ]</span>
                </div>

                <h3 className="mp-partner-name">Guardian 4 Heroes</h3>
                <p className="mp-partner-tagline">
                  The Power of the Connection with a Horse
                </p>

                <p className="mp-partner-text">
                  Guardian 4 Heroes provides equine-facilitated psychotherapy
                  for veterans and first responders. Through the quiet strength
                  of horses, those who served find a path toward healing &mdash;
                  physically, mentally, and emotionally.
                </p>

                <p className="mp-partner-quote">
                  &ldquo;When the noise of war fades, the silence can be loud.
                  But here, with every hoofbeat and shared breath, healing
                  begins.&rdquo;
                </p>

                <p className="mp-partner-founder">
                  Founded by <strong>Sara Peterson</strong>
                </p>

                <a
                  href="https://www.guardian4heroes.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mp-partner-link"
                >
                  Visit Guardian 4 Heroes &rarr;
                </a>
              </div>
            </article>

            <article className="mp-partner-card">
              <div className="mp-partner-image-slot">
                {/* IMAGE PLACEHOLDER: Photo of dogs (HK9OA) */}
                <span className="mp-image-placeholder">[ Dog Photo ]</span>
              </div>

              <div className="mp-partner-body">
                <p className="mp-partner-tag">Paws</p>

                <div className="mp-partner-logo-slot">
                  {/* IMAGE PLACEHOLDER: HK9OA logo */}
                  <span className="mp-logo-placeholder-sm">[ HK9OA Logo ]</span>
                </div>

                <h3 className="mp-partner-name">
                  Heroes K9 Odyssey Academy
                </h3>
                <p className="mp-partner-tagline">
                  Where Purpose Meets Paws
                </p>

                <p className="mp-partner-text">
                  Heroes K9 Odyssey Academy equips veterans and first responders
                  with skills in canine training and care, while rehabilitating
                  rescue dogs to serve as service animals or companions &mdash;
                  creating a ripple effect of healing.
                </p>

                <p className="mp-partner-quote">
                  &ldquo;Second chances for those who served, and the rescue
                  dogs who serve right back.&rdquo;
                </p>

                <p className="mp-partner-founder">
                  Founded by <strong>Amie Schwinghammer</strong>
                </p>

                <a
                  href="https://heroesk9odysseyacademy.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mp-partner-link"
                >
                  Visit Heroes K9 Odyssey Academy &rarr;
                </a>
              </div>
            </article>
          </div>
        </section>

        <div className="mp-section-bridge mp-section-bridge-dark">
          <HorseshoePawDivider className="mp-svg-divider mp-svg-divider-bridge" />
        </div>

        <section className="mp-section mp-section-cream">
          <div className="mp-container mp-container-narrow">
            <div className="mp-compass-mark">
              <CompassRose className="mp-svg-compass" />
            </div>

            <p className="mp-section-label">No. 03 &mdash; Find Us At</p>
            <h2 className="mp-section-title">
              Join Us at <em>Our Next Event</em>
            </h2>

            <p className="mp-prose-center">
              Mud, music, food trucks, and the kind of community that only
              shows up when there&rsquo;s something worth showing up for.
            </p>

            <Link href="/events" className="mp-btn mp-btn-primary">
              See Upcoming Events
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
              <p>
                &copy; 2025 Mission Possible. All rights reserved.
              </p>
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
